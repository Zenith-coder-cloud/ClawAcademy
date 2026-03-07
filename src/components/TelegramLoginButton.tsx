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
          localStorage.setItem("tg_user", JSON.stringify(data.user));
          router.push("/dashboard");
        } else {
          alert("Ошибка авторизации. Попробуйте снова.");
        }
      } catch {
        alert("Ошибка подключения.");
      }
    };

    // Inject hidden Telegram widget for OAuth
    const script = document.createElement("script");
    script.src = "https://telegram.org/js/telegram-widget.js?22";
    script.setAttribute("data-telegram-login", "ClawAcademyBot");
    script.setAttribute("data-size", "large");
    script.setAttribute("data-onauth", "onTelegramAuth(user)");
    script.setAttribute("data-request-access", "write");
    script.async = true;

    if (hiddenRef.current) {
      hiddenRef.current.innerHTML = "";
      hiddenRef.current.appendChild(script);
    }

    return () => {
      if (hiddenRef.current) {
        hiddenRef.current.innerHTML = "";
      }
    };
  }, [router]);

  const handleClick = () => {
    // Try to click the hidden Telegram widget iframe button
    const iframe = hiddenRef.current?.querySelector("iframe");
    if (iframe) {
      iframe.click();
    } else {
      // Fallback: open Telegram OAuth directly with correct bot_id
      const origin = window.location.origin;
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
      const url = `https://oauth.telegram.org/auth?bot_id=8663052035&scope=write&origin=${encodeURIComponent(origin)}&return_to=${encodeURIComponent(origin + "/login")}&request_access=write`;
      if (isMobile) {
        window.location.href = url;
      } else {
        window.open(url, "telegram_oauth", "width=550,height=470,toolbar=no,menubar=no");
      }
    }
  };

  return (
    <>
      {/* Hidden widget container */}
      <div ref={hiddenRef} className="hidden" />
      {/* Custom styled button */}
      <button
        onClick={handleClick}
        className="w-full py-4 bg-zinc-800 border border-zinc-700 text-white font-semibold rounded-xl hover:border-[#FF4422] transition-colors text-sm flex items-center justify-center"
      >
        Войти по номеру телефона
      </button>
    </>
  );
}
