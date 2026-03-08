"use client";

import Image from "next/image";
import { useEffect, useRef, useCallback } from "react";

export default function TelegramLoginButton() {
  const widgetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = widgetRef.current;
    if (!container) return;

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

    return () => {
      container.innerHTML = "";
    };
  }, []);

  const handleClick = useCallback(() => {
    const iframe = widgetRef.current?.querySelector("iframe");
    if (iframe) {
      iframe.contentWindow?.postMessage(
        JSON.stringify({ event: "auth_user", origin: window.location.origin }),
        "https://oauth.telegram.org"
      );
      // Also try direct click on the iframe
      (iframe as HTMLElement).click();
      return;
    }
    // Fallback: redirect to Telegram OAuth
    window.location.href = 'https://oauth.telegram.org/auth?bot_id=8663052035&origin=' + encodeURIComponent(window.location.origin) + '&return_to=' + encodeURIComponent(window.location.origin + '/login') + '&request_access=write';
  }, []);

  return (
    <>
      {/* Hidden Telegram widget — kept for OAuth functionality */}
      <div
        ref={widgetRef}
        style={{
          position: "absolute",
          opacity: 0,
          pointerEvents: "none",
          width: "1px",
          height: "1px",
          overflow: "hidden",
        }}
        aria-hidden="true"
      />

      {/* Styled button matching dark brand design */}
      <button
        type="button"
        onClick={handleClick}
        className="bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 hover:border-[#FF4422] rounded-xl px-5 py-3 flex items-center justify-center gap-3 text-white text-sm font-medium w-full transition-all"
      >
        <Image src="/robot-icon.png" width={24} height={24} alt="robot" className="rounded-full" />
        Войти через Telegram
      </button>
    </>
  );
}
