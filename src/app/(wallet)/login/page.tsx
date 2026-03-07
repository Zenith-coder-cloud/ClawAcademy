"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import TelegramLoginButton from "@/components/TelegramLoginButton";
import ConnectWalletButton from "@/components/ConnectWalletButton";

export default function LoginPage() {
  const router = useRouter();
  const [showCodeForm, setShowCodeForm] = useState(false);
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [hashLoading, setHashLoading] = useState(false);

  const decodeTelegramAuthResult = (encoded: string) => {
    const decoded = decodeURIComponent(encoded);
    const base64 = decoded.replace(/-/g, "+").replace(/_/g, "/");
    const padding = "=".repeat((4 - (base64.length % 4)) % 4);
    return JSON.parse(atob(base64 + padding)) as Record<string, unknown>;
  };

  const normalizeTelegramUser = (user: Record<string, unknown>) => {
    if (typeof user.id === "string" && !Number.isNaN(Number(user.id))) {
      user.id = Number(user.id);
    }
    if (typeof user.auth_date === "string" && !Number.isNaN(Number(user.auth_date))) {
      user.auth_date = Number(user.auth_date);
    }
    return user;
  };

  // Handle Telegram mobile OAuth redirect:
  // - Hash format:  #tgAuthResult=BASE64_JSON
  // - Query format: ?tgAuthResult=BASE64_JSON (some Telegram versions)
  // - Flat params:  ?id=...&first_name=...&hash=... (Telegram web)
  useEffect(() => {
    const hostname = window.location.hostname;
    if (hostname === "clawacademy.io") {
      const target =
        "https://www.clawacademy.io" +
        window.location.pathname +
        window.location.search +
        window.location.hash;
      window.location.replace(target);
      return;
    }

    const hash = window.location.hash;
    const search = window.location.search;

    console.log("[TG OAuth] hash:", hash);
    console.log("[TG OAuth] search:", search);

    let parsedUser: Record<string, unknown> | null = null;

    // 1. Check hash: #tgAuthResult=BASE64
    if (hash) {
      const hashParams = new URLSearchParams(hash.startsWith("#") ? hash.slice(1) : hash);
      const tgHash = hashParams.get("tgAuthResult");
      if (tgHash) {
        try {
          parsedUser = decodeTelegramAuthResult(tgHash);
        } catch {
          setError("Ошибка обработки данных Telegram (hash)");
          return;
        }
      }
    }

    // 2. Check query: ?tgAuthResult=BASE64
    if (!parsedUser && search) {
      const params = new URLSearchParams(search);
      const tgResult = params.get("tgAuthResult");
      if (tgResult) {
        try {
          parsedUser = decodeTelegramAuthResult(tgResult);
        } catch {
          setError("Ошибка обработки данных Telegram (query)");
          return;
        }
      }

      // 3. Flat params: ?id=...&first_name=...&hash=...
      if (!parsedUser && params.has("id") && params.has("hash")) {
        parsedUser = Object.fromEntries(params.entries());
        parsedUser = normalizeTelegramUser(parsedUser);
      }
    }

    if (!parsedUser) return;
    parsedUser = normalizeTelegramUser(parsedUser);

    // Clear hash and query params
    window.history.replaceState(null, "", window.location.pathname);

    setHashLoading(true);
    fetch("/api/auth/telegram", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(parsedUser),
    })
      .then(async (res) => {
        const data = await res.json();
        if (res.ok && data.ok) {
          localStorage.setItem("tg_user", JSON.stringify({ ...data.user, auth_at: Date.now() }));
          localStorage.setItem("telegram_id", String(parsedUser!.id));
          router.push("/dashboard");
        } else {
          setError(data.error || "Ошибка авторизации Telegram");
        }
      })
      .catch(() => {
        setError("Ошибка подключения");
      })
      .finally(() => {
        setHashLoading(false);
      });
  }, [router]);

  const handleVerifyCode = async () => {
    if (code.length !== 6) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/auth/verify-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });
      const data = await res.json();
      if (res.ok && data.ok) {
        localStorage.setItem("tg_user", JSON.stringify({ ...data.user, auth_at: Date.now() }));
        if (data.user.id) localStorage.setItem("telegram_id", String(data.user.id));
        router.push("/dashboard");
      } else {
        setError(data.error || "Неверный код");
      }
    } catch {
      setError("Ошибка подключения");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#0d0d0d] flex flex-col items-center justify-center px-4 py-16">
      {hashLoading && (
        <div className="fixed inset-0 z-50 bg-[#0d0d0d] flex flex-col items-center justify-center gap-4">
          <div className="w-8 h-8 border-2 border-zinc-600 border-t-[#FF4422] rounded-full animate-spin" />
          <p className="text-zinc-400 text-sm">Авторизация через Telegram...</p>
        </div>
      )}
      {process.env.NODE_ENV === "development" && (
        <div className="fixed top-2 left-2 z-50 bg-black/80 text-green-400 text-[10px] font-mono p-2 rounded max-w-[90vw] break-all">
          <div>hash: {typeof window !== "undefined" ? window.location.hash : ""}</div>
          <div>search: {typeof window !== "undefined" ? window.location.search : ""}</div>
        </div>
      )}
      {/* Logo */}
      <a href="/" className="mb-10">
        <Image
          src="/logo.png"
          alt="Claw Academy"
          width={480}
          height={160}
          className="h-36 w-auto"
        />
      </a>

      {/* Card */}
      <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-2xl p-8 flex flex-col gap-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-2">Добро пожаловать</h1>
          <p className="text-zinc-400 text-sm">Войдите чтобы получить доступ к курсу</p>
        </div>

        {/* Telegram section — two methods grouped */}
        <div className="flex flex-col gap-3">
          {/* Section header */}
          <div className="flex items-center gap-2">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8l-1.7 8.02c-.13.58-.47.72-.95.45l-2.62-1.93-1.27 1.22c-.14.14-.26.26-.53.26l.19-2.72 4.96-4.48c.22-.19-.05-.29-.33-.1l-6.13 3.86-2.64-.82c-.57-.18-.58-.57.12-.84l10.33-3.98c.47-.17.89.12.57.96z" fill="#29B6F6"/>
            </svg>
            <span className="text-zinc-400 text-sm font-medium">Войти через Telegram</span>
          </div>

          {/* Method 1: phone number widget */}
          <TelegramLoginButton />

          {/* Method 2: bot code */}
          <div className="flex flex-col gap-1">
            {!showCodeForm ? (
              <button
                onClick={() => setShowCodeForm(true)}
                className="flex items-center justify-center gap-2 w-full bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 hover:border-[#FF4422] rounded-xl px-5 py-3 transition-all text-white text-sm font-medium"
              >
                Войти через @ClawAcademyBot
              </button>
            ) : (
              <div className="flex flex-col gap-3 p-5 bg-zinc-800 border border-[#FF4422] rounded-xl">
                <ol className="text-zinc-400 text-sm space-y-2">
                  <li><span className="text-white font-medium">1.</span> Откройте @ClawAcademyBot</li>
                  <li><span className="text-white font-medium">2.</span> Нажмите <span className="text-white font-semibold">Start</span> чтобы получить код</li>
                  <li><span className="text-white font-medium">3.</span> Введите полученный код в поле ниже</li>
                </ol>
                <a
                  href="https://t.me/ClawAcademyBot?start=login"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-center py-2 px-4 bg-[#229ED9] text-white rounded-lg text-sm font-semibold hover:bg-[#1a8abf] transition-colors"
                >
                  Открыть @ClawAcademyBot
                </a>
                <input
                  type="text"
                  inputMode="numeric"
                  maxLength={6}
                  placeholder="Введите код"
                  value={code}
                  onChange={(e) => {
                    const v = e.target.value.replace(/\D/g, "");
                    setCode(v);
                    setError("");
                  }}
                  className="w-full py-3 px-4 bg-[#0d0d0d] border border-zinc-700 rounded-lg text-white text-center text-xl tracking-[0.4em] font-mono focus:outline-none focus:border-[#FF4422]"
                />
                {error && <p className="text-red-400 text-sm text-center">{error}</p>}
                <button
                  onClick={handleVerifyCode}
                  disabled={code.length !== 6 || loading}
                  className="w-full py-3 bg-[#FF4422] text-white font-semibold rounded-lg hover:bg-[#e63d1e] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {loading ? "Проверяем..." : "Подтвердить код"}
                </button>
                <button
                  onClick={() => { setShowCodeForm(false); setCode(""); setError(""); }}
                  className="text-zinc-500 text-sm hover:text-white transition-colors"
                >
                  Назад
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-3">
          <div className="flex-1 h-px bg-zinc-800" />
          <span className="text-zinc-600 text-xs">или</span>
          <div className="flex-1 h-px bg-zinc-800" />
        </div>

        {/* Wallet */}
        <ConnectWalletButton />

        {/* iOS hint */}
        <p className="text-zinc-600 text-xs text-center leading-relaxed">
          На iPhone: откройте этот сайт во встроенном браузере MetaMask<br />
          <span className="text-zinc-700">MetaMask → Browser → clawacademy.io</span>
        </p>
      </div>

      {/* Back link */}
      <a href="/" className="mt-8 text-zinc-600 hover:text-zinc-400 text-sm transition-colors">
        ← Вернуться на главную
      </a>
    </main>
  );
}
