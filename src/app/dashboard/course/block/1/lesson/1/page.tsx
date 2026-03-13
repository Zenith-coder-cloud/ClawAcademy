"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

const osTabs = [
  { id: "mac", label: "🍎 Mac" },
  { id: "windows", label: "🪟 Windows" },
  { id: "linux", label: "🐧 Linux" },
  { id: "vps", label: "☁️ VPS" },
] as const;

type OsId = (typeof osTabs)[number]["id"];

type CodeBlockProps = {
  code: string;
  language?: string;
};

function CodeBlock({ code, language }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1400);
  }

  return (
    <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 relative">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs text-zinc-500 font-medium">
          {language ?? "bash"}
        </span>
        <button
          onClick={handleCopy}
          className="text-xs px-2.5 py-1 rounded-md border border-zinc-700 text-zinc-300 hover:border-[#FF4422] hover:text-white transition-colors"
          aria-label="Copy code"
        >
          {copied ? "Скопировано" : "Копировать"}
        </button>
      </div>
      <pre className="text-sm text-zinc-200 font-mono whitespace-pre-wrap">
        {code}
      </pre>
    </div>
  );
}

type AccordionItem = {
  title: string;
  content: string;
  hint?: string;
};

function Accordion({ items }: { items: AccordionItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="space-y-3">
      {items.map((item, idx) => {
        const isOpen = openIndex === idx;
        return (
          <div
            key={item.title}
            className="bg-zinc-950 border border-zinc-800 rounded-xl"
          >
            <button
              className="w-full flex items-center justify-between px-5 py-4 text-left"
              onClick={() => setOpenIndex(isOpen ? null : idx)}
            >
              <span className="text-white font-semibold">{item.title}</span>
              <span className="text-zinc-500 text-sm">
                {isOpen ? "Скрыть" : "Показать"}
              </span>
            </button>
            {isOpen && (
              <div className="px-5 pb-5 text-zinc-400 leading-relaxed">
                <p className="mb-2">{item.content}</p>
                {item.hint && (
                  <div className="text-zinc-300 bg-zinc-900/60 border border-zinc-800 rounded-lg px-4 py-3">
                    {item.hint}
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default function Block1Lesson1Page() {
  const router = useRouter();
  const [activeOs, setActiveOs] = useState<OsId>("mac");
  const [checks, setChecks] = useState([false, false, false, false, false]);

  const allChecked = checks.every(Boolean);

  const accordionItems: AccordionItem[] = [
    {
      title: "openclaw: command not found",
      content:
        "Скорее всего, shell не подхватил путь до бинарника. Перезапусти Terminal или добавь PATH вручную.",
      hint:
        "Проверь, что ~/.zprofile или ~/.bash_profile содержит PATH, затем выполни: source ~/.zprofile",
    },
    {
      title: "EADDRINUSE",
      content:
        "Порт уже занят. Останови gateway и запусти заново.",
      hint: "Команда: openclaw gateway stop",
    },
    {
      title: "sharp build errors (Mac)",
      content:
        "Иногда sharp конфликтует с глобальными библиотеками libvips. Переопредели флаг и повтори установку.",
      hint: "SHARP_IGNORE_GLOBAL_LIBVIPS=1",
    },
  ];

  return (
    <main className="min-h-screen bg-[#0D0D0D] text-zinc-200">
      <section className="border-b border-zinc-900">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <p className="text-[#FF4422] text-sm font-semibold mb-2">
            Блок 1 · Урок 1 из 4
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
            Урок 1 — Установка OpenClaw
          </h1>
          <p className="text-zinc-400 text-lg">
            Твой агент будет запущен через 15 минут
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <Image
          src="/course/block1/lesson1/b1-l1-hero.png"
          alt="Hero — Telegram + лобстер + Terminal"
          width={1280}
          height={720}
          className="w-full rounded-2xl object-cover mb-6"
        />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 space-y-8">
        <section className="bg-zinc-900 rounded-2xl p-6 md:p-8 border border-zinc-800">
          <h2 className="text-2xl font-semibold text-white mb-4">Вступление</h2>
          <p className="text-zinc-400 leading-relaxed">
            OpenClaw — это gateway между тобой и AI-агентами. Он запускается на
            твоём Mac, слушает сообщения из Telegram и выполняет задачи. Сейчас
            ты его установишь.
          </p>
        </section>

        <section className="bg-zinc-900 rounded-2xl p-6 md:p-8 border border-zinc-800">
          <h2 className="text-2xl font-semibold text-white mb-4">Установка по ОС</h2>
          <Image
            src="/course/block1/lesson1/b1-l1-os-switcher.png"
            alt="OS Switcher — выбор операционной системы"
            width={1280}
            height={720}
            className="w-full rounded-2xl object-cover mb-6"
          />
          <div className="flex flex-wrap gap-2 mb-6">
            {osTabs.map((tab) => {
              const isActive = activeOs === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveOs(tab.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold border transition-colors ${
                    isActive
                      ? "bg-[#FF4422] border-[#FF4422] text-white"
                      : "bg-zinc-950 border-zinc-800 text-zinc-400 hover:border-zinc-600"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {activeOs === "mac" && (
            <div className="space-y-6">
              <div>
                <h3 className="text-white font-semibold mb-2">
                  Шаг 1: Открыть Terminal
                </h3>
                <p className="text-zinc-400 mb-3">
                  → Finder → Applications → Utilities → Terminal
                  <br />
                  или Command+Space → &laquo;Terminal&raquo;
                </p>
              </div>

              <div>
                <h3 className="text-white font-semibold mb-2">
                  Шаг 2: Установить OpenClaw
                </h3>
                <CodeBlock code="curl -fsSL https://openclaw.ai/install.sh | bash" />
                <p className="text-zinc-400 mt-3">
                  💡 Скрипт сам установит Node 24 и настроит всё нужное
                </p>
              </div>

              <div>
                <h3 className="text-white font-semibold mb-2">
                  Шаг 3: Onboarding wizard
                </h3>
                <CodeBlock code="openclaw onboard --install-daemon" />
                <div className="mt-3 text-zinc-400">
                  <p className="mb-2">Wizard спросит:</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>API ключ (Anthropic / OpenAI)</li>
                    <li>Какой канал подключить (выбери Telegram)</li>
                    <li>Автозапуск daemon</li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="text-white font-semibold mb-2">
                  Шаг 4: Проверить установку
                </h3>
                <CodeBlock
                  code={`openclaw gateway status\nopenclaw doctor`}
                />
              </div>
            </div>
          )}

          {activeOs === "windows" && (
            <div className="space-y-6">
              <p className="text-zinc-400">
                Рекомендуется WSL2 (Windows Subsystem for Linux)
              </p>
              <div>
                <h3 className="text-white font-semibold mb-2">
                  Шаг 1: Установить WSL2
                </h3>
                <p className="text-zinc-400 mb-3">
                  В PowerShell от администратора: wsl --install
                  <br />
                  Перезагрузить компьютер
                </p>
              </div>
              <div>
                <h3 className="text-white font-semibold mb-2">
                  Шаг 2: Открыть Ubuntu (WSL2) и установить
                </h3>
                <CodeBlock code="curl -fsSL https://openclaw.ai/install.sh | bash" />
                <p className="text-zinc-400 mt-3">Или напрямую через PowerShell:</p>
                <CodeBlock code="iwr -useb https://openclaw.ai/install.ps1 | iex" language="powershell" />
              </div>
            </div>
          )}

          {activeOs === "linux" && (
            <div className="space-y-6">
              <CodeBlock
                code={`curl -fsSL https://openclaw.ai/install.sh | bash\nopenclaw onboard --install-daemon`}
              />
            </div>
          )}

          {activeOs === "vps" && (
            <div className="space-y-6">
              <p className="text-zinc-400">Чистая Ubuntu LTS:</p>
              <CodeBlock
                code={`curl -fsSL https://openclaw.ai/install.sh | bash\nopenclaw onboard --install-daemon`}
              />
              <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 text-zinc-400">
                <p className="text-white font-semibold mb-2">⚠️ Важно</p>
                <p>
                  Daemon установится как systemd user service (автозапуск).
                  Для доступа к dashboard с удалённой машины: SSH tunnel или
                  Tailscale
                </p>
              </div>
            </div>
          )}
        </section>

        <section className="bg-zinc-900 rounded-2xl p-6 md:p-8 border border-zinc-800">
          <h2 className="text-2xl font-semibold text-white mb-4">
            Проблемы и решения
          </h2>
          <Accordion items={accordionItems} />
        </section>

        <section className="bg-zinc-900 rounded-2xl p-6 md:p-8 border border-zinc-800">
          <h2 className="text-2xl font-semibold text-white mb-4">Первый запуск</h2>
          <CodeBlock
            code={`openclaw gateway status    # проверить\nopenclaw dashboard         # открыть UI → http://127.0.0.1:18789/`}
          />
          <div className="mt-6">
            <Image
              src="https://mintcdn.com/clawdhub/U8jr7qEbUc9OU9YR/assets/install-script.svg"
              alt="OpenClaw dashboard URL"
              width={1200}
              height={675}
              className="rounded-xl w-full border border-zinc-800"
              unoptimized
            />
          </div>
        </section>

        <section className="bg-zinc-900 rounded-2xl p-6 md:p-8 border border-zinc-800">
          <h2 className="text-2xl font-semibold text-white mb-4">✅ Чекпоинт</h2>
          <Image
            src="/course/block1/lesson1/b1-l1-checkpoint.png"
            alt="Чекпоинт — проверка установки"
            width={1280}
            height={720}
            className="w-full rounded-2xl object-cover mb-6"
          />
          <div className="space-y-3">
            {[
              "OpenClaw установлен (curl команда выполнена)",
              "Onboarding wizard пройден",
              "openclaw gateway status → Runtime: running",
              "openclaw doctor → нет ошибок",
              "openclaw dashboard → страница открылась",
            ].map((label, idx) => (
              <label
                key={label}
                className="flex items-center gap-3 bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-3 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={checks[idx]}
                  onChange={() =>
                    setChecks((prev) =>
                      prev.map((v, i) => (i === idx ? !v : v))
                    )
                  }
                  className="h-4 w-4 accent-[#FF4422]"
                />
                <span className="text-zinc-300">{label}</span>
              </label>
            ))}
          </div>
          {allChecked && (
            <div className="mt-6">
              <button
                onClick={() => router.push("/dashboard/course/block/1/lesson/2")}
                className="px-6 py-3 bg-[#FF4422] hover:bg-[#e63d1e] text-white font-semibold rounded-lg transition-colors"
              >
                Урок завершён →
              </button>
            </div>
          )}
        </section>

        <nav className="flex items-center justify-between text-sm text-zinc-400">
          <Link
            href="/dashboard/course/block/1"
            className="hover:text-zinc-200 transition-colors"
          >
            ← Назад к Блоку 1
          </Link>
          {allChecked ? (
            <button
              onClick={() => router.push("/dashboard/course/block/1/lesson/2")}
              className="text-[#FF4422] hover:text-[#ff5a3c] transition-colors"
            >
              Следующий урок →
            </button>
          ) : (
            <span className="text-zinc-600">Следующий урок →</span>
          )}
        </nav>
      </div>
    </main>
  );
}
