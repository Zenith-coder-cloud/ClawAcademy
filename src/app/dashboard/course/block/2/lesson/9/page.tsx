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

export default function Block2Lesson9Page() {
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
            Блок 2 · Урок 9 из 17
          </p>
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <h1 className="text-3xl md:text-4xl font-bold text-white">
              Агент трендов
            </h1>
            <TimerBadge text="⏱ 15 минут" />
            <TrackBadge track="content" isRecommended={recommended === "content"} />
          </div>
          <p className="text-zinc-400 text-lg">
            Знай что залетает в твоей нише — до всех остальных
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
                    (9 === l.num
                      ? "bg-[#FF4422]/10 text-[#FF4422] font-semibold"
                      : "text-zinc-400 hover:text-white hover:bg-zinc-800")
                  }
                >
                  <span
                    className={
                      "w-5 h-5 rounded-full border flex items-center justify-center text-xs shrink-0 " +
                      (9 === l.num ? "border-[#FF4422]" : "border-zinc-600")
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
          <ImagePlaceholder label="Заглушка изображения урока 9" />

          <section className="bg-zinc-900 rounded-2xl p-6 md:p-8 border border-zinc-800">
            <h2 className="text-2xl font-semibold text-white mb-4">Зачем это нужно</h2>
            <p className="text-zinc-400 leading-relaxed">
              Контент который попадает в тренд — получает в 10 раз больше охватов. Но тренды живут 3–7 дней. Опоздал — всё.<br />
              <br />
              Агент мониторит твою нишу каждый день и сообщает что горячее прямо сейчас. Ты первым делаешь контент на тренд — пока конкуренты ещё не проснулись.
            </p>
          </section>

          <section className="bg-zinc-900 rounded-2xl p-6 md:p-8 border border-zinc-800">
            <h2 className="text-2xl font-semibold text-white mb-4">Кейс</h2>
            <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-5 text-zinc-300 space-y-2">
                          <p className="font-semibold">📦 Кейс: Крипто-блогер Никита</p>
                          <p>Ситуация: пропускал тренды, публиковал когда тема уже &quot;остыла&quot;</p>
                          <p>До: реагировал на тренды через 2–3 дня (поздно)</p>
                          <p>После: агент даёт дайджест трендов каждое утро — Никита публикует первым</p>
                          <p>Охваты &quot;трендовых&quot; постов: выросли в 4.7 раза</p>
                          <p>Время настройки: 14 минут ✅</p>
            </div>
          </section>

          <section className="bg-zinc-900 rounded-2xl p-6 md:p-8 border border-zinc-800">
            <h2 className="text-2xl font-semibold text-white mb-4">Готовый промпт</h2>
            <PromptCopyBlock
              code={`Ты — мой аналитик трендов и контента.

Моя ниша: [замени — например: "крипта и Web3", "личные финансы", "нейросети и AI"]
Мои платформы: [замени — TG, YouTube, Instagram, TikTok]
Мои конкуренты для мониторинга: [замени — @channel1, @channel2, сайты]

Когда я прошу "что в тренде" или "трендовый дайджест":
1. Найди 5–7 горячих тем в моей нише за последние 48 часов
2. Для каждой темы:
   — Суть тренда (1–2 предложения)
   — Почему это залетает сейчас (причина)
   — Идея контента под мою аудиторию (конкретный угол)
   — Срочность: 🔥 Сегодня | ⚡ 2–3 дня | 📅 Неделя
3. Топ-1 тренд: подробнее — что делают конкуренты, что мне делать иначе
4. Быстрая идея для Stories/Шортс на сегодня (60 секунд)`}
            />
          </section>

          <section className="bg-zinc-900 rounded-2xl p-6 md:p-8 border border-zinc-800">
            <h2 className="text-2xl font-semibold text-white mb-4">Пошаговая настройка</h2>
            <LessonSteps
              steps={[
                            "Шаг 1 — Заполни нишу, платформы, конкурентов",
                            "Шаг 2 — Отправь агенту",
                            "Шаг 3 — Напиши \"что в тренде\" — получи дайджест",
                            "Шаг 4 — Выбери 1–2 темы которые подходят твоей аудитории",
                            "Шаг 5 — Попроси: \"развёрни идею контента по теме [тема]\"",
                            "Шаг 6 — Настрой ежедневный запрос (в блоке 3 — через cron)",
              ]}
            />
          </section>

          <section className="bg-zinc-900 rounded-2xl p-6 md:p-8 border border-zinc-800">
            <h2 className="text-2xl font-semibold text-white mb-4">Чеклист</h2>
            <Checklist
              storageKey="block2_lesson9_checklist"
              items={[
                            "□ Заполнил нишу и конкурентов",
                            "□ Получил первый дайджест трендов",
                            "□ Понял формат — тренды релевантные и свежие",
                            "□ Попросил развернуть одну идею",
                            "✅ Агент трендов работает",
              ]}
            />
          </section>

          <section className="bg-zinc-900 rounded-2xl p-6 md:p-8 border border-zinc-800">
            <h2 className="text-2xl font-semibold text-white mb-4">Troubleshooting</h2>
            <div className="space-y-3 text-zinc-300">
              {[
                                "Тренды не по теме\n→ Уточни нишу конкретнее: не \"бизнес\" а \"малый бизнес в России, e-commerce, WB и Ozon\"",
                                "Агент находит старые новости\n→ Добавь: \"ТОЛЬКО данные за последние 48 часов. Если источник старше 2 дней — не включай\"",
                                "Идеи слишком общие\n→ Добавь примеры своих лучших постов — агент поймёт какой контент работает именно у тебя",
                                "Хочу мониторинг каждое утро автоматически\n→ Блок 3: настроим cron — агент сам присылает дайджест в 8 утра",
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

          <BlockCompleteCard trackLabel="Контент — TG/IG, YouTube, Тренды" />

          <nav className="flex items-center justify-between text-sm text-zinc-400">
            <Link
              href="/dashboard/course/block/2/lesson/8"
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
