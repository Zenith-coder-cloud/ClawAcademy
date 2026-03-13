"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  BlockCompleteCard,
  Checklist,
  ImagePlaceholder,
  LessonSteps,
  PromptCopyBlock,
  TimerBadge,
  TrackBadge,
  TRACKS,
  type TrackId,
} from "../../components";

const lessonLinks = [
  { num: 1, title: "Агент-автоответчик", href: "/dashboard/course/block/2/lesson/1" },
  { num: 2, title: "Агент-ресёрчер", href: "/dashboard/course/block/2/lesson/2" },
  { num: 3, title: "Email-агент", href: "/dashboard/course/block/2/lesson/3" },
  { num: 4, title: "Контент-агент", href: "/dashboard/course/block/2/lesson/4" },
  { num: 5, title: "Агент-парсер рынка", href: "/dashboard/course/block/2/lesson/5" },
  { num: 6, title: "Агент для КП и офферов", href: "/dashboard/course/block/2/lesson/6" },
  { num: 7, title: "Агент-трекер задач", href: "/dashboard/course/block/2/lesson/7" },
  { num: 8, title: "Агент для YouTube", href: "/dashboard/course/block/2/lesson/8" },
  { num: 9, title: "Агент трендов", href: "/dashboard/course/block/2/lesson/9" },
  { num: 10, title: "Чат-бот поддержки клиентов", href: "/dashboard/course/block/2/lesson/10" },
  { num: 11, title: "Агент лидогенерации", href: "/dashboard/course/block/2/lesson/11" },
  { num: 12, title: "Агент-конспектировщик", href: "/dashboard/course/block/2/lesson/12" },
  { num: 13, title: "Агент подготовки к экзамену", href: "/dashboard/course/block/2/lesson/13" },
  { num: 14, title: "Агент мониторинга рынка", href: "/dashboard/course/block/2/lesson/14" },
  { num: 15, title: "Агент анализа проекта", href: "/dashboard/course/block/2/lesson/15" },
  { num: 16, title: "Агент описаний товаров", href: "/dashboard/course/block/2/lesson/16" },
  { num: 17, title: "Агент мониторинга отзывов", href: "/dashboard/course/block/2/lesson/17" },
];

