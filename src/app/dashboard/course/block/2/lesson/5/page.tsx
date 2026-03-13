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
];

type AccordionItem = { title: string; content: string };

function Accordion({ items }: { items: AccordionItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="space-y-3">
      {items.map((item, idx) => {
        const isOpen = openIndex === idx;
        return (
          <div
            key={item.title}
            className="bg-zinc-950 border border-zinc-800 rounded-xl"
          >
            <button
              className="w-full flex items-center justify-between px-5 py-4 text-left"
              onClick={() => setOpenIndex(isOpen ? null : idx)}
            >
              <span className="text-white font-semibold">{item.title}</span>
              <span className="text-zinc-500 text-sm">
                {isOpen ? "Скрыть" : "Показать"}
              </span>
            </button>
            {isOpen && (
              <div className="px-5 pb-5 text-zinc-400 leading-relaxed">
                {item.content}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default function Block2Lesson5Page() {
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
            Блок 2 · Урок 5 из 5
          </p>
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <h1 className="text-3xl md:text-4xl font-bold text-white">
              Агент-парсер рынка
            </h1>
            <TimerBadge text="⏱ 30 минут" />
            <TrackBadge
              track="business"
              isRecommended={recommended === "business"}
            />
          </div>
          <p className="text-zinc-400 text-lg">
            Мониторинг конкурентов и рынка — автоматически
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
                    (5 === l.num
                      ? "bg-[#FF4422]/10 text-[#FF4422] font-semibold"
                      : "text-zinc-400 hover:text-white hover:bg-zinc-800")
                  }
                >
                  <span
                    className={
                      "w-5 h-5 rounded-full border flex items-center justify-center text-xs shrink-0 " +
                      (5 === l.num ? "border-[#FF4422]" : "border-zinc-600")
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
          <ImagePlaceholder label="Заглушка изображения урока 5" />

          <section className="bg-zinc-900 rounded-2xl p-6 md:p-8 border border-zinc-800">
            <h2 className="text-2xl font-semibold text-white mb-4">Зачем это нужно</h2>
            <p className="text-zinc-400 leading-relaxed">
              Рынок меняется. Конкуренты меняют цены. Появляются новые игроки.
              Держать руку на пульсе вручную — нереально.
              <br />
              <br />
              Агент-парсер собирает данные, сравнивает, выдаёт структурированный отчёт.
              Ты принимаешь решения на основе данных а не ощущений.
            </p>
          </section>

          <section className="bg-zinc-900 rounded-2xl p-6 md:p-8 border border-zinc-800">
            <h2 className="text-2xl font-semibold text-white mb-4">Кейс</h2>
            <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-5 text-zinc-300 space-y-2">
              <p className="font-semibold">📦 Кейс: Интернет-магазин электроники &quot;Voltex&quot;</p>
              <p>Ситуация: 200+ позиций, 5 конкурентов, ценовая война</p>
              <p>До: менеджер 4 часа в неделю на мониторинг цен вручную</p>
              <p>После: еженедельный отчёт по конкурентам приходит автоматически</p>
              <p>Время настройки: 28 минут</p>
              <p>Экономия: 16 часов в месяц ✅</p>
            </div>
          </section>

          <section className="bg-zinc-900 rounded-2xl p-6 md:p-8 border border-zinc-800">
            <h2 className="text-2xl font-semibold text-white mb-4">Что умеет агент-парсер</h2>
            <div className="grid md:grid-cols-2 gap-3 text-zinc-300">
              {[
                "Собирает цены конкурентов по заданным продуктам",
                "Сравнивает с твоими ценами: где ты дороже, где дешевле",
                "Находит позиции которые есть у конкурентов но нет у тебя",
                "Отслеживает акции и спецпредложения",
                "Выдаёт готовую таблицу + краткий вывод с рекомендациями",
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
              instruction={
                "Замени поля в промпте на своих реальных конкурентов и свои продукты.\nПервый запрос займёт 2–5 минут — агент обходит несколько сайтов."
              }
              code={`Ты — агент мониторинга рынка и конкурентов.\n\nМои конкуренты (замени на свои):\n1. [название конкурента 1] — [URL]\n2. [название конкурента 2] — [URL]\n3. [название конкурента 3] — [URL]\n\nМои ключевые продукты (замени на свои):\n1. [продукт 1] — моя цена: [цена]\n2. [продукт 2] — моя цена: [цена]\n3. [продукт 3] — моя цена: [цена]\n\nКогда я пишу "проверь конкурентов":\n1. Найди актуальные цены на мои продукты у каждого конкурента\n2. Найди акции и спецпредложения\n3. Составь сравнительную таблицу: | Продукт | Моя цена | Конкурент 1 | Конкурент 2 | Конкурент 3 |\n4. Выдели:\n   🔴 Где я значительно дороже конкурентов (>15%)\n   🟡 Где я примерно на уровне (±10%)\n   🟢 Где я дешевле\n   ➕ Что есть у конкурентов но нет у меня\n5. Рекомендации: 3–5 конкретных действий\n\nФормат: таблица Markdown + текстовый вывод.`}
            />
          </section>

          <section className="bg-zinc-900 rounded-2xl p-6 md:p-8 border border-zinc-800">
            <h2 className="text-2xl font-semibold text-white mb-4">Пошаговая настройка</h2>
            <LessonSteps
              steps={[
                "Шаг 1 — Заполни список конкурентов (3–5 штук) и своих продуктов (3–7 штук)",
                "Шаг 2 — Скопируй промпт и отправь агенту",
                'Шаг 3 — Напиши: "проверь конкурентов"',
                "Шаг 4 — Дождись отчёта (2–5 минут — агент обходит сайты)",
                "Шаг 5 — Изучи таблицу и рекомендации",
                'Шаг 6 — Попроси: "Углубись по [конкурент 1] — что именно у них популярно?"',
              ]}
            />
          </section>

          <section className="bg-zinc-900 rounded-2xl p-6 md:p-8 border border-zinc-800">
            <h2 className="text-2xl font-semibold text-white mb-4">Чеклист</h2>
            <Checklist
              storageKey="block2_lesson5_checklist"
              items={[
                "Заполнил конкурентов и свои продукты в промпте",
                "Отправил агенту",
                "Написал \"проверь конкурентов\"",
                "Получил сравнительную таблицу",
                "Изучил рекомендации",
                "✅ Агент-парсер настроен",
              ]}
            />
          </section>

          <section className="bg-zinc-900 rounded-2xl p-6 md:p-8 border border-zinc-800">
            <h2 className="text-2xl font-semibold text-white mb-4">Как масштабировать</h2>
            <Accordion
              items={[
                {
                  title: "Автоматический мониторинг каждую неделю",
                  content:
                    "Блок 3 — там настроим cron: агент сам запускает мониторинг по расписанию и присылает отчёт.",
                },
                {
                  title: "Расширить список конкурентов",
                  content:
                    "Добавь больше URL в промпт. Агент обработает всех — просто займёт немного дольше.",
                },
                {
                  title: "Мониторинг не только цен",
                  content:
                    "Измени задачу: \"следи за новыми продуктами конкурентов\", \"отслеживай их контент\", \"анализируй отзывы клиентов\"",
                },
              ]}
            />
          </section>

          <section className="bg-zinc-900 rounded-2xl p-6 md:p-8 border border-zinc-800">
            <h2 className="text-2xl font-semibold text-white mb-4">Troubleshooting</h2>
            <div className="space-y-3 text-zinc-300">
              {[
                "Агент не может зайти на сайт конкурента\n→ Сайт защищён или требует авторизацию. Попробуй другой источник: Google Merchant, Яндекс.Маркет, price.ua — агент найдёт данные там.",
                "Данные устаревшие\n→ Добавь в запрос: \"убедись что данные актуальные, проверь дату публикации\"",
                "Слишком много продуктов — агент путается\n→ Разбей на группы: \"проверь конкурентов только по категории [категория]\"",
                "Конкурент меняет цены часто\n→ Настрой мониторинг ежедневно — инструкция в Блоке 3.",
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

          <BlockCompleteCard trackLabel="Бизнес — Поддержка, Парсер, Лиды" />

          <nav className="flex items-center justify-between text-sm text-zinc-400">
            <Link
              href="/dashboard/course/block/2/lesson/2"
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
