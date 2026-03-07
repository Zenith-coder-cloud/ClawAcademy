import Link from "next/link";
import Image from "next/image";
import CourseProgram from "@/components/CourseProgram";

const tiers = [
  {
    name: "Genesis",
    price: "$49",
    description: "Все модули 0–3, базовый доступ",
    button: "Купить Genesis",
    highlighted: false,
  },
  {
    name: "Pro",
    price: "$99",
    description: "Все модули + AI чат Zenith Junior + шаблоны",
    button: "Купить Pro",
    highlighted: true,
    badge: "Рекомендуем",
  },
  {
    name: "Elite",
    price: "$249",
    description: "Всё + прямой доступ к создателю + кастомный агент",
    button: "Купить Elite",
    highlighted: false,
  },
];

const features = [
  { icon: "/stickers/sticker-robot.png", title: "AI ментор внутри", description: "Твой личный AI-эксперт по OpenClaw — отвечает на вопросы, помогает разобраться и ведёт тебя на каждом шагу" },
  { icon: "/stickers/sticker-nft.png", title: "NFT доступ навсегда", description: "Доступ хранится в блокчейне. Никто не может его отозвать — он всегда твой" },
  { icon: "/stickers/sticker-books.png", title: "6 блоков курса", description: "От первого агента до полноценного бизнеса — пошаговая программа для любого уровня" },
  { icon: "/stickers/sticker-coins.png", title: "Реальные схемы", description: "Рабочие схемы монетизации, автоматизации и внедрения ИИ в любую сферу жизни" },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0d0d0d]">
      {/* Hero */}
      <section className="flex flex-col items-center justify-center text-center px-4 pt-32 pb-24">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
          <span className="text-[#FF4422]">Claw Academy:</span>{" "}
          Возьми интеллект под свой контроль
        </h1>
        <p className="text-zinc-400 text-lg md:text-xl max-w-2xl mb-10">
          Больше чем курсы: прикладная база для тех, кто готов внедрять ИИ во все сферы жизни
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/login"
            className="px-8 py-4 bg-[#FF4422] text-white font-semibold rounded-lg hover:bg-[#e63d1e] transition-colors text-lg"
          >
            Подключить кошелёк
          </Link>
          <Link
            href="/login"
            className="px-8 py-4 border border-[#FF4422] text-[#FF4422] font-semibold rounded-lg hover:bg-[#FF4422] hover:text-white transition-colors text-lg"
          >
            Войти через Telegram
          </Link>
        </div>
      </section>

      {/* Tiers */}
      <section className="max-w-6xl mx-auto px-4 py-20">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Выбери свой тариф
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`relative flex flex-col rounded-2xl p-8 ${
                tier.highlighted
                  ? "bg-[#FF4422] text-white ring-2 ring-[#FF4422] scale-105"
                  : "bg-[#1a1a1a] text-white border border-[#333]"
              }`}
            >
              {tier.badge && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white text-[#FF4422] text-sm font-bold px-4 py-1 rounded-full">
                  {tier.badge}
                </span>
              )}
              <h3 className="text-2xl font-bold mb-2">{tier.name}</h3>
              <p className="text-4xl font-extrabold mb-4">{tier.price}</p>
              <p
                className={`mb-8 ${
                  tier.highlighted ? "text-white/80" : "text-[#888888]"
                }`}
              >
                {tier.description}
              </p>
              <button
                className={`mt-auto py-3 px-6 rounded-lg font-semibold transition-colors ${
                  tier.highlighted
                    ? "bg-white text-[#FF4422] hover:bg-gray-100"
                    : "bg-[#FF4422] text-white hover:bg-[#e63d1e]"
                }`}
              >
                {tier.button}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-4 py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f) => (
            <div
              key={f.title}
              className="bg-zinc-900 border border-[#FF4422]/30 rounded-2xl p-6 flex flex-col items-center text-center gap-4 hover:border-[#FF4422]/60 transition-colors"
            >
              <Image src={f.icon} alt={f.title} width={100} height={100} className="w-24 h-24 object-contain" />
              <h3 className="text-white font-semibold text-lg">{f.title}</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">{f.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="max-w-5xl mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold text-white text-center mb-16">Как это работает</h2>
        <div className="relative flex flex-col md:flex-row items-start justify-between gap-8">
          {/* Connecting line - desktop only */}
          <div className="hidden md:block absolute top-8 left-[16.66%] right-[16.66%] h-px bg-zinc-700" />

          {[
            { num: "01", title: "Выбери тариф", desc: "Оплата один раз, доступ пожизненно" },
            { num: "02", title: "Запусти агента", desc: "15 минут до первого результата" },
            { num: "03", title: "Делегируй и живи", desc: "Твои агенты работают 24/7 пока ты живёшь" },
          ].map((step) => (
            <div key={step.num} className="flex-1 flex flex-col items-center text-center gap-3 relative z-10">
              <div className="w-16 h-16 rounded-full bg-zinc-900 border-2 border-zinc-700 flex items-center justify-center">
                <span className="text-2xl font-bold text-[#FF4422]">{step.num}</span>
              </div>
              <h3 className="text-white font-semibold text-lg">{step.title}</h3>
              <p className="text-zinc-400 text-sm">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* For who */}
      <section className="max-w-5xl mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold text-white text-center mb-4">Ты на правильном месте, если...</h2>
        <p className="text-zinc-400 text-center mb-12">Claw Academy подходит для любой сферы и любого уровня</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { title: "Бизнес", desc: "Хочешь автоматизировать рутину без найма команды" },
            { title: "Кодер", desc: "Хочешь делегировать монотонные задачи агентам" },
            { title: "Творец", desc: "Хочешь освободить время для главного, а не для рутины" },
            { title: "Соцсети", desc: "Устал тратить часы на контент и ответы подписчикам" },
            { title: "Фрилансер", desc: "Хочешь брать больше клиентов без увеличения рабочих часов" },
            { title: "Студент", desc: "Хочешь умного помощника который работает пока ты спишь" },
            { title: "Быт", desc: "Хочешь автоматизировать расписание, напоминания и повседневные дела" },
            { title: "Доход", desc: "Хочешь новый источник дохода на базе ИИ-агентов" },
            { title: "Просто жить", desc: "Хочешь меньше делать руками и больше жить" },
          ].map((item) => (
            <div key={item.title} className="bg-zinc-900 rounded-2xl p-6 border-t-2 border-[#FF4422] hover:bg-zinc-800 transition-colors">
              <h3 className="text-white font-semibold text-base mb-2">{item.title}</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Course Program */}
      <CourseProgram />

      {/* Footer */}
      <footer className="border-t border-[#222] py-8 text-center text-[#888888] text-sm">
        <p>Claw Academy © 2026</p>
        <p className="mt-1">clawacademy.io</p>
      </footer>
    </main>
  );
}
