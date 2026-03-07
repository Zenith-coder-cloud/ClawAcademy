"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

const modules = [
  { id: 0, title: "Вход — что такое ИИ-агент", cover: "/covers/block0.png", locked: false },
  { id: 1, title: "Установка и первый агент", cover: "/covers/block1.png", locked: false },
  { id: 2, title: "Быстрый заработок: первые схемы", cover: "/covers/block2.png", locked: false },
  { id: 3, title: "Мультиагент и автоматизация", cover: "/covers/block3.png", locked: true },
  { id: 4, title: "Продвинутые схемы: SaaS и аутстаффинг", cover: "/covers/block4.png", locked: true },
  { id: 5, title: "Бизнес-модель: упаковка, клиенты, прайсинг", cover: "/covers/block5.png", locked: true },
];

const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;

interface TgUser {
  id?: number;
  wallet_address?: string;
  first_name: string;
  last_name?: string;
  username?: string;
  photo_url?: string;
  auth_at?: number;
}

// S5 — Validate stored user has required fields and is not expired
function validateStoredUser(stored: string): TgUser | null {
  try {
    const user = JSON.parse(stored) as TgUser;

    // Must have at least one identifier
    if (!user.id && !user.wallet_address) return null;

    // Must have first_name
    if (!user.first_name || typeof user.first_name !== "string") return null;

    // Check session expiry (7 days)
    if (user.auth_at) {
      if (Date.now() - user.auth_at > SEVEN_DAYS_MS) return null;
    }

    return user;
  } catch {
    return null;
  }
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

    const validUser = validateStoredUser(stored);
    if (!validUser) {
      // S5 — Invalid or expired session → clear and redirect
      localStorage.removeItem("tg_user");
      router.push("/login");
      return;
    }

    setUser(validUser);
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
            <div className="px-4 py-2 bg-[#1a1a1a] border border-[#333] rounded-lg text-[#888888] text-sm whitespace-nowrap">
              Тариф: <span className="text-[#FF4422] font-medium">Genesis</span>
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {modules.map((m) => (
            <div
              key={m.id}
              className={`rounded-2xl shadow-xl overflow-hidden transition-transform ${
                m.locked
                  ? "bg-zinc-900 cursor-not-allowed"
                  : "bg-zinc-900 hover:scale-[1.02] cursor-pointer"
              }`}
            >
              {/* Cover */}
              <div className="relative w-full aspect-video">
                <Image
                  src={m.cover}
                  alt={`Блок ${m.id}: ${m.title}`}
                  width={1280}
                  height={720}
                  className="w-full h-full object-cover"
                  priority={m.id === 0}
                />
                {m.locked && (
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                    <span className="text-5xl">🔒</span>
                  </div>
                )}
              </div>
              {/* Info */}
              <div className="p-5">
                <p className="text-sm text-[#888888] mb-1">
                  {m.locked ? "🔒" : "🔓"} БЛОК {m.id}
                </p>
                <h3 className="font-semibold text-white text-lg mb-3">
                  {m.title}
                </h3>
                {m.locked ? (
                  <button className="w-full py-2.5 bg-zinc-700 hover:bg-zinc-600 text-white font-medium rounded-lg transition-colors text-sm">
                    Разблокировать
                  </button>
                ) : (
                  <button className="w-full py-2.5 bg-[#FF4422] hover:bg-[#e63d1e] text-white font-medium rounded-lg transition-colors text-sm">
                    Начать
                  </button>
                )}
              </div>
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
