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
        className="w-full py-4 border border-[#333] text-[#888] font-semibold rounded-lg hover:border-[#FF4422] hover:text-white transition-colors text-sm"
      >
        {address.slice(0, 6)}...{address.slice(-4)} — Отключить
      </button>
    );
  }

  return (
    <button
      onClick={() => open()}
      className="w-full py-4 border border-[#FF4422] text-[#FF4422] font-semibold rounded-lg hover:bg-[#FF4422] hover:text-white transition-colors text-lg"
    >
      🦊 Подключить кошелёк
    </button>
  );
}
