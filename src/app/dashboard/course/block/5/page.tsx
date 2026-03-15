"use client";

import Link from "next/link";

const sections = [
  {
    title: "Секция 1: Основы агентского бизнеса",
    lessons: [
      { num: 1, title: "От первого дохода к системе", track: "all" },
      { num: 2, title: "Первый помощник: делегирование без потери контроля", track: "all" },
      { num: 3, title: "Машина лидогенерации: клиенты приходят сами", track: "all" },
      { num: 4, title: "Личный бренд ИИ-эксперта", track: "all" },
    ],
  },
  {
    title: "Секция 2: Масштаб по треку",
    lessons: [
      { num: 5, title: "Фрилансер: от проектов к ретейнерам", track: "freelancer" },
      { num: 6, title: "Фрилансер: субподряд и партнёрства", track: "freelancer" },
      { num: 7, title: "Бизнес: агентство внутри компании", track: "business" },
      { num: 8, title: "Бизнес: операционная система агентства", track: "business" },
      { num: 9, title: "Контент: медиа-империя на агентах", track: "content" },
      { num: 10, title: "Контент: монетизация медиа-портфолио", track: "content" },
      { num: 11, title: "Студент: стартап на базе студенческого проекта", track: "student" },
      { num: 12, title: "Студент: привлечение инвестиций и масштаб", track: "student" },
      { num: 13, title: "Инвестор: фонд на агентах", track: "investor" },
      { num: 14, title: "Инвестор: масштаб и трек-рекорд", track: "investor" },
      { num: 15, title: "Продавец: маркетплейс агентство", track: "seller" },
      { num: 16, title: "Продавец: собственный e-com бренд", track: "seller" },
      { num: 17, title: "Разработчик: SaaS на агентах", track: "developer" },
      { num: 18, title: "Разработчик: рост и enterprise", track: "developer" },
      { num: 19, title: "Маркетолог: performance агентство", track: "marketer" },
      { num: 20, title: "Маркетолог: стратегическое консалтинговое агентство", track: "marketer" },
      { num: 21, title: "HR: кадровое агентство нового поколения", track: "hr" },
      { num: 22, title: "HR: HR-аутсорсинг как SaaS", track: "hr" },
      { num: 23, title: "Жизнь: помогаю другим — сообщество", track: "life" },
      { num: 24, title: "Жизнь: личный коучинг с агентами", track: "life" },
    ],
  },
  {
    title: "Секция 3: Финмодель и капстоун",
    lessons: [
      { num: 25, title: "Финансовая модель агентства", track: "all" },
      { num: 26, title: "Капстоун: агентство запущено", track: "all" },
    ],
  },
];

const trackColors: Record<string, string> = {
  all: "#71717A",
  freelancer: "#3B82F6",
  business: "#10B981",
  content: "#8B5CF6",
  student: "#F59E0B",
  investor: "#10B981",
  seller: "#EC4899",
  developer: "#06B6D4",
  marketer: "#F97316",
  hr: "#A855F7",
  life: "#84CC16",
};

const trackLabels: Record<string, string> = {
  all: "🌐 Для всех",
  freelancer: "🧑‍💼",
  business: "🏢",
  content: "📢",
  student: "🎓",
  investor: "💰",
  seller: "🛍️",
  developer: "👨‍💻",
  marketer: "📊",
  hr: "👥",
  life: "🏠",
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

export default function Block5Page() {
  return (
    <main className="min-h-screen bg-[#0D0D0D] text-zinc-200">
      {/* Header */}
      <section className="border-b border-zinc-900">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <p className="text-[#FF4422] text-sm font-semibold mb-2">Block 5</p>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
            Агентский бизнес: от фрилансера к агентству
          </h1>
          <p className="text-xl md:text-2xl font-bold text-white mb-2">
            «От $1000 к $5000+: система которая растёт без тебя»
          </p>
          <p className="text-zinc-400 text-base">
            26 уроков · 10 треков · Выбери свой путь после урока 4 и масштабируй
            бизнес по своему треку
          </p>
        </div>
      </section>

      {/* Block Navigation */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-4">
        <div className="flex items-center gap-2">
          <Link href="/dashboard" className="text-xs text-zinc-500 hover:text-white transition-colors mr-2">
            ← Дашборд
          </Link>
          {[
            { num: 1, href: "/dashboard/course/block/1/lesson/1" },
            { num: 2, href: "/dashboard/course/block/2/lesson/1" },
            { num: 3, href: "/dashboard/course/block/3/lesson/1" },
            { num: 4, href: "/dashboard/course/block/4/lesson/1" },
            { num: 5, href: "/dashboard/course/block/5/lesson/1" },
          ].map((b) => (
            <Link
              key={b.num}
              href={b.href}
              className={`text-xs px-3 py-1 rounded-lg border transition-colors ${
                b.num === 5
                  ? "border-[#FF4422] text-[#FF4422]"
                  : "border-zinc-700 text-zinc-400 hover:text-white hover:border-zinc-500"
              }`}
            >
              Блок {b.num}
            </Link>
          ))}
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
        {/* Description + CTA */}
        <div className="bg-zinc-900 rounded-2xl p-6 md:p-8 border border-zinc-800 mb-8">
          <Link
            href="/dashboard/course/block/5/lesson/1"
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
              <span className="text-white font-semibold text-sm">Уроки 1–4</span>
              <span className="text-zinc-400 text-xs leading-tight">
                Основы
                <br />
                агентского бизнеса
              </span>
            </div>

            {/* Arrow 1 */}
            <div className="hidden md:flex items-center justify-center pt-6 text-zinc-500 text-xl">
              →
            </div>

            {/* Step 2 (accent) */}
            <div className="flex flex-col items-center gap-2">
              <span className="text-sm font-semibold text-zinc-400">
                Шаг 2
              </span>
              <span className="text-2xl">🎯</span>
              <span className="text-white font-semibold text-sm">
                Уроки 5–24
              </span>
              <span className="text-zinc-400 text-xs leading-tight">
                Масштаб
                <br />
                по своему треку
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
              <span className="text-white font-semibold text-sm">Уроки 25–26</span>
              <span className="text-zinc-400 text-xs leading-tight">
                Финмодель
                <br />и капстоун
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
                  return (
                    <Link
                      key={lesson.num}
                      href={`/dashboard/course/block/5/lesson/${lesson.num}`}
                      className="relative flex items-center gap-3 rounded-lg px-4 py-3 transition-colors group bg-zinc-950 border border-zinc-800 hover:border-[#FF4422]"
                    >
                      <span
                        className="w-6 h-6 rounded-full border flex items-center justify-center text-xs shrink-0"
                        style={{
                          borderColor: trackColors[lesson.track],
                          color: trackColors[lesson.track],
                        }}
                      >
                        {lesson.num}
                      </span>
                      <div className="flex-1 min-w-0">
                        <span className="text-zinc-300 group-hover:text-white">
                          {lesson.title}
                        </span>
                      </div>
                      <TrackBadge track={lesson.track} />
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
            href="/dashboard"
            className="text-zinc-400 hover:text-zinc-200 text-sm transition-colors"
          >
            ← Вернуться к курсу
          </Link>
        </div>
      </div>
    </main>
  );
}
