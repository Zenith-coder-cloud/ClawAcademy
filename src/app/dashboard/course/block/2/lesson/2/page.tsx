"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Checklist,
  ImagePlaceholder,
  LessonSteps,
  PromptCopyBlock,
  TimerBadge,
  TrackChoiceCards,
  TRACKS,
  type TrackId,
} from "../../components";

const lessonLinks = [
  { num: 1, title: "Агент-автоответчик", href: "/dashboard/course/block/2/lesson/1" },
  { num: 2, title: "Агент-ресёрчер", href: "/dashboard/course/block/2/lesson/2" },
  { num: 3, title: "Email-агент", href: "/dashboard/course/block/2/lesson/3" },
  { num: 4, title: "Контент-агент", href: "/dashboard/course/block/2/lesson/4" },
  { num: 5, title: "Агент-парсер рынка", href: "/dashboard/course/block/2/lesson/5" },
];

const nextByTrack: Record<TrackId, { href: string; label: string }> = {
  freelancer: {
    href: "/dashboard/course/block/2/lesson/3",
    label: "Урок 3: Email-агент →",
  },
  content: {
    href: "/dashboard/course/block/2/lesson/4",
    label: "Урок 4: Контент-агент →",
  },
  business: {
    href: "/dashboard/course/block/2/lesson/10",
    label: "Урок 10: Чат-бот поддержки →",
  },
  student: {
    href: "/dashboard/course/block/2/lesson/12",
    label: "Урок 12: Агент-конспектировщик →",
  },
  investor: {
    href: "/dashboard/course/block/2/lesson/14",
    label: "Урок 14: Агент мониторинга рынка →",
  },
  seller: {
    href: "/dashboard/course/block/2/lesson/16",
    label: "Урок 16: Агент описаний товаров →",
  },
};

