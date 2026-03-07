import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-black/90 backdrop-blur border-b border-zinc-800">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <Image
            src="/logo.png"
            alt="Claw Academy"
            width={180}
            height={60}
            priority
            className="h-10 w-auto object-contain"
          />
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
