"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import {
  BlockCompleteCard,
  Checklist,
  LessonSteps,
  PromptCopyBlock,
  SectionProgressBarB2,
  TimerBadge,
  TrackBadge,
  TrackChoiceCards,
  TRACKS,
  TroubleshootSearch,
} from "./components";
import type { TrackId as ComponentTrackId } from "./components";
import { getLessonById, TOTAL_LESSONS } from "./data/lessons";
import type { AccordionItem } from "./data/lessons";

/* ── sidebar lesson links (lessons 6+ use full list) ────────── */
const shortLinks = [
  { num: 1, title: "Агент-автоответчик", href: "/dashboard/course/block/2/lesson/1" },
  { num: 2, title: "Агент-ресёрчер", href: "/dashboard/course/block/2/lesson/2" },
  { num: 3, title: "Email-агент", href: "/dashboard/course/block/2/lesson/3" },
  { num: 4, title: "Контент-агент", href: "/dashboard/course/block/2/lesson/4" },
  { num: 5, title: "Агент-парсер рынка", href: "/dashboard/course/block/2/lesson/5" },
];

const fullLinks = [
  { num: 1, title: "Агент-автоответчик", href: "/dashboard/course/block/2/lesson/1" },
  { num: 2, title: "Агент-ресёрчер", href: "/dashboard/course/block/2/lesson/2" },
  { num: 3, title: "Email-агент", href: "/dashboard/course/block/2/lesson/3" },
  { num: 4, title: "Контент-агент", href: "/dashboard/course/block/2/lesson/4" },
  { num: 5, title: "Агент-парсер рынка", href: "/dashboard/course/block/2/lesson/5" },
  { num: 6, title: "Агент для КП и офферов", href: "/dashboard/course/block/2/lesson/6" },
  { num: 7, title: "Агент-трекер задач", href: "/dashboard/course/block/2/lesson/7" },
  { num: 8, title: "Агент для YouTube", href: "/dashboard/course/block/2/lesson/8" },
  { num: 9, title: "Агент трендов", href: "/dashboard/course/block/2/lesson/9" },
  { num: 10, title: "Чат-бот поддержки", href: "/dashboard/course/block/2/lesson/10" },
  { num: 11, title: "Агент лидогенерации", href: "/dashboard/course/block/2/lesson/11" },
  { num: 12, title: "Агент-конспектировщик", href: "/dashboard/course/block/2/lesson/12" },
  { num: 13, title: "Агент подготовки к экзамену", href: "/dashboard/course/block/2/lesson/13" },
  { num: 14, title: "Агент мониторинга рынка", href: "/dashboard/course/block/2/lesson/14" },
  { num: 15, title: "Агент анализа проекта", href: "/dashboard/course/block/2/lesson/15" },
  { num: 16, title: "Агент описаний товаров", href: "/dashboard/course/block/2/lesson/16" },
  { num: 17, title: "Агент мониторинга отзывов", href: "/dashboard/course/block/2/lesson/17" },
  { num: 18, title: "Агент code review", href: "/dashboard/course/block/2/lesson/18" },
  { num: 19, title: "Агент документации", href: "/dashboard/course/block/2/lesson/19" },
  { num: 20, title: "Агент аналитики кампаний", href: "/dashboard/course/block/2/lesson/20" },
  { num: 21, title: "Агент A/B тестов", href: "/dashboard/course/block/2/lesson/21" },
  { num: 22, title: "Агент скрининга резюме", href: "/dashboard/course/block/2/lesson/22" },
  { num: 23, title: "Агент вакансий", href: "/dashboard/course/block/2/lesson/23" },
  { num: 24, title: "Агент планировщика дня", href: "/dashboard/course/block/2/lesson/24" },
  { num: 25, title: "Агент личных финансов", href: "/dashboard/course/block/2/lesson/25" },
  { num: 26, title: "Агент путешественника", href: "/dashboard/course/block/2/lesson/26" },
];

