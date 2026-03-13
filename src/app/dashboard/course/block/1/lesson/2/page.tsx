"use client";

import { useState } from "react";
import Link from "next/link";

/* ─── Troubleshooting issues ─── */
type AccordionItem = { title: string; content: string; hint?: string };

const telegramIssues: AccordionItem[] = [
  {
    title: "Бот не отвечает после /start",
    content: "Gateway не запущен или упал после последнего изменения конфига.",
    hint: "openclaw gateway status — если Stopped → openclaw gateway restart",
  },
  {
    title: "Pairing code не приходит",
    content:
      "dmPolicy стоит disabled в конфиге — бот игнорирует личные сообщения.",
    hint: "Проверь openclaw.json → channels.telegram.dmPolicy — должно быть 'pairing' или 'open'",
  },
  {
    title: "Invalid bot token (401)",
    content:
      "Токен введён с пробелом или переносом строки. Telegram возвращает 401 Unauthorized.",
    hint: "@BotFather → /mybots → выбери бота → API Token → скопируй заново, без пробелов",
  },
  {
    title: "Bot was blocked by the user",
    content: "Ты заблокировал бота ранее в Telegram.",
    hint: "Найди бота в Telegram → нажми Unblock / Разблокировать",
  },
  {
    title: "openclaw onboard не запускается",
    content:
      "OpenClaw не установлен или установлена старая версия без визарда.",
    hint: "npm install -g openclaw@latest — затем снова openclaw onboard",
  },
  {
    title: "Визард завис на выборе провайдера",
    content:
      "Нет интернета или API endpoint недоступен — визард не может проверить провайдера.",
    hint: "curl https://api.anthropic.com — если ошибка, проверь соединение / VPN",
  },
];

/* ─── Agent task cards ─── */
const agentTasks = [
  {
    emoji: "🔍",
    prompt: "Найди последние новости про Bitcoin",
    response:
      "Агент выполняет web_search, возвращает 3 актуальные новости с источниками и датами.",
  },
  {
    emoji: "📅",
    prompt: "Что у меня сегодня?",
    response:
      "Агент проверяет Google Calendar (если подключён) или отвечает, что нужно подключить Skills в Уроке 3.",
  },
  {
    emoji: "⏰",
    prompt: "Напомни мне позвонить клиенту через 2 часа",
    response:
      "Агент создаёт cron-напоминание — через 2 часа ты получишь сообщение в Telegram.",
  },
  {
    emoji: "📝",
    prompt: "Перескажи эту статью: [URL]",
    response:
      "Агент читает страницу по ссылке и возвращает краткое резюме в 3–5 предложениях.",
  },
  {
    emoji: "🌤",
    prompt: "Какая погода в Бангкоке?",
    response:
      "Агент использует weather skill и возвращает текущую температуру, влажность, прогноз.",
  },
  {
    emoji: "💡",
    prompt: "Придумай 5 идей для поста про AI",
    response:
      "Агент генерирует пронумерованный список из 5 идей с кратким описанием каждой.",
  },
];

/* ─── CodeBlock ─── */
function CodeBlock({ code, language }: { code: string; language?: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1400);
  }

  return (
    <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 relative">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs text-zinc-500 font-medium">
          {language ?? "bash"}
        </span>
        <button
          onClick={handleCopy}
          className="text-xs px-2.5 py-1 rounded-md border border-zinc-700 text-zinc-300 hover:border-[#FF4422] hover:text-white transition-colors"
          aria-label="Copy code"
        >
          {copied ? "Скопировано" : "Копировать"}
        </button>
      </div>
      <pre className="text-sm text-zinc-200 font-mono whitespace-pre-wrap">
        {code}
      </pre>
    </div>
  );
}

