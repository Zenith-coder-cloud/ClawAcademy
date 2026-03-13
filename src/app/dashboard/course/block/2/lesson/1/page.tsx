"use client";

import Link from "next/link";
import {
  Checklist,
  ImagePlaceholder,
  LessonSteps,
  PromptCopyBlock,
  TimerBadge,
} from "../../components";
import { useState } from "react";

const lessonLinks = [
  { num: 1, title: "Агент-автоответчик", href: "/dashboard/course/block/2/lesson/1" },
  { num: 2, title: "Агент-ресёрчер", href: "/dashboard/course/block/2/lesson/2" },
  { num: 3, title: "Email-агент", href: "/dashboard/course/block/2/lesson/3" },
  { num: 4, title: "Контент-агент", href: "/dashboard/course/block/2/lesson/4" },
  { num: 5, title: "Агент-парсер рынка", href: "/dashboard/course/block/2/lesson/5" },
];

type AccordionItem = { title: string; content: string; hint?: string };

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
                <p className="mb-2">{item.content}</p>
                {item.hint && (
                  <div className="text-zinc-300 bg-zinc-900/60 border border-zinc-800 rounded-lg px-4 py-3">
                    {item.hint}
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default function Block2Lesson1Page() {
  return (
    <main className="min-h-screen bg-[#0D0D0D] text-zinc-200">
      <section className="border-b border-zinc-900">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <p className="text-[#FF4422] text-sm font-semibold mb-2">
            Блок 2 · Урок 1 из 5
          </p>
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <h1 className="text-3xl md:text-4xl font-bold text-white">
              Агент-автоответчик
            </h1>
            <TimerBadge text="⏱ 15 минут" />
          </div>
          <p className="text-zinc-400 text-lg">
            Научи агента отвечать за тебя пока ты занят
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
                    (1 === l.num
                      ? "bg-[#FF4422]/10 text-[#FF4422] font-semibold"
                      : "text-zinc-400 hover:text-white hover:bg-zinc-800")
                  }
                >
                  <span
                    className={
                      "w-5 h-5 rounded-full border flex items-center justify-center text-xs shrink-0 " +
                      (1 === l.num ? "border-[#FF4422]" : "border-zinc-600")
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
          <ImagePlaceholder label="Заглушка изображения урока 1" />

          <section className="bg-zinc-900 rounded-2xl p-6 md:p-8 border border-zinc-800">
            <h2 className="text-2xl font-semibold text-white mb-4">Зачем это нужно</h2>
            <p className="text-zinc-400 leading-relaxed">
              Ты получаешь десятки однотипных вопросов каждый день.
              «Сколько стоит?» «Ты свободен?» «Когда будет готово?»
              <br />
              <br />
              Вместо того чтобы отвечать вручную — один раз настраиваешь агента-автоответчика.
              Он работает 24/7, отвечает в твоём стиле, не забывает ни одного сообщения.
            </p>
          </section>

          <section className="bg-zinc-900 rounded-2xl p-6 md:p-8 border border-zinc-800">
            <h2 className="text-2xl font-semibold text-white mb-4">Кейс</h2>
            <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-5 text-zinc-300 space-y-2">
              <p className="font-semibold">📦 Кейс: Фрилансер-разработчик Антон</p>
              <p>Проблема: 40+ входящих сообщений в день, 80% — одни и те же вопросы</p>
              <p>Решение: Агент-автоответчик настроен за 12 минут</p>
              <p>Результат: 2 часа в день вернул себе. Ответы приходят мгновенно.</p>
              <p>Настройка: 1 раз ✅</p>
            </div>
          </section>

          <section className="bg-zinc-900 rounded-2xl p-6 md:p-8 border border-zinc-800">
            <h2 className="text-2xl font-semibold text-white mb-4">Как это работает</h2>
            <p className="text-zinc-400 leading-relaxed">
              Агент читает каждое входящее сообщение.
              Сравнивает с правилами которые ты задал.
              Отвечает — мгновенно, в твоём стиле.
              <br />
              <br />
              Ты видишь все диалоги. Можешь вмешаться в любой момент.
            </p>
          </section>

          <section className="bg-zinc-900 rounded-2xl p-6 md:p-8 border border-zinc-800">
            <h2 className="text-2xl font-semibold text-white mb-4">Готовый промпт</h2>
            <PromptCopyBlock
              instruction={
                "Скопируй этот промпт и вставь прямо в чат с агентом.\nПосле этого агент запомнит правила и будет отвечать по ним."
              }
              code={`Ты — мой личный автоответчик в Telegram.\n\nПравила ответов:\n— На вопрос о стоимости: "Стоимость зависит от задачи. Опишите что нужно — отвечу лично в течение часа"\n— На вопрос о сроках: "Сроки обсуждаются индивидуально. Расскажите подробнее о задаче"\n— На приветствие или «привет»: "Привет! Я сейчас занят, но отвечу позже. Если срочно — опишите задачу"\n— На всё остальное: "Получил ваше сообщение. Отвечу в течение [время]. Если срочно — звоните"\n\nВажно:\n— Отвечай вежливо, кратко, по-деловому\n— Не давай обещаний которые я не могу выполнить\n— Если вопрос явно срочный (слова «срочно», «горит», «сейчас») — добавь: "Понял, это срочно. Постараюсь ответить быстрее"\n— Не отвечай на служебные команды системы`}
            />
          </section>

          <section className="bg-zinc-900 rounded-2xl p-6 md:p-8 border border-zinc-800">
            <h2 className="text-2xl font-semibold text-white mb-4">Пошаговая настройка</h2>
            <LessonSteps
              steps={[
                "Шаг 1 — Открой чат с агентом в Telegram",
                'Шаг 2 — Нажми "Скопировать промпт" выше',
                "Шаг 3 — Вставь промпт и отправь",
                'Шаг 4 — Замени [время] на своё (например: "2 часа" или "до вечера")',
                'Шаг 5 — Отправь тестовое сообщение: "Сколько стоит разработка сайта?"',
                "Шаг 6 — Убедись что агент ответил правильно",
              ]}
            />
          </section>

          <section className="bg-zinc-900 rounded-2xl p-6 md:p-8 border border-zinc-800">
            <h2 className="text-2xl font-semibold text-white mb-4">Чеклист</h2>
            <Checklist
              storageKey="block2_lesson1_checklist"
              items={[
                "Открыл чат с агентом",
                "Скопировал и вставил промпт",
                "Настроил время ответа под себя",
                "Протестировал — агент ответил правильно",
                "✅ Агент-автоответчик активен",
              ]}
            />
          </section>

          <section className="bg-zinc-900 rounded-2xl p-6 md:p-8 border border-zinc-800">
            <h2 className="text-2xl font-semibold text-white mb-4">Как улучшить</h2>
            <Accordion
              items={[
                {
                  title: "Добавь свои FAQ",
                  content:
                    "Допиши в промпт конкретные вопросы которые тебе часто задают. Чем точнее — тем лучше ответы.",
                },
                {
                  title: "Настрой под нишу",
                  content:
                    "Замени \"разработка сайта\" на свой продукт/услугу. Агент станет ещё более точным.",
                },
                {
                  title: "Подключи к нескольким каналам",
                  content:
                    "Тот же промпт работает в Telegram, WhatsApp, Discord — везде где подключён агент.",
                },
              ]}
            />
          </section>

          <section className="bg-zinc-900 rounded-2xl p-6 md:p-8 border border-zinc-800">
            <h2 className="text-2xl font-semibold text-white mb-4">Troubleshooting</h2>
            <Accordion
              items={[
                {
                  title: "Агент отвечает не по шаблону",
                  content:
                    "Промпт слишком общий. Добавь конкретные примеры вопросов и ответов.",
                },
                {
                  title: "Агент игнорирует некоторые сообщения",
                  content:
                    "Добавь в конце промпта: \"На любое сообщение которое не попало в правила — отвечай: 'Получил, отвечу позже'\"",
                },
                {
                  title: "Агент отвечает слишком длинно",
                  content:
                    "Добавь в промпт: \"Ответы не длиннее 2 предложений. Никаких лишних слов.\"",
                },
                {
                  title: "Хочу чтобы агент не отвечал ночью",
                  content:
                    "Добавь правило: \"Если время ответа с 23:00 до 08:00 — добавь: 'Сейчас ночь, отвечу утром'\"",
                },
              ]}
            />
          </section>

          <nav className="flex items-center justify-between text-sm text-zinc-400">
            <Link
              href="/dashboard/course/block/2"
              className="hover:text-zinc-200 transition-colors"
            >
              ← Назад к блоку
            </Link>
            <Link
              href="/dashboard/course/block/2/lesson/2"
              className="text-[#FF4422] hover:text-[#ff5a3c] transition-colors"
            >
              Урок 2: Агент-ресёрчер →
            </Link>
          </nav>
        </div>
      </div>
    </main>
  );
}
