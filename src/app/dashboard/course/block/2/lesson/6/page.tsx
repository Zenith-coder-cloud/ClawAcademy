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
} from "../../components";
import type { TrackId } from "../../components";

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

export default function Block2Lesson6Page() {
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
            Блок 2 · Урок 6 из 17
          </p>
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <h1 className="text-3xl md:text-4xl font-bold text-white">
              Агент для КП и офферов
            </h1>
            <TimerBadge text="⏱ 20 минут" />
            <TrackBadge
              track="freelancer"
              isRecommended={recommended === "freelancer"}
            />
          </div>
          <p className="text-zinc-400 text-lg">
            Пиши коммерческие предложения за 10 минут вместо 2 часов
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
                    (6 === l.num
                      ? "bg-[#FF4422]/10 text-[#FF4422] font-semibold"
                      : "text-zinc-400 hover:text-white hover:bg-zinc-800")
                  }
                >
                  <span
                    className={
                      "w-5 h-5 rounded-full border flex items-center justify-center text-xs shrink-0 " +
                      (6 === l.num ? "border-[#FF4422]" : "border-zinc-600")
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
          <ImagePlaceholder label="Заглушка изображения урока 6" />

          <section className="bg-zinc-900 rounded-2xl p-6 md:p-8 border border-zinc-800">
            <h2 className="text-2xl font-semibold text-white mb-4">Зачем это нужно</h2>
            <p className="text-zinc-400 leading-relaxed">
              Каждый клиент — уникальный. Каждое КП надо адаптировать. Копипаст не работает. Писать с нуля — долго.<br />
              <br />
              Агент берёт бриф клиента, твои условия и собирает КП которое попадает в точку. Ты редактируешь финальный вариант — 10 минут вместо 2 часов.
            </p>
          </section>

          <section className="bg-zinc-900 rounded-2xl p-6 md:p-8 border border-zinc-800">
            <h2 className="text-2xl font-semibold text-white mb-4">Кейс</h2>
            <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-5 text-zinc-300 space-y-2">
                          <p className="font-semibold">📦 Кейс: SMM-специалист Марина</p>
                          <p>Ситуация: 15+ запросов в неделю, на каждое КП уходило 1.5 часа</p>
                          <p>До: 22 часа в неделю только на переговоры и КП</p>
                          <p>После: агент делает черновик за 3 минуты, Марина редактирует 15 минут</p>
                          <p>Конверсия КП в продажу: выросла с 18% до 31% (более точное попадание)</p>
                          <p>Время настройки: 20 минут ✅</p>
            </div>
          </section>

          <section className="bg-zinc-900 rounded-2xl p-6 md:p-8 border border-zinc-800">
            <h2 className="text-2xl font-semibold text-white mb-4">Готовый промпт</h2>
            <PromptCopyBlock
              code={`Ты — мой ассистент по продажам и коммерческим предложениям.

Когда я говорю "напиши КП" и даю информацию о клиенте:
1. Структура КП:
   — Заголовок (боль клиента + моё решение)
   — Понимание задачи (покажи что слышишь клиента)
   — Моё решение (конкретно что делаю, как, за сколько времени)
   — Результат (что получит клиент — цифры и конкретика)
   — Условия (цена, сроки, что включено, что нет)
   — Следующий шаг (один чёткий призыв к действию)

2. Тон: уверенный, деловой, без воды и самолюбования
3. Длина: 300–500 слов — не больше
4. Не используй слова: "уникальный", "профессиональный", "высококачественный", "комплексный"

Мои услуги и тарифы (замени на свои):
— [услуга 1]: [цена], [срок]
— [услуга 2]: [цена], [срок]

Перед написанием — уточни если не хватает информации о задаче клиента.`}
            />
          </section>

          <section className="bg-zinc-900 rounded-2xl p-6 md:p-8 border border-zinc-800">
            <h2 className="text-2xl font-semibold text-white mb-4">Пошаговая настройка</h2>
            <LessonSteps
              steps={[
                            "Шаг 1 — Заполни свои услуги и тарифы в промпте",
                            "Шаг 2 — Отправь агенту",
                            "Шаг 3 — Напиши: \"напиши КП. Клиент: [описание]. Задача: [что просит]. Бюджет: [если знаешь]\"",
                            "Шаг 4 — Получи черновик КП",
                            "Шаг 5 — Добавь личные детали и отправь клиенту",
                            "Шаг 6 — Сохрани лучшие КП как шаблоны — агент улучшится с опытом",
              ]}
            />
          </section>

          <section className="bg-zinc-900 rounded-2xl p-6 md:p-8 border border-zinc-800">
            <h2 className="text-2xl font-semibold text-white mb-4">Чеклист</h2>
            <Checklist
              storageKey="block2_lesson6_checklist"
              items={[
                            "□ Заполнил услуги и тарифы",
                            "□ Отправил агенту и протестировал первый запрос",
                            "□ Черновик КП читается убедительно",
                            "□ Адаптировал под реального клиента",
                            "✅ Агент для КП настроен",
              ]}
            />
          </section>

          <section className="bg-zinc-900 rounded-2xl p-6 md:p-8 border border-zinc-800">
            <h2 className="text-2xl font-semibold text-white mb-4">Troubleshooting</h2>
            <div className="space-y-3 text-zinc-300">
              {[
                                "КП звучит слишком шаблонно\n→ Добавь в запрос больше деталей о клиенте: его боли, бизнес, что пробовал раньше",
                                "Агент не знает мои реальные кейсы\n→ Добавь в промпт: \"Мои кейсы: [клиент 1 — результат], [клиент 2 — результат]\"",
                                "КП слишком длинное\n→ Добавь в промпт: \"Максимум 400 слов. Убирай всё что не помогает продаже.\"",
                                "Клиент не отвечает на КП\n→ Попроси агента: \"Напиши follow-up письмо через 3 дня после отправки КП\"",
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
              href="/dashboard/course/block/2/lesson/3"
              className="hover:text-zinc-200 transition-colors"
            >
              ← Назад
            </Link>
            <Link
              href="/dashboard/course/block/2/lesson/7"
              className="text-[#FF4422] hover:text-[#ff5a3c] transition-colors"
            >
              Урок 7: Агент-трекер задач →
            </Link>
          </nav>
        </div>
      </div>
    </main>
  );
}