export default function Block2Lesson2Page() {
  const [track, setTrack] = useState<TrackId | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("block2_track") as TrackId | null;
    if (stored && TRACKS[stored]) setTrack(stored);
  }, []);

  return (
    <main className="min-h-screen bg-[#0D0D0D] text-zinc-200">
      <section className="border-b border-zinc-900">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <p className="text-[#FF4422] text-sm font-semibold mb-2">
            Блок 2 · Урок 2 из 5
          </p>
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <h1 className="text-3xl md:text-4xl font-bold text-white">
              Агент-ресёрчер
            </h1>
            <TimerBadge text="⏱ 20 минут" />
          </div>
          <p className="text-zinc-400 text-lg">
            Получай аналитические отчёты за 5 минут вместо 2 часов
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
                    (2 === l.num
                      ? "bg-[#FF4422]/10 text-[#FF4422] font-semibold"
                      : "text-zinc-400 hover:text-white hover:bg-zinc-800")
                  }
                >
                  <span
                    className={
                      "w-5 h-5 rounded-full border flex items-center justify-center text-xs shrink-0 " +
                      (2 === l.num ? "border-[#FF4422]" : "border-zinc-600")
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
          <ImagePlaceholder label="Заглушка изображения урока 2" />

          <section className="bg-zinc-900 rounded-2xl p-6 md:p-8 border border-zinc-800">
            <h2 className="text-2xl font-semibold text-white mb-4">Зачем это нужно</h2>
            <p className="text-zinc-400 leading-relaxed">
              Хочешь знать что происходит на рынке? Следить за конкурентами? Исследовать тему?
              Раньше это занимало часы. Открыть 20 вкладок, прочитать, структурировать, записать.
              <br />
              <br />
              Агент-ресёрчер делает это за тебя. Ты задаёшь вопрос — получаешь готовый структурированный отчёт.
            </p>
          </section>

          <section className="bg-zinc-900 rounded-2xl p-6 md:p-8 border border-zinc-800">
            <h2 className="text-2xl font-semibold text-white mb-4">Кейс</h2>
            <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-5 text-zinc-300 space-y-2">
              <p className="font-semibold">📦 Кейс: Маркетолог Дарья</p>
              <p>Задача: ежедневный мониторинг конкурентов + новости рынка</p>
              <p>Раньше: 1.5 часа каждое утро вручную</p>
              <p>После: 1 сообщение агенту → отчёт через 3 минуты</p>
              <p>Время настройки: 18 минут</p>
              <p>Экономия: 7.5 часов в неделю ✅</p>
            </div>
          </section>

          <section className="bg-zinc-900 rounded-2xl p-6 md:p-8 border border-zinc-800">
            <h2 className="text-2xl font-semibold text-white mb-4">Что умеет агент-ресёрчер</h2>
            <div className="grid md:grid-cols-2 gap-3 text-zinc-300">
              {[
                "Найдёт последние новости по теме с источниками и датами",
                "Соберёт данные о конкурентах: цены, позиции, активность",
                "Сравнит несколько продуктов или компаний",
                "Напишет краткое резюме и выделит главное",
                "Предложит углубиться в интересный аспект",
              ].map((item) => (
                <div
                  key={item}
                  className="bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3"
                >
                  {item}
                </div>
              ))}
            </div>
          </section>

          <section className="bg-zinc-900 rounded-2xl p-6 md:p-8 border border-zinc-800">
            <h2 className="text-2xl font-semibold text-white mb-4">Готовый промпт</h2>
            <PromptCopyBlock
              code={`Ты — мой персональный аналитик-ресёрчер.\n\nКогда получаешь запрос на исследование:\n1. Найди 5–7 актуальных источников через веб-поиск\n2. Выдели ключевые факты, данные, цифры\n3. Структурируй отчёт в формате:\n   📋 Резюме (3–4 предложения)\n   🔑 Ключевые факты (список с цифрами и датами)\n   📈 Тренды и выводы\n   🔗 Источники (названия и URL)\n4. В конце спроси: \"Хочешь углубиться в какой-то аспект?\"\n\nТребования к отчёту:\n— Только факты, никаких предположений без источников\n— Цифры и даты где возможно\n— Язык: чёткий, без воды\n— Длина: достаточная для понимания, без лишнего`}
            />
          </section>

          <section className="bg-zinc-900 rounded-2xl p-6 md:p-8 border border-zinc-800">
            <h2 className="text-2xl font-semibold text-white mb-4">Примеры запросов</h2>
            <div className="grid md:grid-cols-3 gap-4">
              {[
                "🏆 \"Исследуй топ-5 конкурентов в нише [ниша]. Что они предлагают, сколько стоит, что пишут клиенты\"",
                "📰 \"Найди главные новости про [тема] за последние 7 дней. Выдели самое важное\"",
                "💰 \"Сравни [продукт A] и [продукт B]: функции, цены, отзывы, кому подходит\"",
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

          <section className="bg-zinc-900 rounded-2xl p-6 md:p-8 border border-zinc-800">
            <h2 className="text-2xl font-semibold text-white mb-4">Пошаговая настройка</h2>
            <LessonSteps
              steps={[
                "Шаг 1 — Скопируй промпт выше",
                "Шаг 2 — Вставь в чат агенту и отправь",
                'Шаг 3 — Напиши запрос: "Исследуй рынок AI-инструментов для фрилансеров"',
                "Шаг 4 — Дождись отчёта (обычно 1–3 минуты)",
                'Шаг 5 — Уточни: "Углубись в раздел о ценах"',
                "Шаг 6 — Сохрани промпт в заметки — он будет нужен регулярно",
              ]}
            />
          </section>

          <section className="bg-zinc-900 rounded-2xl p-6 md:p-8 border border-zinc-800">
            <h2 className="text-2xl font-semibold text-white mb-4">Чеклист</h2>
            <Checklist
              storageKey="block2_lesson2_checklist"
              items={[
                "Скопировал промпт и отправил агенту",
                "Сделал первый запрос на исследование",
                "Получил структурированный отчёт",
                "Попросил углубиться в один аспект",
                "✅ Агент-ресёрчер работает",
              ]}
            />
          </section>

          <section className="bg-zinc-900 rounded-2xl p-6 md:p-8 border border-zinc-800">
            <h2 className="text-2xl font-semibold text-white mb-4">Troubleshooting</h2>
            <div className="space-y-3 text-zinc-300">
              {[
                "Агент даёт устаревшие данные\n→ Добавь в запрос: \"только данные за последние 30 дней\" или \"актуально на [текущий год]\"",
                "Отчёт слишком длинный / слишком короткий\n→ Добавь в промпт: \"Объём резюме: не более 200 слов. Список фактов: не более 7 пунктов\"",
                "Агент придумывает источники\n→ Добавь: \"ВАЖНО: никогда не придумывай URL. Если не нашёл — так и напиши: 'источник не найден'\"",
                "Нужен отчёт каждое утро автоматически\n→ Это блок 3 — автоматизация по расписанию. Там настроим cron для ресёрчера.",
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

          <nav className="flex items-center justify-between text-sm text-zinc-400">
            <Link
              href="/dashboard/course/block/2/lesson/1"
              className="hover:text-zinc-200 transition-colors"
            >
              ← Назад
            </Link>
            {track ? (
              <Link
                href={nextByTrack[track].href}
                className="text-[#FF4422] hover:text-[#ff5a3c] transition-colors"
              >
                {nextByTrack[track].label}
              </Link>
            ) : (
              <span className="text-zinc-600">Выбери трек ниже →</span>
            )}
          </nav>

          {!track && (
            <section className="bg-zinc-900 rounded-2xl p-6 md:p-8 border border-zinc-800">
              <h2 className="text-2xl font-semibold text-white mb-4">
                Выбери следующий урок
              </h2>
              <TrackChoiceCards />
            </section>
          )}
        </div>
      </div>
    </main>
  );
}
