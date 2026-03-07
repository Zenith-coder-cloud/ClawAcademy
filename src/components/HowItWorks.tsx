"use client";
import React, { useState } from "react";

const steps = [
  {
    num: "01",
    title: "Выбери тариф",
    desc: "Оплата один раз — доступ пожизненно. Выбери уровень под свои цели.",
  },
  {
    num: "02",
    title: "Запусти агента",
    desc: "15 минут до первого результата. Пошаговые инструкции для любого уровня.",
  },
  {
    num: "03",
    title: "Делегируй и живи",
    desc: "Твои агенты работают 24/7 пока ты занимаешься тем что важно.",
  },
];

export default function HowItWorks() {
  const [active, setActive] = useState(0);

  return (
    <section className="max-w-5xl mx-auto px-4 py-20">
      <h2 className="text-3xl font-bold text-white text-center mb-12">Как это работает</h2>

      {/* Desktop: horizontal cards with arrows — unchanged */}
      <div className="hidden md:flex items-center gap-0">
        {steps.map((step, i) => (
          <React.Fragment key={step.num}>
            <div className="flex-1 bg-zinc-900 border border-zinc-800 rounded-2xl p-8 flex flex-row items-start gap-4">
              <span className="text-5xl font-bold text-[#FF4422] leading-none">{step.num}</span>
              <div>
                <h3 className="text-white font-semibold text-lg mb-1">{step.title}</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">{step.desc}</p>
              </div>
            </div>
            {i < 2 && (
              <div className="px-2 text-zinc-600 text-2xl">→</div>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Mobile: stepper with progress bar */}
      <div className="md:hidden">
        {/* Progress dots + line */}
        <div className="flex items-center justify-center mb-8 gap-0">
          {steps.map((step, i) => (
            <React.Fragment key={step.num}>
              <button
                onClick={() => setActive(i)}
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all duration-300 ${
                  i === active
                    ? "bg-[#FF4422] border-[#FF4422] text-white"
                    : i < active
                    ? "bg-[#FF4422]/20 border-[#FF4422]/40 text-[#FF4422]"
                    : "bg-zinc-900 border-zinc-700 text-zinc-500"
                }`}
              >
                {step.num}
              </button>
              {i < 2 && (
                <div
                  className={`h-px w-16 transition-all duration-300 ${
                    i < active ? "bg-[#FF4422]/40" : "bg-zinc-700"
                  }`}
                />
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Active step card */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 text-center">
          <div className="text-6xl font-bold text-[#FF4422] mb-4">{steps[active].num}</div>
          <h3 className="text-white font-semibold text-xl mb-3">{steps[active].title}</h3>
          <p className="text-zinc-400 text-sm leading-relaxed">{steps[active].desc}</p>
        </div>

        {/* Prev / Next buttons */}
        <div className="flex justify-between mt-6">
          <button
            onClick={() => setActive((a) => Math.max(0, a - 1))}
            disabled={active === 0}
            className="px-5 py-2 rounded-xl border border-zinc-700 text-zinc-400 text-sm disabled:opacity-30 disabled:cursor-not-allowed hover:border-zinc-500 transition-colors"
          >
            ← Назад
          </button>
          <button
            onClick={() => setActive((a) => Math.min(steps.length - 1, a + 1))}
            disabled={active === steps.length - 1}
            className="px-5 py-2 rounded-xl bg-[#FF4422] text-white text-sm disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#e03a1e] transition-colors"
          >
            Далее →
          </button>
        </div>
      </div>
    </section>
  );
}
