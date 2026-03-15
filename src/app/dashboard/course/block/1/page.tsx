"use client";

import Link from "next/link";

const lessons = [
  {
    id: 1,
    title: "Установка OpenClaw — Mac, Windows, Linux, VPS",
    href: "/dashboard/course/block/1/lesson/1",
    available: true,
  },
  {
    id: 2,
    title: "Первый агент за 15 минут — Telegram-бот с нуля",
    href: "/dashboard/course/block/1/lesson/2",
    available: true,
  },
  {
    id: 3,
    title: "Подключения: Google, Notion, Calendar",
    href: "/dashboard/course/block/1/lesson/3",
    available: true,
  },
  {
    id: 4,
    title: "Первая автоматизация — агент работает без тебя",
    href: "/dashboard/course/block/1/lesson/4",
    available: true,
  },
];

function LessonCard({
  id,
  title,
  href,
  available,
}: {
  id: number;
  title: string;
  href: string;
  available: boolean;
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
          <p className="text-white font-medium">{title}</p>
          {!available && (
            <p className="text-zinc-500 text-sm mt-0.5">Скоро</p>
          )}
        </div>
      </div>
      {available && (
        <span className="text-[#FF4422] text-sm shrink-0">Открыть →</span>
      )}
    </div>
  );

  return available ? (
    <Link href={href}>{content}</Link>
  ) : (
    <div>{content}</div>
  );
}

export default function Block1IndexPage() {
  return (
    <main className="min-h-screen bg-[#0D0D0D] text-zinc-200">
      <section className="border-b border-zinc-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
          <Link
            href="/dashboard"
            className="text-zinc-500 hover:text-zinc-300 text-sm transition-colors mb-6 inline-block"
          >
            ← Дашборд
          </Link>
          <div className="flex items-center gap-3 mb-3">
            <span className="px-3 py-1 bg-[#FF4422]/10 text-[#FF4422] text-xs font-bold rounded-full border border-[#FF4422]/20">
              Genesis
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            Установка и первый агент
          </h1>
          <p className="text-zinc-400">
            Запустишь OpenClaw и создашь первого Telegram-агента за 15 минут
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
                b.num === 1
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
        <div className="flex flex-col gap-4">
          {lessons.map((lesson) => (
            <LessonCard key={lesson.id} {...lesson} />
          ))}
        </div>

        <div className="mt-10">
          <Link
            href="/dashboard"
            className="px-5 py-3 rounded-xl border border-zinc-800 text-zinc-300 hover:text-white hover:border-[#FF4422] transition-colors inline-block"
          >
            ← Назад к дашборду
          </Link>
        </div>
      </div>
    </main>
  );
}
