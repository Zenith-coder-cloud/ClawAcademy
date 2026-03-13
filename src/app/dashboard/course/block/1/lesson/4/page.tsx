"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

/* ─── Troubleshooting issues ─── */
type AccordionItem = { title: string; content: string; hint?: string };

const automationIssues: AccordionItem[] = [
  {
    title: "Cron не срабатывает в указанное время",
    content:
      "Gateway не запущен в момент срабатывания или неверный timezone. Cron использует timezone системы.",
    hint: "openclaw gateway status — убедись что Running. Проверь timezone: date. Для VPS: timedatectl set-timezone Europe/Moscow",
  },
  {
    title: "Сообщение от cron не приходит в Telegram",
    content:
      "Параметр --to не указан или Telegram ID неверный. Нужен числовой ID, не username.",
    hint: "Узнай свой ID: отправь /start боту @userinfobot. Добавь --to YOUR_NUMERIC_ID в команду cron.",
  },
  {
    title: "Heartbeat молчит весь день",
    content:
      "activeHours ограничивает работу heartbeat. По умолчанию работает только в активные часы.",
    hint: "Проверь конфиг: activeHours в openclaw.json. Или убери ограничение: удали activeHours секцию.",
  },
  {
    title: "Timezone: задача срабатывает не в то время",
    content:
      "Cron использует системный timezone сервера/компьютера. На VPS часто UTC.",
    hint: "timedatectl set-timezone Europe/Moscow (или свой timezone). Перезапусти gateway: openclaw gateway restart",
  },
  {
    title: "Агент молчит в --session isolated",
    content:
      "В isolated сессии агент не имеет доступа к истории чата. Если задача требует контекста — используй --session main.",
    hint: "Замени --session isolated на --session main. Осторожно: main сессия влияет на основной контекст агента.",
  },
  {
    title: "Webhook возвращает 401",
    content:
      "Webhook endpoint защищён. Нужен Authorization header или secret в URL.",
    hint: "Добавь в конфиг: webhook.secret = YOUR_SECRET. Передавай в заголовке: Authorization: Bearer YOUR_SECRET",
  },
];

/* ─── Cron tabs config ─── */
const cronTabs = [
  { id: "every", label: "⏰ every" },
  { id: "at", label: "📅 at" },
  { id: "cron", label: "🔧 cron" },
] as const;