/* ─── Accordion ─── */
function Accordion({ items }: { items: AccordionItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-3">
      {items.map((item, idx) => {
        const isOpen = openIndex === idx;
        return (
          <div
            key={item.title}
            className="bg-zinc-950 border border-zinc-800 rounded-xl"
          >
            <button
              className="w-full flex items-center justify-between px-5 py-4 text-left"
              onClick={() => setOpenIndex(isOpen ? null : idx)}
            >
              <span className="text-white font-semibold">{item.title}</span>
              <span className="text-zinc-500 text-sm">
                {isOpen ? "Скрыть" : "Показать"}
              </span>
            </button>
            {isOpen && (
              <div className="px-5 pb-5 text-zinc-400 leading-relaxed">
                <p className="mb-2">{item.content}</p>
                {item.hint && (
                  <div className="text-zinc-300 bg-zinc-900/60 border border-zinc-800 rounded-lg px-4 py-3">
                    {item.hint}
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════════════ */
export default function Block1Lesson2Page() {
  const [checks, setChecks] = useState([false, false, false, false, false]);
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedCards, setExpandedCards] = useState<Set<number>>(new Set());

  function toggleCard(idx: number) {
    setExpandedCards((prev) => {
      const next = new Set(prev);
      if (next.has(idx)) next.delete(idx);
      else next.add(idx);
      return next;
    });
  }

  /* search filter */
  const filteredIssues = searchQuery.trim()
    ? telegramIssues.filter((item) =>
        [item.title, item.content, item.hint ?? ""].some((t) =>
          t.toLowerCase().includes(searchQuery.toLowerCase())
        )
      )
    : telegramIssues;

  return (
    <main className="min-h-screen bg-[#0D0D0D] text-zinc-200">
      {/* ── Hero ── */}
      <section className="border-b border-zinc-900">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <p className="text-[#FF4422] text-sm font-semibold mb-2">
            Блок 1 · Урок 2 из 4
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
            Урок 2 — Первый Telegram-агент
          </h1>
          <p className="text-zinc-400 text-lg">
            Визард настроит всё за 5 минут — вручную ничего редактировать не
            нужно
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 flex gap-8">
        {/* ── Sidebar ── */}
        <aside className="hidden md:block w-56 shrink-0">
          <div className="sticky top-6 bg-zinc-900 border border-zinc-800 rounded-xl p-4">
            <p className="text-xs text-zinc-500 font-semibold uppercase mb-3">
              Блок 1
            </p>
            <nav className="flex flex-col gap-1">
              {[
                {
                  num: 1,
                  title: "Установка OpenClaw",
                  href: "/dashboard/course/block/1/lesson/1",
                },
                {
                  num: 2,
                  title: "Первый Telegram-агент",
                  href: "/dashboard/course/block/1/lesson/2",
                },
                {
                  num: 3,
                  title: "Подключения и Skills",
                  href: "/dashboard/course/block/1/lesson/3",
                },
                {
                  num: 4,
                  title: "Первая автоматизация",
                  href: "/dashboard/course/block/1/lesson/4",
                },
              ].map((l) => (
                <Link
                  key={l.num}
                  href={l.href}
                  className={
                    "flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors " +
                    (2 === l.num
                      ? "bg-[#FF4422]/10 text-[#FF4422] font-semibold"
                      : "text-zinc-400 hover:text-white hover:bg-zinc-800")
                  }
                >
                  <span
                    className={
                      "w-5 h-5 rounded-full border flex items-center justify-center text-xs shrink-0 " +
                      (2 === l.num ? "border-[#FF4422]" : "border-zinc-600")
                    }
                  >
                    {l.num}
                  </span>
                  {l.title}
                </Link>
              ))}
            </nav>
          </div>
        </aside>

        <div className="flex-1 min-w-0 flex flex-col gap-8">
          {/* ── Вступление ── */}
          <section className="bg-zinc-900 rounded-2xl p-6 md:p-8 border border-zinc-800">
            <h2 className="text-2xl font-semibold text-white mb-4">
              Вступление
            </h2>
            <p className="text-zinc-400 leading-relaxed">
              OpenClaw поставляется с визардом onboard — он сам спросит токен
              Telegram, выберет LLM провайдера, настроит конфиг. Ты просто
              отвечаешь на вопросы.
            </p>
          </section>

          {/* ── Шаг 1 — BotFather ── */}
          <section className="bg-zinc-900 rounded-2xl p-6 md:p-8 border border-zinc-800">
            <h2 className="text-2xl font-semibold text-white mb-4">
              Шаг 1 — Создай бота через BotFather
            </h2>
            <ol className="list-decimal list-inside text-zinc-400 space-y-2 mb-4">
              <li>
                Открой Telegram → найди @BotFather (синяя галочка)
              </li>
              <li>Отправь /newbot</li>
              <li>Введи имя бота (например: My Assistant)</li>
              <li>
                Введи username — должен заканчиваться на bot
                (my_assistant_bot)
              </li>
              <li>Скопируй Bot Token — он понадобится в визарде</li>
            </ol>
            <CodeBlock code="/newbot" />
            <div className="mt-4 bg-yellow-900/20 border border-yellow-700/40 rounded-xl px-5 py-4 text-yellow-200 text-sm">
              ⚠️ Сохрани токен — он нужен на следующем шаге
            </div>
          </section>

          {/* ── Шаг 2 — Визард onboard (ГЛАВНАЯ) ── */}
          

          {/* ── Шаг 3 — Первое сообщение ── */}
          <section className="bg-zinc-900 rounded-2xl p-6 md:p-8 border border-zinc-800">
            <h2 className="text-2xl font-semibold text-white mb-4">
              Шаг 3 — Напиши агенту
            </h2>
            <p className="text-zinc-400 mb-4 leading-relaxed">
              После того как визард завершится — открой Telegram, найди своего бота и напиши ему первое сообщение.
            </p>
            <div className="bg-zinc-800 rounded-xl p-4 flex items-start gap-3 border border-zinc-700">
              <span className="text-2xl">💬</span>
              <div>
                <p className="text-white font-medium mb-1">Попробуй написать агенту:</p>
                <p className="text-zinc-400 text-sm">&ldquo;Привет! Что ты умеешь?&rdquo;</p>
              </div>
            </div>
          </section>

          {/* ── Что агент умеет ── */}
          <section className="bg-zinc-900 rounded-2xl p-6 md:p-8 border border-zinc-800">
            <h2 className="text-2xl font-semibold text-white mb-6">
              Что агент умеет прямо сейчас
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {agentTasks.map((task, idx) => {
                const isExpanded = expandedCards.has(idx);
                return (
                  <button
                    key={idx}
                    onClick={() => toggleCard(idx)}
                    className="w-full text-left bg-zinc-950 border border-zinc-800 rounded-xl px-5 py-4 hover:border-zinc-600 transition-colors"
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-xl shrink-0">{task.emoji}</span>
                      <div className="min-w-0">
                        <span className="text-white font-medium">
                          &ldquo;{task.prompt}&rdquo;
                        </span>
                        {isExpanded && (
                          <p className="mt-2 text-zinc-400 leading-relaxed text-sm">
                            {task.response}
                          </p>
                        )}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </section>

          {/* ── Проблемы и решения ── */}
          <section className="bg-zinc-900 rounded-2xl p-6 md:p-8 border border-zinc-800">
            <h2 className="text-2xl font-semibold text-white mb-4">
              {searchQuery.trim()
                ? `Найдено: ${filteredIssues.length}`
                : "Проблемы и решения — Telegram"}
            </h2>
            <div className="relative mb-4">
              <input
                type="text"
                placeholder="Найти проблему... (например: token, pairing, 401)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-4 py-3 pl-10 text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-[#FF4422] transition-colors text-sm"
              />
              <svg
                className="absolute left-3 top-3.5 w-4 h-4 text-zinc-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-3 text-zinc-500 hover:text-zinc-300"
                >
                  ✕
                </button>
              )}
            </div>
            <Accordion items={filteredIssues} />
          </section>

          {/* ── Чекпоинт ── */}
          <section className="bg-zinc-900 rounded-2xl p-6 md:p-8 border border-zinc-800">
            <h2 className="text-2xl font-semibold text-white mb-4">
              ✅ Чекпоинт
            </h2>
            <div className="space-y-3">
              {[
                "Бот создан через BotFather, токен получен",
                "openclaw onboard завершён успешно",
                "openclaw gateway status → Running",
                "Pairing одобрен",
                "Агент ответил на первое сообщение в Telegram",
              ].map((label, idx) => (
                <label
                  key={label}
                  className="flex items-center gap-3 bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-3 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={checks[idx]}
                    onChange={() =>
                      setChecks((prev) =>
                        prev.map((v, i) => (i === idx ? !v : v))
                      )
                    }
                    className="h-4 w-4 accent-green-500"
                  />
                  <span className="text-zinc-300">{label}</span>
                </label>
              ))}
            </div>
          </section>

          {/* ── Navigation ── */}
          <nav className="flex items-center justify-between text-sm">
            <Link
              href="/dashboard/course/block/1/lesson/1"
              className="text-zinc-400 hover:text-white"
            >
              ← Урок 1: Установка
            </Link>
            <Link
              href="/dashboard/course/block/1/lesson/3"
              className="text-[#FF4422] hover:text-[#ff5a3c]"
            >
              Урок 3: Подключения →
            </Link>
          </nav>
        </div>
      </div>
    </main>
  );
}
