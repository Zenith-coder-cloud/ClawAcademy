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

export default function Block2Lesson11Page() {
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
            Блок 2 · Урок 11 из 17
          </p>
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <h1 className="text-3xl md:text-4xl font-bold text-white">
              Агент лидогенерации
            </h1>
            <TimerBadge text="⏱ 30 минут" />
            <TrackBadge track="business" isRecommended={recommended === "business"} />
          </div>
          <p className="text-zinc-400 text-lg">
            Находи потенциальных клиентов и делай первый контакт
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
                    (11 === l.num
                      ? "bg-[#FF4422]/10 text-[#FF4422] font-semibold"
                      : "text-zinc-400 hover:text-white hover:bg-zinc-800")
                  }
                >
                  <span
                    className={
                      "w-5 h-5 rounded-full border flex items-center justify-center text-xs shrink-0 " +
                      (11 === l.num ? "border-[#FF4422]" : "border-zinc-600")
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
          <ImagePlaceholder label="Заглушка изображения урока 11" />

          <section className="bg-zinc-900 rounded-2xl p-6 md:p-8 border border-zinc-800">
            <h2 className="text-2xl font-semibold text-white mb-4">Зачем это нужно</h2>
            <p className="text-zinc-400 leading-relaxed">
              Новые клиенты не появляются сами. Холодный поиск — это часы ручной работы. Просмотреть 100 профилей, написать 50 сообщений, получить 5 ответов.<br />
              <br />
              Агент автоматизирует поиск и первый контакт. Ты общаешься только с теми кто уже заинтересован.
            </p>
          </section>

          <section className="bg-zinc-900 rounded-2xl p-6 md:p-8 border border-zinc-800">
            <h2 className="text-2xl font-semibold text-white mb-4">Кейс</h2>
            <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-5 text-zinc-300 space-y-2">
                          <p className="font-semibold">📦 Кейс: B2B SaaS компания &quot;Аналитика PRO&quot;</p>
                          <p>Ситуация: нужен постоянный поток лидов, SDR работал вручную</p>
                          <p>До: 20 лидов в неделю, 40 часов работы SDR</p>
                          <p>После: агент находит 80+ потенциальных клиентов, пишет персональные сообщения</p>
                          <p>Время SDR на рутину: снизилось с 40 до 10 часов в неделю</p>
                          <p>Время настройки: 28 минут ✅</p>
            </div>
          </section>

          <section className="bg-zinc-900 rounded-2xl p-6 md:p-8 border border-zinc-800">
            <h2 className="text-2xl font-semibold text-white mb-4">Готовый промпт</h2>
            <PromptCopyBlock
              code={`Ты — агент по поиску клиентов и первичному аутричу.

Мой продукт / услуга: [замени — что продаёшь]
Идеальный клиент: [замени — размер компании, должность, ниша, боли]
Каналы поиска: [замени — LinkedIn, Telegram, VC.ru, профессиональные сообщества]

Когда я говорю "найди лидов":
1. Найди 10–15 потенциальных клиентов по описанию
2. Для каждого: имя/компания, должность, почему подходит, где нашёл, контакт
3. Составь персональное первое сообщение для каждого (не шаблон — учитывай их специфику)

Правила первого сообщения:
— 3–5 предложений максимум
— Начни с чего-то конкретного об их компании/работе (не "увидел ваш профиль")
— Одна конкретная боль которую решаешь
— Мягкий призыв: "Если актуально — готов рассказать за 15 минут"
— Никакого агрессивного продажника, никаких ссылок в первом сообщении

Когда я говорю "напиши follow-up":
— Через 5 дней после первого сообщения без ответа
— 2–3 предложения, другой угол, без давления`}
            />
          </section>

          <section className="bg-zinc-900 rounded-2xl p-6 md:p-8 border border-zinc-800">
            <h2 className="text-2xl font-semibold text-white mb-4">Пошаговая настройка</h2>
            <LessonSteps
              steps={[
                            "Шаг 1 — Опиши продукт и идеального клиента",
                            "Шаг 2 — Укажи каналы поиска",
                            "Шаг 3 — Напиши \"найди лидов\"",
                            "Шаг 4 — Получи список с персональными сообщениями",
                            "Шаг 5 — Проверь каждое сообщение — звучит естественно?",
                            "Шаг 6 — Отправь первые 5 — замерь конверсию в ответ",
              ]}
            />
          </section>

          <section className="bg-zinc-900 rounded-2xl p-6 md:p-8 border border-zinc-800">
            <h2 className="text-2xl font-semibold text-white mb-4">Чеклист</h2>
            <Checklist
              storageKey="block2_lesson11_checklist"
              items={[
                            "□ Описал продукт и идеального клиента",
                            "□ Получил первый список из 10+ лидов",
                            "□ Проверил персональные сообщения — не шаблонные",
                            "□ Отправил первую волну",
                            "✅ Агент лидогенерации настроен",
              ]}
            />
          </section>

          <section className="bg-zinc-900 rounded-2xl p-6 md:p-8 border border-zinc-800">
            <h2 className="text-2xl font-semibold text-white mb-4">Troubleshooting</h2>
            <div className="space-y-3 text-zinc-300">
              {[
                                "Лиды нерелевантные\n→ Уточни описание клиента: \"малый бизнес 10–50 чел, e-commerce, GMV $50k+, Россия/СНГ\"",
                                "Сообщения звучат как спам\n→ Добавь: \"Каждое сообщение уникально. Найди что-то конкретное об их компании прежде чем писать\"",
                                "Агент не находит контакты\n→ Укажи конкретные платформы: LinkedIn (там есть email), Telegram (открытые группы)",
                                "Мало ответов\n→ Попроси агента: \"Проанализируй мои первые 10 сообщений — почему нет ответов? Что улучшить?\"",
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
              href="/dashboard/course/block/2/lesson/10"
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
