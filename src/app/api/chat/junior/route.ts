import { NextRequest, NextResponse } from "next/server";
import { verifySession, SESSION_COOKIE } from "@/lib/server/session";
import { supabaseAdmin } from "@/lib/server/supabaseAdmin";

export const dynamic = "force-dynamic";

const SYSTEM_PROMPT = `Ты — Junior, AI-помощник платформы Claw Academy. Помогаешь студентам разобраться с заработком через ИИ-агентов.

О платформе:
- Claw Academy — первая русскоязычная платформа по заработку с ИИ-агентами
- Построена на базе OpenClaw — системы управления AI-агентами
- Тиры доступа: Free (блок 0), Genesis ($49, блоки 0-2), Pro ($99, все блоки + Junior чат), Elite ($249, всё + личный доступ к Master)

О OpenClaw:
- Система для управления несколькими AI-агентами с одного интерфейса
- Поддерживает: Telegram, WhatsApp, Discord, iMessage
- Агенты: могут выполнять задачи, управлять расписанием, искать информацию, писать код
- Сайт: openclaw.ai

Твоя задача:
- Отвечай на вопросы о курсе, OpenClaw, заработке с AI
- Помогай студентам с техническими вопросами
- Давай практические советы по использованию агентов
- Если не знаешь точного ответа — честно скажи

Стиль общения: дружелюбный, конкретный, без воды. Отвечай по-русски.`;

const PRO_DAILY_LIMIT = 50;

export async function POST(req: NextRequest) {
  const token = req.cookies.get(SESSION_COOKIE)?.value;
  if (!token) {
    return NextResponse.json({ error: "Не авторизован" }, { status: 401 });
  }

  const session = await verifySession(token);
  if (!session) {
    return NextResponse.json({ error: "Не авторизован" }, { status: 401 });
  }

  const db = supabaseAdmin();

  // Find user
  let userQuery = db.from("users").select("id, tier");
  if (session.walletAddress) {
    userQuery = userQuery.eq("wallet_address", session.walletAddress.toLowerCase());
  } else if (session.telegramId) {
    userQuery = userQuery.eq("telegram_id", session.telegramId);
  } else {
    return NextResponse.json({ error: "Не авторизован" }, { status: 401 });
  }

  const { data: user } = await userQuery.maybeSingle();
  if (!user) {
    return NextResponse.json({ error: "Пользователь не найден" }, { status: 401 });
  }

  const tier = user.tier || "free";
  if (tier !== "pro" && tier !== "elite") {
    return NextResponse.json({ error: "Доступно только для Pro и Elite" }, { status: 403 });
  }

  // Check daily limit
  const today = new Date().toISOString().split("T")[0];
  const { data: ctx } = await db
    .from("user_context")
    .select("messages_today, last_message_date")
    .eq("user_id", user.id)
    .maybeSingle();

  let messagesToday = 0;
  if (ctx) {
    const lastDate = ctx.last_message_date
      ? new Date(ctx.last_message_date).toISOString().split("T")[0]
      : null;
    messagesToday = lastDate === today ? (ctx.messages_today || 0) : 0;
  }

  if (tier === "pro" && messagesToday >= PRO_DAILY_LIMIT) {
    return NextResponse.json(
      { error: "Лимит сообщений на сегодня исчерпан (50/50). Обновитесь до Elite для безлимита." },
      { status: 429 }
    );
  }

  // Parse body
  const body = await req.json();
  const userMessage = (body.message || "").trim();
  if (!userMessage || userMessage.length > 4000) {
    return NextResponse.json({ error: "Сообщение пустое или слишком длинное" }, { status: 400 });
  }

  // Get last 20 messages
  const { data: history } = await db
    .from("chat_messages")
    .select("role, content")
    .eq("user_id", user.id)
    .order("created_at", { ascending: true })
    .limit(20);

  const messages = [
    { role: "system" as const, content: SYSTEM_PROMPT },
    ...(history || []).map((m: { role: string; content: string }) => ({
      role: m.role as "user" | "assistant",
      content: m.content,
    })),
    { role: "user" as const, content: userMessage },
  ];

  // Call OpenRouter
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "AI сервис не настроен" }, { status: 500 });
  }

  let assistantContent: string;
  try {
    const aiRes = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "anthropic/claude-haiku-4-5",
        messages,
        max_tokens: 1024,
      }),
    });

    if (!aiRes.ok) {
      console.error("[junior] OpenRouter error:", aiRes.status, await aiRes.text());
      return NextResponse.json({ error: "Ошибка AI сервиса" }, { status: 502 });
    }

    const aiData = await aiRes.json();
    assistantContent = aiData.choices?.[0]?.message?.content || "Не удалось получить ответ.";
  } catch (err) {
    console.error("[junior] OpenRouter fetch error:", err);
    return NextResponse.json({ error: "Ошибка AI сервиса" }, { status: 502 });
  }

  // Save messages
  await db.from("chat_messages").insert([
    { user_id: user.id, role: "user", content: userMessage },
    { user_id: user.id, role: "assistant", content: assistantContent },
  ]);

  // Update user_context
  const newCount = messagesToday + 1;
  await db.from("user_context").upsert(
    {
      user_id: user.id,
      messages_today: newCount,
      last_message_date: today,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "user_id" }
  );

  return NextResponse.json({
    message: assistantContent,
    messagesLeft: tier === "elite" ? null : PRO_DAILY_LIMIT - newCount,
  });
}
