"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const cases = [
  {
    id: 1,
    handle: "@kirillk_web3",
    postUrl: "https://x.com/kirillk_web3/status/2031009107780796639",
    mediaFile: "/lesson3-media/posts/post_01_kirillk_video1.mp4",
    mediaType: "video" as const,
    headline: "Китайский студент: $218K за 10 дней на Polymarket",
    originalText: `A Chinese University Programmer Built an OpenClaw bot that trades Polymarket. He briefly shared the strategy behind it… and then asked people not to spread it. In just 10 days it generated about $218K. Look at the profit curve above. 354 predictions. Mostly Bitcoin markets.`,
    context: "Бот анализировал рынки Polymarket и делал ставки на основе вероятностной модели. 354 предсказания за 10 дней — в среднем 35 сделок в сутки. Основной акцент на Bitcoin рынках.",
    theme: "money",
    themeLabel: "💰 Трейдинг",
    keyNumbers: ["$218K", "10 дней", "354 сделки"],
    date: "Mar 9, 2026",
  },
  {
    id: 2,
    handle: "@k1rallik",
    postUrl: "https://x.com/k1rallik/status/2028479741913698792",
    mediaFile: "/lesson3-media/posts/post_02_k1rallik_video.mp4",
    mediaType: "video" as const,
    headline: "$50 → $1,000/день: 72 часа без остановки",
    originalText: `$50 → $1,000/day. OpenClaw has been running for 72 hours straight. no breaks. no sleep. no mercy. it uses Claude Sonnet to read the market like a chess engine - every 5 minutes it scans thousands of Polymarket contracts. Calculates true probability, and only bets when the edge is real.`,
    context: "Бот использует Claude Sonnet для анализа рынка. Каждые 5 минут — полный скан тысяч контрактов Polymarket. Ставит только при реальном статистическом преимуществе. Вырос с $50 до $1,000 в день за 72 часа работы.",
    theme: "money",
    themeLabel: "💰 Трейдинг",
    keyNumbers: ["$50→$1K/день", "72 часа", "Claude Sonnet"],
    date: "Mar 2, 2026",
  },
  {
    id: 3,
    handle: "@everestchris6",
    postUrl: "https://x.com/everestchris6/status/2029653579657789603",
    mediaFile: "/lesson3-media/posts/post_03_everestchris_video.mp4",
    mediaType: "video" as const,
    headline: "Полноценное веб-агентство на автопилоте",
    originalText: `My OpenClaw bot runs a complete website agency on autopilot: Finds 100's of local businesses via Google Maps, AI audits every site → grades them A-D, Builds custom websites for the worst ones, Texts them the preview link, AI voice agent calls to close the deal, Runs 24/7 with zero manual work.`,
    context: "6 последовательных AI агентов: поиск → аудит → разработка → outreach → звонок → закрытие. Каждый этап полностью автоматизирован. Человек в цепочке не участвует.",
    theme: "automation",
    themeLabel: "🏢 Автоматизация",
    keyNumbers: ["100+ бизнесов", "24/7", "6 агентов"],
    date: "Mar 6, 2026",
  },
  {
    id: 4,
    handle: "@everestchris6",
    postUrl: "https://x.com/everestchris6/status/2028939891342733823",
    mediaFile: "/lesson3-media/posts/post_04_everestchris_video.mp4",
    mediaType: "video" as const,
    headline: "Автосайты + видео-питч для каждого лида",
    originalText: `I built an openclaw tool that automatically builds websites for leads it scrapes from google maps, auto-records the website as a video, and sends it to them as a cold pitch... It literally screen records the website that was made for THEIR business, so the lead will feel it's personalized.`,
    context: "Система записывает скринкаст нового сайта, созданного конкретно для этого бизнеса. Лид получает видео «смотри, вот твой новый сайт». Персонализация без ручного труда.",
    theme: "automation",
    themeLabel: "🏢 Автоматизация",
    keyNumbers: ["Google Maps", "авто-сайт", "видео-питч"],
    date: "Mar 4, 2026",
  },
  {
    id: 5,
    handle: "@TheAIHub111",
    postUrl: "https://x.com/TheAIHub111/status/2031109363000287232",
    mediaFile: "/lesson3-media/posts/post_05_theaihub_video.mp4",
    mediaType: "video" as const,
    headline: "6 агентов — от поиска клиента до получения денег",
    originalText: `My OpenClaw bot runs 6 AI agents 24/7: Finds local businesses without a website, Builds a custom demo site for them automatically, Sends outreach with the preview + payment link, Handles objections and closes the sale. Most local businesses don't have a website, this system finds them, pitches them, and collects payment automatically.`,
    context: "Большинство локальных бизнесов не имеют сайта. Система находит таких, создаёт демо и отправляет со ссылкой на оплату. Обработка возражений тоже автоматизирована.",
    theme: "automation",
    themeLabel: "🏢 Автоматизация",
    keyNumbers: ["6 агентов", "24/7", "авто-оплата"],
    date: "Mar 10, 2026",
  },
  {
    id: 6,
    handle: "@kirillk_web3",
    postUrl: "https://x.com/kirillk_web3/status/2030340473043431749",
    mediaFile: "/lesson3-media/posts/post_06_kirillk_img.jpg",
    mediaType: "image" as const,
    headline: "$500 пока спал. Ещё $500 утром.",
    originalText: `This OpenClaw agent made $500 while I was asleep. Woke up to the terminal still running. Another $500 added overnight. I didn't predict a single market. I just understood the loop. It took 8 hours to build and one afternoon to figure out the architecture. Now it just runs in the background while I sleep.`,
    context: "8 часов сборки + один вечер на архитектуру. Потом — полностью пассивный доход. Ключевая мысль: «Я просто понял механику цикла». Не нужно угадывать рынок — нужно понять логику.",
    theme: "money",
    themeLabel: "💰 Трейдинг",
    keyNumbers: ["$500 за ночь", "8ч на сборку", "пассивно"],
    date: "Mar 8, 2026",
  },
  {
    id: 7,
    handle: "@Jacobsklug",
    postUrl: "https://x.com/Jacobsklug/status/2029187703745724518",
    mediaFile: "/lesson3-media/posts/post_07_jacobsklug_video.mp4",
    mediaType: "video" as const,
    headline: "16 агентов за $400/мес — компания работает сама",
    originalText: `This founder has 16 @openclaw agents for $400/month. His entire company operates while he sleeps. In the video: How he structured 16 sub-agents under one OpenClaw instance, The cron job system running research, content, code reviews, and outreach 24/7, Routing cheap LLMs for simple tasks, expensive models for coding.`,
    context: "Архитектура: один главный OpenClaw + 16 специализированных агентов. Дешёвые модели для рутины, дорогие — для кода. Cron расписание: ресёрч, контент, code review, аутрич — всё по таймеру.",
    theme: "scale",
    themeLabel: "🚀 Масштаб",
    keyNumbers: ["16 агентов", "$400/мес", "24/7"],
    date: "Mar 4, 2026",
  },
  {
    id: 8,
    handle: "@VadimStrizheus",
    postUrl: "https://x.com/VadimStrizheus/status/2028583969919238542",
    mediaFile: "/lesson3-media/posts/post_08_vadim_video.mp4",
    mediaType: "video" as const,
    headline: "Один YT-линк → готовые клипы с субтитрами",
    originalText: `Clippers are DOOMED!! My OpenClaw clipped this entire podcast with @Vugola. - Found viral moments - Added professional captions - Cropped and face tracked - Scheduled and posted for me. All I had to do was send one YT link to my telegram bot. Social media growth has never been easier and cheaper until now.`,
    context: "Отправил YT ссылку в Telegram бот → OpenClaw нашёл вирусные моменты, добавил субтитры, обрезал с face tracking, запланировал публикацию. Ноль ручного редактирования.",
    theme: "content",
    themeLabel: "🎬 Контент",
    keyNumbers: ["1 YT ссылка", "авто-нарезка", "авто-пост"],
    date: "Mar 3, 2026",
  },
  {
    id: 9,
    handle: "@chrysb",
    postUrl: "https://x.com/chrysb/status/2022725723312865710",
    mediaFile: "/lesson3-media/posts/post_09_chrysb_img.jpg",
    mediaType: "image" as const,
    headline: "Дала агенту $1K — он торгует акциями сам",
    originalText: `I gave my @openclaw a $1K budget and access to trade stocks autonomously. she's developed a process for deep research, building theses, and managing risk. she wakes up at 6am, scans pre-market, and makes her own calls by market open. I don't approve anything.`,
    context: "Агент сам выработал процесс: исследование → тезисы → управление риском. Просыпается в 6 утра, до открытия рынка уже готово решение. Владелец не одобряет ни одну сделку.",
    theme: "autonomous",
    themeLabel: "🤖 Автономия",
    keyNumbers: ["$1K бюджет", "6am старт", "без одобрения"],
    date: "Feb 15, 2026",
  },
  {
    id: 10,
    handle: "@saviomartin7",
    postUrl: "https://x.com/saviomartin7/status/2018437642820731148",
    mediaFile: "/lesson3-media/posts/post_10_saviomartin_video.mp4",
    mediaType: "video" as const,
    headline: "simpleclaw.com за выходные — 413K просмотров",
    originalText: `weekend side project: simpleclaw.com > ultra simple one-click deploy OpenClaw done under 1 min > built for all normal people`,
    context: "simpleclaw.com — деплой OpenClaw за одну минуту без технических знаний. Построен за выходные. 413K просмотров поста. Живой пример: если есть идея, в пятницу вечером — к воскресенью уже продукт.",
    theme: "product",
    themeLabel: "🚀 Продукты",
    keyNumbers: ["413K просмотров", "1 мин деплой", "выходные"],
    date: "Feb 3, 2026",
  },
  {
    id: 11,
    handle: "@TheMattBerman",
    postUrl: "https://x.com/TheMattBerman/status/2027220216409723296",
    mediaFile: "/lesson3-media/posts/post_11_berman_video.mp4",
    mediaType: "video" as const,
    headline: "Meta Ads на автопилоте за $0/месяц",
    originalText: `I run my meta ads with @openclaw for $0/month. here's the system that runs autonomously: step 1: daily health check → social-cli wraps Meta's marketing API (token refresh, pagination, rate limits all handled) → am I on track? what's running? who's winning? who's bleeding? any fatigue?`,
    context: "social-cli оборачивает Meta Marketing API — обновление токенов, pagination, rate limits. Ежедневная проверка: что работает, что теряет деньги, есть ли усталость у аудитории. Полностью автоматически.",
    theme: "ads",
    themeLabel: "🏢 Автоматизация",
    keyNumbers: ["$0/мес", "Meta Ads", "автономно"],
    date: "Feb 27, 2026",
  },
  {
    id: 12,
    handle: "@jacobgrowth",
    postUrl: "https://x.com/jacobgrowth/status/2027816234964946977",
    mediaFile: "/lesson3-media/posts/post_12_jacobgrowth_img1.jpg",
    mediaType: "image" as const,
    headline: "$10K на нарезке поп-культуры",
    originalText: `This OpenClaw AI Agent Made Me $10K Clipping Pop Culture Content... i'm going to show you how we built a content engine that clips, scripts, and distributes pop culture content across multiple channels. completely on autopilot and pulls brand payouts from content rewards while we're not even at our desks. we don't require any camera for this. just openclaw, doing the work.`,
    context: "Движок нарезает, пишет скрипты и дистрибутирует поп-культурный контент по нескольким каналам. Бренд-выплаты приходят пока создатель не за столом. Не нужна камера, студия или монтаж.",
    theme: "content",
    themeLabel: "🎬 Контент",
    keyNumbers: ["$10K", "2.3M просмотров", "авто-дистрибуция"],
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
  if (filterId === "automation")
    return theme === "automation" || theme === "ads";
  if (filterId === "content") return theme === "content";
  if (filterId === "product")
    return (
      theme === "scale" ||
      theme === "autonomous" ||
      theme === "product"
    );
  return true;
};

