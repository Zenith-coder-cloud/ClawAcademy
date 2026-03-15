"use client";

import { useEffect, useState } from "react";

export type TrackId =
  | "freelancer" | "business" | "content" | "money"
  | "student" | "investor" | "seller" | "developer" | "marketer" | "hr" | "life"
  | "all";

type TrackMeta = {
  id: TrackId;
  label: string;
  color: string;
  description?: string;
};

export const TRACKS: Record<TrackId, TrackMeta> = {
  freelancer: {
    id: "freelancer",
    label: "🧑‍💼 Фрилансер",
    color: "#3B82F6",
    description: "Работаешь на себя — строишь агентный доход как фрилансер",
  },
  business: {
    id: "business",
    label: "🏢 Бизнес",
    color: "#10B981",
    description: "Владеешь бизнесом — автоматизируешь и масштабируешь через агентов",
  },
  content: {
    id: "content",
    label: "📢 Контент",
    color: "#8B5CF6",
    description: "Ведёшь блог или канал — агенты создают и публикуют контент за тебя",
  },
  money: {
    id: "money",
    label: "💰 Заработок",
    color: "#F59E0B",
    description: "Хочешь заработать на агентах — монетизируешь навыки через разные форматы",
  },
  student: {
    id: "student",
    label: "🎓 Студент",
    color: "#F59E0B",
    description: "Учишься — агент помогает учиться быстрее и зарабатывать параллельно",
  },
  investor: {
    id: "investor",
    label: "💰 Инвестор",
    color: "#10B981",
    description: "Инвестируешь — агенты мониторят рынки и анализируют проекты за тебя",
  },
  seller: {
    id: "seller",
    label: "🛍️ Продавец",
    color: "#EC4899",
    description: "Продаёшь на маркетплейсах — агенты автоматизируют описания, мониторинг, отзывы",
  },
  developer: {
    id: "developer",
    label: "👨‍💻 Разработчик",
    color: "#06B6D4",
    description: "Разработчик — агенты ускоряют code review, документацию, онбординг",
  },
  marketer: {
    id: "marketer",
    label: "📊 Маркетолог",
    color: "#F97316",
    description: "Маркетолог — агенты делают аналитику, A/B тесты и отчёты автоматически",
  },
  hr: {
    id: "hr",
    label: "👥 HR / Рекрутер",
    color: "#A855F7",
    description: "HR / рекрутер — агенты скринят резюме и ведут онбординг",
  },
  life: {
    id: "life",
    label: "🏠 Для жизни",
    color: "#84CC16",
    description: "Для личной жизни — агенты планируют день, финансы, привычки",
  },
  all: {
    id: "all",
    label: "Все треки",
    color: "#FF4422",
    description: "Для всех треков",
  },
};

const ACCENT = "#FF4422";

export function TimerBadge({ text }: { text: string }) {
  return (
    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300 text-xs font-semibold">
      {text}
    </span>
  );
}

export function TrackBadge({ track }: { track: TrackId }) {
  const meta = TRACKS[track];
  if (!meta) return null;
  const color = track === "all" ? ACCENT : meta.color;
  return (
    <span
      className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold border"
      style={{ color, borderColor: color, backgroundColor: `${color}1A` }}
    >
      {meta.label}
    </span>
  );
}

export function LessonSteps({ steps }: { steps: string[] }) {
  return (
    <div className="flex flex-col gap-3">
      {steps.map((step, idx) => (
        <div
          key={step}
          className="flex items-start gap-3 bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3"
        >
          <div className="w-7 h-7 rounded-full border border-[#FF4422] text-[#FF4422] flex items-center justify-center text-xs font-semibold shrink-0">
            {idx + 1}
          </div>
          <p className="text-zinc-300">{step}</p>
        </div>
      ))}
    </div>
  );
}

