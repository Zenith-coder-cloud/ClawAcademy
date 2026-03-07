"use client";

import { useEffect, useRef } from "react";

export default function TelegramLoginButton() {
  const widgetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = widgetRef.current;
    if (!container) return;

    // Load visible Telegram widget (handles OAuth)
    const script = document.createElement("script");
    script.src = "https://telegram.org/js/telegram-widget.js?22";
    script.setAttribute("data-telegram-login", "ClawAcademyBot");
    script.setAttribute("data-size", "large");
    script.setAttribute("data-request-access", "write");
    script.setAttribute("data-auth-url", `${window.location.origin}/login`);
    script.setAttribute("data-radius", "12");
    script.async = true;

    container.innerHTML = "";
    container.appendChild(script);

    let checkTimer: number | undefined;
    if (process.env.NODE_ENV === "development") {
      checkTimer = window.setTimeout(() => {
        const iframe = container.querySelector("iframe");
        if (!iframe) {
          console.warn("[TG Widget] iframe not found after load");
        } else {
          console.log("[TG Widget] iframe loaded");
        }
      }, 1200);
    }

    return () => {
      if (checkTimer) window.clearTimeout(checkTimer);
      container.innerHTML = "";
    };
  }, []);

  return (
    <>
      {/* Telegram widget — visible (required for reliable OAuth) */}
      <div
        ref={widgetRef}
        className="w-full flex items-center justify-center py-1"
        aria-label="Telegram login"
      />
    </>
  );
}
