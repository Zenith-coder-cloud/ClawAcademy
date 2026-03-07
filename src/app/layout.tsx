import type { Metadata } from "next";
import "./globals.css";
import Web3Provider from "@/components/Web3Provider";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "Claw Academy — Зарабатывай с ИИ-агентами",
  description:
    "Первая русскоязычная платформа для заработка с ИИ-агентами. Курс, NFT-доступ, AI-чат и реальные схемы монетизации.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className="bg-[#0d0d0d] text-white antialiased">
        <Header />
        <Web3Provider>{children}</Web3Provider>
      </body>
    </html>
  );
}
