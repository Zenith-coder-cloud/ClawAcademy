"use client";

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
    const botId = "ClawAcademyBot";
    const redirectUri = encodeURIComponent(`${window.location.origin}/login`);
    window.location.href = `https://oauth.telegram.org/auth?bot_id=${botId}&origin=${encodeURIComponent(window.location.origin)}&request_access=write&return_to=${redirectUri}`;
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
        className="w-full flex items-center gap-3 rounded-xl border border-zinc-700 bg-[#1a1a1a] py-3 px-4 text-white hover:bg-zinc-800 transition-colors cursor-pointer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="#2AABEE"
          className="w-6 h-6 flex-shrink-0"
        >
          <path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm5.53 8.16l-1.87 8.83c-.14.63-.51.79-1.03.49l-2.85-2.1-1.37 1.32c-.15.15-.28.28-.58.28l.2-2.92 5.27-4.76c.23-.2-.05-.32-.36-.12l-6.51 4.1-2.8-.88c-.61-.19-.62-.61.13-.9l10.95-4.22c.5-.19.95.12.78.88z" />
        </svg>
        <span className="text-sm font-medium">Войти через Telegram</span>
      </button>
    </>
  );
}
