"use client";

import Link from "next/link";

const sections = [
  {
    title: "Секция 1: Почему мультиагент",
    lessons: [
      { num: 1, title: "Один агент — это потолок", track: "all" },
      { num: 2, title: "Роли: Orchestrator, Workers, Monitor", track: "all" },
      { num: 3, title: "Квиз: Выбери свою команду", track: "all" },
    ],
  },
  {
    title: "Секция 2: Архитектура команды",
    lessons: [
      { num: 4, title: "Делегирование и изоляция", track: "all" },
      { num: 5, title: "Cron + мультиагент", track: "all" },
      { num: 6, title: "Агент-проверяльщик (QA)", track: "all" },
      { num: 7, title: "Живой пример: Zen + Dev + Mark", track: "all" },
    ],
  },
  {
    title: "Секция 3: Практика по трекам",
    lessons: [
      { num: 8, title: "КП + трекер + коммуникатор", track: "freelancer" },
      { num: 9, title: "Агент-биллинг", track: "freelancer" },
      { num: 10, title: "CRM + поддержка + аналитика", track: "business" },
      { num: 11, title: "Агент-воронка", track: "business" },
      { num: 12, title: "Research → Write → Publish", track: "content" },
      { num: 13, title: "Редактор + дистрибьютор", track: "content" },
      { num: 14, title: "Мониторинг рынков и агент-сигнальщик", track: "money" },
      { num: 15, title: "Агент-планировщик возможностей", track: "money" },
    ],
  },
  {
    title: "Секция 4: Управление и мониторинг",
    lessons: [
      { num: 16, title: "Токены, бюджеты, watchdog", track: "all" },
      { num: 17, title: "Обработка ошибок и fallback", track: "all" },
    ],
  },
  {
    title: "Секция 5: Безопасность и финал",
    lessons: [
      { num: 18, title: "Границы агента", track: "all" },
      { num: 19, title: "Секреты и API ключи", track: "all" },
      { num: 20, title: "Капстоун: запусти свою систему", track: "all" },
    ],
  },
];

const trackColors: Record<string, string> = {
  all: "#71717A",
  freelancer: "#3B82F6",
  business: "#10B981",
  content: "#8B5CF6",
  money: "#F59E0B",
};

const trackLabels: Record<string, string> = {
  all: "🌐 Для всех",
  freelancer: "🧑‍💼",
  business: "🏢",
  content: "📢",
  money: "💰",
};

function TrackBadge({ track }: { track: string }) {
  const color = trackColors[track];
  return (
    <span
      className="text-xs px-2 py-0.5 rounded-full border whitespace-nowrap"
      style={{
        borderColor: color,
        color: color,
        backgroundColor: `${color}10`,
      }}
    >
      {trackLabels[track]}
    </span>
  );
}

