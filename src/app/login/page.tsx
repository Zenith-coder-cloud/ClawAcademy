"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import TelegramLoginButton from "@/components/TelegramLoginButton";
import ConnectWalletButton from "@/components/ConnectWalletButton";

export default function LoginPage() {
  const router = useRouter();
  const [showCodeForm, setShowCodeForm] = useState(false);
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleVerifyCode = async () => {
    if (code.length !== 4) return;
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
        localStorage.setItem("tg_user", JSON.stringify(data.user));
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
      {/* Logo */}
      <a href="/" className="mb-10">
        <Image
          src="/logo.png"
          alt="Claw Academy"
          width={200}
          height={67}
          className="h-16 w-auto"
        />
      </a>

      {/* Card */}
      <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-2xl p-8 flex flex-col gap-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-2">
            Добро пожаловать
          </h1>
          <p className="text-zinc-400 text-sm">
            Войдите чтобы получить доступ к курсу
          </p>
        </div>

        {/* Section: Telegram */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3 mb-1">
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8l-1.7 8.02c-.13.58-.47.72-.95.45l-2.62-1.93-1.27 1.22c-.14.14-.26.26-.53.26l.19-2.72 4.96-4.48c.22-.19-.05-.29-.33-.1l-6.13 3.86-2.64-.82c-.57-.18-.58-.57.12-.84l10.33-3.98c.47-.17.89.12.57.96z"
                fill="#29B6F6"
              />
            </svg>
            <span className="text-zinc-300 font-medium text-sm">
              Войти через Telegram
            </span>
          </div>
          <TelegramLoginButton />
        </div>

        {/* Divider */}
        <div className="flex items-center gap-3">
          <div className="flex-1 h-px bg-zinc-800" />
          <span className="text-zinc-600 text-xs">или</span>
          <div className="flex-1 h-px bg-zinc-800" />
        </div>

        {/* Section: Bot code */}
        <div className="flex flex-col gap-3">
          {!showCodeForm ? (
            <button
              onClick={() => setShowCodeForm(true)}
              className="flex items-center gap-3 w-full bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 hover:border-[#FF4422] rounded-xl px-5 py-4 transition-all cursor-pointer"
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="3"
                  y="8"
                  width="18"
                  height="13"
                  rx="3"
                  fill="#FF4422"
                  opacity="0.15"
                  stroke="#FF4422"
                  strokeWidth="1.5"
                />
                <circle cx="9" cy="14" r="1.5" fill="#FF4422" />
                <circle cx="15" cy="14" r="1.5" fill="#FF4422" />
                <path
                  d="M8 8V6a4 4 0 018 0v2"
                  stroke="#FF4422"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <path
                  d="M12 4v-1"
                  stroke="#FF4422"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
              <span className="text-white font-medium text-sm">
                Войти через @ClawAcademyBot
              </span>
            </button>
          ) : (
            <div className="flex flex-col gap-3 p-5 bg-zinc-800 border border-[#FF4422] rounded-xl">
              <p className="text-white font-semibold text-sm">Шаги:</p>
              <ol className="text-zinc-400 text-sm space-y-1 list-decimal list-inside">
                <li>Напишите боту в Telegram</li>
                <li>Получите 4-значный код</li>
                <li>Введите его ниже</li>
              </ol>
              <a
                href="https://t.me/ClawAcademyBot"
                target="_blank"
                rel="noopener noreferrer"
                className="text-center py-2 px-4 bg-[#229ED9] text-white rounded-lg text-sm font-semibold hover:bg-[#1a8abf] transition-colors"
              >
                Открыть @ClawAcademyBot
              </a>
              <input
                type="text"
                inputMode="numeric"
                maxLength={4}
                placeholder="Введите код (4 цифры)"
                value={code}
                onChange={(e) => {
                  const v = e.target.value.replace(/\D/g, "");
                  setCode(v);
                  setError("");
                }}
                className="w-full py-3 px-4 bg-[#0d0d0d] border border-zinc-700 rounded-lg text-white text-center text-3xl tracking-[0.5em] font-mono focus:outline-none focus:border-[#FF4422]"
              />
              {error && (
                <p className="text-red-400 text-sm text-center">{error}</p>
              )}
              <button
                onClick={handleVerifyCode}
                disabled={code.length !== 4 || loading}
                className="w-full py-3 bg-[#FF4422] text-white font-semibold rounded-lg hover:bg-[#e63d1e] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {loading ? "Проверяем..." : "Подтвердить код"}
              </button>
              <button
                onClick={() => {
                  setShowCodeForm(false);
                  setCode("");
                  setError("");
                }}
                className="text-zinc-500 text-sm hover:text-white transition-colors"
              >
                Назад
              </button>
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="flex items-center gap-3">
          <div className="flex-1 h-px bg-zinc-800" />
          <span className="text-zinc-600 text-xs">или</span>
          <div className="flex-1 h-px bg-zinc-800" />
        </div>

        {/* Section: Wallet */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3 mb-1">
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="2"
                y="6"
                width="20"
                height="14"
                rx="3"
                fill="#FF4422"
                opacity="0.15"
                stroke="#FF4422"
                strokeWidth="1.5"
              />
              <path d="M2 10h20" stroke="#FF4422" strokeWidth="1.5" />
              <circle cx="17" cy="15" r="1.5" fill="#FF4422" />
            </svg>
            <span className="text-zinc-300 font-medium text-sm">
              Подключить кошелёк
            </span>
          </div>
          <ConnectWalletButton />
        </div>
      </div>

      {/* Back link */}
      <a
        href="/"
        className="mt-8 text-zinc-600 hover:text-zinc-400 text-sm transition-colors"
      >
        ← Вернуться на главную
      </a>
    </main>
  );
}
