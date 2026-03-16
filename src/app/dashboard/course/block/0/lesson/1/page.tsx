"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

/* ------------------------------------------------------------------ */
/*  Quiz data                                                         */
/* ------------------------------------------------------------------ */
const quizQuestions = [
  {
    question: "Что принципиально отличает ИИ-агента от чат-бота?",
    options: [
      "Агент умнее и использует более продвинутую языковую модель",
      "Агент работает автономно, выполняет действия в реальном мире и не требует твоего присутствия за клавиатурой",
      "Агент стоит дороже и требует подписки",
      "Агент работает только с текстом, бот - с картинками",
    ],
    correct: 1,
    explanation:
      "Ключевое слово - автономность. Агент действует, не просто отвечает. И делает это без тебя.",
  },
  {
    question: "ChatGPT Agent Mode в 2026 году - это:",
    options: [
      "Полный аналог OpenClaw, разницы нет",
      "Инструмент только для разработчиков",
      "Мощный агент, но требует твоего присутствия онлайн и хранит данные на серверах OpenAI",
      "Устаревшая технология, которую вытеснил OpenClaw",
    ],
    correct: 2,
    explanation:
      "ChatGPT Agent Mode реально крутой. Но он не работает без тебя 24/7 и данные уходят в облако OpenAI. OpenClaw решает именно эти два ограничения.",
  },
  {
    question: "OpenClaw хранит твои данные:",
    options: [
      "На серверах OpenClaw в облаке",
      "В зашифрованной базе данных",
      "На твоём собственном устройстве в обычных Markdown-файлах",
      "В Telegram",
    ],
    correct: 2,
    explanation:
      "Всё хранится локально как plain-text файлы. Никаких проприетарных баз, никакого облака без твоего разрешения.",
  },
  {
    question:
      "Ты хочешь, чтобы агент каждую ночь проверял цены конкурентов и присылал сводку утром. Это возможно с:",
    options: [
      "Только с ChatGPT если держать вкладку открытой",
      "С OpenClaw через cron-расписание - агент работает без тебя",
      "Ни с тем ни с другим - нужны специальные сервисы мониторинга",
      "Только если у тебя есть команда разработчиков",
    ],
    correct: 1,
    explanation:
      "Именно это OpenClaw делает из коробки. Настраиваешь один раз - работает всегда.",
  },
  {
    question: "Какое из этих утверждений про OpenClaw верно?",
    options: [
      "Работает только с ChatGPT/GPT моделями",
      "Требует постоянного подключения к серверам OpenClaw",
      "Поддерживает любую LLM - Claude, GPT, DeepSeek, локальные модели - по твоему выбору",
      "Работает только на Linux-серверах",
    ],
    correct: 2,
    explanation:
      "Ты сам выбираешь модель и API-ключ. Хочешь локальный Llama без интернета - пожалуйста.",
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
function SectionImage({ src, caption }: { src: string; caption?: string }) {
  return (
    <figure className="my-6">
      <Image
        src={src}
        alt={caption ?? ""}
        width={1200}
        height={675}
        className="rounded-xl w-full"
      />
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
    <main className="min-h-screen bg-[#0D0D0D] text-zinc-200">
      {/* ── Block Nav Bar ── */}
      <nav className="bg-zinc-950 border-b border-zinc-900 py-2 px-4">
        <div className="max-w-5xl mx-auto flex items-center gap-4 overflow-x-auto scrollbar-none text-sm">
          <Link href="/dashboard" className="text-zinc-400 hover:text-white transition-colors shrink-0">← Дашборд</Link>
          <span className="text-zinc-700">|</span>
          {[0, 1, 2, 3, 4, 5].map((n) => (
            <Link key={n} href={n === 0 ? "/dashboard/course/block/0/lesson/1" : `/dashboard/course/block/${n}`} className={"shrink-0 px-2 py-1 transition-colors " + (n === 0 ? "text-[#FF4422] border-b-2 border-[#FF4422]" : "text-zinc-400 hover:text-white")}>
              Блок {n}
            </Link>
          ))}
        </div>
      </nav>

      {/* ── Header ── */}
      <section className="border-b border-zinc-900">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <p className="text-[#FF4422] text-sm font-semibold mb-2">Блок 0 · Урок 1 из 4</p>
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <h1 className="text-3xl md:text-4xl font-bold text-white">Что такое ИИ-агент — и почему это не просто чат-бот</h1>
            <span className="inline-flex items-center gap-1 text-xs text-zinc-400 border border-zinc-700 rounded-full px-2.5 py-1">⏱ 20 минут</span>
          </div>
          <p className="text-zinc-400 text-lg">Разница между чат-ботом и агентом, который работает за тебя</p>
        </div>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="w-full bg-zinc-800 h-1 rounded-full mt-2">
            <div className="bg-[#FF4422] h-1 rounded-full" style={{ width: "25%" }} />
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 flex gap-8">
        {/* ── Sidebar ── */}
        <aside className="hidden md:block w-56 shrink-0">
          <div className="sticky top-6 bg-zinc-900 border border-zinc-800 rounded-xl p-4">
            <Link href="/dashboard" className="flex items-center gap-1.5 text-xs text-zinc-500 hover:text-white transition-colors mb-3">
              ← Дашборд
            </Link>
            <div className="grid grid-cols-3 gap-1 mb-3">
              <Link href="/dashboard/course/block/0/lesson/1" title="Блок 0: Что такое ИИ-агент" className={"text-center text-xs py-1.5 rounded-lg border transition-colors " + (0 === 0 ? "border-[#FF4422] text-[#FF4422]" : "border-zinc-700 text-zinc-400 hover:text-white hover:border-zinc-500")}>
                0
              </Link>
              <Link href="/dashboard/course/block/1/lesson/1" title="Блок 1: Установка и первый агент" className="text-center text-xs py-1.5 rounded-lg border border-zinc-700 text-zinc-400 hover:text-white hover:border-zinc-500 transition-colors">
                1
              </Link>
              <Link href="/dashboard/course/block/2/lesson/1" title="Блок 2: Первые реальные кейсы" className="text-center text-xs py-1.5 rounded-lg border border-zinc-700 text-zinc-400 hover:text-white hover:border-zinc-500 transition-colors">
                2
              </Link>
              <Link href="/dashboard/course/block/3/lesson/1" title="Блок 3: Мультиагент и автоматизация" className="text-center text-xs py-1.5 rounded-lg border border-zinc-700 text-zinc-400 hover:text-white hover:border-zinc-500 transition-colors">
                3
              </Link>
              <Link href="/dashboard/course/block/4/lesson/1" title="Блок 4: Продай своего агента" className="text-center text-xs py-1.5 rounded-lg border border-zinc-700 text-zinc-400 hover:text-white hover:border-zinc-500 transition-colors">
                4
              </Link>
              <Link href="/dashboard/course/block/5/lesson/1" title="Блок 5: Агентский бизнес" className="text-center text-xs py-1.5 rounded-lg border border-zinc-700 text-zinc-400 hover:text-white hover:border-zinc-500 transition-colors">
                5
              </Link>
            </div>
            <p className="text-xs text-zinc-500 font-semibold uppercase mb-3">Блок 0</p>
            <nav className="flex flex-col gap-1">
              {[
                { num: 1, title: "Что такое ИИ-агент", href: "/dashboard/course/block/0/lesson/1" },
                { num: 2, title: "OpenClaw vs ChatGPT vs n8n", href: "/dashboard/course/block/0/lesson/2" },
                { num: 3, title: "Реальные истории успеха", href: "/dashboard/course/block/0/lesson/3" },
                { num: 4, title: "Карта пути Block 0–5", href: "/dashboard/course/block/0/lesson/4" },
              ].map(l => (
                <Link key={l.num} href={l.href}
                  className={"flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors " +
                    (1 === l.num
                      ? "bg-[#FF4422]/10 text-[#FF4422] font-semibold"
                      : "text-zinc-400 hover:text-white hover:bg-zinc-800")}>
                  <span className={"w-5 h-5 rounded-full border flex items-center justify-center text-xs shrink-0 " +
                    (1 === l.num ? "border-[#FF4422]" : "border-zinc-600")}>
                    {l.num}
                  </span>
                  {l.title}
                </Link>
              ))}
            </nav>
          </div>
        </aside>

        <div className="flex-1 min-w-0 flex flex-col gap-6">
        {/* ── Hero Image ── */}
        <div className="relative w-full rounded-2xl overflow-hidden" style={{ aspectRatio: '1376/768' }}>
          <Image
            src="/course/block0/lesson1/b0-l1-cover.png"
            alt="Что такое ИИ-агент"
            fill
            className="object-cover"
            priority
          />
        </div>
        {/* ── Goals ── */}
        <section className="bg-zinc-900 rounded-xl p-6">
          <h2 className="text-2xl font-bold text-white mb-4">Цели урока</h2>
          <ul className="flex flex-col gap-3">
            {[
              "Понять раз и навсегда: чем ИИ-агент отличается от чат-бота - на конкретных примерах с реальными цифрами",
              "Узнать, что такое OpenClaw, почему он взорвал GitHub в 2026 году и что делает его уникальным",
              "Разобраться в честном сравнении с ChatGPT - без маркетинговой шелухи, с реальными ограничениями обоих",
              "Увидеть на кейсах, как агент работает 24/7 без тебя - мониторит, отвечает, публикует, собирает лиды",
              "Сформировать список задач, которые ты хочешь делегировать агенту уже в первые дни курса",
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
            Введение: пока ты спал, агент уже заработал
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-4">
            Воскресенье, 7 утра. Михаил открывает Telegram и видит сообщение от своего агента:
          </p>
          <blockquote className="border-l-4 border-[#FF4422] pl-4 my-4 text-zinc-300 italic leading-relaxed">
            &quot;Ночная сводка готова. За 8 часов: обработано 47 входящих заявок от клиентов, отправлено 39 стандартных ответов, передано тебе 8 нестандартных с кратким резюме. Опубликовано 3 поста в канале по расписанию. Проверено 12 сайтов конкурентов - один снизил цены на 15% в 03:17. Найдено 3 горячих лида из новых подписчиков. Все задачи выполнены.&quot;
          </blockquote>
          <p className="text-zinc-400 leading-relaxed mb-4">
            Михаил выпил кофе. Потом прочитал резюме по горячим лидам. Написал одному из них лично.
          </p>
          <p className="text-zinc-400 leading-relaxed mb-4">
            В тот же день его коллега Дмитрий провёл утро, отвечая на те же 47 сообщений вручную.
          </p>
          <p className="text-zinc-400 leading-relaxed mb-4">
            Разница между ними - не в трудолюбии и не в везении. Разница в инструменте.
          </p>
          <p className="text-zinc-400 leading-relaxed">
            OpenClaw - это автономный ИИ-агент, который живёт на твоём железе и работает, пока ты отдыхаешь. В этом уроке ты поймёшь, как он устроен, чем принципиально отличается от ChatGPT (у которого тоже теперь есть агенты и память), и почему именно сейчас это меняет всё для тех, кто хочет зарабатывать с ИИ.
          </p>
          <SectionImage
            src="/course/block0/lesson1/b0l1-01-intro-comparison.png"
            caption="Михаил vs Дмитрий - разница в инструменте"
          />
        </section>

        {/* ── ЧАСТЬ 1 ── */}
        <section className="bg-zinc-900 rounded-xl p-6">
          <h2 className="text-2xl font-bold text-white mb-4">
            Часть 1: Чат-бот - умный, но пассивный
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-4">
            Чат-бот - это очень умный справочник. Ты задаёшь вопрос - он отвечает. Один вопрос, один ответ, цикл завершён.
          </p>
          <p className="text-zinc-400 leading-relaxed mb-4">
            Всё современное поколение чат-ботов работает по одной схеме: ждать команды - ответить - ждать следующей. Без тебя за клавиатурой ничего не происходит.
          </p>

          <p className="text-white font-semibold mb-2">Что чат-бот делает хорошо:</p>
          <ul className="text-zinc-400 leading-relaxed mb-4 list-disc list-inside space-y-1">
            <li>Генерирует текст по запросу</li>
            <li>Отвечает на вопросы</li>
            <li>Объясняет сложные темы простым языком</li>
            <li>Помогает с брейнштормом и редактурой</li>
          </ul>

          <p className="text-white font-semibold mb-2">Что чат-бот не может в принципе:</p>
          <ul className="text-zinc-400 leading-relaxed mb-4 list-disc list-inside space-y-1">
            <li>Сам прочитать файлы на твоём компьютере без загрузки</li>
            <li>Работать по расписанию без твоей команды прямо сейчас</li>
            <li>Следить за сайтом конкурента круглосуточно</li>
            <li>Ответить клиенту пока ты спишь</li>
            <li>Управлять несколькими параллельными задачами автономно</li>
          </ul>

          <p className="text-zinc-400 leading-relaxed">
            Это не критика - это просто архитектурное ограничение. Чат-бот реагирует. Агент - действует.
          </p>

          <SectionImage
            src="/course/block0/lesson1/b0l1-02-chatbot-limits.png"
            caption="Схема: чат-бот реагирует, агент действует"
          />
        </section>

        {/* ── ЧАСТЬ 2 ── */}
        <section className="bg-zinc-900 rounded-xl p-6">
          <h2 className="text-2xl font-bold text-white mb-4">
            Часть 2: ИИ-агент - автономный, инициативный, всегда включён
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-4">
            ИИ-агент получает задачу и идёт её выполнять. Сам. Без твоего участия на каждом шаге.
          </p>
          <p className="text-zinc-400 leading-relaxed mb-2">
            Вот как выглядит разница в реальности:
          </p>
          <p className="text-zinc-400 leading-relaxed mb-4">
            <span className="text-white font-semibold">Сценарий:</span>{" "}
            тебе нужно каждую ночь проверять 15 сайтов конкурентов, фиксировать изменения цен и уведомлять тебя, если что-то изменилось.
          </p>
          <ul className="text-zinc-400 leading-relaxed mb-4 list-disc list-inside space-y-1">
            <li>
              <span className="text-white font-semibold">Чат-бот:</span>{" "}
              невозможно. Он не может работать без тебя, не имеет доступа к интернету в фоне, не помнит, что проверял вчера.
            </li>
            <li>
              <span className="text-white font-semibold">ИИ-агент (OpenClaw):</span>{" "}
              cron-задача настраивается один раз. Каждую ночь в 3:00 агент обходит все 15 сайтов, сравнивает с вчерашними данными, и если находит изменение - присылает тебе уведомление с точным указанием что изменилось и где. Ты настраиваешь один раз, дальше агент работает сам.
            </li>
          </ul>

          <SectionImage
            src="/course/block0/lesson1/b0l1-03-agent-loop.png"
            caption="Петля автономного агента"
          />

          <p className="text-zinc-400 leading-relaxed mb-4">
            Три принципиальных отличия агента от чат-бота:
          </p>
          <ol className="text-zinc-400 leading-relaxed mb-4 list-decimal list-inside space-y-2">
            <li>
              <span className="text-white font-semibold">Инструменты</span> -
              агент взаимодействует с реальным миром: браузер, файловая система, почта, мессенджеры, API любых сервисов, терминал, календарь. OpenClaw имеет доступ к твоей системе и умеет выполнять команды на уровне операционной системы.
            </li>
            <li>
              <span className="text-white font-semibold">Память</span> -
              агент помнит всё: вчерашний разговор, прошлонедельный проект, имена клиентов, их предпочтения, контекст каждой задачи. Не нужно каждый раз объяснять с нуля.
            </li>
            <li>
              <span className="text-white font-semibold">Автономность</span> -
              агент работает по расписанию, по событию, по вебхуку. Ты можешь не заходить в него неделями - он продолжает работу. Пришёл новый email от клиента с ключевым словом - агент обрабатывает. Конкурент поменял цену - агент уведомляет. Наступило 9:00 понедельника - агент публикует заготовленный пост.
            </li>
          </ol>

          <SectionImage
            src="/course/block0/lesson1/b0l1-04-before-after.png"
            caption="До и после: мониторинг конкурентов автоматически"
          />
        </section>

        {/* ── ЧАСТЬ 3 ── */}
        <section className="bg-zinc-900 rounded-xl p-6">
          <h2 className="text-2xl font-bold text-white mb-4">
            Часть 3: OpenClaw в 2026 году - факты без прикрас
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-4">
            OpenClaw - это open-source проект, запущенный австрийским разработчиком Питером Штайнбергером в январе 2026 года. За первые 48 часов - 100 000 звёзд на GitHub. За восемь недель - один из самых быстро растущих open-source проектов в истории.
          </p>
          <p className="text-zinc-400 leading-relaxed mb-4">
            Почему такой взрыв? Потому что OpenClaw делает то, чего не делает ни один облачный сервис: запускает полноценного автономного агента прямо на твоём железе.
          </p>

          <p className="text-white font-semibold mb-2">Что OpenClaw умеет по факту:</p>
          <ul className="text-zinc-400 leading-relaxed mb-4 list-disc list-inside space-y-1">
            <li>Читает и пишет файлы на твоём компьютере</li>
            <li>Выполняет команды в терминале</li>
            <li>Управляет браузером (заходит на сайты, заполняет формы, собирает данные)</li>
            <li>Работает с почтой и календарём напрямую</li>
            <li>Подключается к 50+ интеграциям: GitHub, Notion, Google Calendar, умный дом, PDF, базы данных</li>
            <li>Поддерживает 12+ мессенджеров: Telegram, WhatsApp, Discord, iMessage, Slack, Signal, Matrix и другие</li>
            <li>Запускает задачи по расписанию через cron без твоего участия</li>
            <li>Управляет несколькими суб-агентами параллельно (у каждого своя специализация)</li>
            <li>Хранит всё в обычных Markdown-файлах - открыть можно в любом редакторе</li>
            <li>Работает с любой LLM: Claude, GPT-5.4, DeepSeek, или полностью локальные модели (Llama, Mistral) без интернета</li>
          </ul>

          <SectionImage
            src="/course/block0/lesson1/b0l1-05-openclaw-hub.png"
            caption="OpenClaw: 50+ интеграций, 12+ мессенджеров"
          />

          <p className="text-white font-semibold mb-2">Ключевое про приватность:</p>
          <p className="text-zinc-400 leading-relaxed">
            OpenClaw работает на ТВОЁМ устройстве. Твои файлы, твоя переписка, твои данные о клиентах - всё остаётся у тебя. Единственные внешние запросы - к ИИ-модели по твоему API-ключу. Хочешь полный офлайн - используй локальную модель, и данные вообще не покидают твою машину.
          </p>

          <SectionImage
            src="/course/block0/lesson1/b0l1-06-features-grid.png"
            caption="Ключевые возможности OpenClaw"
          />
        </section>

        {/* ── ЧАСТЬ 4 ── */}
        <section className="bg-zinc-900 rounded-xl p-6">
          <h2 className="text-2xl font-bold text-white mb-4">
            Часть 4: Честное сравнение с ChatGPT - без фанатизма
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-4">
            Давай разберёмся честно. ChatGPT в 2026 году - это не тот ChatGPT 2023 года.
          </p>

          <p className="text-white font-semibold mb-2">Что ChatGPT теперь умеет:</p>
          <ul className="text-zinc-400 leading-relaxed mb-4 list-disc list-inside space-y-1">
            <li>У него есть память - он помнит тебя между сессиями</li>
            <li>Есть Agent Mode и Operator - может управлять браузером, заполнять формы, делать заказы онлайн</li>
            <li>GPT-5.4 умеет выполнять многошаговые задачи с доступом к инструментам</li>
            <li>Может запускать код, читать загруженные файлы, взаимодействовать с внешними сервисами через Actions</li>
          </ul>

          <p className="text-zinc-400 leading-relaxed mb-4">
            <span className="text-white font-semibold">ChatGPT реально крут</span> - и это не нужно замалчивать. Если тебе нужен разовый мощный ответ, генерация текста, помощь с кодом или браузерная задача прямо сейчас - он отлично с этим справляется.
          </p>

          <p className="text-white font-semibold mb-2">Но вот где принципиальная разница:</p>
          <div className="overflow-x-auto mb-4">
            <table className="w-full text-sm text-zinc-400 border-collapse">
              <thead>
                <tr className="border-b border-zinc-700">
                  <th className="text-left py-2 pr-4 text-white font-semibold">Критерий</th>
                  <th className="text-left py-2 pr-4 text-white font-semibold">ChatGPT (Agent Mode)</th>
                  <th className="text-left py-2 text-white font-semibold">OpenClaw</th>
                </tr>
              </thead>
              <tbody className="space-y-1">
                <tr className="border-b border-zinc-800">
                  <td className="py-2 pr-4">Работает без тебя 24/7</td>
                  <td className="py-2 pr-4">Нет - нужна твоя команда</td>
                  <td className="py-2">Да - cron, вебхуки, события</td>
                </tr>
                <tr className="border-b border-zinc-800">
                  <td className="py-2 pr-4">Данные остаются у тебя</td>
                  <td className="py-2 pr-4">Нет - на серверах OpenAI</td>
                  <td className="py-2">Да - только на твоём железе</td>
                </tr>
                <tr className="border-b border-zinc-800">
                  <td className="py-2 pr-4">Многопоточность агентов</td>
                  <td className="py-2 pr-4">Ограниченно</td>
                  <td className="py-2">Да - несколько агентов параллельно</td>
                </tr>
                <tr className="border-b border-zinc-800">
                  <td className="py-2 pr-4">Open source</td>
                  <td className="py-2 pr-4">Нет - закрытый код</td>
                  <td className="py-2">Да - можно менять всё</td>
                </tr>
                <tr className="border-b border-zinc-800">
                  <td className="py-2 pr-4">Работает на своём железе</td>
                  <td className="py-2 pr-4">Нет - только облако</td>
                  <td className="py-2">Да - твой Mac, сервер, Raspberry Pi</td>
                </tr>
                <tr className="border-b border-zinc-800">
                  <td className="py-2 pr-4">Интеграция с твоими файлами</td>
                  <td className="py-2 pr-4">Только загружаешь вручную</td>
                  <td className="py-2">Прямой доступ к файловой системе</td>
                </tr>
                <tr className="border-b border-zinc-800">
                  <td className="py-2 pr-4">Выбор модели</td>
                  <td className="py-2 pr-4">GPT или ограниченный список</td>
                  <td className="py-2">Любая: Claude, GPT, DeepSeek, локальные</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4">Стоимость при масштабе</td>
                  <td className="py-2 pr-4">Растёт с объёмом</td>
                  <td className="py-2">Фиксированная (твоё железо + API)</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-zinc-400 leading-relaxed mb-4">
            Главное различие в одной фразе: <span className="text-white font-semibold">ChatGPT ждёт тебя. OpenClaw работает без тебя.</span>
          </p>
          <p className="text-zinc-400 leading-relaxed mb-4">
            ChatGPT Agent Mode - это &quot;supervised execution environment&quot; по оценке аналитиков. Ты даёшь задачу, наблюдаешь. OpenClaw - это агент, который живёт своей жизнью по твоим правилам, работает ночью, в выходные, когда ты в отпуске.
          </p>
          <p className="text-zinc-400 leading-relaxed">
            И ещё один момент: если твой бизнес или личная информация не должна уходить на серверы американской компании - у ChatGPT нет выбора. У OpenClaw - есть.
          </p>
        </section>

        {/* ── ПРАКТИКА ── */}
        <section className="bg-zinc-900 rounded-xl p-6">
          <h2 className="text-2xl font-bold text-white mb-4">
            Практика на руках
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            Установки пока нет - это будет в Блоке 1. Но вот три упражнения, которые прямо сейчас помогут тебе понять ценность агентов на личном опыте.
          </p>

          <h3 className="text-lg font-semibold text-white mb-2">
            Упражнение 1: Аудит своей рутины
          </h3>
          <p className="text-zinc-400 leading-relaxed mb-2">
            Возьми телефон. Открой список дел или просто подумай: какие задачи ты делаешь повторно каждую неделю?
          </p>
          <p className="text-zinc-400 leading-relaxed mb-2">
            Запиши их. Потом пройдись по каждой и ответь на три вопроса:
          </p>
          <ul className="text-zinc-400 leading-relaxed mb-4 list-disc list-inside space-y-1">
            <li>Эта задача требует моего творческого решения - или это шаблонная операция?</li>
            <li>Мне нужно быть онлайн в момент её выполнения - или можно сделать это в любое время?</li>
            <li>Если бы это делал агент, сколько минут в неделю я бы освободил?</li>
          </ul>
          <p className="text-zinc-400 leading-relaxed mb-6">
            Типичные результаты студентов: 3-5 часов в неделю чистой рутины, которую можно делегировать.
          </p>

          <SectionImage
            src="/course/block0/lesson1/b0l1-07-task-classification.png"
            caption="Упражнение: аудит своей рутины"
          />

          <h3 className="text-lg font-semibold text-white mb-2">
            Упражнение 2: Спроектируй своего агента
          </h3>
          <p className="text-zinc-400 leading-relaxed mb-2">
            Представь: у тебя есть личный агент, который работает 24/7 и управляется через Telegram. Напиши ответы на вопросы:
          </p>
          <ol className="text-zinc-400 leading-relaxed mb-4 list-decimal list-inside space-y-1">
            <li>Как его зовут? (Да, дай ему имя - это помогает думать о нём как о полноценном инструменте)</li>
            <li>Какие три задачи он делает каждое утро без твоей команды?</li>
            <li>На какие входящие сообщения он отвечает автоматически?</li>
            <li>Что он мониторит в фоне и когда тебя будит?</li>
          </ol>
          <p className="text-zinc-400 leading-relaxed mb-6">
            Это не фантазия - это техническое задание. К концу курса ты реализуешь именно это.
          </p>

          <h3 className="text-lg font-semibold text-white mb-2">
            Упражнение 3: Разбери кейс
          </h3>
          <p className="text-zinc-400 leading-relaxed mb-2">
            <span className="text-white font-semibold">Ситуация:</span> Интернет-магазин. 80 входящих сообщений в день. 70% из них - одни и те же вопросы: цена, наличие, сроки доставки, статус заказа. Владелец тратит 2.5 часа в день на ответы.
          </p>
          <p className="text-zinc-400 leading-relaxed mb-2">
            Напиши: как бы ты настроил агента, чтобы решить эту проблему? Что агент делает сам, а что передаёт человеку?
          </p>
          <p className="text-zinc-400 leading-relaxed">
            Нет правильного или неправильного ответа - важна твоя логика. Мы разберём похожие кейсы в следующем уроке.
          </p>
        </section>

        {/* ── ПРИМЕРЫ И КЕЙСЫ ── */}
        <section className="bg-zinc-900 rounded-xl p-6">
          <h2 className="text-2xl font-bold text-white mb-4">
            Примеры и кейсы
          </h2>

          <h3 className="text-lg font-semibold text-white mb-2">
            Кейс 1: Онлайн-школа - Артём, продаёт курсы по дизайну
          </h3>
          <p className="text-zinc-400 leading-relaxed mb-4">
            Артём запустил онлайн-школу. Каждый день: десятки вопросов в Instagram и Telegram (&quot;когда старт?&quot;, &quot;есть ли рассрочка?&quot;, &quot;подойдёт ли мне?&quot;), администрирование учеников, напоминания о занятиях, публикации в каналах.
          </p>
          <p className="text-zinc-400 leading-relaxed mb-4">
            Раньше: 3-4 часа в день на коммуникацию, постоянно что-то пропускал, упускал горячие лиды ночью.
          </p>
          <p className="text-zinc-400 leading-relaxed mb-4">
            С OpenClaw: агент мониторит все входящие в Telegram и Instagram 24/7. Типовые вопросы - отвечает сам за секунды, в любое время суток. Нестандартные - передаёт Артёму с тегом &quot;требует ответа&quot; и кратким контекстом. Каждое утро в 8:00 - сводка: сколько новых лидов, сколько отвечено, кто ждёт его внимания. Публикации в канале идут по расписанию. Напоминания ученикам - автоматически.
          </p>
          <p className="text-zinc-400 leading-relaxed mb-6">
            <span className="text-white font-semibold">Результат:</span> Артём сократил время на рутину с 4 часов до 40 минут в день. Конверсия из лида в покупку выросла - потому что ответ теперь приходит за 30 секунд, а не через 6 часов.
          </p>

          <h3 className="text-lg font-semibold text-white mb-2">
            Кейс 2: Арбитражник - Соня, работает с партнёрскими программами
          </h3>
          <p className="text-zinc-400 leading-relaxed mb-4">
            Соня зарабатывает на партнёрках: находит выгодные офферы, мониторит ставки, следит за условиями конкурентов. Раньше это занимало 2-3 часа каждое утро - просто проверить всё вручную.
          </p>
          <p className="text-zinc-400 leading-relaxed mb-4">
            С OpenClaw: агент каждые 4 часа проверяет 23 партнёрские сети, фиксирует изменения ставок, сравнивает с историей. Если ставка по нужному офферу изменилась больше чем на 10% - моментальное уведомление. Если появился новый топ-оффер в нишах Сони - она узнаёт первой.
          </p>
          <p className="text-zinc-400 leading-relaxed mb-6">
            <span className="text-white font-semibold">Результат:</span> Соня видит возможности раньше конкурентов. 2 часа утренней рутины превратились в 10 минут просмотра сводки.
          </p>

          <h3 className="text-lg font-semibold text-white mb-2">
            Кейс 3: Агентство - Денис, контент для 8 клиентов
          </h3>
          <p className="text-zinc-400 leading-relaxed mb-4">
            Денис ведёт SMM для 8 компаний. Каждой нужен уникальный контент, своё расписание публикаций, ответы на комментарии, ежемесячные отчёты.
          </p>
          <p className="text-zinc-400 leading-relaxed mb-4">
            С OpenClaw запущено 8 суб-агентов - по одному на клиента. Каждый знает тональность своего бренда, расписание, аудиторию. Публикации идут автоматически. Комментарии обрабатываются. В конце месяца каждый агент генерирует отчёт со статистикой для своего клиента.
          </p>
          <p className="text-zinc-400 leading-relaxed mb-4">
            Денис занимается стратегией и новыми клиентами. Рутину ведут агенты.
          </p>
          <p className="text-zinc-400 leading-relaxed mb-6">
            <span className="text-white font-semibold">Результат:</span> Денис обслуживает 8 клиентов с качеством, для которого раньше ему нужна была команда из 3 человек.
          </p>

          <h3 className="text-lg font-semibold text-white mb-2">
            Кейс 4: Исследователь рынка - Ирина, анализирует тренды для инвесторов
          </h3>
          <p className="text-zinc-400 leading-relaxed mb-4">
            Ирина готовит еженедельные аналитические отчёты для инвестиционного фонда. Нужно: мониторить 40+ источников, отслеживать упоминания 15 компаний, фиксировать изменения на рынке.
          </p>
          <p className="text-zinc-400 leading-relaxed mb-4">
            С OpenClaw: агент круглосуточно мониторит RSS-ленты, новостные сайты, GitHub-репозитории, форумы. Классифицирует информацию по компаниям и темам. Каждое утро пятницы - черновик отчёта уже готов: структурированный, с ссылками, с выделенными ключевыми событиями. Ирина редактирует и добавляет анализ вместо того, чтобы собирать данные с нуля.
          </p>
          <p className="text-zinc-400 leading-relaxed">
            <span className="text-white font-semibold">Результат:</span> Отчёт, который занимал полный рабочий день, теперь занимает 2 часа. Ирина берёт больше клиентов.
          </p>
        </section>

        {/* ── РАСПРОСТРАНЁННЫЕ ОШИБКИ И СОВЕТЫ ── */}
        <section className="bg-zinc-900 rounded-xl p-6">
          <h2 className="text-2xl font-bold text-white mb-4">
            Распространённые ошибки и советы
          </h2>

          <h3 className="text-lg font-semibold text-white mb-2">
            Ошибка 1: &quot;ChatGPT тоже агент, зачем OpenClaw?&quot;
          </h3>
          <p className="text-zinc-400 leading-relaxed mb-6">
            Это самое частое заблуждение. ChatGPT Agent Mode - реальная вещь, не отрицаем. Но ключевое: ChatGPT работает только когда ты онлайн и дал команду. Как только ты закрыл вкладку - ничего не происходит. OpenClaw работает пока ты спишь, в отпуске, на встрече. Это другая парадигма. Плюс - твои данные. Если ты работаешь с конфиденциальной информацией клиентов, финансовыми данными, медицинскими записями - отдавать это на серверы OpenAI может быть неприемлемо юридически или этически. OpenClaw даёт выбор.
          </p>

          <h3 className="text-lg font-semibold text-white mb-2">
            Ошибка 2: &quot;Это для технарей, я не программист&quot;
          </h3>
          <p className="text-zinc-400 leading-relaxed mb-6">
            OpenClaw изначально проектировался для общения на человеческом языке через мессенджер. Большинство задач решается простыми командами в Telegram без единой строчки кода. Да, для тонкой настройки нужно чуть больше - но этому учит этот курс, пошагово. Если ты умеешь написать сообщение в WhatsApp - ты освоишь OpenClaw.
          </p>

          <h3 className="text-lg font-semibold text-white mb-2">
            Ошибка 3: &quot;Агент заменит меня&quot;
          </h3>
          <p className="text-zinc-400 leading-relaxed mb-6">
            Агент берёт рутину - повторяющиеся, шаблонные, предсказуемые задачи. Стратегия, отношения с клиентами, творческие решения, нестандартные ситуации - это остаётся за тобой. Агент - это усилитель, не замена. Михаил из введения не потерял работу - он освободил время для задач, которые реально требуют его голову.
          </p>

          <h3 className="text-lg font-semibold text-white mb-2">
            Ошибка 4: &quot;Сначала автоматизирую всё сразу&quot;
          </h3>
          <p className="text-zinc-400 leading-relaxed mb-6">
            Худшая стратегия для старта. Выбери одну задачу, которая раздражает тебя каждую неделю. Настрой агента на неё. Убедись, что работает. Потом добавь вторую. Устойчивая автоматизация строится поэтапно - и тогда она реально экономит время, а не создаёт новые проблемы.
          </p>

          <h3 className="text-lg font-semibold text-white mb-2">
            Совет: думай как архитектор, а не как пользователь
          </h3>
          <p className="text-zinc-400 leading-relaxed mb-2">
            Пользователь спрашивает: &quot;Что мне сделать прямо сейчас?&quot;
          </p>
          <p className="text-zinc-400 leading-relaxed mb-2">
            Архитектор спрашивает: &quot;Какие задачи я хочу никогда больше не делать вручную?&quot;
          </p>
          <p className="text-zinc-400 leading-relaxed">
            С этого момента начни думать второй вопрос. Всё что ты настраиваешь в OpenClaw - это инвестиция в освобождённое время навсегда.
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
            Сегодня ты разобрался в базовой, но критически важной концепции: разнице между тем, что отвечает, и тем, что действует.
          </p>

          <p className="text-white font-semibold mb-2">
            Главные выводы:
          </p>
          <ul className="text-zinc-400 leading-relaxed mb-6 list-disc list-inside space-y-1">
            <li>Чат-бот реагирует на тебя. ИИ-агент действует вместо тебя - в том числе когда тебя нет.</li>
            <li>
              ChatGPT в 2026 году - серьёзный агент. Честно. Но он требует тебя онлайн и хранит твои данные на серверах OpenAI. Это не мелочь.
            </li>
            <li>
              OpenClaw работает 24/7 без тебя, на твоём железе, с твоими данными, с любой моделью. Open source - значит ты можешь менять всё под себя.
            </li>
            <li>
              50+ интеграций, 12+ мессенджеров, мультиагентная система - это не маркетинг, это рабочий инструментарий.
            </li>
            <li>
              Агент - это усилитель, не замена. Рутина уходит к нему, решения остаются с тобой.
            </li>
          </ul>

          <p className="text-white font-semibold mb-2">
            Домашнее задание:
          </p>
          <p className="text-zinc-400 leading-relaxed mb-2">
            Возьми блокнот или заметки в телефоне. Напиши три колонки:
          </p>
          <ol className="text-zinc-400 leading-relaxed mb-6 list-decimal list-inside space-y-1">
            <li>&quot;Что я делаю каждую неделю вручную, что меня раздражает&quot;</li>
            <li>&quot;Что должно происходить автоматически без моего участия&quot;</li>
            <li>&quot;О чём я хочу получать сводку каждое утро&quot;</li>
          </ol>
          <p className="text-zinc-400 leading-relaxed mb-6">
            Это не просто упражнение. Это техническое задание для твоего агента - того, которого ты запустишь в Блоке 1.
          </p>

          <p className="text-white font-semibold mb-2">
            Что дальше:
          </p>
          <ul className="text-zinc-400 leading-relaxed mb-6 list-disc list-inside space-y-1">
            <li>
              <span className="text-white font-semibold">Урок 2:</span>{" "}
              OpenClaw vs ChatGPT vs n8n — честное сравнение: когда что использовать и почему агенты выигрывают
            </li>
            <li>
              <span className="text-white font-semibold">Урок 3:</span>{" "}
              Реальные кейсы: как фрилансер, предприниматель, студент и разработчик зарабатывают с агентами прямо сейчас
            </li>
            <li>
              <span className="text-white font-semibold">Урок 4:</span>{" "}
              Твой план действий: карта курса, выбор трека и первые шаги к $1000+ от агентов
            </li>
          </ul>
        </section>

        {/* ── Navigation ── */}
        <div className="flex gap-4 mt-4">
          <Link
            href="/dashboard"
            className="flex-1 py-3 bg-zinc-900 border border-zinc-700 text-zinc-400 hover:text-white hover:border-zinc-500 font-medium rounded-lg transition-colors text-sm text-center"
          >
            ← Дашборд
          </Link>
          <Link
            href="/dashboard/course/block/0/lesson/2"
            className="flex-1 py-3 bg-[#FF4422] hover:bg-[#e63d1e] text-white font-medium rounded-lg transition-colors text-sm text-center"
          >
            Следующий урок →
          </Link>
        </div>
        </div>
      </div>
    </main>
  );
}
