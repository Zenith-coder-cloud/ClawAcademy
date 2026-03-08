"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import PaymentModal from "@/components/PaymentModal";

const allModules = [
  { id: 0, title: "Вход — что такое ИИ-агент", cover: "/covers/block0.png" },
  { id: 1, title: "Установка и первый агент", cover: "/covers/block1.png" },
  { id: 2, title: "Быстрый заработок: первые схемы", cover: "/covers/block2.png" },
  { id: 3, title: "Мультиагент и автоматизация", cover: "/covers/block3.png" },
  { id: 4, title: "Продвинутые схемы: SaaS и аутстаффинг", cover: "/covers/block4.png" },
  { id: 5, title: "Бизнес-модель: упаковка, клиенты, прайсинг", cover: "/covers/block5.png" },
];

const TIER_LABELS: Record<string, string> = {
  free: "Free",
  genesis: "Genesis",
  pro: "Pro",
  elite: "Elite",
};

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
  const [tierData, setTierData] = useState<{ tier: string; blocks: number[] }>({ tier: "free", blocks: [0, 1, 2] });
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);

  useEffect(() => {
    // Validate session via httpOnly cookie (server-side check)
    fetch("/api/auth/session")
      .then((res) => res.ok ? res.json() : null)
      .then((data) => {
        if (!data?.ok) {
          localStorage.removeItem("tg_user");
          router.push("/login");
          return;
        }

        // Use localStorage for UX display only, auth is cookie-based
        const stored = localStorage.getItem("tg_user");
        const displayUser = stored ? validateStoredUser(stored) : null;
        if (displayUser) {
          setUser(displayUser);
        } else {
          // Fallback: build display from session
          setUser({
            id: data.session.telegramId,
            wallet_address: data.session.walletAddress,
            first_name: data.session.walletAddress
              ? data.session.walletAddress.slice(0, 6) + "..." + data.session.walletAddress.slice(-4)
              : "User",
          });
        }

        // Fetch tier — cookie sent automatically
        return fetch("/api/user/tier");
      })
      .then((res) => res?.ok ? res.json() : null)
      .then((data) => {
        if (data?.tier) setTierData({ tier: data.tier, blocks: data.blocks ?? [0, 1, 2] });
      })
      .catch(() => {});
  }, [router]);

  // Re-fetch tier if redirected after payment upgrade
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('tier_updated')) {
      fetch("/api/user/tier")
        .then((res) => res.ok ? res.json() : null)
        .then((data) => {
          if (data?.tier) setTierData({ tier: data.tier, blocks: data.blocks ?? [0, 1, 2] });
        })
        .catch(() => {});
      // Clean URL
      window.history.replaceState({}, '', '/dashboard');
    }
  }, []);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    localStorage.removeItem("tg_user");
    localStorage.removeItem("wallet_address");
    localStorage.removeItem("telegram_id");
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
              Тариф: <span className="text-[#FF4422] font-medium">{TIER_LABELS[tierData.tier] ?? tierData.tier}</span>
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
          {allModules.map((m) => {
            const locked = m.id === 0 ? false : !tierData.blocks.includes(m.id);

            const handleStart = () => {
              const tier = tierData.tier;
              let hasAccess = false;

              if (m.id === 0) {
                hasAccess = true;
              } else if (m.id <= 2) {
                hasAccess = tier !== "free";
              } else {
                hasAccess = tier === "pro" || tier === "elite";
              }

              if (hasAccess) {
                router.push(`/dashboard/course/block/${m.id}/lesson/1`);
              } else {
                setIsPaymentOpen(true);
              }
            };

            return (
              <div
                key={m.id}
                className={`rounded-2xl shadow-xl overflow-hidden transition-transform ${
                  locked
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
                  {locked && (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                      <span className="text-5xl">🔒</span>
                    </div>
                  )}
                </div>
                {/* Info */}
                <div className="p-5">
                  <p className="text-sm text-[#888888] mb-1">
                    {locked ? "🔒" : "🔓"} БЛОК {m.id}
                  </p>
                  <h3 className="font-semibold text-white text-lg mb-3">
                    {m.title}
                  </h3>
                  {locked ? (
                    <button
                      onClick={() => setIsPaymentOpen(true)}
                      className="w-full py-2.5 bg-zinc-700 hover:bg-zinc-600 text-white font-medium rounded-lg transition-colors text-sm"
                    >
                      Разблокировать
                    </button>
                  ) : (
                    <button
                      onClick={handleStart}
                      className="w-full py-2.5 bg-[#FF4422] hover:bg-[#e63d1e] text-white font-medium rounded-lg transition-colors text-sm"
                    >
                      Начать
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Upgrade CTA */}
        {(tierData.tier === "free" || tierData.tier === "genesis") && (
          <div className="mt-10 p-6 rounded-xl bg-[#1a1a1a] border border-[#333] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <p className="text-white font-semibold">Хочешь больше?</p>
              <p className="text-[#888888] text-sm">
                Pro и Elite открывают все блоки + AI-чат Zenith Junior
              </p>
            </div>
            <button
              onClick={() => setIsPaymentOpen(true)}
              className="px-6 py-3 bg-[#FF4422] text-white font-semibold rounded-lg hover:bg-[#e63d1e] transition-colors whitespace-nowrap"
            >
              Улучшить доступ
            </button>
          </div>
        )}
      </div>

      <PaymentModal
        isOpen={isPaymentOpen}
        onClose={() => setIsPaymentOpen(false)}
      />
    </main>
  );
}
