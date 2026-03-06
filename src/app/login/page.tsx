import Link from "next/link";

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-[#0d0d0d] flex flex-col items-center justify-center px-4">
      <Link href="/" className="text-[#888888] hover:text-white mb-12 transition-colors">
        ← Назад
      </Link>
      <h1 className="text-3xl md:text-4xl font-bold mb-4">Войти в Claw Academy</h1>
      <p className="text-[#888888] mb-10 text-center max-w-md">
        Выберите способ входа. После авторизации вы получите доступ к своим модулям.
      </p>
      <div className="flex flex-col gap-4 w-full max-w-sm">
        <button className="w-full py-4 bg-[#FF4422] text-white font-semibold rounded-lg hover:bg-[#e63d1e] transition-colors text-lg">
          Войти через Telegram
        </button>
        <button className="w-full py-4 border border-[#FF4422] text-[#FF4422] font-semibold rounded-lg hover:bg-[#FF4422] hover:text-white transition-colors text-lg">
          Подключить кошелёк
        </button>
      </div>
    </main>
  );
}