export default function Block2Lesson13Page() {
  const [recommended, setRecommended] = useState<TrackId | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("block2_track") as TrackId | null;
    if (stored && TRACKS[stored]) setRecommended(stored);
  }, []);

  return (
    <main className="min-h-screen bg-[#0D0D0D] text-zinc-200">
      <section className="border-b border-zinc-900">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <p className="text-[#FF4422] text-sm font-semibold mb-2">
            Блок 2 · Урок 13 из 17
          </p>
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <h1 className="text-3xl md:text-4xl font-bold text-white">
              Агент подготовки к экзамену
            </h1>
            <TimerBadge text="⏱ 20 минут" />
            <TrackBadge track="student" isRecommended={recommended === "student"} />
          </div>
          <p className="text-zinc-400 text-lg">
            Персональный репетитор который знает твои пробелы
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 flex gap-8">
        <aside className="hidden md:block w-56 shrink-0">
          <div className="sticky top-6 bg-zinc-900 border border-zinc-800 rounded-xl p-4">
            <p className="text-xs text-zinc-500 font-semibold uppercase mb-3">
              Блок 2
            </p>
            <nav className="flex flex-col gap-1">
              {lessonLinks.map((l) => (
                <Link
                  key={l.num}
                  href={l.href}
                  className={
                    "flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors " +
                    (13 === l.num
                      ? "bg-[#FF4422]/10 text-[#FF4422] font-semibold"
                      : "text-zinc-400 hover:text-white hover:bg-zinc-800")
                  }
                >
                  <span
                    className={
                      "w-5 h-5 rounded-full border flex items-center justify-center text-xs shrink-0 " +
                      (13 === l.num ? "border-[#FF4422]" : "border-zinc-600")
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

        <div className="flex-1 min-w-0 flex flex-col gap-8">
          <ImagePlaceholder label="Заглушка изображения урока 13" />

          <section className="bg-zinc-900 rounded-2xl p-6 md:p-8 border border-zinc-800">
            <h2 className="text-2xl font-semibold text-white mb-4">Зачем это нужно</h2>
            <p className="text-zinc-400 leading-relaxed">
              Прочитал учебник — не знаешь что реально спросят. Решаешь тесты — не понимаешь почему ошибся.<br />
              <br />
              Агент-репетитор генерирует вопросы именно по твоей теме, объясняет ошибки, адаптирует сложность и фокусируется на твоих слабых местах.
            </p>
          </section>

          <section className="bg-zinc-900 rounded-2xl p-6 md:p-8 border border-zinc-800">
            <h2 className="text-2xl font-semibold text-white mb-4">Кейс</h2>
            <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-5 text-zinc-300 space-y-2">
                          <p className="font-semibold">📦 Кейс: Абитуриентка Лера, сдаёт ЕГЭ по химии</p>
                          <p>Ситуация: слабые места в органической химии, не понимала что именно учить</p>
                          <p>До: зубрила всё подряд — неэффективно</p>
                          <p>После: агент выявил 3 темы где больше всего ошибок и сфокусировался на них</p>
                          <p>Результат ЕГЭ: 89 баллов (было 72 на пробном)</p>
                          <p>Время настройки: 16 минут ✅</p>
            </div>
          </section>

          <section className="bg-zinc-900 rounded-2xl p-6 md:p-8 border border-zinc-800">
            <h2 className="text-2xl font-semibold text-white mb-4">Готовый промпт</h2>
            <PromptCopyBlock
              code={`Ты — мой персональный репетитор и тренер для подготовки к экзаменам.

Предмет/экзамен: [замени — ЕГЭ по математике, Экзамен по гражданскому праву, IELTS и т.д.]
Мой уровень: [замени — начинающий/средний/продвинутый]
Слабые места (если знаешь): [замени — или напиши "пока не знаю"]

Режимы работы:

ТЕСТ (команда "тест [тема]"):
— 10 вопросов разной сложности по теме
— После каждого ответа: верно/неверно + объяснение
— В конце: итог и что нужно повторить

РАЗБОР ОШИБОК (команда "почему [неверный ответ]"):
— Объяснение почему ответ неверный
— Правильный ответ с логикой
— Похожий вопрос для закрепления

СЛАБЫЕ МЕСТА (команда "мои пробелы"):
— Анализ ошибок за нашу сессию
— Топ-3 темы где я ошибаюсь
— План что изучить в первую очередь

ОБЪЯСНЕНИЕ (команда "объясни [тема]"):
— Простое объяснение
— Пример из жизни
— Типичные ошибки по этой теме`}
            />
          </section>

          <section className="bg-zinc-900 rounded-2xl p-6 md:p-8 border border-zinc-800">
            <h2 className="text-2xl font-semibold text-white mb-4">Пошаговая настройка</h2>
            <LessonSteps
              steps={[
                            "Шаг 1 — Заполни предмет и свой уровень",
                            "Шаг 2 — Отправь агенту",
                            "Шаг 3 — Напиши \"тест [тема первого урока]\"",
                            "Шаг 4 — Пройди тест, получи разбор ошибок",
                            "Шаг 5 — Напиши \"мои пробелы\" — агент покажет слабые места",
                            "Шаг 6 — Занимайся каждый день по 30 минут с агентом",
              ]}
            />
          </section>

          <section className="bg-zinc-900 rounded-2xl p-6 md:p-8 border border-zinc-800">
            <h2 className="text-2xl font-semibold text-white mb-4">Чеклист</h2>
            <Checklist
              storageKey="block2_lesson13_checklist"
              items={[
                            "□ Указал предмет и уровень",
                            "□ Прошёл первый тест",
                            "□ Понял формат разбора ошибок",
                            "□ Проверил команду \"мои пробелы\"",
                            "✅ Агент-репетитор настроен",
              ]}
            />
          </section>

          <section className="bg-zinc-900 rounded-2xl p-6 md:p-8 border border-zinc-800">
            <h2 className="text-2xl font-semibold text-white mb-4">Troubleshooting</h2>
            <div className="space-y-3 text-zinc-300">
              {[
                                "Вопросы слишком лёгкие/сложные\n→ Напиши: \"Сделай вопросы сложнее / проще\" — агент откалибрует уровень",
                                "Агент не знает специфику моего экзамена\n→ Добавь программу: \"Темы экзамена: [список из программы курса]\" — агент будет спрашивать только по ним",
                                "Хочу симуляцию реального экзамена\n→ Напиши: \"Симуляция: 40 вопросов, 2 часа, без подсказок\" — агент войдёт в режим экзамена",
                                "Нужно повторять карточки каждый день\n→ Блок 3: настроим ежедневную тренировку по расписанию",
              ].map((line) => (
                <div
                  key={line}
                  className="bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 whitespace-pre-line"
                >
                  {line}
                </div>
              ))}
            </div>
          </section>

          <BlockCompleteCard trackLabel="Студент — Конспекты и Экзамен" />

          <nav className="flex items-center justify-between text-sm text-zinc-400">
            <Link
              href="/dashboard/course/block/2/lesson/12"
              className="hover:text-zinc-200 transition-colors"
            >
              ← Назад
            </Link>
            <span className="text-zinc-600">Следующий урок →</span>
          </nav>
        </div>
      </div>
    </main>
  );
}