export default function Block0Lesson3Page() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [expandedIds, setExpandedIds] = useState<number[]>([]);

  const filteredCases = cases.filter((item) =>
    matchesFilter(item.theme, activeFilter)
  );

  const toggleExpanded = (id: number) => {
    setExpandedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <main className="min-h-screen bg-[#0D0D0D] text-white">
      {/* Block Navigation */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-4">
        <div className="flex items-center gap-2 flex-wrap">
          <Link href="/dashboard" className="text-xs text-zinc-500 hover:text-white transition-colors mr-2">
            ← Дашборд
          </Link>
          {[
            { num: 0, href: "/dashboard/course/block/0/lesson/1" },
            { num: 1, href: "/dashboard/course/block/1/lesson/1" },
            { num: 2, href: "/dashboard/course/block/2/lesson/1" },
            { num: 3, href: "/dashboard/course/block/3/lesson/1" },
            { num: 4, href: "/dashboard/course/block/4/lesson/1" },
          ].map((b) => (
            <Link
              key={b.num}
              href={b.href}
              className={`text-xs px-3 py-1 rounded-lg border transition-colors ${
                b.num === 0
                  ? "border-[#FF4422] text-[#FF4422]"
                  : "border-zinc-700 text-zinc-400 hover:text-white hover:border-zinc-500"
              }`}
            >
              Блок {b.num}
            </Link>
          ))}
        </div>
      </div>

      <section className="max-w-6xl mx-auto px-4 pt-10 pb-8">
        <nav className="text-zinc-500 text-sm mb-4 flex items-center gap-1.5">
          <Link
            href="/dashboard"
            className="hover:text-zinc-300 transition-colors"
          >
            Dashboard
          </Link>
          <span>/</span>
          <Link
            href="/dashboard/course/block/0"
            className="hover:text-zinc-300 transition-colors"
          >
            Блок 0
          </Link>
          <span>/</span>
          <span className="text-zinc-300">Урок 3</span>
        </nav>

        <div className="flex flex-col gap-4">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF4422]/15 text-[#FF4422] text-xs font-semibold tracking-wide w-fit">
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
                  <h3 className="text-xl font-semibold leading-snug">
                    {item.headline}
                  </h3>
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
                    {/* Real media from post */}
                    {item.mediaType === "video" ? (
                      <video
                        src={item.mediaFile}
                        controls
                        className="w-full rounded-xl border border-zinc-800 bg-black"
                        style={{ maxHeight: "320px" }}
                      />
                    ) : (
                      <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden border border-zinc-800">
                        <Image
                          src={item.mediaFile}
                          alt={`Медиа из поста ${item.handle}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}

                    {/* Original post text */}
                    <div className="bg-zinc-900/60 rounded-xl p-4 border border-zinc-800">
                      <p className="text-xs text-zinc-500 mb-2 uppercase tracking-wide">
                        Оригинальный пост
                      </p>
                      <p className="text-zinc-200 leading-relaxed text-sm italic">
                        &ldquo;{item.originalText}&rdquo;
                      </p>
                    </div>

                    {/* Context */}
                    <div>
                      <p className="text-xs text-zinc-500 mb-1 uppercase tracking-wide">
                        Что здесь происходит
                      </p>
                      <p className="text-zinc-300 leading-relaxed text-sm">
                        {item.context}
                      </p>
                    </div>

                    <Link
                      href={item.postUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-semibold text-[#FF4422] hover:text-white transition-colors"
                    >
                      🔗 Проверить пост →
                    </Link>
                    <button
                      onClick={() => toggleExpanded(item.id)}
                      className="text-sm font-semibold text-zinc-500 hover:text-white transition-colors self-start"
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
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <Link
            href="/dashboard/course/block/0/lesson/2"
            className="px-6 py-3 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-lg text-zinc-200 text-center transition-colors"
          >
            ← Предыдущий урок
          </Link>
          <Link
            href="/dashboard/course/block/0/lesson/4"
            className="px-6 py-3 bg-[#FF4422] hover:bg-[#e63d1e] rounded-lg text-white text-center font-semibold transition-colors"
          >
            Следующий урок →
          </Link>
        </div>
      </section>
    </main>
  );
}
