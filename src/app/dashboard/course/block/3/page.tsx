"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { QuizBlock, TRACKS, type TrackId } from "./components";

function BlockProgress({ blockNum, total }: { blockNum: number; total: number }) {
  const [done, setDone] = useState(0);
  const [lastLesson, setLastLesson] = useState<number | null>(null);

  useEffect(() => {
    let count = 0;
    let last: number | null = null;
    for (let i = 1; i <= total; i++) {
      if (localStorage.getItem(`b${blockNum}_lesson_${i}_done`)) {
        count++;
        last = i;
      }
    }
    setDone(count);
    setLastLesson(last);
  }, [blockNum, total]);

  if (done === 0) return null;

  const pct = Math.round((done / total) * 100);

  return (
    <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl px-5 py-4 mb-6">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-zinc-400">Твой прогресс</span>
        <span className="text-sm font-semibold text-white">{done}/{total} уроков · {pct}%</span>
      </div>
      <div className="w-full bg-zinc-800 rounded-full h-2 mb-3">
        <div
          className="bg-[#FF4422] h-2 rounded-full transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
      {lastLesson && lastLesson < total && (
        <a
          href={`/dashboard/course/block/${blockNum}/lesson/${lastLesson + 1}`}
          className="inline-flex items-center gap-1.5 text-sm text-[#FF4422] hover:text-white transition-colors font-semibold"
        >
          ▶ Продолжить с урока {lastLesson + 1}
        </a>
      )}
      {done === total && (
        <p className="text-sm text-green-400 font-semibold">✅ Блок завершён!</p>
      )}
    </div>
  );
}

const sections = [
  {
    title: "Секция 1: Почему мультиагент",
    lessons: [
      { num: 1, title: "Один агент — это потолок", track: "all" },
      { num: 2, title: "Роли: Orchestrator, Workers, Monitor", track: "all" },
      { num: 3, title: "Квиз: Выбери свою команду", track: "all" },
    ],
  },
  {
    title: "Секция 2: Архитектура команды",
    lessons: [
      { num: 4, title: "Делегирование и изоляция", track: "all" },
      { num: 5, title: "Cron + мультиагент", track: "all" },
      { num: 6, title: "Агент-проверяльщик (QA)", track: "all" },
      { num: 7, title: "Живой пример: Zen + Dev + Mark", track: "all" },
    ],
  },
  {
    title: "Секция 3: Практика по трекам",
    lessons: [
      { num: 8, title: "КП + трекер + коммуникатор", track: "freelancer" },
      { num: 9, title: "Агент-биллинг", track: "freelancer" },
      { num: 10, title: "CRM + поддержка + аналитика", track: "business" },
      { num: 11, title: "Агент-воронка", track: "business" },
      { num: 12, title: "Research → Write → Publish", track: "content" },
      { num: 13, title: "Редактор + дистрибьютор", track: "content" },
      { num: 14, title: "Мониторинг рынков и агент-сигнальщик", track: "freelancer" },
      { num: 15, title: "Агент-планировщик возможностей", track: "freelancer" },
    ],
  },
  {
    title: "Секция 4: Управление и мониторинг",
    lessons: [
      { num: 16, title: "Токены, бюджеты, watchdog", track: "all" },
      { num: 17, title: "Обработка ошибок и fallback", track: "all" },
    ],
  },
  {
    title: "Секция 5: Безопасность и финал",
    lessons: [
      { num: 18, title: "Границы агента", track: "all" },
      { num: 19, title: "Секреты и API ключи", track: "all" },
      { num: 20, title: "Капстоун: запусти свою систему", track: "all" },
    ],
  },
];

const trackColors: Record<string, string> = {
  all: "#71717A",
  freelancer: "#3B82F6",
  business: "#10B981",
  content: "#8B5CF6",
};

