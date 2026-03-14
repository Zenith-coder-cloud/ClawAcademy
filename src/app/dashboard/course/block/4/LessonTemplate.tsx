"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  BlockCompleteCard,
  Checklist,
  ClawHubCardPreview,
  ComparisonTable,
  LessonSteps,
  type PathId,
  PromptCopyBlock,
  RevenueCalculator,
  SectionProgressBar,
  TimerBadge,
  TrackBadge,
} from "./components";
import { getLessonById, TOTAL_LESSONS } from "./data/lessons";

/* ── sidebar lesson links ───────────────────────────────────── */
const sidebarLinks = [
  { num: 1, title: "Твоя система стала продуктом", pathTag: null },
  { num: 2, title: "Выбери свой путь", pathTag: null },
  { num: 3, title: "Агент-сотрудник", pathTag: "employee" as const },
  { num: 4, title: "White-label", pathTag: "employee" as const },
  { num: 5, title: "SLA без страха", pathTag: "employee" as const },
  { num: 6, title: "Продакшн", pathTag: "employee" as const },
  { num: 7, title: "ClawHub маркетплейс", pathTag: "clawhub" as const },
  { num: 8, title: "Упаковка агента", pathTag: "clawhub" as const },
  { num: 9, title: "Первая продажа", pathTag: "clawhub" as const },
  { num: 10, title: "Multi-tenant", pathTag: "saas" as const },
  { num: 11, title: "Биллинг", pathTag: "saas" as const },
  { num: 12, title: "Капстоун", pathTag: null },
];

/* ── Main LessonTemplate component ──────────────────────────── */
export default function LessonTemplate({ lessonId }: { lessonId: number }) {
  const lesson = getLessonById(lessonId);
  const [selectedPath, setSelectedPath] = useState<PathId | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("b4_path") as PathId | null;
    if (stored && ["employee", "clawhub", "saas"].includes(stored)) {
      setSelectedPath(stored);
    }
  }, []);

  if (!lesson) {
    return (
      <main className="min-h-screen bg-[#0D0D0D] text-zinc-200 flex items-center justify-center">
        <p className="text-zinc-500">Урок не найден</p>
      </main>
    );
  }

  const prevHref = lesson.prevLesson
    ? `/dashboard/course/block/4/lesson/${lesson.prevLesson}`
    : "/dashboard/course/block/4";

  const nextHref = lesson.nextLesson
    ? `/dashboard/course/block/4/lesson/${lesson.nextLesson}`
    : null;
  const nextLabel = lesson.nextLesson ? `Урок ${lesson.nextLesson} →` : null;

  const isLesson2 = lessonId === 2;
  const isLesson8 = lessonId === 8;

  return (
    <main className="min-h-screen bg-[#0D0D0D] text-zinc-200">
      {/* ── Header ────────────────────────────────────────── */}
      <section className="border-b border-zinc-900">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <p className="text-[#FF4422] text-sm font-semibold mb-2">
            Блок 4 · Урок {lesson.id} из {TOTAL_LESSONS}
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
            <Link href="/dashboard" className="flex items-center gap-1.5 text-xs text-zinc-500 hover:text-white transition-colors mb-3">
              ← Дашборд
            </Link>
            <div className="flex gap-1 mb-3">
              <Link href="/dashboard/course/block/1/lesson/1" className="flex-1 text-center text-xs py-1 rounded-lg border border-zinc-700 text-zinc-400 hover:text-white hover:border-zinc-500 transition-colors">
                Блок 1
              </Link>
              <Link href="/dashboard/course/block/2/lesson/1" className="flex-1 text-center text-xs py-1 rounded-lg border border-zinc-700 text-zinc-400 hover:text-white hover:border-zinc-500 transition-colors">
                Блок 2
              </Link>
              <Link href="/dashboard/course/block/3/lesson/1" className="flex-1 text-center text-xs py-1 rounded-lg border border-zinc-700 text-zinc-400 hover:text-white hover:border-zinc-500 transition-colors">
                Блок 3
              </Link>
              <Link href="/dashboard/course/block/4/lesson/1" className="flex-1 text-center text-xs py-1 rounded-lg border-[#FF4422] text-[#FF4422]">
                Блок 4
              </Link>
            </div>
            <p className="text-xs text-zinc-500 font-semibold uppercase mb-3">Блок 4</p>
            <nav className="flex flex-col gap-1">
              {sidebarLinks.map((l) => {
                const dimmed =
                  selectedPath &&
                  l.pathTag &&
                  l.pathTag !== selectedPath;

                return (
                  <Link
                    key={l.num}
                    href={`/dashboard/course/block/4/lesson/${l.num}`}
                    className={
                      "flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors " +
                      (lessonId === l.num
                        ? "bg-[#FF4422]/10 text-[#FF4422] font-semibold"
                        : dimmed
                          ? "text-zinc-600 hover:text-zinc-400 hover:bg-zinc-800 opacity-60"
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
                );
              })}
            </nav>
          </div>
        </aside>

        {/* ── Content ───────────────────────────────────── */}
        <div className="flex-1 min-w-0 flex flex-col gap-8">
          {/* Section Progress Bar */}
          <SectionProgressBar currentLesson={lessonId} />

          {/* Hero Image */}
          <img
            src={`/course/block4/lesson${lesson.id}/b4-l${lesson.id}-hero.png`}
            alt={lesson.title}
            className="w-full rounded-2xl object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
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

          {/* Revenue Calculator (lesson 2 only) */}
          {isLesson2 && (
            <section className="bg-zinc-900 rounded-2xl p-6 md:p-8 border border-zinc-800">
              <h2 className="text-2xl font-semibold text-white mb-4">Калькулятор дохода</h2>
              <RevenueCalculator />
            </section>
          )}

          {/* Comparison Table (lesson 2 only) */}
          {isLesson2 && (
            <section className="bg-zinc-900 rounded-2xl p-6 md:p-8 border border-zinc-800">
              <h2 className="text-2xl font-semibold text-white mb-4">Сравнение путей</h2>
              <ComparisonTable
                headers={["", "Виртуальный сотрудник", "ClawHub", "SaaS"]}
                rows={[
                  ["Сложность старта", "Средняя", "Низкая", "Высокая"],
                  ["Первый доход", "1–2 недели", "1–7 дней", "1–3 месяца"],
                  ["Доход/мес потолок", "$500–3000", "$200–2000", "$1000–∞"],
                  ["Общение с клиентами", "Да", "Нет", "Мало"],
                  ["Время на поддержку", "2–5 ч/нед", "0–1 ч/нед", "5–15 ч/нед"],
                ]}
              />
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

          {/* ClawHub Card Preview (lesson 8 only) */}
          {isLesson8 && (
            <section className="bg-zinc-900 rounded-2xl p-6 md:p-8 border border-zinc-800">
              <h2 className="text-2xl font-semibold text-white mb-4">Превью карточки агента</h2>
              <ClawHubCardPreview />
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
              storageKey={`block4_lesson${lesson.id}_checklist`}
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

          {/* BlockCompleteCard (lesson 12 only) */}
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
            ) : lesson.nextLesson === null && !lesson.completionTrackLabel ? (
              <span className="text-zinc-600">Следующий урок →</span>
            ) : null}
          </nav>
        </div>
      </div>
    </main>
  );
}
