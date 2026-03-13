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

export default function Block2Lesson8Page() {
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
            Блок 2 · Урок 8 из 17
          </p>
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <h1 className="text-3xl md:text-4xl font-bold text-white">
              Агент для YouTube
            </h1>
            <TimerBadge text="⏱ 20 минут" />
            <TrackBadge track="content" isRecommended={recommended === "content"} />
          </div>
          <p className="text-zinc-400 text-lg">
            Сценарии, описания, теги и шорты — за 20 минут
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
                    (8 === l.num
                      ? "bg-[#FF4422]/10 text-[#FF4422] font-semibold"
                      : "text-zinc-400 hover:text-white hover:bg-zinc-800")
                  }
                >
                  <span
                    className={
                      "w-5 h-5 rounded-full border flex items-center justify-center text-xs shrink-0 " +
                      (8 === l.num ? "border-[#FF4422]" : "border-zinc-600")
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
          <ImagePlaceholder label="Заглушка изображения урока 8" />

          <section className="bg-zinc-900 rounded-2xl p-6 md:p-8 border border-zinc-800">
            <h2 className="text-2xl font-semibold text-white mb-4">Зачем это нужно</h2>
            <p className="text-zinc-400 leading-relaxed">
              YouTube — это не просто видео. Это заголовок, описание, теги, тайм-коды, шорт, пост в сообществе. На каждое видео уходит 3–4 часа работы вокруг контента.<br />
              <br />
              Агент берёт твою тему или тезисы — и выдаёт всё остальное. Ты снимаешь, он упаковывает.
            </p>
          </section>

          <section className="bg-zinc-900 rounded-2xl p-6 md:p-8 border border-zinc-800">
            <h2 className="text-2xl font-semibold text-white mb-4">Кейс</h2>
            <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-5 text-zinc-300 space-y-2">
                          <p className="font-semibold">📦 Кейс: Tech-блогер Артём, канал 45к подписчиков</p>
                          <p>Ситуация: 2 видео в неделю, каждое требовало 3 часа &quot;упаковки&quot;</p>
                          <p>До: 6 часов в неделю только на описания, теги, сценарии</p>
                          <p>После: агент делает всё за 20 минут, Артём только правит</p>
                          <p>Рост просмотров: +34% за 2 месяца (лучшие теги, точнее заголовки)</p>
                          <p>Время настройки: 18 минут ✅</p>
            </div>
          </section>

          <section className="bg-zinc-900 rounded-2xl p-6 md:p-8 border border-zinc-800">
            <h2 className="text-2xl font-semibold text-white mb-4">Готовый промпт</h2>
            <PromptCopyBlock
              code={`Ты — мой YouTube-продюсер. Помогаешь упаковывать контент для максимального охвата.

Мой канал: [замени — тема, стиль, аудитория]
Моя аудитория: [замени — кто смотрит, их боли и интересы]

Когда я даю тему или тезисы видео, делай:

1. ЗАГОЛОВОК (3 варианта):
   — SEO-заголовок (с ключевым словом, до 60 символов)
   — Кликбейт-заголовок (интрига, цифры)
   — Личный заголовок (от первого лица, история)

2. ОПИСАНИЕ (для YouTube):
   — Первые 2 строки — хук (видны до "Ещё")
   — Основное описание: о чём видео, что узнает зритель (200–300 слов)
   — Тайм-коды (если даю структуру)
   — Призыв: подписаться, комментарий, ссылки

3. ТЕГИ: 15–20 тегов — от широких к узким, на русском и английском

4. ШОРТ: вариант видео в формате 60 секунд — главная мысль + хук + вывод

5. ПОСТ В СООБЩЕСТВО: анонс видео (100–150 слов) + вопрос для вовлечения`}
            />
          </section>

          <section className="bg-zinc-900 rounded-2xl p-6 md:p-8 border border-zinc-800">
            <h2 className="text-2xl font-semibold text-white mb-4">Пошаговая настройка</h2>
            <LessonSteps
              steps={[
                            "Шаг 1 — Заполни описание канала и аудитории",
                            "Шаг 2 — Отправь агенту",
                            "Шаг 3 — Напиши: \"Тема: [тема видео]. Главные мысли: [3-5 тезисов]\"",
                            "Шаг 4 — Получи всю упаковку: заголовки, описание, теги, шорт, пост",
                            "Шаг 5 — Выбери лучший заголовок, скорректируй описание",
                            "Шаг 6 — Скопируй теги прямо в YouTube Studio",
              ]}
            />
          </section>

          <section className="bg-zinc-900 rounded-2xl p-6 md:p-8 border border-zinc-800">
            <h2 className="text-2xl font-semibold text-white mb-4">Чеклист</h2>
            <Checklist
              storageKey="block2_lesson8_checklist"
              items={[
                            "□ Описал канал и аудиторию в промпте",
                            "□ Получил 3 варианта заголовка",
                            "□ Получил описание с хуком и тайм-кодами",
                            "□ Получил 15+ тегов",
                            "□ Получил вариант для Шортс",
                            "✅ Агент для YouTube настроен",
              ]}
            />
          </section>

          <section className="bg-zinc-900 rounded-2xl p-6 md:p-8 border border-zinc-800">
            <h2 className="text-2xl font-semibold text-white mb-4">Troubleshooting</h2>
            <div className="space-y-3 text-zinc-300">
              {[
                                "Заголовки не цепляют\n→ Добавь примеры заголовков с твоего канала которые дали много просмотров — агент поймёт твой стиль",
                                "Описание слишком общее\n→ Давай агенту больше тезисов: не \"про крипту\", а \"объясняю почему биткоин упал 15% за неделю — три причины с графиками\"",
                                "Теги нерелевантные\n→ Добавь в промпт: \"Используй теги которые реально ищут на YouTube, не общие слова\"",
                                "Нужен сценарий а не только упаковка\n→ Добавь команду в промпт: \"напиши сценарий\" — структура по таймингу, переходы, призывы",
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
              href="/dashboard/course/block/2/lesson/4"
              className="hover:text-zinc-200 transition-colors"
            >
              ← Назад
            </Link>
            <Link
              href="/dashboard/course/block/2/lesson/9"
              className="text-[#FF4422] hover:text-[#ff5a3c] transition-colors"
            >
              Урок 9: Агент трендов →
            </Link>
          </nav>
        </div>
      </div>
    </main>
  );
}
