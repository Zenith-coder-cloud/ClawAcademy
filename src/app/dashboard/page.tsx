"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import PaymentModal from "@/components/PaymentModal";
import { useAppKit } from "@reown/appkit/react";
import { useAccount, useDisconnect, useSignMessage } from "wagmi";

const allModules = [
  { id: 0, title: "Вход — что такое ИИ-агент", cover: "/covers/block0.png" },
  { id: 1, title: "Установка и первый агент", cover: "/covers/block1.png" },
  { id: 2, title: "Агент на работе: первые реальные кейсы", cover: "/covers/block2.png" },
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
  const { open } = useAppKit();
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const { signMessageAsync } = useSignMessage();
  const [user, setUser] = useState<TgUser | null>(null);
  const [tierData, setTierData] = useState<{ tier: string; blocks: number[] } | null>(null);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [linkWalletStatus, setLinkWalletStatus] = useState<'idle' | 'signing' | 'linking' | 'done' | 'error'>('idle');
  const [linkWalletError, setLinkWalletError] = useState<string | null>(null);
  const [dbWalletAddress, setDbWalletAddress] = useState<string | null>(null);

  const needsWalletLink = !!(user?.id && !dbWalletAddress);

  const fetchSession = useCallback(() => {
    // Validate session + get fresh tier from DB in one call
    fetch("/api/auth/session")
      .then((res) => res.ok ? res.json() : null)
      .then((data) => {
        if (!data?.ok) {
          localStorage.removeItem("tg_user");
          router.push("/login");
          return;
        }
        const stored = localStorage.getItem("tg_user");
        const displayUser = stored ? validateStoredUser(stored) : null;
        setUser(displayUser || {
          id: data.session?.telegramId,
          wallet_address: data.session?.walletAddress,
          first_name: data.session?.walletAddress
            ? data.session.walletAddress.slice(0, 6) + "..." + data.session.walletAddress.slice(-4)
            : "User",
        });
        // Set wallet address from DB
        if (data.walletAddress) {
          setDbWalletAddress(data.walletAddress);
        }
        // Set tier from session (already reads from DB)
        if (data.tier) {
          setTierData({ tier: data.tier, blocks: data.blocks ?? [0] });
        }
      })
      .catch((err) => console.error("[dashboard] session fetch failed:", err));
  }, [router]);

  const handleLinkWallet = useCallback(async () => {
    if (!address || !isConnected) return;
    setLinkWalletStatus('signing');
    setLinkWalletError(null);
    try {
      const message = [
        "Claw Academy — привязка кошелька",
        "Адрес: " + address,
        "Время: " + new Date().toISOString(),
      ].join("\n");
      const signature = await signMessageAsync({ message });
      setLinkWalletStatus('linking');
      const res = await fetch('/api/auth/link-wallet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ address, message, signature }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Ошибка привязки');
      setLinkWalletStatus('done');
      setDbWalletAddress(address.toLowerCase());
      setUser((prev) => prev ? { ...prev, wallet_address: address.toLowerCase() } : prev);
    } catch (err: unknown) {
      setLinkWalletStatus('error');
      if (err instanceof Error && err.message.includes('User rejected')) {
        setLinkWalletError('Подпись отклонена');
      } else {
        setLinkWalletError(err instanceof Error ? err.message : 'Ошибка привязки кошелька');
      }
    }
  }, [address, isConnected, signMessageAsync]);

  useEffect(() => {
    fetchSession();

    // Clean URL if tier_updated param present
    if (window.location.search.includes("tier_updated")) {
      window.history.replaceState({}, "", "/dashboard");
    }
  }, [fetchSession]);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    localStorage.removeItem("tg_user");
    localStorage.removeItem("wallet_address");
    localStorage.removeItem("telegram_id");
    disconnect();
    router.push("/");
  };

  if (!user || !tierData) return null;

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

        {/* Link Wallet CTA for TG users without wallet */}
        {needsWalletLink && linkWalletStatus !== 'done' && (
          <div className="mb-8 p-5 rounded-xl bg-[#1a1a1a] border border-[#333]">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <p className="text-white font-semibold">Привяжите кошелёк</p>
                <p className="text-[#888888] text-sm mt-1">
                  Для оплаты крипто-кошельком привяжите EVM-адрес к аккаунту
                </p>
              </div>
              <div className="flex flex-col items-end gap-2 shrink-0">
                {!isConnected || !address ? (
                  <button
                    onClick={() => open()}
                    className="px-5 py-2.5 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-white font-semibold rounded-lg transition-colors text-sm"
                  >
                    Подключить кошелёк
                  </button>
                ) : (
                  <button
                    onClick={handleLinkWallet}
                    disabled={linkWalletStatus === 'signing' || linkWalletStatus === 'linking'}
                    className="px-5 py-2.5 bg-[#FF4422] hover:bg-[#e63d1e] text-white font-semibold rounded-lg transition-colors text-sm disabled:opacity-60"
                  >
                    {linkWalletStatus === 'signing'
                      ? 'Подтвердите в кошельке...'
                      : linkWalletStatus === 'linking'
                        ? 'Привязываем...'
                        : `Привязать ${address?.slice(0, 6) ?? ""}...${address?.slice(-4) ?? ""}`}
                  </button>
                )}
                {linkWalletError && (
                  <p className="text-red-400 text-xs">{linkWalletError}</p>
                )}
              </div>
            </div>
          </div>
        )}

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
                router.push(`/dashboard/course/block/${m.id}`);
              } else {
                setIsPaymentOpen(true);
              }
            };

            return (
              <div
                key={m.id}
                className={`rounded-2xl shadow-xl overflow-hidden transition-transform flex flex-col ${
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
                <div className="p-5 flex flex-col flex-1">
                  <p className="text-sm text-[#888888] mb-1">
                    {locked ? "🔒" : "🔓"} БЛОК {m.id}
                  </p>
                  <h3 className="font-semibold text-white text-lg mb-3">
                    {m.title}
                  </h3>
                  <div className="mt-auto"></div>
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

        {/* Junior Chat CTA */}
        {(tierData.tier === "pro" || tierData.tier === "elite") && (
          <div className="mt-10">
            <button
              onClick={() => router.push("/dashboard/chat")}
              className="w-full p-6 rounded-xl bg-[#1a1a1a] border border-[#333] hover:border-[#FF4422] transition-colors flex items-center gap-4 text-left"
            >
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 overflow-hidden bg-[#1a1a1a]">
                <Image src="/junior-bot.png" alt="Junior" width={64} height={64} className="w-16 h-16 object-cover" />
              </div>
              <div>
                <p className="text-white font-semibold text-lg">Чат с Junior</p>
                <p className="text-[#888888] text-sm">
                  AI-помощник по курсу, OpenClaw и заработку с агентами
                </p>
              </div>
            </button>
          </div>
        )}

        {/* Elite Private Chat CTA */}
        {tierData.tier === "elite" && (
          <div className="mt-6">
            <a
              href="https://t.me/+SPGl0k7t2CplMDk9"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full p-6 rounded-xl bg-gradient-to-r from-[#1a1a1a] to-[#2a1a0a] border border-[#FF4422]/40 hover:border-[#FF4422] transition-colors flex items-center gap-4 text-left"
            >
              <div className="w-16 h-16 rounded-2xl overflow-hidden shrink-0">
                <Image src="/elite-lobster.png" alt="Elite Lobster" width={64} height={64} className="w-full h-full object-cover" />
              </div>
              <div>
                <p className="text-white font-semibold text-lg">Приватный чат Elite</p>
                <p className="text-[#888888] text-sm">
                  Закрытое сообщество — только Elite участники и Master
                </p>
              </div>
              <div className="ml-auto shrink-0">
                <span className="px-3 py-1.5 bg-[#FF4422] text-white text-xs font-bold rounded-lg">
                  Войти →
                </span>
              </div>
            </a>
          </div>
        )}

        {/* Upgrade CTA */}
        {tierData.tier !== "elite" && (
          <div className="mt-10 p-6 rounded-xl bg-[#1a1a1a] border border-[#333] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <p className="text-white font-semibold">
                {tierData.tier === "pro" ? "Хочешь максимум?" : "Хочешь больше?"}
              </p>
              <p className="text-[#888888] text-sm">
                {tierData.tier === "pro"
                  ? "Elite — эксклюзивный доступ + персональный разбор + приоритетная поддержка"
                  : "Pro и Elite открывают все блоки + AI-чат Zenith Junior"}
              </p>
            </div>
            <button
              onClick={() => setIsPaymentOpen(true)}
              className="px-6 py-3 bg-[#FF4422] text-white font-semibold rounded-lg hover:bg-[#e63d1e] transition-colors whitespace-nowrap"
            >
              {tierData.tier === "pro" ? "Улучшить до Elite" : "Улучшить доступ"}
            </button>
          </div>
        )}
      </div>

      <PaymentModal
        isOpen={isPaymentOpen}
        onClose={() => {
          setIsPaymentOpen(false);
          fetchSession();
        }}
      />
    </main>
  );
}
