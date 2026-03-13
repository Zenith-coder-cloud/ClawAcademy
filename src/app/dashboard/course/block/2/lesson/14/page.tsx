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

export default function Block2Lesson14Page() {
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
            Блок 2 · Урок 14 из 17
          </p>
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <h1 className="text-3xl md:text-4xl font-bold text-white">
              Агент мониторинга рынка
            </h1>
            <TimerBadge text="⏱ 20 минут" />
            <TrackBadge track="investor" isRecommended={recommended === "investor"} />
          </div>
          <p className="text-zinc-400 text-lg">
            Ежедневный дайджест по рынкам — прямо в Telegram
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
                    (14 === l.num
                      ? "bg-[#FF4422]/10 text-[#FF4422] font-semibold"
                      : "text-zinc-400 hover:text-white hover:bg-zinc-800")
                  }
                >
                  <span
                    className={
                      "w-5 h-5 rounded-full border flex items-center justify-center text-xs shrink-0 " +
                      (14 === l.num ? "border-[#FF4422]" : "border-zinc-600")
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
          <ImagePlaceholder label="Заглушка изображения урока 14" />

          <section className="bg-zinc-900 rounded-2xl p-6 md:p-8 border border-zinc-800">
            <h2 className="text-2xl font-semibold text-white mb-4">Зачем это нужно</h2>
            <p className="text-zinc-400 leading-relaxed">
              Рынки не спят. Пока ты спишь — что-то происходит. Открывать 10 сайтов каждое утро и читать всё подряд — не масштабируется.<br />
              <br />
              Агент мониторит твой портфель и интересные активы, собирает важное — ты читаешь дайджест за 5 минут.
            </p>
          </section>

          <section className="bg-zinc-900 rounded-2xl p-6 md:p-8 border border-zinc-800">
            <h2 className="text-2xl font-semibold text-white mb-4">Кейс</h2>
            <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-5 text-zinc-300 space-y-2">
                          <p className="font-semibold">📦 Кейс: Частный инвестор Михаил (портфель крипто + акции)</p>
                          <p>Ситуация: следил за 15 активами, тратил 1.5 часа утром на мониторинг</p>
                          <p>До: пропускал важные новости, не успевал реагировать</p>
                          <p>После: агент присылает дайджест с ценами и важными новостями каждое утро</p>
                          <p>Время на мониторинг: снизилось с 90 до 10 минут</p>
                          <p>Время настройки: 18 минут ✅</p>
            </div>
          </section>

          <section className="bg-zinc-900 rounded-2xl p-6 md:p-8 border border-zinc-800">
            <h2 className="text-2xl font-semibold text-white mb-4">Готовый промпт</h2>
            <PromptCopyBlock
              code={`Ты — мой личный финансовый аналитик и аналитик рынков.

Мой портфель (замени на свои активы):
Крипто: BTC, ETH, SOL
Акции: [если есть]
Интересные активы для мониторинга: [другие монеты/акции]

Когда я пишу "дайджест" или "рынок":
1. ЦЕНЫ: текущие цены и изменение за 24 часа для каждого актива из портфеля
2. РЫНОЧНЫЙ СЕНТИМЕНТ: общий настрой рынка (жадность/страх, доминация BTC)
3. ГЛАВНЫЕ НОВОСТИ: 3–5 новостей за последние 24 часа которые влияют на мой портфель
4. НА РАДАРЕ: события ближайших 3 дней (листинги, разлоки, отчёты, FED)
5. СИГНАЛ ДНЯ: один актив из моего портфеля который стоит посмотреть внимательнее — почему

Формат: компактный, только факты, числа и проценты.
Без прогнозов если нет чётких оснований. Без "возможно" и "вероятно".`}
            />
          </section>

          <section className="bg-zinc-900 rounded-2xl p-6 md:p-8 border border-zinc-800">
            <h2 className="text-2xl font-semibold text-white mb-4">Пошаговая настройка</h2>
            <LessonSteps
              steps={[
                            "Шаг 1 — Заполни свои активы",
                            "Шаг 2 — Отправь агенту",
                            "Шаг 3 — Напиши \"дайджест\"",
                            "Шаг 4 — Проверь: цены актуальные? новости релевантные?",
                            "Шаг 5 — Уточни формат под себя: \"добавь Fear & Greed Index\" или \"убери акции\"",
                            "Шаг 6 — В блоке 3 настроим автоматическую доставку в 8:00",
              ]}
            />
          </section>

          <section className="bg-zinc-900 rounded-2xl p-6 md:p-8 border border-zinc-800">
            <h2 className="text-2xl font-semibold text-white mb-4">Чеклист</h2>
            <Checklist
              storageKey="block2_lesson14_checklist"
              items={[
                            "□ Заполнил свои активы",
                            "□ Получил первый дайджест",
                            "□ Цены и новости актуальные",
                            "□ Формат удобный для чтения",
                            "✅ Агент мониторинга настроен",
              ]}
            />
          </section>

          <section className="bg-zinc-900 rounded-2xl p-6 md:p-8 border border-zinc-800">
            <h2 className="text-2xl font-semibold text-white mb-4">Troubleshooting</h2>
            <div className="space-y-3 text-zinc-300">
              {[
                                "Цены неточные или устаревшие\n→ Агент использует веб-поиск — данные могут отставать на 15 минут. Для real-time: добавь источники CoinGecko, TradingView",
                                "Новости нерелевантные\n→ Уточни: \"Меня интересуют только новости прямо влияющие на цену, не общие обзоры\"",
                                "Агент делает прогнозы которых не просил\n→ Добавь в промпт: \"ЗАПРЕЩЕНО: прогнозы цен, инвестиционные рекомендации. Только факты.\"",
                                "Хочу алерты при сильном движении цены\n→ Блок 3: настроим мониторинг каждый час и алерт при изменении >5%",
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
              href="/dashboard/course/block/2/lesson/15"
              className="text-[#FF4422] hover:text-[#ff5a3c] transition-colors"
            >
              Урок 15: Агент анализа проекта →
            </Link>
          </nav>
        </div>
      </div>
    </main>
  );
}
