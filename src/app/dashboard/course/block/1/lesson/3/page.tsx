"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

/* ─── Troubleshooting issues ─── */
type AccordionItem = { title: string; content: string; hint?: string };

const skillsIssues: AccordionItem[] = [
  {
    title: "gog: command not found",
    content:
      "gogcli не установлен или не в PATH после brew install.",
    hint: "brew install steipete/tap/gogcli && source ~/.zshrc",
  },
  {
    title: "OAuth Error: invalid_client",
    content:
      "credentials JSON скачан неверно или проект в Google Cloud не настроен. Application type должен быть Desktop app, не Web.",
    hint: "Пересоздай credentials: Cloud Console → Credentials → Delete → Create new → Desktop app",
  },
  {
    title: "Skill не активируется после clawhub install",
    content:
      "Агент подхватывает skills при старте сессии. Если skill установлен в текущей сессии — нужен перезапуск.",
    hint: "Закрой текущий чат → открой новый. Или: openclaw gateway restart",
  },
  {
    title: "NOTION_API_KEY: permission denied на базу",
    content:
      "Ключ создан, но база не расшарена с интеграцией. Notion требует явного добавления.",
    hint: "В Notion: открой базу → ... (три точки) → Connections → найди свою интеграцию → Connect",
  },
  {
    title: "Google API rate limit (429)",
    content:
      "Превышен лимит запросов к Google API. Бесплатный tier: 1 миллиард units/day, но конкретные API имеют свои лимиты.",
    hint: "Подожди 1-2 минуты. Для постоянных задач — добавь задержку между вызовами (sleep 1)",
  },
  {
    title: "clawhub install: skill not found",
    content:
      "Slug введён неверно или skill не опубликован на clawhub.com.",
    hint: "clawhub search <keyword> — найди точный slug. Или установить вручную: скопировать папку skill в ~/.openclaw/skills/",
  },
];

/* ─── Skills tabs config ─── */
const skillTabs = [
  { id: "google", label: "🌐 Google" },
  { id: "notion", label: "📝 Notion" },
  { id: "reminders", label: "📅 Reminders" },
  { id: "other", label: "🔧 Другие" },
] as const;

