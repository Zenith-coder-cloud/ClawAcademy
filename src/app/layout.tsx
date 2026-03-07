import type { Metadata } from "next";
import "./globals.css";
import Web3Provider from "@/components/Web3Provider";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "Claw Academy — Возьми интеллект под свой контроль",
  description:
    "Больше чем курсы: прикладная база для тех, кто готов внедрять ИИ во все сферы жизни. Первая RU платформа по работе с ИИ-агентами на OpenClaw.",
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.ico" },
    ],
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "Claw Academy — Возьми интеллект под свой контроль",
    description: "Прикладная база для тех, кто готов внедрять ИИ-агентов во все сферы жизни.",
    url: "https://www.clawacademy.io",
    siteName: "Claw Academy",
    images: [{ url: "/og-image.png", width: 512, height: 512 }],
    locale: "ru_RU",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Claw Academy",
    description: "Прикладная база для тех, кто готов внедрять ИИ-агентов во все сферы жизни.",
    images: ["/og-image.png"],
  },
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
