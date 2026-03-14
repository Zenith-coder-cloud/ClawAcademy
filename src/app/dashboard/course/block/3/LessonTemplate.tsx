"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  BlockCompleteCard,
  Checklist,
  LessonSteps,
  PromptCopyBlock,
  QuizBlock,
  TimerBadge,
  TrackBadge,
  TRACKS,
} from "./components";
import type { TrackId } from "./components";
import { getLessonById, TOTAL_LESSONS } from "./data/lessons";

/* ── sidebar lesson links ───────────────────────────────────── */
const sidebarLinks = [
  { num: 1, title: "Один агент — это потолок" },
  { num: 2, title: "Роли в команде агентов" },
  { num: 3, title: "Выбери свою команду" },
  { num: 4, title: "Делегирование и изоляция" },
  { num: 5, title: "Cron + мультиагент" },
  { num: 6, title: "QA-агент" },
  { num: 7, title: "Zen + Dev + Mark" },
  { num: 8, title: "Фрилансер: 3 агента" },
  { num: 9, title: "Фрилансер: биллинг" },
  { num: 10, title: "Бизнес: CRM + поддержка" },
  { num: 11, title: "Бизнес: воронка" },
  { num: 12, title: "Контент: конвейер" },
  { num: 13, title: "Контент: редактор" },
  { num: 14, title: "Заработок: мониторинг" },
  { num: 15, title: "Заработок: возможности" },
  { num: 16, title: "Токены и watchdog" },
  { num: 17, title: "Ошибки и fallback" },
  { num: 18, title: "Границы агента" },
  { num: 19, title: "Секреты и ключи" },
  { num: 20, title: "Капстоун" },
];

/* ── next-by-track map for lessons 3 and 7 ─────────────────── */
const nextByTrack: Record<string, { href: string; label: string }> = {
  freelancer: { href: "/dashboard/course/block/3/lesson/8", label: "Урок 8: Фрилансер — 3 агента →" },
  business: { href: "/dashboard/course/block/3/lesson/10", label: "Урок 10: Бизнес — CRM + поддержка →" },
  content: { href: "/dashboard/course/block/3/lesson/12", label: "Урок 12: Контент — конвейер →" },
  money: { href: "/dashboard/course/block/3/lesson/14", label: "Урок 14: Заработок — мониторинг →" },
};

