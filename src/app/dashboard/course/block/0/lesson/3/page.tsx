"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const cases = [
  {
    id: 1,
    handle: "@kirillk_web3",
    postUrl: "https://x.com/kirillk_web3/status/2031009107780796639",
    screenshotFile: "post_01_kirillk.jpg",
    headline: "Китайский студент: $218K за 10 дней на Polymarket",
    text: "Программист из китайского университета написал OpenClaw бот для торговли на Polymarket. Вкратце показал стратегию — и попросил не распространять. За 10 дней бот сгенерировал $218K. 354 предсказания, в основном Bitcoin рынки.",
    theme: "money",
    themeLabel: "💰 Трейдинг",
    keyNumbers: ["$218K", "10 дней", "354 сделки"],
    date: "Mar 9, 2026",
  },
  {
    id: 2,
    handle: "@k1rallik",
    postUrl: "https://x.com/k1rallik/status/2028479741913698792",
    screenshotFile: "post_02_k1rallik.jpg",
    headline: "$50 → $1,000/день: 72 часа без остановки",
    text: "OpenClaw работает 72 часа без перерыва — без сна, без пощады. Использует Claude Sonnet как шахматный движок: каждые 5 минут сканирует тысячи контрактов Polymarket, вычисляет реальную вероятность и ставит только когда есть настоящее преимущество.",
    theme: "money",
    themeLabel: "💰 Трейдинг",
    keyNumbers: ["$50→$1K/день", "72 часа", "авто-торговля"],
    date: "Mar 2, 2026",
  },
  {
    id: 3,
    handle: "@everestchris6",
    postUrl: "https://x.com/everestchris6/status/2029653579657789603",
    screenshotFile: "post_03_everestchris_agency.jpg",
    headline: "Полноценное веб-агентство на автопилоте",
    text: "OpenClaw бот запускает целое агентство: находит сотни локальных бизнесов через Google Maps, AI аудирует каждый сайт (оценки A-D), строит кастомные сайты для худших, отправляет превью, AI голосовой агент звонит и закрывает сделку. Всё 24/7 без ручного труда.",
    theme: "automation",
    themeLabel: "🏢 Автоматизация",
    keyNumbers: ["100+ бизнесов", "24/7", "6 агентов"],
    date: "Mar 6, 2026",
  },
  {
    id: 4,
    handle: "@everestchris6",
    postUrl: "https://x.com/everestchris6/status/2028939891342733823",
    screenshotFile: "post_04_everestchris_leads.jpg",
    headline: "Автосайты + видео-питч для каждого лида",
    text: "Инструмент парсит лиды из Google Maps, строит сайт для каждого бизнеса, записывает видео с их новым сайтом и отправляет как персональный холодный питч. Лид видит сайт сделанный специально для него — конверсия несравнимо выше.",
    theme: "automation",
    themeLabel: "🏢 Автоматизация",
    keyNumbers: ["Google Maps", "авто-сайт", "видео-питч"],
    date: "Mar 4, 2026",
  },
  {
    id: 5,
    handle: "@TheAIHub111",
    postUrl: "https://x.com/TheAIHub111/status/2031109363000287232",
    screenshotFile: "post_05_theaihub.jpg",
    headline: "6 агентов закрывают продажи без участия человека",
    text: "Бот управляет 6 агентами 24/7: находит бизнесы без сайта, строит демо, отправляет ссылку с оплатой, обрабатывает возражения, закрывает продажу. Полностью автономная цепочка от поиска до получения денег.",
    theme: "automation",
    themeLabel: "🏢 Автоматизация",
    keyNumbers: ["6 агентов", "24/7", "авто-продажи"],
    date: "Mar 10, 2026",
  },
  {
    id: 6,
    handle: "@kirillk_web3",
    postUrl: "https://x.com/kirillk_web3/status/2030340473043431749",
    screenshotFile: "post_06_kirillk_500.jpg",
    headline: "$500 пока спал. Ещё $500 утром.",
    text: "OpenClaw агент заработал $500 пока я спал. Проснулся — терминал всё ещё работает, ещё $500 добавилось. Я не делал ни одного предсказания. Просто понял механику. 8 часов на сборку, один вечер на архитектуру. Теперь работает в фоне.",
    theme: "money",
    themeLabel: "💰 Трейдинг",
    keyNumbers: ["$500 за ночь", "8ч на сборку", "пассивно"],
    date: "Mar 8, 2026",
  },
  {
    id: 7,
    handle: "@Jacobsklug",
    postUrl: "https://x.com/Jacobsklug/status/2029187703745724518",
    screenshotFile: "post_07_jacobsklug.jpg",
    headline: "16 агентов за $400/мес — компания спит, система работает",
    text: "Основатель запустил 16 OpenClaw агентов за $400/месяц. Вся компания работает пока он спит: ресёрч, контент, code review, аутрич — 24/7. Дешёвые LLM для простых задач, дорогие модели для кода. Полностью автономно.",
    theme: "scale",
    themeLabel: "🚀 Продукты",
    keyNumbers: ["16 агентов", "$400/мес", "24/7"],
    date: "Mar 4, 2026",
  },
  {
    id: 8,
    handle: "@VadimStrizheus",
    postUrl: "https://x.com/VadimStrizheus/status/2028583969919238542",
    screenshotFile: "post_08_vadim.jpg",
    headline: "Один YT-линк на входе — готовые клипы на выходе",
    text: "OpenClaw нарезал весь подкаст автоматически: нашёл вирусные моменты, добавил профессиональные субтитры, обрезал с face tracking, запланировал и опубликовал. Всё что нужно — отправить YT ссылку в Telegram бот.",
    theme: "content",
    themeLabel: "🎬 Контент",
    keyNumbers: ["1 YT ссылка", "авто-нарезка", "авто-пост"],
    date: "Mar 3, 2026",
  },
  {
    id: 9,
    handle: "@chrysb",
    postUrl: "https://x.com/chrysb/status/2022725723312865710",
    screenshotFile: "post_09_chrysb.jpg",
    headline: "Дала агенту $1K — она торгует акциями сама",
    text: "Дал OpenClaw $1K бюджет и доступ к автономной торговле акциями. Она сама выработала процесс: глубокое исследование, построение тезисов, управление рисками. Просыпается в 6 утра, сканирует пре-маркет, делает решения до открытия. Я ничего не одобряю.",
    theme: "autonomous",
    themeLabel: "🚀 Продукты",
    keyNumbers: ["$1K бюджет", "6am старт", "без одобрения"],
    date: "Feb 15, 2026",
  },
  {
    id: 10,
    handle: "@saviomartin7",
    postUrl: "https://x.com/saviomartin7/status/2018437642820731148",
    screenshotFile: "post_10_saviomartin.jpg",
    headline: "simpleclaw.com за выходные — 413K просмотров",
    text: "Сайд-проект за выходные: simpleclaw.com — деплой OpenClaw за 1 минуту для обычных людей. Без технических знаний, один клик. 413K просмотров поста. Написан на OpenClaw — живой пример того что можно построить за 2 дня.",
    theme: "product",
    themeLabel: "🚀 Продукты",
    keyNumbers: ["413K просмотров", "1 мин деплой", "выходные"],
    date: "Feb 3, 2026",
  },
  {
    id: 11,
    handle: "@TheMattBerman",
    postUrl: "https://x.com/TheMattBerman/status/2027220216409723296",
    screenshotFile: "post_11_mattberman.jpg",
    headline: "Meta Ads на автопилоте за $0/месяц",
    text: "Запускаю Meta рекламу через OpenClaw за $0/месяц. Система: ежедневная проверка кампаний, social-cli обёртывает Meta Marketing API (токены, rate limits), анализирует что работает и что кровоточит. Полностью без ручного труда.",
    theme: "ads",
    themeLabel: "🏢 Автоматизация",
    keyNumbers: ["$0/мес", "Meta Ads", "автономно"],
    date: "Feb 27, 2026",
  },
  {
    id: 12,
    handle: "@jacobgrowth",
    postUrl: "https://x.com/jacobgrowth/status/2027816234964946977",
    screenshotFile: "post_12_jacobgrowth.jpg",
    headline: "$10K на нарезке поп-культуры",
    text: "OpenClaw агент принёс $10K на клипинге поп-культурного контента. Движок нарезает, пишет скрипты и дистрибутирует по каналам полностью на автопилоте. Собирает бренд-выплаты пока мы не за столом. Без камеры — только OpenClaw.",
    theme: "content",
    themeLabel: "🎬 Контент",
    keyNumbers: ["$10K", "2.3M просмотров", "автопилот"],
    date: "Mar 2, 2026",
  },
];

