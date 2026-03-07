import Web3Provider from "@/components/Web3Provider";

export default function WalletLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Web3Provider>{children}</Web3Provider>;
}
