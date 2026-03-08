"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

/* ------------------------------------------------------------------ */
/*  Quiz data                                                         */
/* ------------------------------------------------------------------ */
const quizQuestions = [
  {
    question: "Что отличает ИИ-агента от обычного чат-бота?",
    options: [
      "Агент использует более умную языковую модель",
      "Агент может выполнять действия в реальном мире: читать файлы, отправлять сообщения, работать по расписанию",
      "Агент стоит дороже",
      "Агент работает только в браузере",
    ],
    correct: 1,
    explanation:
      "Ключевое отличие — агент не просто отвечает на вопросы, а выполняет реальные задачи с доступом к инструментам.",
  },
  {
    question: "OpenClaw — это:",
    options: [
      "Облачный сервис от OpenAI",
      "Бесплатная self-hosted система с открытым кодом для запуска ИИ-агента на своём устройстве",
      "Мобильное приложение для iPhone",
      "Плагин для ChatGPT",
    ],
    correct: 1,
    explanation:
      "OpenClaw запускается на твоём компьютере или сервере, является open-source и не зависит от конкретного облачного провайдера.",
  },
  {
    question: "Через какие мессенджеры можно общаться с OpenClaw?",
    options: [
      "Только через Telegram",
      "Только через WhatsApp и Discord",
      "Telegram, WhatsApp, Discord, iMessage, Signal, Slack и более 12 других платформ",
      "Только через веб-интерфейс",
    ],
    correct: 2,
    explanation:
      "OpenClaw поддерживает широкий список каналов — ты общаешься там, где удобно.",
  },
  {
    question:
      "Если тебе нужно каждое утро автоматически получать сводку погоды — это задача для:",
    options: [
      "Чат-бота (напишу запрос каждое утро вручную)",
      "ИИ-агента с cron-расписанием",
      "Любого из них, разницы нет",
      "Только для платных сервисов",
    ],
    correct: 1,
    explanation:
      "Регулярные автоматические задачи — прерогатива агента. Чат-бот выполняет только то, что ты запросил прямо сейчас.",
  },
  {
    question: "Где хранятся твои данные при использовании OpenClaw?",
    options: [
      "На серверах OpenClaw в облаке",
      "На серверах OpenAI",
      "На твоём собственном устройстве (компьютер или сервер)",
      "В Telegram",
    ],
    correct: 2,
    explanation:
      "OpenClaw — self-hosted. Твои файлы, история, настройки — всё остаётся на твоём железе.",
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
              "Понять разницу между чат-ботом и ИИ-агентом на простых примерах из жизни",
              "Узнать, что такое OpenClaw и зачем он нужен обычному человеку без технического образования",
              "Понять ключевое преимущество агентов: они не просто отвечают - они действуют",
              "Познакомиться с реальными задачами, которые ИИ-агент выполняет автономно",
              "Получить первое представление о том, как выглядит работа с агентом через Telegram, WhatsApp или другой мессенджер",
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
          <h2 className="text-2xl font-bold text-white mb-4">
            Введение: твой новый сотрудник, который никогда не спит
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-4">
            Представь, что ты нанял помощника. Обычный помощник, когда ты
            задаёшь ему вопрос &quot;где лучший ресторан рядом?&quot;, просто говорит:
            &quot;Вот три варианта на карте.&quot; Хороший помощник, которому доверяешь
            полностью, не только говорит - он бронирует столик, добавляет встречу
            в твой календарь и присылает тебе напоминание за час.
          </p>
          <p className="text-zinc-400 leading-relaxed mb-4">
            Вот в чём разница между чат-ботом и ИИ-агентом.
          </p>
          <p className="text-zinc-400 leading-relaxed mb-4">
            Чат-боты - это первый помощник. Они отвечают на вопросы, генерируют
            текст, объясняют. ChatGPT в базовом режиме - это чат-бот. Ты
            пишешь, он отвечает. Цикл на этом заканчивается.
          </p>
          <p className="text-zinc-400 leading-relaxed mb-4">
            ИИ-агент - это второй помощник. Он не просто говорит, что делать -
            он идёт и делает. Открывает файлы, отправляет сообщения, читает
            твою почту, управляет расписанием, мониторит сайты. И всё это -
            пока ты занимаешься другими делами.
          </p>
          <p className="text-zinc-400 leading-relaxed mb-4">
            OpenClaw - это именно такой агент. Ты устанавливаешь его один раз на
            свой компьютер или сервер, подключаешь к Telegram (или WhatsApp,
            Discord, iMessage), и дальше общаешься с ним как с живым человеком:
            &quot;проверь почту&quot;, &quot;напиши пост для Instagram&quot;, &quot;забронируй звонок на
            пятницу.&quot; Агент слышит - и делает.
          </p>
          <p className="text-zinc-400 leading-relaxed">
            В этом уроке ты разберёшься в фундаментальной разнице между
            чат-ботом и ИИ-агентом, познакомишься с OpenClaw и поймёшь, почему
            это один из самых мощных инструментов автоматизации 2026 года.
          </p>
          <SectionImage
            src="/course/block0/lesson1/b0l1-01-intro-comparison.png"
            caption="Чат-бот: вопрос-ответ-конец vs Агент: запрос-план-действие-результат"
          />
        </section>

        {/* ── ЧАСТЬ 1 ── */}
        <section className="bg-zinc-900 rounded-xl p-6">
          <h2 className="text-2xl font-bold text-white mb-4">
            Часть 1: Чат-бот — отвечает, но не действует
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-4">
            Чат-бот работает по простому принципу: ты задаёшь вопрос - он
            отвечает. Каждый разговор начинается с нуля, у бота нет памяти о
            прошлых беседах (если только разработчики не добавили эту функцию
            специально), он не может сам инициировать действие, и он не
            взаимодействует с внешним миром без твоей команды каждый раз.
          </p>

          <p className="text-white font-semibold mb-2">Примеры чат-ботов:</p>
          <ul className="text-zinc-400 leading-relaxed mb-4 list-disc list-inside space-y-1">
            <li>ChatGPT в режиме обычного чата (без плагинов и агентов)</li>
            <li>Телеграм-боты, которые отвечают на FAQ в магазине</li>
            <li>Виртуальные ассистенты на сайтах (&quot;Чем могу помочь?&quot;)</li>
          </ul>

          <p className="text-white font-semibold mb-2">
            Чат-боты отлично справляются с:
          </p>
          <ul className="text-zinc-400 leading-relaxed mb-4 list-disc list-inside space-y-1">
            <li>Ответами на стандартные вопросы</li>
            <li>Генерацией текста по запросу</li>
            <li>Объяснением концепций</li>
          </ul>

          <p className="text-white font-semibold mb-2">Но они не могут:</p>
          <ul className="text-zinc-400 leading-relaxed mb-4 list-disc list-inside space-y-1">
            <li>Сами прочитать файл на твоём компьютере</li>
            <li>
              Отправить письмо без того, чтобы ты его скопировал вручную
            </li>
            <li>
              Запомнить, о чём вы говорили вчера (в большинстве случаев)
            </li>
            <li>Работать в фоне пока ты спишь</li>
          </ul>

          <SectionImage
            src="/course/block0/lesson1/b0l1-02-chatbot-limits.png"
            caption="Схема «Чат-бот: вопрос-ответ-конец» в сравнении с «Агент: запрос-план-действие-результат»"
          />
        </section>

        {/* ── ЧАСТЬ 2 ── */}
        <section className="bg-zinc-900 rounded-xl p-6">
          <h2 className="text-2xl font-bold text-white mb-4">
            Часть 2: ИИ-агент — планирует, действует, завершает
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-4">
            ИИ-агент - это другой уровень. Ключевое слово здесь -{" "}
            <span className="text-white font-semibold">автономность</span>.
            Агент получает задачу, сам разбивает её на шаги, сам выбирает нужные
            инструменты, выполняет их один за другим и возвращается к тебе с
            результатом.
          </p>

          <p className="text-zinc-400 leading-relaxed mb-2">
            Разберём на конкретном примере:
          </p>
          <p className="text-zinc-400 leading-relaxed mb-4">
            <span className="text-white font-semibold">Задача:</span>{" "}
            &quot;Проверь мою почту, найди письма от клиентов за эту неделю, составь
            краткую сводку и сохрани её в папку Отчёты.&quot;
          </p>
          <ul className="text-zinc-400 leading-relaxed mb-4 list-disc list-inside space-y-1">
            <li>
              <span className="text-white font-semibold">Чат-бот:</span> не
              может. Не имеет доступа к твоей почте, не знает, где папка
              Отчёты.
            </li>
            <li>
              <span className="text-white font-semibold">
                ИИ-агент (OpenClaw):
              </span>{" "}
              открывает почтовый клиент, фильтрует письма по дате и
              отправителям, генерирует текстовый отчёт, сохраняет файл.
              Присылает тебе уведомление: &quot;Готово. Нашёл 7 писем, сводка
              сохранена.&quot;
            </li>
          </ul>

          <SectionImage
            src="/course/block0/lesson1/b0l1-03-agent-loop.png"
            caption="Петля автономного агента: задача → план → действия → результат"
          />

          <p className="text-zinc-400 leading-relaxed mb-4">
            Это и есть агентское поведение. Три ключевых отличия от чат-бота:
          </p>
          <ol className="text-zinc-400 leading-relaxed mb-4 list-decimal list-inside space-y-2">
            <li>
              <span className="text-white font-semibold">Инструменты</span> -
              агент может использовать реальные программы: браузер, почту,
              файловую систему, мессенджеры, API сервисов
            </li>
            <li>
              <span className="text-white font-semibold">Память</span> - агент
              помнит предыдущие разговоры и контекст (&quot;то, о чём мы говорили
              вчера&quot;)
            </li>
            <li>
              <span className="text-white font-semibold">Автономность</span> -
              агент может работать по расписанию без твоей команды каждый раз
            </li>
          </ol>

          <SectionImage
            src="/course/block0/lesson1/b0l1-04-before-after.png"
            caption="До и после: задача с почтой"
          />
        </section>

        {/* ── ЧАСТЬ 3 ── */}
        <section className="bg-zinc-900 rounded-xl p-6">
          <h2 className="text-2xl font-bold text-white mb-4">
            Часть 3: Что такое OpenClaw — факты, без выдумок
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-4">
            OpenClaw - это бесплатная программа с открытым кодом, разработанная
            Питером Штайнбергером. Она запускается на твоём компьютере или
            сервере и выступает как &quot;мост&quot; между твоими любимыми мессенджерами и
            ИИ-агентом.
          </p>
          <p className="text-zinc-400 leading-relaxed mb-4">
            Вот что OpenClaw реально умеет (по официальной документации):
          </p>

          <p className="text-white font-semibold mb-1">
            Подключение к мессенджерам:
          </p>
          <p className="text-zinc-400 leading-relaxed mb-4">
            Telegram, WhatsApp, Discord, iMessage, Signal, Slack, Microsoft
            Teams, Matrix, Google Chat, LINE, IRC, Mattermost и другие - более
            12 платформ. Ты пишешь агенту там, где привык общаться.
          </p>

          <p className="text-white font-semibold mb-1">
            Работа с файлами и системой:
          </p>
          <p className="text-zinc-400 leading-relaxed mb-4">
            Агент читает файлы на твоём компьютере, запускает команды, управляет
            рабочим пространством. Всё хранится в обычных Markdown-файлах -
            можно открыть в любом редакторе.
          </p>

          <p className="text-white font-semibold mb-1">Автоматизация:</p>
          <p className="text-zinc-400 leading-relaxed mb-4">
            Cron-задачи (по расписанию), вебхуки, хуки на события - агент может
            проверять почту каждое утро или присылать сводку новостей в 9:00, не
            требуя твоей команды.
          </p>

          <p className="text-white font-semibold mb-1">Выбор ИИ-модели:</p>
          <p className="text-zinc-400 leading-relaxed mb-4">
            Ты сам решаешь, какой ИИ использовать - Claude (Anthropic), GPT-4
            (OpenAI), DeepSeek, или даже локальные модели на твоём железе. Ключ
            API - твой.
          </p>

          <p className="text-white font-semibold mb-1">Приватность:</p>
          <p className="text-zinc-400 leading-relaxed mb-4">
            Поскольку OpenClaw работает на твоём устройстве, твои данные не
            уходят на чужие сервера (только запросы к API той модели, которую ты
            выбрал). Для бизнеса и личной жизни это критически важно.
          </p>

          <p className="text-white font-semibold mb-1">
            Расширения (Skills):
          </p>
          <p className="text-zinc-400 leading-relaxed mb-4">
            Через ClawHub можно устанавливать дополнительные навыки: работа с
            Google Calendar, Notion, GitHub, управление умным домом, работа с PDF
            и многое другое.
          </p>

          <SectionImage
            src="/course/block0/lesson1/b0l1-05-openclaw-hub.png"
            caption="OpenClaw как центральный хаб"
          />
          <SectionImage
            src="/course/block0/lesson1/b0l1-06-features-grid.png"
            caption="6 ключевых возможностей OpenClaw"
          />
        </section>

        {/* ── ЧАСТЬ 4 ── */}
        <section className="bg-zinc-900 rounded-xl p-6">
          <h2 className="text-2xl font-bold text-white mb-4">
            Часть 4: Почему это важно именно сейчас
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-4">
            В начале 2026 года OpenClaw собрал более 247 000 звёзд на GitHub за
            несколько недель - это один из самых быстро растущих проектов в
            истории open-source. Почему такой взрывной интерес?
          </p>
          <p className="text-zinc-400 leading-relaxed mb-4">
            Потому что люди начали понимать разницу между &quot;поговорить с ИИ&quot; и
            &quot;заставить ИИ работать на тебя.&quot;
          </p>
          <p className="text-zinc-400 leading-relaxed mb-4">
            ChatGPT, Claude, Gemini - они отлично умеют генерировать текст и
            объяснять сложные вещи. Но они работают в облаке, не имеют доступа к
            твоим личным данным (если ты специально не загружаешь файлы), и
            каждый разговор - это закрытый контейнер.
          </p>
          <p className="text-zinc-400 leading-relaxed">
            OpenClaw - это агент, который живёт рядом с тобой: знает твои файлы,
            твою почту, твой календарь, твои привычки. И при этом ты
            контролируешь, где хранятся данные.
          </p>
        </section>

        {/* ── ПРАКТИКА ── */}
        <section className="bg-zinc-900 rounded-xl p-6">
          <h2 className="text-2xl font-bold text-white mb-4">
            Практика на руках
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            Пока мы ещё не устанавливали OpenClaw (это будет в Блоке 1), выполни
            следующие упражнения мысленно - они помогут закрепить разницу между
            чат-ботом и агентом.
          </p>

          <h3 className="text-lg font-semibold text-white mb-2">
            Упражнение 1: Классификация задач
          </h3>
          <p className="text-zinc-400 leading-relaxed mb-2">
            Возьми лист бумаги и раздели его на два столбца: &quot;Чат-бот
            справится&quot; и &quot;Нужен агент.&quot;
          </p>
          <p className="text-zinc-400 leading-relaxed mb-2">
            Распредели следующие задачи:
          </p>
          <ul className="text-zinc-400 leading-relaxed mb-4 list-disc list-inside space-y-1">
            <li>
              Написать пост для Instagram на тему &quot;5 советов по утренней
              рутине&quot;
            </li>
            <li>Каждое утро в 8:00 присылать тебе сводку погоды</li>
            <li>Объяснить, что такое блокчейн, простыми словами</li>
            <li>
              Прочитать входящие письма и ответить на типовые вопросы клиентов
            </li>
            <li>Придумать 10 названий для нового продукта</li>
            <li>
              Мониторить сайт конкурента и уведомлять при изменении цен
            </li>
          </ul>
          <p className="text-white font-semibold mb-1">Ожидаемый ответ:</p>
          <ul className="text-zinc-400 leading-relaxed mb-6 list-disc list-inside space-y-1">
            <li>
              Чат-бот: написать пост, объяснить блокчейн, придумать названия
            </li>
            <li>
              Агент: сводка погоды по расписанию, ответы на письма, мониторинг
              сайта
            </li>
          </ul>

          <SectionImage
            src="/course/block0/lesson1/b0l1-07-task-classification.png"
            caption="Классификация задач: чат-бот vs агент"
          />

          <h3 className="text-lg font-semibold text-white mb-2">
            Упражнение 2: Опиши своего идеального агента
          </h3>
          <p className="text-zinc-400 leading-relaxed mb-2">
            Представь: у тебя есть персональный ИИ-ассистент, доступный через
            Telegram. Напиши 3-5 задач, которые ты хотел бы делегировать ему
            прямо сейчас. Не ограничивай себя - это просто brainstorm.
          </p>
          <p className="text-zinc-400 leading-relaxed mb-2">
            Примеры ответов студентов:
          </p>
          <ul className="text-zinc-400 leading-relaxed mb-4 list-disc list-inside space-y-1">
            <li>
              &quot;Хочу, чтобы он каждое утро присылал мне план дня&quot;
            </li>
            <li>
              &quot;Пусть отвечает клиентам в мессенджерах пока я сплю&quot;
            </li>
            <li>
              &quot;Хочу, чтобы он читал мои заметки и напоминал о важных делах&quot;
            </li>
          </ul>
          <p className="text-zinc-400 leading-relaxed mb-6">
            Сохрани этот список - в конце курса ты научишься делать именно это.
          </p>

          <h3 className="text-lg font-semibold text-white mb-2">
            Упражнение 3: Troubleshooting (типичная ошибка)
          </h3>
          <p className="text-zinc-400 leading-relaxed mb-2">
            <span className="text-white font-semibold">Проблема:</span> &quot;Я
            думал, что ChatGPT и есть ИИ-агент. В чём разница?&quot;
          </p>
          <p className="text-zinc-400 leading-relaxed">
            <span className="text-white font-semibold">Ответ:</span> ChatGPT -
            это языковая модель с интерфейсом чата. В стандартном режиме он не
            имеет доступа к твоим файлам, не может работать по расписанию и не
            помнит вчерашнего разговора (если не включена память). OpenClaw - это
            агентская система: она берёт любую языковую модель (в том числе
            ChatGPT через API) и даёт ей руки - файловую систему, мессенджеры,
            инструменты автоматизации.
          </p>
        </section>

        {/* ── ПРИМЕРЫ И КЕЙСЫ ── */}
        <section className="bg-zinc-900 rounded-xl p-6">
          <h2 className="text-2xl font-bold text-white mb-4">
            Примеры и кейсы
          </h2>

          <h3 className="text-lg font-semibold text-white mb-2">
            Кейс 1: Предприниматель — Алексей, владелец небольшого
            интернет-магазина
          </h3>
          <p className="text-zinc-400 leading-relaxed mb-4">
            Алексей получает десятки сообщений от клиентов в день: вопросы о
            наличии товара, сроках доставки, статусе заказа. Раньше он тратил
            2-3 часа в день на ответы вручную.
          </p>
          <p className="text-zinc-400 leading-relaxed mb-4">
            С ИИ-агентом: агент подключён к Telegram, читает входящие,
            автоматически отвечает на типовые вопросы (&quot;ваш заказ отправлен&quot;,
            &quot;товар есть в наличии&quot;) и передаёт нестандартные ситуации Алексею с
            кратким резюме. Алексей видит только то, что требует его личного
            внимания.
          </p>
          <p className="text-zinc-400 leading-relaxed mb-6">
            <span className="text-white font-semibold">Разница:</span> Чат-бот
            мог бы отвечать на FAQ по скрипту. Агент - читает реальный контекст
            каждого обращения, учитывает историю переписки и формулирует
            индивидуальный ответ.
          </p>

          <h3 className="text-lg font-semibold text-white mb-2">
            Кейс 2: Дизайнер — Катя, фрилансер
          </h3>
          <p className="text-zinc-400 leading-relaxed mb-4">
            Катя ведёт несколько проектов одновременно и постоянно теряет треть
            времени на административные задачи: составить счёт, написать клиенту
            статус по проекту, напомнить о дедлайне.
          </p>
          <p className="text-zinc-400 leading-relaxed mb-6">
            С ИИ-агентом: Катя пишет в Telegram &quot;напомни завтра в 10 утра
            клиенту Иванову про дедлайн по логотипу&quot; - агент запоминает, в
            нужное время сам отправляет сообщение, а Кате присылает
            подтверждение.
          </p>

          <h3 className="text-lg font-semibold text-white mb-2">
            Кейс 3: Студент — Даниел, учится на маркетолога
          </h3>
          <p className="text-zinc-400 leading-relaxed mb-4">
            Даниел готовит курсовую по конкурентному анализу. Нужно собрать
            информацию о 10 компаниях: их соцсети, последние новости, ценовые
            предложения.
          </p>
          <p className="text-zinc-400 leading-relaxed mb-6">
            С ИИ-агентом: один запрос - &quot;собери информацию о топ-10 игроках
            рынка доставки еды в Москве&quot; - и агент через некоторое время
            возвращается с структурированным отчётом. Не идеальным, но с хорошей
            базой для работы.
          </p>

          <h3 className="text-lg font-semibold text-white mb-2">
            Кейс 4: Фрилансер — Нина, копирайтер
          </h3>
          <p className="text-zinc-400 leading-relaxed mb-4">
            Нина пишет тексты для клиентов и часто тратит время на рутину:
            принять бриф по email, записать в таблицу, поставить дедлайн в
            календарь, напомнить себе.
          </p>
          <p className="text-zinc-400 leading-relaxed">
            С ИИ-агентом: агент читает входящие письма, извлекает ключевые
            данные из брифа, создаёт задачу в рабочей системе и добавляет
            напоминание. Нина получает уведомление: &quot;Новый проект от Компании X.
            Дедлайн 15 марта. Добавил в твой список задач.&quot;
          </p>
        </section>

        {/* ── РАСПРОСТРАНЁННЫЕ ОШИБКИ И СОВЕТЫ ── */}
        <section className="bg-zinc-900 rounded-xl p-6">
          <h2 className="text-2xl font-bold text-white mb-4">
            Распространённые ошибки и советы
          </h2>

          <h3 className="text-lg font-semibold text-white mb-2">
            Ошибка 1: &quot;ИИ-агент всё сделает сам и идеально&quot;
          </h3>
          <p className="text-zinc-400 leading-relaxed mb-6">
            <span className="text-white font-semibold">Реальность:</span> Агент
            - это мощный инструмент, но не волшебник. Он выполняет задачи в
            рамках того, к чему у него есть доступ и что ты ему объяснил. Первые
            результаты потребуют твоей настройки и корректировки. Относись к нему
            как к новому сотруднику: первую неделю нужно его обучить.
          </p>

          <h3 className="text-lg font-semibold text-white mb-2">
            Ошибка 2: &quot;Это только для программистов&quot;
          </h3>
          <p className="text-zinc-400 leading-relaxed mb-6">
            <span className="text-white font-semibold">Реальность:</span>{" "}
            OpenClaw изначально создавался как инструмент, с которым можно
            общаться на человеческом языке. Да, для тонкой настройки могут
            пригодиться базовые технические знания - но для большинства задач
            достаточно уметь писать в Telegram. В этом курсе мы пройдём всё
            пошагово.
          </p>

          <h3 className="text-lg font-semibold text-white mb-2">
            Ошибка 3: &quot;Мои данные будут где-то в облаке&quot;
          </h3>
          <p className="text-zinc-400 leading-relaxed mb-6">
            <span className="text-white font-semibold">Реальность:</span>{" "}
            OpenClaw - self-hosted инструмент. Это значит, что он работает на
            твоём устройстве. Твои файлы и данные не передаются на серверы
            OpenClaw. Единственные внешние запросы - это обращения к ИИ-модели
            (Claude, GPT и т.д.), которую ты выбираешь сам. Если безопасность
            критична - можно использовать локальные модели (Llama, Mistral) без
            интернета вообще.
          </p>

          <h3 className="text-lg font-semibold text-white mb-2">
            Ошибка 4: &quot;Агент заменит меня&quot;
          </h3>
          <p className="text-zinc-400 leading-relaxed mb-6">
            <span className="text-white font-semibold">Реальность:</span> Агент
            берёт рутину. Решения, творчество, стратегию - это по-прежнему твоя
            территория. Агент - инструмент усиления, не замены.
          </p>

          <h3 className="text-lg font-semibold text-white mb-2">
            Совет: начни с одной задачи
          </h3>
          <p className="text-zinc-400 leading-relaxed">
            Не пытайся автоматизировать сразу всё. Выбери одну повторяющуюся
            задачу, которая отнимает 30+ минут в неделю. Научись делегировать её
            агенту. Потом добавляй следующую. Это путь к устойчивой
            автоматизации.
          </p>
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

        {/* ── ИТОГ ── */}
        <section className="bg-zinc-900 rounded-xl p-6">
          <h2 className="text-2xl font-bold text-white mb-4">
            Итог и следующие шаги
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-4">
            Сегодня ты сделал важный первый шаг: понял фундаментальную разницу
            между чат-ботом и ИИ-агентом.
          </p>

          <p className="text-white font-semibold mb-2">
            Главные выводы урока:
          </p>
          <ul className="text-zinc-400 leading-relaxed mb-6 list-disc list-inside space-y-1">
            <li>Чат-бот отвечает. ИИ-агент - действует.</li>
            <li>
              ИИ-агент работает с инструментами: файлами, мессенджерами,
              сервисами, расписанием.
            </li>
            <li>
              OpenClaw - это бесплатная open-source система, которая превращает
              твой компьютер или сервер в центр управления персональным
              ИИ-агентом.
            </li>
            <li>
              OpenClaw работает через привычные мессенджеры (Telegram, WhatsApp,
              Discord и другие).
            </li>
            <li>
              Твои данные остаются у тебя - это принципиальное отличие от
              облачных сервисов.
            </li>
            <li>
              Агент - инструмент делегирования рутины, не замена человека.
            </li>
          </ul>

          <p className="text-white font-semibold mb-2">
            Что тебя ждёт дальше:
          </p>
          <ul className="text-zinc-400 leading-relaxed mb-6 list-disc list-inside space-y-1">
            <li>
              <span className="text-white font-semibold">Урок 2:</span>{" "}
              Сравним OpenClaw с ChatGPT Agents и n8n - когда что использовать и
              почему это не конкуренты, а партнёры
            </li>
            <li>
              <span className="text-white font-semibold">Урок 3:</span>{" "}
              Реальные кейсы - предприниматель, дизайнер, студент, фрилансер -
              что конкретно они автоматизировали и сколько времени сэкономили
            </li>
            <li>
              <span className="text-white font-semibold">Урок 4:</span> Карта
              пути - что ты умеешь после каждого блока курса
            </li>
          </ul>

          <p className="text-zinc-400 leading-relaxed">
            Задание перед следующим уроком: запиши в заметки 2-3 задачи из своей
            жизни, которые ты хотел бы автоматизировать. Не думай пока о том,
            как это сделать технически - просто опиши, что должен делать твой
            идеальный агент. Это станет твоим личным проектом на протяжении всего
            курса.
          </p>
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
