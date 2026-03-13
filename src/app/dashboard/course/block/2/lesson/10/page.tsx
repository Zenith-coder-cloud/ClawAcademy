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

export default function Block2Lesson10Page() {
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
            Блок 2 · Урок 10 из 17
          </p>
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <h1 className="text-3xl md:text-4xl font-bold text-white">
              Чат-бот поддержки клиентов
            </h1>
            <TimerBadge text="⏱ 25 минут" />
            <TrackBadge track="business" isRecommended={recommended === "business"} />
          </div>
          <p className="text-zinc-400 text-lg">
            Отвечай клиентам 24/7 — без менеджера, без задержек
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
                    (10 === l.num
                      ? "bg-[#FF4422]/10 text-[#FF4422] font-semibold"
                      : "text-zinc-400 hover:text-white hover:bg-zinc-800")
                  }
                >
                  <span
                    className={
                      "w-5 h-5 rounded-full border flex items-center justify-center text-xs shrink-0 " +
                      (10 === l.num ? "border-[#FF4422]" : "border-zinc-600")
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
          <ImagePlaceholder label="Заглушка изображения урока 10" />

          <section className="bg-zinc-900 rounded-2xl p-6 md:p-8 border border-zinc-800">
            <h2 className="text-2xl font-semibold text-white mb-4">Зачем это нужно</h2>
            <p className="text-zinc-400 leading-relaxed">
              Клиент написал в 23:00. Конкурент ответил через минуту. Ты — утром. Сделка ушла.<br />
              <br />
              Чат-бот поддержки отвечает мгновенно в любое время. Закрывает 80% типовых вопросов. Менеджер подключается только к сложным случаям.
            </p>
          </section>

          <section className="bg-zinc-900 rounded-2xl p-6 md:p-8 border border-zinc-800">
            <h2 className="text-2xl font-semibold text-white mb-4">Кейс</h2>
            <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-5 text-zinc-300 space-y-2">
                          <p className="font-semibold">📦 Кейс: Онлайн-школа английского &quot;SpeakUp&quot;</p>
                          <p>Ситуация: 200+ сообщений в день в Telegram, 3 менеджера не справлялись</p>
                          <p>До: среднее время ответа — 2.5 часа, 40% клиентов уходили</p>
                          <p>После: бот отвечает за 5 секунд, менеджер видит только сложные запросы</p>
                          <p>Конверсия в покупку: выросла с 12% до 28%</p>
                          <p>Нагрузка на менеджеров: снизилась на 70%</p>
                          <p>Время настройки: 24 минуты ✅</p>
            </div>
          </section>

          <section className="bg-zinc-900 rounded-2xl p-6 md:p-8 border border-zinc-800">
            <h2 className="text-2xl font-semibold text-white mb-4">Готовый промпт</h2>
            <PromptCopyBlock
              code={`Ты — официальный помощник [название компании]. Отвечаешь клиентам в Telegram.

О нас:
[замени] Краткое описание компании, продукта или услуги

Часто задаваемые вопросы (замени на свои):

В: Сколько стоит?
О: [твой ответ с конкретными ценами или ссылкой на прайс]

В: Как записаться / купить?
О: [пошаговая инструкция]

В: Сколько ждать доставки / результата?
О: [конкретный ответ]

В: Есть ли гарантия?
О: [условия гарантии]

В: Как вернуть / отменить?
О: [условия возврата]

Правила работы:
— Отвечай вежливо, конкретно, без воды
— Если вопрос не в FAQ — напиши: "Хороший вопрос! Передаю менеджеру, ответит в течение [время]"
— Никогда не придумывай информацию — только то что написано выше
— Если клиент злится — сочувствие, извинение, передача менеджеру
— В конце ответа всегда предлагай следующий шаг`}
            />
          </section>

          <section className="bg-zinc-900 rounded-2xl p-6 md:p-8 border border-zinc-800">
            <h2 className="text-2xl font-semibold text-white mb-4">Пошаговая настройка</h2>
            <LessonSteps
              steps={[
                            "Шаг 1 — Заполни описание компании и FAQ (минимум 5 вопросов)",
                            "Шаг 2 — Отправь агенту",
                            "Шаг 3 — Протестируй: напиши типичный вопрос клиента",
                            "Шаг 4 — Проверь ответ — точный? вежливый? не придумывает?",
                            "Шаг 5 — Добавь ещё 5-10 вопросов из реальных обращений",
                            "Шаг 6 — Протестируй сложный кейс: злой клиент, нестандартный вопрос",
              ]}
            />
          </section>

          <section className="bg-zinc-900 rounded-2xl p-6 md:p-8 border border-zinc-800">
            <h2 className="text-2xl font-semibold text-white mb-4">Чеклист</h2>
            <Checklist
              storageKey="block2_lesson10_checklist"
              items={[
                            "□ Заполнил описание компании",
                            "□ Добавил минимум 5 вопросов в FAQ",
                            "□ Протестировал типовые вопросы",
                            "□ Проверил сложный кейс (жалоба, нестандарт)",
                            "□ Бот не придумывает несуществующую информацию",
                            "✅ Чат-бот поддержки настроен",
              ]}
            />
          </section>

          <section className="bg-zinc-900 rounded-2xl p-6 md:p-8 border border-zinc-800">
            <h2 className="text-2xl font-semibold text-white mb-4">Troubleshooting</h2>
            <div className="space-y-3 text-zinc-300">
              {[
                                "Бот придумывает информацию\n→ Добавь жёстко: \"ЗАПРЕЩЕНО: давать любую информацию не из этого промпта. Лучше передать менеджеру.\"",
                                "Ответы слишком длинные\n→ Добавь: \"Каждый ответ — максимум 3 предложения. Чётко и по делу.\"",
                                "Клиент не доволен ботом\n→ Добавь ранний эскалейшн: \"Если клиент написал 'хочу человека' или 'позовите менеджера' → сразу: 'Понял! Менеджер свяжется с вами в течение [время]'\"",
                                "Нужно подключить к реальному боту в Telegram\n→ Это уже в уроке 2 блока 1 — у тебя уже есть Telegram агент. Этот промпт — инструкция для него.",
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
              href="/dashboard/course/block/2/lesson/2"
              className="hover:text-zinc-200 transition-colors"
            >
              ← Назад
            </Link>
            <Link
              href="/dashboard/course/block/2/lesson/5"
              className="text-[#FF4422] hover:text-[#ff5a3c] transition-colors"
            >
              Урок 5: Агент-парсер рынка →
            </Link>
          </nav>
        </div>
      </div>
    </main>
  );
}
