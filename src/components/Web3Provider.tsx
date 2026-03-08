"use client";

import { WagmiProvider, cookieToInitialState } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createAppKit } from "@reown/appkit/react";
import { wagmiAdapter, networks, projectId } from "@/lib/web3";
import { useState } from "react";

const metadata = {
  name: "Claw Academy",
  description: "Первая русскоязычная платформа по заработку с ИИ-агентами",
  url: process.env.NEXT_PUBLIC_APP_URL || "https://www.clawacademy.io",
  icons: ["https://www.clawacademy.io/favicon.ico"],
};

createAppKit({
  adapters: [wagmiAdapter],
  projectId,
  networks,
  defaultNetwork: networks[0],
  metadata,
  features: {
    analytics: false,
    email: false,
    socials: [],
    emailShowWallets: false,
  },
  themeMode: "dark",
  themeVariables: {
    "--w3m-accent": "#FF4422",
    "--w3m-border-radius-master": "8px",
  },
});

export default function Web3Provider({
  children,
  cookies,
}: {
  children: React.ReactNode;
  cookies: string | null;
}) {
  const [queryClient] = useState(() => new QueryClient());
  const initialState = cookieToInitialState(
    wagmiAdapter.wagmiConfig,
    cookies || ""
  );

  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig} initialState={initialState}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  );
}
