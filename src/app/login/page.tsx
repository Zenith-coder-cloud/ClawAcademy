"use client";

import Link from "next/link";
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
    <main className="min-h-screen bg-[#0d0d0d] flex flex-col items-center justify-center px-4">
      <Link
        href="/"
        className="text-[#888888] hover:text-white mb-10 transition-colors"
      >
        ← Назад
      </Link>

      {/* Logo */}
      <div className="text-5xl mb-4">🦅</div>

      <h1 className="text-3xl md:text-4xl font-bold mb-2 text-white">
        Добро пожаловать
      </h1>
      <p className="text-[#888888] mb-10 text-center max-w-md">
        Выберите способ входа
      </p>

      <div className="flex flex-col gap-3 w-full max-w-sm">
        {/* Button 1: Telegram (custom styled, hidden widget behind) */}
        <TelegramLoginButton />

        {/* Button 2: Wallet */}
        <ConnectWalletButton />

        {/* Button 3: Bot code */}
        {!showCodeForm ? (
          <button
            onClick={() => setShowCodeForm(true)}
            className="w-full py-4 bg-[#1a1a1a] border border-[#333] text-white font-semibold rounded-xl hover:border-[#FF4422] transition-colors text-base flex items-center justify-center gap-3"
          >
            <span className="text-xl">🤖</span>
            Войти через @ClawAcademyBot
          </button>
        ) : (
          <div className="flex flex-col gap-3 p-5 bg-[#1a1a1a] border border-[#FF4422] rounded-xl">
            <p className="text-white font-semibold text-sm">Шаги:</p>
            <ol className="text-[#888888] text-sm space-y-1 list-decimal list-inside">
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
              ✈️ Открыть @ClawAcademyBot
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
              className="w-full py-3 px-4 bg-[#0d0d0d] border border-[#444] rounded-lg text-white text-center text-3xl tracking-[0.5em] font-mono focus:outline-none focus:border-[#FF4422]"
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
              className="text-[#555] text-sm hover:text-white transition-colors"
            >
              ← Назад
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
