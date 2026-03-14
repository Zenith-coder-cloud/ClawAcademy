"use client";

import { useEffect, useState } from "react";

export type TrackId = "freelancer" | "business" | "content" | "money" | "all";

type TrackMeta = {
  id: TrackId;
  label: string;
  color: string;
};

export const TRACKS: Record<TrackId, TrackMeta> = {
  freelancer: {
    id: "freelancer",
    label: "\uD83E\uDDD1\u200D\uD83D\uDCBC \u0424\u0440\u0438\u043B\u0430\u043D\u0441\u0435\u0440",
    color: "#3B82F6",
  },
  business: {
    id: "business",
    label: "\uD83C\uDFE2 \u0411\u0438\u0437\u043D\u0435\u0441",
    color: "#10B981",
  },
  content: {
    id: "content",
    label: "\uD83D\uDCE2 \u041A\u043E\u043D\u0442\u0435\u043D\u0442",
    color: "#8B5CF6",
  },
  money: {
    id: "money",
    label: "\uD83D\uDCB0 \u0417\u0430\u0440\u0430\u0431\u043E\u0442\u043E\u043A",
    color: "#F59E0B",
  },
  all: {
    id: "all",
    label: "\u0412\u0441\u0435 \u0442\u0440\u0435\u043A\u0438",
    color: "#FF4422",
  },
};

const ACCENT = "#FF4422";

export function TimerBadge({ text }: { text: string }) {
  return (
    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300 text-xs font-semibold">
      {text}
    </span>
  );
}

export function TrackBadge({ track }: { track: TrackId }) {
  const meta = TRACKS[track];
  if (!meta) return null;
  const color = track === "all" ? ACCENT : meta.color;
  return (
    <span
      className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold border"
      style={{ color, borderColor: color, backgroundColor: `${color}1A` }}
    >
      {meta.label}
    </span>
  );
}

export function LessonSteps({ steps }: { steps: string[] }) {
  return (
    <div className="flex flex-col gap-3">
      {steps.map((step, idx) => (
        <div
          key={step}
          className="flex items-start gap-3 bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3"
        >
          <div className="w-7 h-7 rounded-full border border-[#FF4422] text-[#FF4422] flex items-center justify-center text-xs font-semibold shrink-0">
            {idx + 1}
          </div>
          <p className="text-zinc-300">{step}</p>
        </div>
      ))}
    </div>
  );
}

export function PromptCopyBlock({
  code,
  instruction,
}: {
  code: string;
  instruction?: string;
}) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  if (!code) return null;

  return (
    <div className="space-y-3">
      {instruction && (
        <p className="text-zinc-400 leading-relaxed">{instruction}</p>
      )}
      <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 relative">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs text-zinc-500 font-medium">prompts</span>
          <button
            onClick={handleCopy}
            className="text-sm px-4 py-2 rounded-lg border border-[#FF4422] text-white bg-[#FF4422] hover:bg-[#e63d1e] transition-colors"
            aria-label="\u0421\u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u043F\u0440\u043E\u043C\u043F\u0442"
          >
            {copied ? "\u041F\u0440\u043E\u043C\u043F\u0442 \u0441\u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u043D \u2713" : "\u0421\u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u043F\u0440\u043E\u043C\u043F\u0442"}
          </button>
        </div>
        <pre className="text-sm text-zinc-200 font-mono whitespace-pre-wrap">
          {code}
        </pre>
      </div>
    </div>
  );
}

export function Checklist({
  items,
  storageKey,
}: {
  items: string[];
  storageKey: string;
}) {
  const [checks, setChecks] = useState<boolean[]>(() => items.map(() => false));

  useEffect(() => {
    const raw = localStorage.getItem(storageKey);
    if (!raw) return;
    try {
      const parsed = JSON.parse(raw) as boolean[];
      if (Array.isArray(parsed) && parsed.length === items.length) {
        setChecks(parsed.map(Boolean));
      }
    } catch {
      return;
    }
  }, [items.length, storageKey]);

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(checks));
  }, [checks, storageKey]);

  const allChecked = checks.every(Boolean);

  return (
    <div>
      <div className="space-y-3">
        {items.map((label, idx) => (
          <label
            key={label}
            className="flex items-center gap-3 bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-3 cursor-pointer"
          >
            <input
              type="checkbox"
              checked={checks[idx] ?? false}
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
        <div className="mt-6 bg-green-500/10 border border-green-500/30 rounded-xl px-5 py-4 text-green-300 font-semibold animate-pulse">
          \u0423\u0440\u043E\u043A \u0437\u0430\u0432\u0435\u0440\u0448\u0451\u043D \u2705
        </div>
      )}
    </div>
  );
}

