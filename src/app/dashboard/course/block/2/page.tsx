"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  QuizBlock,
  TrackBadge,
  TRACKS,
  type TrackId,
} from "./components";

const lessons = [
  {
    id: 1,
    title: "Агент-автоответчик",
    href: "/dashboard/course/block/2/lesson/1",
    available: true,
  },
  {
    id: 2,
    title: "Агент-ресёрчер",
    href: "/dashboard/course/block/2/lesson/2",
    available: true,
  },
  {
    id: 3,
    title: "Email-агент",
    href: "/dashboard/course/block/2/lesson/3",
    available: true,
    track: "freelancer" as TrackId,
  },
  {
    id: 4,
    title: "Контент-агент для TG/Instagram",
    href: "/dashboard/course/block/2/lesson/4",
    available: true,
    track: "content" as TrackId,
  },
  {
    id: 5,
    title: "Агент-парсер рынка",
    href: "/dashboard/course/block/2/lesson/5",
    available: true,
    track: "business" as TrackId,
  },
];

function LessonCard({
  id,
  title,
  href,
  available,
  track,
  recommendedTrack,
}: {
  id: number;
  title: string;
  href: string;
  available: boolean;
  track?: TrackId;
  recommendedTrack: TrackId | null;
}) {
  const isRecommended = track && track === recommendedTrack;
  const baseClass =
    "relative flex items-center justify-between gap-4 rounded-xl border p-5 transition-colors";

  const content = (
    <div
      className={`${baseClass} ${
        available
          ? isRecommended
            ? "border-[#FF4422] bg-zinc-900/80"
            : "border-zinc-800 bg-zinc-900/70 hover:border-[#FF4422]"
          : "border-zinc-900 bg-zinc-900/40 opacity-60 cursor-not-allowed"
      }`}
    >
      <div className="flex items-center gap-4">
        <div
          className={`w-10 h-10 rounded-full border flex items-center justify-center font-semibold ${
            isRecommended ? "border-[#FF4422] text-[#FF4422]" : "border-zinc-600 text-zinc-300"
          }`}
        >
          {id}
        </div>
        <div>
          <p
            className={`font-medium ${
              isRecommended ? "text-white" : "text-white"
            }`}
          >
            {title}
          </p>
          {track && (
            <div className="mt-1">
              <TrackBadge track={track} isRecommended={isRecommended} />
            </div>
          )}
        </div>
      </div>
      {available && (
        <span
          className={`text-sm shrink-0 ${
            isRecommended ? "text-[#FF4422]" : "text-[#FF4422]"
          }`}
        >
          Открыть →
        </span>
      )}
    </div>
  );

  return available ? (
    <Link href={href}>{content}</Link>
  ) : (
    <div>{content}</div>
  );
}

export default function Block2IndexPage() {
  const [recommendedTrack, setRecommendedTrack] = useState<TrackId | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("block2_track") as TrackId | null;
    if (stored && TRACKS[stored]) setRecommendedTrack(stored);
  }, []);

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
            Агент на работе: первые реальные кейсы
          </h1>
          <p className="text-zinc-400">
            Блок 1 — ты настроил агента. Теперь заставляем его работать на тебя.
            5 уроков с готовыми промптами, кейсами и результатами за 15–30 минут.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 flex flex-col gap-8">
        <QuizBlock onTrackChange={setRecommendedTrack} />

        <div className="flex flex-col gap-4">
          {lessons.map((lesson) => (
            <LessonCard
              key={lesson.id}
              recommendedTrack={recommendedTrack}
              {...lesson}
            />
          ))}
        </div>

        <div className="mt-2">
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
