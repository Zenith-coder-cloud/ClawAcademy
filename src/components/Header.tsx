"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();
  const [userLabel, setUserLabel] = useState<string | null>(null);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    fetch("/api/auth/session")
      .then((r) => r.ok ? r.json() : null)
      .then((data) => {
        if (!data?.ok) return;
        const s = data.session;
        if (s?.walletAddress) {
          setUserLabel(s.walletAddress.slice(0, 6) + "..." + s.walletAddress.slice(-4));
        } else if (s?.telegramId) {
          // Prefer DB fields from session API, fall back to localStorage
          if (s.telegramUsername) {
            setUserLabel("@" + s.telegramUsername);
          } else if (s.firstName) {
            setUserLabel(s.firstName);
          } else {
            const stored = localStorage.getItem("tg_user");
            if (stored) {
              try {
                const u = JSON.parse(stored);
                setUserLabel("@" + (u.username || u.first_name || s.telegramId));
              } catch { setUserLabel("TG #" + s.telegramId); }
            } else {
              setUserLabel("TG #" + s.telegramId);
            }
          }
        }
      })
      .catch(() => {})
      .finally(() => setChecked(true));
  }, []);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    localStorage.removeItem("tg_user");
    setUserLabel(null);
    router.push("/");
  };

  return (
    <header className="sticky top-0 z-50 bg-black/90 backdrop-blur border-b border-zinc-800">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <Image
            src="/logo.png"
            alt="Claw Academy"
            width={240}
            height={80}
            priority
            className="h-14 w-auto object-contain"
          />
        </Link>
        {userLabel ? (
          <div className="flex items-center gap-3">
            <Link href="/dashboard" className="text-sm text-zinc-300 hover:text-white transition">
              {userLabel}
            </Link>
            <button
              onClick={handleLogout}
              className="text-sm text-zinc-500 hover:text-red-400 transition"
            >
              Выйти
            </button>
          </div>
        ) : checked ? (
          <Link
            href="/login"
            className="text-sm text-zinc-400 hover:text-white transition"
          >
            Войти →
          </Link>
        ) : null}
      </div>
    </header>
  );
}
