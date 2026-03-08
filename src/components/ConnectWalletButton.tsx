// v2 plain-text auth - no SIWE
"use client";

import { useAppKit } from "@reown/appkit/react";
import { useAccount, useChainId, useDisconnect } from "wagmi";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";

const AUTH_VERSION = "2.0-plaintext" as const;

export default function ConnectWalletButton() {
  const { open } = useAppKit();
  const { address, isConnected, connector } = useAccount();
  const chainId = useChainId();
  const { disconnect } = useDisconnect();
  const router = useRouter();
  const [signing, setSigning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const authenticate = async () => {
    const hostname = window.location.hostname;
    if (hostname === "clawacademy.io") {
      window.location.href =
        "https://www.clawacademy.io" + window.location.pathname;
      return;
    }
    if (!isConnected || !address || !connector) {
      setError("Кошелёк не подключён. Попробуйте переподключить.");
      return;
    }
    setSigning(true);
    setError(null);
    try {
      // 1. Fetch nonce + timestamps from server
      console.log("[wallet-auth]", AUTH_VERSION, address);
      const nonceRes = await fetch("/api/auth/wallet");
      const { nonce, issuedAt, expiresAt } = await nonceRes.json();
      if (!nonce) throw new Error("Failed to get nonce");

      // 2. Build plain-text sign-in message
      const signMessage = [
        "Войти в ClawAcademy",
        "",
        "Адрес: " + address,
        "Nonce: " + nonce,
        "Выдан: " + issuedAt,
        "Истекает: " + expiresAt,
      ].join("\n");

      // 3. Request wallet signature
      const provider = (window as { ethereum?: { request: (args: { method: string; params: unknown[] }) => Promise<string> } }).ethereum;
      if (!provider) throw new Error("MetaMask not found");
      const encoder = new TextEncoder();
      const bytes = encoder.encode(signMessage);
      const msgHex = "0x" + Array.from(bytes).map(b => b.toString(16).padStart(2, "0")).join("");
      const signature = await provider.request({
        method: "personal_sign",
        params: [msgHex, address],
      });

      // 4. Verify on server
      const verifyRes = await fetch("/api/auth/wallet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          address,
          message: signMessage,
          signature,
          chainId,
          issuedAt,
          expiresAt,
        }),
      });

      const data = await verifyRes.json();
      if (verifyRes.ok && data.ok) {
        localStorage.setItem(
          "tg_user",
          JSON.stringify({ ...data.user, auth_at: Date.now() })
        );
        localStorage.setItem("wallet_address", address);
        router.push("/dashboard");
      } else {
        console.error("Wallet auth failed:", data.error);
      }
    } catch (err: unknown) {
      console.error("Wallet sign-in error:", err);
      if (err instanceof Error && err.name === "ConnectorNotConnectedError") {
        setError("Кошелёк отключился. Пожалуйста, переподключите.");
      } else if (err instanceof Error && err.message.includes("User rejected")) {
        setError("Подпись отклонена.");
      } else {
        setError("Ошибка входа. Попробуйте ещё раз.");
      }
    } finally {
      setSigning(false);
    }
  };

  if (!mounted) {
    return (
      <button
        disabled
        className="w-full py-3.5 bg-zinc-800 border border-zinc-700 text-white font-semibold rounded-xl text-sm flex items-center justify-center gap-3 opacity-60"
      >
        <Image src="/walletconnect.svg" alt="WalletConnect" width={22} height={15} className="w-6 h-auto" />
        Подключить кошелёк
      </button>
    );
  }

  if (isConnected && address && connector) {
    return (
      <div className="flex flex-col items-center w-full">
        <button
          onClick={authenticate}
          disabled={signing}
          className="w-full py-3.5 bg-[#FF4422] hover:bg-[#e63d1e] text-white font-semibold rounded-xl transition-colors text-sm flex items-center justify-center gap-2 disabled:opacity-60"
        >
          {signing ? "Подписание..." : `${address.slice(0, 6)}...${address.slice(-4)} — Подписать и войти`}
        </button>
        {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
        <span
          onClick={() => disconnect()}
          className="text-zinc-500 text-xs underline cursor-pointer mt-1"
        >
          Отключить
        </span>
      </div>
    );
  }

  return (
    <button
      onClick={() => open()}
      className="w-full py-3.5 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-white font-semibold rounded-xl transition-colors text-sm flex items-center justify-center gap-3"
    >
      <Image src="/walletconnect.svg" alt="WalletConnect" width={22} height={15} className="w-6 h-auto" />
      Подключить кошелёк
    </button>
  );
}

