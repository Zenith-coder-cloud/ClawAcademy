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

export default function Block2Lesson4Page() {
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
            Блок 2 · Урок 4 из 5
          </p>
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <h1 className="text-3xl md:text-4xl font-bold text-white">
              Контент-агент
            </h1>
            <TimerBadge text="⏱ 20 минут" />
            <TrackBadge
              track="content"
              isRecommended={recommended === "content"}
            />
          </div>
          <p className="text-zinc-400 text-lg">
            Контент-план на неделю и готовые посты — за 20 минут
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
                    (4 === l.num
                      ? "bg-[#FF4422]/10 text-[#FF4422] font-semibold"
                      : "text-zinc-400 hover:text-white hover:bg-zinc-800")
                  }
                >
                  <span
                    className={
                      "w-5 h-5 rounded-full border flex items-center justify-center text-xs shrink-0 " +
                      (4 === l.num ? "border-[#FF4422]" : "border-zinc-600")
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
          <ImagePlaceholder label="Заглушка изображения урока 4" />

          <section className="bg-zinc-900 rounded-2xl p-6 md:p-8 border border-zinc-800">
            <h2 className="text-2xl font-semibold text-white mb-4">Зачем это нужно</h2>
            <p className="text-zinc-400 leading-relaxed">
              Идеи заканчиваются. Времени не хватает. Посты надо публиковать каждый день.
              А ещё нужно придумать хук, написать текст, подобрать хэштеги.
              <br />
              <br />
              Контент-агент не заменит тебя — но умножит твою скорость в 4 раза.
              Ты даёшь тему. Он даёт структуру, черновик, варианты.
            </p>
          </section>

          <section className="bg-zinc-900 rounded-2xl p-6 md:p-8 border border-zinc-800">
            <h2 className="text-2xl font-semibold text-white mb-4">Кейс</h2>
            <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-5 text-zinc-300 space-y-2">
              <p className="font-semibold">📦 Кейс: Блогер Алина, канал об инвестициях</p>
              <p>Ситуация: канал 8 000 подписчиков, нужно 2 поста в день</p>
              <p>До: 3 часа на контент ежедневно</p>
              <p>После: 40 минут — агент даёт план, Алина редактирует под себя</p>
              <p>Скорость создания: ×4</p>
              <p>Время настройки: 17 минут ✅</p>
            </div>
          </section>

          <section className="bg-zinc-900 rounded-2xl p-6 md:p-8 border border-zinc-800">
            <h2 className="text-2xl font-semibold text-white mb-4">Что умеет агент</h2>
            <div className="grid md:grid-cols-2 gap-3 text-zinc-300">
              {[
                "Генерирует контент-план на неделю (7 идей с описанием)",
                "Пишет готовый пост под Telegram (800–1200 символов)",
                "Пишет готовый пост под Instagram (300–500 символов + хэштеги)",
                "Придумывает хуки (первая строка которая зацепит)",
                "Предлагает 2 варианта заголовка на выбор",
                "Подбирает форматы: текст, карусель, опрос, личная история",
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
                "Перед копированием — замени 3 поля в квадратных скобках:\n[тема канала], [твой стиль], [твоя аудитория]\nЧем точнее опишешь — тем лучше будут посты."
              }
              code={`Ты — мой контент-менеджер.\n\nМоя тема: [замени на свою — например: "крипта и инвестиции для новичков"]\nМой стиль: [замени — например: "просто и дружелюбно, без сложных терминов, с примерами из жизни"]\nМоя аудитория: [замени — например: "25–40 лет, хотят разобраться в инвестициях с нуля"]\n\nКогда я прошу "контент-план на неделю":\n1. Придумай 7 идей постов по теме\n2. Для каждой: тема, главный тезис, хук (первая строка), формат\n3. Распредели по дням: 2 информационных, 2 личных/историй, 2 вовлекающих (опрос/вопрос), 1 с призывом\n\nКогда я прошу "напиши пост про [тему]":\n1. Напиши в моём стиле для моей аудитории\n2. Для Telegram: 800–1200 символов, без хэштегов\n3. Для Instagram: 300–500 символов + 5 хэштегов в конце\n4. Предложи 2 варианта первой строки (хука)\n5. В конце добавь краткий вариант для Stories (1–2 предложения)`}
            />
          </section>

          <section className="bg-zinc-900 rounded-2xl p-6 md:p-8 border border-zinc-800">
            <h2 className="text-2xl font-semibold text-white mb-4">Пошаговая настройка</h2>
            <LessonSteps
              steps={[
                "Шаг 1 — Заполни 3 поля в промпте: тема, стиль, аудитория",
                "Шаг 2 — Скопируй и отправь агенту",
                'Шаг 3 — Напиши: "контент-план на неделю"',
                "Шаг 4 — Получи 7 идей — выбери 1-2 которые нравятся",
                'Шаг 5 — Попроси: "напиши пост про [одна из идей]"',
                "Шаг 6 — Отредактируй под себя — добавь личный опыт, свои примеры",
              ]}
            />
          </section>

          <section className="bg-zinc-900 rounded-2xl p-6 md:p-8 border border-zinc-800">
            <h2 className="text-2xl font-semibold text-white mb-4">Чеклист</h2>
            <Checklist
              storageKey="block2_lesson4_checklist"
              items={[
                "Заполнил поля в промпте под свою нишу",
                "Отправил агенту",
                "Получил контент-план на неделю",
                "Попросил написать один пост",
                "Пост читается в твоём стиле",
                "✅ Контент-агент настроен",
              ]}
            />
          </section>

          <section className="bg-zinc-900 rounded-2xl p-6 md:p-8 border border-zinc-800">
            <h2 className="text-2xl font-semibold text-white mb-4">Советы по редактуре</h2>
            <Accordion
              items={[
                {
                  title: "Добавь личный опыт",
                  content:
                    "Агент пишет хорошо, но твой личный пример делает пост в 3 раза интереснее. 1–2 предложения от себя — и пост живой.",
                },
                {
                  title: "Используй вариант хука",
                  content:
                    "Агент предлагает 2 хука. Выбери тот который зацепил бы тебя самого. Первая строка решает всё.",
                },
                {
                  title: "Не публикуй без редактуры",
                  content:
                    "Черновик агента — основа, не финал. Прочти вслух. Если звучит не как ты — правь.",
                },
              ]}
            />
          </section>

          <section className="bg-zinc-900 rounded-2xl p-6 md:p-8 border border-zinc-800">
            <h2 className="text-2xl font-semibold text-white mb-4">Troubleshooting</h2>
            <div className="space-y-3 text-zinc-300">
              {[
                "Посты звучат роботизированно\n→ В поле \"стиль\" добавь конкретные примеры: \"пишу как разговариваю с другом, использую 'я', 'ты', иногда матерюсь\"",
                "Агент пишет слишком длинно\n→ Добавь в промпт: \"Строго: Telegram — не более 1000 символов. Убирай воду безжалостно.\"",
                "Идеи повторяются\n→ Добавь: \"Не повторяй темы которые мы уже обсуждали в этой сессии. Каждая идея — уникальный угол зрения.\"",
                "Нужны посты на другом языке\n→ Добавь в промпт: \"Пиши на [язык]\" или переключи язык запроса.",
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

          <BlockCompleteCard trackLabel="Контент-агент" />

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