type CronTabId = (typeof cronTabs)[number]["id"];

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
export default function Block1Lesson4Page() {
  const [activeCronTab, setActiveCronTab] = useState<CronTabId>("every");
  const [searchQuery, setSearchQuery] = useState("");
  const [checks, setChecks] = useState([false, false, false, false, false, false]);

  const allChecked = checks.every(Boolean);

  /* search filter */
  const filteredIssues = searchQuery.trim()
    ? automationIssues.filter((item) =>
        [item.title, item.content, item.hint ?? ""].some((t) =>
          t.toLowerCase().includes(searchQuery.toLowerCase())
        )
      )
    : automationIssues;

  return (
    <main className="min-h-screen bg-[#0D0D0D] text-zinc-200">
      {/* ── Hero ── */}
      <section className="border-b border-zinc-900">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <p className="text-[#FF4422] text-sm font-semibold mb-2">
            Блок 1 · Урок 4 из 4
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
            Урок 4 — Первая автоматизация
          </h1>
          <p className="text-zinc-400 text-lg">
            Агент работает пока ты спишь
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
                    (4 === l.num
                      ? 'bg-[#FF4422]/10 text-[#FF4422] font-semibold'
                      : 'text-zinc-400 hover:text-white hover:bg-zinc-800')}>
                  <span className={'w-5 h-5 rounded-full border flex items-center justify-center text-xs shrink-0 ' +
                    (4 === l.num ? 'border-[#FF4422]' : 'border-zinc-600')}>
                    {l.num}
                  </span>
                  {l.title}
                </Link>
              ))}
            </nav>
          </div>
        </aside>
        <div className="flex-1 min-w-0 flex flex-col gap-8">

        {/* ── Hero image ── */}
        <Image src="/course/block1/lesson4/b1-l4-automation.png" alt="Автоматизация агента" width={1280} height={720} className="w-full rounded-2xl object-cover" />

        {/* ── Intro ── */}
        <section className="bg-zinc-900 rounded-2xl p-6 md:p-8 border border-zinc-800">
          <p className="text-zinc-400 leading-relaxed">
            Ты настроил агента вручную. Теперь сделаем его автономным — пусть
            сам отправляет утренний дайджест, следит за ценами, напоминает о
            встречах. Без твоего участия.
          </p>
        </section>

        {/* ── Два способа автоматизации ── */}
        <section className="bg-zinc-900 rounded-2xl p-6 md:p-8 border border-zinc-800">
          <h2 className="text-2xl font-semibold text-white mb-6">
            Два способа автоматизации
          </h2>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 bg-zinc-950 border border-zinc-800 rounded-xl p-5">
              <div className="text-2xl mb-2">⏰</div>
              <h3 className="text-white font-semibold mb-1">Cron задачи</h3>
              <p className="text-zinc-400 text-sm">
                Точное расписание: каждый день в 9:00, каждый понедельник
              </p>
            </div>
            <div className="flex-1 bg-zinc-950 border border-zinc-800 rounded-xl p-5">
              <div className="text-2xl mb-2">💓</div>
              <h3 className="text-white font-semibold mb-1">Heartbeat</h3>
              <p className="text-zinc-400 text-sm">
                Агент сам проверяет задачи каждые 30 минут
              </p>
            </div>
          </div>
        </section>

        {/* ── Концепция автоматизации ── */}
        <section className="bg-zinc-900 rounded-2xl p-6 md:p-8 border border-zinc-800">
          <h2 className="text-2xl font-semibold text-white mb-4">Как это выглядит на практике</h2>
          <p className="text-zinc-400 mb-4 leading-relaxed">
            Ты создаёшь задачу один раз — агент выполняет её каждый день. Например, каждое утро в 9:00 ты получаешь в Telegram:
          </p>
          <div className="bg-zinc-950 border border-zinc-700 rounded-xl p-5 mb-4">
            <p className="text-zinc-500 text-xs mb-3 font-mono">Автоматическое сообщение в Telegram — 09:00</p>
            <div className="bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-zinc-200 text-sm space-y-1">
              <p>☀️ <strong>Доброе утро!</strong></p>
              <p>🌤 Погода: +18°C, облачно, без осадков</p>
              <p>₿ BTC: $64,320 <span className="text-red-400">▼ -1.2%</span></p>
              <p>Ξ ETH: $3,180 <span className="text-green-400">▲ +0.8%</span></p>
              <p>📅 Сегодня: 10:00 Встреча с командой · 14:30 Звонок с клиентом</p>
            </div>
          </div>
          <p className="text-zinc-500 text-sm">Это агент — не уведомление приложения. Он сам ищет данные, форматирует и присылает.</p>
        </section>

        {/* ── Cron задачи ── */}
        <section className="bg-zinc-900 rounded-2xl p-6 md:p-8 border border-zinc-800">
          <h2 className="text-2xl font-semibold text-white mb-6">
            Cron — расписание для агента
          </h2>

          {/* Tabs */}
          <div className="flex flex-wrap gap-2 mb-6">
            {cronTabs.map((tab) => {
              const isActive = activeCronTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveCronTab(tab.id)}
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

          {/* ── every Tab ── */}
          {activeCronTab === "every" && (
            <div className="space-y-4">
              <p className="text-zinc-400">
                Повтор через интервал — каждые N минут/часов/дней
              </p>
              <CodeBlock
                code={`# Каждый день в 9:00 — утренний дайджест
openclaw cron add \\
  --name "Morning digest" \\
  --every 86400000 \\
  --session isolated \\
  --message "Доброе утро! Кратко: 1) Погода 2) BTC/ETH цены 3) Мои встречи из Google Calendar" \\
  --announce \\
  --channel telegram \\
  --to YOUR_TELEGRAM_ID

# Каждые 30 минут — мониторинг цены
openclaw cron add \\
  --name "BTC monitor" \\
  --every 1800000 \\
  --session isolated \\
  --message "Проверь цену BTC. Если упала больше 5% за час — сообщи мне" \\
  --announce \\
  --channel telegram \\
  --to YOUR_TELEGRAM_ID`}
              />
            </div>
          )}

          {/* ── at Tab ── */}
          {activeCronTab === "at" && (
            <div className="space-y-4">
              <p className="text-zinc-400">
                Одноразовый запуск в конкретное время
              </p>
              <CodeBlock
                code={`# Напомнить через 1 час (одноразово)
openclaw cron add \\
  --name "Reminder" \\
  --at "+1h" \\
  --session isolated \\
  --message "Напомни позвонить клиенту по поводу договора" \\
  --announce \\
  --channel telegram \\
  --to YOUR_TELEGRAM_ID

# В конкретное время
openclaw cron add \\
  --name "Meeting reminder" \\
  --at "2026-03-15T18:00:00" \\
  --session isolated \\
  --message "Встреча через 30 минут! Подготовь краткое резюме по проекту" \\
  --announce \\
  --channel telegram \\
  --to YOUR_TELEGRAM_ID`}
              />
            </div>
          )}

          {/* ── cron Tab ── */}
          {activeCronTab === "cron" && (
            <div className="space-y-4">
              <p className="text-zinc-400">
                Стандартный cron синтаксис для сложных расписаний
              </p>
              <CodeBlock
                code={`# Каждый понедельник в 8:00 — еженедельный отчёт
openclaw cron add \\
  --name "Weekly report" \\
  --cron "0 8 * * 1" \\
  --tz "Europe/Moscow" \\
  --session isolated \\
  --message "Еженедельный отчёт: подведи итоги недели по моим задачам" \\
  --announce \\
  --channel telegram \\
  --to YOUR_TELEGRAM_ID

# Каждый будний день в 17:30
openclaw cron add \\
  --name "EOD check" \\
  --cron "30 17 * * 1-5" \\
  --tz "Europe/Moscow" \\
  --session isolated \\
  --message "Рабочий день заканчивается. Что осталось несделанным?" \\
  --announce \\
  --channel telegram \\
  --to YOUR_TELEGRAM_ID`}
              />
            </div>
          )}

          {/* Управление */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-white mb-3">
              Управление
            </h3>
            <CodeBlock
              code={`openclaw cron list                    # список всех задач
openclaw cron run --id <job-id>       # запустить вручную
openclaw cron runs --id <job-id>      # история запусков
openclaw cron remove --id <job-id>    # удалить`}
            />
          </div>
        </section>

        {/* ── Heartbeat ── */}
        <section className="bg-zinc-900 rounded-2xl p-6 md:p-8 border border-zinc-800">
          <h2 className="text-2xl font-semibold text-white mb-4">
            Heartbeat — агент сам проверяет задачи
          </h2>
          <div className="bg-zinc-800/60 border border-zinc-700 rounded-xl px-5 py-3 text-zinc-400 text-sm mb-4">
            📄 Файл: <code className="text-zinc-300">~/.openclaw/workspace/HEARTBEAT.md</code> — редактируй в любом редакторе. Агент читает его при каждом heartbeat.
          </div>
          <p className="text-zinc-400 leading-relaxed mb-4">
            Heartbeat — это специальный режим. Каждые 30 минут OpenClaw
            спрашивает агента: «Есть что-то важное?» Агент читает HEARTBEAT.md и
            решает сам.
          </p>

          <CodeBlock
            language="markdown"
            code={`## Проверяй каждые 30 минут:
- Если BTC упал больше 3% за час — сообщи мне в Telegram
- Если в папке /tmp/reports/ появился новый файл — отправь его содержимое
- Если сегодня понедельник — напомни про еженедельный созвон в 10:00`}
          />

          <div className="mt-4 bg-zinc-950 border border-zinc-700 rounded-xl p-5">
            <p className="text-zinc-500 text-xs mb-3 font-mono">Пример — агент проверил и нашёл алерт:</p>
            <div className="bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-zinc-200 text-sm space-y-1">
              <p>🚨 <strong>BTC Alert!</strong></p>
              <p>BTC упал на 3.8% за последний час</p>
              <p>Текущая цена: $58,240</p>
              <p>Рекомендую проверить позиции.</p>
            </div>
          </div>

          <div className="mt-4">
            <h3 className="text-lg font-semibold text-white mb-3">
              Конфигурация в openclaw.json
            </h3>
            <CodeBlock
              language="json"
              code={`{
  "session": {
    "heartbeat": {
      "intervalMinutes": 30,
      "activeHours": { "start": 8, "end": 23 }
    }
  }
}`}
            />
          </div>

          <div className="mt-4 bg-yellow-900/20 border border-yellow-700/40 rounded-xl px-5 py-4 text-yellow-200 text-sm">
            💡 Если нечего делать — агент отвечает HEARTBEAT_OK и не шумит.
          </div>

          <img src="/course/block1/lesson4/b1-l4-heartbeat.png" alt="Heartbeat" className="w-full rounded-xl object-cover mt-4" />
        </section>

        {/* ── Готовые примеры ── */}
        <section className="bg-zinc-900 rounded-2xl p-6 md:p-8 border border-zinc-800">
          <h2 className="text-2xl font-semibold text-white mb-6">
            Готовые примеры — скопируй и запусти
          </h2>
          <div className="space-y-6">
            {/* Карточка 1 */}
            <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-5">
              <h3 className="text-white font-semibold text-lg mb-1">
                ☀️ Утренний дайджест
              </h3>
              <p className="text-zinc-400 text-sm mb-3">
                Каждый день в 9:00 — погода, крипто, встречи
              </p>
              <CodeBlock
                code={`openclaw cron add \\
  --name "Morning digest" \\
  --cron "0 9 * * *" \\
  --tz "Europe/Moscow" \\
  --session isolated \\
  --message "Доброе утро! Кратко: 1) Погода сегодня 2) Цена BTC/ETH 3) Мои встречи из Google Calendar" \\
  --announce \\
  --channel telegram \\
  --to YOUR_TELEGRAM_ID`}
              />
            </div>

            {/* Карточка 2 */}
            <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-5">
              <h3 className="text-white font-semibold text-lg mb-1">
                📊 Алерт по цене
              </h3>
              <p className="text-zinc-400 text-sm mb-3">
                Проверка каждый час
              </p>
              <CodeBlock
                code={`openclaw cron add \\
  --name "BTC price alert" \\
  --cron "0 * * * *" \\
  --session isolated \\
  --message "Проверь цену BTC через web_search. Если цена ниже 80000$ — срочно сообщи мне" \\
  --announce \\
  --channel telegram \\
  --to YOUR_TELEGRAM_ID`}
              />
            </div>

            {/* Карточка 3 */}
            <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-5">
              <h3 className="text-white font-semibold text-lg mb-1">
                📋 Отчёт за неделю
              </h3>
              <p className="text-zinc-400 text-sm mb-3">
                Каждый пятница в 17:00
              </p>
              <CodeBlock
                code={`openclaw cron add \\
  --name "Weekly report" \\
  --cron "0 17 * * 5" \\
  --tz "Europe/Moscow" \\
  --session isolated \\
  --message "Пятница! Подведи итоги недели: что сделано, что перенесено, приоритеты на следующую неделю" \\
  --announce \\
  --channel telegram \\
  --to YOUR_TELEGRAM_ID`}
              />
            </div>
          </div>
        </section>

        {/* ── Cron image ── */}
        <img src="/course/block1/lesson4/b1-l4-cron.png" alt="Cron задачи" className="w-full rounded-xl object-cover" />
        <img src="/course/block1/lesson4/b1-l4-telegram-result.png" alt="Результат в Telegram" className="w-full rounded-xl object-cover" />

        {/* ── Webhook ── */}
        <section className="bg-zinc-900 rounded-2xl p-6 md:p-8 border border-zinc-800">
          <h2 className="text-2xl font-semibold text-white mb-4">
            Webhook — реагируй на внешние события
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-4">
            OpenClaw принимает HTTP запросы и передаёт их агенту. Подключи GitHub, Stripe, Zapier — агент реагирует на любые события из интернета.
          </p>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">Твой webhook URL</h3>
              <CodeBlock code={`# Посмотреть свой webhook URL\nopenclaw status\n# Webhook: http://localhost:18789/hooks/agent`} />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">Примеры подключений</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4">
                  <p className="text-white font-semibold mb-1">🐙 GitHub</p>
                  <p className="text-zinc-400 text-sm">Push → агент ревьюит код и пишет в Telegram</p>
                </div>
                <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4">
                  <p className="text-white font-semibold mb-1">💳 Stripe</p>
                  <p className="text-zinc-400 text-sm">Новый платёж → агент уведомляет и логирует</p>
                </div>
                <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4">
                  <p className="text-white font-semibold mb-1">⚡ Zapier</p>
                  <p className="text-zinc-400 text-sm">Любое событие из 5000+ приложений → агент</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Проблемы и решения ── */}
        <section className="bg-zinc-900 rounded-2xl p-6 md:p-8 border border-zinc-800">
          <h2 className="text-2xl font-semibold text-white mb-4">
            {searchQuery.trim()
              ? `Найдено: ${filteredIssues.length}`
              : "Проблемы и решения — Автоматизация"}
          </h2>
          <div className="relative mb-4">
            <input
              type="text"
              placeholder="Найти проблему... (например: cron, heartbeat, webhook)"
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

        <img src="/course/block1/lesson4/b1-l4-telegram-result.png" alt="Результат в Telegram" className="w-full rounded-xl object-cover" />
        {/* ── Чекпоинт ── */}
        <section className="bg-zinc-900 rounded-2xl p-6 md:p-8 border border-zinc-800">
          <h2 className="text-2xl font-semibold text-white mb-4">
            ✅ Чекпоинт
          </h2>
          <div className="space-y-3">
            {[
              'Создал первый cron (openclaw cron list показывает задачу)',
              'Cron сработал вручную (openclaw cron run --id <id>)',
              'Получил автоматическое сообщение в Telegram от cron',
              'Написал HEARTBEAT.md с одной проверкой',
              'Heartbeat отреагировал хотя бы раз (не HEARTBEAT_OK)',
              'openclaw doctor — нет ошибок',
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
            <div className="mt-6 text-center">
              <button className="px-6 py-3 bg-[#FF4422] text-white font-semibold rounded-lg hover:bg-[#e63d1e] transition-colors">
                Блок 1 завершён!
              </button>
            </div>
          )}
        </section>

        {/* ── Navigation ── */}
        <nav className="flex items-center justify-between text-sm text-zinc-400">
          <Link
            href="/dashboard/course/block/1/lesson/3"
            className="hover:text-zinc-200 transition-colors"
          >
            ← Урок 3: Подключения
          </Link>
        </nav>

        {/* ── Блок 1 завершён ── */}
        <section className="bg-gradient-to-b from-zinc-900 to-zinc-800 rounded-2xl p-8 md:p-10 border border-[#FF4422] text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            🎉 Блок 1 завершён!
          </h2>
          <p className="text-zinc-300 leading-relaxed mb-6 max-w-2xl mx-auto">
            Ты установил OpenClaw, подключил Telegram-агента, настроил
            интеграции и создал первую автоматизацию. Твой агент теперь работает
            без тебя.
          </p>
          <button
            disabled
            className="px-6 py-3 bg-zinc-700 text-zinc-400 font-semibold rounded-lg cursor-not-allowed"
          >
            Перейти к Блоку 2 → (Скоро)
          </button>
        </section>
        </div>
      </div>
    </main>
  );
}