export function PromptCopyBlock({
  code,
  instruction,
  example,
}: {
  code: string;
  instruction?: string;
  example?: string;
}) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  if (!code) return null;

  return (
    <div className="space-y-3">
      {instruction && (
        <p className="text-zinc-400 leading-relaxed">{instruction}</p>
      )}
      <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 relative">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs text-zinc-500 font-medium">prompts</span>
          <button
            onClick={handleCopy}
            className="text-sm px-4 py-2 rounded-lg border border-[#FF4422] text-white bg-[#FF4422] hover:bg-[#e63d1e] transition-colors"
            aria-label="Скопировать промпт"
          >
            {copied ? "Промпт скопирован ✓" : "Скопировать промпт"}
          </button>
        </div>
        <pre className="text-sm text-zinc-200 font-mono whitespace-pre-wrap">
          {code}
        </pre>
        {example && (
          <div className="mt-3 border-t border-zinc-800 pt-3">
            <p className="text-xs text-zinc-500 mb-1">💡 Пример заполнения:</p>
            <pre className="text-xs text-zinc-400 font-mono whitespace-pre-wrap italic">{example}</pre>
          </div>
        )}
      </div>
    </div>
  );
}

export function Checklist({
  items,
  storageKey,
}: {
  items: string[];
  storageKey: string;
}) {
  const [checks, setChecks] = useState<boolean[]>(() => items.map(() => false));

  useEffect(() => {
    const raw = localStorage.getItem(storageKey);
    if (!raw) return;
    try {
      const parsed = JSON.parse(raw) as boolean[];
      if (Array.isArray(parsed) && parsed.length === items.length) {
        setChecks(parsed.map(Boolean));
      }
    } catch {
      return;
    }
  }, [items.length, storageKey]);

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(checks));
  }, [checks, storageKey]);

  const allChecked = checks.every(Boolean);

  return (
    <div>
      <div className="space-y-3">
        {items.map((label, idx) => (
          <label
            key={label}
            className="flex items-center gap-3 bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-3 cursor-pointer"
          >
            <input
              type="checkbox"
              checked={checks[idx] ?? false}
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
        <div className="mt-6 bg-green-500/10 border border-green-500/30 rounded-xl px-5 py-4 text-green-300 font-semibold animate-pulse">
          Урок завершён ✅
        </div>
      )}
    </div>
  );
}

export function BlockCompleteCard({ trackLabel }: { trackLabel: string }) {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 md:p-8">
      <h3 className="text-2xl font-semibold text-white mb-3">🎉 Блок 4 завершён</h3>
      <div className="text-zinc-300 space-y-1 mb-4">
        <p>Ты прошёл:</p>
        <p>✅ {trackLabel}</p>
      </div>
      <p className="text-zinc-400 mb-4">
        Теперь ты знаешь как продавать своих агентов и зарабатывать на них.
      </p>
      <p className="text-zinc-400 mb-6">
        Следующий шаг — Блок 5: Агентский бизнес: от фрилансера к агентству
      </p>
      {/* Community section */}
      <div className="border border-zinc-700 rounded-xl p-5 mb-6 bg-zinc-800/50">
        <p className="text-zinc-300 font-semibold mb-3">💬 Обсуди с сообществом</p>
        <p className="text-zinc-500 text-sm mb-4">
          Поделись результатом, задай вопрос или помоги другим студентам
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <a
            href="https://t.me/ClawAcademyChat"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#229ED9] hover:bg-[#1a8bbf] text-white text-sm font-semibold transition-colors"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.247l-2.026 9.547c-.149.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L6.84 14.064l-2.965-.924c-.644-.204-.657-.644.136-.953l11.57-4.461c.537-.194 1.006.131.981.521z"/>
            </svg>
            Telegram чат
          </a>
          <a
            href="https://discord.gg/clawd"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#5865F2] hover:bg-[#4752c4] text-white text-sm font-semibold transition-colors"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057.1 18.079.11 18.1.128 18.115a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
            </svg>
            Discord
          </a>
        </div>
      </div>
      <div className="mb-6">
        <ShowAgentForm />
      </div>
      <a
        href="/dashboard/course/block/5"
        className="inline-flex items-center px-5 py-3 rounded-xl border border-zinc-800 text-zinc-300 hover:text-white hover:border-[#FF4422] transition-colors"
      >
        Перейти к Блоку 5 →
      </a>
    </div>
  );
}

