"use client";

import { useState } from "react";
import Link from "next/link";

/* ─── Troubleshooting issues ─── */
type AccordionItem = { title: string; content: string; hint?: string };

const telegramIssues: AccordionItem[] = [
  {
    title: "Бот не отвечает на сообщения",
    content: "Gateway не запущен.",
    hint: "openclaw gateway status — если не Running → openclaw gateway start",
  },
  {
    title: "openclaw onboard завис или вылетел",
    content: "Перезапусти визард — прогресс сохраняется.",
    hint: "openclaw onboard",
  },
  {
    title: "Бот отвечает «Not authorized»",
    content:
      "Визард не добавил твой ID в allowlist.",
    hint: "openclaw configure → проверь channels.telegram.allowFrom",
  },
  {
    title: "Invalid bot token",
    content:
      "Токен скопирован с пробелом или неполностью.",
    hint: "@BotFather → /mybots → выбери бота → API Token → скопируй заново",
  },
  {
    title: "Gateway запускается но сразу падает",
    content: "Ошибка в конфиге.",
    hint: "openclaw doctor покажет ошибку. Исправь и перезапусти.",
  },
  {
    title: "Не могу найти своего бота в Telegram",
    content:
      "Ищи по username который ввёл в BotFather. Убедись что username заканчивается на bot.",
  },
];

/* ─── Agent task cards ─── */
const agentTasks = [
  {
    emoji: "🔍",
    prompt: "Найди новости про Bitcoin",
    response:
      "Агент выполняет web_search, возвращает актуальные новости с источниками и датами.",
  },
  {
    emoji: "📝",
    prompt: "Перескажи эту статью: [URL]",
    response:
      "Агент читает страницу по ссылке и возвращает краткое резюме в 3–5 предложениях.",
  },
  {
    emoji: "⏰",
    prompt: "Напомни через 2 часа позвонить",
    response: "Агент создаст напоминание — через 2 часа ты получишь сообщение в Telegram.",
  },
  {
    emoji: "🌤",
    prompt: "Какая погода в Токио?",
    response:
      "Агент использует weather skill и возвращает текущую температуру, влажность, прогноз.",
  },
  {
    emoji: "💡",
    prompt: "Придумай 5 идей для поста про AI",
    response:
      "Агент генерирует пронумерованный список из 5 идей с кратким описанием каждой.",
  },
  {
    emoji: "📁",
    prompt: "Создай файл todo.md со списком задач",
    response: "Агент создаст файл todo.md в workspace с твоим списком задач.",
  },
];

/* ─── Wizard steps ─── */
const wizardSteps = [
  { emoji: "🤖", title: "Выбор AI провайдера", desc: "Anthropic, OpenAI, Qwen или другой" },
  { emoji: "🔑", title: "API ключ провайдера", desc: "Вставишь ключ от выбранного провайдера" },
  { emoji: "💬", title: "Подключение Telegram", desc: "Выберешь Telegram и вставишь Bot Token" },
  { emoji: "📱", title: "Твой Telegram ID", desc: "Визард спросит твой номер телефона и сам добавит тебя в allowlist" },
  { emoji: "✅", title: "Запуск daemon", desc: "Gateway запустится автоматически как системный сервис" },
];

