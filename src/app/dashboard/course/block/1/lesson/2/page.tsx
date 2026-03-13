"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

/* ─── Steps config ─── */
const steps = [
  { id: 1, label: "BotFather" },
  { id: 2, label: "Токен" },
  { id: 3, label: "LLM ключ" },
  { id: 4, label: "Запуск" },
  { id: 5, label: "Паринг" },
  { id: 6, label: "Первый диалог" },
] as const;

/* ─── Telegram issues ─── */
type AccordionItem = { title: string; content: string; hint?: string };

const telegramIssues: AccordionItem[] = [
  {
    title: "Бот не отвечает после добавления токена",
    content:
      "Gateway не перезапущен после изменения конфига или токен введён с пробелами/переносами.",
    hint: "openclaw gateway restart && openclaw doctor",
  },
  {
    title: "Pairing code не приходит",
    content: "Bot не добавлен в allowlist или dmPolicy стоит disabled.",
    hint: "Проверь dmPolicy в openclaw.json → поставь 'pairing' или 'open'",
  },
  {
    title: "Invalid bot token (401)",
    content: "Токен введён неверно или был отозван в BotFather.",
    hint: "Перепроверь токен в @BotFather → /mybots → выбери бота → API Token. Скопируй полностью без пробелов.",
  },
  {
    title: "Bot was blocked by the user",
    content:
      "Ты заблокировал бота в Telegram ранее. Нужно разблокировать.",
    hint: "Найди бота → нажми Unblock или Старт",
  },
  {
    title: "Telegram rate limit (429)",
    content:
      "Слишком много запросов к Telegram API. Бот временно ограничен.",
    hint: "Подожди 1-2 минуты. Telegram сам снимет ограничение. Не перезапускай gateway часто.",
  },
  {
    title: "openclaw doctor показывает ошибку токена",
    content:
      "Токен в конфиге указан неверно — возможно, кавычки или пробелы.",
    hint: "cat ~/.openclaw/openclaw.json | python3 -m json.tool — проверить валидность JSON",
  },
];

/* ─── Demo dialogue cards ─── */
const dialogueCards = [
  {
    question: "Привет! Кто ты?",
    answer:
      "Я — твой AI-агент, работающий через OpenClaw. Могу искать информацию, отвечать на вопросы, помогать с задачами — и всё это прямо в Telegram.",
  },
  {
    question: "Что ты умеешь?",
    answer:
      "Поиск в интернете, анализ текста, генерация контента, работа с файлами, выполнение команд на сервере, интеграция с API — и многое другое через плагины.",
  },
  {
    question: "Найди информацию о ближайших событиях в крипто",
    answer:
      "Агент выполнит поиск в интернете и вернёт список ближайших крипто-конференций, хакатонов и значимых событий с датами и ссылками.",
  },
];

/* ─── LLM provider tabs ─── */
const llmTabs = [
  {
    id: "anthropic",
    label: "Anthropic",
    text: "Получи ключ на console.anthropic.com → API Keys → Create Key",
    config: `{
  "models": {
    "providers": [{
      "name": "anthropic",
      "apiKey": "sk-ant-api03-..."
    }]
  },
  "agents": {
    "defaults": {
      "model": { "primary": "anthropic/claude-sonnet-4-5" }
    }
  }
}`,
  },
  {
    id: "openai",
    label: "OpenAI",
    text: "Получи ключ на platform.openai.com → API Keys → Create new",
    config: `{
  "models": {
    "providers": [{
      "name": "openai",
      "apiKey": "sk-proj-..."
    }]
  },
  "agents": {
    "defaults": {
      "model": { "primary": "openai/gpt-4o" }
    }
  }
}`,
  },
  {
    id: "qwen",
    label: "Qwen",
    text: "Получи ключ на dashscope.aliyuncs.com → API Keys",
    config: `{
  "models": {
    "providers": [{
      "name": "qwen",
      "apiKey": "sk-..."
    }]
  },
  "agents": {
    "defaults": {
      "model": { "primary": "qwen/coder-model" }
    }
  }
}`,
  },
] as const;

