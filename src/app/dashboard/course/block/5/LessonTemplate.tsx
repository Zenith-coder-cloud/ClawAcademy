"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import {
  BlockCompleteCard,
  Checklist,
  LessonSteps,
  PromptCopyBlock,
  SectionProgressBarB5,
  TimerBadge,
  TrackBadge,
  TRACKS,
} from "./components";
import type { TrackId } from "./components";
import { getLessonById, TOTAL_LESSONS } from "./data/lessons";

/* ── sidebar lesson links ───────────────────────────────────── */
const sidebarLinks = [
  { num: 1, title: "От дохода к системе" },
  { num: 2, title: "Первый помощник" },
  { num: 3, title: "Машина лидогенерации" },
  { num: 4, title: "Личный бренд" },
  { num: 5, title: "Фрилансер: ретейнеры" },
  { num: 6, title: "Фрилансер: партнёрства" },
  { num: 7, title: "Бизнес: агентство" },
  { num: 8, title: "Бизнес: операционка" },
  { num: 9, title: "Контент: медиа-империя" },
  { num: 10, title: "Контент: монетизация" },
  { num: 11, title: "Студент: стартап" },
  { num: 12, title: "Студент: инвестиции" },
  { num: 13, title: "Инвестор: фонд" },
  { num: 14, title: "Инвестор: масштаб" },
  { num: 15, title: "Продавец: агентство" },
  { num: 16, title: "Продавец: свой бренд" },
  { num: 17, title: "Разработчик: SaaS" },
  { num: 18, title: "Разработчик: enterprise" },
  { num: 19, title: "Маркетолог: performance" },
  { num: 20, title: "Маркетолог: консалтинг" },
  { num: 21, title: "HR: агентство" },
  { num: 22, title: "HR: аутсорсинг" },
  { num: 23, title: "Жизнь: сообщество" },
  { num: 24, title: "Жизнь: коучинг" },
  { num: 25, title: "Финмодель" },
  { num: 26, title: "Капстоун" },
];

/* ── next-by-track map for lesson 4 ─────────────────────────── */
const nextByTrack: Record<string, { href: string; label: string }> = {
  freelancer: { href: "/dashboard/course/block/5/lesson/5", label: "Урок 5: Фрилансер →" },
  business: { href: "/dashboard/course/block/5/lesson/7", label: "Урок 7: Бизнес →" },
  content: { href: "/dashboard/course/block/5/lesson/9", label: "Урок 9: Контент →" },
  student: { href: "/dashboard/course/block/5/lesson/11", label: "Урок 11: Студент →" },
  investor: { href: "/dashboard/course/block/5/lesson/13", label: "Урок 13: Инвестор →" },
  seller: { href: "/dashboard/course/block/5/lesson/15", label: "Урок 15: Продавец →" },
  developer: { href: "/dashboard/course/block/5/lesson/17", label: "Урок 17: Разработчик →" },
  marketer: { href: "/dashboard/course/block/5/lesson/19", label: "Урок 19: Маркетолог →" },
  hr: { href: "/dashboard/course/block/5/lesson/21", label: "Урок 21: HR →" },
  life: { href: "/dashboard/course/block/5/lesson/23", label: "Урок 23: Для жизни →" },
};

/* ── Celebration overlay ────────────────────────────────────── */
function LessonCelebration({ lessonNum, total }: { lessonNum: number; total: number }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
      <div className="bg-zinc-900/95 border border-[#FF4422]/30 rounded-2xl px-8 py-6 flex flex-col items-center gap-3 animate-scale-in shadow-2xl">
        <span className="text-4xl">🎉</span>
        <p className="text-white font-bold text-xl">Урок {lessonNum} завершён!</p>
        <div className="w-48 bg-zinc-800 rounded-full h-2">
          <div
            className="bg-[#FF4422] h-2 rounded-full transition-all duration-700"
            style={{ width: `${Math.round((lessonNum / total) * 100)}%` }}
          />
        </div>
        <p className="text-zinc-400 text-sm">{lessonNum} из {total} уроков блока</p>
      </div>
    </div>
  );
}

