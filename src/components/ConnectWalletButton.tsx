"use client";

import { useAppKit } from "@reown/appkit/react";
import { useAccount, useDisconnect, useSignMessage } from "wagmi";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export default function ConnectWalletButton() {
  const { open } = useAppKit();
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const { signMessageAsync } = useSignMessage();
  const router = useRouter();
  const [signing, setSigning] = useState(false);
  const authAttempted = useRef(false);

  useEffect(() => {
    if (!isConnected || !address || authAttempted.current || signing) return;

    const authenticate = async () => {
      authAttempted.current = true;
      setSigning(true);
      try {
        // 1. Fetch nonce from server
        const nonceRes = await fetch("/api/auth/wallet");
        const { nonce } = await nonceRes.json();
        if (!nonce) throw new Error("Failed to get nonce");

        // 2. Build sign message
        const timestamp = new Date().toISOString();
        const message = `Sign in to Claw Academy\nNonce: ${nonce}\nTimestamp: ${timestamp}`;

        // 3. Request wallet signature
        const signature = await signMessageAsync({ message });

        // 4. Verify on server
        const verifyRes = await fetch("/api/auth/wallet", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ address, message, signature }),
        });

        const data = await verifyRes.json();
        if (verifyRes.ok && data.ok) {
          localStorage.setItem(
            "tg_user",
            JSON.stringify({ ...data.user, auth_at: Date.now() })
          );
          router.push("/dashboard");
        } else {
          console.error("Wallet auth failed:", data.error);
          disconnect();
        }
      } catch (err) {
        console.error("Wallet sign-in error:", err);
        authAttempted.current = false;
        disconnect();
      } finally {
        setSigning(false);
      }
    };

    authenticate();
  }, [isConnected, address, router, signMessageAsync, disconnect, signing]);

  if (signing) {
    return (
      <button
        disabled
        className="w-full py-4 bg-zinc-800 border border-zinc-700 text-white font-semibold rounded-xl text-sm flex items-center justify-center opacity-60"
      >
        Подписание...
      </button>
    );
  }

  if (isConnected && address) {
    return (
      <button
        onClick={() => disconnect()}
        className="w-full py-4 bg-zinc-800 border border-zinc-700 text-white font-semibold rounded-xl hover:border-[#FF4422] transition-colors text-sm flex items-center justify-center"
      >
        {address.slice(0, 6)}...{address.slice(-4)} — Отключить
      </button>
    );
  }

  return (
    <button
      onClick={() => open()}
      className="w-full py-4 bg-zinc-800 border border-zinc-700 text-white font-semibold rounded-xl hover:border-[#FF4422] transition-colors text-sm flex items-center justify-center gap-3"
    >
      <Image src="/walletconnect.svg" alt="WalletConnect" width={22} height={15} className="w-6 h-auto" />
      Подключить кошелёк
    </button>
  );
}
