"use client";

import { useAppKit } from "@reown/appkit/react";
import { useAccount, useChainId, useDisconnect, useSignMessage } from "wagmi";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";

export default function ConnectWalletButton() {
  const { open } = useAppKit();
  const { address, isConnected } = useAccount();
  const chainId = useChainId();
  const { disconnect } = useDisconnect();
  const { signMessageAsync } = useSignMessage();
  const router = useRouter();
  const [signing, setSigning] = useState(false);

  const authenticate = async () => {
    setSigning(true);
    try {
      // 1. Fetch nonce + timestamps from server
      const nonceRes = await fetch("/api/auth/wallet");
      const { nonce, issuedAt, expiresAt } = await nonceRes.json();
      if (!nonce) throw new Error("Failed to get nonce");

      // 2. Build EIP-4361 SIWE message
      const domain = window.location.host;
      const uri = window.location.origin;
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
      }
    } catch (err) {
      console.error("Wallet sign-in error:", err);
    } finally {
      setSigning(false);
    }
  };

  if (isConnected && address) {
    return (
      <div className="flex flex-col items-center w-full">
        <button
          onClick={authenticate}
          disabled={signing}
          className="w-full py-3.5 bg-[#FF4422] hover:bg-[#e63d1e] text-white font-semibold rounded-xl transition-colors text-sm flex items-center justify-center gap-2 disabled:opacity-60"
        >
          {signing ? "Подписание..." : `${address.slice(0, 6)}...${address.slice(-4)} — Подписать и войти`}
        </button>
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