/* ── Main LessonTemplate component ──────────────────────────── */
function TroubleshootSection({ items }: { items: { q: string; a: string }[] }) {
  const [query, setQuery] = useState("");
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const filtered = query.trim()
    ? items.filter(
        (i) =>
          i.q.toLowerCase().includes(query.toLowerCase()) ||
          i.a.toLowerCase().includes(query.toLowerCase())
      )
    : items;

  return (
    <section className="bg-zinc-900 rounded-2xl border border-zinc-800 overflow-hidden">
      <div className="px-6 pt-5 pb-4 border-b border-zinc-800">
        <h2 className="text-lg font-semibold text-white mb-3">🔧 Проблемы и решения</h2>
        <div className="relative">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Найти проблему..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-zinc-800 border border-zinc-700 rounded-lg pl-9 pr-4 py-2 text-sm text-zinc-200 placeholder:text-zinc-500 focus:outline-none focus:border-zinc-500"
          />
        </div>
      </div>
      <div className="overflow-y-auto max-h-72 divide-y divide-zinc-800/60">
        {filtered.length === 0 ? (
          <p className="text-zinc-500 text-sm text-center py-6">Ничего не найдено</p>
        ) : (
          filtered.map((item, idx) => (
            <div key={idx} className="px-6 py-3">
              <button
                onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                className="w-full flex items-center justify-between text-left gap-3"
              >
                <span className="text-sm font-medium text-white">{item.q}</span>
                <span className="text-xs text-zinc-500 shrink-0">
                  {openIdx === idx ? "Скрыть" : "Показать"}
                </span>
              </button>
              {openIdx === idx && (
                <p className="mt-2 text-sm text-zinc-400 leading-relaxed">{item.a}</p>
              )}
            </div>
          ))
        )}
      </div>
    </section>
  );
}