/* ── Main LessonTemplate component ──────────────────────────── */
export default function LessonTemplate({ lessonId }: { lessonId: number }) {
  const lesson = getLessonById(lessonId);
  const [selectedTrack, setSelectedTrack] = useState<TrackId | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("block3_track") as TrackId | null;
    if (stored && TRACKS[stored] && stored !== "all") setSelectedTrack(stored);
  }, []);

  if (!lesson) {
    return (
      <main className="min-h-screen bg-[#0D0D0D] text-zinc-200 flex items-center justify-center">
        <p className="text-zinc-500">Урок не найден</p>
      </main>
    );
  }

  const isQuizLesson = lessonId === 3;
  const isLesson7 = lessonId === 7;

  // Determine prev/next hrefs
  const prevHref = lesson.prevLesson
    ? `/dashboard/course/block/3/lesson/${lesson.prevLesson}`
    : "/dashboard/course/block/3";

  let nextHref: string | null = null;
  let nextLabel: string | null = null;

  if (isQuizLesson || isLesson7) {
    // Next depends on track
    if (selectedTrack && nextByTrack[selectedTrack]) {
      nextHref = nextByTrack[selectedTrack].href;
      nextLabel = nextByTrack[selectedTrack].label;
    }
  } else if (lesson.nextLesson) {
    nextHref = `/dashboard/course/block/3/lesson/${lesson.nextLesson}`;
    nextLabel = `Урок ${lesson.nextLesson} →`;
  }

  return (
    <main className="min-h-screen bg-[#0D0D0D] text-zinc-200">
      {/* ── Header ────────────────────────────────────────── */}
      <section className="border-b border-zinc-900">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <p className="text-[#FF4422] text-sm font-semibold mb-2">
            Блок 3 · Урок {lesson.id} из {TOTAL_LESSONS}
          </p>
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <h1 className="text-3xl md:text-4xl font-bold text-white">{lesson.title}</h1>
            <TimerBadge text={lesson.timerText} />
            <TrackBadge track={lesson.track} />
          </div>
          <p className="text-zinc-400 text-lg">{lesson.subtitle}</p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 flex gap-8">
        {/* ── Sidebar ───────────────────────────────────── */}
        <aside className="hidden md:block w-56 shrink-0">
          <div className="sticky top-6 bg-zinc-900 border border-zinc-800 rounded-xl p-4 max-h-[80vh] overflow-y-auto">
            <p className="text-xs text-zinc-500 font-semibold uppercase mb-3">Блок 3</p>
            <nav className="flex flex-col gap-1">
              {sidebarLinks.map((l) => (
                <Link
                  key={l.num}
                  href={`/dashboard/course/block/3/lesson/${l.num}`}
                  className={
                    "flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors " +
                    (lessonId === l.num
                      ? "bg-[#FF4422]/10 text-[#FF4422] font-semibold"
                      : "text-zinc-400 hover:text-white hover:bg-zinc-800")
                  }
                >
                  <span
                    className={
                      "w-5 h-5 rounded-full border flex items-center justify-center text-xs shrink-0 " +
                      (lessonId === l.num ? "border-[#FF4422]" : "border-zinc-600")
                    }
                  >
                    {l.num}
                  </span>
                  <span className="truncate">{l.title}</span>
                </Link>
              ))}
            </nav>
          </div>
        </aside>

        {/* ── Content ───────────────────────────────────── */}
        <div className="flex-1 min-w-0 flex flex-col gap-8">
          {/* Why Needed */}
          <section className="bg-zinc-900 rounded-2xl p-6 md:p-8 border border-zinc-800">
            <h2 className="text-2xl font-semibold text-white mb-4">Зачем это нужно</h2>
            <p className="text-zinc-400 leading-relaxed whitespace-pre-line">{lesson.whyNeeded}</p>
          </section>

          {/* Quiz (lesson 3 only) */}
          {isQuizLesson && (
            <QuizBlock
              onTrackChange={(t) => setSelectedTrack(t)}
            />
          )}

          {/* Case */}
          {!isQuizLesson && (
            <section className="bg-zinc-900 rounded-2xl p-6 md:p-8 border border-zinc-800">
              <h2 className="text-2xl font-semibold text-white mb-4">{lesson.caseTitle}</h2>
              <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-5 text-zinc-300 space-y-2">
                {lesson.caseItems.map((item) => (
                  <p key={item}>{item}</p>
                ))}
              </div>
            </section>
          )}

          {/* Capabilities (optional) */}
          {lesson.capabilities && lesson.capabilities.length > 0 && (
            <section className="bg-zinc-900 rounded-2xl p-6 md:p-8 border border-zinc-800">
              <h2 className="text-2xl font-semibold text-white mb-4">Что ты получишь</h2>
              <div className="grid md:grid-cols-2 gap-3 text-zinc-300">
                {lesson.capabilities.map((item) => (
                  <div
                    key={item}
                    className="bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Info Blocks (optional) */}
          {lesson.infoBlocks && lesson.infoBlocks.length > 0 && (
            <section className="bg-zinc-900 rounded-2xl p-6 md:p-8 border border-zinc-800">
              <h2 className="text-2xl font-semibold text-white mb-4">Как это работает</h2>
              <div className="space-y-4">
                {lesson.infoBlocks.map((block) => (
                  <div
                    key={block.title}
                    className="bg-zinc-950 border border-zinc-800 rounded-xl p-5"
                  >
                    <h3 className="text-white font-semibold mb-2">{block.title}</h3>
                    <p className="text-zinc-400 leading-relaxed whitespace-pre-line">{block.text}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Prompt */}
          {lesson.prompt && (
            <section className="bg-zinc-900 rounded-2xl p-6 md:p-8 border border-zinc-800">
              <h2 className="text-2xl font-semibold text-white mb-4">Готовый промпт</h2>
              <PromptCopyBlock
                instruction={lesson.promptInstruction}
                code={lesson.prompt}
              />
            </section>
          )}

          {/* Steps */}
          <section className="bg-zinc-900 rounded-2xl p-6 md:p-8 border border-zinc-800">
            <h2 className="text-2xl font-semibold text-white mb-4">Пошаговая настройка</h2>
            <LessonSteps steps={lesson.steps} />
          </section>

          {/* Checklist */}
          <section className="bg-zinc-900 rounded-2xl p-6 md:p-8 border border-zinc-800">
            <h2 className="text-2xl font-semibold text-white mb-4">Чеклист</h2>
            <Checklist
              storageKey={`block3_lesson${lesson.id}_checklist`}
              items={lesson.checklist}
            />
          </section>

          {/* Troubleshooting */}
          {lesson.troubleshoot.length > 0 && (
            <section className="bg-zinc-900 rounded-2xl p-6 md:p-8 border border-zinc-800">
              <h2 className="text-2xl font-semibold text-white mb-4">Troubleshooting</h2>
              <div className="space-y-3">
                {lesson.troubleshoot.map((item) => (
                  <div
                    key={item.q}
                    className="bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3"
                  >
                    <p className="text-white font-semibold mb-1">{item.q}</p>
                    <p className="text-zinc-400">{item.a}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* BlockCompleteCard (lesson 20 only) */}
          {lesson.completionTrackLabel && (
            <BlockCompleteCard trackLabel={lesson.completionTrackLabel} />
          )}

          {/* Navigation */}
          <nav className="flex items-center justify-between text-sm text-zinc-400">
            <Link
              href={prevHref}
              className="hover:text-zinc-200 transition-colors"
            >
              ← {lesson.prevLesson ? "Назад" : "К блоку"}
            </Link>
            {nextHref ? (
              <Link
                href={nextHref}
                className="text-[#FF4422] hover:text-[#ff5a3c] transition-colors"
              >
                {nextLabel}
              </Link>
            ) : isQuizLesson || isLesson7 ? (
              <span className="text-zinc-600">Выбери трек →</span>
            ) : lesson.nextLesson === null && !lesson.completionTrackLabel ? (
              <span className="text-zinc-600">Следующий урок →</span>
            ) : null}
          </nav>
        </div>
      </div>
    </main>
  );
}
