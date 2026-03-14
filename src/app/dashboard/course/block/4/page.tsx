"use client";

import Link from "next/link";
import { PathSelector } from "./components";

const sections = [
  {
    title: "Секция 1: Разворот — от пользователя к поставщику",
    lessons: [
      { num: 1, title: "Твоя система стала продуктом", track: "all" },
      { num: 2, title: "Выбери свой путь", track: "all" },
    ],
  },
  {
    title: "Секция 2: Виртуальный сотрудник",
    lessons: [
      { num: 3, title: "Агент-сотрудник: настройка под клиента", track: "freelancer" },
      { num: 4, title: "White-label: агент под чужим брендом", track: "freelancer" },
      { num: 5, title: "SLA без страха: что обещать клиенту", track: "freelancer" },
      { num: 6, title: "Продакшн: агент работает — ты спишь", track: "freelancer" },
    ],
  },
  {
    title: "Секция 3: ClawHub — маркетплейс агентов",
    lessons: [
      { num: 7, title: "ClawHub: маркетплейс агентов", track: "all" },
      { num: 8, title: "Упаковка агента для продажи", track: "all" },
      { num: 9, title: "Первая продажа на ClawHub", track: "all" },
    ],
  },
  {
    title: "Секция 4: Один агент для многих — первые шаги к SaaS",
    lessons: [
      { num: 10, title: "Один агент для многих: multi-tenant", track: "all" },
      { num: 11, title: "Биллинг: как брать деньги за агента", track: "all" },
      { num: 12, title: "Капстоун: запускаем первого клиента", track: "all" },
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

export default function Block4Page() {
  return (
    <main className="min-h-screen bg-[#0D0D0D] text-zinc-200">
      {/* Header */}
      <section className="border-b border-zinc-900">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <p className="text-[#FF4422] text-sm font-semibold mb-2">Block 4</p>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
            Продай своего агента: ClawHub и виртуальный сотрудник
          </h1>
          <p className="text-xl md:text-2xl font-bold text-white mb-2">
            «Ты строил — теперь продаёшь. Первые $1000 с агентов»
          </p>
          <p className="text-zinc-400 text-base">
            12 уроков · 4 секции · Выбери свой путь монетизации
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
        {/* Path Selector */}
        <PathSelector />

        {/* CTA */}
        <div className="bg-zinc-900 rounded-2xl p-6 md:p-8 border border-zinc-800 mb-8">
          <Link
            href="/dashboard/course/block/4/lesson/1"
            className="inline-flex items-center px-6 py-3 rounded-xl bg-[#FF4422] text-white font-semibold hover:bg-[#e63d1e] transition-colors"
          >
            Начать с урока 1 →
          </Link>
        </div>

        {/* Journey path */}
        <div className="bg-zinc-800 rounded-2xl p-6 md:p-8 border border-zinc-700 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] items-start gap-4 md:gap-2 text-center">
            {/* Step 1 */}
            <div className="flex flex-col items-center gap-2">
              <span className="text-sm font-semibold text-zinc-400">Секция 1</span>
              <span className="text-2xl">🔄</span>
              <span className="text-white font-semibold text-sm">Уроки 1–2</span>
              <span className="text-zinc-400 text-xs leading-tight">
                Разворот
                <br />
                от пользователя к поставщику
              </span>
            </div>
            <div className="hidden md:flex items-center justify-center pt-6 text-zinc-500 text-xl">→</div>
            {/* Step 2 */}
            <div className="flex flex-col items-center gap-2">
              <span className="text-sm font-semibold" style={{ color: "#FF4422" }}>Секция 2</span>
              <span className="text-2xl">👤</span>
              <span className="font-semibold text-sm" style={{ color: "#FF4422" }}>Уроки 3–6</span>
              <span className="text-zinc-400 text-xs leading-tight">
                Виртуальный
                <br />
                сотрудник
              </span>
            </div>
            <div className="hidden md:flex items-center justify-center pt-6 text-zinc-500 text-xl">→</div>
            {/* Step 3 */}
            <div className="flex flex-col items-center gap-2">
              <span className="text-sm font-semibold text-zinc-400">Секция 3</span>
              <span className="text-2xl">🏪</span>
              <span className="text-white font-semibold text-sm">Уроки 7–9</span>
              <span className="text-zinc-400 text-xs leading-tight">
                ClawHub
                <br />
                маркетплейс
              </span>
            </div>
            <div className="hidden md:flex items-center justify-center pt-6 text-zinc-500 text-xl">→</div>
            {/* Step 4 */}
            <div className="flex flex-col items-center gap-2">
              <span className="text-sm font-semibold text-zinc-400">Секция 4</span>
              <span className="text-2xl">⚙️</span>
              <span className="text-white font-semibold text-sm">Уроки 10–12</span>
              <span className="text-zinc-400 text-xs leading-tight">
                SaaS
                <br />
                и капстоун
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
                  const isCapstone = lesson.num === 12;
                  return (
                    <Link
                      key={lesson.num}
                      href={`/dashboard/course/block/4/lesson/${lesson.num}`}
                      className={`relative flex items-center gap-3 rounded-lg px-4 py-3 transition-colors group ${
                        isCapstone
                          ? "bg-[#FF4422]/5 border border-[#FF4422]/50 hover:border-[#FF4422]"
                          : "bg-zinc-950 border border-zinc-800 hover:border-[#FF4422]"
                      }`}
                    >
                      <span
                        className="w-6 h-6 rounded-full border flex items-center justify-center text-xs shrink-0"
                        style={{
                          borderColor: isCapstone
                            ? "#FF4422"
                            : trackColors[lesson.track],
                          color: isCapstone
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
                        {isCapstone && (
                          <p className="text-xs text-zinc-500 mt-0.5">
                            Финальный запуск — реальный клиент или публикация
                          </p>
                        )}
                      </div>
                      {isCapstone && (
                        <span className="absolute top-2 right-3 text-xs font-semibold text-[#FF4422]">
                          ⭐ Финал
                        </span>
                      )}
                      {!isCapstone && <TrackBadge track={lesson.track} />}
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