export function ShowAgentForm() {
  const [text, setText] = useState("");
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!text.trim()) return;
    setSending(true);
    window.open(`https://t.me/ClawAcademyChat`, "_blank");
    setSent(true);
    setSending(false);
  }

  if (sent) {
    return (
      <div className="bg-zinc-900 border border-zinc-700 rounded-2xl p-6 text-center">
        <p className="text-2xl mb-2">🎉</p>
        <p className="text-white font-semibold mb-1">Отлично!</p>
        <p className="text-zinc-400 text-sm">Поделись своим агентом в чате — сообщество ждёт!</p>
      </div>
    );
  }

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
      <h3 className="text-white font-bold text-lg mb-2">🤖 Покажи свой агент</h3>
      <p className="text-zinc-400 text-sm mb-4">
        Опиши что делает твой агент — отправим в Telegram чат ClawAcademy. Это мотивирует других и доказывает что агенты работают.
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Например: Агент-автоответчик для моего Telegram-канала про инвестиции. Отвечает на вопросы подписчиков, отправляет дайджест по пятницам, экономит 3 часа в день..."
          rows={4}
          maxLength={500}
          className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-zinc-200 text-sm placeholder:text-zinc-600 focus:outline-none focus:border-[#FF4422] resize-none"
        />
        <div className="flex items-center justify-between">
          <span className="text-zinc-600 text-xs">{text.length}/500</span>
          <button
            type="submit"
            disabled={!text.trim() || sending}
            className="px-5 py-2.5 bg-[#FF4422] hover:bg-[#e63d1e] disabled:opacity-40 text-white text-sm font-semibold rounded-xl transition-colors"
          >
            {sending ? "Открываю чат..." : "Поделиться в чате →"}
          </button>
        </div>
      </form>
    </div>
  );
}

/* ── Section Progress Bar ──────────────────────────────────── */
const SECTIONS = [
  { label: "Разворот", range: [1, 2] },
  { label: "Вирт. сотрудник", range: [3, 6] },
  { label: "ClawHub", range: [7, 9] },
  { label: "SaaS", range: [10, 12] },
  { label: "Бизнес", range: [13, 14] },
  { label: "Контент", range: [15, 16] },
  { label: "Студент", range: [17, 18] },
  { label: "Инвестор", range: [19, 20] },
  { label: "Продавец", range: [21, 22] },
  { label: "Разработчик", range: [23, 24] },
  { label: "Маркетолог", range: [25, 26] },
  { label: "HR", range: [27, 28] },
  { label: "Для жизни", range: [29, 30] },
];