export function BlockCompleteCard({ trackLabel }: { trackLabel: string }) {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 md:p-8">
      <h3 className="text-2xl font-semibold text-white mb-3">\uD83C\uDF89 \u0411\u043B\u043E\u043A 4 \u0437\u0430\u0432\u0435\u0440\u0448\u0451\u043D</h3>
      <div className="text-zinc-300 space-y-1 mb-4">
        <p>\u0422\u044B \u043F\u0440\u043E\u0448\u0451\u043B:</p>
        <p>\u2705 {trackLabel}</p>
      </div>
      <p className="text-zinc-400 mb-4">
        \u0422\u0435\u043F\u0435\u0440\u044C \u0442\u044B \u0437\u043D\u0430\u0435\u0448\u044C \u043A\u0430\u043A \u043F\u0440\u043E\u0434\u0430\u0432\u0430\u0442\u044C \u0441\u0432\u043E\u0438\u0445 \u0430\u0433\u0435\u043D\u0442\u043E\u0432 \u0438 \u0437\u0430\u0440\u0430\u0431\u0430\u0442\u044B\u0432\u0430\u0442\u044C \u043D\u0430 \u043D\u0438\u0445.
      </p>
      <p className="text-zinc-400 mb-6">
        \u0421\u043B\u0435\u0434\u0443\u044E\u0449\u0438\u0439 \u0448\u0430\u0433 \u2014 \u0411\u043B\u043E\u043A 5: \u0411\u0438\u0437\u043D\u0435\u0441-\u043C\u043E\u0434\u0435\u043B\u044C: \u0443\u043F\u0430\u043A\u043E\u0432\u043A\u0430, \u043A\u043B\u0438\u0435\u043D\u0442\u044B, \u043F\u0440\u0430\u0439\u0441\u0438\u043D\u0433
      </p>
      <a
        href="/dashboard/course/block/5"
        className="inline-flex items-center px-5 py-3 rounded-xl border border-zinc-800 text-zinc-300 hover:text-white hover:border-[#FF4422] transition-colors"
      >
        \u041F\u0435\u0440\u0435\u0439\u0442\u0438 \u043A \u0411\u043B\u043E\u043A\u0443 5 \u2192
      </a>
    </div>
  );
}

/* ── Section Progress Bar ──────────────────────────────────── */
const SECTIONS = [
  { label: "\u0420\u0430\u0437\u0432\u043E\u0440\u043E\u0442", range: [1, 2] },
  { label: "\u0412\u0438\u0440\u0442. \u0441\u043E\u0442\u0440\u0443\u0434\u043D\u0438\u043A", range: [3, 6] },
  { label: "ClawHub", range: [7, 9] },
  { label: "SaaS", range: [10, 12] },
];