export default function Block3Page() {
  return (
    <main className="min-h-screen bg-[#0D0D0D] text-zinc-200">
      {/* Header */}
      <section className="border-b border-zinc-900">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <p className="text-[#FF4422] text-sm font-semibold mb-2">Block 3</p>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
            Мультиагент и автоматизация
          </h1>
          <p className="text-xl md:text-2xl font-bold text-white mb-2">
            «Перестань управлять агентами — пусть они управляют собой»
          </p>
          <p className="text-zinc-400 text-base">
            20 уроков · 4 трека · Выбери свой путь после урока 3 и получи готовую
            схему для своей задачи
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
        {/* Description + CTA */}
        <div className="bg-zinc-900 rounded-2xl p-6 md:p-8 border border-zinc-800 mb-8">
          <Link
            href="/dashboard/course/block/3/lesson/1"
            className="inline-flex items-center px-6 py-3 rounded-xl bg-[#FF4422] text-white font-semibold hover:bg-[#e63d1e] transition-colors"
          >
            Начать с урока 1 →
          </Link>
        </div>

        {/* Journey path */}
        <div className="bg-zinc-800 rounded-2xl p-6 md:p-8 border border-zinc-700 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr_auto_1fr] items-start gap-4 md:gap-2 text-center">
            {/* Step 1 */}
            <div className="flex flex-col items-center gap-2">
              <span className="text-sm font-semibold text-zinc-400">Шаг 1</span>
              <span className="text-2xl">📚</span>
              <span className="text-white font-semibold text-sm">Уроки 1–2</span>
              <span className="text-zinc-400 text-xs leading-tight">
                Основы
                <br />
                мультиагента
              </span>
            </div>

            {/* Arrow 1 */}
            <div className="hidden md:flex items-center justify-center pt-6 text-zinc-500 text-xl">
              →
            </div>

            {/* Step 2 (accent) */}
            <div className="flex flex-col items-center gap-2">
              <span className="text-sm font-semibold" style={{ color: "#FF4422" }}>
                Шаг 2
              </span>
              <span className="text-2xl">🎯</span>
              <span
                className="font-semibold text-sm"
                style={{ color: "#FF4422" }}
              >
                Урок 3: Квиз
              </span>
              <span className="text-zinc-400 text-xs leading-tight">
                Выбери трек
                <br />
                из 4 вариантов
              </span>
            </div>

            {/* Arrow 2 */}
            <div className="hidden md:flex items-center justify-center pt-6 text-zinc-500 text-xl">
              →
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center gap-2">
              <span className="text-sm font-semibold text-zinc-400">Шаг 3</span>
              <span className="text-2xl">⚡</span>
              <span className="text-white font-semibold text-sm">Уроки 4–20</span>
              <span className="text-zinc-400 text-xs leading-tight">
                Практика
                <br />
                по своей задаче
              </span>
            </div>
          </div>
        </div>

        {/* Sections — all expanded */}
        <div className="space-y-4">
          {sections.map((section) => (
            <div
              key={section.title}
              className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden"
            >
              <div className="px-6 py-4">
                <span className="text-white font-semibold">
                  {section.title}
                </span>
                <span className="text-zinc-500 text-sm ml-3">
                  {section.lessons.length} уроков
                </span>
              </div>
              <div className="px-6 pb-5 space-y-2">
                {section.lessons.map((lesson) => {
                  const isQuiz = lesson.num === 3;
                  return (
                    <Link
                      key={lesson.num}
                      href={`/dashboard/course/block/3/lesson/${lesson.num}`}
                      className={`relative flex items-center gap-3 rounded-lg px-4 py-3 transition-colors group ${
                        isQuiz
                          ? "bg-[#FF4422]/5 border border-[#FF4422]/50 hover:border-[#FF4422]"
                          : "bg-zinc-950 border border-zinc-800 hover:border-[#FF4422]"
                      }`}
                    >
                      <span
                        className="w-6 h-6 rounded-full border flex items-center justify-center text-xs shrink-0"
                        style={{
                          borderColor: isQuiz
                            ? "#FF4422"
                            : trackColors[lesson.track],
                          color: isQuiz
                            ? "#FF4422"
                            : trackColors[lesson.track],
                        }}
                      >
                        {lesson.num}
                      </span>
                      <div className="flex-1 min-w-0">
                        <span className="text-zinc-300 group-hover:text-white">
                          {lesson.title}
                        </span>
                        {isQuiz && (
                          <p className="text-xs text-zinc-500 mt-0.5">
                            Определяет твой персональный путь в блоке
                          </p>
                        )}
                      </div>
                      {isQuiz && (
                        <span className="absolute top-2 right-3 text-xs font-semibold text-[#FF4422]">
                          ⭐ Ключевой урок
                        </span>
                      )}
                      {!isQuiz && <TrackBadge track={lesson.track} />}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Back link */}
        <div className="mt-8">
          <Link
            href="/dashboard/course"
            className="text-zinc-400 hover:text-zinc-200 text-sm transition-colors"
          >
            ← Вернуться к курсу
          </Link>
        </div>
      </div>
    </main>
  );
}
