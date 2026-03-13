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
];

export default function Block2Lesson3Page() {
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
            Блок 2 · Урок 3 из 5
          </p>
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <h1 className="text-3xl md:text-4xl font-bold text-white">
              Email-агент
            </h1>
            <TimerBadge text="⏱ 25 минут" />
            <TrackBadge
              track="freelancer"
              isRecommended={recommended === "freelancer"}
            />
          </div>
          <p className="text-zinc-400 text-lg">
            Разбирай inbox за 10 минут вместо часа
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
                    (3 === l.num
                      ? "bg-[#FF4422]/10 text-[#FF4422] font-semibold"
                      : "text-zinc-400 hover:text-white hover:bg-zinc-800")
                  }
                >
                  <span
                    className={
                      "w-5 h-5 rounded-full border flex items-center justify-center text-xs shrink-0 " +
                      (3 === l.num ? "border-[#FF4422]" : "border-zinc-600")
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
          <ImagePlaceholder label="Заглушка изображения урока 3" />

          <section className="bg-zinc-900 rounded-2xl p-6 md:p-8 border border-zinc-800">
            <h2 className="text-2xl font-semibold text-white mb-4">Зачем это нужно</h2>
            <p className="text-zinc-400 leading-relaxed">
              50 писем в день. Запросы, вопросы, задачи, уведомления, спам.
              Каждое утро — час просто чтобы разобраться что важно.
              <br />
              <br />
              Email-агент читает всё за тебя. Классифицирует. Готовит черновики.
              Ты видишь только то что требует твоего внимания.
            </p>
          </section>

          <section className="bg-zinc-900 rounded-2xl p-6 md:p-8 border border-zinc-800">
            <h2 className="text-2xl font-semibold text-white mb-4">Кейс</h2>
            <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-5 text-zinc-300 space-y-2">
              <p className="font-semibold">📦 Кейс: Веб-разработчик Иван</p>
              <p>Ситуация: 60+ писем в день, важное тонет среди спама</p>
              <p>До: 1 час каждое утро на разбор inbox</p>
              <p>После: 10 минут — читаешь только классифицированный дайджест</p>
              <p>Время настройки: 22 минуты</p>
              <p>Требуется: подключённый email (урок 3, блок 1) ✅</p>
            </div>
          </section>

          <section className="bg-zinc-900 rounded-2xl p-6 md:p-8 border border-zinc-800">
            <h2 className="text-2xl font-semibold text-white mb-4">Как работает классификация</h2>
            <div className="grid md:grid-cols-2 gap-3">
              {[
                { label: "🔴 Срочное — требует ответа сегодня", color: "border-red-500/50 text-red-300" },
                { label: "🟡 Важное — нужно обработать в ближайшие дни", color: "border-yellow-500/40 text-yellow-200" },
                { label: "🟢 Обычное — не горит, можно позже", color: "border-green-500/40 text-green-200" },
                { label: "📌 На потом — полезно но не срочно / информационное", color: "border-blue-500/40 text-blue-200" },
              ].map((item) => (
                <div
                  key={item.label}
                  className={`bg-zinc-950 border rounded-xl px-4 py-3 ${item.color}`}
                >
                  {item.label}
                </div>
              ))}
            </div>
          </section>

          <section className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-6 md:p-8">
            <h2 className="text-xl font-semibold text-amber-200 mb-2">⚠️ Необходимо подключить email</h2>
            <p className="text-amber-100/90">
              Этот агент работает только с подключённым email аккаунтом.
              Если ещё не сделал → вернись к Блоку 1, Урок 3: &quot;Подключения: Google, Notion, Calendar&quot;
            </p>
          </section>

          <section className="bg-zinc-900 rounded-2xl p-6 md:p-8 border border-zinc-800">
            <h2 className="text-2xl font-semibold text-white mb-4">Готовый промпт</h2>
            <PromptCopyBlock
              code={`Ты — мой email-помощник.\n\nКогда я пишу "разбери почту" или "что в email":\n1. Получи последние 20 входящих писем\n2. Классифицируй каждое:\n   🔴 Срочное (требует ответа сегодня)\n   🟡 Важное (нужно обработать в ближайшие дни)\n   🟢 Обычное (не горит)\n   📌 На потом (информационное, не требует действий)\n\n3. Выведи список в формате:\n   [КАТЕГОРИЯ] От: [отправитель] | Тема: [тема] | Суть: [1 предложение] | Действие: [что сделать]\n\n4. Для каждого 🔴 письма — подготовь черновик ответа\n\n5. В конце: итог — сколько писем в каждой категории\n\nСтиль черновиков: деловой, вежливый, конкретный. Без воды.`}
            />
          </section>

          <section className="bg-zinc-900 rounded-2xl p-6 md:p-8 border border-zinc-800">
            <h2 className="text-2xl font-semibold text-white mb-4">Пошаговая настройка</h2>
            <LessonSteps
              steps={[
                "Шаг 1 — Убедись что email подключён (Google/Outlook через openclaw configure)",
                "Шаг 2 — Скопируй промпт и отправь агенту",
                'Шаг 3 — Напиши: "разбери почту"',
                "Шаг 4 — Дождись классифицированного дайджеста",
                "Шаг 5 — Просмотри черновики для срочных писем",
                'Шаг 6 — Попроси: "Отправь черновик ответа на письмо от [имя]" (или редактируй сам)',
              ]}
            />
          </section>

          <section className="bg-zinc-900 rounded-2xl p-6 md:p-8 border border-zinc-800">
            <h2 className="text-2xl font-semibold text-white mb-4">Чеклист</h2>
            <Checklist
              storageKey="block2_lesson3_checklist"
              items={[
                "Email подключён к агенту",
                "Промпт скопирован и отправлен",
                "Написал \"разбери почту\"",
                "Получил классифицированный дайджест",
                "Проверил черновики для срочных писем",
                "✅ Email-агент работает",
              ]}
            />
          </section>

          <section className="bg-zinc-900 rounded-2xl p-6 md:p-8 border border-zinc-800">
            <h2 className="text-2xl font-semibold text-white mb-4">Troubleshooting</h2>
            <div className="space-y-3 text-zinc-300">
              {[
                "Агент не видит входящие письма\n→ Email не подключён. Запусти: openclaw configure → раздел Integrations → Google/Outlook",
                "Агент видит письма но не читает тело\n→ Нужны расширенные права. При подключении Google разреши \"Read mail content\"",
                "Агент помечает всё как срочное\n→ Уточни промпт: \"🔴 Срочное — только если дедлайн сегодня или завтра, или прямой вопрос требующий ответа\"",
                "Не хочу чтобы агент отправлял письма\n→ Это нормально. По умолчанию агент только готовит черновики. Отправка — всегда по твоей команде.",
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
              href="/dashboard/course/block/2/lesson/2"
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
