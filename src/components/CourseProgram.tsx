"use client";

import Image from "next/image";
import { useState } from "react";

interface Section {
  title: string;
  topics: string[];
}

interface Block {
  num: number;
  locked: boolean;
  title: string;
  subtitle: string;
  desc: string;
  topics?: string[];
  sections?: Section[];
  tier?: string;
}

const blocks: Block[] = [
  {
    num: 0,
    locked: false,
    title: "Вход — что такое ИИ-агент",
    subtitle: "«Что такое ИИ-агент и почему это меняет всё»",
    desc: "Ты узнаешь чем агент отличается от обычного чат-бота, почему OpenClaw — это не просто \"ещё один ChatGPT\", и увидишь реальные кейсы людей которые уже изменили свою жизнь с помощью агентов — в бизнесе, творчестве, учёбе и повседневной жизни.",
    topics: [
      "Что такое ИИ-агент и как он думает и действует",
      "OpenClaw vs ChatGPT vs n8n — в чём принципиальная разница",
      "Реальные кейсы: предприниматель автоматизировал команду, дизайнер делегировал рутину, студент выстроил систему обучения, фрилансер построил доход",
      "Твой результат и карта пути: от Block 0 до Block 5",
    ],
  },
  {
    num: 1,
    locked: true,
    tier: "Genesis",
    title: "Установка и первый агент",
    subtitle: "«Первый агент за 15 минут»",
    desc: "Никакой теории — только практика. Ставим OpenClaw, запускаем первого агента и сразу видим результат. Неважно кто ты — к концу блока у тебя будет живой работающий агент.",
    topics: [
      "Установка OpenClaw: Mac, Linux, Windows, VPS — пошагово",
      "Первый запуск и базовая настройка под твои задачи",
      "Создаём Telegram агента с нуля за 15 минут",
      "Подключение к внешним сервисам: Google, Notion, Calendar",
      "Первая автоматизация: Бизнес — агент отвечает клиентам / Творчество — агент ведёт соцсети / Учёба — агент-напоминалка / Заработок — агент-ресёрчер / Жизнь — агент облегчает рутину",
    ],
  },
  {
    num: 2,
    locked: true,
    tier: "Genesis",
    title: "Агент на работе: первые реальные кейсы",
    subtitle: "«От настройки к результату за 30 минут»",
    desc: "Заставляем агента работать на тебя. 5 уроков с готовыми промптами и реальными кейсами — выбираешь свой трек и получаешь результат уже в первый день.",
    topics: [
      "Агент-автоответчик: отвечает за тебя пока ты занят — экономишь 2 часа в день",
      "Агент-ресёрчер: аналитические отчёты по любой теме за 5 минут вместо 2 часов",
      "Email-агент: классифицирует inbox, готовит черновики — для фрилансеров",
      "Контент-агент: план на неделю и готовые посты для TG/Instagram — для блогеров",
      "Агент-парсер рынка: мониторинг конкурентов и цен автоматически — для бизнеса",
    ],
  },
  {
    num: 3,
    locked: true,
    title: "Мультиагент и автоматизация",
    subtitle: "«Перестань управлять агентами — пусть они управляют собой»",
    desc: "20 уроков, 4 трека. Строим системы где несколько агентов работают в команде — от архитектуры и ролей до запуска автономной системы по расписанию.",
    sections: [
      {
        title: "Почему мультиагент (уроки 1–3)",
        topics: [
          "Один агент — это потолок: где физические ограничения",
          "Роли: Orchestrator, Workers, Monitor — кто есть кто",
          "Квиз: выбери свой трек — Фрилансер / Бизнес / Контент / Заработок",
        ],
      },
      {
        title: "Архитектура команды (уроки 4–7)",
        topics: [
          "Делегирование и изоляция: чёткий Input/Output для каждого агента",
          "Cron + мультиагент: система работает без тебя по расписанию",
          "QA-агент: контроль качества до того как результат дойдёт до тебя",
          "Живой пример: система Zen + Dev + Mark в действии",
        ],
      },
      {
        title: "Практика по трекам (уроки 8–15)",
        topics: [
          "Фрилансер: КП + трекер + коммуникатор + биллинг",
          "Бизнес: CRM + поддержка + аналитика + воронка продаж",
          "Контент: Research → Write → Edit → Publish → Distribute",
          "Заработок: мониторинг рынков + планировщик возможностей",
        ],
      },
      {
        title: "Управление и мониторинг (уроки 16–17)",
        topics: [
          "Токены, бюджеты, watchdog — контроль расходов и зацикливания",
          "Обработка ошибок и fallback — система которая умеет восстанавливаться",
        ],
      },
      {
        title: "Безопасность и финал (уроки 18–20)",
        topics: [
          "Границы агента: принцип минимальных прав",
          "Секреты и API ключи: безопасное хранение и ротация",
          "Капстоун: запусти свою первую мультиагентную систему",
        ],
      },
    ],
  },
  {
    num: 4,
    locked: true,
    title: "Продай своего агента: ClawHub, SaaS и виртуальный сотрудник",
    subtitle: "«Ты строил — теперь продаёшь. Первые $1000 с агентов»",
    desc: "12 уроков, 3 пути монетизации. Перестаёшь быть пользователем и становишься поставщиком: виртуальный сотрудник, ClawHub маркетплейс или SaaS продукт.",
    sections: [
      {
        title: "Секция 1: Разворот",
        topics: [
          "Твоя система стала продуктом",
          "Выбери свой путь: сотрудник, ClawHub или SaaS",
        ],
      },
      {
        title: "Секция 2: Виртуальный сотрудник",
        topics: [
          "Агент-сотрудник: настройка под клиента",
          "White-label: твой агент под чужим брендом",
          "SLA без страха: что обещать клиенту",
          "Продакшн: агент работает — ты спишь",
        ],
      },
      {
        title: "Секция 3: ClawHub маркетплейс",
        topics: [
          "ClawHub: маркетплейс агентов",
          "Упаковка агента для продажи",
          "Первая продажа на ClawHub",
        ],
      },
      {
        title: "Секция 4: Один агент для многих",
        topics: [
          "Multi-tenant: один агент для многих клиентов",
          "Биллинг: как брать деньги за агента",
          "Капстоун: запускаем первого клиента",
        ],
      },
    ],
  },
  {
    num: 5,
    locked: true,
    title: "Бизнес-модель: упаковка, клиенты, прайсинг",
    subtitle: "«Твои агенты работают — ты решаешь куда»",
    desc: "Продукт готов. Теперь учимся его продавать и масштабировать — в любой сфере, под любую цель.",
    sections: [
      {
        title: "Продажи и клиенты",
        topics: [
          "Как описать что ты делаешь — просто и понятно для любого клиента",
          "Прайсинг: разово, ретейнер, % от результата — как не продешевить",
          "Где искать: Telegram, LinkedIn, Upwork, местные бизнесы",
          "Холодный outreach: шаблоны сообщений которые работают",
          "Шаблоны договоров и актов — готовые к использованию",
          "Возражения клиентов и как с ними работать",
        ],
      },
      {
        title: "Упаковка под категорию",
        topics: [
          "Бизнес: кейс-стади и портфолио — как показать результат клиенту",
          "Творчество: как монетизировать агента в арт, музыке, дизайне",
          "Учёба: образовательный агент как продукт — курс, подписка, тьютор",
          "Заработок: агентство агентов — от фриланса к системному бизнесу",
        ],
      },
      {
        title: "Масштаб и следующий уровень",
        topics: [
          "План выхода на $1000/мес — пошагово под каждую категорию",
          "Автоматизация продаж: агент который продаёт твоих агентов",
          "Реферальная система: твои результаты привлекают других",
          "Следующий уровень: агентство, SaaS-продукт, экспертный бренд",
        ],
      },
    ],
  },
];

