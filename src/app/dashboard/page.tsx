"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const modules = [
  { id: 0, title: "Блок 0 — Вход: что такое ИИ-агент и OpenClaw", locked: false },
  { id: 1, title: "Блок 1 — Установка и первый агент за 15 минут", locked: false },
  { id: 2, title: "Блок 2 — Быстрый заработок: первые схемы", locked: false },
  { id: 3, title: "Блок 3 — Средний уровень: мультиагент и автоматизация", locked: false },
  { id: 4, title: "Блок 4 — Продвинутые схемы: SaaS и аутстаффинг", locked: true },
  { id: 5, title: "Блок 5 — Бизнес-модель: упаковка, клиенты, прайсинг", locked: true },
];

interface TgUser {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  photo_url?: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<TgUser | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("tg_user");
    if (!stored) {
      router.push("/login");
      return;
    }
    setUser(JSON.parse(stored));
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("tg_user");
    router.push("/");
  };

  if (!user) return null;

  return (
    <main className="min-h-screen bg-[#0d0d0d] px-4 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-4">
            {user.photo_url && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={user.photo_url}
                alt="avatar"
                className="w-12 h-12 rounded-full border-2 border-[#FF4422]"
              />
            )}
            <div>
              <h1 className="text-2xl font-bold text-white">
                Привет, {user.first_name}!
              </h1>
              {user.username && (
                <p className="text-[#888888] text-sm">@{user.username}</p>
              )}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="px-4 py-2 bg-[#1a1a1a] border border-[#333] rounded-lg text-[#888888] text-sm">
              Тариф:{" "}
              <span className="text-[#FF4422] font-medium">Genesis</span>
            </div>
            <button
              onClick={handleLogout}
              className="px-3 py-2 text-[#555] hover:text-white text-sm transition-colors"
            >
              Выйти
            </button>
          </div>
        </div>

        {/* Modules */}
        <h2 className="text-xl font-semibold text-white mb-6">
          Ваши модули
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {modules.map((m) => (
            <div
              key={m.id}
              className={`p-6 rounded-xl border transition-colors ${
                m.locked
                  ? "bg-[#1a1a1a] border-[#333] opacity-50 cursor-not-allowed"
                  : "bg-[#1a1a1a] border-[#FF4422] hover:bg-[#221a1a] cursor-pointer"
              }`}
            >
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-white">{m.title}</h3>
                <span className="text-xl">{m.locked ? "🔒" : "✅"}</span>
              </div>
              {m.locked ? (
                <p className="text-[#555] text-sm mt-2">
                  Разблокируйте тарифом Pro или Elite
                </p>
              ) : (
                <p className="text-[#888888] text-sm mt-2">
                  Доступен — нажмите чтобы начать
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Upgrade CTA */}
        <div className="mt-10 p-6 rounded-xl bg-[#1a1a1a] border border-[#333] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="text-white font-semibold">Хочешь больше?</p>
            <p className="text-[#888888] text-sm">
              Pro и Elite открывают все блоки + AI-чат Zenith Junior
            </p>
          </div>
          <Link
            href="/#tiers"
            className="px-6 py-3 bg-[#FF4422] text-white font-semibold rounded-lg hover:bg-[#e63d1e] transition-colors whitespace-nowrap"
          >
            Улучшить тариф
          </Link>
        </div>
      </div>
    </main>
  );
}