const trackLabels: Record<string, string> = {
  all: "🌐 Для всех",
  freelancer: "🧑‍💼",
  business: "🏢",
  content: "📢",
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

export default function Block3Page() {
  const router = useRouter();
  const [visitedLessons, setVisitedLessons] = useState<Set<number>>(new Set());
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("block3_track") as TrackId | null;
    if (stored && TRACKS[stored] && stored !== "all") {
      router.replace("/dashboard/course/block/3/lesson/1");
      return;
    }
    const visited = new Set<number>();
    for (let i = 1; i <= 34; i++) {
      if (localStorage.getItem(`b3_lesson_${i}_visited`)) visited.add(i);
    }
    setVisitedLessons(visited);
    setReady(true);
  }, [router]);

  if (!ready) {
    return (
      <main className="min-h-screen bg-[#0D0D0D] text-zinc-200 flex items-center justify-center">
        <p className="text-zinc-500">Загрузка...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0D0D0D] text-zinc-200">
      {/* Header */}
      <section className="border-b border-zinc-900">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <p className="text-[#FF4422] text-sm font-semibold mb-2">Block 3</p>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
            Мультиагент и автоматизация
          </h1>
          <p className="text-xl md:text-2xl font-bold text-white mb-2">
            «Перестань управлять агентами — пусть они управляют собой»
          </p>
          <p className="text-zinc-400 text-base">
            20 уроков · 4 трека · Выбери свой путь после урока 3 и получи готовую
            схему для своей задачи
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
                b.num === 3
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
        <BlockProgress blockNum={3} total={34} />
        {/* Track picker */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-white mb-2">Выбери свой трек</h2>
          <p className="text-zinc-400 text-sm mb-6">
            Выбери направление — получишь персональный маршрут по блоку
          </p>
          <QuizBlock onTrackChange={(track) => {
            if (track) {
              router.push("/dashboard/course/block/3/lesson/1");
            }
          }} />
        </div>

        {/* CTA */}
        <div className="bg-zinc-900 rounded-2xl p-6 md:p-8 border border-zinc-800 mb-8">
          <Link
            href="/dashboard/course/block/3/lesson/1"
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
              <span className="text-white font-semibold text-sm">Уроки 1–2</span>
              <span className="text-zinc-400 text-xs leading-tight">
                Основы
                <br />
                мультиагента
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
                Урок 3: Квиз
              </span>
              <span className="text-zinc-400 text-xs leading-tight">
                Выбери трек
                <br />
                из 4 вариантов
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
              <span className="text-white font-semibold text-sm">Уроки 4–20</span>
              <span className="text-zinc-400 text-xs leading-tight">
                Практика
                <br />
                по своей задаче
              </span>
            </div>
          </div>
        </div>

        {/* Prerequisites */}
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 mb-4">
          <h3 className="text-white font-bold text-lg mb-3">📋 Что нужно знать перед этим блоком</h3>
          <ul className="space-y-2 text-zinc-400 text-sm">
            <li className="flex gap-2"><span className="text-[#FF4422]">✓</span>Прошёл Block 2 — умеешь запускать агентов для реальных задач</li>
            <li className="flex gap-2"><span className="text-[#FF4422]">✓</span>Понимаешь что такое промпт и как агент получает задачу</li>
            <li className="flex gap-2"><span className="text-[#FF4422]">✓</span>Есть хотя бы один работающий агент в своём треке</li>
          </ul>
          <p className="text-zinc-500 text-xs mt-3">Если чего-то нет — <a href="/dashboard/course/block/2" className="text-[#FF4422] hover:underline">вернись в Block 2</a></p>
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
                  const isQuiz = lesson.num === 3;
                  return (
                    <Link
                      key={lesson.num}
                      href={`/dashboard/course/block/3/lesson/${lesson.num}`}
                      className={`relative flex items-center gap-3 rounded-lg px-4 py-3 transition-colors group ${
                        isQuiz
                          ? "bg-[#FF4422]/5 border border-[#FF4422]/50 hover:border-[#FF4422]"
                          : "bg-zinc-950 border border-zinc-800 hover:border-[#FF4422]"
                      }`}
                    >
                      <span
                        className="w-6 h-6 rounded-full border flex items-center justify-center text-xs shrink-0"
                        style={{
                          borderColor: isQuiz
                            ? "#FF4422"
                            : trackColors[lesson.track],
                          color: isQuiz
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
                        {isQuiz && (
                          <p className="text-xs text-zinc-500 mt-0.5">
                            Определяет твой персональный путь в блоке
                          </p>
                        )}
                      </div>
                      {isQuiz && (
                        <span className="absolute top-2 right-3 text-xs font-semibold text-[#FF4422]">
                          ⭐ Ключевой урок
                        </span>
                      )}
                      {!isQuiz && <TrackBadge track={lesson.track} />}
                      <span className="text-xs text-[#FF4422] shrink-0">
                        {visitedLessons.has(lesson.num) ? "Продолжить →" : "Начать →"}
                      </span>
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