function BlockCard({ block }: { block: Block }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800">
      <Image
        src={`/covers/block${block.num}.png`}
        alt={block.title}
        width={800}
        height={400}
        className="w-full h-64 object-cover"
      />
      <div className="p-6">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="bg-zinc-800 text-zinc-400 text-xs px-3 py-1 rounded-full">
            Block {block.num}
          </span>
          {block.locked && (
            <span className="bg-[#FF4422]/10 text-[#FF4422] text-xs px-3 py-1 rounded-full">
              🔒 {block.tier ?? "Pro / Elite"}
            </span>
          )}
        </div>
        <h3 className="text-white font-bold text-xl mt-3">{block.title}</h3>
        <p className="text-zinc-500 text-sm italic mt-1">{block.subtitle}</p>
        <p className="text-zinc-400 text-sm mt-4 leading-relaxed">{block.desc}</p>

        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-4 text-[#FF4422] text-sm font-semibold hover:underline focus:outline-none"
        >
          {expanded ? "Скрыть ▲" : "Подробнее ▼"}
        </button>

        {expanded && (
          <>
            {block.topics && (
              <ul className="mt-4 space-y-2">
                {block.topics.map((t, i) => (
                  <li key={i} className="text-zinc-400 text-sm flex gap-2">
                    <span className="text-[#FF4422] mt-1">•</span>
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            )}
            {block.sections &&
              block.sections.map((sec, si) => (
                <div key={si}>
                  <h4 className="text-zinc-300 font-semibold text-sm mt-4 mb-2">
                    {sec.title}
                  </h4>
                  <ul className="space-y-2">
                    {sec.topics.map((t, ti) => (
                      <li key={ti} className="text-zinc-400 text-sm flex gap-2">
                        <span className="text-[#FF4422] mt-1">•</span>
                        <span>{t}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
          </>
        )}
      </div>
    </div>
  );
}

export default function CourseProgram() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-20">
      <h2 className="text-3xl font-bold text-white text-center mb-12">
        Программа курса
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blocks.map((block) => (
          <BlockCard key={block.num} block={block} />
        ))}
      </div>
    </section>
  );
}
