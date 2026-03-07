"use client";
import { useState } from "react";

const faqs = [
  {
    q: "Нужен ли опыт в программировании?",
    a: "Нет. OpenClaw разработан так чтобы первый агент запустил любой человек за 15 минут. Курс идёт от нуля.",
  },
  {
    q: "Что такое OpenClaw и зачем он мне?",
    a: "OpenClaw — это платформа для создания и управления ИИ-агентами. Не просто чат с GPT, а полноценные агенты которые выполняют задачи автономно.",
  },
  {
    q: "На каком устройстве работает?",
    a: "Mac, Linux, Windows, VPS — пошаговые инструкции для каждого в Block 1.",
  },
  {
    q: "Доступ пожизненный?",
    a: "Да. Оплата один раз — доступ навсегда включая все будущие обновления курса.",
  },
  {
    q: "Чем отличаются тарифы?",
    a: "Genesis (блоки 0–3) — база для старта. Pro (все 6 блоков) — полный курс + AI ментор Zenith Junior. Elite — всё из Pro + прямой чат с создателем + кастомный агент под твой проект (строго 50 мест).",
  },
  {
    q: "Как происходит оплата?",
    a: "Оплата криптовалютой — USDT, BNB и другие. Если не работаешь с крипто — напиши нам в Telegram, поможем разобраться. Доступ открывается мгновенно после оплаты.",
  },
  {
    q: "Что если возникнут вопросы в процессе?",
    a: "Genesis и Pro — поддержка через Telegram сообщество и AI ментор (Pro). Elite — прямой чат с создателем.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="max-w-3xl mx-auto px-4 py-20">
      <h2 className="text-3xl font-bold text-white text-center mb-12">Частые вопросы</h2>
      <div className="space-y-3">
        {faqs.map((faq, i) => (
          <div
            key={i}
            className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden"
          >
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="w-full flex items-center justify-between px-6 py-4 text-left"
            >
              <span className="text-white text-sm font-medium">{faq.q}</span>
              <span className={`text-[#FF4422] text-lg transition-transform duration-200 ${open === i ? "rotate-45" : ""}`}>
                +
              </span>
            </button>
            {open === i && (
              <div className="px-6 pb-5">
                <p className="text-zinc-400 text-sm leading-relaxed">{faq.a}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
