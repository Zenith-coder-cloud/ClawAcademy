"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
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
  { id: "websearch", label: "🔍 Web Search" },
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

  const [activeTab, setActiveTab] = useState<SkillTabId>("websearch");
  const [searchQuery, setSearchQuery] = useState("");
  const [checks, setChecks] = useState([false, false, false, false, false]);

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
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <h1 className="text-3xl md:text-4xl font-bold text-white">Урок 3 — Подключения и Skills</h1>
            <span className="inline-flex items-center gap-1 text-xs text-zinc-400 border border-zinc-700 rounded-full px-2.5 py-1">⏱ 30 минут</span>
          </div>
          <p className="text-zinc-400 text-lg">
            Google, Notion, Calendar — агент управляет твоей жизнью
          </p>
        </div>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="w-full bg-zinc-800 h-1 rounded-full mt-2">
            <div className="bg-[#FF4422] h-1 rounded-full" style={{ width: "75%" }} />
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 flex gap-8">
        <aside className="hidden md:block w-56 shrink-0">
          <div className="sticky top-6 bg-zinc-900 border border-zinc-800 rounded-xl p-4">
            <Link href="/dashboard" className="flex items-center gap-1.5 text-xs text-zinc-500 hover:text-white transition-colors mb-3">
              ← Дашборд
            </Link>
            <div className="grid grid-cols-3 gap-1 mb-3">
              <Link href="/dashboard/course/block/0/lesson/1" title="Блок 0: Что такое ИИ-агент" className="text-center text-xs py-1.5 rounded-lg border border-zinc-700 text-zinc-400 hover:text-white hover:border-zinc-500 transition-colors">0</Link>
              <Link href="/dashboard/course/block/1/lesson/1" title="Блок 1: Установка и первый агент" className="text-center text-xs py-1.5 rounded-lg border border-[#FF4422] text-[#FF4422]">1</Link>
              <Link href="/dashboard/course/block/2/lesson/1" title="Блок 2: Первые реальные кейсы" className="text-center text-xs py-1.5 rounded-lg border border-zinc-700 text-zinc-400 hover:text-white hover:border-zinc-500 transition-colors">2</Link>
              <Link href="/dashboard/course/block/3/lesson/1" title="Блок 3: Мультиагент и автоматизация" className="text-center text-xs py-1.5 rounded-lg border border-zinc-700 text-zinc-400 hover:text-white hover:border-zinc-500 transition-colors">3</Link>
              <Link href="/dashboard/course/block/4/lesson/1" title="Блок 4: Продай своего агента" className="text-center text-xs py-1.5 rounded-lg border border-zinc-700 text-zinc-400 hover:text-white hover:border-zinc-500 transition-colors">4</Link>
              <Link href="/dashboard/course/block/5/lesson/1" title="Блок 5: Агентский бизнес" className="text-center text-xs py-1.5 rounded-lg border border-zinc-700 text-zinc-400 hover:text-white hover:border-zinc-500 transition-colors">5</Link>
            </div>
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
        <Image src="/course/block1/lesson3/b1-l3-skills.png" alt="Skills" width={1280} height={720} className="w-full rounded-2xl object-cover" />
        {/* ── Intro ── */}
        <section className="bg-zinc-900 rounded-2xl p-6 md:p-8 border border-zinc-800">
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

        {/* ── Как это работает (диалог с агентом) ── */}
        <section className="bg-zinc-900 rounded-2xl p-6 md:p-8 border border-zinc-800">
          <h2 className="text-2xl font-semibold text-white mb-4">Как это работает</h2>
          <p className="text-zinc-400 mb-4 leading-relaxed">
            Skill — это файл <code className="text-[#FF4422]">SKILL.md</code> с инструкциями для агента. Когда ты просишь что-то сделать — агент читает нужный skill и понимает как использовать инструмент.
          </p>
          <div className="bg-zinc-950 border border-zinc-700 rounded-xl p-5 mb-4">
            <p className="text-zinc-500 text-xs mb-3 font-mono">Пример диалога в Telegram:</p>
            <div className="space-y-3">
              <div className="flex justify-end"><div className="bg-blue-900/40 border border-blue-700/40 rounded-xl px-4 py-2 text-blue-200 text-sm max-w-xs">Что у меня сегодня в календаре?</div></div>
              <div className="flex justify-start"><div className="bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-2 text-zinc-200 text-sm max-w-sm">📅 Сегодня, 14 марта:<br/>10:00 — Встреча с командой (1 час)<br/>14:30 — Звонок с клиентом (30 мин)<br/>18:00 — Тренировка</div></div>
              <div className="flex justify-end"><div className="bg-blue-900/40 border border-blue-700/40 rounded-xl px-4 py-2 text-blue-200 text-sm max-w-xs">Перенеси звонок с клиентом на 15:00</div></div>
              <div className="flex justify-start"><div className="bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-2 text-zinc-200 text-sm max-w-sm">✓ Готово — звонок перенесён на 14 марта, 15:00</div></div>
            </div>
          </div>
          <div className="bg-zinc-800/60 border border-zinc-700 rounded-xl px-5 py-3 text-zinc-400 text-sm">
            Skills хранятся в <code className="text-zinc-300">~/.openclaw/skills/</code> (глобальные) и <code className="text-zinc-300">workspace/skills/</code> (для конкретного агента)
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

          {/* ── Web Search Tab ── */}
          {activeTab === 'websearch' && (
            <div className="space-y-6">
              <div className="bg-green-900/20 border border-green-700/40 rounded-xl px-5 py-4 text-green-200 text-sm">
                🔍 Web Search — самый используемый skill. Агент ищет в интернете в реальном времени.
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Шаг 1: Получить ключ Brave Search API</h3>
                <ol className="list-decimal list-inside text-zinc-400 space-y-1 mb-3">
                  <li>Открой <a href="https://brave.com/search/api/" target="_blank" rel="noopener noreferrer" className="text-[#FF4422] hover:underline">brave.com/search/api</a> → Free plan (2000 запросов/мес)</li>
                  <li>Создай аккаунт → API Keys → Create</li>
                  <li>Скопируй ключ BSA_...</li>
                </ol>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Шаг 2: Добавить в конфиг</h3>
                <CodeBlock code={'openclaw configure\n# или напрямую в ~/.openclaw/openclaw.json:\n# "webSearch": { "provider": "brave", "apiKey": "BSA_..." }'} />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Примеры команд агенту</h3>
                <div className="space-y-2">
                  {['Найди последние новости про OpenAI', 'Что происходит с биткоином сегодня?', 'Найди рецепт пасты карбонара', 'Какие рестораны открыты сейчас?'].map(cmd => (
                    <div key={cmd} className="bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2 text-zinc-300 text-sm font-mono">
                      💬 {cmd}
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-zinc-800 border border-zinc-700 rounded-xl px-5 py-4 text-zinc-300 text-sm">
                Альтернативы: Gemini Search (нужен Google API ключ), Grok Search (xAI API). Настраиваются через <code className="text-[#FF4422]">openclaw configure</code>.
              </div>
              <img src="/course/block1/lesson3/b1-l3-websearch.png" alt="Web Search" className="w-full rounded-xl object-cover mt-4" />
            </div>
          )}

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

              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Скажи агенту в Telegram</h3>
                <div className="space-y-2">
                  {['Что у меня сегодня в расписании?', 'Создай встречу завтра в 10 утра — Звонок с командой на 1 час', 'Найди письмо от Ивана за последние 3 дня', 'Покажи файлы в Google Drive папке Projects'].map(cmd => (
                    <div key={cmd} className="bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2 text-zinc-300 text-sm font-mono">💬 {cmd}</div>
                  ))}
                </div>
              </div>
            <img src="/course/block1/lesson3/b1-l3-google.png" alt="Google Calendar skill" className="w-full rounded-xl object-cover mt-4" />
            </div>
          )}

          {/* ── Notion Tab ── */}
          {activeTab === "notion" && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Шаг 1: Получить API ключ</h3>
                <ol className="list-decimal list-inside text-zinc-400 space-y-1 mb-3">
                  <li>Открой <a href="https://notion.so/my-integrations" target="_blank" rel="noopener noreferrer" className="text-[#FF4422] hover:underline">notion.so/my-integrations</a></li>
                  <li>New integration → дай имя → Submit</li>
                  <li>Скопируй Internal Integration Token (ntn_...)</li>
                </ol>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Шаг 2: Настроить</h3>
                <CodeBlock code={'mkdir -p ~/.config/notion\necho ntn_YOUR_API_KEY > ~/.config/notion/api_key\nchmod 600 ~/.config/notion/api_key'} />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Шаг 3: Поделиться базой с интеграцией</h3>
                <p className="text-zinc-400 mb-2">Открой нужную базу в Notion → ... (три точки) → Connections → добавь свою интеграцию</p>
                <div className="bg-yellow-900/20 border border-yellow-700/40 rounded-xl px-4 py-3 text-yellow-200 text-sm">⚠️ Без этого шага агент не увидит базу — Notion требует явного разрешения для каждой базы</div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Установить skill</h3>
                <CodeBlock code="clawhub install notion" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Скажи агенту в Telegram</h3>
                <div className="space-y-2">
                  {['Найди задачи со статусом In Progress в моей Notion базе', 'Создай новую страницу Идеи для проекта в базе Tasks', 'Покажи все записи из базы CRM где статус = Новый'].map(cmd => (
                    <div key={cmd} className="bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2 text-zinc-300 text-sm font-mono">💬 {cmd}</div>
                  ))}
                </div>
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
            <div className="space-y-6">
              <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-5">
                <div className="flex items-center gap-3 mb-3"><span className="text-2xl">🐙</span><h3 className="text-white font-semibold">GitHub</h3></div>
                <CodeBlock code={'gh auth login\nclawhub install github'} />
                <div className="mt-3 space-y-1">{['Покажи открытые issues в репо my-org/my-repo', 'Создай PR из ветки feature/login в main', 'Какой статус последнего CI запуска?'].map(cmd => (<div key={cmd} className="bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-1.5 text-zinc-400 text-xs font-mono">💬 {cmd}</div>))}</div>
              </div>
              <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-5">
                <div className="flex items-center gap-3 mb-3"><span className="text-2xl">🐦</span><h3 className="text-white font-semibold">Twitter / X</h3></div>
                <CodeBlock code="clawhub install xurl" />
                <p className="text-zinc-400 text-sm mt-2">Нужен X API ключ (developer.twitter.com). Агент может постить, читать ленту, отвечать на упоминания.</p>
              </div>
              <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-5">
                <div className="flex items-center gap-3 mb-3"><span className="text-2xl">🐻</span><h3 className="text-white font-semibold">Bear Notes</h3></div>
                <CodeBlock code="clawhub install bear-notes" />
                <div className="mt-3 space-y-1">{['Найди заметки с тегом #проект', 'Создай новую заметку: Идеи для продукта'].map(cmd => (<div key={cmd} className="bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-1.5 text-zinc-400 text-xs font-mono">💬 {cmd}</div>))}</div>
              </div>
              <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-5">
                <div className="flex items-center gap-3 mb-3"><span className="text-2xl">🌤</span><h3 className="text-white font-semibold">Погода</h3></div>
                <p className="text-zinc-400 text-sm mb-2">Встроен — не требует установки. Использует wttr.in (без API ключа).</p>
                <div className="space-y-1">{['Какая погода в Москве?', 'Прогноз на неделю для Бангкока'].map(cmd => (<div key={cmd} className="bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-1.5 text-zinc-400 text-xs font-mono">💬 {cmd}</div>))}</div>
              </div>
            </div>
          )}
        </section>

        {/* ── ClawHub install ── */}
        <section className="bg-zinc-900 rounded-2xl p-6 md:p-8 border border-zinc-800">
          <h2 className="text-2xl font-semibold text-white mb-4">
            Найти и установить новый skill
          </h2>
          <p className="text-zinc-400 mb-4">
            Все публичные skills доступны на <a href="https://clawhub.ai" target="_blank" rel="noopener noreferrer" className="text-[#FF4422] hover:underline">clawhub.ai</a> — бесплатный реестр. Доступно 37+ skills.
          </p>
          <CodeBlock
            code={`# Поиск\nclawhub search 'calendar'\nclawhub search 'notion'\n\n# Установка\nclawhub install <skill-slug>\n\n# Список установленных\nclawhub list\n\n# Обновить все\nclawhub update --all`}
          />
          <img src="/course/block1/lesson3/b1-l3-clawhub.png" alt="ClawHub — маркетплейс skills" className="w-full rounded-xl object-cover mt-4" />
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
          <div className="overflow-y-auto max-h-72">
            <Accordion items={filteredIssues} />
          </div>
        </section>

        {/* ── Чекпоинт ── */}
        <section className="bg-zinc-900 rounded-2xl p-6 md:p-8 border border-zinc-800">
          <h2 className="text-2xl font-semibold text-white mb-4">
            ✅ Чекпоинт
          </h2>
          <div className="space-y-3">
            {[
              "Агент нашёл информацию в интернете по моей просьбе",
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
