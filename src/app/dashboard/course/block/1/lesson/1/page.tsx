"use client";

import { useState, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

const osTabs = [
  {
    id: "mac",
    label: "Mac",
    icon: (): ReactNode => (
      <svg viewBox="0 0 814 1000" className="w-4 h-4" fill="currentColor">
        <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76 0-103.7 40.8-165.9 40.8s-105-57.8-155.5-127.4C46 790.7 0 663 0 541.8c0-207.5 135.4-317.3 269-317.3 70.1 0 128.4 46.4 172.5 46.4 43.4 0 112.7-49.4 191.3-49.4zm-174-181.7c31.1-36.9 53.1-88.1 53.1-139.3 0-7.1-.6-14.3-1.9-20.1-50.6 1.9-110.8 33.7-147.1 75.8-28.5 32.4-55.1 83.6-55.1 135.5 0 7.8 1.3 15.6 1.9 18.1 3.2.6 8.4 1.3 13.6 1.3 45.4 0 102.5-30.4 135.5-71.3z" />
      </svg>
    ),
  },
  {
    id: "windows",
    label: "Windows",
    icon: (): ReactNode => (
      <svg viewBox="0 0 88 88" className="w-4 h-4" fill="currentColor">
        <path d="M0 12.402l35.687-4.86.016 34.423-35.67.203zm35.67 33.529l.028 34.453L.028 75.48.026 45.7zm4.326-39.025L87.314 0v41.527l-47.318.376zm47.329 39.349l-.011 41.34-47.318-6.678-.066-34.739z" />
      </svg>
    ),
  },
  {
    id: "linux",
    label: "Linux",
    icon: (): ReactNode => (
      <svg viewBox="0 0 448 512" className="w-4 h-4" fill="currentColor">
        <path d="M220.8 123.3c1 .5 1.8 1.7 3 1.7 1.1 0 2.8-.4 2.9-1.5.2-1.4-1.9-2.3-3.2-2.9-1.7-.7-3.9-1-5.5-.1-.4.2-.8.7-.6 1.1.3 1.3 2.3 1.1 3.4 1.7zm-21.9 1.7c1.2 0 2-1.2 3-1.7 1.1-.6 3.1-.4 3.5-1.6.2-.4-.2-.9-.6-1.1-1.6-.9-3.8-.6-5.5.1-1.3.6-3.4 1.5-3.2 2.9.1 1 1.8 1.5 2.8 1.4zM420 403.8c-3.6-4-5.3-11.6-7.2-19.7-1.8-8.1-3.9-16.8-10.5-22.4-1.3-1.1-2.6-2.1-4-2.9-1.3-.8-2.7-1.5-4.1-2 9.2-27.3 5.6-54.5-3.7-79.1-11.4-30.1-31.3-56.4-46.5-74.4-17.1-21.5-33.7-41.9-33.4-72C311.1 85.4 315.7.1 234.8 0 132.4-.2 158 103.4 156.9 135.2c-1.7 23.4-6.4 43.8-22.5 64.6-12.7 16.5-30.5 36.4-41.8 61-13.4 29.8-24.9 59.6-24.1 92.2.8 7.1-2.8 12.1-8.2 16.3-5.5 4.3-11.7 7.5-18.3 9.8-7.7 2.7-16.9 4.6-23 8.9-8.8 6.2-15.4 15.5-14.6 26.5.8 10.2 8.1 17.9 15.9 22.8 14.3 9.1 33.9 10.1 49.9 16.3 16.5 6.4 27.5 19.2 27.2 37.4-.2 9.4-.8 19.1 5.6 27 7.2 9 19.4 13.3 30.3 11.3 9.8-1.9 16.6-8.4 24.6-12.8 8.2-4.4 16.7-9.2 26.3-9.6 23.3-1.2 49.6 8 72.2 8 27.7.1 37.2-12.6 38.8-33.9.4-5.7-.1-11.7-2.3-17.3-3-7.7-8.3-15-12.5-22.1-4.3-7.2-7.1-16.4-4.3-24.6 2.5-7.4 10.4-13.5 15.8-18.6 5.3-5.1 12.1-11.7 12.7-19 .6-7.5-4-15.2-9-19.2-3.5-2.7-7.3-4.6-11.3-6.3-3.9-1.8-7.6-4-11.3-6.5 12.8-15.1 14.7-34.1 14.7-34.1s14.2 31.4 6.3 50.2c4.5 2.2 9.3 4 14.5 4.3 1.8.1 3.6.2 5.5.1 7-.5 14-3.6 18.6-8.9 11.7-13.3 10.9-33.5 6-49.2zm-281.4 59.7c-.9 3.1-2.8 6-5.1 8.5-2.3 2.5-5.1 4.6-8.3 6.2-3.2 1.5-6.8 2.4-10.4 2.1-3.4-.3-6.4-1.6-9.3-3.1-5.8-3.1-11.3-7.6-15.9-12.7-4.6-5.1-8.4-10.7-10.9-16.7-1.3-3-2.2-6.1-2.5-9.2-.3-3.1 0-6.4 1.6-9.1 1.5-2.6 4.2-4.3 7-4.9 2.8-.6 5.8-.1 8.6 1.2 5.4 2.5 9.5 7.2 12.6 12.4 3.1 5.2 5.2 11 7.6 16.5 2.4 5.5 5.5 11 10.5 14.3 1.9 1.2 4.1 2.1 5.8 1.4 1-.4 1.6-1.4 1.4-2.3-.2-.9-.9-1.6-1.6-2.2-2.8-2.4-5.4-5.1-7.1-8.4-.9-1.7-1.5-3.5-1.5-5.4s.8-3.8 2.3-5c1.5-1.2 3.6-1.6 5.5-1.2 1.9.4 3.6 1.5 5 2.9 2.8 2.8 4.4 6.6 5.3 10.5.8 3.7.8 7.6-.1 11.3z" />
      </svg>
    ),
  },
  {
    id: "vps",
    label: "VPS",
    icon: (): ReactNode => (
      <svg viewBox="0 0 640 512" className="w-4 h-4" fill="currentColor">
        <path d="M176 256c44.11 0 80-35.89 80-80s-35.89-80-80-80-80 35.89-80 80 35.89 80 80 80zm352-128H304c-8.84 0-16 7.16-16 16v144H64V120c0-13.25-10.75-24-24-24H24C10.75 96 0 106.75 0 120v272c0 13.25 10.75 24 24 24h16c13.25 0 24-10.75 24-24v-48h512v48c0 13.25 10.75 24 24 24h16c13.25 0 24-10.75 24-24V240c0-61.86-50.14-112-112-112z" />
      </svg>
    ),
  },
] as const;

type OsId = (typeof osTabs)[number]["id"];

const osIssues: Record<OsId, AccordionItem[]> = {
  mac: [
    {
      title: 'openclaw: command not found после установки',
      content: 'Скрипт установил бинарник в ~/.local/bin, но эта директория не в PATH текущей сессии.',
      hint: 'echo \'export PATH="$HOME/.local/bin:$PATH"\' >> ~/.zshrc && source ~/.zshrc',
    },
    {
      title: 'PATH не работает: zsh не читает ~/.bashrc',
      content: 'На macOS Catalina+ дефолтный шелл — zsh. Скрипты часто добавляют PATH в ~/.bashrc, который zsh не читает.',
      hint: 'echo \'export PATH="$HOME/.local/bin:$PATH"\' >> ~/.zshrc && source ~/.zshrc',
    },
    {
      title: 'Permission denied при npm install -g',
      content: 'npm пытается писать в /usr/local/lib/node_modules, принадлежащий root. Используй nvm — он устанавливает Node в домашнюю папку.',
      hint: 'curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash && source ~/.zshrc && nvm install --lts',
    },
    {
      title: 'sharp / libvips ошибка на Apple Silicon (M1/M2/M3)',
      content: 'sharp требует нативные бинарники для arm64. Возникает если Node установлен под Rosetta (x64 режим).',
      hint: 'SHARP_IGNORE_GLOBAL_LIBVIPS=1 npm rebuild sharp\n# Убедись что Node нативный: node -e "console.log(process.arch)" → arm64',
    },
    {
      title: 'Xcode Command Line Tools не установлены',
      content: 'npm использует node-gyp для нативных модулей — ему нужен C++ компилятор из Xcode CLT.',
      hint: 'xcode-select --install',
    },
    {
      title: 'Node запущен под Rosetta вместо arm64',
      content: 'Terminal.app запущен в режиме Rosetta — Node работает как x64, что вызывает конфликты нативных модулей.',
      hint: 'Finder → Applications → Utilities → Terminal.app → Cmd+I → убрать «Open using Rosetta»',
    },
  ],
  windows: [
    {
      title: 'WSL2 не установлен или Windows слишком старый',
      content: 'WSL2 требует Windows 10 Build 18362+ или Windows 11. На старых сборках wsl --install не работает.',
      hint: 'winver → проверить Build. Если < 18362 → Settings → Windows Update → обновить.',
    },
    {
      title: 'curl не работает в PowerShell',
      content: 'В PowerShell curl — это алиас для Invoke-WebRequest с другим синтаксисом. Стандартные install-скрипты ломаются.',
      hint: '# Используй curl.exe вместо curl:\ncurl.exe -fsSL https://openclaw.ai/install.sh -o install.sh\n# Или запускай команды внутри WSL: wsl → затем обычный curl',
    },
    {
      title: 'node: not found после установки nvm в WSL',
      content: 'nvm инициализируется только если ~/.bashrc загружен. В новой сессии WSL он может не активироваться.',
      hint: 'echo \'export NVM_DIR="$HOME/.nvm"\n[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"\' >> ~/.bashrc && source ~/.bashrc',
    },
    {
      title: 'Порты WSL не видны в Windows браузере',
      content: 'WSL2 — отдельная VM. localhost:18789 в Windows и WSL — разные адреса на старых версиях Windows.',
      hint: '# Windows 11 22H2+: добавь в %USERPROFILE%/.wslconfig:\n[wsl2]\nnetworkingMode=mirrored\n# Или узнай IP: wsl hostname -I → открывай http://<IP>:18789',
    },
    {
      title: 'Permission denied в /mnt/c/ (Windows файлы)',
      content: 'NTFS файлы в /mnt/c/ монтируются с фиксированными правами — npm не может создавать симлинки.',
      hint: '# Всегда работай в нативной WSL файловой системе:\ncd ~ && mkdir projects && cd projects\n# НЕ запускай npm install в /mnt/c/',
    },
    {
      title: 'PATH не синхронизирован между Windows и WSL',
      content: 'Программы установленные в WSL не видны из Windows CMD/PowerShell и наоборот.',
      hint: '# Запуск WSL команд из Windows:\nwsl openclaw gateway status\n# Или добавь в /etc/wsl.conf:\n[interop]\nappendWindowsPath = true',
    },
  ],
  linux: [
    {
      title: 'Системный Node.js слишком старый (v14/v16 из apt)',
      content: 'apt устанавливает устаревший Node из стандартных репозиториев. OpenClaw требует Node ≥ 22.',
      hint: 'curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -\nsudo apt-get install -y nodejs',
    },
    {
      title: 'nvm не активируется после установки',
      content: 'Скрипт nvm добавляет инициализацию в ~/.bashrc, но текущая сессия её не перечитывает.',
      hint: 'source ~/.bashrc\n# Проверить: grep NVM_DIR ~/.bashrc',
    },
    {
      title: 'Permission denied: /usr/local/lib/node_modules',
      content: 'Системный Node установлен с правами root — npm не может писать в глобальную директорию.',
      hint: 'mkdir ~/.npm-global\nnpm config set prefix \'~/.npm-global\'\necho \'export PATH="$HOME/.npm-global/bin:$PATH"\' >> ~/.bashrc && source ~/.bashrc',
    },
    {
      title: 'systemd user service не работает',
      content: 'systemctl --user сервисы падают при выходе из SSH сессии без loginctl enable-linger.',
      hint: 'loginctl enable-linger $USER\nsystemctl --user daemon-reload\nsystemctl --user enable openclaw && systemctl --user start openclaw',
    },
    {
      title: 'Firewall (ufw) блокирует порт 18789',
      content: 'UFW по умолчанию закрывает все порты кроме SSH — openclaw gateway недоступен снаружи.',
      hint: 'sudo ufw allow 18789/tcp\nsudo ufw reload\nss -tlnp | grep 18789',
    },
    {
      title: 'curl SSL certificate errors',
      content: 'Устаревшие ca-certificates или неправильное время системы вызывают SSL ошибки при загрузке скриптов.',
      hint: 'sudo apt-get install -y ca-certificates && sudo update-ca-certificates\n# Проверить время: timedatectl\nsudo timedatectl set-ntp true',
    },
  ],
  vps: [
    {
      title: 'root vs non-root: npm global install ломает права',
      content: 'npm install -g под root устанавливает с правами root — потом ломает запуск от обычного пользователя.',
      hint: 'adduser deploy && usermod -aG sudo deploy && su - deploy\n# Установить Node через nvm под новым пользователем\n# Если нужен root: npm install -g --unsafe-perm openclaw',
    },
    {
      title: 'UFW блокирует порт 18789',
      content: 'На Ubuntu VPS UFW включён по умолчанию и блокирует все порты кроме SSH.',
      hint: 'sudo ufw allow 18789/tcp comment \'openclaw gateway\'\nsudo ufw reload && sudo ufw status',
    },
    {
      title: 'SSH tunnel не работает (GatewayPorts)',
      content: 'sshd по умолчанию запрещает GatewayPorts — tunnel создаётся но порт недоступен снаружи.',
      hint: '# В /etc/ssh/sshd_config добавить:\nGatewayPorts yes\nAllowTcpForwarding yes\nsudo systemctl restart sshd',
    },
    {
      title: 'systemd --user останавливается при выходе из SSH',
      content: 'User systemd сервисы живут только пока активна SSH сессия — без loginctl linger они падают при выходе.',
      hint: 'sudo loginctl enable-linger $USER\n# Проверить: loginctl show-user $USER | grep Linger → Linger=yes',
    },
    {
      title: 'Недостаточно RAM: Node падает при install (OOM)',
      content: 'На VPS с 512MB–1GB RAM Linux OOM Killer убивает npm install. Нужен swap.',
      hint: 'sudo fallocate -l 2G /swapfile\nsudo chmod 600 /swapfile && sudo mkswap /swapfile && sudo swapon /swapfile\necho \'/swapfile none swap sw 0 0\' | sudo tee -a /etc/fstab',
    },
    {
      title: 'VPS провайдер блокирует npm registry (ETIMEDOUT)',
      content: 'Некоторые VPS (Oracle Free Tier, дешёвые хостинги) блокируют исходящие соединения на 443.',
      hint: 'curl -v https://registry.npmjs.org\n# Если блокирует — используй зеркало:\nnpm install -g openclaw --registry https://registry.npmmirror.com',
    },
    {
      title: 'Telegram API недоступен (IP блокировка)',
      content: 'На VPS в некоторых странах api.telegram.org заблокирован — webhook не доходит, bot API зависает.',
      hint: 'curl -v https://api.telegram.org/bot<TOKEN>/getMe\n# Если не работает — смени VPS на EU/US (Hetzner, DigitalOcean, Vultr)\n# Или используй polling вместо webhook в конфиге openclaw',
    },
  ],
};

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
  const [searchQuery, setSearchQuery] = useState('');
  const [checks, setChecks] = useState([false, false, false, false, false]);

  const allChecked = checks.every(Boolean);

  const osLabels: Record<OsId, string> = { mac: 'Mac', windows: 'Windows', linux: 'Linux', vps: 'VPS' };

  const filteredIssues = searchQuery.trim()
    ? (Object.entries(osIssues) as [OsId, AccordionItem[]][]).flatMap(([osId, items]) =>
        items
          .filter(item =>
            [item.title, item.content, item.hint ?? ''].some(text =>
              text.toLowerCase().includes(searchQuery.toLowerCase())
            )
          )
          .map(item => ({ ...item, title: item.title + '  [' + osLabels[osId] + ']' }))
      )
    : osIssues[activeOs];


  return (
    <main className="min-h-screen bg-[#0D0D0D] text-zinc-200">
      <section className="border-b border-zinc-900">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <p className="text-[#FF4422] text-sm font-semibold mb-2">
            Блок 1 · Урок 1 из 4
          </p>
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <h1 className="text-3xl md:text-4xl font-bold text-white">Урок 1 — Установка OpenClaw</h1>
            <span className="inline-flex items-center gap-1 text-xs text-zinc-400 border border-zinc-700 rounded-full px-2.5 py-1">⏱ 15 минут</span>
          </div>
          <p className="text-zinc-400 text-lg">
            Твой агент будет запущен через 15 минут
          </p>
        </div>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="w-full bg-zinc-800 h-1 rounded-full mt-2">
            <div className="bg-[#FF4422] h-1 rounded-full" style={{ width: "25%" }} />
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 flex gap-8">
        <aside className="hidden md:block w-56 shrink-0">
          <div className="sticky top-6 bg-zinc-900 border border-zinc-800 rounded-xl p-4">
            <Link href="/dashboard" className="flex items-center gap-1.5 text-xs text-zinc-500 hover:text-white transition-colors mb-3">
              ← Дашборд
            </Link>
            <div className="grid grid-cols-3 gap-1 mb-3">
              <Link href="/dashboard/course/block/0/lesson/1" title="Блок 0: Что такое ИИ-агент" className="text-center text-xs py-1.5 rounded-lg border border-zinc-700 text-zinc-400 hover:text-white hover:border-zinc-500 transition-colors">0</Link>
              <Link href="/dashboard/course/block/1/lesson/1" title="Блок 1: Установка и первый агент" className="text-center text-xs py-1.5 rounded-lg border border-[#FF4422] text-[#FF4422]">1</Link>
              <Link href="/dashboard/course/block/2/lesson/1" title="Блок 2: Первые реальные кейсы" className="text-center text-xs py-1.5 rounded-lg border border-zinc-700 text-zinc-400 hover:text-white hover:border-zinc-500 transition-colors">2</Link>
              <Link href="/dashboard/course/block/3/lesson/1" title="Блок 3: Мультиагент и автоматизация" className="text-center text-xs py-1.5 rounded-lg border border-zinc-700 text-zinc-400 hover:text-white hover:border-zinc-500 transition-colors">3</Link>
              <Link href="/dashboard/course/block/4/lesson/1" title="Блок 4: Продай своего агента" className="text-center text-xs py-1.5 rounded-lg border border-zinc-700 text-zinc-400 hover:text-white hover:border-zinc-500 transition-colors">4</Link>
              <Link href="/dashboard/course/block/5/lesson/1" title="Блок 5: Агентский бизнес" className="text-center text-xs py-1.5 rounded-lg border border-zinc-700 text-zinc-400 hover:text-white hover:border-zinc-500 transition-colors">5</Link>
            </div>
            <p className="text-xs text-zinc-500 font-semibold uppercase mb-3">Блок 1</p>
            <nav className="flex flex-col gap-1">
              {[
                { num: 1, title: 'Установка OpenClaw', href: '/dashboard/course/block/1/lesson/1' },
                { num: 2, title: 'Первый Telegram-агент', href: '/dashboard/course/block/1/lesson/2' },
                { num: 3, title: 'Подключения и Skills', href: '/dashboard/course/block/1/lesson/3' },
                { num: 4, title: 'Первая автоматизация', href: '/dashboard/course/block/1/lesson/4' },
              ].map(l => (
                <Link key={l.num} href={l.href}
                  className={'flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ' +
                    (1 === l.num
                      ? 'bg-[#FF4422]/10 text-[#FF4422] font-semibold'
                      : 'text-zinc-400 hover:text-white hover:bg-zinc-800')}>
                  <span className={'w-5 h-5 rounded-full border flex items-center justify-center text-xs shrink-0 ' +
                    (1 === l.num ? 'border-[#FF4422]' : 'border-zinc-600')}>
                    {l.num}
                  </span>
                  {l.title}
                </Link>
              ))}
            </nav>
          </div>
        </aside>
        <div className="flex-1 min-w-0 flex flex-col gap-8">
        <div className="relative w-full rounded-2xl overflow-hidden" style={{ aspectRatio: '2752/1536' }}>
          <Image
            src="/course/block1/lesson1/b1-l1-os-switcher.png"
            alt="Установка OpenClaw"
            fill
            className="object-contain"
            priority
          />
        </div>
        <section className="bg-zinc-900 rounded-2xl p-6 md:p-8 border border-zinc-800">
          <p className="text-zinc-400 leading-relaxed mb-6">
            OpenClaw — это gateway между тобой и AI-агентами. Он запускается на
            твоём компьютере или сервере, слушает сообщения из Telegram и
            выполняет задачи. Выбери свою ОС ниже и следуй шагам.
          </p>

          {/* Что ты устанавливаешь */}
          <h2 className="text-xl font-semibold text-white mb-4">Что ты сейчас установишь</h2>
          <p className="text-zinc-400 leading-relaxed mb-4">OpenClaw состоит из трёх частей:</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {[
              { icon: "🧠", title: "Gateway", desc: "Мозг системы. Запускается в фоне, принимает сообщения из Telegram/WhatsApp, передаёт агенту, возвращает ответ." },
              { icon: "📁", title: "Workspace", desc: "Папка с твоей памятью. Все настройки агента хранятся здесь в обычных текстовых файлах. Можно открыть в любом редакторе." },
              { icon: "🔗", title: "CLI (openclaw)", desc: "Команды в терминале. Через них ты запускаешь, останавливаешь и настраиваешь систему." },
            ].map((item) => (
              <div key={item.title} className="bg-zinc-800 rounded-xl p-4 border border-zinc-700">
                <div className="text-2xl mb-2">{item.icon}</div>
                <div className="text-white font-semibold mb-1">{item.title}</div>
                <div className="text-zinc-400 text-sm leading-relaxed">{item.desc}</div>
              </div>
            ))}
          </div>
          <p className="text-zinc-400 text-sm mb-6">Установочный скрипт создаёт всё три за один шаг. После установки ты запустишь своего первого агента за 5 минут.</p>

          {/* Дисклеймер */}
          <div className="bg-amber-950/40 border border-amber-700/50 rounded-xl p-5">
            <div className="flex items-start gap-3">
              <span className="text-amber-400 text-xl shrink-0">⚠️</span>
              <div>
                <p className="text-amber-300 font-semibold mb-2">Прочитай перед установкой</p>
                <ul className="text-amber-200/80 text-sm leading-relaxed space-y-2">
                  <li>• <strong>Ответственность.</strong> Устанавливая OpenClaw, ты берёшь на себя полную ответственность за программное обеспечение на своём устройстве. Авторы курса не несут ответственности за последствия установки или использования.</li>
                  <li>• <strong>Доступ к файлам.</strong> OpenClaw — локальная программа с доступом к файловой системе твоего компьютера. Агент сможет читать и записывать файлы в рамках настроенных прав.</li>
                  <li>• <strong>Сохрани важные данные.</strong> Перед установкой сделай бэкап важных файлов или используй чистую машину / отдельный аккаунт. Это стандартная практика при установке любого нового ПО.</li>
                  <li>• <strong>Open source.</strong> Код OpenClaw открыт — ты можешь проверить его на GitHub перед установкой.</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-zinc-900 rounded-2xl p-6 md:p-8 border border-zinc-800">
          <h2 className="text-2xl font-semibold text-white mb-4">Установка по ОС</h2>
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
                  <span className="flex items-center gap-1.5">
                    {tab.icon()}
                    {tab.label}
                  </span>
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
              <div>
                <h3 className="text-white font-semibold mb-2">
                  Шаг 1: Включить WSL2
                </h3>
                <p className="text-zinc-400 mb-3">
                  Windows Subsystem for Linux — это встроенный Linux прямо в
                  Windows. Запусти PowerShell от администратора (Win+X →
                  Windows PowerShell (Admin)):
                </p>
                <CodeBlock code="wsl --install" />
                <p className="text-zinc-400 mt-3">
                  Перезагрузи компьютер после установки.
                </p>
              </div>

              <div>
                <h3 className="text-white font-semibold mb-2">
                  Шаг 2: Открыть Ubuntu
                </h3>
                <p className="text-zinc-400">
                  После перезагрузки открой Ubuntu из меню Пуск. При первом
                  запуске создай логин и пароль.
                </p>
              </div>

              <div>
                <h3 className="text-white font-semibold mb-2">
                  Шаг 3: Установить OpenClaw
                </h3>
                <p className="text-zinc-400 mb-3">
                  В терминале Ubuntu выполни:
                </p>
                <CodeBlock code="curl -fsSL https://openclaw.ai/install.sh | bash" />
                <p className="text-zinc-400 mt-3">
                  💡 Скрипт сам установит Node 24 и настроит всё нужное
                </p>
              </div>

              <div>
                <h3 className="text-white font-semibold mb-2">
                  Шаг 4: Onboarding wizard
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
                  Шаг 5: Проверить установку
                </h3>
                <CodeBlock
                  code={`openclaw gateway status\nopenclaw doctor`}
                />
              </div>
            </div>
          )}

          {activeOs === "linux" && (
            <div className="space-y-6">
              <div>
                <h3 className="text-white font-semibold mb-2">
                  Шаг 1: Открыть Terminal
                </h3>
                <p className="text-zinc-400">
                  В большинстве дистрибутивов: Ctrl+Alt+T или найди Terminal
                  в меню приложений.
                </p>
              </div>

              <div>
                <h3 className="text-white font-semibold mb-2">
                  Шаг 2: Установить Node.js 24 (если нет)
                </h3>
                <p className="text-zinc-400 mb-3">
                  OpenClaw требует Node.js ≥ 22. Проверь версию:
                </p>
                <CodeBlock code="node --version" />
                <p className="text-zinc-400 mt-3 mb-3">
                  Если версия ниже 22 или node не найден — установи через nvm:
                </p>
                <CodeBlock
                  code={`curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash\nsource ~/.bashrc\nnvm install 24\nnvm use 24`}
                />
              </div>

              <div>
                <h3 className="text-white font-semibold mb-2">
                  Шаг 3: Установить OpenClaw
                </h3>
                <CodeBlock code="curl -fsSL https://openclaw.ai/install.sh | bash" />
              </div>

              <div>
                <h3 className="text-white font-semibold mb-2">
                  Шаг 4: Onboarding wizard
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
                  Шаг 5: Проверить установку
                </h3>
                <CodeBlock
                  code={`openclaw gateway status\nopenclaw doctor`}
                />
              </div>
            </div>
          )}

          {activeOs === "vps" && (
            <div className="space-y-6">
              <div>
                <h3 className="text-white font-semibold mb-2">
                  Шаг 1: Арендовать VPS
                </h3>
                <p className="text-zinc-400 mb-2">
                  Нужен сервер с Ubuntu 22.04 LTS. Рекомендуем:
                </p>
                <ul className="list-disc list-inside text-zinc-400 space-y-1 mb-2">
                  <li>Hetzner (hetzner.com) — от €4/мес, быстро, надёжно</li>
                  <li>DigitalOcean (digitalocean.com) — от $6/мес, удобный интерфейс</li>
                  <li>Contabo (contabo.com) — от €5/мес, много RAM</li>
                </ul>
                <p className="text-zinc-400">
                  Минимальные требования: 1 CPU, 1GB RAM, Ubuntu 22.04
                </p>
              </div>

              <div>
                <h3 className="text-white font-semibold mb-2">
                  Шаг 2: Подключиться по SSH
                </h3>
                <p className="text-zinc-400 mb-3">
                  После создания сервера тебе придёт IP адрес. Подключись:
                </p>
                <CodeBlock code="ssh root@YOUR_SERVER_IP" />
                <p className="text-zinc-400 mt-3">
                  Замени YOUR_SERVER_IP на реальный IP из панели хостинга.
                </p>
              </div>

              <div>
                <h3 className="text-white font-semibold mb-2">
                  Шаг 3: Обновить систему
                </h3>
                <CodeBlock code="apt update && apt upgrade -y" />
              </div>

              <div>
                <h3 className="text-white font-semibold mb-2">
                  Шаг 4: Установить OpenClaw
                </h3>
                <CodeBlock code="curl -fsSL https://openclaw.ai/install.sh | bash" />
              </div>

              <div>
                <h3 className="text-white font-semibold mb-2">
                  Шаг 5: Onboarding wizard
                </h3>
                <CodeBlock code="openclaw onboard --install-daemon" />
                <div className="mt-3 text-zinc-400">
                  <p className="mb-2">Wizard спросит:</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>API ключ (Anthropic / OpenAI)</li>
                    <li>Какой канал подключить (выбери Telegram)</li>
                    <li>Автозапуск daemon (установится как systemd user service)</li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="text-white font-semibold mb-2">
                  Шаг 6: Проверить и держать запущенным
                </h3>
                <CodeBlock
                  code={`openclaw gateway status\nopenclaw doctor`}
                />
                <p className="text-zinc-400 mt-3">
                  💡 На VPS daemon запускается автоматически при перезагрузке
                  сервера — тебе ничего не нужно делать вручную.
                </p>
              </div>

              <div>
                <h3 className="text-white font-semibold mb-2">
                  Шаг 7: Доступ к dashboard с удалённой машины
                </h3>
                <p className="text-zinc-400 mb-3">
                  Dashboard работает на порту 18789. Чтобы открыть с ноутбука —
                  используй SSH tunnel:
                </p>
                <CodeBlock code="ssh -L 18789:localhost:18789 root@YOUR_SERVER_IP" />
                <p className="text-zinc-400 mt-3">
                  После этого открывай http://localhost:18789 в браузере на
                  своём компьютере.
                </p>
              </div>
            </div>
          )}
        </section>

        <section className="bg-zinc-900 rounded-2xl p-6 md:p-8 border border-zinc-800">
          <h2 className="text-2xl font-semibold text-white mb-4">
            {searchQuery.trim()
              ? `Найдено: ${filteredIssues.length}`
              : `Проблемы и решения — ${osTabs.find(t => t.id === activeOs)?.label}`}
          </h2>
          <div className='relative mb-4'>
            <input
              type='text'
              placeholder='Найти проблему... (например: command not found, permission denied)'
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className='w-full bg-zinc-950 border border-zinc-700 rounded-xl px-4 py-3 pl-10 text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-[#FF4422] transition-colors text-sm'
            />
            <svg className='absolute left-3 top-3.5 w-4 h-4 text-zinc-500' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' />
            </svg>
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className='absolute right-3 top-3 text-zinc-500 hover:text-zinc-300'>✕</button>
            )}
          </div>
          <div className="overflow-y-auto max-h-72">
            <Accordion items={filteredIssues} />
          </div>
        </section>

        <section className="bg-zinc-900 rounded-2xl p-6 md:p-8 border border-zinc-800">
          <h2 className="text-2xl font-semibold text-white mb-4">Первый запуск</h2>
          <CodeBlock
            code={`openclaw gateway status    # проверить\nopenclaw dashboard         # открыть UI → http://127.0.0.1:18789/`}
          />
          <Image
            src="/course/block1/lesson1/b1-l1-dashboard.png"
            alt="OpenClaw Gateway Dashboard"
            width={1280}
            height={720}
            className="w-full rounded-2xl object-cover mt-6"
          />
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
                  className="h-4 w-4 accent-green-500"
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
      </div>
    </main>
  );
}
