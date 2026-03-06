import { createAppKit } from "@reown/appkit/react";
import type { AppKitNetwork } from "@reown/appkit/networks";
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";
import { bsc, polygon, base, mainnet } from "@reown/appkit/networks";

export const projectId = "4409af1c056154be6bf60898f13b84c4";

const metadata = {
  name: "Claw Academy",
  description: "Первая русскоязычная платформа по заработку с ИИ-агентами",
  url: "https://www.clawacademy.io",
  icons: ["https://www.clawacademy.io/favicon.ico"],
};

export const networks = [bsc, polygon, base, mainnet] as [AppKitNetwork, ...AppKitNetwork[]];

export const wagmiAdapter = new WagmiAdapter({
  projectId,
  networks,
});

export const modal = createAppKit({
  adapters: [wagmiAdapter],
  projectId,
  networks,
  defaultNetwork: bsc,
  metadata,
  features: { analytics: false },
  themeMode: "dark",
  themeVariables: {
    "--w3m-accent": "#FF4422",
    "--w3m-border-radius-master": "8px",
  },
});
