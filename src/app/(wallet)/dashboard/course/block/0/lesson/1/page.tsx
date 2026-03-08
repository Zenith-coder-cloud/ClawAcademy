"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

/* ------------------------------------------------------------------ */
/*  Quiz data                                                         */
/* ------------------------------------------------------------------ */
const quizQuestions = [
  {
    question: "Что отличает ИИ-агента от чат-бота?",
    options: [
      "Агент использует более умную модель",
      "Агент выполняет действия в реальном мире",
      "Агент стоит дороже",
      "Агент работает только в браузере",
    ],
    correct: 1,
    explanation:
      "Главное отличие агента — он не просто отвечает, а выполняет реальные действия: отправляет письма, бронирует встречи, работает с файлами.",
  },
  {
    question: "OpenClaw — это:",
    options: [
      "Облачный сервис от OpenAI",
      "Бесплатная self-hosted система с открытым кодом",
      "Мобильное приложение для iPhone",
      "Плагин для ChatGPT",
    ],
    correct: 1,
    explanation:
      "OpenClaw — бесплатная программа с открытым кодом, которая запускается на твоём устройстве и соединяет мессенджеры с ИИ-агентом.",
  },
  {
    question: "Через какие мессенджеры можно работать с OpenClaw?",
    options: [
      "Только Telegram",
      "Только WhatsApp и Discord",
      "Telegram, WhatsApp, Discord, iMessage, Signal, Slack и 12+ других",
      "Только через веб-интерфейс",
    ],
    correct: 2,
    explanation:
      "OpenClaw поддерживает Telegram, WhatsApp, Discord, iMessage, Signal, Slack и более 12 других платформ.",
  },
  {
    question: "Сводка погоды каждое утро автоматически — это задача для:",
    options: [
      "Чат-бота",
      "ИИ-агента с расписанием",
      "Любого из них",
      "Только платных сервисов",
    ],
    correct: 1,
    explanation:
      "Автоматическая отправка по расписанию требует автономности — это задача для ИИ-агента, чат-бот не может действовать сам.",
  },
  {
    question: "Где хранятся данные при использовании OpenClaw?",
    options: [
      "На серверах OpenClaw",
      "На серверах OpenAI",
      "На твоём собственном устройстве",
      "В Telegram",
    ],
    correct: 2,
    explanation:
      "OpenClaw — self-hosted решение. Все данные остаются на твоём собственном устройстве или сервере.",
  },
];

