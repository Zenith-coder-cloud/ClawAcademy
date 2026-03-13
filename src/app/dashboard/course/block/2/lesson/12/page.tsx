"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
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

export default function Block2Lesson12Page() {
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
            Блок 2 · Урок 12 из 17
          </p>
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <h1 className="text-3xl md:text-4xl font-bold text-white">
              Агент-конспектировщик
            </h1>
            <TimerBadge text="⏱ 15 минут" />
            <TrackBadge track="student" isRecommended={recommended === "student"} />
          </div>
          <p className="text-zinc-400 text-lg">
            Структурированный конспект из любого материала за 5 минут
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
                    (12 === l.num
                      ? "bg-[#FF4422]/10 text-[#FF4422] font-semibold"
                      : "text-zinc-400 hover:text-white hover:bg-zinc-800")
                  }
                >
                  <span
                    className={
                      "w-5 h-5 rounded-full border flex items-center justify-center text-xs shrink-0 " +
                      (12 === l.num ? "border-[#FF4422]" : "border-zinc-600")
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
          <ImagePlaceholder label="Заглушка изображения урока 12" />

          <section className="bg-zinc-900 rounded-2xl p-6 md:p-8 border border-zinc-800">
            <h2 className="text-2xl font-semibold text-white mb-4">Зачем это нужно</h2>
            <p className="text-zinc-400 leading-relaxed">
              Читаешь статью на 40 минут — запоминаешь 20% и не знаешь как структурировать. Смотришь лекцию — записываешь всё подряд, потом не можешь найти главное.<br />
              <br />
              Агент-конспектировщик берёт любой текст или ссылку — и выдаёт структурированный конспект. Ключевые идеи, термины, примеры — всё по полочкам.
            </p>
          </section>

          <section className="bg-zinc-900 rounded-2xl p-6 md:p-8 border border-zinc-800">
            <h2 className="text-2xl font-semibold text-white mb-4">Кейс</h2>
            <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-5 text-zinc-300 space-y-2">
                          <p className="font-semibold">📦 Кейс: Студент-медик Саша, 4 курс</p>
                          <p>Ситуация: 6 предметов одновременно, каждый требует конспектов</p>
                          <p>До: 3–4 часа на конспект одной лекции (вручную)</p>
                          <p>После: агент делает структуру за 5 минут, Саша дополняет своими словами</p>
                          <p>Оценки на экзаменах: выросли — материал лучше структурирован и запоминается</p>
                          <p>Время настройки: 12 минут ✅</p>
            </div>
          </section>

          <section className="bg-zinc-900 rounded-2xl p-6 md:p-8 border border-zinc-800">
            <h2 className="text-2xl font-semibold text-white mb-4">Готовый промпт</h2>
            <PromptCopyBlock
              code={`Ты — мой персональный конспектировщик и помощник в учёбе.

Когда я даю тебе текст, статью или ссылку:
1. КРАТКОЕ РЕЗЮМЕ (3–5 предложений): главная идея материала
2. КЛЮЧЕВЫЕ КОНЦЕПЦИИ: список основных понятий с определениями
3. СТРУКТУРИРОВАННЫЙ КОНСПЕКТ:
   — Разбей на логические блоки с заголовками
   — Под каждым заголовком — 3–5 главных тезисов
   — Важные цифры, даты, имена — выдели отдельно
4. ПРИМЕРЫ И ИЛЛЮСТРАЦИИ: конкретные примеры из текста
5. ВОПРОСЫ ДЛЯ САМОПРОВЕРКИ: 5 вопросов по материалу

Если я даю URL — прочитай страницу и сконспектируй.
Если материал на иностранном языке — конспект на русском.

Дополнительные команды:
— "объясни проще [понятие]" → объяснение как для 10-летнего
— "придумай аналогию для [понятие]" → сравнение из жизни
— "свяжи с [другая тема]" → как это связано с тем что знаю`}
            />
          </section>

          <section className="bg-zinc-900 rounded-2xl p-6 md:p-8 border border-zinc-800">
            <h2 className="text-2xl font-semibold text-white mb-4">Пошаговая настройка</h2>
            <LessonSteps
              steps={[
                            "Шаг 1 — Отправь промпт агенту",
                            "Шаг 2 — Вставь текст лекции или статьи (или ссылку)",
                            "Шаг 3 — Получи структурированный конспект",
                            "Шаг 4 — Попроси объяснить непонятные места: \"объясни проще термин X\"",
                            "Шаг 5 — Проверь себя по вопросам в конце конспекта",
                            "Шаг 6 — Сохрани конспект в Notion/Google Docs",
              ]}
            />
          </section>

          <section className="bg-zinc-900 rounded-2xl p-6 md:p-8 border border-zinc-800">
            <h2 className="text-2xl font-semibold text-white mb-4">Чеклист</h2>
            <Checklist
              storageKey="block2_lesson12_checklist"
              items={[
                            "□ Отправил промпт агенту",
                            "□ Протестировал на реальном материале",
                            "□ Конспект структурирован — блоки, тезисы, примеры",
                            "□ Попросил объяснить одно непонятное место",
                            "□ Ответил на вопросы самопроверки",
                            "✅ Агент-конспектировщик работает",
              ]}
            />
          </section>

          <section className="bg-zinc-900 rounded-2xl p-6 md:p-8 border border-zinc-800">
            <h2 className="text-2xl font-semibold text-white mb-4">Troubleshooting</h2>
            <div className="space-y-3 text-zinc-300">
              {[
                                "Агент не может прочитать PDF\n→ Скопируй текст из PDF и вставь напрямую. Или используй онлайн-конвертер PDF→текст",
                                "Конспект слишком длинный\n→ Добавь: \"Конспект — максимум 500 слов. Только самое важное.\"",
                                "Материал на специфическом языке (медицина, право, IT)\n→ Добавь в промпт: \"Я изучаю [предмет]. Используй правильную терминологию, но объясняй понятно\"",
                                "Хочу карточки для запоминания\n→ Добавь команду: \"сделай карточки — 10 пар вопрос/ответ по материалу\"",
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


          <nav className="flex items-center justify-between text-sm text-zinc-400">
            <Link
              href="/dashboard/course/block/2"
              className="hover:text-zinc-200 transition-colors"
            >
              ← Назад
            </Link>
            <Link
              href="/dashboard/course/block/2/lesson/13"
              className="text-[#FF4422] hover:text-[#ff5a3c] transition-colors"
            >
              Урок 13: Агент подготовки к экзамену →
            </Link>
          </nav>
        </div>
      </div>
    </main>
  );
}
