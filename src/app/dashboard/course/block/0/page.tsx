"use client";

import Link from "next/link";

const lessons = [
  {
    id: 1,
    title: "Что такое ИИ-агент и как он думает и действует",
    href: "/dashboard/course/block/0/lesson/1",
    available: true,
  },
  {
    id: 2,
    title: "OpenClaw vs ChatGPT vs n8n — в чём принципиальная разница",
    href: "/dashboard/course/block/0/lesson/2",
    available: true,
  },
  {
    id: 3,
    title: "Реальные кейсы: предприниматель, дизайнер, студент, фрилансер",
    href: "/dashboard/course/block/0/lesson/3",
    available: true,
  },
  {
    id: 4,
    title: "Твой результат и карта пути: от Block 0 до Block 5",
    href: "/dashboard/course/block/0/lesson/4",
    available: true,
  },
];

function LessonCard({
  id,
  title,
  href,
  available,
  badge,
}: {
  id: number;
  title: string;
  href: string;
  available: boolean;
  badge?: string;
}) {
  const baseClass =
    "relative flex items-center justify-between gap-4 rounded-xl border p-5 transition-colors";

  const content = (
    <div
      className={`${baseClass} ${
        available
          ? "border-zinc-800 bg-zinc-900/70 hover:border-[#FF4422]"
          : "border-zinc-900 bg-zinc-900/40 opacity-60 cursor-not-allowed"
      }`}
    >
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-full border border-[#FF4422] text-[#FF4422] flex items-center justify-center font-semibold">
          {id}
        </div>
        <div>
          <p className="text-zinc-500 text-xs uppercase tracking-wide">Урок {id}</p>
          <h3 className="text-white text-lg font-semibold">{title}</h3>
        </div>
      </div>
      <div className="flex items-center gap-3">
        {badge && (
          <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-zinc-800 text-zinc-300">
            {badge}
          </span>
        )}
        <span
          className={`px-4 py-2 rounded-lg text-sm font-semibold ${
            available
              ? "bg-[#FF4422] text-white"
              : "bg-zinc-800 text-zinc-500"
          }`}
        >
          Начать →
        </span>
      </div>
    </div>
  );

  if (!available) return content;

  return (
    <Link href={href} className="block">
      {content}
    </Link>
  );
}

export default function Block0IndexPage() {
  return (
    <main className="min-h-screen bg-[#0D0D0D] px-4 py-12">
      {/* Block Navigation */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-4">
        <div className="flex items-center gap-2 flex-wrap">
          <Link href="/dashboard" className="text-xs text-zinc-500 hover:text-white transition-colors mr-2">
            ← Дашборд
          </Link>
          {[
            { num: 0, href: "/dashboard/course/block/0/lesson/1" },
            { num: 1, href: "/dashboard/course/block/1/lesson/1" },
            { num: 2, href: "/dashboard/course/block/2/lesson/1" },
            { num: 3, href: "/dashboard/course/block/3/lesson/1" },
            { num: 4, href: "/dashboard/course/block/4/lesson/1" },
          ].map((b) => (
            <Link
              key={b.num}
              href={b.href}
              className={`text-xs px-3 py-1 rounded-lg border transition-colors ${
                b.num === 0
                  ? "border-[#FF4422] text-[#FF4422]"
                  : "border-zinc-700 text-zinc-400 hover:text-white hover:border-zinc-500"
              }`}
            >
              Блок {b.num}
            </Link>
          ))}
        </div>
      </div>

      <div className="max-w-4xl mx-auto">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 text-zinc-500 hover:text-zinc-300 transition-colors text-sm"
        >
          ← Назад к курсу
        </Link>

        <h1 className="text-2xl md:text-4xl font-bold text-white mt-6">
          Блок 0: Вход — что такое ИИ-агент
        </h1>
        <p className="text-zinc-500 mt-2">4 урока · ~60 минут</p>

        <div className="mt-8 flex flex-col gap-4">
          {lessons.map((lesson) => (
            <LessonCard key={lesson.id} {...lesson} />
          ))}
        </div>
      </div>
    </main>
  );
}