export function SectionProgressBar({ currentLesson }: { currentLesson: number }) {
  return (
    <div className="flex items-center gap-1 mb-6 overflow-x-auto">
      {SECTIONS.map((section, idx) => {
        const [start, end] = section.range;
        const isCurrent = currentLesson >= start && currentLesson <= end;
        const isPast = currentLesson > end;

        return (
          <div key={section.label} className="flex items-center gap-1">
            {idx > 0 && (
              <span className="text-zinc-600 text-xs mx-1">\u2192</span>
            )}
            <div
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                isCurrent
                  ? "bg-[#FF4422]/15 text-[#FF4422] border border-[#FF4422]/40"
                  : isPast
                    ? "bg-zinc-800 text-zinc-500 border border-zinc-700"
                    : "bg-zinc-900 text-zinc-600 border border-zinc-800"
              }`}
            >
              {section.label} ({start}\u2013{end})
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ── Path Selector ─────────────────────────────────────────── */
export type PathId = "employee" | "clawhub" | "saas";

const PATHS: { id: PathId; icon: string; title: string; desc: string; lessons: number[] }[] = [
  { id: "employee", icon: "\uD83D\uDC64", title: "\u0412\u0438\u0440\u0442\u0443\u0430\u043B\u044C\u043D\u044B\u0439 \u0441\u043E\u0442\u0440\u0443\u0434\u043D\u0438\u043A", desc: "\u041D\u0430\u0441\u0442\u0440\u0430\u0438\u0432\u0430\u0435\u0448\u044C \u0430\u0433\u0435\u043D\u0442\u0430 \u043F\u043E\u0434 \u043A\u043B\u0438\u0435\u043D\u0442\u0430, \u043F\u043E\u043B\u0443\u0447\u0430\u0435\u0448\u044C \u0440\u0435\u0442\u0435\u0439\u043D\u0435\u0440 $300\u20131000/\u043C\u0435\u0441", lessons: [3, 4, 5, 6] },
  { id: "clawhub", icon: "\uD83C\uDFEA", title: "ClawHub Marketplace", desc: "\u041F\u0443\u0431\u043B\u0438\u043A\u0443\u0435\u0448\u044C \u0430\u0433\u0435\u043D\u0442\u0430, \u043F\u0440\u043E\u0434\u0430\u0451\u0442\u0441\u044F \u0431\u0435\u0437 \u0442\u0432\u043E\u0435\u0433\u043E \u0443\u0447\u0430\u0441\u0442\u0438\u044F. \u041F\u0430\u0441\u0441\u0438\u0432\u043D\u044B\u0439 \u0434\u043E\u0445\u043E\u0434", lessons: [7, 8, 9] },
  { id: "saas", icon: "\u2699\uFE0F", title: "SaaS \u043F\u0440\u043E\u0434\u0443\u043A\u0442", desc: "\u041E\u0434\u0438\u043D \u0430\u0433\u0435\u043D\u0442 \u0434\u043B\u044F \u043C\u043D\u043E\u0433\u0438\u0445 \u043A\u043B\u0438\u0435\u043D\u0442\u043E\u0432. \u041C\u0430\u043A\u0441\u0438\u043C\u0430\u043B\u044C\u043D\u044B\u0439 \u043C\u0430\u0441\u0448\u0442\u0430\u0431", lessons: [10, 11] },
];

export function PathSelector() {
  const [selected, setSelected] = useState<PathId | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("b4_path") as PathId | null;
    if (stored && PATHS.some((p) => p.id === stored)) {
      setSelected(stored);
    }
  }, []);

  function handleSelect(id: PathId) {
    setSelected(id);
    localStorage.setItem("b4_path", id);
  }

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 md:p-8 mb-8">
      <h2 className="text-xl font-semibold text-white mb-2">\u0412\u044B\u0431\u0435\u0440\u0438 \u0441\u0432\u043E\u0439 \u043F\u0443\u0442\u044C \u043C\u043E\u043D\u0435\u0442\u0438\u0437\u0430\u0446\u0438\u0438</h2>
      <p className="text-zinc-400 text-sm mb-5">
        \u0412\u044B\u0431\u0440\u0430\u043D\u043D\u044B\u0439 \u043F\u0443\u0442\u044C \u043F\u043E\u0434\u0441\u0432\u0435\u0442\u0438\u0442 \u043D\u0443\u0436\u043D\u044B\u0435 \u0443\u0440\u043E\u043A\u0438 \u0432 \u0441\u0430\u0439\u0434\u0431\u0430\u0440\u0435
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {PATHS.map((path) => {
          const isSelected = selected === path.id;
          return (
            <button
              key={path.id}
              onClick={() => handleSelect(path.id)}
              className={`text-left rounded-xl p-5 border-2 transition-all ${
                isSelected
                  ? "border-[#FF4422] bg-[#FF4422]/10"
                  : "border-zinc-700 bg-zinc-950 hover:border-zinc-500"
              }`}
            >
              <span className="text-3xl block mb-3">{path.icon}</span>
              <h3 className={`font-semibold mb-1 ${isSelected ? "text-[#FF4422]" : "text-white"}`}>
                {path.title}
              </h3>
              <p className="text-zinc-400 text-sm">{path.desc}</p>
              <p className="text-zinc-500 text-xs mt-2">
                \u0423\u0440\u043E\u043A\u0438 {path.lessons.join(", ")}
              </p>
            </button>
          );
        })}
      </div>
      {selected && (
        <p className="text-[#FF4422] text-sm mt-4 font-medium">
          \u2713 \u0412\u044B\u0431\u0440\u0430\u043D: {PATHS.find((p) => p.id === selected)?.title}
        </p>
      )}
    </div>
  );
}

/* ── Revenue Calculator ────────────────────────────────────── */
export function RevenueCalculator() {
  const [tab, setTab] = useState<PathId>("employee");
  const [employeeClients, setEmployeeClients] = useState(5);
  const [employeePrice, setEmployeePrice] = useState(250);
  const [clawhubInstalls, setClawhubInstalls] = useState(50);
  const [clawhubPrice, setClawhubPrice] = useState(15);
  const [saasSubscribers, setSaasSubscribers] = useState(20);
  const [saasPrice, setSaasPrice] = useState(30);

  const revenue =
    tab === "employee"
      ? employeeClients * employeePrice
      : tab === "clawhub"
        ? clawhubInstalls * clawhubPrice
        : saasSubscribers * saasPrice;

  const tabs: { id: PathId; label: string }[] = [
    { id: "employee", label: "\uD83D\uDC64 \u0421\u043E\u0442\u0440\u0443\u0434\u043D\u0438\u043A" },
    { id: "clawhub", label: "\uD83C\uDFEA ClawHub" },
    { id: "saas", label: "\u2699\uFE0F SaaS" },
  ];

  return (
    <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-6">
      <h3 className="text-lg font-semibold text-white mb-4">\uD83D\uDCB0 \u041A\u0430\u043B\u044C\u043A\u0443\u043B\u044F\u0442\u043E\u0440 \u0434\u043E\u0445\u043E\u0434\u0430</h3>

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              tab === t.id
                ? "bg-[#FF4422] text-white"
                : "bg-zinc-900 text-zinc-400 hover:text-white"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Sliders */}
      <div className="space-y-5">
        {tab === "employee" && (
          <>
            <SliderRow label="\u041A\u043B\u0438\u0435\u043D\u0442\u043E\u0432" value={employeeClients} min={1} max={20} onChange={setEmployeeClients} />
            <SliderRow label="\u0426\u0435\u043D\u0430/\u043C\u0435\u0441" value={employeePrice} min={50} max={500} step={10} onChange={setEmployeePrice} prefix="$" />
          </>
        )}
        {tab === "clawhub" && (
          <>
            <SliderRow label="\u0423\u0441\u0442\u0430\u043D\u043E\u0432\u043E\u043A" value={clawhubInstalls} min={1} max={500} onChange={setClawhubInstalls} />
            <SliderRow label="\u0426\u0435\u043D\u0430" value={clawhubPrice} min={5} max={50} onChange={setClawhubPrice} prefix="$" />
          </>
        )}
        {tab === "saas" && (
          <>
            <SliderRow label="\u041F\u043E\u0434\u043F\u0438\u0441\u0447\u0438\u043A\u043E\u0432" value={saasSubscribers} min={1} max={200} onChange={setSaasSubscribers} />
            <SliderRow label="\u0426\u0435\u043D\u0430 \u043F\u043E\u0434\u043F\u0438\u0441\u043A\u0438" value={saasPrice} min={10} max={100} onChange={setSaasPrice} prefix="$" />
          </>
        )}
      </div>

      {/* Revenue */}
      <div className="mt-6 bg-zinc-900 border border-[#FF4422]/30 rounded-xl p-5 text-center">
        <p className="text-zinc-400 text-sm mb-1">\u0414\u043E\u0445\u043E\u0434 \u0432 \u043C\u0435\u0441\u044F\u0446</p>
        <p
          className="text-4xl font-bold text-[#FF4422] transition-all duration-300"
          key={revenue}
          style={{ animation: "pulse 0.3s ease-in-out" }}
        >
          ${revenue.toLocaleString()}
        </p>
      </div>
    </div>
  );
}

function SliderRow({
  label,
  value,
  min,
  max,
  step = 1,
  onChange,
  prefix = "",
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (v: number) => void;
  prefix?: string;
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <span className="text-zinc-400 text-sm">{label}</span>
        <span className="text-white font-semibold text-sm">
          {prefix}{value}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-zinc-800 accent-[#FF4422]"
      />
    </div>
  );
}

/* ── ClawHub Card Preview ──────────────────────────────────── */
export function ClawHubCardPreview() {
  const [agentName, setAgentName] = useState("");
  const [agentDesc, setAgentDesc] = useState("");

  return (
    <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-6">
      <h3 className="text-lg font-semibold text-white mb-4">\uD83C\uDFEA \u041F\u0440\u0435\u0432\u044C\u044E \u043A\u0430\u0440\u0442\u043E\u0447\u043A\u0438 \u043D\u0430 ClawHub</h3>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Inputs */}
        <div className="flex-1 space-y-4">
          <div>
            <label className="text-zinc-400 text-sm block mb-1">\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u0430\u0433\u0435\u043D\u0442\u0430</label>
            <input
              type="text"
              value={agentName}
              onChange={(e) => setAgentName(e.target.value)}
              placeholder="\u0426\u0435\u043D\u044B \u043A\u043E\u043D\u043A\u0443\u0440\u0435\u043D\u0442\u043E\u0432 \u2014 \u0430\u0432\u0442\u043E\u043F\u0438\u043B\u043E\u0442"
              className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-2.5 text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#FF4422] transition-colors"
            />
          </div>
          <div>
            <label className="text-zinc-400 text-sm block mb-1">\u041E\u043F\u0438\u0441\u0430\u043D\u0438\u0435 (1\u20132 \u043F\u0440\u0435\u0434\u043B\u043E\u0436\u0435\u043D\u0438\u044F)</label>
            <textarea
              value={agentDesc}
              onChange={(e) => setAgentDesc(e.target.value)}
              placeholder="\u041F\u0440\u043E\u0441\u044B\u043F\u0430\u0435\u0448\u044C\u0441\u044F \u0443\u0442\u0440\u043E\u043C \u2014 \u0443\u0436\u0435 \u0437\u043D\u0430\u0435\u0448\u044C \u0433\u0434\u0435 \u043A\u043E\u043D\u043A\u0443\u0440\u0435\u043D\u0442\u044B \u0441\u043D\u0438\u0437\u0438\u043B\u0438 \u0446\u0435\u043D\u044B"
              rows={3}
              className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-2.5 text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#FF4422] transition-colors resize-none"
            />
          </div>
        </div>

        {/* Preview Card */}
        <div className="flex items-start justify-center md:justify-end">
          <div className="bg-zinc-900 border border-zinc-700 rounded-xl p-4 w-64">
            <div className="w-10 h-10 bg-[#FF4422]/20 rounded-lg mb-3 flex items-center justify-center text-lg">
              \uD83E\uDD16
            </div>
            <h3 className="text-white font-semibold text-sm">
              {agentName || "\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u0430\u0433\u0435\u043D\u0442\u0430"}
            </h3>
            <p className="text-zinc-400 text-xs mt-1 line-clamp-2">
              {agentDesc || "\u041E\u043F\u0438\u0441\u0430\u043D\u0438\u0435 \u043F\u043E\u044F\u0432\u0438\u0442\u0441\u044F \u0437\u0434\u0435\u0441\u044C..."}
            </p>
            <div className="mt-3 flex items-center justify-between">
              <span className="text-[#FF4422] font-bold text-sm">$9/\u043C\u0435\u0441</span>
              <span className="bg-[#FF4422] text-white text-xs px-3 py-1 rounded-lg">
                \u0423\u0441\u0442\u0430\u043D\u043E\u0432\u0438\u0442\u044C
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Comparison Table ──────────────────────────────────────── */
export function ComparisonTable({
  headers,
  rows,
}: {
  headers: string[];
  rows: string[][];
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr>
            {headers.map((h) => (
              <th
                key={h}
                className="text-left text-zinc-400 font-semibold px-4 py-3 border-b border-zinc-800"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, idx) => (
            <tr key={idx} className="border-b border-zinc-800/50">
              {row.map((cell, cIdx) => (
                <td
                  key={cIdx}
                  className={`px-4 py-3 ${cIdx === 0 ? "text-zinc-300 font-medium" : "text-zinc-400"}`}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
