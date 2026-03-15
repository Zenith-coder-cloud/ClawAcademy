"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

function Check() {
  return (
    <svg className="w-5 h-5 text-[#FF4422] shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

function SectionImage({ src, caption }: { src: string; caption?: string }) {
  return (
    <figure className="my-6">
      <Image src={src} alt={caption || ""} width={1200} height={675} className="rounded-xl w-full" />
    </figure>
  );
}

function TrackCard({
  emoji, title, problem, results, outcome,
}: {
  emoji: string; title: string; problem: string; results: string[]; outcome: string;
}) {
  return (
    <div className="bg-zinc-800/60 rounded-xl p-5 border border-zinc-700/50">
      <div className="flex items-center gap-3 mb-3">
        <span className="text-2xl">{emoji}</span>
        <h3 className="text-white font-bold text-lg">{title}</h3>
      </div>
      <p className="text-zinc-500 text-sm leading-relaxed mb-4 italic">{problem}</p>
      <p className="text-zinc-400 text-xs uppercase tracking-widest mb-2 font-semibold">После Block 5:</p>
      <ul className="flex flex-col gap-1.5 mb-4">
        {results.map((r, i) => (
          <li key={i} className="flex items-start gap-2 text-zinc-300 text-sm leading-relaxed">
            <span className="text-[#FF4422] shrink-0 mt-0.5">→</span>
            <span>{r}</span>
          </li>
        ))}
      </ul>
      <div className="border-t border-zinc-700 pt-3">
        <p className="text-[#FF4422] text-sm font-semibold">{outcome}</p>
      </div>
    </div>
  );
}

function BlockStep({
  num, title, locked, tier, items, highlight,
}: {
  num: number; title: string; locked?: boolean; tier?: string; items: string[]; highlight: string;
}) {
  return (
    <div className={`relative flex gap-4 ${locked ? "opacity-70" : ""}`}>
      {/* Line */}
      <div className="flex flex-col items-center">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shrink-0 ${
          num === 0 ? "bg-[#FF4422] text-white" : locked ? "bg-zinc-800 border border-zinc-600 text-zinc-400" : "bg-zinc-800 border border-[#FF4422] text-[#FF4422]"
        }`}>
          {num}
        </div>
        {num < 5 && <div className="w-px flex-1 bg-zinc-700 mt-2" />}
      </div>

      <div className="pb-8 flex-1">
        <div className="flex items-center gap-2 mb-2">
          <h3 className="text-white font-bold">{title}</h3>
          {locked && (
            <span className="text-xs px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-500">🔒 {tier ?? "Pro / Elite"}</span>
          )}
          {num === 0 && (
            <span className="text-xs px-2 py-0.5 rounded-full bg-[#FF4422]/20 text-[#FF4422]">Ты здесь</span>
          )}
        </div>
        <ul className="flex flex-col gap-1 mb-3">
          {items.map((item, i) => (
            <li key={i} className="text-zinc-400 text-sm flex gap-2">
              <span className="text-zinc-600 shrink-0">•</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <p className="text-zinc-300 text-sm italic border-l-2 border-[#FF4422] pl-3">{highlight}</p>
      </div>
    </div>
  );
}

function NextBlockButton() {
  const [tier, setTier] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/auth/session")
      .then(r => r.json())
      .then(d => setTier(d?.tier ?? "free"))
      .catch(() => setTier("free"));
  }, []);

  if (tier === null) return (
    <div className="flex-1 py-3 bg-zinc-800 rounded-lg animate-pulse" />
  );

  if (tier === "free" || tier === null) {
    return (
      <a
        href="/dashboard?upgrade=1"
        className="flex-1 py-3 bg-[#FF4422] hover:bg-[#e63d1e] text-white font-semibold rounded-lg transition-colors text-sm text-center"
      >
        Получить доступ к курсу →
      </a>
    );
  }

  return (
    <a
      href="/dashboard/course/block/1/lesson/1"
      className="flex-1 py-3 bg-[#FF4422] hover:bg-[#e63d1e] text-white font-semibold rounded-lg transition-colors text-sm text-center"
    >
      Начать Block 1 →
    </a>
  );
}

export default function Block0Lesson4Page() {
  return (
    <main className="min-h-screen bg-[#0D0D0D] text-zinc-200">
      {/* Header */}
      <section className="border-b border-zinc-900">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <p className="text-[#FF4422] text-sm font-semibold mb-2">Блок 0 · Урок 4 из 4</p>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">Твой результат и карта пути: от Block 0 до Block 5</h1>
          <p className="text-zinc-400 text-lg">Шесть блоков. Четыре типа результата. Реальные цифры по каждому.</p>
        </div>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="w-full bg-zinc-800 h-1 rounded-full mt-2">
            <div className="bg-[#FF4422] h-1 rounded-full" style={{ width: "100%" }} />
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
                    (4 === l.num
                      ? "bg-[#FF4422]/10 text-[#FF4422] font-semibold"
                      : "text-zinc-400 hover:text-white hover:bg-zinc-800")}>
                  <span className={"w-5 h-5 rounded-full border flex items-center justify-center text-xs shrink-0 " +
                    (4 === l.num ? "border-[#FF4422]" : "border-zinc-600")}>
                    {l.num}
                  </span>
                  {l.title}
                </Link>
              ))}
            </nav>
          </div>
        </aside>

        <div className="flex-1 min-w-0 flex flex-col gap-6">

        {/* Hero image */}
        <div className="relative w-full aspect-[16/7] md:aspect-[16/6] rounded-2xl overflow-hidden">
          <Image src="/course/block0/lesson4/b0l4-01-cover.png" alt="Block 0 Lesson 4 cover" fill className="object-cover" priority />
        </div>

        {/* ── Goals ── */}
        <section className="bg-zinc-900 rounded-xl p-6">
          <h2 className="text-2xl font-bold text-white mb-4">Цели урока</h2>
          <ul className="flex flex-col gap-3">
            {[
              "Увидеть конкретно — что ты умеешь после каждого блока, в цифрах и действиях",
              "Понять свой трек: предприниматель, творческий, студент или фрилансер — и что это значит на практике",
              "Осознать ROI: сколько времени и денег освобождает каждый этап",
              "Уйти в Block 1 с точным пониманием зачем ты это делаешь",
            ].map((g, i) => (
              <li key={i} className="flex items-start gap-3">
                <Check />
                <span className="text-zinc-400 leading-relaxed">{g}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* ── Intro ── */}
        <section className="bg-zinc-900 rounded-xl p-6">
          <p className="text-zinc-300 text-lg leading-relaxed mb-3">
            Block 0 закончился. Ты понимаешь что такое агент и почему это работает.
          </p>
          <p className="text-zinc-400 leading-relaxed mb-3">
            Следующий вопрос — куда это ведёт. Конкретно.
          </p>
          <p className="text-zinc-400 leading-relaxed">
            Шесть блоков. Четыре типа результата. Реальные цифры по каждому.
          </p>
        </section>

        {/* ── Four tracks ── */}
        <section className="bg-zinc-900 rounded-xl p-6">
          <h2 className="text-2xl font-bold text-white mb-2">Четыре трека — один курс</h2>
          <p className="text-zinc-500 leading-relaxed mb-6">
            Курс не разделён на категории — ты проходишь его целиком. Но результат выглядит по-разному в зависимости от того, кто ты.
          </p>

          <SectionImage src="/course/block0/lesson4/b0l4-02-categories.png" caption="Четыре пути — одна система" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <TrackCard
              emoji="🏢"
              title="Предприниматель"
              problem="Ты платишь сотрудникам за рутину или делаешь её сам. Ответы клиентам, отчёты, мониторинг — уходит либо в деньги, либо в твоё время."
              results={[
                "Агент-команда отвечает клиентам за 30 секунд 24/7",
                "CRM обновляется автоматически после каждого контакта",
                "Еженедельные отчёты — без твоего участия",
                "Конкуренты мониторятся круглосуточно",
              ]}
              outcome="25–40 часов рутины в месяц → 3–5 часов контроля. Эквивалент 1.5 сотрудника без зарплаты."
            />
            <TrackCard
              emoji="🎨"
              title="Творческий / дизайнер"
              problem="60% времени уходит не на творчество. Посты, письма, счета, ответы на «сколько стоит?» — не то, ради чего ты выбрал профессию."
              results={[
                "Соцсети ведутся по расписанию без тебя",
                "Клиентам автоматически уходят брифы, счета, напоминания",
                "Агент собирает референсы пока ты работаешь",
                "Ты создаёшь. Агент занимается операционкой.",
              ]}
              outcome={"+8–12 часов в неделю на саму работу. 2–3 доп. проекта/мес"}
            />
            <TrackCard
              emoji="🎓"
              title="Студент / тот кто учится"
              problem="Информации слишком много. Нет персонального учителя который адаптируется под тебя и помнит где ты застрял в прошлый раз."
              results={[
                "Агент-тьютор знает твой уровень и подстраивается",
                "Система сама составляет план и корректирует темп",
                "Резюме по любой теме за минуты",
                "Напоминания и повторения — без тебя",
              ]}
              outcome="Ускорение освоения новой темы в 2–3 раза. Меньше прокрастинации — есть система."
            />
            <TrackCard
              emoji="💼"
              title="Фрилансер / строишь доход"
              problem="Ты продаёшь время. Хочешь больше — работай больше. Потолок очевиден. Рутина ест часы которые можно было продать."
              results={[
                "Агент мониторит заказы пока ты занят текущими",
                "Холодный outreach идёт автоматически",
                "Ты продаёшь результаты, а не часы",
                "Агентство на одного человека",
              ]}
              outcome="$1000+/мес при тех же затратах времени — масштаб через инструменты, не через часы."
            />
          </div>
        </section>

        {/* ── Roadmap ── */}
        <section className="bg-zinc-900 rounded-xl p-6">
          <h2 className="text-2xl font-bold text-white mb-2">Карта пути: что происходит в каждом блоке</h2>
          <p className="text-zinc-500 text-sm mb-6">От понимания — к системе, которая работает без тебя.</p>

          <SectionImage src="/course/block0/lesson4/b0l4-03-roadmap.png" caption="6 блоков — 6 уровней возможностей" />

          <div className="mt-6">
            <BlockStep
              num={0}
              title="Block 0 — Понимание"
              items={[
                "Что такое агент и чем он отличается от чат-бота",
                "OpenClaw vs ChatGPT vs n8n — честное сравнение",
                "Реальные кейсы: предприниматель, дизайнер, студент, фрилансер",
                "Карта пути и конкретные результаты по каждому треку",
              ]}
              highlight="Фундамент. Без него всё остальное — копирование настроек без понимания зачем."
            />
            <BlockStep
              num={1}
              locked
              tier="Genesis"
              title="Block 1 — Первый агент за 15 минут"
              items={[
                "Установка OpenClaw: Mac, Linux, Windows, VPS — пошагово",
                "Telegram-агент с нуля за 15 минут",
                "Подключение к Google, Notion, Calendar",
                "Первая автоматизация работает без твоей команды",
              ]}
              highlight="Когда агент первый раз сам выполнит задачу — именно тогда ты физически ощущаешь разницу."
            />
            <BlockStep
              num={2}
              locked
              tier="Genesis"
              title="Block 2 — Первые результаты"
              items={[
                "Агент-автоответчик: клиенты получают ответ за 30 секунд в любое время",
                "Агент-парсер: собирает данные и готовит сводки",
                "Контент-агент: публикации по расписанию",
                "Первые сэкономленные часы — измеримые, конкретные",
              ]}
              highlight="Агент перестаёт быть экспериментом и становится рабочим инструментом."
            />
            <BlockStep
              num={3}
              title="Block 3 — Система агентов"
              locked
              items={[
                "Мультиагентная архитектура: один управляет, другие исполняют",
                "Контроль расхода ресурсов без конфликтов",
                "Мониторинг и алерты — знаешь что происходит без постоянного контроля",
                "Сложные задачи выполняются параллельно",
              ]}
              highlight="Когда система работает неделю без твоего вмешательства — это другой уровень."
            />
            <BlockStep
              num={4}
              title="Block 4 — Агент как продукт"
              locked
              items={[
                "Строишь агента для клиента и запускаешь на реальных пользователях",
                "Биллинг, ограничения, dashboard для клиента",
                "Multi-tenant, white-label, ClawHub",
                "Первый клиент пользуется системой которую ты построил",
              ]}
              highlight="Первая оплата за агента который работает без тебя — разница между «продавать время» и «продавать систему»."
            />
            <BlockStep
              num={5}
              title="Block 5 — Бизнес и масштаб"
              locked
              items={[
                "Прайсинг: разово, ретейнер, % от результата",
                "Поиск клиентов: Telegram, LinkedIn, Upwork, местные бизнесы",
                "Путь к $1000/мес пошагово под каждую категорию",
                "Агент который продаёт других агентов",
              ]}
              highlight="Когда тебя рекомендуют — агентская работа продаётся через результаты, а не через объяснения."
            />
          </div>
        </section>

        {/* ── ROI ── */}
        <section className="bg-zinc-900 rounded-xl p-6">
          <h2 className="text-2xl font-bold text-white mb-6">Реальные цифры</h2>

          <div className="flex flex-col gap-4">
            {[
              {
                label: "Предприниматель",
                rows: [
                  ["Стоимость сотрудника на рутине", "$400–600/мес"],
                  ["Агент закрывает", "работу 1–1.5 человека"],
                  ["ROI в год", "$4 800–8 400 экономии"],
                  ["Стоимость курса (Pro)", "$99"],
                  ["Окупаемость", "меньше недели"],
                ],
              },
              {
                label: "Фрилансер ($40/час)",
                rows: [
                  ["Рутина в месяц", "20 часов = $800 упущенного дохода"],
                  ["После Block 2–3", "агент берёт большую часть рутины"],
                  ["ROI в первый месяц", "15–20 часов на новые заказы"],
                  ["Бонус", "агент ищет клиентов пока ты работаешь"],
                ],
              },
              {
                label: "Студент / учащийся",
                rows: [
                  ["Ресурс", "не деньги — время"],
                  ["Ускорение обучения", "в 2–3 раза"],
                  ["Эффект", "те же знания за меньшее время"],
                  ["Или", "в те же сроки — в 2–3 раза больше прогресса"],
                ],
              },
            ].map((block, i) => (
              <div key={i} className="bg-zinc-800/50 rounded-xl p-5">
                <h3 className="text-white font-semibold mb-3">{block.label}</h3>
                <table className="w-full text-sm">
                  <tbody>
                    {block.rows.map(([label, value], j) => (
                      <tr key={j} className="border-b border-zinc-700/50 last:border-0">
                        <td className="py-2 pr-4 text-zinc-500">{label}</td>
                        <td className="py-2 text-zinc-200 font-medium">{value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))}
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="bg-zinc-900 rounded-xl p-6">
          <SectionImage src="/course/block0/lesson4/b0l4-04-cta.png" />

          <h2 className="text-2xl font-bold text-white mb-4">Block 0 пройден</h2>

          <ul className="flex flex-col gap-3 mb-8">
            {[
              "Понял чем агент отличается от чат-бота",
              "Разобрался в честном сравнении OpenClaw vs ChatGPT vs n8n",
              "Видел реальные кейсы с цифрами",
              "Знаешь свой путь и что тебя ждёт на каждом этапе",
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <Check />
                <span className="text-zinc-400 leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>

          <div className="bg-zinc-800 rounded-xl p-5 border border-[#FF4422]/30">
            <p className="text-white font-bold text-lg mb-1">Block 1 начинается здесь.</p>
            <p className="text-zinc-400 text-sm mb-4">
              Через 15 минут у тебя будет живой агент. Не демонстрация. Не скриншот. Работающий агент на твоём устройстве.
            </p>
            <Link
              href="/dashboard"
              className="inline-block px-6 py-3 bg-[#FF4422] hover:bg-[#e63d1e] text-white font-semibold rounded-lg transition-colors"
            >
              Перейти к Block 1 →
            </Link>
          </div>
        </section>

        {/* ── Navigation ── */}
        <div className="flex gap-4 mt-4">
          <Link
            href="/dashboard/course/block/0/lesson/3"
            className="flex-1 py-3 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-medium rounded-lg transition-colors text-sm text-center"
          >
            ← Предыдущий урок
          </Link>
          <NextBlockButton />
        </div>
        </div>
      </div>
    </main>
  );
}
