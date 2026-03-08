export const PAYMENT_ADDRESS = "0xe5ccd1E4c6350A7d91DcF02D4ceEadc702a1571D";

export const TIERS = {
  free: { name: "Free", price_usd: 0, blocks: [0] },
  genesis: { name: "Genesis", price_usd: 49, blocks: [0, 1, 2] },
  pro: { name: "Pro", price_usd: 99, blocks: [0, 1, 2, 3, 4, 5] },
  elite: { name: "Elite", price_usd: 249, blocks: [0, 1, 2, 3, 4, 5], maxSeats: 50 },
} as const;

export type TierKey = keyof typeof TIERS;

export const SUPPORTED_CHAINS = [
  {
    id: 56,
    name: "BSC",
    nativeCurrency: "BNB",
    nativeRate: 600,
    usdtAddress: "0x55d398326f99059fF775485246999027B3197955",
    rpcUrl: "https://bsc-dataseed.binance.org",
  },
  {
    id: 1,
    name: "Ethereum",
    nativeCurrency: "ETH",
    nativeRate: 3000,
    usdtAddress: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
    rpcUrl: "https://eth.llamarpc.com",
  },
  {
    id: 42161,
    name: "Arbitrum",
    nativeCurrency: "ETH",
    nativeRate: 3000,
    usdtAddress: "0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9",
    rpcUrl: "https://arb1.arbitrum.io/rpc",
  },
  {
    id: 8453,
    name: "Base",
    nativeCurrency: "ETH",
    nativeRate: 3000,
    usdtAddress: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913", // USDC on Base (most liquid stable)
    rpcUrl: "https://mainnet.base.org",
  },
  {
    id: 137,
    name: "Polygon",
    nativeCurrency: "MATIC",
    nativeRate: 1,
    usdtAddress: "0xc2132D05D31c914a87C6611C10748AEb04B58e8F",
    rpcUrl: "https://polygon-rpc.com",
  },
] as const;

export const TESTNET_CHAINS = [
  {
    id: 97,
    name: "BSC Testnet",
    nativeCurrency: "tBNB",
    nativeRate: 600,
    usdtAddress: "0xEdA5dA0050e21e9E34fadb1075986Af1370c7BDb",
    rpcUrl: "https://data-seed-prebsc-1-s1.binance.org:8545",
  },
];

export type SupportedChain = (typeof SUPPORTED_CHAINS)[number];

export function getChainById(chainId: number): SupportedChain | undefined {
  return SUPPORTED_CHAINS.find((c) => c.id === chainId);
}
