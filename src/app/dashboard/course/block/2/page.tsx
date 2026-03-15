"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  QuizBlock,
  TrackBadge,
  TRACKS,
  BlockKnowledgeCheck,
  block2KnowledgeQuestions,
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
  {
    id: 6,
    title: "Агент для КП и офферов",
    href: "/dashboard/course/block/2/lesson/6",
    available: true,
    track: "freelancer" as TrackId,
  },
  {
    id: 7,
    title: "Агент-трекер задач",
    href: "/dashboard/course/block/2/lesson/7",
    available: true,
    track: "freelancer" as TrackId,
  },
  {
    id: 8,
    title: "Агент для YouTube",
    href: "/dashboard/course/block/2/lesson/8",
    available: true,
    track: "content" as TrackId,
  },
  {
    id: 9,
    title: "Агент трендов",
    href: "/dashboard/course/block/2/lesson/9",
    available: true,
    track: "content" as TrackId,
  },
  {
    id: 10,
    title: "Чат-бот поддержки клиентов",
    href: "/dashboard/course/block/2/lesson/10",
    available: true,
    track: "business" as TrackId,
  },
  {
    id: 11,
    title: "Агент лидогенерации",
    href: "/dashboard/course/block/2/lesson/11",
    available: true,
    track: "business" as TrackId,
  },
  {
    id: 12,
    title: "Агент-конспектировщик",
    href: "/dashboard/course/block/2/lesson/12",
    available: true,
    track: "student" as TrackId,
  },
  {
    id: 13,
    title: "Агент подготовки к экзамену",
    href: "/dashboard/course/block/2/lesson/13",
    available: true,
    track: "student" as TrackId,
  },
  {
    id: 14,
    title: "Агент мониторинга рынка",
    href: "/dashboard/course/block/2/lesson/14",
    available: true,
    track: "investor" as TrackId,
  },
  {
    id: 15,
    title: "Агент анализа проекта",
    href: "/dashboard/course/block/2/lesson/15",
    available: true,
    track: "investor" as TrackId,
  },
  {
    id: 16,
    title: "Агент описаний товаров",
    href: "/dashboard/course/block/2/lesson/16",
    available: true,
    track: "seller" as TrackId,
  },
  {
    id: 17,
    title: "Агент мониторинга отзывов",
    href: "/dashboard/course/block/2/lesson/17",
    available: true,
    track: "seller" as TrackId,
  },
  {
    id: 18,
    title: "Агент code review",
    href: "/dashboard/course/block/2/lesson/18",
    available: true,
    track: "developer" as TrackId,
  },
  {
    id: 19,
    title: "Агент документации",
    href: "/dashboard/course/block/2/lesson/19",
    available: true,
    track: "developer" as TrackId,
  },
  {
    id: 20,
    title: "Агент аналитики кампаний",
    href: "/dashboard/course/block/2/lesson/20",
    available: true,
    track: "marketer" as TrackId,
  },
  {
    id: 21,
    title: "Агент A/B тестов",
    href: "/dashboard/course/block/2/lesson/21",
    available: true,
    track: "marketer" as TrackId,
  },
  {
    id: 22,
    title: "Агент скрининга резюме",
    href: "/dashboard/course/block/2/lesson/22",
    available: true,
    track: "hr" as TrackId,
  },
  {
    id: 23,
    title: "Агент вакансий",
    href: "/dashboard/course/block/2/lesson/23",
    available: true,
    track: "hr" as TrackId,
  },
  {
    id: 24,
    title: "Агент планировщика дня",
    href: "/dashboard/course/block/2/lesson/24",
    available: true,
    track: "life" as TrackId,
  },
  {
    id: 25,
    title: "Агент личных финансов",
    href: "/dashboard/course/block/2/lesson/25",
    available: true,
    track: "life" as TrackId,
  },
  {
    id: 26,
    title: "Агент путешественника",
    href: "/dashboard/course/block/2/lesson/26",
    available: true,
    track: "life" as TrackId,
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
  const isDimmed = recommendedTrack && track && track !== recommendedTrack;
  const baseClass =
    "relative flex items-center justify-between gap-4 rounded-xl border p-5 transition-colors";

  const content = (
    <div
      className={`${baseClass} ${
        available
          ? isRecommended
            ? "border-[#FF4422] bg-zinc-900/80"
            : isDimmed
              ? "border-zinc-800 bg-zinc-900/70 hover:border-[#FF4422] opacity-40"
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
          ].map((b) => (
            <Link
              key={b.num}
              href={b.href}
              className={`text-xs px-3 py-1 rounded-lg border transition-colors ${
                b.num === 2
                  ? "border-[#FF4422] text-[#FF4422]"
                  : "border-zinc-700 text-zinc-400 hover:text-white hover:border-zinc-500"
              }`}
            >
              Блок {b.num}
            </Link>
          ))}
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 flex flex-col gap-8">
        <div className="mb-2">
          <h2 className="text-xl font-bold text-white mb-2">Выбери свой трек</h2>
          <p className="text-zinc-400 text-sm mb-6">
            Ответь на 2 вопроса — получишь персональный маршрут по блоку
          </p>
          <QuizBlock onTrackChange={setRecommendedTrack} />
          {recommendedTrack && (
            <p className="mt-4 text-zinc-400 text-sm">
              ✅ Твой трек: <span className="text-white font-semibold">{TRACKS[recommendedTrack]?.label}</span> — уроки для тебя подсвечены ниже
            </p>
          )}
        </div>

        <div className="flex flex-col gap-4">
          {lessons.map((lesson) => (
            <LessonCard
              key={lesson.id}
              recommendedTrack={recommendedTrack}
              {...lesson}
            />
          ))}
        </div>

        <div className="mt-12">
          <h2 className="text-xl font-bold text-white mb-4">Проверь знания Block 2</h2>
          <BlockKnowledgeCheck
            blockNum={2}
            questions={block2KnowledgeQuestions}
            nextBlockHref="/dashboard/course/block/3"
            nextBlockLabel="Block 3: Мультиагент"
          />
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
