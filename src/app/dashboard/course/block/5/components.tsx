"use client";

import { useEffect, useState } from "react";

export type TrackId =
  | "freelancer" | "content" | "business" | "money"
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
}: {
  code: string;
  instruction?: string;
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
      <h3 className="text-2xl font-semibold text-white mb-3">🎉 Блок 5 завершён</h3>
      <div className="text-zinc-300 space-y-1 mb-4">
        <p>Ты прошёл:</p>
        <p>✅ {trackLabel}</p>
      </div>
      <p className="text-zinc-400 mb-4">
        У тебя теперь есть работающий агентский бизнес — система которая растёт без тебя.
      </p>
      <p className="text-zinc-400 mb-6">
        Поздравляем! Ты завершил весь курс ClawAcademy.
      </p>
      <a
        href="/dashboard"
        className="inline-flex items-center px-5 py-3 rounded-xl border border-zinc-800 text-zinc-300 hover:text-white hover:border-[#FF4422] transition-colors"
      >
        Вернуться к курсу →
      </a>
    </div>
  );
}

interface QuizOption {
  id: TrackId;
  label: string;
  nextLesson: number;
}

const quizOptions: QuizOption[] = [
  {
    id: "freelancer",
    label: "🧑‍💼 Фриланс — от проектов к ретейнерам и партнёрствам",
    nextLesson: 5,
  },
  {
    id: "business",
    label: "🏢 Бизнес — агентство внутри компании и операционная система",
    nextLesson: 7,
  },
  {
    id: "content",
    label: "📢 Контент — медиа-империя и монетизация портфолио",
    nextLesson: 9,
  },
  {
    id: "student",
    label: "🎓 Студент — стартап и привлечение инвестиций",
    nextLesson: 11,
  },
  {
    id: "investor",
    label: "💰 Инвестор — фонд на агентах и масштаб",
    nextLesson: 13,
  },
  {
    id: "seller",
    label: "🛍️ Продавец — маркетплейс агентство и собственный бренд",
    nextLesson: 15,
  },
  {
    id: "developer",
    label: "👨‍💻 Разработчик — SaaS на агентах и enterprise",
    nextLesson: 17,
  },
  {
    id: "marketer",
    label: "📊 Маркетолог — performance и консалтинговое агентство",
    nextLesson: 19,
  },
  {
    id: "hr",
    label: "👥 HR — кадровое агентство и HR-аутсорсинг",
    nextLesson: 21,
  },
  {
    id: "life",
    label: "🏠 Для жизни — сообщество и коучинг с агентами",
    nextLesson: 23,
  },
];

export function QuizBlock({
  onTrackChange,
}: {
  onTrackChange?: (track: TrackId | null) => void;
}) {
  const [track, setTrack] = useState<TrackId | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("block5_track") as TrackId | null;
    if (stored && TRACKS[stored] && stored !== "all") {
      setTrack(stored);
      onTrackChange?.(stored);
    }
  }, [onTrackChange]);

  function handleSelect(option: QuizOption) {
    setTrack(option.id);
    localStorage.setItem("block5_track", option.id);
    onTrackChange?.(option.id);
  }

  function resetQuiz() {
    setTrack(null);
    localStorage.removeItem("block5_track");
    onTrackChange?.(null);
  }

  if (track) {
    const selected = quizOptions.find((o) => o.id === track);
    return (
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 md:p-8">
        <h3 className="text-2xl font-semibold text-white mb-2">
          Твой трек выбран
        </h3>
        <div className="flex items-center gap-3 mb-4">
          <TrackBadge track={track} />
        </div>
        <p className="text-zinc-300 mb-4">
          Следующий урок:{" "}
          <a
            href={`/dashboard/course/block/5/lesson/${selected?.nextLesson}`}
            className="text-[#FF4422] hover:text-[#ff5a3c] transition-colors"
          >
            Урок {selected?.nextLesson} →
          </a>
        </p>
        <button
          onClick={resetQuiz}
          className="text-[#FF4422] hover:text-[#ff5a3c] transition-colors text-sm font-semibold"
        >
          Изменить трек
        </button>
      </div>
    );
  }

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 md:p-8">
      <h3 className="text-2xl font-semibold text-white mb-2">
        Какое направление масштабирования тебе ближе?
      </h3>
      <p className="text-zinc-400 mb-4">
        Выбери свой трек — дальше учишься на конкретных схемах для своего бизнеса.
      </p>
      <div className="flex flex-col gap-3">
        {quizOptions.map((option) => (
          <button
            key={option.id}
            onClick={() => handleSelect(option)}
            className="text-left bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-300 hover:border-[#FF4422] hover:text-white transition-colors"
          >
            {option.label}
            {TRACKS[option.id]?.description && (
              <p className="text-xs text-zinc-500 mt-0.5 leading-tight">{TRACKS[option.id].description}</p>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
