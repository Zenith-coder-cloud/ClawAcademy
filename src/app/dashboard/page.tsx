const modules = [
  { id: 0, title: "Блок 0 — Введение в ИИ-агентов", locked: true },
  { id: 1, title: "Блок 1 — Настройка OpenClaw", locked: true },
  { id: 2, title: "Блок 2 — Первый агент", locked: true },
  { id: 3, title: "Блок 3 — Монетизация", locked: true },
  { id: 4, title: "Блок 4 — Продвинутые стратегии", locked: true },
  { id: 5, title: "Блок 5 — Масштабирование", locked: true },
];

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-[#0d0d0d] px-4 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-3xl font-bold">Добро пожаловать в Claw Academy</h1>
            <p className="text-[#888888] mt-1">Ваш путь к заработку с ИИ-агентами</p>
          </div>
          <div className="px-4 py-2 bg-[#1a1a1a] border border-[#333] rounded-lg text-[#888888] text-sm">
            Тариф: <span className="text-white font-medium">—</span>
          </div>
        </div>

        {/* Modules */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {modules.map((m) => (
            <div
              key={m.id}
              className={`p-6 rounded-xl border ${
                m.locked
                  ? "bg-[#1a1a1a] border-[#333] opacity-60"
                  : "bg-[#1a1a1a] border-[#FF4422]"
              }`}
            >
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">{m.title}</h3>
                <span className="text-xl">{m.locked ? "🔒" : "✅"}</span>
              </div>
              {m.locked && (
                <p className="text-[#888888] text-sm mt-2">
                  Разблокируйте покупкой тарифа
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