/* ── Accordion (reusable) ───────────────────────────────────── */
function Accordion({ items }: { items: AccordionItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  return (
    <div className="space-y-3">
      {items.map((item, idx) => {
        const isOpen = openIndex === idx;
        return (
          <div key={item.title} className="bg-zinc-950 border border-zinc-800 rounded-xl">
            <button
              className="w-full flex items-center justify-between px-5 py-4 text-left"
              onClick={() => setOpenIndex(isOpen ? null : idx)}
            >
              <span className="text-white font-semibold">{item.title}</span>
              <span className="text-zinc-500 text-sm">{isOpen ? "Скрыть" : "Показать"}</span>
            </button>
            {isOpen && (
              <div className="px-5 pb-5 text-zinc-400 leading-relaxed">
                <p className="mb-2">{item.content}</p>
                {item.hint && (
                  <div className="text-zinc-300 bg-zinc-900/60 border border-zinc-800 rounded-lg px-4 py-3">
                    {item.hint}
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

/* ── next-by-track map for lesson 2 ────────────────────────── */
const nextByTrack: Record<string, { href: string; label: string }> = {
  freelancer: { href: "/dashboard/course/block/2/lesson/3", label: "Урок 3: Email-агент →" },
  content: { href: "/dashboard/course/block/2/lesson/4", label: "Урок 4: Контент-агент →" },
  business: { href: "/dashboard/course/block/2/lesson/10", label: "Урок 10: Чат-бот поддержки →" },
  student: { href: "/dashboard/course/block/2/lesson/12", label: "Урок 12: Агент-конспектировщик →" },
  investor: { href: "/dashboard/course/block/2/lesson/14", label: "Урок 14: Агент мониторинга рынка →" },
  seller: { href: "/dashboard/course/block/2/lesson/16", label: "Урок 16: Агент описаний товаров →" },
  developer: { href: "/dashboard/course/block/2/lesson/18", label: "Урок 18: Агент code review →" },
  marketer: { href: "/dashboard/course/block/2/lesson/20", label: "Урок 20: Агент аналитики кампаний →" },
  hr: { href: "/dashboard/course/block/2/lesson/22", label: "Урок 22: Агент скрининга резюме →" },
  life: { href: "/dashboard/course/block/2/lesson/24", label: "Урок 24: Агент планировщика дня →" },
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
export default function LessonTemplate({ lessonId }: { lessonId: number }) {
  const lesson = getLessonById(lessonId);
  const router = useRouter();
  const [recommended, setRecommended] = useState<ComponentTrackId | null>(null);
  const [showCelebration, setShowCelebration] = useState(false);

  const handleNextLesson = useCallback((href: string) => {
    if (lesson) {
      localStorage.setItem(`b2_lesson_${lesson.id}_done`, "1");
    }
    setShowCelebration(true);
    setTimeout(() => {
      setShowCelebration(false);
      router.push(href);
    }, 2000);
  }, [router, lesson]);

  useEffect(() => {
    const stored = localStorage.getItem("block2_track") as ComponentTrackId | null;
    if (stored && TRACKS[stored]) setRecommended(stored);
    if (lesson) {
      localStorage.setItem(`b2_lesson_${lesson.id}_visited`, "1");
    }
  }, [lesson]);

  if (!lesson) {
    return (
      <main className="min-h-screen bg-[#0D0D0D] text-zinc-200 flex items-center justify-center">
        <p className="text-zinc-500">Урок не найден</p>
      </main>
    );
  }

  const lessonLinks = lessonId <= 5 ? shortLinks : fullLinks;
  const isLesson2 = lessonId === 2;

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
                (n === 2
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
            Блок 2 · Урок {lesson.id} из {TOTAL_LESSONS}
          </p>
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <h1 className="text-3xl md:text-4xl font-bold text-white">{lesson.title}</h1>
            <TimerBadge text={lesson.timerText} />
            {lesson.track && (
              <TrackBadge
                track={lesson.track as ComponentTrackId}
                isRecommended={recommended === lesson.track}
              />
            )}
            {lesson.track && (
              <button
                onClick={() => {
                  localStorage.removeItem("block2_track");
                  window.location.href = `/dashboard/course/block/2`;
                }}
                className="text-xs text-zinc-500 hover:text-zinc-300 underline transition-colors ml-2"
              >
                сменить трек
              </button>
            )}
          </div>
          <p className="text-zinc-400 text-lg">{lesson.subtitle}</p>

          {/* Mobile lesson nav */}
          <div className="md:hidden mt-4 flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            <Link href="/dashboard" className="shrink-0 text-xs text-zinc-500 hover:text-white transition-colors mr-1">
              ← Дашборд
            </Link>
            {fullLinks.map((l) => (
              <Link
                key={l.num}
                href={`/dashboard/course/block/2/lesson/${l.num}`}
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
              <Link href="/dashboard/course/block/2/lesson/1" className="text-center text-xs py-1.5 rounded-lg border border-[#FF4422] text-[#FF4422]">
                Б 2
              </Link>
              <Link href="/dashboard/course/block/3/lesson/1" className="text-center text-xs py-1.5 rounded-lg border border-zinc-700 text-zinc-400 hover:text-white hover:border-zinc-500 transition-colors">
                Б 3
              </Link>
              <Link href="/dashboard/course/block/4/lesson/1" className="text-center text-xs py-1.5 rounded-lg border border-zinc-700 text-zinc-400 hover:text-white hover:border-zinc-500 transition-colors">
                Б 4
              </Link>
              <Link href="/dashboard/course/block/5/lesson/1" className="text-center text-xs py-1.5 rounded-lg border border-zinc-700 text-zinc-400 hover:text-white hover:border-zinc-500 transition-colors">
                Б 5
              </Link>
            </div>
            <p className="text-xs text-zinc-500 font-semibold uppercase mb-3">Блок 2</p>
            <nav className="flex flex-col gap-1">
              {lessonLinks.map((l) => (
                <Link
                  key={l.num}
                  href={l.href}
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
                  {l.title}
                </Link>
              ))}
            </nav>
          </div>
        </aside>

        {/* ── Content ───────────────────────────────────── */}
        <div className="flex-1 min-w-0 flex flex-col gap-8">
          {/* Section Progress Bar */}
          <SectionProgressBarB2 currentLesson={lessonId} />

          <img
            src={`/course/block2/lesson${lesson.id}/b2-l${lesson.id}-hero.png`}
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
            <h2 className="text-2xl font-semibold text-white mb-4">Кейс</h2>
            <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-5 text-zinc-300 space-y-2">
              <p className="font-semibold">{lesson.caseTitle}</p>
              {lesson.caseItems.map((item) => (
                <p key={item}>{item}</p>
              ))}
            </div>
          </section>

          {/* Capabilities (optional) */}
          {lesson.capabilities && (
            <section className="bg-zinc-900 rounded-2xl p-6 md:p-8 border border-zinc-800">
              <h2 className="text-2xl font-semibold text-white mb-4">
                {lesson.capabilitiesTitle || "Что умеет агент"}
              </h2>
              {lesson.capabilitiesTitle === "Как это работает" ? (
                <p className="text-zinc-400 leading-relaxed whitespace-pre-line">
                  {lesson.capabilities.join("\n")}
                </p>
              ) : (
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
              )}
            </section>
          )}

          {/* Prompt */}
          <section className="bg-zinc-900 rounded-2xl p-6 md:p-8 border border-zinc-800">
            <h2 className="text-2xl font-semibold text-white mb-4">Готовый промпт</h2>
            <PromptCopyBlock
              instruction={lesson.promptInstruction}
              code={lesson.prompt}
            />
          </section>

          {/* Lesson 2 special: example queries */}
          {isLesson2 && (
            <section className="bg-zinc-900 rounded-2xl p-6 md:p-8 border border-zinc-800">
              <h2 className="text-2xl font-semibold text-white mb-4">Примеры запросов</h2>
              <div className="grid md:grid-cols-3 gap-4">
                {[
                  '🏆 "Исследуй топ-5 конкурентов в нише [ниша]. Что они предлагают, сколько стоит, что пишут клиенты"',
                  '📰 "Найди главные новости про [тема] за последние 7 дней. Выдели самое важное"',
                  '💰 "Сравни [продукт A] и [продукт B]: функции, цены, отзывы, кому подходит"',
                ].map((card) => (
                  <div
                    key={card}
                    className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 text-zinc-300"
                  >
                    {card}
                  </div>
                ))}
              </div>
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
              storageKey={`block2_lesson${lesson.id}_checklist`}
              items={lesson.checklist}
            />
          </section>

          {/* Accordion (optional - "Как улучшить", "Советы по редактуре", etc.) */}
          {lesson.accordionItems && lesson.accordionTitle && (
            <section className="bg-zinc-900 rounded-2xl p-6 md:p-8 border border-zinc-800">
              <h2 className="text-2xl font-semibold text-white mb-4">{lesson.accordionTitle}</h2>
              <Accordion items={lesson.accordionItems} />
            </section>
          )}

          {/* Troubleshooting */}
          {lesson.troubleshoot.length > 0 && (
            <TroubleshootSearch items={lesson.troubleshoot} />
          )}

          {/* BlockCompleteCard (optional) */}
          {lesson.completionTrackLabel && (
            <BlockCompleteCard trackLabel={lesson.completionTrackLabel} />
          )}

          {/* Lesson 2 special: track choice */}
          {isLesson2 && !recommended && (
            <section className="bg-zinc-900 rounded-2xl p-6 md:p-8 border border-zinc-800">
              <h2 className="text-2xl font-semibold text-white mb-4">
                Выбери следующий урок
              </h2>
              <TrackChoiceCards />
            </section>
          )}

          {/* Navigation */}
          <nav className="flex items-center justify-between text-sm text-zinc-400">
            <Link
              href={lesson.prevLesson}
              className="hover:text-zinc-200 transition-colors"
            >
              ← Назад{lesson.prevLesson === "/dashboard/course/block/2" ? " к блоку" : ""}
            </Link>
            {isLesson2 ? (
              recommended && nextByTrack[recommended] ? (
                <button
                  onClick={() => handleNextLesson(nextByTrack[recommended].href)}
                  className="text-[#FF4422] hover:text-[#ff5a3c] transition-colors"
                >
                  {nextByTrack[recommended].label}
                </button>
              ) : (
                <span className="text-zinc-600">Выбери трек ниже →</span>
              )
            ) : lesson.nextLesson ? (
              <button
                onClick={() => handleNextLesson(lesson.nextLesson!)}
                className="text-[#FF4422] hover:text-[#ff5a3c] transition-colors"
              >
                {lesson.nextLessonLabel || "Следующий урок →"}
              </button>
            ) : (
              <span className="text-zinc-600">Следующий урок →</span>
            )}
          </nav>
        </div>
      </div>
    </main>
  );
}
