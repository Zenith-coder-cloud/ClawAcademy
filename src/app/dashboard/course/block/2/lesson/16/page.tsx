"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
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

export default function Block2Lesson16Page() {
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
            Блок 2 · Урок 16 из 17
          </p>
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <h1 className="text-3xl md:text-4xl font-bold text-white">
              Агент описаний товаров
            </h1>
            <TimerBadge text="⏱ 15 минут" />
            <TrackBadge track="seller" isRecommended={recommended === "seller"} />
          </div>
          <p className="text-zinc-400 text-lg">
            Продающие описания для любой платформы за 5 минут
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
                    (16 === l.num
                      ? "bg-[#FF4422]/10 text-[#FF4422] font-semibold"
                      : "text-zinc-400 hover:text-white hover:bg-zinc-800")
                  }
                >
                  <span
                    className={
                      "w-5 h-5 rounded-full border flex items-center justify-center text-xs shrink-0 " +
                      (16 === l.num ? "border-[#FF4422]" : "border-zinc-600")
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
          <ImagePlaceholder label="Заглушка изображения урока 16" />

          <section className="bg-zinc-900 rounded-2xl p-6 md:p-8 border border-zinc-800">
            <h2 className="text-2xl font-semibold text-white mb-4">Зачем это нужно</h2>
            <p className="text-zinc-400 leading-relaxed">
              Плохое описание = товар не находят и не покупают. Хорошее описание = товар в топе поиска и конвертирует.<br />
              <br />
              У тебя 200 позиций. Написать описание для каждой — месяц работы. Агент делает это за минуты и оптимизирует под конкретную платформу.
            </p>
          </section>

          <section className="bg-zinc-900 rounded-2xl p-6 md:p-8 border border-zinc-800">
            <h2 className="text-2xl font-semibold text-white mb-4">Кейс</h2>
            <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-5 text-zinc-300 space-y-2">
              <p className="font-semibold">
                📦 Кейс: Продавец на Wildberries Ольга (категория детская одежда)
              </p>
              <p>Ситуация: 300 SKU, половина с плохими описаниями не в топе поиска</p>
              <p>
                До: переписывала описания вручную — 20 минут на позицию = 100 часов
                работы
              </p>
              <p>После: агент делает описание за 2 минуты, Ольга проверяет</p>
              <p>Рост органического трафика: +67% за месяц</p>
              <p>Время настройки: 14 минут ✅</p>
            </div>
          </section>

          <section className="bg-zinc-900 rounded-2xl p-6 md:p-8 border border-zinc-800">
            <h2 className="text-2xl font-semibold text-white mb-4">Готовый промпт</h2>
            <PromptCopyBlock
              code={`Ты — мой копирайтер для e-commerce. Пишешь продающие описания товаров.

Мои платформы: [замени — Wildberries, Ozon, собственный сайт, Instagram, Avito]
Моя аудитория: [замени — кто покупает]

Когда я даю характеристики товара, создай:

1. ЗАГОЛОВОК / НАЗВАНИЕ (для маркетплейса):
   — Включи ключевые слова по которым ищут
   — Главное преимущество
   — Максимум 100 символов

2. ОПИСАНИЕ (для карточки товара):
   — Первая строка: главная выгода для покупателя
   — 3–5 ключевых характеристик с акцентом на пользу (не просто факты)
   — Для кого этот товар / в каких ситуациях
   — Закрытие главного возражения
   — Призыв к действию

3. СПИСОК ХАРАКТЕРИСТИК (bullet points):
   — 5–7 пунктов в формате "Характеристика: значение — что это даёт покупателю"

4. SEO-КЛЮЧИ: 10–15 поисковых запросов по которым должен находиться товар

Стиль: конкретный, без воды, фокус на пользе для покупателя а не на характеристиках.`}
            />
          </section>

          <section className="bg-zinc-900 rounded-2xl p-6 md:p-8 border border-zinc-800">
            <h2 className="text-2xl font-semibold text-white mb-4">Пошаговая настройка</h2>
            <LessonSteps
              steps={[
                            "Шаг 1 — Укажи платформы и аудиторию",
                            "Шаг 2 — Отправь агенту",
                            "Шаг 3 — Дай характеристики первого товара: \"Товар: [название]. Характеристики: [список]\"",
                            "Шаг 4 — Получи полный комплект: заголовок, описание, bullet points, ключи",
                            "Шаг 5 — Проверь — звучит убедительно? попадает в боль покупателя?",
                            "Шаг 6 — Масштабируй: давай по 5–10 товаров подряд",
              ]}
            />
          </section>

          <section className="bg-zinc-900 rounded-2xl p-6 md:p-8 border border-zinc-800">
            <h2 className="text-2xl font-semibold text-white mb-4">Чеклист</h2>
            <Checklist
              storageKey="block2_lesson16_checklist"
              items={[
                            "□ Указал платформы и аудиторию",
                            "□ Получил описание первого товара",
                            "□ Описание включает пользу, не только характеристики",
                            "□ Есть SEO-ключи для поиска",
                            "✅ Агент описаний товаров настроен",
              ]}
            />
          </section>

          <section className="bg-zinc-900 rounded-2xl p-6 md:p-8 border border-zinc-800">
            <h2 className="text-2xl font-semibold text-white mb-4">Troubleshooting</h2>
            <div className="space-y-3 text-zinc-300">
              {[
                                "Описания слишком общие\n→ Дай больше деталей о товаре и главных болях покупателей этой категории",
                                "Не попадает в ключевые слова платформы\n→ Добавь: \"Используй ключевые слова специфичные для Wildberries/Ozon — как реально ищут этот товар\"",
                                "Стиль не подходит под мой бренд\n→ Добавь примеры своих лучших описаний — агент скопирует тональность",
                                "Нужно массово переписать 100+ товаров\n→ Давай по 10 за раз: \"Опиши эти товары: 1.[...] 2.[...] 3.[...]\" — агент сделает все разом",
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
              href="/dashboard/course/block/2"
              className="hover:text-zinc-200 transition-colors"
            >
              ← Назад
            </Link>
            <Link
              href="/dashboard/course/block/2/lesson/17"
              className="text-[#FF4422] hover:text-[#ff5a3c] transition-colors"
            >
              Урок 17: Агент мониторинга отзывов →
            </Link>
          </nav>
        </div>
      </div>
    </main>
  );
}
