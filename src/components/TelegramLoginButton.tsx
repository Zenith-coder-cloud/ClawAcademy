"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

interface TelegramUser {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  photo_url?: string;
  auth_date: number;
  hash: string;
}

declare global {
  interface Window {
    onTelegramAuth: (user: TelegramUser) => void;
  }
}

const BOT_ID = "8663052035";

export default function TelegramLoginButton() {
  const hiddenRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    window.onTelegramAuth = async (user: TelegramUser) => {
      try {
        const res = await fetch("/api/auth/telegram", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(user),
        });
        if (res.ok) {
          const data = await res.json();
          localStorage.setItem("tg_user", JSON.stringify({ ...data.user, auth_at: Date.now() }));
          localStorage.setItem("telegram_id", String(user.id));
          router.push("/dashboard");
        } else {
          alert("Ошибка авторизации. Попробуйте снова.");
        }
      } catch {
        alert("Ошибка подключения.");
      }
    };

    // Load hidden Telegram widget (handles OAuth callback via postMessage)
    const script = document.createElement("script");
    script.src = "https://telegram.org/js/telegram-widget.js?22";
    script.setAttribute("data-telegram-login", "ClawAcademyBot");
    script.setAttribute("data-size", "large");
    script.setAttribute("data-onauth", "onTelegramAuth(user)");
    script.setAttribute("data-request-access", "write");
    script.async = true;

    const container = hiddenRef.current;
    if (container) {
      container.innerHTML = "";
      container.appendChild(script);
    }

    return () => {
      if (container) container.innerHTML = "";
    };
  }, [router]);

  const handleClick = () => {
    const origin = window.location.origin;
    const returnTo = `${origin}/login`;
    const oauthUrl = `https://oauth.telegram.org/auth?bot_id=${BOT_ID}&scope=write&origin=${encodeURIComponent(origin)}&return_to=${encodeURIComponent(returnTo)}&request_access=write`;

    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    if (isMobile) {
      window.location.href = oauthUrl;
    } else {
      window.open(oauthUrl, "telegram_oauth", "width=550,height=470");
    }
  };

  return (
    <>
      {/* Telegram widget — visually hidden but rendered so iframe is created */}
      <div ref={hiddenRef} className="absolute overflow-hidden" style={{ width: 0, height: 0, opacity: 0 }} />
      {/* Styled button — works on all platforms */}
      <button
        onClick={handleClick}
        className="w-full py-4 bg-zinc-800 border border-zinc-700 text-white font-semibold rounded-xl hover:border-[#FF4422] transition-colors text-sm flex items-center justify-center"
      >
        Войти по номеру телефона
      </button>
    </>
  );
}