const filters = [
  { id: "all", label: "Все" },
  { id: "money", label: "💰 Трейдинг" },
  { id: "automation", label: "🏢 Автоматизация" },
  { id: "content", label: "🎬 Контент" },
  { id: "product", label: "🚀 Продукты" },
];

const matchesFilter = (theme: string, filterId: string) => {
  if (filterId === "all") return true;
  if (filterId === "money") return theme === "money";
  if (filterId === "automation") return theme === "automation" || theme === "ads";
  if (filterId === "content") return theme === "content";
  if (filterId === "product") {
    return theme === "scale" || theme === "autonomous" || theme === "product";
  }
  return true;
};

export default function Block0Lesson3Page() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [expandedIds, setExpandedIds] = useState<number[]>([]);

  const filteredCases = cases.filter((item) => matchesFilter(item.theme, activeFilter));

  const toggleExpanded = (id: number) => {
    setExpandedIds((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
  };

  return (
    <main className="min-h-screen bg-[#0D0D0D] text-white">
      <section className="max-w-6xl mx-auto px-4 pt-10 pb-8">
        <nav className="text-zinc-500 text-sm mb-4 flex items-center gap-1.5">
          <Link href="/dashboard" className="hover:text-zinc-300 transition-colors">
            Dashboard
          </Link>
          <span>/</span>
          <span>Block 0</span>
          <span>/</span>
          <span className="text-zinc-300">Урок 3</span>
        </nav>

        <div className="flex flex-col gap-4">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF4422]/15 text-[#FF4422] text-xs font-semibold tracking-wide">
            Кейсы • Реальные цифры
          </span>
          <h1 className="text-3xl md:text-5xl font-bold leading-tight">
            Урок 3: Реальные истории успеха
          </h1>
          <p className="text-zinc-400 text-lg md:text-xl">
            12 доказанных кейсов. Реальные люди. Конкретные цифры.
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 pb-6">
        <div className="flex flex-wrap gap-3">
          {filters.map((filter) => {
            const isActive = activeFilter === filter.id;
            return (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all border ${
                  isActive
                    ? "bg-[#FF4422] text-white border-[#FF4422]"
                    : "bg-[#151515] text-zinc-300 border-zinc-800 hover:border-[#FF4422]/60 hover:text-white"
                }`}
              >
                {filter.label}
              </button>
            );
          })}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredCases.map((item) => {
            const isExpanded = expandedIds.includes(item.id);
            return (
              <article
                key={item.id}
                className="bg-[#111111] border border-zinc-800 rounded-2xl p-5 flex flex-col gap-4 shadow-[0_0_0_1px_rgba(255,68,34,0.04)]"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm text-zinc-400">{item.handle}</span>
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#FF4422]/15 text-[#FF4422]">
                    {item.themeLabel}
                  </span>
                </div>

                <div className="flex flex-col gap-2">
                  <h3 className="text-xl font-semibold leading-snug">{item.headline}</h3>
                  <span className="text-xs text-zinc-500">{item.date}</span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {item.keyNumbers.map((value) => (
                    <span
                      key={`${item.id}-${value}`}
                      className="px-3 py-1 rounded-full text-xs font-semibold bg-zinc-900 text-zinc-200 border border-zinc-800"
                    >
                      {value}
                    </span>
                  ))}
                </div>

                {!isExpanded && (
                  <button
                    onClick={() => toggleExpanded(item.id)}
                    className="text-sm font-semibold text-[#FF4422] hover:text-white transition-colors self-start"
                  >
                    Читать ▼
                  </button>
                )}

                {isExpanded && (
                  <div className="flex flex-col gap-4">
                    <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden border border-zinc-800">
                      <Image
                        src={`/lesson3-media/${item.screenshotFile}`}
                        alt={`Скриншот ${item.handle}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <p className="text-zinc-300 leading-relaxed">{item.text}</p>
                    <Link
                      href={item.postUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-semibold text-[#FF4422] hover:text-white transition-colors"
                    >
                      🔗 Открыть пост
                    </Link>
                    <button
                      onClick={() => toggleExpanded(item.id)}
                      className="text-sm font-semibold text-[#FF4422] hover:text-white transition-colors self-start"
                    >
                      Свернуть ▲
                    </button>
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 pb-12">
        <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
          <Link
            href="/dashboard/course/block/0/lesson/2"
            className="px-5 py-3 rounded-xl border border-zinc-800 text-zinc-300 hover:text-white hover:border-[#FF4422] transition-colors"
          >
            ← Назад к уроку 2
          </Link>
          <Link
            href="/dashboard/course/block/0/lesson/4"
            className="px-5 py-3 rounded-xl bg-[#FF4422] text-white font-semibold hover:bg-[#e63d1e] transition-colors"
          >
            Вперёд к уроку 4 →
          </Link>
        </div>
      </section>
    </main>
  );
}
