import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Web3Provider from "@/components/Web3Provider";
import { headers } from "next/headers";

export const metadata: Metadata = {
  title: "Claw Academy — Курс по ИИ-агентам | Заработок с искусственным интеллектом",
  description:
    "Первая русскоязычная платформа по обучению работе с ИИ-агентами на OpenClaw. Создай агента за 15 минут, автоматизируй бизнес и зарабатывай с помощью ИИ без опыта в программировании.",
  keywords: [
    "ИИ агент курс",
    "обучение ИИ агентам",
    "заработок с нейросетями",
    "курс по AI агентам 2026",
    "OpenClaw обучение",
    "AI агент для бизнеса",
    "автоматизация с ИИ",
    "ИИ агент как создать",
    "пассивный доход с ИИ",
    "ИИ агенты без программирования",
  ],
  authors: [{ name: "Claw Academy" }],
  creator: "Claw Academy",
  metadataBase: new URL("https://www.clawacademy.io"),
  alternates: {
    canonical: "https://www.clawacademy.io",
  },
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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersList = await headers();
  const cookies = headersList.get("cookie");

  return (
    <html lang="ru">
      <body className="bg-[#0d0d0d] text-white antialiased">
        <Web3Provider cookies={cookies}>
          <Header />
          {children}
        </Web3Provider>
      </body>
    </html>
  );
}
