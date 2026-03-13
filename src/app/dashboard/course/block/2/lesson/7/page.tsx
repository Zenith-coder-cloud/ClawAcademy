"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  BlockCompleteCard,
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

export default function Block2Lesson7Page() {
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
            Блок 2 · Урок 7 из 17
          </p>
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <h1 className="text-3xl md:text-4xl font-bold text-white">
              Агент-трекер задач
            </h1>
            <TimerBadge text="⏱ 15 минут" />
            <TrackBadge track="freelancer" isRecommended={recommended === "freelancer"} />
          </div>
          <p className="text-zinc-400 text-lg">
            Держи все проекты под контролем без Jira и Notion
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
                    (7 === l.num
                      ? "bg-[#FF4422]/10 text-[#FF4422] font-semibold"
                      : "text-zinc-400 hover:text-white hover:bg-zinc-800")
                  }
                >
                  <span
                    className={
                      "w-5 h-5 rounded-full border flex items-center justify-center text-xs shrink-0 " +
                      (7 === l.num ? "border-[#FF4422]" : "border-zinc-600")
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
          <ImagePlaceholder label="Заглушка изображения урока 7" />

          <section className="bg-zinc-900 rounded-2xl p-6 md:p-8 border border-zinc-800">
            <h2 className="text-2xl font-semibold text-white mb-4">Зачем это нужно</h2>
            <p className="text-zinc-400 leading-relaxed">
              5 клиентов. 20 задач. Разные дедлайны. Разные статусы. Держать это в голове — неработает. Открывать Notion по каждому вопросу — медленно.<br />
              <br />
              Агент-трекер знает все твои проекты. Ты спрашиваешь — он отвечает мгновенно. Обновляешь статус одним сообщением. Никаких таблиц и досок.
            </p>
          </section>

          <section className="bg-zinc-900 rounded-2xl p-6 md:p-8 border border-zinc-800">
            <h2 className="text-2xl font-semibold text-white mb-4">Кейс</h2>
            <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-5 text-zinc-300 space-y-2">
                          <p className="font-semibold">📦 Кейс: Разработчик Дмитрий (4 клиента одновременно)</p>
                          <p>Проблема: постоянно путался в дедлайнах, забывал что на паузе</p>
                          <p>До: 30+ минут в день на &quot;а где мы с этим проектом?&quot;</p>
                          <p>После: 1 вопрос агенту → полная картина по всем проектам</p>
                          <p>Пропущенных дедлайнов с агентом: 0</p>
                          <p>Время настройки: 12 минут ✅</p>
            </div>
          </section>

          <section className="bg-zinc-900 rounded-2xl p-6 md:p-8 border border-zinc-800">
            <h2 className="text-2xl font-semibold text-white mb-4">Готовый промпт</h2>
            <PromptCopyBlock
              code={`Ты — мой менеджер проектов и трекер задач.

Мои текущие проекты (замени на свои):
1. [Название проекта] — Клиент: [имя] — Дедлайн: [дата] — Статус: [что сейчас делаю]
2. [Название проекта] — Клиент: [имя] — Дедлайн: [дата] — Статус: [что сейчас делаю]

Команды которые я использую:
— "статус" → выведи все проекты: название, клиент, дедлайн, статус, что делать дальше
— "обнови [проект]: [новый статус]" → зафиксируй изменение
— "горящие" → покажи что нужно сделать сегодня и завтра
— "добавь проект: [детали]" → добавь новый проект в список
— "что дальше?" → скажи с чего начать прямо сейчас

Формат статуса: 🟢 В работе | 🟡 Ожидание (клиента/материалов) | 🔴 Горит | ✅ Готово | ⏸ Пауза`}
            />
          </section>

          <section className="bg-zinc-900 rounded-2xl p-6 md:p-8 border border-zinc-800">
            <h2 className="text-2xl font-semibold text-white mb-4">Пошаговая настройка</h2>
            <LessonSteps
              steps={[
                            "Шаг 1 — Заполни список своих текущих проектов в промпте",
                            "Шаг 2 — Отправь агенту",
                            "Шаг 3 — Напиши \"статус\" — получи полную картину",
                            "Шаг 4 — Напиши \"горящие\" — агент покажет приоритеты на сегодня",
                            "Шаг 5 — Обновляй статусы в течение дня одним сообщением",
              ]}
            />
          </section>

          <section className="bg-zinc-900 rounded-2xl p-6 md:p-8 border border-zinc-800">
            <h2 className="text-2xl font-semibold text-white mb-4">Чеклист</h2>
            <Checklist
              storageKey="block2_lesson7_checklist"
              items={[
                            "□ Внёс все текущие проекты в промпт",
                            "□ Отправил агенту",
                            "□ Проверил команду \"статус\" — список актуальный",
                            "□ Проверил команду \"горящие\" — приоритеты верные",
                            "✅ Агент-трекер работает",
              ]}
            />
          </section>

          <section className="bg-zinc-900 rounded-2xl p-6 md:p-8 border border-zinc-800">
            <h2 className="text-2xl font-semibold text-white mb-4">Troubleshooting</h2>
            <div className="space-y-3 text-zinc-300">
              {[
                                "Агент путается в проектах\n→ Дай каждому проекту короткий уникальный код: \"WEB-01\", \"SMM-02\" — легче ссылаться",
                                "Агент забывает обновления между сессиями\n→ В начале каждой сессии вставляй актуальный список. Или веди список в отдельном файле и прикладывай",
                                "Хочу чтобы агент напоминал о дедлайнах\n→ Это блок 3 — там настроим автоматические напоминания по расписанию",
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

          <BlockCompleteCard trackLabel="Фрилансер — Email, КП, Трекер" />

          <nav className="flex items-center justify-between text-sm text-zinc-400">
            <Link
              href="/dashboard/course/block/2/lesson/6"
              className="hover:text-zinc-200 transition-colors"
            >
              ← Назад
            </Link>
            <span className="text-zinc-600">Следующий урок →</span>
          </nav>
        </div>
      </div>
    </main>
  );
}
