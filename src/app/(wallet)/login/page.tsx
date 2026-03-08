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
  const [mounted, setMounted] = useState(false);

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
    setMounted(true);
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

  const handleTelegramClick = () => {
    const iframe = document.querySelector('iframe[src*="telegram"]') as HTMLIFrameElement;
    if (iframe) {
      iframe.click();
    } else {
      window.location.href =
        "https://oauth.telegram.org/auth?bot_id=8663052035&origin=" +
        encodeURIComponent(window.location.origin) +
        "&return_to=" +
        encodeURIComponent(window.location.origin + "/login") +
        "&request_access=write&embed=0";
    }
  };

  return (
    <main className="min-h-screen bg-[#0D0D0D] flex flex-col items-center justify-center px-4 py-16 relative overflow-hidden">
      {/* Subtle radial gradient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-[radial-gradient(ellipse_at_center,_rgba(255,68,34,0.05)_0%,_transparent_70%)] pointer-events-none" />

      {hashLoading && (
        <div className="fixed inset-0 z-50 bg-[#0D0D0D] flex flex-col items-center justify-center gap-4">
          <div className="w-8 h-8 border-2 border-zinc-600 border-t-[#FF4422] rounded-full animate-spin" />
          <p className="text-zinc-400 text-sm">Авторизация через Telegram...</p>
        </div>
      )}
      {process.env.NODE_ENV === "development" && mounted && (
        <div className="fixed top-2 left-2 z-50 bg-black/80 text-green-400 text-[10px] font-mono p-2 rounded max-w-[90vw] break-all">
          <div>hash: {typeof window !== "undefined" ? window.location.hash : ""}</div>
          <div>search: {typeof window !== "undefined" ? window.location.search : ""}</div>
        </div>
      )}

      {/* Logo */}
      <a href="/" className="mb-10 relative z-10">
        <Image
          src="/logo.png"
          alt="Claw Academy"
          width={800}
          height={300}
          className="w-72 h-auto"
        />
      </a>

      {/* Card */}
      <div className="w-full max-w-sm bg-zinc-900/80 backdrop-blur-xl rounded-2xl p-8 flex flex-col gap-3 shadow-2xl shadow-black/50 relative z-10">
        {/* Hidden Telegram widget for OAuth */}
        <div className="opacity-0 h-0 overflow-hidden pointer-events-none absolute">
          <TelegramLoginButton />
        </div>

        {/* Button 1: Telegram login */}
        <button
          onClick={handleTelegramClick}
          className="w-full py-3.5 bg-[#229ED9] hover:bg-[#1e8dc4] rounded-xl flex items-center justify-center gap-3 text-white text-sm font-semibold transition-colors"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M22.05 1.577c-.393-.016-.784.08-1.117.235-.484.186-4.92 1.902-9.41 3.64L5.11 8.082c-.26.1-.733.3-.763.493-.03.2.168.38.404.502l3.768 1.69c.144.065.31.073.464.027l2.66-.93c.614-.215 1.21-.433 1.79-.64.235-.084.47-.168.697-.252.06-.022.12-.043.173-.065.02-.008.037-.013.038-.013.072-.025.15-.04.22-.012a.312.312 0 0 1 .166.152c.03.06.038.13.02.197-.02.07-.065.13-.12.178l-.018.015c-.058.048-.12.094-.178.14l-3.07 2.51c-.33.27-.5.69-.455 1.12l.46 4.54c.025.254.14.49.327.67.187.18.434.29.696.31.26.02.52-.05.73-.2l2.15-1.55c.49-.35 1.1-.35 1.59 0l3.36 2.51c.29.22.65.33 1.01.31.36-.02.7-.17.96-.42.26-.25.42-.58.47-.94l2.87-16.19c.08-.46.02-.93-.18-1.33a1.62 1.62 0 0 0-.97-.82Z"
              fill="white"
            />
          </svg>
          Войти через Telegram
        </button>

        {/* Button 2: Bot code */}
        {!showCodeForm ? (
          <button
            onClick={() => setShowCodeForm(true)}
            className="w-full py-3.5 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 rounded-xl flex items-center justify-center gap-3 text-white text-sm font-semibold transition-colors"
          >
            <Image src="/robot-icon.png" width={20} height={20} alt="bot" className="rounded-full" />
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

        {/* Separator */}
        <div className="flex items-center gap-3 my-1">
          <div className="flex-1 h-px bg-zinc-700" />
          <span className="text-zinc-500 text-xs">или</span>
          <div className="flex-1 h-px bg-zinc-700" />
        </div>

        {/* Wallet */}
        <ConnectWalletButton />
      </div>

      {/* Back link */}
      <a href="/" className="mt-8 text-zinc-600 hover:text-zinc-400 text-sm transition-colors relative z-10">
        ← Вернуться на главную
      </a>
    </main>
  );
}