export function SectionProgressBar({ currentLesson }: { currentLesson: number }) {
  return (
    <div className="flex items-center gap-1 mb-6 overflow-x-auto">
      {SECTIONS.map((section, idx) => {
        const [start, end] = section.range;
        const isCurrent = currentLesson >= start && currentLesson <= end;
        const isPast = currentLesson > end;

        return (
          <div key={section.label} className="flex items-center gap-1">
            {idx > 0 && (
              <span className="text-zinc-600 text-xs mx-1">→</span>
            )}
            <div
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                isCurrent
                  ? "bg-[#FF4422]/15 text-[#FF4422] border border-[#FF4422]/40"
                  : isPast
                    ? "bg-zinc-800 text-zinc-500 border border-zinc-700"
                    : "bg-zinc-900 text-zinc-600 border border-zinc-800"
              }`}
            >
              {section.label} ({start}–{end})
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ── Path Selector ─────────────────────────────────────────── */
export type PathId = "employee" | "clawhub" | "saas" | "business" | "content" | "student" | "investor" | "seller" | "developer" | "marketer" | "hr" | "life";

const PATHS: { id: PathId; icon: string; title: string; desc: string; lessons: number[] }[] = [
  { id: "employee", icon: "👤", title: "Виртуальный сотрудник", desc: "Настраиваешь агента под клиента, получаешь ретейнер $300–1000/мес", lessons: [3, 4, 5, 6] },
  { id: "clawhub", icon: "🏪", title: "ClawHub Marketplace", desc: "Публикуешь агента, продаётся без твоего участия. Пассивный доход", lessons: [7, 8, 9] },
  { id: "saas", icon: "⚙️", title: "SaaS продукт", desc: "Один агент для многих клиентов. Максимальный масштаб", lessons: [10, 11] },
  { id: "business", icon: "🏢", title: "Бизнес — агентство", desc: "Строишь агентные системы под ключ для других бизнесов", lessons: [13, 14] },
  { id: "content", icon: "📢", title: "Контент — медиа агент", desc: "Продаёшь контент-системы блогерам и бизнесам", lessons: [15, 16] },
  { id: "student", icon: "🎓", title: "Студент — образовательный агент", desc: "Образовательный агент как продукт: бот-тьютор, курс, корпоратив", lessons: [17, 18] },
  { id: "investor", icon: "💰", title: "Инвестор — финансовый агент", desc: "Платный аналитический канал на базе агентов", lessons: [19, 20] },
  { id: "seller", icon: "🛍️", title: "Продавец — е-ком агент", desc: "Автоматизация для продавцов маркетплейсов как B2B сервис", lessons: [21, 22] },
  { id: "developer", icon: "👨‍💻", title: "Разработчик — API агент", desc: "Агент как API или CLI для технических команд", lessons: [23, 24] },
  { id: "marketer", icon: "📊", title: "Маркетолог — агентство", desc: "Маркетинговое агентство на агентах для малого бизнеса", lessons: [25, 26] },
  { id: "hr", icon: "👥", title: "HR — рекрутинг-сервис", desc: "Рекрутинговое агентство на агентах: скрининг и онбординг", lessons: [27, 28] },
  { id: "life", icon: "🏠", title: "Для жизни — белый лейбл", desc: "Агенты для повседневной жизни как продукт", lessons: [29, 30] },
];

export function PathSelector() {
  const [selected, setSelected] = useState<PathId | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("b4_path") as PathId | null;
    if (stored && PATHS.some((p) => p.id === stored)) {
      setSelected(stored);
    }
  }, []);

  function handleSelect(id: PathId) {
    setSelected(id);
    localStorage.setItem("b4_path", id);
  }

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 md:p-8 mb-8">
      <h2 className="text-xl font-semibold text-white mb-2">Выбери свой путь монетизации</h2>
      <p className="text-zinc-400 text-sm mb-5">
        Выбранный путь подсветит нужные уроки в сайдбаре
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {PATHS.map((path) => {
          const isSelected = selected === path.id;
          return (
            <button
              key={path.id}
              onClick={() => handleSelect(path.id)}
              className={`text-left rounded-xl p-5 border-2 transition-all ${
                isSelected
                  ? "border-[#FF4422] bg-[#FF4422]/10"
                  : "border-zinc-700 bg-zinc-950 hover:border-zinc-500"
              }`}
            >
              <span className="text-3xl block mb-3">{path.icon}</span>
              <h3 className={`font-semibold mb-1 ${isSelected ? "text-[#FF4422]" : "text-white"}`}>
                {path.title}
              </h3>
              {TRACKS[path.id as TrackId]?.description && (
                <p className="text-xs text-zinc-500 mt-0.5 leading-tight">{TRACKS[path.id as TrackId].description}</p>
              )}
              <p className="text-zinc-400 text-sm">{path.desc}</p>
              <p className="text-zinc-500 text-xs mt-2">
                Уроки {path.lessons.join(", ")}
              </p>
            </button>
          );
        })}
      </div>
      {selected && (
        <p className="text-[#FF4422] text-sm mt-4 font-medium">
          ✓ Выбран: {PATHS.find((p) => p.id === selected)?.title}
        </p>
      )}
    </div>
  );
}

/* ── Revenue Calculator ────────────────────────────────────── */
export function RevenueCalculator() {
  const [tab, setTab] = useState<PathId>("employee");
  const [employeeClients, setEmployeeClients] = useState(5);
  const [employeePrice, setEmployeePrice] = useState(250);
  const [clawhubInstalls, setClawhubInstalls] = useState(50);
  const [clawhubPrice, setClawhubPrice] = useState(15);
  const [saasSubscribers, setSaasSubscribers] = useState(20);
  const [saasPrice, setSaasPrice] = useState(30);

  const revenue =
    tab === "employee"
      ? employeeClients * employeePrice
      : tab === "clawhub"
        ? clawhubInstalls * clawhubPrice
        : saasSubscribers * saasPrice;

  const tabs: { id: PathId; label: string }[] = [
    { id: "employee", label: "👤 Сотрудник" },
    { id: "clawhub", label: "🏪 ClawHub" },
    { id: "saas", label: "⚙️ SaaS" },
  ];

  return (
    <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-6">
      <h3 className="text-lg font-semibold text-white mb-4">💰 Калькулятор дохода</h3>

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              tab === t.id
                ? "bg-[#FF4422] text-white"
                : "bg-zinc-900 text-zinc-400 hover:text-white"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Sliders */}
      <div className="space-y-5">
        {tab === "employee" && (
          <>
            <SliderRow label="Клиентов" value={employeeClients} min={1} max={20} onChange={setEmployeeClients} />
            <SliderRow label="Цена/мес" value={employeePrice} min={50} max={500} step={10} onChange={setEmployeePrice} prefix="$" />
          </>
        )}
        {tab === "clawhub" && (
          <>
            <SliderRow label="Установок" value={clawhubInstalls} min={1} max={500} onChange={setClawhubInstalls} />
            <SliderRow label="Цена" value={clawhubPrice} min={5} max={50} onChange={setClawhubPrice} prefix="$" />
          </>
        )}
        {tab === "saas" && (
          <>
            <SliderRow label="Подписчиков" value={saasSubscribers} min={1} max={200} onChange={setSaasSubscribers} />
            <SliderRow label="Цена подписки" value={saasPrice} min={10} max={100} onChange={setSaasPrice} prefix="$" />
          </>
        )}
      </div>

      {/* Revenue */}
      <div className="mt-6 bg-zinc-900 border border-[#FF4422]/30 rounded-xl p-5 text-center">
        <p className="text-zinc-400 text-sm mb-1">Доход в месяц</p>
        <p
          className="text-4xl font-bold text-[#FF4422] transition-all duration-300"
          key={revenue}
          style={{ animation: "pulse 0.3s ease-in-out" }}
        >
          ${revenue.toLocaleString()}
        </p>
      </div>
    </div>
  );
}

function SliderRow({
  label,
  value,
  min,
  max,
  step = 1,
  onChange,
  prefix = "",
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (v: number) => void;
  prefix?: string;
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <span className="text-zinc-400 text-sm">{label}</span>
        <span className="text-white font-semibold text-sm">
          {prefix}{value}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-zinc-800 accent-[#FF4422]"
      />
    </div>
  );
}

/* ── ClawHub Card Preview ──────────────────────────────────── */
export function ClawHubCardPreview() {
  const [agentName, setAgentName] = useState("");
  const [agentDesc, setAgentDesc] = useState("");

  return (
    <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-6">
      <h3 className="text-lg font-semibold text-white mb-4">🏪 Превью карточки на ClawHub</h3>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Inputs */}
        <div className="flex-1 space-y-4">
          <div>
            <label className="text-zinc-400 text-sm block mb-1">Название агента</label>
            <input
              type="text"
              value={agentName}
              onChange={(e) => setAgentName(e.target.value)}
              placeholder="Цены конкурентов — автопилот"
              className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-2.5 text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#FF4422] transition-colors"
            />
          </div>
          <div>
            <label className="text-zinc-400 text-sm block mb-1">Описание (1–2 предложения)</label>
            <textarea
              value={agentDesc}
              onChange={(e) => setAgentDesc(e.target.value)}
              placeholder="Просыпаешься утром — уже знаешь где конкуренты снизили цены"
              rows={3}
              className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-2.5 text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#FF4422] transition-colors resize-none"
            />
          </div>
        </div>

        {/* Preview Card */}
        <div className="flex items-start justify-center md:justify-end">
          <div className="bg-zinc-900 border border-zinc-700 rounded-xl p-4 w-64">
            <div className="w-10 h-10 bg-[#FF4422]/20 rounded-lg mb-3 flex items-center justify-center text-lg">
              🤖
            </div>
            <h3 className="text-white font-semibold text-sm">
              {agentName || "Название агента"}
            </h3>
            <p className="text-zinc-400 text-xs mt-1 line-clamp-2">
              {agentDesc || "Описание появится здесь..."}
            </p>
            <div className="mt-3 flex items-center justify-between">
              <span className="text-[#FF4422] font-bold text-sm">$9/мес</span>
              <span className="bg-[#FF4422] text-white text-xs px-3 py-1 rounded-lg">
                Установить
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Comparison Table ──────────────────────────────────────── */
export function ComparisonTable({
  headers,
  rows,
}: {
  headers: string[];
  rows: string[][];
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr>
            {headers.map((h) => (
              <th
                key={h}
                className="text-left text-zinc-400 font-semibold px-4 py-3 border-b border-zinc-800"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, idx) => (
            <tr key={idx} className="border-b border-zinc-800/50">
              {row.map((cell, cIdx) => (
                <td
                  key={cIdx}
                  className={`px-4 py-3 ${cIdx === 0 ? "text-zinc-300 font-medium" : "text-zinc-400"}`}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