/* ─── Telegram commands ─── */
const telegramCommands = [
  { cmd: "/think high", desc: "глубокое мышление" },
  { cmd: "/think off", desc: "выключить" },
  { cmd: "/reasoning on", desc: "показать рассуждения" },
  { cmd: "/verbose on", desc: "подробный вывод" },
  { cmd: "/status", desc: "статус агента" },
  { cmd: "/help", desc: "список команд" },
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

/* ─── Searchable Accordion ─── */
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
                  <div className="text-zinc-300 bg-zinc-900/60 border border-zinc-800 rounded-lg px-4 py-3 font-mono text-sm">
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
  const [checks, setChecks] = useState([false, false, false, false]);
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedCards, setExpandedCards] = useState<Set<number>>(new Set());
  const [apiTab, setApiTab] = useState(0);

  function toggleCard(idx: number) {
    setExpandedCards((prev) => {
      const next = new Set(prev);
      if (next.has(idx)) next.delete(idx);
      else next.add(idx);
      return next;
    });
  }

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
            4 шага — и агент отвечает в Telegram
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
                { num: 1, title: "Установка OpenClaw", href: "/dashboard/course/block/1/lesson/1" },
                { num: 2, title: "Первый Telegram-агент", href: "/dashboard/course/block/1/lesson/2" },
                { num: 3, title: "Подключения и Skills", href: "/dashboard/course/block/1/lesson/3" },
                { num: 4, title: "Первая автоматизация", href: "/dashboard/course/block/1/lesson/4" },
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
            <p className="text-zinc-400 leading-relaxed">
              OpenClaw поставляется с интерактивным визардом. Он сам запросит токен, настроит доступ и запустит демон. Тебе останется только написать боту первое сообщение.
            </p>
          </section>

          {/* ── Шаг 1 — BotFather ── */}
          <section className="bg-zinc-900 rounded-2xl p-6 md:p-8 border border-zinc-800">
            <h2 className="text-2xl font-semibold text-white mb-4">
              1. Создай бота в Telegram
            </h2>
            <ol className="list-decimal list-inside text-zinc-400 space-y-2 mb-4">
              <li>Открой Telegram → найди @BotFather (синяя галочка верификации)</li>
              <li>Отправь /newbot</li>
              <li>Введи имя бота — любое (например: My Assistant)</li>
              <li>Введи username — должен заканчиваться на bot (my_assistant_bot)</li>
              <li>Скопируй Bot Token — он понадобится на следующем шаге</li>
            </ol>
            <CodeBlock code="/newbot" />
            <div className="mt-4 bg-yellow-900/20 border border-yellow-700/40 rounded-xl px-5 py-4 text-yellow-200 text-sm">
              ⚠️ Bot Token выдаётся один раз. Сохрани его сейчас — он нужен в визарде.
            </div>
          </section>

          {/* ── Шаг 1.5 — API ключ для AI модели ── */}
          <section className="bg-zinc-900 rounded-2xl p-6 md:p-8 border border-zinc-800">
            <h2 className="text-2xl font-semibold text-white mb-4">
              1.5. Получи API ключ для AI модели
            </h2>

            {/* Tabs */}
            <div className="flex gap-2 mb-6">
              {["OpenRouter (рекомендуется)", "Anthropic OAuth"].map((label, idx) => (
                <button
                  key={label}
                  onClick={() => setApiTab(idx)}
                  className={
                    "px-4 py-2 rounded-lg text-sm font-medium transition-colors " +
                    (apiTab === idx
                      ? "bg-[#FF4422] text-white"
                      : "bg-zinc-800 text-zinc-400 hover:text-white")
                  }
                >
                  {label}
                </button>
              ))}
            </div>

            {/* Tab 0 — OpenRouter */}
            {apiTab === 0 && (
              <div className="space-y-4">
                <div className="bg-green-900/20 border border-green-700/40 rounded-xl px-5 py-4 text-green-200 text-sm">
                  ✅ Рекомендуем OpenRouter — единый ключ для 200+ моделей. Если одна модель недоступна — мгновенно переключаешься.
                </div>
                <ol className="list-decimal list-inside text-zinc-400 space-y-2">
                  <li>Открой openrouter.ai → зарегистрируйся</li>
                  <li>Перейди в API Keys → Create Key</li>
                  <li>Скопируй ключ <code className="text-[#FF4422]">sk-or-v1-...</code></li>
                  <li>Пополни баланс от $5 — Haiku стоит ~$0.001 за запрос</li>
                </ol>
                <CodeBlock code="anthropic/claude-haiku-4-5" language="text" />
                <p className="text-zinc-500 text-sm -mt-2">Рекомендуемая модель для старта</p>
                <div className="bg-zinc-800 border border-zinc-700 rounded-xl px-5 py-4 text-zinc-300 text-sm">
                  Haiku через OpenRouter — лучший выбор для начала. Потом можно переключиться на Sonnet или GPT-4o в одну строку конфига.
                </div>
              </div>
            )}

            {/* Tab 1 — Anthropic OAuth */}
            {apiTab === 1 && (
              <div className="space-y-4">
                <div className="bg-blue-900/20 border border-blue-700/40 rounded-xl px-5 py-4 text-blue-200 text-sm">
                  💡 Если у тебя подписка Claude.ai Pro — ключ вводить не нужно. Логинишься через браузер.
                </div>
                <ol className="list-decimal list-inside text-zinc-400 space-y-2">
                  <li>Убедись что активная подписка Claude.ai Pro</li>
                  <li>При запуске визарда выбери провайдер Anthropic</li>
                  <li>Выбери метод OAuth (Claude.ai)</li>
                  <li>Визард откроет браузер → войди в аккаунт Claude → нажми Allow</li>
                  <li>Визард получит токен автоматически</li>
                </ol>
                <CodeBlock code="openclaw auth add anthropic --oauth" />
                <p className="text-zinc-500 text-sm -mt-2">Если нужно переавторизоваться</p>
                <div className="bg-yellow-900/20 border border-yellow-700/40 rounded-xl px-5 py-4 text-yellow-200 text-sm">
                  ⚠️ OAuth токен привязан к подписке. Если подписка истекает — агент перестанет работать. Имей OpenRouter как резерв.
                </div>
              </div>
            )}
          </section>

          {/* ── Шаг 2 — Визард onboard (ГЛАВНАЯ) ── */}
          <section className="bg-zinc-900 rounded-2xl p-6 md:p-8 border border-zinc-800">
            <h2 className="text-2xl font-semibold text-white mb-4">
              2. Запусти визард настройки
            </h2>
            <CodeBlock code="openclaw onboard --install-daemon" />
            <p className="text-zinc-400 mt-4 mb-4 leading-relaxed">
              Визард проведёт тебя через настройку шаг за шагом:
            </p>
            <div className="space-y-3">
              {wizardSteps.map((step) => (
                <div
                  key={step.title}
                  className="bg-zinc-950 border border-zinc-800 rounded-xl px-5 py-4 flex items-start gap-3"
                >
                  <span className="text-xl shrink-0">{step.emoji}</span>
                  <div>
                    <p className="text-white font-medium">{step.title}</p>
                    <p className="text-zinc-400 text-sm">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 bg-blue-900/20 border border-blue-700/40 rounded-xl px-5 py-4 text-blue-200 text-sm">
              💡 Визард автоматически настраивает dmPolicy: allowlist с твоим Telegram ID. После этого ты — единственный, кто может писать боту.
            </div>
            {/* Manual config accordion */}
            <details className="mt-4 bg-zinc-800 border border-zinc-700 rounded-xl overflow-hidden">
              <summary className="flex items-center justify-between px-5 py-4 cursor-pointer text-white font-medium select-none hover:bg-zinc-700/50 transition-colors">
                Настройка вручную (для продвинутых)
                <span className="text-zinc-400 text-sm">Скрыть</span>
              </summary>
              <div className="px-5 pb-5">
                <CodeBlock code={`{
  "channels": {
    "telegram": {
      "enabled": true,
      "botToken": "YOUR_BOT_TOKEN",
      "dmPolicy": "pairing"
    }
  },
  "models": {
    "providers": [{ "name": "anthropic", "apiKey": "sk-ant-..." }]
  }
}`} />
              </div>
            </details>
          </section>

          {/* ── Шаг 3 — Проверка ── */}
          <section className="bg-zinc-900 rounded-2xl p-6 md:p-8 border border-zinc-800">
            <h2 className="text-2xl font-semibold text-white mb-4">
              3. Проверь что Gateway работает
            </h2>
            <CodeBlock code="openclaw gateway status" />
            <p className="text-zinc-400 mt-4 mb-4 leading-relaxed">
              Должен показать статус Running. Если нет:
            </p>
            <CodeBlock code="openclaw gateway start" />
            <p className="text-zinc-400 mt-4 mb-2 leading-relaxed">
              Также можно открыть веб-интерфейс для управления агентом:
            </p>
            <CodeBlock code="openclaw dashboard" />
          </section>

          {/* ── Шаг 4 — Первое сообщение ── */}
          <section className="bg-zinc-900 rounded-2xl p-6 md:p-8 border border-zinc-800">
            <h2 className="text-2xl font-semibold text-white mb-4">
              4. Напиши агенту в Telegram
            </h2>
            <p className="text-zinc-400 mb-4 leading-relaxed">
              Найди своего бота в Telegram по username → нажми Start → напиши что-нибудь. Агент ответит сразу — ты уже в allowlist.
            </p>
            <div className="bg-zinc-800 rounded-xl p-4 flex items-start gap-3 border border-zinc-700">
              <span className="text-2xl">💬</span>
              <div>
                <p className="text-white font-medium mb-1">Попробуй написать:</p>
                <p className="text-zinc-400 text-sm">&laquo;Привет! Что ты умеешь?&raquo;</p>
              </div>
            </div>
          </section>

          {/* ── Что попробовать первым делом ── */}
          <section className="bg-zinc-900 rounded-2xl p-6 md:p-8 border border-zinc-800">
            <h2 className="text-2xl font-semibold text-white mb-6">
              Что попробовать первым делом
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
                          {task.prompt}
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

          {/* ── Команды в Telegram ── */}
          <section className="bg-zinc-900 rounded-2xl p-6 md:p-8 border border-zinc-800">
            <h2 className="text-2xl font-semibold text-white mb-4">
              Полезные команды в Telegram
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {telegramCommands.map((c) => (
                <div
                  key={c.cmd}
                  className="bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3"
                >
                  <code className="text-[#FF4422] text-sm font-mono">{c.cmd}</code>
                  <p className="text-zinc-400 text-sm mt-1">{c.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ── Проблемы и решения ── */}
          <section className="bg-zinc-900 rounded-2xl p-6 md:p-8 border border-zinc-800">
            <h2 className="text-2xl font-semibold text-white mb-4">
              {searchQuery.trim()
                ? `Найдено: ${filteredIssues.length}`
                : "Проблемы и решения"}
            </h2>
            <div className="relative mb-4">
              <input
                type="text"
                placeholder="Найти проблему... (например: token, authorized, gateway)"
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
                "Bot Token получен от BotFather",
                "openclaw onboard --install-daemon завершён",
                "openclaw gateway status → Running",
                "Агент ответил на первое сообщение",
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
