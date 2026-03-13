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

export default function Block2Lesson15Page() {
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
            Блок 2 · Урок 15 из 17
          </p>
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <h1 className="text-3xl md:text-4xl font-bold text-white">
              Агент анализа проекта
            </h1>
            <TimerBadge text="⏱ 25 минут" />
            <TrackBadge track="investor" isRecommended={recommended === "investor"} />
          </div>
          <p className="text-zinc-400 text-lg">
            Due diligence любого проекта за 20 минут вместо 2 дней
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
                    (15 === l.num
                      ? "bg-[#FF4422]/10 text-[#FF4422] font-semibold"
                      : "text-zinc-400 hover:text-white hover:bg-zinc-800")
                  }
                >
                  <span
                    className={
                      "w-5 h-5 rounded-full border flex items-center justify-center text-xs shrink-0 " +
                      (15 === l.num ? "border-[#FF4422]" : "border-zinc-600")
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
          <ImagePlaceholder label="Заглушка изображения урока 15" />

          <section className="bg-zinc-900 rounded-2xl p-6 md:p-8 border border-zinc-800">
            <h2 className="text-2xl font-semibold text-white mb-4">Зачем это нужно</h2>
            <p className="text-zinc-400 leading-relaxed">
              Тебе скинули whitepaper. Или друг советует акцию. Или нашёл новый крипто-проект. Нужно разобраться быстро — реальный это проект или нет.<br />
              <br />
              Агент делает структурированный анализ по заданным критериям. Ты видишь красные флаги до того как вложил деньги.
            </p>
          </section>

          <section className="bg-zinc-900 rounded-2xl p-6 md:p-8 border border-zinc-800">
            <h2 className="text-2xl font-semibold text-white mb-4">Кейс</h2>
            <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-5 text-zinc-300 space-y-2">
                          <p className="font-semibold">📦 Кейс: Крипто-инвестор Павел</p>
                          <p>Ситуация: поступало 5–10 питчей в неделю, не успевал анализировать</p>
                          <p>До: тратил 4–6 часов на анализ одного проекта или вкладывал &quot;на удачу&quot;</p>
                          <p>После: агент делает базовый анализ за 20 минут — Павел решает стоит ли углубляться</p>
                          <p>Избежанных rug pull / скамов: 4 за 3 месяца</p>
                          <p>Время настройки: 22 минуты ✅</p>
            </div>
          </section>

          <section className="bg-zinc-900 rounded-2xl p-6 md:p-8 border border-zinc-800">
            <h2 className="text-2xl font-semibold text-white mb-4">Готовый промпт</h2>
            <PromptCopyBlock
              code={`Ты — мой аналитик для due diligence инвестиционных проектов.

Когда я даю проект для анализа (название, сайт, whitepaper или описание):

1. БАЗОВАЯ ИНФОРМАЦИЯ
   — Что это: продукт, команда, стадия
   — Когда создан, где зарегистрирован

2. КОМАНДА
   — Есть ли публичные основатели? Их бэкграунд?
   — Есть ли анонимная команда? (красный флаг)

3. ПРОДУКТ И ТЕХНОЛОГИЯ
   — Что реально делает продукт?
   — Есть ли рабочий продукт или только идея?
   — Есть ли открытый код (GitHub)?

4. ТОКЕНОМИКА / ФИНАНСЫ (для крипто)
   — Распределение токенов — сколько у команды?
   — Vesting schedule — когда разлоки?
   — Рыночная капитализация vs FDV

5. КРАСНЫЕ ФЛАГИ 🚩
   — Анонимная команда без истории
   — Обещания нереального APY
   — Нет рабочего продукта, только roadmap
   — Токеномика в пользу команды (>30%)
   — Нет аудита смарт-контракта

6. ВЕРДИКТ
   — Интересно / Нейтрально / Красные флаги
   — Что проверить дополнительно перед решением

ВАЖНО: это анализ фактов, не инвестиционный совет. Финальное решение — только за мной.`}
            />
          </section>

          <section className="bg-zinc-900 rounded-2xl p-6 md:p-8 border border-zinc-800">
            <h2 className="text-2xl font-semibold text-white mb-4">Пошаговая настройка</h2>
            <LessonSteps
              steps={[
                            "Шаг 1 — Отправь промпт агенту",
                            "Шаг 2 — Напиши: \"Проанализируй проект: [название]. Сайт: [URL]. Описание: [если есть]\"",
                            "Шаг 3 — Получи структурированный анализ",
                            "Шаг 4 — Обрати внимание на красные флаги — если есть → серьёзно задумайся",
                            "Шаг 5 — Попроси: \"Углубись в раздел токеномики\" если интересует",
                            "Шаг 6 — Сравни: \"Сравни этот проект с [конкурент]\"",
              ]}
            />
          </section>

          <section className="bg-zinc-900 rounded-2xl p-6 md:p-8 border border-zinc-800">
            <h2 className="text-2xl font-semibold text-white mb-4">Чеклист</h2>
            <Checklist
              storageKey="block2_lesson15_checklist"
              items={[
                            "□ Протестировал на известном проекте (Bitcoin, Ethereum)",
                            "□ Проверил на явном скаме — агент нашёл красные флаги?",
                            "□ Понял формат анализа",
                            "□ Готов применять к реальным проектам",
                            "✅ Агент анализа проектов настроен",
              ]}
            />
          </section>

          <section className="bg-zinc-900 rounded-2xl p-6 md:p-8 border border-zinc-800">
            <h2 className="text-2xl font-semibold text-white mb-4">Troubleshooting</h2>
            <div className="space-y-3 text-zinc-300">
              {[
                                "Агент не находит информацию о проекте\n→ Дай больше данных: ссылку на whitepaper, CoinMarketCap, GitHub",
                                "Анализ слишком поверхностный\n→ Попроси: \"Углубись в [раздел]. Найди отзывы и обсуждения на Reddit и Twitter\"",
                                "Агент делает инвестиционные рекомендации\n→ Добавь: \"Твоя задача — только факты и красные флаги. Никаких 'купи' или 'продай'.\"",
                                "Нужно анализировать акции, не крипто\n→ Убери раздел \"Токеномика\", замени на \"Финансовые показатели: P/E, выручка, долг, FCF\"",
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

          <BlockCompleteCard trackLabel="Инвестор — Рынок и Анализ" />

          <nav className="flex items-center justify-between text-sm text-zinc-400">
            <Link
              href="/dashboard/course/block/2/lesson/14"
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
