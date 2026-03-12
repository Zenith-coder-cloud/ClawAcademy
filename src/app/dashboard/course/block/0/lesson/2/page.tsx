"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

/* ------------------------------------------------------------------ */
/*  Quiz data                                                         */
/* ------------------------------------------------------------------ */
const quizQuestions = [
  {
    question: "Когда ChatGPT Agent Mode — лучший выбор?",
    options: [
      "Для круглосуточного автономного бизнеса, который работает без тебя",
      "Для одноразовых исследовательских задач, когда ты за компьютером",
      "Когда нужен офлайн-доступ без интернета и подписки",
      "Когда тебе нужна полностью преднастроенная бизнес-логика",
    ],
    correct: 1,
    explanation:
      "ChatGPT Agent Mode идеален, когда ты рядом: быстро собрать информацию, проверить файлы, построить выводы и сразу принять решение. Он не про автономность, он про скорость и удобство здесь и сейчас.",
  },
  {
    question: "Главное ограничение n8n для ИИ-агентов — это:",
    options: [
      "Отсутствие интеграций с популярными сервисами",
      "Слишком высокая стоимость",
      "Нет автономного принятия решений, только заранее описанные сценарии",
      "Нельзя запускать на своём сервере",
    ],
    correct: 2,
    explanation:
      "n8n — мощный конструктор рабочих процессов. С 2024 года у него есть AI-ноды на базе LangChain, но это всё ещё предопределённые цепочки — не автономный агент. Для полноценного агентного поведения нужна система, которая сама принимает решения в реальном времени.",
  },
  {
    question: "Когда OpenClaw незаменим?",
    options: [
      "Когда нужно один раз прочитать PDF и сделать выводы",
      "Когда важна автономная работа 24/7, приватность и связка нескольких агентов",
      "Когда требуется только визуальный конструктор без кода",
      "Когда нужно максимально дешёвое решение без API",
    ],
    correct: 1,
    explanation:
      "Сильная сторона OpenClaw — это автономные агенты, которые живут у тебя и работают постоянно. Если задача про бизнес-процессы, мониторинг и устойчивость, OpenClaw даёт то, чего нет у облачных решений.",
  },
  {
    question: "Можно ли комбинировать все три инструмента?",
    options: [
      "Нет, это несовместимые подходы",
      "Да, и разумные люди именно так и делают",
      "Только если у тебя есть команда разработчиков",
      "Только в больших корпорациях",
    ],
    correct: 1,
    explanation:
      "Практика показывает: лучшие результаты получаются, когда ты не выбираешь «единственного победителя», а строишь связку. ChatGPT — для быстрого мышления, n8n — для повторяющихся автоматизаций, OpenClaw — для автономии.",
  },
  {
    question: "Какой инструмент даёт мультиагентность и автономию 24/7?",
    options: [
      "ChatGPT, потому что у него Agent Mode",
      "n8n, потому что он умеет запускать цепочки автоматически",
      "OpenClaw, потому что он создан для автономных агентов",
      "Все три одинаково хорошо справляются с этим",
    ],
    correct: 2,
    explanation:
      "OpenClaw — единственный из трёх, кто даёт полноценную мультиагентность и автономную работу 24/7. ChatGPT работает по сессиям, n8n исполняет предопределённые цепочки. Только OpenClaw координирует несколько агентов, которые сами принимают решения.",
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
    if (selected !== null) return;
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
        ? "Отлично! Ты уверенно понимаешь, где сильные стороны каждого инструмента."
        : score >= 3
          ? "Хороший результат. Если есть сомнения — вернись к сравнительной таблице."
          : "Стоит перечитать урок и попробовать снова. Тут много нюансов.";

    return (
      <div className="text-center py-8">
        <p className="text-4xl font-bold text-white mb-2">
          {score}/{quizQuestions.length}
        </p>
        <p className="text-zinc-400 mb-6">{msg}</p>
        <Link
          href="/dashboard/course/block/0/lesson/3"
          className="inline-block px-8 py-3 bg-[#FF4422] hover:bg-[#e63d1e] text-white font-semibold rounded-lg transition-colors"
        >
          Следующий урок
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-zinc-900 rounded-2xl p-6 md:p-8">
      <p className="text-sm text-zinc-500 mb-2">
        Вопрос {current + 1} из {quizQuestions.length}
      </p>
      <h3 className="text-xl md:text-2xl font-semibold text-white mb-4">
        {q.question}
      </h3>
      <div className="space-y-3">
        {q.options.map((opt, idx) => {
          const isSelected = selected === idx;
          const isCorrect = idx === q.correct;
          const showState = selected !== null;
          return (
            <button
              key={opt}
              onClick={() => handleSelect(idx)}
              className={`w-full text-left px-4 py-3 rounded-lg border transition-colors ${
                showState
                  ? isCorrect
                    ? "border-[#FF4422] bg-[#FF4422]/10 text-white"
                    : isSelected
                      ? "border-red-500/60 bg-red-500/10 text-white"
                      : "border-zinc-800 bg-zinc-950 text-zinc-400"
                  : "border-zinc-800 bg-zinc-950 hover:bg-zinc-900 text-zinc-200"
              }`}
            >
              {opt}
            </button>
          );
        })}
      </div>
      {selected !== null && (
        <div className="mt-4 p-4 rounded-lg bg-zinc-950 border border-zinc-800">
          <p className="text-zinc-300 text-sm leading-relaxed">{q.explanation}</p>
          <div className="mt-4 text-right">
            <button
              onClick={handleNext}
              className="px-6 py-2 bg-[#FF4422] hover:bg-[#e63d1e] text-white font-semibold rounded-lg transition-colors"
            >
              {current + 1 === quizQuestions.length ? "Завершить" : "Дальше"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function Page() {
  return (
    <main className="min-h-screen bg-black text-zinc-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Cover */}
        <section className="bg-zinc-900 rounded-2xl p-6 md:p-10 mb-10 border border-zinc-800">
          <p className="text-[#FF4422] text-sm font-semibold mb-2">
            Блок 0 • Урок 2
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight">
            OpenClaw vs ChatGPT vs n8n — честное сравнение. Когда что выбирать
          </h1>
          <p className="text-zinc-400 mt-4 leading-relaxed">
            Этот урок — не про фанатизм. Все три инструмента сильные, просто
            решают разные задачи. Я покажу тебе честную картину: где ChatGPT
            удобнее всего, где n8n даёт максимальную пользу, а где OpenClaw
            становится единственным адекватным вариантом. В конце ты получишь
            простую схему выбора и поймёшь, как собрать связку, которая экономит
            время и деньги, а не добавляет хаоса.
          </p>
          <p className="text-zinc-400 mt-4 leading-relaxed">
            Если коротко: ChatGPT — это быстрые мозги по запросу, n8n — это
            «провода» между сервисами, а OpenClaw — это автономная система,
            которая сама принимает решения. Каждый инструмент хорош, когда ты
            используешь его по назначению. Как только начинаешь ждать от него
            чужой роли — появляются разочарование и потеря времени.
          </p>
          <SectionImage
            src="/course/block0/lesson2/b0l2-01-cover.png"
            caption="Три инструмента, три разных философии."
          />
        </section>

        {/* Goals */}
        <section className="bg-zinc-900 rounded-2xl p-6 md:p-10 mb-10 border border-zinc-800">
          <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4">
            Цели урока
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            Важно не просто знать, что эти инструменты существуют, а уметь
            быстро принимать решение: какой выбрать под конкретную задачу, чтобы
            не тратить недели на настройку или не разочароваться через два дня.
          </p>
          <p className="text-zinc-400 leading-relaxed mb-6">
            Мы также разложим мифы. Например, что «ChatGPT — это уже полноценный
            агент». Или что «n8n заменяет ИИ». На практике эти утверждения
            приводят к неправильным ожиданиям. Лучше трезво понимать границы,
            чем обещать себе то, чего инструмент не умеет делать изначально.
          </p>
          <ul className="space-y-3">
            <li className="flex gap-3">
              <Check />
              <span>
                Понять, где ChatGPT Agent Mode выигрывает по скорости и удобству.
              </span>
            </li>
            <li className="flex gap-3">
              <Check />
              <span>
                Разобраться, какие задачи решает n8n и почему он не «ИИ-агент».
              </span>
            </li>
            <li className="flex gap-3">
              <Check />
              <span>
                Увидеть, в каких случаях OpenClaw реально незаменим и почему это
                не маркетинг.
              </span>
            </li>
            <li className="flex gap-3">
              <Check />
              <span>
                Запомнить ограничения и стоимость каждого решения без иллюзий.
              </span>
            </li>
            <li className="flex gap-3">
              <Check />
              <span>
                Научиться комбинировать инструменты, а не выбирать «одного
                любимчика».
              </span>
            </li>
          </ul>
          <SectionImage
            src="/course/block0/lesson2/b0l2-02-goals.png"
            caption="Если понимаешь контекст, выбор становится очевидным."
          />
        </section>

        {/* Intro */}
        <section className="bg-zinc-900 rounded-2xl p-6 md:p-10 mb-10 border border-zinc-800">
          <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4">
            История Алексея: «Я попробовал всё и выбрал всё»
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-4">
            Алексей — фрилансер в маркетинге. У него было простое желание:
            меньше рутины, больше времени на деньги. Сначала он подсел на
            ChatGPT: делал ресёрч, собирал идеи, писал черновики. Всё шло
            отлично, пока задачи не стали повторяться: каждый день одно и то же.
            Он понял, что ему нужно автоматизировать процессы, и начал ковырять
            n8n. Удивился, насколько быстро можно собрать цепочки: «Если клиент
            написал — отправь в таблицу, поставь задачу, пришли уведомление».
          </p>
          <p className="text-zinc-400 leading-relaxed mb-4">
            Через пару месяцев выяснилось, что автоматизация без автономных
            решений — это потолок. Он захотел, чтобы агент сам мониторил ниши,
            находил новые лиды, проверял конкурентов и запускал рекламные тесты.
            Тут n8n уже не помогал, потому что логика стала гибкой и
            непредсказуемой. Тогда Алексей поставил OpenClaw на свой сервер и
            собрал связку с OpenClaw в центре: агент сам вызывает ChatGPT
            API когда нужно подумать, запускает n8n-цепочки для рутины, а сам
            координирует всё и работает 24/7. Три инструмента — одна система.
          </p>
          <p className="text-zinc-400 leading-relaxed mb-4">
            Самое важное, что он понял: «выбор» — это не про исключение, а про
            разделение ролей. Он перестал спорить с реальностью и начал
            проектировать свою систему так, чтобы каждый инструмент делал то,
            что умеет лучше всего. И результат оказался сильнее, чем попытка
            «сделать всё в одном сервисе».
          </p>
          <p className="text-zinc-400 leading-relaxed">
            Спойлер: он не отказался ни от одного инструмента. Он просто
            перестал ждать от них того, чего они не обещали.
          </p>
          <SectionImage
            src="/course/block0/lesson2/b0l2-03-story.png"
            caption="Когда инструменты на своих местах, система работает."
          />
        </section>

        {/* ChatGPT */}
        <section className="bg-zinc-900 rounded-2xl p-6 md:p-10 mb-10 border border-zinc-800">
          <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4">
            ChatGPT Agent Mode 2026: быстрый и сильный, но не автономный
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-4">
            ChatGPT Agent Mode — это реально мощно. Он работает на своём
            виртуальном компьютере в облаке OpenAI: ищет в интернете,
            анализирует файлы, запускает код в терминале, взаимодействует с
            сайтами через визуальный браузер и даже подключается к Gmail и
            GitHub через коннекторы. Если тебе
            нужно быстро оценить нишу, подготовить концепт лендинга или проверить
            десяток документов — это один из лучших инструментов на рынке.
          </p>
          <p className="text-zinc-400 leading-relaxed mb-4">
            Его ключевой плюс — нулевая настройка. Не нужно серверов, не нужно
            продумывать архитектуру. Открыл — и работаешь. Для людей, которые
            живут в режиме «решил и сделал», это прямой путь к эффективности.
            Важный момент: Agent Mode рассчитан на сессии — ты задаёшь задачу,
            он выполняет, ты проверяешь. Между сессиями он не существует. Нет
            фоновых процессов, нет мониторинга, нет ночных задач.
          </p>
          <p className="text-zinc-400 leading-relaxed mb-4">
            У него нет долговременной памяти между сессиями — каждый раз
            начинаешь с чистого листа. Контекст твоего бизнеса, клиентов,
            процессов — всё нужно загружать заново. Для разовых задач это не
            проблема, для системной работы — стена.
          </p>
          <p className="text-zinc-400 leading-relaxed mb-4">
            Типичный хороший кейс: ты запускаешь новый продукт и тебе нужно за
            вечер собрать 20 идей позиционирования, быстро проверить конкурентов
            и наметить оффер. Тут ChatGPT делает большую часть черновой работы
            за минуты вместо часов. Ты проверяешь, корректируешь и запускаешь.
          </p>

          <p className="text-zinc-400 leading-relaxed mb-6">
            Ограничения тоже нужно помнить. Данные живут на серверах OpenAI, что
            не всем подходит. Есть лимиты на использование — они зависят от
            плана и интенсивности, и без подписки доступа нет. Он не self-hosted
            и не сделан для непрерывной автономной работы. Поэтому использовать его как
            «сердце бизнеса» рискованно, но как самый быстрый мозг — идеально.
          </p>
          <SectionImage
            src="/course/block0/lesson2/b0l2-04-chatgpt.png"
            caption="ChatGPT — скорость, удобство и интеллект в моменте."
          />
        </section>

        {/* n8n */}
        <section className="bg-zinc-900 rounded-2xl p-6 md:p-10 mb-10 border border-zinc-800">
          <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4">
            n8n и автоматизация: сильная связка, но без «мозга»
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-4">
            n8n — это визуальный конструктор рабочих процессов. Он не делает
            магию, он делает порядок. Если у тебя есть повторяющиеся действия,
            n8n превращает их в цепочку: триггер → действие → проверка → результат.
            Сервисов больше 400: мессенджеры, CRM, Google Sheets, почта, платежи.
            И да, можно поставить на свой сервер, что важно для приватности.
          </p>
          <p className="text-zinc-400 leading-relaxed mb-4">
            Это лучший инструмент, когда тебе нужен автомат без принятия сложных
            решений. Например, когда клиент заполняет форму, данные должны
            улететь в таблицу, потом в CRM и уведомить менеджера. Или когда нужно
            каждое утро отправлять отчёт по продажам в Telegram. Эти задачи
            n8n делает идеально и без лишнего шума.
          </p>
          <p className="text-zinc-400 leading-relaxed mb-4">
            Но как только процесс становится нестандартным, возникают трения:
            нужно больше условий, больше исключений, больше «если». Тогда
            визуальная простота превращается в сложную схему, которую сложно
            поддерживать. И это нормально: n8n не создан быть мозгом, он создан
            быть надёжным исполнителем.
          </p>
          <p className="text-zinc-400 leading-relaxed mb-4">
            Правило: если ты ещё не делал процесс руками 5-10 раз — рано
            автоматизировать. n8n не исправит хаос, он его зацементирует.
          </p>
          <p className="text-zinc-400 leading-relaxed mb-6">
            Главный минус для агентной работы — отсутствие автономного мышления.
            n8n исполняет только то, что ты заранее описал. Если сценарий требует
            импровизации, выбора стратегии, исследования, диалога — n8n будет
            ломаться или требовать сложного кода. Для сложных сценариев тебе всё
            равно понадобится ИИ-ядро. Поэтому n8n — это отличный «скелет»
            процессов, но не мозг.
          </p>
          <SectionImage
            src="/course/block0/lesson2/b0l2-05-n8n.png"
            caption="n8n — инженерный конструктор для стабильной рутины."
          />
        </section>

        {/* OpenClaw */}
        <section className="bg-zinc-900 rounded-2xl p-6 md:p-10 mb-10 border border-zinc-800">
          <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4">
            OpenClaw: автономия, приватность и команда агентов
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-4">
            OpenClaw — это про «работает всегда». Ты поднимаешь платформу у себя
            и создаёшь агентов, которые действуют независимо от твоего
            присутствия. Они могут мониторить ниши, вести коммуникации,
            готовить отчёты, искать лиды и запускать тесты. Самое важное —
            автономность 24/7 и контроль над данными. Ты сам выбираешь модель:
            Claude, GPT, локальные модели — всё работает под твою задачу.
          </p>
          <p className="text-zinc-400 leading-relaxed mb-4">
            В OpenClaw есть многопоточность и мультиагентность. Один агент
            исследует, другой пишет, третий проверяет, четвёртый исполняет.
            Это похоже на маленькую команду, где каждый делает своё. Плюс есть
            интеграции с мессенджерами, почтой, календарями и бизнес-сервисами.
            Если тебе нужна бизнес-система, которая живёт сама по себе — это
            оно.
          </p>
          <p className="text-zinc-400 leading-relaxed mb-4">
            Ключевое преимущество — независимость. Завтра OpenAI поднимет цены
            или порежет лимиты — тебе всё равно. Переключаешь модель за 5 минут:
            с Claude на GPT, с GPT на локальный Llama. Данные клиентов остаются
            внутри твоей сети. Это не фича — это страховка бизнеса.
          </p>
          <p className="text-zinc-400 leading-relaxed mb-4">
            И ещё: OpenClaw отлично подходит для системной работы, когда задачи
            идут потоками. Например, агент каждую ночь мониторит новые конкуренты,
            пишет краткий отчёт, а утром отправляет его в Telegram или Notion.
            Такие задачи практически невозможно закрыть чисто в ChatGPT без
            постоянного присутствия человека.
          </p>
          <p className="text-zinc-400 leading-relaxed mb-6">
            Ограничения честные: нужна своя машина или сервер, стартовая
            настройка сложнее, чем просто открыть браузер. Нужно подключать API
            ключи, и стоимость зависит от объёма использования. Порог входа
            выше, но отдача тоже выше. Если ты готов построить фундамент, OpenClaw
            становится «центром управления» твоим бизнесом.
          </p>
          <SectionImage
            src="/course/block0/lesson2/b0l2-06-openclaw.png"
            caption="OpenClaw — автономные агенты как система, а не как игрушка."
          />
        </section>

        {/* Comparison + Decision */}
        <section className="bg-zinc-900 rounded-2xl p-6 md:p-10 mb-10 border border-zinc-800">
          <h2 className="text-2xl md:text-3xl font-semibold text-white mb-6">
            Сравнение по ключевым параметрам
          </h2>
          <div className="grid md:grid-cols-4 gap-4 text-sm">
            <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 text-zinc-400">
              <p className="text-white font-semibold mb-2">Фича</p>
              <p>24/7 автономия</p>
              <p className="mt-2">Приватность</p>
              <p className="mt-2">Время запуска</p>
              <p className="mt-2">AI принятие решений</p>
              <p className="mt-2">Мультиагентность</p>
              <p className="mt-2">Естественный язык</p>
              <p className="mt-2">Стоимость</p>
              <p className="mt-2">Лучше всего для</p>
            </div>
            <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4">
              <p className="text-white font-semibold mb-2">ChatGPT</p>
              <p className="text-zinc-400">❌</p>
              <p className="text-zinc-400 mt-2">❌ Cloud</p>
              <p className="text-zinc-400 mt-2">0 минут</p>
              <p className="text-zinc-400 mt-2">✅</p>
              <p className="text-zinc-400 mt-2">❌</p>
              <p className="text-zinc-400 mt-2">✅</p>
              <p className="text-zinc-400 mt-2">$20–200/мес</p>
              <p className="text-zinc-400 mt-2">Ресёрч, разовые задачи</p>
            </div>
            <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4">
              <p className="text-white font-semibold mb-2">n8n</p>
              <p className="text-zinc-400">Частично</p>
              <p className="text-zinc-400 mt-2">✅ Self-host</p>
              <p className="text-zinc-400 mt-2">2–4 часа</p>
              <p className="text-zinc-400 mt-2">❌</p>
              <p className="text-zinc-400 mt-2">❌</p>
              <p className="text-zinc-400 mt-2">❌</p>
              <p className="text-zinc-400 mt-2">От $0/мес</p>
              <p className="text-zinc-400 mt-2">Рутина, цепочки</p>
            </div>
            <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4">
              <p className="text-white font-semibold mb-2">OpenClaw</p>
              <p className="text-zinc-400">✅</p>
              <p className="text-zinc-400 mt-2">✅ Self-host</p>
              <p className="text-zinc-400 mt-2">2–4 часа</p>
              <p className="text-zinc-400 mt-2">✅</p>
              <p className="text-zinc-400 mt-2">✅</p>
              <p className="text-zinc-400 mt-2">✅</p>
              <p className="text-zinc-400 mt-2">$0 + API моделей</p>
              <p className="text-zinc-400 mt-2">Автономный бизнес</p>
            </div>
          </div>
          <p className="text-zinc-500 text-sm mt-6 leading-relaxed">
            Это не «таблица победителя». Это матрица выбора. Если задача разовая
            и требует твоего участия — нет смысла поднимать сервер. Если нужно
            быстро автоматизировать рутину — n8n даёт максимум за минимум
            времени. Если требуется автономия и контроль — OpenClaw закрывает
            то, что остальные не могут.
          </p>
          <SectionImage
            src="/course/block0/lesson2/b0l2-07-compare.png"
            caption="Сравнение помогает выбрать инструмент, а не спорить."
          />
          <h3 className="text-xl md:text-2xl font-semibold text-white mt-8 mb-4">
            Частые ошибки выбора
          </h3>
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div className="bg-zinc-950 border border-red-500/30 rounded-xl p-5">
              <p className="text-red-400 font-semibold mb-2">Ошибка №1</p>
              <p className="text-zinc-400">
                Автономный бизнес на ChatGPT. Результат: постоянная ручная
                работа и разочарование. ChatGPT — для быстрых побед, не для
                автопилота.
              </p>
            </div>
            <div className="bg-zinc-950 border border-red-500/30 rounded-xl p-5">
              <p className="text-red-400 font-semibold mb-2">Ошибка №2</p>
              <p className="text-zinc-400">
                n8n для гибких задач. Результат: бесконечные условия и хаос.
                n8n — для стабильной рутины, не для импровизации.
              </p>
            </div>
            <div className="bg-zinc-950 border border-red-500/30 rounded-xl p-5">
              <p className="text-red-400 font-semibold mb-2">Ошибка №3</p>
              <p className="text-zinc-400">
                OpenClaw без стабильного процесса. Результат: неделя настройки,
                ноль пользы. Сначала пойми что автоматизировать — потом строй.
              </p>
            </div>
          </div>
          <p className="text-zinc-400 leading-relaxed mb-6">
            Правильный подход — идти по шагам. Сначала разовые задачи закрываются
            ChatGPT. Затем повторяемые процессы стабилизируются и уходят в n8n.
            И только потом, когда ты понимаешь, что нужно постоянное автономное
            принятие решений, появляется OpenClaw.
          </p>
          <h3 className="text-xl md:text-2xl font-semibold text-white mt-8 mb-4">
            Когда что выбирать: простое дерево решений
          </h3>
          <p className="text-zinc-400 leading-relaxed mb-6">
            Чтобы не усложнять, держи простое правило. Если нужно быстро подумать,
            поискать, проверить или написать — выбирай ChatGPT. Если нужно
            повторяемое действие без сложных решений — выбирай n8n. Если нужен
            автономный агент, который сам решает задачи, запускает процессы и
            работает 24/7 — выбирай OpenClaw. Это всё. Простая логика, которая
            экономит месяцы экспериментов.
          </p>
          <p className="text-zinc-400 leading-relaxed mb-6">
            Для наглядности представь три ситуации. Первая: «Мне нужно быстро
            разобраться в теме, чтобы сегодня же поговорить с клиентом». Это
            ChatGPT. Вторая: «Каждый вечер я копирую данные из формы в таблицу».
            Это n8n. Третья: «Мне нужно, чтобы агент ежедневно анализировал рынок
            и сообщал об изменениях». Это OpenClaw.
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-5">
              <p className="text-white font-semibold mb-2">Быстрый ресёрч</p>
              <p className="text-zinc-400">
                Нужно понять рынок, сделать сводку, разобрать файлы или быстро
                получить стратегию? Это прямой кейс для ChatGPT Agent Mode.
              </p>
            </div>
            <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-5">
              <p className="text-white font-semibold mb-2">Рутинная цепочка</p>
              <p className="text-zinc-400">
                Повторяющиеся процессы без сложной логики? n8n превратит их в
                стабильный поток и избавит от ручной рутины.
              </p>
            </div>
            <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-5">
              <p className="text-white font-semibold mb-2">Автономный агент</p>
              <p className="text-zinc-400">
                Нужно, чтобы система работала без тебя, принимала решения и
                менялась под ситуацию? Это территория OpenClaw.
              </p>
            </div>
            <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-5">
              <p className="text-white font-semibold mb-2">Лучшая стратегия</p>
              <p className="text-zinc-400">
                Сильные ребята комбинируют всё: ChatGPT — для мышления, n8n — для
                рутины, OpenClaw — для автономии и масштаба.
              </p>
            </div>
          </div>
          <p className="text-zinc-400 leading-relaxed mt-6">
            Начни с того инструмента, который закроет самую болезненную задачу
            прямо сейчас. Остальные подключишь когда дорастёшь.
          </p>
          <SectionImage
            src="/course/block0/lesson2/b0l2-08-decision.png"
            caption="Дерево решений: быстро и без лишней боли."
          />
        </section>

        {/* Homework */}
        <section className="bg-zinc-900 rounded-2xl p-6 md:p-10 mb-10 border border-zinc-800">
          <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4">
            Домашка
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-4">
            Возьми список своих задач за последнюю неделю и разнеси их по трём
            колонкам: «ChatGPT», «n8n», «OpenClaw». Не думай слишком глубоко —
            это упражнение на честность. Если задача требует твоего участия,
            значит это ChatGPT. Если задача повторяется и не требует решений —
            это n8n. Если задача может идти сама и нуждается в гибкости —
            OpenClaw. После этого посмотри, где у тебя больше всего времени и
            боли. Именно туда и стоит вкладываться.
          </p>
          <p className="text-zinc-400 leading-relaxed mb-4">
            Второй шаг: выбери одну задачу из каждой колонки и напиши, какие
            конкретные действия надо сделать, чтобы передать её инструменту.
            Например, для ChatGPT: «Составить список вопросов и дать контекст».
            Для n8n: «Собрать триггер, настроить интеграции, проверить тест».
            Для OpenClaw: «Определить цель, создать агента, прописать расписание».
          </p>
          <p className="text-zinc-400 leading-relaxed">
            Если хочешь, можешь написать себе короткий план: какие процессы ты
            передашь n8n уже на этой неделе и какой один автономный процесс
            попробуешь сделать в OpenClaw. Не надо сразу всё. Один маленький
            автономный агент — уже большой шаг.
          </p>
          <SectionImage
            src="/course/block0/lesson2/b0l2-09-homework.png"
            caption="Сильные системы начинаются с честного списка задач."
          />
        </section>

        {/* Quiz */}
        <section className="mb-10">
          <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4">
            Мини‑тест: правильно выбираешь инструмент?
          </h2>
          <Quiz />
        </section>

        {/* Navigation */}
        <section className="flex flex-col sm:flex-row gap-4 justify-between">
          <Link
            href="/dashboard/course/block/0/lesson/1"
            className="px-6 py-3 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-lg text-zinc-200 text-center transition-colors"
          >
            ← Предыдущий урок
          </Link>
          <Link
            href="/dashboard/course/block/0/lesson/3"
            className="px-6 py-3 bg-[#FF4422] hover:bg-[#e63d1e] rounded-lg text-white text-center font-semibold transition-colors"
          >
            Следующий урок →
          </Link>
        </section>
      </div>
    </main>
  );
}
