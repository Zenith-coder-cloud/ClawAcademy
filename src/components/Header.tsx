import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-black/90 backdrop-blur border-b border-zinc-800">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-xl font-bold">
          <span>🦞</span>
          <span className="text-white">CLAW</span>
          <span className="text-[#FF4422]">ACADEMY</span>
        </Link>
        <Link
          href="/login"
          className="text-sm text-zinc-400 hover:text-white transition"
        >
          Войти →
        </Link>
      </div>
    </header>
  );
}
