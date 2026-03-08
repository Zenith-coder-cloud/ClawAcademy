"use client";

import { useAppKit } from "@reown/appkit/react";
import { useAccount, useChainId, useDisconnect, useSignMessage } from "wagmi";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export default function ConnectWalletButton() {
  const { open } = useAppKit();
  const { address, isConnected } = useAccount();
  const chainId = useChainId();
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
        // 1. Fetch nonce + timestamps from server
        const nonceRes = await fetch("/api/auth/wallet");
        const { nonce, issuedAt, expiresAt } = await nonceRes.json();
        if (!nonce) throw new Error("Failed to get nonce");

        // 2. Build EIP-4361 SIWE message
        const domain = window.location.host; // e.g. www.clawacademy.io
        const uri = window.location.origin;  // e.g. https://www.clawacademy.io
        const siweMessage = [
          domain + ' wants you to sign in with your Ethereum account:',
          address,
          '',
          'Sign in to Claw Academy',
          '',
          'URI: ' + uri,
          'Version: 1',
          'Chain ID: ' + chainId,
          'Nonce: ' + nonce,
          'Issued At: ' + issuedAt,
          'Expiration Time: ' + expiresAt,
        ].join('\n');

        // 3. Request wallet signature
        const signature = await signMessageAsync({ message: siweMessage });

        // 4. Verify on server
        const verifyRes = await fetch("/api/auth/wallet", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ address, message: siweMessage, signature, chainId, issuedAt, expiresAt }),
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
          authAttempted.current = false;
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
  }, [isConnected, address, chainId, router, signMessageAsync, disconnect, signing]);

  if (signing) {
    return (
      <button
        disabled
        className="w-full py-3.5 bg-zinc-800 border border-zinc-700 text-white font-semibold rounded-xl text-sm flex items-center justify-center opacity-60"
      >
        Подписание...
      </button>
    );
  }

  if (isConnected && address) {
    return (
      <button
        onClick={() => disconnect()}
        className="w-full py-3.5 bg-zinc-800 border border-zinc-700 text-white font-semibold rounded-xl hover:bg-zinc-700 transition-colors text-sm flex items-center justify-center"
      >
        {address.slice(0, 6)}...{address.slice(-4)} — Отключить
      </button>
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
