"use client";

import Link from "next/link";
import { useState } from "react";

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
      { num: 14, title: "Мониторинг рынков и агент-сигнальщик", track: "money" },
      { num: 15, title: "Агент-планировщик возможностей", track: "money" },
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
  all: "#FF4422",
  freelancer: "#3B82F6",
  business: "#10B981",
  content: "#8B5CF6",
  money: "#F59E0B",
};

const trackLabels: Record<string, string> = {
  all: "Все",
  freelancer: "🧑‍💼",
  business: "🏢",
  content: "📢",
  money: "💰",
};

export default function Block3Page() {
  const [openSection, setOpenSection] = useState<number>(0);

  return (
    <main className="min-h-screen bg-[#0D0D0D] text-zinc-200">
      {/* Header */}
      <section className="border-b border-zinc-900">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <p className="text-[#FF4422] text-sm font-semibold mb-2">Block 3</p>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
            Мультиагент и автоматизация
          </h1>
          <p className="text-zinc-400 text-lg">
            Перестань управлять агентами — пусть они управляют собой
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
        {/* Description */}
        <div className="bg-zinc-900 rounded-2xl p-6 md:p-8 border border-zinc-800 mb-8">
          <p className="text-zinc-400 leading-relaxed">
            20 уроков · 4 трека · От теории мультиагентных систем до запуска
            собственной автономной команды агентов. Выбери свой трек после урока 3
            и получи практические схемы для своей задачи.
          </p>
          <Link
            href="/dashboard/course/block/3/lesson/1"
            className="inline-flex items-center mt-6 px-6 py-3 rounded-xl bg-[#FF4422] text-white font-semibold hover:bg-[#e63d1e] transition-colors"
          >
            Начать с урока 1 →
          </Link>
        </div>

        {/* Sections accordion */}
        <div className="space-y-4">
          {sections.map((section, idx) => {
            const isOpen = openSection === idx;
            return (
              <div
                key={section.title}
                className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden"
              >
                <button
                  className="w-full flex items-center justify-between px-6 py-4 text-left"
                  onClick={() => setOpenSection(isOpen ? -1 : idx)}
                >
                  <span className="text-white font-semibold">{section.title}</span>
                  <span className="text-zinc-500 text-sm">
                    {section.lessons.length} уроков · {isOpen ? "Скрыть" : "Показать"}
                  </span>
                </button>
                {isOpen && (
                  <div className="px-6 pb-5 space-y-2">
                    {section.lessons.map((lesson) => (
                      <Link
                        key={lesson.num}
                        href={`/dashboard/course/block/3/lesson/${lesson.num}`}
                        className="flex items-center gap-3 bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-3 hover:border-[#FF4422] transition-colors group"
                      >
                        <span
                          className="w-6 h-6 rounded-full border flex items-center justify-center text-xs shrink-0"
                          style={{
                            borderColor: trackColors[lesson.track],
                            color: trackColors[lesson.track],
                          }}
                        >
                          {lesson.num}
                        </span>
                        <span className="text-zinc-300 group-hover:text-white flex-1">
                          {lesson.title}
                        </span>
                        <span className="text-xs text-zinc-500">
                          {trackLabels[lesson.track]}
                        </span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
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
