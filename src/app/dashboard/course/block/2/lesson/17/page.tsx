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

export default function Block2Lesson17Page() {
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
            Блок 2 · Урок 17 из 17
          </p>
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <h1 className="text-3xl md:text-4xl font-bold text-white">
              Агент мониторинга отзывов
            </h1>
            <TimerBadge text="⏱ 20 минут" />
            <TrackBadge track="seller" isRecommended={recommended === "seller"} />
          </div>
          <p className="text-zinc-400 text-lg">
            Знай что говорят покупатели — и реагируй первым
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
                    (17 === l.num
                      ? "bg-[#FF4422]/10 text-[#FF4422] font-semibold"
                      : "text-zinc-400 hover:text-white hover:bg-zinc-800")
                  }
                >
                  <span
                    className={
                      "w-5 h-5 rounded-full border flex items-center justify-center text-xs shrink-0 " +
                      (17 === l.num ? "border-[#FF4422]" : "border-zinc-600")
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
          <ImagePlaceholder label="Заглушка изображения урока 17" />

          <section className="bg-zinc-900 rounded-2xl p-6 md:p-8 border border-zinc-800">
            <h2 className="text-2xl font-semibold text-white mb-4">Зачем это нужно</h2>
            <p className="text-zinc-400 leading-relaxed">
              Один негативный отзыв без ответа = минус 30% доверия у новых покупателей. Позитивные отзывы без реакции = упущенная возможность лояльности.<br />
              <br />
              Агент собирает все отзывы, классифицирует и помогает отвечать — быстро и по делу. Ты видишь проблемы раньше чем они становятся катастрофой.
            </p>
          </section>

          <section className="bg-zinc-900 rounded-2xl p-6 md:p-8 border border-zinc-800">
            <h2 className="text-2xl font-semibold text-white mb-4">Кейс</h2>
            <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-5 text-zinc-300 space-y-2">
                          <p className="font-semibold">📦 Кейс: Магазин товаров для дома &quot;Уют&quot; (Ozon + собственный сайт)</p>
                          <p>Ситуация: 50+ отзывов в день, большинство оставались без ответа</p>
                          <p>До: отвечал на 10% отзывов, несколько скандалов переросли в публичные жалобы</p>
                          <p>После: агент классифицирует все отзывы и готовит ответы за 15 минут в день</p>
                          <p>Рейтинг магазина: вырос с 4.1 до 4.7 за 2 месяца</p>
                          <p>Время настройки: 19 минут ✅</p>
            </div>
          </section>

          <section className="bg-zinc-900 rounded-2xl p-6 md:p-8 border border-zinc-800">
            <h2 className="text-2xl font-semibold text-white mb-4">Готовый промпт</h2>
            <PromptCopyBlock
              code={`Ты — мой менеджер по работе с отзывами покупателей.

Мой магазин / продукт: [замени]
Платформы: [замени — Wildberries, Ozon, Google Maps, Яндекс, сайт]

Когда я даю тебе список отзывов:

1. КЛАССИФИКАЦИЯ каждого отзыва:
   ⭐⭐⭐⭐⭐ Позитивный — рад, хвалит
   😐 Нейтральный — есть и плюсы и минусы
   😤 Негативный — недоволен, жалуется
   🚨 Критический — требует возврата, угрожает жалобой

2. СУТЬ: 1 предложение о чём отзыв (что понравилось / что не понравилось)

3. ОТВЕТ: готовый ответ на каждый отзыв
   — Позитивный: благодарность + личная деталь + приглашение вернуться
   — Нейтральный: признание + что улучшаем + благодарность за честность
   — Негативный: сочувствие + решение проблемы + контакт для помощи
   — Критический: быстрое извинение + конкретное действие + контакт напрямую

4. ИНСАЙТЫ: паттерны из всех отзывов
   — Что хвалят чаще всего?
   — На что жалуются чаще всего?
   — Что нужно исправить в первую очередь?

Тон ответов: живой, человечный, не корпоративный шаблон.`}
            />
          </section>

          <section className="bg-zinc-900 rounded-2xl p-6 md:p-8 border border-zinc-800">
            <h2 className="text-2xl font-semibold text-white mb-4">Пошаговая настройка</h2>
            <LessonSteps
              steps={[
                            "Шаг 1 — Опиши магазин и платформы",
                            "Шаг 2 — Отправь агенту",
                            "Шаг 3 — Вставь 5–10 последних отзывов",
                            "Шаг 4 — Получи классификацию и готовые ответы",
                            "Шаг 5 — Проверь ответы — звучат человечно?",
                            "Шаг 6 — Скопируй ответы на платформу",
              ]}
            />
          </section>

          <section className="bg-zinc-900 rounded-2xl p-6 md:p-8 border border-zinc-800">
            <h2 className="text-2xl font-semibold text-white mb-4">Чеклист</h2>
            <Checklist
              storageKey="block2_lesson17_checklist"
              items={[
                            "□ Описал магазин и платформы",
                            "□ Протестировал на реальных отзывах",
                            "□ Ответы на негатив — решают проблему, не оправдываются",
                            "□ Получил инсайты по паттернам",
                            "✅ Агент мониторинга отзывов работает",
              ]}
            />
          </section>

          <section className="bg-zinc-900 rounded-2xl p-6 md:p-8 border border-zinc-800">
            <h2 className="text-2xl font-semibold text-white mb-4">Troubleshooting</h2>
            <div className="space-y-3 text-zinc-300">
              {[
                                "Ответы звучат шаблонно\n→ Добавь: \"Каждый ответ уникальный. Ссылайся на конкретику из отзыва.\"",
                                "Агент слишком мягко реагирует на критику\n→ Добавь: \"На критические отзывы — конкретное решение в первом же предложении. Не начинай с извинений.\"",
                                "Отзывов слишком много\n→ Давай по 20 за раз и добавь: \"Фокус на 🚨 Критических сначала, потом остальные\"",
                                "Нужно мониторить отзывы автоматически\n→ Блок 3: настроим ежедневный парсинг новых отзывов и уведомление",
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

          <BlockCompleteCard trackLabel="Продавец — Описания и Отзывы" />

          <nav className="flex items-center justify-between text-sm text-zinc-400">
            <Link
              href="/dashboard/course/block/2/lesson/16"
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