export default function LessonTemplate({ lessonId }: { lessonId: number }) {
  const lesson = getLessonById(lessonId);
  const router = useRouter();
  const [selectedTrack, setSelectedTrack] = useState<TrackId | null>(null);
  const [showCelebration, setShowCelebration] = useState(false);

  const handleNextLesson = useCallback((href: string) => {
    if (lesson) {
      localStorage.setItem(`b5_lesson_${lesson.id}_done`, "1");
    }
    setShowCelebration(true);
    setTimeout(() => {
      setShowCelebration(false);
      router.push(href);
    }, 2000);
  }, [router, lesson]);

  useEffect(() => {
    const stored = localStorage.getItem("block5_track") as TrackId | null;
    if (stored && TRACKS[stored] && stored !== "all") setSelectedTrack(stored);
    if (lesson) {
      localStorage.setItem(`b5_lesson_${lesson.id}_visited`, "1");
    }
  }, [lesson]);

  if (!lesson) {
    return (
      <main className="min-h-screen bg-[#0D0D0D] text-zinc-200 flex items-center justify-center">
        <p className="text-zinc-500">Урок не найден</p>
      </main>
    );
  }

  const isLesson4 = lessonId === 4;

  // Determine prev/next hrefs
  const prevHref = lesson.prevLesson
    ? `/dashboard/course/block/5/lesson/${lesson.prevLesson}`
    : "/dashboard/course/block/5";

  let nextHref: string | null = null;
  let nextLabel: string | null = null;

  if (isLesson4) {
    // Next depends on track
    if (selectedTrack && nextByTrack[selectedTrack]) {
      nextHref = nextByTrack[selectedTrack].href;
      nextLabel = nextByTrack[selectedTrack].label;
    }
  } else if (lesson.nextLesson) {
    nextHref = `/dashboard/course/block/5/lesson/${lesson.nextLesson}`;
    nextLabel = `Урок ${lesson.nextLesson} →`;
  }

  return (
    <main className="min-h-screen bg-[#0D0D0D] text-zinc-200">
      {showCelebration && <LessonCelebration lessonNum={lesson.id} total={TOTAL_LESSONS} />}
      {/* ── Block Nav Bar ──────────────────────────────────── */}
      <nav className="bg-zinc-950 border-b border-zinc-900 py-2 px-4">
        <div className="max-w-5xl mx-auto flex items-center gap-4 overflow-x-auto scrollbar-none text-sm">
          <Link href="/dashboard" className="text-zinc-400 hover:text-white transition-colors shrink-0">← Дашборд</Link>
          <span className="text-zinc-700">|</span>
          {[0, 1, 2, 3, 4, 5].map((n) => (
            <Link
              key={n}
              href={n === 0 ? "/dashboard/course/block/0/lesson/1" : `/dashboard/course/block/${n}`}
              className={
                "shrink-0 px-2 py-1 transition-colors " +
                (n === 5
                  ? "text-[#FF4422] border-b-2 border-[#FF4422]"
                  : "text-zinc-400 hover:text-white")
              }
            >
              Блок {n}
            </Link>
          ))}
        </div>
      </nav>

      {/* ── Header ────────────────────────────────────────── */}
      <section className="border-b border-zinc-900">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <p className="text-[#FF4422] text-sm font-semibold mb-2">
            Блок 5 · Урок {lesson.id} из {TOTAL_LESSONS}
          </p>
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <h1 className="text-3xl md:text-4xl font-bold text-white">{lesson.title}</h1>
            <TimerBadge text={lesson.timerText} />
            <TrackBadge track={lesson.track} />
            <button
              onClick={() => {
                localStorage.removeItem("block5_track");
                window.location.href = `/dashboard/course/block/5`;
              }}
              className="text-xs text-zinc-500 hover:text-zinc-300 underline transition-colors ml-2"
            >
              сменить трек
            </button>
          </div>
          <p className="text-zinc-400 text-lg">{lesson.subtitle}</p>

          {/* Mobile lesson nav */}
          <div className="md:hidden mt-4 flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            <Link href="/dashboard" className="shrink-0 text-xs text-zinc-500 hover:text-white transition-colors mr-1">
              ← Дашборд
            </Link>
            {sidebarLinks.map((l) => (
              <Link
                key={l.num}
                href={`/dashboard/course/block/5/lesson/${l.num}`}
                className={
                  "shrink-0 text-xs px-2.5 py-1 rounded-lg border transition-colors " +
                  (lessonId === l.num
                    ? "border-[#FF4422] text-[#FF4422] bg-[#FF4422]/10"
                    : "border-zinc-700 text-zinc-400 hover:text-white hover:border-zinc-500")
                }
              >
                {l.num}
              </Link>
            ))}
          </div>
        </div>
        {/* Progress bar */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="w-full bg-zinc-800 h-1 rounded-full mt-2">
            <div
              className="bg-[#FF4422] h-1 rounded-full transition-all"
              style={{ width: `${Math.round((lesson.id / TOTAL_LESSONS) * 100)}%` }}
            />
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 flex gap-8">
        {/* ── Sidebar ───────────────────────────────────── */}
        <aside className="hidden md:block w-56 shrink-0">
          <div className="sticky top-6 bg-zinc-900 border border-zinc-800 rounded-xl p-4 max-h-[80vh] overflow-y-auto">
            <Link href="/dashboard" className="flex items-center gap-1.5 text-xs text-zinc-500 hover:text-white transition-colors mb-3">
              ← Дашборд
            </Link>
            <div className="grid grid-cols-3 gap-1 mb-3">
              <Link href="/dashboard/course/block/0/lesson/1" className="text-center text-xs py-1.5 rounded-lg border border-zinc-700 text-zinc-400 hover:text-white hover:border-zinc-500 transition-colors">
                Б 0
              </Link>
              <Link href="/dashboard/course/block/1/lesson/1" className="text-center text-xs py-1.5 rounded-lg border border-zinc-700 text-zinc-400 hover:text-white hover:border-zinc-500 transition-colors">
                Б 1
              </Link>
              <Link href="/dashboard/course/block/2/lesson/1" className="text-center text-xs py-1.5 rounded-lg border border-zinc-700 text-zinc-400 hover:text-white hover:border-zinc-500 transition-colors">
                Б 2
              </Link>
              <Link href="/dashboard/course/block/3/lesson/1" className="text-center text-xs py-1.5 rounded-lg border border-zinc-700 text-zinc-400 hover:text-white hover:border-zinc-500 transition-colors">
                Б 3
              </Link>
              <Link href="/dashboard/course/block/4/lesson/1" className="text-center text-xs py-1.5 rounded-lg border border-zinc-700 text-zinc-400 hover:text-white hover:border-zinc-500 transition-colors">
                Б 4
              </Link>
              <Link href="/dashboard/course/block/5/lesson/1" className="text-center text-xs py-1.5 rounded-lg border border-[#FF4422] text-[#FF4422]">
                Б 5
              </Link>
            </div>
            <p className="text-xs text-zinc-500 font-semibold uppercase mb-3">Блок 5</p>
            <nav className="flex flex-col gap-1">
              {sidebarLinks.map((l) => (
                <Link
                  key={l.num}
                  href={`/dashboard/course/block/5/lesson/${l.num}`}
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
          {/* Section Progress Bar */}
          <SectionProgressBarB5 currentLesson={lessonId} />

          {/* Hero Image */}
          <img
            src={`/course/block5/lesson${lesson.id}/b5-l${lesson.id}-hero.png`}
            alt={lesson.title}
            className="w-full rounded-2xl object-cover"
          />

          {/* Why Needed */}
          <section className="bg-zinc-900 rounded-2xl p-6 md:p-8 border border-zinc-800">
            <h2 className="text-2xl font-semibold text-white mb-4">Зачем это нужно</h2>
            <p className="text-zinc-400 leading-relaxed whitespace-pre-line">{lesson.whyNeeded}</p>
          </section>

          {/* Case */}
          <section className="bg-zinc-900 rounded-2xl p-6 md:p-8 border border-zinc-800">
            <h2 className="text-2xl font-semibold text-white mb-4">{lesson.caseTitle}</h2>
            <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-5 text-zinc-300 space-y-2">
              {lesson.caseItems.map((item) => (
                <p key={item}>{item}</p>
              ))}
            </div>
          </section>

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
                example={lesson.promptExample}
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
              storageKey={`block5_lesson${lesson.id}_checklist`}
              items={lesson.checklist}
            />
          </section>

          {/* Troubleshooting */}
          {lesson.troubleshoot.length > 0 && (
            <TroubleshootSection items={lesson.troubleshoot} />
          )}

          {/* BlockCompleteCard (lesson 26 only) */}
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
            {isLesson4 && selectedTrack && nextByTrack[selectedTrack] ? (
              <button
                onClick={() => handleNextLesson(nextByTrack[selectedTrack!].href)}
                className="text-[#FF4422] hover:text-[#ff5a3c] transition-colors"
              >
                {nextByTrack[selectedTrack].label}
              </button>
            ) : isLesson4 ? (
              <span className="text-zinc-600">Выбери трек →</span>
            ) : nextHref ? (
              <button
                onClick={() => handleNextLesson(nextHref!)}
                className="text-[#FF4422] hover:text-[#ff5a3c] transition-colors"
              >
                {nextLabel}
              </button>
            ) : lesson.nextLesson === null && !lesson.completionTrackLabel ? (
              <span className="text-zinc-600">Следующий урок →</span>
            ) : null}
          </nav>
        </div>
      </div>
    </main>
  );
}