/* ------------------------------------------------------------------ */
/*  Checkmark icon                                                    */
/* ------------------------------------------------------------------ */
function Check() {
  return (
    <svg
      className="w-5 h-5 text-[#FF4422] shrink-0 mt-0.5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={3}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Section image helper                                              */
/* ------------------------------------------------------------------ */
function SectionImage({ src, caption }: { src: string; caption: string }) {
  return (
    <figure className="my-6">
      <Image
        src={src}
        alt={caption}
        width={1200}
        height={675}
        className="rounded-xl w-full"
      />
      <figcaption className="text-zinc-500 text-sm text-center mt-2">
        {caption}
      </figcaption>
    </figure>
  );
}

/* ------------------------------------------------------------------ */
/*  Quiz component                                                    */
/* ------------------------------------------------------------------ */
function Quiz() {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const q = quizQuestions[current];

  function handleSelect(idx: number) {
    if (selected !== null) return; // already answered
    setSelected(idx);
    if (idx === q.correct) setScore((s) => s + 1);
  }

  function handleNext() {
    if (current + 1 >= quizQuestions.length) {
      setFinished(true);
    } else {
      setCurrent((c) => c + 1);
      setSelected(null);
    }
  }

  if (finished) {
    const msg =
      score === 5
        ? "Отлично! Идеальный результат!"
        : score >= 3
          ? "Хороший результат! Ты усвоил основы."
          : "Стоит перечитать урок и попробовать снова.";

    return (
      <div className="text-center py-8">
        <p className="text-4xl font-bold text-white mb-2">
          {score}/{quizQuestions.length}
        </p>
        <p className="text-zinc-400 mb-6">{msg}</p>
        <Link
          href="/dashboard/course/block/0/lesson/2"
          className="inline-block px-8 py-3 bg-[#FF4422] hover:bg-[#e63d1e] text-white font-semibold rounded-lg transition-colors"
        >
          Следующий урок
        </Link>
      </div>
    );
  }

  return (
    <div>
      {/* Progress bar */}
      <div className="flex items-center gap-3 mb-6">
        <span className="text-zinc-500 text-sm font-medium">
          {current + 1}/{quizQuestions.length}
        </span>
        <div className="flex-1 h-2 bg-zinc-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-[#FF4422] rounded-full transition-all duration-300"
            style={{
              width: `${((current + 1) / quizQuestions.length) * 100}%`,
            }}
          />
        </div>
      </div>

      <p className="text-white text-lg font-semibold mb-4">{q.question}</p>

      <div className="flex flex-col gap-3">
        {q.options.map((opt, idx) => {
          let cls =
            "w-full text-left px-4 py-3 rounded-lg border transition-colors text-sm ";

          if (selected === null) {
            cls +=
              "bg-zinc-800 border-zinc-700 text-zinc-300 hover:border-zinc-500 cursor-pointer";
          } else if (idx === q.correct) {
            cls +=
              "bg-green-900/50 border-green-500 text-green-300 cursor-default";
          } else if (idx === selected) {
            cls += "bg-red-900/50 border-red-500 text-red-300 cursor-default";
          } else {
            cls +=
              "bg-zinc-800 border-zinc-700 text-zinc-500 cursor-default";
          }

          return (
            <button key={idx} className={cls} onClick={() => handleSelect(idx)}>
              {opt}
            </button>
          );
        })}
      </div>

      {selected !== null && (
        <div className="mt-4">
          <p className="text-zinc-400 text-sm mb-4">{q.explanation}</p>
          <button
            onClick={handleNext}
            className="px-6 py-2.5 bg-[#FF4422] hover:bg-[#e63d1e] text-white font-medium rounded-lg transition-colors text-sm"
          >
            {current + 1 < quizQuestions.length ? "Далее" : "Результат"}
          </button>
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main page                                                         */
/* ------------------------------------------------------------------ */
export default function Block0Lesson1Page() {
  return (
    <main className="min-h-screen bg-[#0D0D0D]">
      {/* ── Hero ── */}
      <section className="relative w-full aspect-[16/7] md:aspect-[16/6]">
        <Image
          src="/course/block0/lesson1/b0-l1-cover.png"
          alt="Block 0 Lesson 1 cover"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0D0D0D]" />
        <div className="absolute bottom-0 left-0 right-0 px-4 pb-6 md:pb-10">
          <div className="max-w-4xl mx-auto">
            {/* Breadcrumb */}
            <nav className="text-zinc-500 text-sm mb-3 flex items-center gap-1.5">
              <Link href="/dashboard" className="hover:text-zinc-300 transition-colors">
                Dashboard
              </Link>
              <span>/</span>
              <span>Block 0</span>
              <span>/</span>
              <span className="text-zinc-300">Урок 1</span>
            </nav>
            <span className="inline-block px-3 py-1 bg-[#FF4422] text-white text-xs font-bold rounded mb-3">
              0
            </span>
            <h1 className="text-2xl md:text-4xl font-bold text-white leading-tight">
              Что такое ИИ-агент и чем он отличается от чат-бота
            </h1>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-10 flex flex-col gap-6">
        {/* ── Goals ── */}
        <section className="bg-zinc-900 rounded-xl p-6">
          <h2 className="text-2xl font-bold text-white mb-4">Цели урока</h2>
          <ul className="flex flex-col gap-3">
            {[
              "Понять разницу между чат-ботом и ИИ-агентом на простых примерах",
              "Узнать что такое OpenClaw и зачем он нужен без технического образования",
              "Понять ключевое преимущество агентов: они не просто отвечают — они действуют",
              "Познакомиться с реальными задачами которые ИИ-агент выполняет автономно",
              "Получить первое представление о работе с агентом через Telegram и другие мессенджеры",
            ].map((goal, i) => (
              <li key={i} className="flex items-start gap-3">
                <Check />
                <span className="text-zinc-400 leading-relaxed">{goal}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* ── ВВЕДЕНИЕ ── */}
        <section className="bg-zinc-900 rounded-xl p-6">
          <h2 className="text-2xl font-bold text-white mb-4">Введение</h2>
          <p className="text-zinc-400 leading-relaxed">
            Представь что ты нанял помощника. Обычный помощник когда ты задаёшь
            ему вопрос просто говорит ответ. Хороший помощник которому доверяешь
            полностью не только говорит — он бронирует столик, добавляет встречу
            в твой календарь и присылает напоминание за час. Вот в чём разница
            между чат-ботом и ИИ-агентом. OpenClaw — это именно такой агент. Ты
            устанавливаешь его один раз, подключаешь к Telegram или WhatsApp, и
            общаешься с ним как с живым человеком: проверь почту, напиши пост,
            забронируй звонок. Агент слышит и делает.
          </p>
          <SectionImage
            src="/course/block0/lesson1/b0l1-01-intro-comparison.png"
            caption="Чат-бот отвечает. Агент действует."
          />
        </section>

        {/* ── ЧАСТЬ 1 ── */}
        <section className="bg-zinc-900 rounded-xl p-6">
          <h2 className="text-2xl font-bold text-white mb-4">
            Часть 1: Чат-бот — отвечает, но не действует
          </h2>
          <p className="text-zinc-400 leading-relaxed">
            Чат-бот работает по простому принципу: ты задаёшь вопрос — он
            отвечает. Каждый разговор начинается с нуля, у бота нет памяти о
            прошлых беседах, он не может сам инициировать действие и не
            взаимодействует с внешним миром без твоей команды каждый раз.
          </p>
          <SectionImage
            src="/course/block0/lesson1/b0l1-02-chatbot-limits.png"
            caption="Что умеет и чего не умеет чат-бот"
          />
        </section>

        {/* ── ЧАСТЬ 2 ── */}
        <section className="bg-zinc-900 rounded-xl p-6">
          <h2 className="text-2xl font-bold text-white mb-4">
            Часть 2: ИИ-агент — планирует, действует, завершает
          </h2>
          <p className="text-zinc-400 leading-relaxed">
            ИИ-агент — это другой уровень. Ключевое слово здесь — автономность.
            Агент получает задачу, сам разбивает её на шаги, сам выбирает нужные
            инструменты, выполняет их один за другим и возвращается к тебе с
            результатом.
          </p>
          <SectionImage
            src="/course/block0/lesson1/b0l1-03-agent-loop.png"
            caption="Петля автономного агента"
          />
          <p className="text-zinc-400 leading-relaxed">
            Разберём на конкретном примере. Задача: проверь мою почту, найди
            письма от клиентов за эту неделю, составь краткую сводку и сохрани в
            папку Отчёты. Чат-бот: не может. Не имеет доступа к твоей почте.
            ИИ-агент: открывает почтовый клиент, фильтрует письма, генерирует
            отчёт, сохраняет файл, присылает уведомление: Готово. Нашёл 7 писем,
            сводка сохранена.
          </p>
          <SectionImage
            src="/course/block0/lesson1/b0l1-04-before-after.png"
            caption="До и после: задача с почтой"
          />
        </section>

        {/* ── ЧАСТЬ 3 ── */}
        <section className="bg-zinc-900 rounded-xl p-6">
          <h2 className="text-2xl font-bold text-white mb-4">
            Часть 3: Что такое OpenClaw
          </h2>
          <p className="text-zinc-400 leading-relaxed">
            OpenClaw — это бесплатная программа с открытым кодом. Она запускается
            на твоём компьютере или сервере и выступает как мост между твоими
            любимыми мессенджерами и ИИ-агентом.
          </p>
          <SectionImage
            src="/course/block0/lesson1/b0l1-05-openclaw-hub.png"
            caption="OpenClaw как центральный хаб"
          />
          <p className="text-zinc-400 leading-relaxed">
            Что OpenClaw реально умеет: подключение к Telegram, WhatsApp,
            Discord, iMessage, Signal, Slack и 12+ другим платформам. Работа с
            файлами на твоём компьютере. Автоматизация по расписанию. Выбор любой
            ИИ-модели. Твои данные остаются у тебя.
          </p>
          <SectionImage
            src="/course/block0/lesson1/b0l1-06-features-grid.png"
            caption="6 ключевых возможностей OpenClaw"
          />
        </section>

        {/* ── Practice ── */}
        <section className="bg-zinc-900 rounded-xl p-6">
          <h2 className="text-2xl font-bold text-white mb-4">Практика</h2>
          <p className="text-zinc-400 leading-relaxed mb-2">
            <span className="text-white font-semibold">
              Упражнение: классификация задач
            </span>
          </p>
          <p className="text-zinc-400 leading-relaxed">
            Раздели задачи на два столбца — что может сделать чат-бот и что
            требует агента. Это поможет понять разницу на практике.
          </p>
          <SectionImage
            src="/course/block0/lesson1/b0l1-07-task-classification.png"
            caption="Классификация задач: чат-бот vs агент"
          />
        </section>

        {/* ── Quiz ── */}
        <section className="bg-zinc-900 rounded-xl p-6">
          <SectionImage
            src="/course/block0/lesson1/b0l1-08-quiz-banner.png"
            caption=""
          />
          <h2 className="text-2xl font-bold text-white mb-4">Проверь себя</h2>
          <Quiz />
        </section>

        {/* ── Navigation ── */}
        <div className="flex gap-4 mt-4">
          <button
            disabled
            className="flex-1 py-3 bg-zinc-800 text-zinc-600 font-medium rounded-lg cursor-not-allowed text-sm"
          >
            Предыдущий урок
          </button>
          <Link
            href="/dashboard/course/block/0/lesson/2"
            className="flex-1 py-3 bg-[#FF4422] hover:bg-[#e63d1e] text-white font-medium rounded-lg transition-colors text-sm text-center"
          >
            Следующий урок →
          </Link>
        </div>
      </div>
    </main>
  );
}