type LlmTabId = (typeof llmTabs)[number]["id"];

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
  const [openIndex, setOpenIndex] = useState<number | null>(0);

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
  const router = useRouter();

  const [activeStep, setActiveStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(
    new Set()
  );
  const [botToken, setBotToken] = useState("");
  const [activeLlmTab, setActiveLlmTab] = useState<LlmTabId>("anthropic");
  const [searchQuery, setSearchQuery] = useState("");
  const [checks, setChecks] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
  ]);
  const [expandedCard, setExpandedCard] = useState<number | null>(null);

  const sectionRefs = useRef<Record<number, HTMLElement | null>>({});

  const allChecked = checks.every(Boolean);

  function goToStep(id: number) {
    setCompletedSteps((prev) => {
      const next = new Set(prev);
      // mark all steps before the clicked one as completed
      for (let i = 1; i < id; i++) next.add(i);
      return next;
    });
    setActiveStep(id);
    sectionRefs.current[id]?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  /* config builder JSON */
  const configJson = JSON.stringify(
    {
      channels: {
        telegram: {
          enabled: true,
          botToken: botToken || "YOUR_BOT_TOKEN",
        },
      },
    },
    null,
    2
  );

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
            Через 15 минут твой бот будет отвечать в Telegram
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 flex gap-8">
        <aside className="hidden md:block w-56 shrink-0">
          <div className="sticky top-6 bg-zinc-900 border border-zinc-800 rounded-xl p-4">
            <p className="text-xs text-zinc-500 font-semibold uppercase mb-3">Блок 1</p>
            <nav className="flex flex-col gap-1">
              {[
                { num: 1, title: 'Установка OpenClaw', href: '/dashboard/course/block/1/lesson/1' },
                { num: 2, title: 'Первый Telegram-агент', href: '/dashboard/course/block/1/lesson/2' },
                { num: 3, title: 'Подключения и Skills', href: '/dashboard/course/block/1/lesson/3' },
                { num: 4, title: 'Первая автоматизация', href: '/dashboard/course/block/1/lesson/4' },
              ].map(l => (
                <Link key={l.num} href={l.href}
                  className={'flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ' +
                    (2 === l.num
                      ? 'bg-[#FF4422]/10 text-[#FF4422] font-semibold'
                      : 'text-zinc-400 hover:text-white hover:bg-zinc-800')}>
                  <span className={'w-5 h-5 rounded-full border flex items-center justify-center text-xs shrink-0 ' +
                    (2 === l.num ? 'border-[#FF4422]' : 'border-zinc-600')}>
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
            Агент уже установлен. Теперь нужно дать ему голос — подключить
            Telegram. Ты создашь бота через BotFather, добавишь токен в конфиг и
            увидишь первый ответ агента.
          </p>
        </section>

        {/* ── Step progress bar ── */}
        <div className="flex flex-wrap gap-2">
          {steps.map((s) => {
            const isCompleted = completedSteps.has(s.id);
            const isActive = activeStep === s.id;
            return (
              <button
                key={s.id}
                onClick={() => goToStep(s.id)}
                className={`px-4 py-2 rounded-lg text-sm font-semibold border transition-colors flex items-center gap-1.5 ${
                  isActive
                    ? "bg-[#FF4422] border-[#FF4422] text-white"
                    : isCompleted
                    ? "bg-green-900/30 border-green-700 text-green-400"
                    : "bg-zinc-950 border-zinc-800 text-zinc-400 hover:border-zinc-600"
                }`}
              >
                {isCompleted && !isActive ? (
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                ) : (
                  <span>{s.id}</span>
                )}
                {s.label}
              </button>
            );
          })}
        </div>

        {/* ── Шаг 1 — BotFather ── */}
        <section
          ref={(el) => { sectionRefs.current[1] = el; }}
          id="step-1"
          className="bg-zinc-900 rounded-2xl p-6 md:p-8 border border-zinc-800"
        >
          <h3 className="text-xl font-semibold text-white mb-4">
            Создай бота в Telegram
          </h3>
          <p className="text-zinc-400 mb-4 leading-relaxed">
            BotFather — официальный бот Telegram для создания ботов. Найди его
            по username @BotFather (с синей галочкой верификации).
          </p>
          <ol className="list-decimal list-inside text-zinc-400 space-y-2 mb-4">
            <li>Открой Telegram → найди @BotFather → нажми Start</li>
            <li>Отправь команду /newbot</li>
            <li>Введи имя бота (отображаемое, например: My Assistant)</li>
            <li>
              Введи username — должен заканчиваться на bot (например:
              my_assistant_bot)
            </li>
            <li>BotFather пришлёт Bot Token — сохрани его!</li>
          </ol>
          <CodeBlock code="/newbot" />
          <div className="mt-4 bg-yellow-900/20 border border-yellow-700/40 rounded-xl px-5 py-4 text-yellow-200 text-sm">
            ⚠️ Сохрани токен сейчас — он выдаётся один раз. Если потеряешь —
            пересоздай через /revoke в BotFather
          </div>
        </section>

        {/* ── Шаг 2 — Конфиг-билдер ── */}
        <section
          ref={(el) => { sectionRefs.current[2] = el; }}
          id="step-2"
          className="bg-zinc-900 rounded-2xl p-6 md:p-8 border border-zinc-800"
        >
          <h3 className="text-xl font-semibold text-white mb-4">
            Добавь токен в конфиг
          </h3>

          <label className="block text-zinc-400 text-sm mb-2">
            Вставь Bot Token
          </label>
          <input
            type="text"
            value={botToken}
            onChange={(e) => setBotToken(e.target.value)}
            placeholder="1234567890:ABCDEFGabcdefg..."
            className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-4 py-3 text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-[#FF4422] transition-colors text-sm mb-4"
          />

          <CodeBlock code={configJson} language="json" />

          <p className="text-zinc-400 mt-4 mb-2">Открой конфиг в редакторе:</p>
          <CodeBlock code="nano ~/.openclaw/openclaw.json" />
        </section>

        {/* ── Шаг 3 — LLM ключ ── */}
        <section
          ref={(el) => { sectionRefs.current[3] = el; }}
          id="step-3"
          className="bg-zinc-900 rounded-2xl p-6 md:p-8 border border-zinc-800"
        >
          <h3 className="text-xl font-semibold text-white mb-4">
            Подключи AI модель
          </h3>

          <div className="flex flex-wrap gap-2 mb-6">
            {llmTabs.map((tab) => {
              const isActive = activeLlmTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveLlmTab(tab.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold border transition-colors ${
                    isActive
                      ? "bg-[#FF4422] border-[#FF4422] text-white"
                      : "bg-zinc-950 border-zinc-800 text-zinc-400 hover:border-zinc-600"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {llmTabs.map((tab) =>
            activeLlmTab === tab.id ? (
              <div key={tab.id} className="space-y-4">
                <p className="text-zinc-400">{tab.text}</p>
                <CodeBlock code={tab.config} language="json" />
              </div>
            ) : null
          )}
        </section>

        {/* ── Шаг 4 — Запуск ── */}
        <section
          ref={(el) => { sectionRefs.current[4] = el; }}
          id="step-4"
          className="bg-zinc-900 rounded-2xl p-6 md:p-8 border border-zinc-800"
        >
          <h3 className="text-xl font-semibold text-white mb-4">
            Запусти Gateway
          </h3>
          <CodeBlock
            code={`openclaw doctor\nopenclaw gateway restart\nopenclaw gateway status`}
          />
          <p className="text-zinc-400 mt-4">
            doctor проверит конфиг и покажет ошибки. Если Errors: 0 — можно
            рестартовать.
          </p>
        </section>

        {/* ── Шаг 5 — Паринг ── */}
        <section
          ref={(el) => { sectionRefs.current[5] = el; }}
          id="step-5"
          className="bg-zinc-900 rounded-2xl p-6 md:p-8 border border-zinc-800"
        >
          <h3 className="text-xl font-semibold text-white mb-4">
            Одобри первое сообщение
          </h3>
          <p className="text-zinc-400 mb-4 leading-relaxed">
            Найди своего бота в Telegram и отправь /start. Бот попросит
            одобрение — это защита от посторонних.
          </p>
          <CodeBlock
            code={`openclaw pairing list telegram\nopenclaw pairing approve telegram <CODE>`}
          />
          <div className="mt-4 bg-yellow-900/20 border border-yellow-700/40 rounded-xl px-5 py-4 text-yellow-200 text-sm">
            ⚠️ Pairing code истекает через 1 час
          </div>
        </section>

        {/* ── Шаг 6 — Первый диалог ── */}
        <section
          ref={(el) => { sectionRefs.current[6] = el; }}
          id="step-6"
          className="bg-zinc-900 rounded-2xl p-6 md:p-8 border border-zinc-800"
        >
          <h3 className="text-xl font-semibold text-white mb-4">
            Первые команды агенту
          </h3>
          <p className="text-zinc-400 mb-4">
            Попробуй эти команды прямо в Telegram:
          </p>

          <div className="space-y-3">
            {dialogueCards.map((card, idx) => {
              const isExpanded = expandedCard === idx;
              return (
                <button
                  key={idx}
                  onClick={() => setExpandedCard(isExpanded ? null : idx)}
                  className="w-full text-left bg-zinc-950 border border-zinc-800 rounded-xl px-5 py-4 hover:border-zinc-600 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-white font-medium">
                      &ldquo;{card.question}&rdquo;
                    </span>
                    <span className="text-zinc-500 text-sm">
                      {isExpanded ? "Скрыть" : "Что ответит?"}
                    </span>
                  </div>
                  {isExpanded && (
                    <p className="mt-3 text-zinc-400 leading-relaxed text-sm">
                      {card.answer}
                    </p>
                  )}
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
              "Бот создан в BotFather, токен получен",
              "Токен добавлен в openclaw.json",
              "LLM ключ добавлен в конфиг",
              "openclaw doctor → Errors: 0",
              "Паринг одобрен",
              "Первый ответ агента получен в Telegram",
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
          {allChecked && (
            <div className="mt-6">
              <button
                onClick={() =>
                  router.push("/dashboard/course/block/1/lesson/3")
                }
                className="px-6 py-3 bg-[#FF4422] hover:bg-[#e63d1e] text-white font-semibold rounded-lg transition-colors"
              >
                Урок завершён →
              </button>
            </div>
          )}
        </section>

        {/* ── Navigation ── */}
        <nav className="flex items-center justify-between text-sm text-zinc-400">
          <Link
            href="/dashboard/course/block/1/lesson/1"
            className="hover:text-zinc-200 transition-colors"
          >
            ← Урок 1: Установка
          </Link>
          {allChecked ? (
            <button
              onClick={() =>
                router.push("/dashboard/course/block/1/lesson/3")
              }
              className="text-[#FF4422] hover:text-[#ff5a3c] transition-colors"
            >
              Следующий: Урок 3 →
            </button>
          ) : (
            <span className="text-zinc-600">Следующий: Урок 3 →</span>
          )}
        </nav>
        </div>
      </div>
    </main>
  );
}