type SkillTabId = (typeof skillTabs)[number]["id"];

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
export default function Block1Lesson3Page() {
  const router = useRouter();

  const [activeTab, setActiveTab] = useState<SkillTabId>("google");
  const [searchQuery, setSearchQuery] = useState("");
  const [checks, setChecks] = useState([false, false, false, false]);

  const allChecked = checks.every(Boolean);

  /* search filter */
  const filteredIssues = searchQuery.trim()
    ? skillsIssues.filter((item) =>
        [item.title, item.content, item.hint ?? ""].some((t) =>
          t.toLowerCase().includes(searchQuery.toLowerCase())
        )
      )
    : skillsIssues;

  return (
    <main className="min-h-screen bg-[#0D0D0D] text-zinc-200">
      {/* ── Hero ── */}
      <section className="border-b border-zinc-900">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <p className="text-[#FF4422] text-sm font-semibold mb-2">
            Блок 1 · Урок 3 из 4
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
            Урок 3 — Подключения и Skills
          </h1>
          <p className="text-zinc-400 text-lg">
            Google, Notion, Calendar — агент управляет твоей жизнью
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
                    (3 === l.num
                      ? 'bg-[#FF4422]/10 text-[#FF4422] font-semibold'
                      : 'text-zinc-400 hover:text-white hover:bg-zinc-800')}>
                  <span className={'w-5 h-5 rounded-full border flex items-center justify-center text-xs shrink-0 ' +
                    (3 === l.num ? 'border-[#FF4422]' : 'border-zinc-600')}>
                    {l.num}
                  </span>
                  {l.title}
                </Link>
              ))}
            </nav>
          </div>
        </aside>
        <div className="flex-1 min-w-0 flex flex-col gap-8">
        <section className="bg-zinc-900 rounded-2xl p-6 md:p-8 border border-zinc-800">
          <h2 className="text-2xl font-semibold text-white mb-4">
          </h2>
          <p className="text-zinc-400 leading-relaxed">
            Skills — это расширения агента. Каждый skill добавляет новую
            способность: управлять почтой, создавать события в календаре,
            работать с Notion. Подключишь Google — агент будет знать твоё
            расписание.
          </p>
        </section>

        {/* ── Как устроены Skills ── */}
        <section className="bg-zinc-900 rounded-2xl p-6 md:p-8 border border-zinc-800">
          <h2 className="text-2xl font-semibold text-white mb-6">
            Как устроены Skills
          </h2>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 bg-zinc-950 border border-zinc-800 rounded-xl p-5">
              <div className="text-2xl mb-2">🧩</div>
              <h3 className="text-white font-semibold mb-1">Skill</h3>
              <p className="text-zinc-400 text-sm">
                Инструкция для агента в формате Markdown
              </p>
            </div>
            <div className="flex-1 bg-zinc-950 border border-zinc-800 rounded-xl p-5">
              <div className="text-2xl mb-2">📦</div>
              <h3 className="text-white font-semibold mb-1">Установка</h3>
              <p className="text-zinc-400 text-sm">
                Через clawhub CLI или вручную
              </p>
            </div>
            <div className="flex-1 bg-zinc-950 border border-zinc-800 rounded-xl p-5">
              <div className="text-2xl mb-2">⚡</div>
              <h3 className="text-white font-semibold mb-1">Активация</h3>
              <p className="text-zinc-400 text-sm">
                Перезапуск сессии, агент находит автоматически
              </p>
            </div>
          </div>
        </section>

        {/* ── Skills Switcher ── */}
        <section className="bg-zinc-900 rounded-2xl p-6 md:p-8 border border-zinc-800">
          <h2 className="text-2xl font-semibold text-white mb-6">
            Подключение Skills
          </h2>

          {/* Tabs */}
          <div className="flex flex-wrap gap-2 mb-6">
            {skillTabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
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

          {/* ── Google Tab ── */}
          {activeTab === "google" && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">
                  Шаг 1: Установить gog CLI
                </h3>
                <CodeBlock code="brew install steipete/tap/gogcli" />
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-3">
                  Шаг 2: Google Cloud Console
                </h3>
                <p className="text-zinc-400 mb-3">
                  Создай OAuth credentials на console.cloud.google.com:
                </p>
                <ul className="list-disc list-inside text-zinc-400 space-y-1 mb-3">
                  <li>
                    APIs &amp; Services → Credentials → Create OAuth 2.0 Client
                    ID
                  </li>
                  <li>Application type: Desktop app</li>
                  <li>
                    Скачай JSON → сохрани как google_oauth_client.json
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-3">
                  Шаг 3: Настроить gog
                </h3>
                <CodeBlock
                  code={`gog auth credentials /path/to/google_oauth_client.json\ngog auth add you@gmail.com --services gmail,calendar,drive,contacts`}
                />
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-3">
                  Шаг 4: Проверить
                </h3>
                <CodeBlock code="gog auth list" />
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-3">
                  Примеры команд агенту
                </h3>
                <CodeBlock
                  code={`# Что сегодня в расписании?\ngog calendar events primary --from today --to today\n\n# Создать встречу\ngog calendar create primary --summary 'Встреча' --from 2026-03-15T10:00:00 --to 2026-03-15T11:00:00\n\n# Найти письмо\ngog gmail search 'newer_than:3d from:boss@company.com' --max 5`}
                />
              </div>
            </div>
          )}

          {/* ── Notion Tab ── */}
          {activeTab === "notion" && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">
                  Шаг 1: Получить API ключ
                </h3>
                <p className="text-zinc-400">
                  Открой notion.so/my-integrations → New integration → скопируй
                  Internal Integration Token
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-3">
                  Шаг 2: Настроить
                </h3>
                <CodeBlock
                  code={`mkdir -p ~/.config/notion\necho 'ntn_YOUR_API_KEY' > ~/.config/notion/api_key\nchmod 600 ~/.config/notion/api_key`}
                />
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-3">
                  Шаг 3: Поделиться базой с интеграцией
                </h3>
                <p className="text-zinc-400">
                  Открой нужную базу в Notion → ... → Connections → добавь свою
                  интеграцию
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-3">
                  Примеры
                </h3>
                <CodeBlock
                  code={`# Поиск страниц\ncurl -X POST https://api.notion.com/v1/search \\\n  -H 'Authorization: Bearer YOUR_KEY' \\\n  -H 'Notion-Version: 2022-06-28' \\\n  -d '{"query": "проект"}'`}
                />
              </div>
            </div>
          )}

          {/* ── Reminders Tab ── */}
          {activeTab === "reminders" && (
            <div className="space-y-6">
              <p className="text-zinc-400">
                Apple Reminders управляются через remindctl — встроенный skill
                OpenClaw.
              </p>
              <CodeBlock
                code={`# Добавить напоминание\nremindctl add --list 'Work' --title 'Позвонить клиенту' --due '2026-03-15 10:00'\n\n# Список на сегодня\nremindctl list --due today\n\n# Завершить\nremindctl complete <id>`}
              />
            </div>
          )}

          {/* ── Other Tab ── */}
          {activeTab === "other" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-5">
                <div className="text-2xl mb-2">🐙</div>
                <h3 className="text-white font-semibold mb-1">GitHub</h3>
                <p className="text-zinc-400 text-sm">
                  Управление issues, PR через gh CLI
                </p>
              </div>
              <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-5">
                <div className="text-2xl mb-2">💬</div>
                <h3 className="text-white font-semibold mb-1">
                  Discord / Slack
                </h3>
                <p className="text-zinc-400 text-sm">
                  Как дополнительные каналы
                </p>
              </div>
              <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-5">
                <div className="text-2xl mb-2">🐦</div>
                <h3 className="text-white font-semibold mb-1">Twitter / X</h3>
                <p className="text-zinc-400 text-sm">
                  xurl skill для постинга
                </p>
              </div>
              <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-5">
                <div className="text-2xl mb-2">📊</div>
                <h3 className="text-white font-semibold mb-1">
                  Google Sheets
                </h3>
                <p className="text-zinc-400 text-sm">
                  gog sheets get/update
                </p>
              </div>
            </div>
          )}
        </section>

        {/* ── ClawHub install ── */}
        <section className="bg-zinc-900 rounded-2xl p-6 md:p-8 border border-zinc-800">
          <h2 className="text-2xl font-semibold text-white mb-4">
            Найти и установить новый skill
          </h2>
          <CodeBlock
            code={`# Поиск\nclawhub search 'calendar'\nclawhub search 'notion'\n\n# Установка\nclawhub install <skill-slug>\n\n# Список установленных\nclawhub list\n\n# Обновить все\nclawhub update --all`}
          />
          <div className="mt-4 bg-yellow-900/20 border border-yellow-700/40 rounded-xl px-5 py-4 text-yellow-200 text-sm">
            💡 После установки — перезапусти сессию в OpenClaw. Агент подхватит
            skill автоматически.
          </div>
        </section>

        {/* ── Проблемы и решения ── */}
        <section className="bg-zinc-900 rounded-2xl p-6 md:p-8 border border-zinc-800">
          <h2 className="text-2xl font-semibold text-white mb-4">
            {searchQuery.trim()
              ? `Найдено: ${filteredIssues.length}`
              : "Проблемы и решения — Skills"}
          </h2>
          <div className="relative mb-4">
            <input
              type="text"
              placeholder="Найти проблему... (например: oauth, notion, clawhub)"
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
              "gog auth list показывает мой аккаунт",
              "Агент ответил на вопрос про сегодняшний календарь",
              "Установил хотя бы один новый skill через clawhub",
              "openclaw doctor — нет ошибок",
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
                  router.push("/dashboard/course/block/1/lesson/4")
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
            href="/dashboard/course/block/1/lesson/2"
            className="hover:text-zinc-200 transition-colors"
          >
            ← Урок 2: Telegram агент
          </Link>
          {allChecked ? (
            <button
              onClick={() =>
                router.push("/dashboard/course/block/1/lesson/4")
              }
              className="text-[#FF4422] hover:text-[#ff5a3c] transition-colors"
            >
              Урок 4: Автоматизация →
            </button>
          ) : (
            <span className="text-zinc-600">Урок 4: Автоматизация →</span>
          )}
        </nav>
        </div>
      </div>
    </main>
  );
}
