"use client";

import { useAppKit } from "@reown/appkit/react";
import { useAccount, useDisconnect } from "wagmi";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ConnectWalletButton() {
  const { open } = useAppKit();
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const router = useRouter();

  useEffect(() => {
    if (isConnected && address) {
      const existing = localStorage.getItem("tg_user");
      const user = existing ? JSON.parse(existing) : {};
      if (!existing) {
        localStorage.setItem(
          "tg_user",
          JSON.stringify({
            wallet_address: address,
            first_name: address.slice(0, 6) + "..." + address.slice(-4),
          })
        );
      } else {
        localStorage.setItem(
          "tg_user",
          JSON.stringify({ ...user, wallet_address: address })
        );
      }
      router.push("/dashboard");
    }
  }, [isConnected, address, router]);

  if (isConnected && address) {
    return (
      <button
        onClick={() => disconnect()}
        className="w-full py-4 bg-[#1a1a1a] border border-[#333] text-white font-semibold rounded-xl hover:border-[#FF4422] transition-colors text-base flex items-center justify-center gap-3"
      >
        <span className="text-xl">🦊</span>
        {address.slice(0, 6)}...{address.slice(-4)} — Отключить
      </button>
    );
  }

  return (
    <button
      onClick={() => open()}
      className="w-full py-4 bg-[#1a1a1a] border border-[#333] text-white font-semibold rounded-xl hover:border-[#FF4422] transition-colors text-base flex items-center justify-center gap-3"
    >
      <span className="text-xl">🦊</span>
      Подключить кошелёк
    </button>
  );
}
