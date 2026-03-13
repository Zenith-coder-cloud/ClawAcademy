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
  {
    title: "zsh: command not found: claude (Anthropic token)",
    hint: "Установи Claude CLI: npm install -g @anthropic-ai/claude-code — затем запусти claude setup-token заново",
    content:
      "Claude CLI не установлен. Команда claude setup-token требует claude-code. Установи через npm и повтори.",
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
  const [wizardStep, setWizardStep] = useState(0);
  const [selectedProvider, setSelectedProvider] = useState("OpenRouter");
  const [selectedModel, setSelectedModel] = useState("openrouter/anthropic/claude-3.7-sonnet");
  const [anthropicAuthMethod, setAnthropicAuthMethod] = useState<'token' | 'apikey'>('token');

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
              {["OpenRouter (рекомендуется)", "Anthropic OAuth", "Другие провайдеры"].map((label, idx) => (
                <button
                  key={label}
                  onClick={() => {
                    setApiTab(idx);
                    if (idx === 0) {
                      setSelectedProvider('OpenRouter');
                      if (wizardStep > 2) setWizardStep(2);
                    } else if (idx === 1) {
                      setSelectedProvider('Anthropic');
                      if (wizardStep > 2) setWizardStep(2);
                    } else if (idx === 2) {
                      setSelectedProvider('other');
                      if (wizardStep > 2) setWizardStep(2);
                    }
                  }}
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
                  Рекомендуем начать с OpenRouter и использовать его в качестве fallback провайдера. Так вы не потеряете связь с агентом в критический момент.
                </div>
                <ol className="list-decimal list-inside text-zinc-400 space-y-2">
                  <li>Открой openrouter.ai → зарегистрируйся</li>
                  <li>Перейди в API Keys → Create Key</li>
                  <li>Скопируй ключ <code className="text-[#FF4422]">sk-or-v1-...</code></li>
                  <li>Пополни баланс от $5 — Haiku стоит ~$0.001 за запрос</li>
                </ol>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-zinc-400 text-sm">Рекомендуемая модель для старта:</span>
                  <span className="bg-zinc-700 text-[#FF4422] text-sm font-mono px-3 py-1 rounded-full border border-zinc-600">anthropic/claude-haiku-4-5</span>
                  <span className="text-zinc-500 text-xs">← выбери в визарде</span>
                </div>
                <div className="bg-zinc-800 border border-zinc-700 rounded-xl px-5 py-4 text-zinc-300 text-sm">
                  Haiku через OpenRouter — лучший выбор для начала. Потом можно переключиться на Sonnet или GPT-4o в одну строку конфига.
                </div>
              </div>
            )}

            {/* Tab 1 — Anthropic OAuth */}
            {apiTab === 1 && (
              <div className="space-y-4">
                <div className="bg-blue-900/20 border border-blue-700/40 rounded-xl px-5 py-4 text-blue-200 text-sm">
                  💡 Если у тебя подписка Claude.ai MAX — ключ вводить не нужно. Логинишься через браузер.
                </div>
                <ol className="list-decimal list-inside text-zinc-400 space-y-2">
                  <li>Убедись что активная подписка <strong className="text-white">Claude.ai MAX</strong></li>
                  <li>В отдельном терминале запусти сессию авторизации:</li>
                </ol>
                <CodeBlock code="claude" />
                <p className="text-zinc-500 text-sm -mt-2">Браузер откроется — войди в аккаунт Claude и нажми Allow. Скопируй setup-token из терминала.</p>
                <ol className="list-decimal list-inside text-zinc-400 space-y-2 mt-2" start={3}>
                  <li>Затем запусти визард в другом терминале:</li>
                </ol>
                <CodeBlock code="openclaw onboard --install-daemon" />
                <p className="text-zinc-500 text-sm -mt-2">При выборе провайдера Anthropic → метод OAuth → вставь setup-token из шага 2</p>
                <div className="bg-yellow-900/20 border border-yellow-700/40 rounded-xl px-5 py-4 text-yellow-200 text-sm">
                  ⚠️ OAuth токен привязан к подписке. Если подписка истекает — агент перестанет работать. Имей OpenRouter как резерв.
                </div>
              </div>
            )}

            {/* Tab 2 — Другие провайдеры */}
            {apiTab === 2 && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {[
                    { name: "OpenAI (API ключ)", desc: "GPT-4o, GPT-5, Codex. Самый популярный провайдер.", link: "https://platform.openai.com/api-keys", model: "openai/gpt-4o", border: "border-green-700/40" },
                    { name: "Google Gemini", desc: "Gemini 2.5 Pro, Flash. Щедрый бесплатный tier.", link: "https://aistudio.google.com/apikey", model: "google/gemini-2.5-pro-preview", border: "border-blue-700/40" },
                    { name: "Qwen (Alibaba)", desc: "Qwen3 Coder, отличная модель для кода. Дёшево.", link: "https://dashscope.aliyuncs.com", model: "qwen/coder-model", border: "border-purple-700/40" },
                    { name: "DeepSeek", desc: "DeepSeek R1, V3. Мощный reasoning, очень дёшево.", link: "https://platform.deepseek.com", model: "deepseek/deepseek-chat", border: "border-cyan-700/40" },
                    { name: "Grok (xAI)", desc: "Grok 3. Модель Илона Маска, доступна через xAI API.", link: "https://console.x.ai", model: "openrouter/x-ai/grok-3-mini-beta", border: "border-zinc-600" },
                    { name: "OpenAI Codex (OAuth)", desc: "Подписка ChatGPT Plus/Pro. Логин через OAuth — ключ не нужен.", link: "https://chatgpt.com", model: "openai-codex/gpt-5.3-codex", border: "border-green-700/40" },
                  ].map((provider) => (
                    <div key={provider.name} className={`bg-zinc-800 border ${provider.border} rounded-xl p-4`}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-white font-semibold">{provider.name}</span>
                        <a
                          href={provider.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs px-2.5 py-1 rounded-md border border-zinc-600 text-zinc-300 hover:border-[#FF4422] hover:text-white transition-colors"
                        >
                          Получить ключ ↗
                        </a>
                      </div>
                      <p className="text-zinc-400 text-sm mb-2">{provider.desc}</p>
                      <code className="text-[#FF4422] bg-zinc-900 px-1 py-0.5 rounded text-xs">{provider.model}</code>
                    </div>
                  ))}
                </div>
                <div className="bg-zinc-800 border border-zinc-700 rounded-xl px-5 py-4 text-zinc-300 text-sm">
                  💡 Все провайдеры настраиваются в визарде <code className="text-[#FF4422]">openclaw onboard</code>. Можно переключать модель прямо в Telegram командой <code className="text-[#FF4422]">/model</code>.
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
              Визард проведёт тебя через настройку шаг за шагом. Попробуй интерактивный симулятор:
            </p>

            {/* 🧙 Симулятор визарда */}
            <div className="bg-zinc-950 border border-zinc-700 rounded-2xl p-6 font-mono text-sm">
              <h3 className="text-white font-semibold text-lg mb-4 font-sans">🧙 Симулятор визарда openclaw onboard</h3>

              {/* Step indicators */}
              <div className="flex items-center justify-center gap-2 mb-6 flex-wrap">
                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((i) => (
                  <button
                    key={i}
                    onClick={() => setWizardStep(i)}
                    className={
                      "w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition-colors " +
                      (i === wizardStep
                        ? "bg-[#FF4422] text-white"
                        : i < wizardStep
                          ? "bg-green-600 text-white"
                          : "bg-zinc-700 text-zinc-400")
                    }
                  >
                    {i < wizardStep ? "✓" : i}
                  </button>
                ))}
              </div>

              {/* Step 0 — Безопасность */}
              {wizardStep === 0 && (
                <div>
                  <p className="text-white mb-2">◆ Security notice</p>
                  <p className="text-zinc-500 italic mb-3">
                    If you are not comfortable with security hardening, don&apos;t run OpenClaw in shared environments.
                  </p>
                  <p className="text-white mb-3">◆ I understand. Continue?</p>
                  <div className="space-y-1 mb-4">
                    <button
                      onClick={() => setWizardStep(1)}
                      className="block w-full text-left px-3 py-1.5 text-green-400 hover:bg-zinc-900 rounded transition-colors"
                    >
                      ● Yes
                    </button>
                    <p className="px-3 py-1.5 text-zinc-500">○ No</p>
                  </div>
                  <button
                    onClick={() => setWizardStep(1)}
                    className="px-4 py-2 rounded-lg bg-[#FF4422] text-white text-sm font-medium font-sans hover:bg-[#e63d1e] transition-colors"
                  >
                    Continue →
                  </button>
                </div>
              )}

              {/* Step 1 — Режим */}
              {wizardStep === 1 && (
                <div>
                  <p className="text-white mb-3">◆ Onboarding mode</p>
                  <div className="space-y-1 mb-4">
                    <p className="px-3 py-1.5 text-green-400">● QuickStart <span className="text-zinc-500">(Configure details later via openclaw configure.)</span></p>
                    <p className="px-3 py-1.5 text-zinc-500">○ Manual</p>
                  </div>
                  <button
                    onClick={() => setWizardStep(2)}
                    className="px-4 py-2 rounded-lg bg-[#FF4422] text-white text-sm font-medium font-sans hover:bg-[#e63d1e] transition-colors"
                  >
                    Continue →
                  </button>
                </div>
              )}

              {/* Step 2 — Провайдер */}
              {wizardStep === 2 && (
                <div>
                  <p className="text-white mb-3">◆ Model/auth provider</p>
                  <div className="space-y-0.5 mb-4 max-h-64 overflow-y-auto">
                    {[
                      "OpenAI (Codex OAuth + API key)",
                      "Anthropic",
                      "Google",
                      "xAI (Grok)",
                      "Mistral AI",
                      "OpenRouter",
                      "Kilo Gateway",
                      "Qwen",
                      "Together AI",
                      "Hugging Face",
                    ].map((p) => {
                      const key = p.includes("(") ? p.split(" (")[0] : p;
                      const isMatch = key === selectedProvider;
                      return (
                        <button
                          key={p}
                          onClick={() => {
                            setSelectedProvider(key);
                            if (key === 'Anthropic') setApiTab(1);
                            else if (key === 'OpenRouter') setApiTab(0);
                            else setApiTab(2);
                          }}
                          className={
                            "block w-full text-left px-3 py-1 rounded transition-colors hover:bg-zinc-900 " +
                            (isMatch ? "text-green-400" : "text-zinc-500")
                          }
                        >
                          {isMatch ? "●" : "○"} {p}
                        </button>
                      );
                    })}
                  </div>
                  <button
                    onClick={() => setWizardStep(3)}
                    className="px-4 py-2 rounded-lg bg-[#FF4422] text-white text-sm font-medium font-sans hover:bg-[#e63d1e] transition-colors"
                  >
                    Continue →
                  </button>
                </div>
              )}

              {/* Step 3 — Модель / Auth method (ветвится по провайдеру) */}
              {wizardStep === 3 && selectedProvider === 'OpenRouter' && (
                <div>
                  <p className="text-zinc-400 mb-2">Provider: <span className="text-white">{selectedProvider}</span></p>
                  <p className="text-white mb-3">◆ Default model</p>
                  <div className="space-y-0.5 mb-4 max-h-64 overflow-y-auto">
                    {[
                      { id: "openrouter/auto", label: "Keep current (openrouter/auto)" },
                      { id: "openrouter/anthropic/claude-3.5-haiku", label: "openrouter/anthropic/claude-3.5-haiku" },
                      { id: "openrouter/anthropic/claude-3.7-sonnet", label: "openrouter/anthropic/claude-3.7-sonnet (Anthropic: Claude 3.7 Sonnet · ctx 195k · reasoning)" },
                      { id: "openrouter/anthropic/claude-sonnet-4-5", label: "openrouter/anthropic/claude-sonnet-4-5" },
                      { id: "openrouter/openai/gpt-4o", label: "openrouter/openai/gpt-4o" },
                      { id: "openrouter/google/gemini-2.5-pro-preview", label: "openrouter/google/gemini-2.5-pro-preview" },
                      { id: "openrouter/deepseek/deepseek-r1", label: "openrouter/deepseek/deepseek-r1" },
                      { id: "__manual__", label: "Enter model manually" },
                    ].map((m) => {
                      const isMatch = m.id === selectedModel;
                      return (
                        <button
                          key={m.id}
                          onClick={() => setSelectedModel(m.id)}
                          className={
                            "block w-full text-left px-3 py-1 rounded transition-colors hover:bg-zinc-900 " +
                            (isMatch ? "text-green-400" : "text-zinc-500")
                          }
                        >
                          {isMatch ? "●" : "○"} {m.label}
                        </button>
                      );
                    })}
                  </div>
                  <button
                    onClick={() => setWizardStep(4)}
                    className="px-4 py-2 rounded-lg bg-[#FF4422] text-white text-sm font-medium font-sans hover:bg-[#e63d1e] transition-colors"
                  >
                    Continue →
                  </button>
                </div>
              )}
              {wizardStep === 3 && selectedProvider === 'Anthropic' && (
                <div>
                  <p className="text-white mb-3">◆ Anthropic auth method</p>
                  <div className="space-y-1 mb-4">
                    <button
                      onClick={() => setAnthropicAuthMethod('token')}
                      className={
                        "block w-full text-left px-3 py-1.5 rounded transition-colors hover:bg-zinc-900 " +
                        (anthropicAuthMethod === 'token' ? "text-green-400" : "text-zinc-500")
                      }
                    >
                      {anthropicAuthMethod === 'token' ? "●" : "○"} Anthropic token (paste setup-token) <span className="text-zinc-500 text-xs">(run &apos;claude setup-token&apos; elsewhere, then paste the token here)</span>
                    </button>
                    <button
                      onClick={() => setAnthropicAuthMethod('apikey')}
                      className={
                        "block w-full text-left px-3 py-1.5 rounded transition-colors hover:bg-zinc-900 " +
                        (anthropicAuthMethod === 'apikey' ? "text-green-400" : "text-zinc-500")
                      }
                    >
                      {anthropicAuthMethod === 'apikey' ? "●" : "○"} Anthropic API key
                    </button>
                    <button
                      onClick={() => setWizardStep(2)}
                      className="block w-full text-left px-3 py-1.5 text-zinc-500 rounded transition-colors hover:bg-zinc-900"
                    >
                      ○ Back
                    </button>
                  </div>
                  <button
                    onClick={() => setWizardStep(4)}
                    className="px-4 py-2 rounded-lg bg-[#FF4422] text-white text-sm font-medium font-sans hover:bg-[#e63d1e] transition-colors"
                  >
                    Continue →
                  </button>
                </div>
              )}
              {wizardStep === 3 && selectedProvider !== 'OpenRouter' && selectedProvider !== 'Anthropic' && (
                <div>
                  <p className="text-white mb-3">◆ Default model</p>
                  <p className="text-zinc-500 text-sm mb-3">Визард покажет список доступных моделей выбранного провайдера.</p>
                  <div className="space-y-0.5 mb-4">
                    <p className="px-3 py-1 text-zinc-500">○ provider/model-1</p>
                    <p className="px-3 py-1 text-zinc-500">○ provider/model-2</p>
                    <p className="px-3 py-1 text-zinc-500">○ provider/model-3</p>
                    <p className="px-3 py-1 text-zinc-500">○ Enter model manually</p>
                  </div>
                  <p className="text-zinc-600 text-xs mb-3 italic">← выбери нужную модель из списка</p>
                  <button
                    onClick={() => setWizardStep(4)}
                    className="px-4 py-2 rounded-lg bg-[#FF4422] text-white text-sm font-medium font-sans hover:bg-[#e63d1e] transition-colors"
                  >
                    Continue →
                  </button>
                </div>
              )}

              {/* Step 4 — Метод ключа (ветвится) */}
              {wizardStep === 4 && selectedProvider === 'Anthropic' && anthropicAuthMethod === 'token' && (
                <div>
                  <p className="text-white mb-3">◆ Anthropic setup-token</p>
                  <div className="border border-zinc-600 rounded p-3 text-zinc-300 mb-4">
                    <p className="mb-1">Run <code>claude setup-token</code> in your terminal.</p>
                    <p className="mb-2">Then paste the generated token below.</p>
                    <CodeBlock code="claude setup-token" />
                    <button
                      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                      className="mt-2 text-sm text-blue-400 hover:text-blue-300 underline underline-offset-2 transition-colors"
                    >
                      ↑ Смотри инструкцию выше в разделе 1.5 → Anthropic OAuth
                    </button>
                  </div>
                  <p className="text-white mb-3">◆ How do you want to provide this setup token?</p>
                  <div className="space-y-1 mb-4">
                    <p className="px-3 py-1.5 text-green-400">● Paste setup token now <span className="text-zinc-500">(Stores the token directly in the auth profile)</span></p>
                    <p className="px-3 py-1.5 text-zinc-500">○ Use external secret provider</p>
                  </div>
                  <button
                    onClick={() => setWizardStep(5)}
                    className="px-4 py-2 rounded-lg bg-[#FF4422] text-white text-sm font-medium font-sans hover:bg-[#e63d1e] transition-colors"
                  >
                    Continue →
                  </button>
                </div>
              )}
              {wizardStep === 4 && selectedProvider === 'Anthropic' && anthropicAuthMethod === 'apikey' && (
                <div>
                  <p className="text-white mb-3">◆ Enter API key for Anthropic:</p>
                  <input
                    type="password"
                    placeholder="sk-ant-api03-..."
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-2.5 text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-[#FF4422] mb-4"
                    readOnly
                  />
                  <button
                    onClick={() => setWizardStep(5)}
                    className="px-4 py-2 rounded-lg bg-[#FF4422] text-white text-sm font-medium font-sans hover:bg-[#e63d1e] transition-colors"
                  >
                    Continue →
                  </button>
                </div>
              )}
              {wizardStep === 4 && !(selectedProvider === 'Anthropic') && (
                <div>
                  <p className="text-white mb-3">◆ How do you want to provide this API key?</p>
                  <div className="space-y-1 mb-4">
                    <p className="px-3 py-1.5 text-green-400">● Paste API key now <span className="text-zinc-500">(Stores the key directly in OpenClaw config)</span></p>
                    <p className="px-3 py-1.5 text-zinc-500">○ Use external secret provider</p>
                  </div>
                  <button
                    onClick={() => setWizardStep(5)}
                    className="px-4 py-2 rounded-lg bg-[#FF4422] text-white text-sm font-medium font-sans hover:bg-[#e63d1e] transition-colors"
                  >
                    Continue →
                  </button>
                </div>
              )}

              {/* Step 5 — Ввод ключа (ветвится) */}
              {wizardStep === 5 && (
                <div>
                  {selectedProvider === 'Anthropic' && anthropicAuthMethod === 'token' ? (
                    <>
                      <p className="text-white mb-3">◆ Paste your setup token:</p>
                      <input
                        type="password"
                        placeholder="paste setup-token here..."
                        className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-2.5 text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-[#FF4422] mb-2"
                        readOnly
                      />
                      <p className="text-zinc-600 text-xs mb-4">
                        Запусти <code className="text-zinc-500">claude setup-token</code> в отдельном терминале
                      </p>
                    </>
                  ) : selectedProvider === 'Anthropic' && anthropicAuthMethod === 'apikey' ? (
                    <>
                      <p className="text-white mb-3">◆ Enter API key for Anthropic:</p>
                      <input
                        type="password"
                        placeholder="sk-ant-api03-..."
                        className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-2.5 text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-[#FF4422] mb-2"
                        readOnly
                      />
                      <p className="text-zinc-600 text-xs mb-4">
                        Получи ключ → console.anthropic.com
                      </p>
                    </>
                  ) : selectedProvider === 'OpenRouter' ? (
                    <>
                      <p className="text-white mb-3">◆ Enter API key for OpenRouter:</p>
                      <input
                        type="password"
                        placeholder="sk-or-v1-..."
                        className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-2.5 text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-[#FF4422] mb-2"
                        readOnly
                      />
                      <p className="text-zinc-600 text-xs mb-4">
                        Получи ключ → openrouter.ai/keys
                      </p>
                    </>
                  ) : (
                    <>
                      <p className="text-white mb-3">◆ Enter API key:</p>
                      <input
                        type="password"
                        placeholder="вставь ключ от выбранного провайдера"
                        className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-2.5 text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-[#FF4422] mb-2"
                        readOnly
                      />
                      <p className="text-zinc-600 text-xs mb-4">
                        Получи ключ → сайт провайдера
                      </p>
                    </>
                  )}
                  <button
                    onClick={() => setWizardStep(6)}
                    className="px-4 py-2 rounded-lg bg-[#FF4422] text-white text-sm font-medium font-sans hover:bg-[#e63d1e] transition-colors"
                  >
                    Continue →
                  </button>
                </div>
              )}

              {/* Step 6 — Канал */}
              {wizardStep === 6 && (
                <div>
                  <p className="text-white mb-3">◆ Select channel (QuickStart)</p>
                  <div className="space-y-0.5 mb-4">
                    {[
                      "Telegram (Bot API) (recommended)",
                      "WhatsApp (QR link)",
                      "Discord (Bot API)",
                      "iMessage (imsg)",
                      "Signal (signal-cli)",
                      "Google Chat (Chat API)",
                      "Slack (Socket Mode)",
                      "Mattermost (plugin)",
                      "Skip for now",
                    ].map((ch, idx) => (
                      <p key={ch} className={`px-3 py-1 ${idx === 0 ? "text-green-400" : "text-zinc-500"}`}>
                        {idx === 0 ? "●" : "○"} {ch}
                      </p>
                    ))}
                  </div>
                  <button
                    onClick={() => setWizardStep(7)}
                    className="px-4 py-2 rounded-lg bg-[#FF4422] text-white text-sm font-medium font-sans hover:bg-[#e63d1e] transition-colors"
                  >
                    Continue →
                  </button>
                </div>
              )}

              {/* Step 7 — Telegram Bot Token */}
              {wizardStep === 7 && (
                <div className="space-y-3">
                  <p className="text-zinc-500 text-xs mb-1">Channel: Telegram (Bot API)</p>
                  <p className="text-white mb-3">◆ Enter your Telegram Bot Token</p>
                  <p className="text-zinc-500 text-sm mb-3">
                    Это токен который ты получил от @BotFather на шаге 1.
                  </p>
                  <input
                    type="password"
                    placeholder="1234567890:ABCDEFGabcdefg1234567890"
                    className="w-full bg-zinc-800 border border-zinc-600 rounded-lg px-4 py-2.5 text-zinc-300 font-mono text-sm focus:outline-none focus:border-[#FF4422] placeholder-zinc-600"
                  />
                  <p className="text-zinc-500 text-xs mt-1">
                    Нет токена? Вернись к Шагу 1 — @BotFather → /newbot
                  </p>
                  <button
                    onClick={() => setWizardStep(8)}
                    className="mt-2 px-5 py-2.5 bg-[#FF4422] text-white rounded-lg font-medium hover:bg-[#ff5a3c] transition-colors"
                  >
                    Continue →
                  </button>
                </div>
              )}

              {/* Step 8 — Web search */}
              {wizardStep === 8 && (
                <div>
                  <p className="text-white mb-2">◆ Web search</p>
                  <p className="text-zinc-500 mb-3">Web search lets your agent look things up online. Choose a provider and paste your API key.</p>
                  <p className="text-white mb-3">◆ Search provider</p>
                  <div className="space-y-0.5 mb-4">
                    <p className="px-3 py-1 text-zinc-500">○ Brave Search (Structured results · country/language filters)</p>
                    <p className="px-3 py-1 text-zinc-500">○ Gemini (Google Search)</p>
                    <p className="px-3 py-1 text-zinc-500">○ Grok (xAI)</p>
                    <p className="px-3 py-1 text-zinc-500">○ Perplexity Search</p>
                    <p className="px-3 py-1 text-green-400">● Skip for now</p>
                  </div>
                  <button
                    onClick={() => setWizardStep(9)}
                    className="px-4 py-2 rounded-lg bg-[#FF4422] text-white text-sm font-medium font-sans hover:bg-[#e63d1e] transition-colors"
                  >
                    Continue →
                  </button>
                </div>
              )}

              {/* Step 8 — Skills + Hooks */}
              {wizardStep === 9 && (
                <div>
                  <p className="text-white mb-2">◆ Skills status</p>
                  <div className="text-zinc-500 mb-3 pl-2">
                    <p>Eligible: 37</p>
                    <p>Missing requirements: 14</p>
                    <p>Unsupported on this OS: 0</p>
                  </div>
                  <p className="text-white mb-3">◆ Configure skills now? (recommended)</p>
                  <div className="space-y-0.5 mb-5">
                    <p className="px-3 py-1 text-zinc-500">○ Yes</p>
                    <p className="px-3 py-1 text-green-400">● No</p>
                  </div>
                  <p className="text-white mb-3">◆ Enable hooks?</p>
                  <div className="space-y-0.5 mb-4">
                    <p className="px-3 py-1 text-green-400">● Skip for now</p>
                    <p className="px-3 py-1 text-zinc-500">○ boot-md</p>
                    <p className="px-3 py-1 text-zinc-500">○ session-memory</p>
                    <p className="px-3 py-1 text-zinc-500">○ command-logger</p>
                  </div>
                  <button
                    onClick={() => setWizardStep(10)}
                    className="px-4 py-2 rounded-lg bg-[#FF4422] text-white text-sm font-medium font-sans hover:bg-[#e63d1e] transition-colors"
                  >
                    Continue →
                  </button>
                </div>
              )}

              {/* Step 10 — Gateway service */}
              {wizardStep === 10 && (
                <div>
                  <p className="text-white mb-2">◆ Gateway service runtime</p>
                  <p className="text-zinc-500 mb-3">QuickStart uses Node for the Gateway service (stable + supported).</p>
                  <p className="text-white mb-3">◆ Gateway service</p>
                  <div className="space-y-0.5 mb-4">
                    <p className="px-3 py-1 text-green-400">● Restart</p>
                    <p className="px-3 py-1 text-zinc-500">○ Reinstall</p>
                    <p className="px-3 py-1 text-zinc-500">○ Skip</p>
                  </div>
                  <button
                    onClick={() => setWizardStep(11)}
                    className="px-4 py-2 rounded-lg bg-[#FF4422] text-white text-sm font-medium font-sans hover:bg-[#e63d1e] transition-colors"
                  >
                    Continue →
                  </button>
                </div>
              )}

              {/* Step 11 — Готово */}
              {wizardStep === 11 && (
                <div>
                  <div className="border border-green-500 rounded-xl p-5">
                    <div className="space-y-1 text-green-400 mb-4 font-mono text-sm">
                      <p>✓ Config saved to ~/.openclaw/openclaw.json</p>
                      <p>✓ Workspace: ~/.openclaw/workspace</p>
                      <p>✓ Sessions OK: ~/.openclaw/agents/main/sessions</p>
                      <p>✓ Gateway restarted</p>
                      <p className="mt-2 text-white font-semibold">✓ OpenClaw is ready!</p>
                    </div>
                    <p className="text-zinc-400 text-sm mb-3">Теперь открой Telegram и напиши своему боту первое сообщение.</p>
                    <button
                      onClick={() => setWizardStep(0)}
                      className="px-4 py-2 rounded-lg border border-zinc-600 text-zinc-400 hover:text-white text-sm transition-colors font-sans"
                    >
                      Сбросить симулятор
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Skip simulator link */}
            <div className="mt-3 text-center">
              <a href="#step-3-check" className="text-zinc-500 hover:text-zinc-300 text-sm transition-colors">
                Пропустить симулятор — запустить настоящий визард ↓
              </a>
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
