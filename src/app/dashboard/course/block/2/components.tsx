"use client";

import { useEffect, useMemo, useState } from "react";

export type TrackId =
  | "freelancer"
  | "content"
  | "business"
  | "student"
  | "investor"
  | "seller"
  | "developer"
  | "marketer"
  | "hr"
  | "life";

type TrackMeta = {
  id: TrackId;
  label: string;
  color: string;
  result: string;
};

export const TRACKS: Record<TrackId, TrackMeta> = {
  freelancer: {
    id: "freelancer",
    label: "🧑‍💼 Фрилансер",
    color: "#3B82F6",
    result:
      "Твой путь: Автоответчик → Ресёрчер → Email-агент → КП-агент → Трекер задач",
  },
  content: {
    id: "content",
    label: "📢 Контент",
    color: "#8B5CF6",
    result:
      "Твой путь: Автоответчик → Ресёрчер → Контент-агент → YouTube-агент → Агент трендов",
  },
  business: {
    id: "business",
    label: "🏢 Бизнес",
    color: "#10B981",
    result:
      "Твой путь: Автоответчик → Ресёрчер → Чат-бот поддержки → Парсер рынка → Лидогенерация",
  },
  student: {
    id: "student",
    label: "🎓 Студент",
    color: "#F59E0B",
    result:
      "Твой путь: Автоответчик → Ресёрчер → Конспектировщик → Агент подготовки к экзамену",
  },
  investor: {
    id: "investor",
    label: "💰 Инвестор",
    color: "#10B981",
    result:
      "Твой путь: Автоответчик → Ресёрчер → Мониторинг рынка → Анализ проектов",
  },
  seller: {
    id: "seller",
    label: "🛍️ Продавец",
    color: "#EC4899",
    result:
      "Твой путь: Автоответчик → Ресёрчер → Описания товаров → Мониторинг отзывов",
  },
  developer: {
    id: "developer",
    label: "👨‍💻 Разработчик",
    color: "#06B6D4",
    result:
      "Твой путь: Автоответчик → Ресёрчер → Code Review → Документация",
  },
  marketer: {
    id: "marketer",
    label: "📊 Маркетолог",
    color: "#F97316",
    result:
      "Твой путь: Автоответчик → Ресёрчер → Аналитика кампаний → A/B тесты",
  },
  hr: {
    id: "hr",
    label: "👥 HR / Рекрутер",
    color: "#A855F7",
    result:
      "Твой путь: Автоответчик → Ресёрчер → Скрининг резюме → Вакансии",
  },
  life: {
    id: "life",
    label: "🏠 Для жизни",
    color: "#84CC16",
    result:
      "Твой путь: Автоответчик → Ресёрчер → Планировщик дня → Финансы → Путешествия",
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

export function TrackBadge({
  track,
  isRecommended,
}: {
  track: TrackId;
  isRecommended?: boolean;
}) {
  const meta = TRACKS[track];
  const color = isRecommended ? ACCENT : meta.color;
  return (
    <span
      className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold border"
      style={{ color, borderColor: color, backgroundColor: `${color}1A` }}
    >
      {meta.label}
    </span>
  );
}

export function ImagePlaceholder({ label }: { label: string }) {
  return (
    <div className="w-full rounded-2xl border border-zinc-800 bg-zinc-900/60 h-56 flex items-center justify-center text-zinc-500 text-sm">
      {label}
    </div>
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
      <h3 className="text-2xl font-semibold text-white mb-3">🎉 Блок 2 завершён</h3>
      <div className="text-zinc-300 space-y-1 mb-4">
        <p>Ты настроил:</p>
        <p>✅ Агента-автоответчика</p>
        <p>✅ Агента-ресёрчера</p>
        <p>✅ {trackLabel}</p>
      </div>
      <p className="text-zinc-400 mb-4">
        Следующий шаг — Блок 3: Мультиагент и автоматизация
      </p>
      <p className="text-zinc-400 mb-6">
        Настроим агентов работать по расписанию, без твоего участия.
      </p>
      <a
        href="/dashboard/course/block/3"
        className="inline-flex items-center px-5 py-3 rounded-xl border border-zinc-800 text-zinc-300 hover:text-white hover:border-[#FF4422] transition-colors"
      >
        Перейти к Блоку 3 →
      </a>
    </div>
  );
}

export function QuizBlock({
  onTrackChange,
}: {
  onTrackChange?: (track: TrackId | null) => void;
}) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<TrackId[]>([]);
  const [track, setTrack] = useState<TrackId | null>(null);
  const [animateIn, setAnimateIn] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("block2_track") as TrackId | null;
    if (stored && TRACKS[stored]) {
      setTrack(stored);
      onTrackChange?.(stored);
    }
  }, [onTrackChange]);

  useEffect(() => {
    setAnimateIn(false);
    const t = setTimeout(() => setAnimateIn(true), 40);
    return () => clearTimeout(t);
  }, [step]);

  const questions = useMemo(
    () => [
      {
        title: "Расскажи о себе",
        options: [
          {
            id: "freelancer" as TrackId,
            label: "🧑‍💼 Фрилансер / специалист — беру проекты, работаю с клиентами",
          },
          {
            id: "content" as TrackId,
            label: "📢 Контент-мейкер / блогер — веду каналы, создаю контент",
          },
          {
            id: "business" as TrackId,
            label: "🏢 Бизнес / команда — у меня есть процессы, команда, продукт",
          },
          {
            id: "student" as TrackId,
            label: "🎓 Студент / учащийся — учусь, пишу работы, готовлюсь к экзаменам",
          },
          {
            id: "investor" as TrackId,
            label: "💰 Инвестор — слежу за рынками, анализирую проекты",
          },
          {
            id: "seller" as TrackId,
            label: "🛍️ Продавец / e-commerce — продаю товары онлайн или офлайн",
          },
          {
            id: "developer" as TrackId,
            label: "👨‍💻 Разработчик / программист — пишу код, делаю продукты",
          },
          {
            id: "marketer" as TrackId,
            label: "📊 Маркетолог — запускаю кампании, работаю с данными и аудиторией",
          },
          {
            id: "hr" as TrackId,
            label: "👥 HR / Рекрутер — ищу людей, строю команды, веду онбординг",
          },
          {
            id: "life" as TrackId,
            label: "🏠 Просто живу — хочу агентов для личной жизни, планирования и быта",
          },
        ],
      },
      {
        title: "Что жжёт сильнее всего?",
        options: [
          {
            id: "freelancer" as TrackId,
            label: "⏰ Теряю время на переписки, входящие и рутину",
          },
          {
            id: "content" as TrackId,
            label: "✏️ Не успеваю создавать контент в нужном объёме",
          },
          {
            id: "business" as TrackId,
            label: "📊 Нет времени мониторить рынок и держать руку на пульсе",
          },
        ],
      },
      {
        title: "Сколько времени готов потратить на первую настройку?",
        options: [
          {
            id: "freelancer" as TrackId,
            label: "⚡ 15 минут — хочу результат быстро",
          },
          {
            id: "content" as TrackId,
            label: "🕐 30 минут — готов разобраться как следует",
          },
          {
            id: "business" as TrackId,
            label: "🕑 1 час — хочу сделать правильно с первого раза",
          },
        ],
      },
    ],
    []
  );

  function handleSelect(option: TrackId) {
    const nextAnswers = [...answers, option];
    setAnswers(nextAnswers);

    if (step < questions.length - 1) {
      setStep(step + 1);
      return;
    }

    const finalTrack = nextAnswers[0] ?? option;
    setTrack(finalTrack);
    localStorage.setItem("block2_track", finalTrack);
    onTrackChange?.(finalTrack);
  }

  function resetQuiz() {
    setStep(0);
    setAnswers([]);
    setTrack(null);
    localStorage.removeItem("block2_track");
    onTrackChange?.(null);
  }

  if (track) {
    return (
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 md:p-8">
        <h3 className="text-2xl font-semibold text-white mb-2">
          Результат квиза
        </h3>
        <p className="text-zinc-300 mb-4">{TRACKS[track].result}</p>
        <button
          onClick={resetQuiz}
          className="text-[#FF4422] hover:text-[#ff5a3c] transition-colors text-sm font-semibold"
        >
          Изменить путь
        </button>
      </div>
    );
  }

  const current = questions[step];

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 md:p-8">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-2xl font-semibold text-white">Выбери свой путь</h3>
        <span className="text-xs text-zinc-500">
          Вопрос {step + 1} из {questions.length}
        </span>
      </div>
      <div
        className={`transition-all duration-300 ${
          animateIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
        }`}
      >
        <p className="text-zinc-300 font-semibold mb-4">{current.title}</p>
        <div className="flex flex-col gap-3">
          {current.options.map((option) => (
            <button
              key={option.id}
              onClick={() => handleSelect(option.id)}
              className="text-left bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-300 hover:border-[#FF4422] hover:text-white transition-colors"
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export function TrackChoiceCards() {
  return (
    <div className="grid md:grid-cols-3 gap-4">
      {(
        [
          {
            id: "freelancer" as TrackId,
            title: "Урок 3: Email-агент",
            desc: "Разбирай inbox за 10 минут вместо часа",
            href: "/dashboard/course/block/2/lesson/3",
          },
          {
            id: "content" as TrackId,
            title: "Урок 4: Контент-агент",
            desc: "Контент-план на неделю и готовые посты",
            href: "/dashboard/course/block/2/lesson/4",
          },
          {
            id: "business" as TrackId,
            title: "Урок 10: Чат-бот поддержки",
            desc: "Отвечай клиентам 24/7 — без менеджера",
            href: "/dashboard/course/block/2/lesson/10",
          },
          {
            id: "student" as TrackId,
            title: "Урок 12: Агент-конспектировщик",
            desc: "Структурируй учебные материалы за 5 минут",
            href: "/dashboard/course/block/2/lesson/12",
          },
          {
            id: "investor" as TrackId,
            title: "Урок 14: Агент мониторинга рынка",
            desc: "Ежедневный дайджест по рынкам",
            href: "/dashboard/course/block/2/lesson/14",
          },
          {
            id: "seller" as TrackId,
            title: "Урок 16: Агент описаний товаров",
            desc: "Продающие описания за 5 минут",
            href: "/dashboard/course/block/2/lesson/16",
          },
          {
            id: "developer" as TrackId,
            title: "Урок 18: Агент code review",
            desc: "Находи баги до продакшна",
            href: "/dashboard/course/block/2/lesson/18",
          },
          {
            id: "marketer" as TrackId,
            title: "Урок 20: Агент аналитики кампаний",
            desc: "Превращай цифры в решения",
            href: "/dashboard/course/block/2/lesson/20",
          },
          {
            id: "hr" as TrackId,
            title: "Урок 22: Агент скрининга резюме",
            desc: "Найди лучших из 200 кандидатов",
            href: "/dashboard/course/block/2/lesson/22",
          },
          {
            id: "life" as TrackId,
            title: "Урок 24: Агент планировщика дня",
            desc: "Начинай день с ясностью",
            href: "/dashboard/course/block/2/lesson/24",
          },
        ]
      ).map((card) => (
        <a
          key={card.id}
          href={card.href}
          className="bg-zinc-950 border border-zinc-800 rounded-2xl p-5 hover:border-[#FF4422] transition-colors"
        >
          <div className="mb-3">
            <TrackBadge track={card.id} />
          </div>
          <p className="text-white font-semibold mb-2">{card.title}</p>
          <p className="text-zinc-400 text-sm">{card.desc}</p>
        </a>
      ))}
    </div>
  );
}
