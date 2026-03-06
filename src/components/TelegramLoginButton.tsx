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
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    // Define callback before script loads
    window.onTelegramAuth = async (user: TelegramUser) => {
      try {
        const res = await fetch("/api/auth/telegram", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(user),
        });

        if (res.ok) {
          const data = await res.json();
          // Save to localStorage
          localStorage.setItem("tg_user", JSON.stringify(data.user));
          router.push("/dashboard");
        } else {
          alert("Ошибка авторизации. Попробуйте снова.");
        }
      } catch {
        alert("Ошибка подключения.");
      }
    };

    // Inject Telegram widget script
    const script = document.createElement("script");
    script.src = "https://telegram.org/js/telegram-widget.js?22";
    script.setAttribute("data-telegram-login", "ClawAcademyBot");
    script.setAttribute("data-domain", "www.clawacademy.io");
    script.setAttribute("data-size", "large");
    script.setAttribute("data-onauth", "onTelegramAuth(user)");
    script.setAttribute("data-request-access", "write");
    script.async = true;

    if (containerRef.current) {
      containerRef.current.innerHTML = "";
      containerRef.current.appendChild(script);
    }

    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = "";
      }
    };
  }, [router]);

  return (
    <div
      ref={containerRef}
      className="flex justify-center items-center min-h-[54px]"
    />
  );
}
