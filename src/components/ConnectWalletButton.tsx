// v3 optimistic nonce prefetch - no SIWE
"use client";

import { useAppKit } from "@reown/appkit/react";
import { useAccount, useChainId, useDisconnect, useSignMessage } from "wagmi";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";

const AUTH_VERSION = "3.0-prefetch" as const;

interface PrefetchedNonce {
  nonce: string;
  issuedAt: string;
  expiresAt: string;
  fetchedAt: number;
}

export default function ConnectWalletButton() {
  const { open, close } = useAppKit();
  const { address, isConnected, connector } = useAccount();
  const chainId = useChainId();
  const { disconnect } = useDisconnect();
  const { signMessageAsync } = useSignMessage();
  const router = useRouter();
  const [signing, setSigning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const [nonceReady, setNonceReady] = useState(false);
  const prefetchedNonce = useRef<PrefetchedNonce | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Optimistic nonce prefetch — fetch when wallet connects / address changes
  const fetchNonce = useCallback(async () => {
    try {
      const res = await fetch("/api/auth/wallet");
      if (!res.ok) {
        console.error("[wallet-auth] nonce prefetch failed:", res.status);
        return;
      }
      const { nonce, issuedAt, expiresAt } = await res.json();
      if (nonce) {
        prefetchedNonce.current = { nonce, issuedAt, expiresAt, fetchedAt: Date.now() };
        setNonceReady(true);
        console.log("[wallet-auth] nonce prefetched for", address?.slice(0, 8));
      }
    } catch (err) {
      console.error("[wallet-auth] nonce prefetch error:", err);
    }
  }, [address]);

  useEffect(() => {
    if (isConnected && address && connector) {
      prefetchedNonce.current = null;
      setNonceReady(false);
      fetchNonce();
    } else {
      prefetchedNonce.current = null;
      setNonceReady(false);
    }
  }, [isConnected, address, connector, fetchNonce]);

  const authenticateRef = useRef<((isAutoSign?: boolean) => Promise<void>) | null>(null);

  const authenticate = useCallback(async (isAutoSign = false) => {
    if (!isConnected || !address || !connector) {
      setError("Кошелёк не подключён. Попробуйте переподключить.");
      return;
    }

    // Check if prefetched nonce is still valid (not older than 4 min)
    const cached = prefetchedNonce.current;
    if (!cached || Date.now() - cached.fetchedAt > 4 * 60 * 1000) {
      // Nonce expired or missing — refetch
      prefetchedNonce.current = null;
      setNonceReady(false);
      fetchNonce();
      if (!isAutoSign) {
        setError("Подготовка... Нажмите ещё раз.");
      }
      return;
    }

    setSigning(true);
    setError(null);
    try {
      const { nonce, issuedAt, expiresAt } = cached;
      console.log("[wallet-auth]", AUTH_VERSION, address);

      // Build plain-text sign-in message
      const signMessage = [
        "Claw Academy — вход",
        "Адрес: " + address,
        "Код: " + nonce,
        "Выдан: " + issuedAt,
        "Истекает: " + expiresAt,
      ].join("\n");

      // Sign — called immediately on user click, no prior await
      const signature = await signMessageAsync({ message: signMessage });

      // Verify on server
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
        setError("Ошибка входа: " + (data.error || "неизвестно"));
        // Refresh nonce for retry
        prefetchedNonce.current = null;
        setNonceReady(false);
        fetchNonce();
      }
    } catch (err: unknown) {
      console.error("Wallet sign-in error:", err);
      // Refresh nonce for retry
      prefetchedNonce.current = null;
      setNonceReady(false);
      fetchNonce();

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
  }, [isConnected, address, connector, signMessageAsync, chainId, fetchNonce, router]);

  authenticateRef.current = authenticate;

  const autoSignTriggered = useRef(false);

  useEffect(() => {
    // Reset flag when wallet disconnects
    if (!isConnected || !address) {
      autoSignTriggered.current = false;
      return;
    }
    // Auto-sign once when wallet connects and nonce is ready
    if (isConnected && address && connector && nonceReady && !autoSignTriggered.current) {
      autoSignTriggered.current = true;
      const runAutoSign = async () => {
        close();
        await new Promise((resolve) => setTimeout(resolve, 500));
        authenticateRef.current?.(true);
      };
      runAutoSign();
    }
  }, [isConnected, address, connector, nonceReady, close]);

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
          onClick={() => {
            authenticate();
          }}
          disabled={signing}
          className="w-full py-3.5 bg-[#FF4422] hover:bg-[#e63d1e] text-white font-semibold rounded-xl transition-colors text-sm flex items-center justify-center gap-2 disabled:opacity-60"
        >
          {signing
            ? "Подтвердите в кошельке..."
            : nonceReady
              ? `${address.slice(0, 6)}...${address.slice(-4)}`
              : "Подготовка..."}
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
