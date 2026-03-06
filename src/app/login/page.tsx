import Link from "next/link";
import TelegramLoginButton from "@/components/TelegramLoginButton";

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-[#0d0d0d] flex flex-col items-center justify-center px-4">
      <Link
        href="/"
        className="text-[#888888] hover:text-white mb-12 transition-colors"
      >
        ← Назад
      </Link>
      <h1 className="text-3xl md:text-4xl font-bold mb-4 text-white">
        Войти в Claw Academy
      </h1>
      <p className="text-[#888888] mb-10 text-center max-w-md">
        Выберите способ входа. После авторизации вы получите доступ к своим
        модулям.
      </p>
      <div className="flex flex-col gap-4 w-full max-w-sm">
        {/* Real Telegram Login Widget */}
        <TelegramLoginButton />

        {/* Wallet — placeholder for now */}
        <button
          disabled
          className="w-full py-4 border border-[#333] text-[#555] font-semibold rounded-lg cursor-not-allowed text-lg"
        >
          Подключить кошелёк (скоро)
        </button>
        <p className="text-center text-[#555] text-xs">
          WalletConnect — в следующем обновлении
        </p>
      </div>
    </main>
  );
}
