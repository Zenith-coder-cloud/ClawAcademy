import type { AppKitNetwork } from "@reown/appkit/networks";
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";
import { bsc, polygon, base, mainnet } from "@reown/appkit/networks";
import { cookieStorage, createStorage } from "@wagmi/core";

export const projectId = process.env.NEXT_PUBLIC_PROJECT_ID as string;

export const networks = [bsc, polygon, base, mainnet] as [AppKitNetwork, ...AppKitNetwork[]];

if (!projectId) {
  throw new Error("Project ID is not defined");
}

export const wagmiAdapter = new WagmiAdapter({
  storage: createStorage({
    storage: cookieStorage,
  }),
  ssr: true,
  projectId,
  networks,
});
