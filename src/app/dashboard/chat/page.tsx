"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function JuniorChatPage() {
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messagesLeft, setMessagesLeft] = useState<number | null>(null);
  const [initialLoading, setInitialLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Check access + load history
  useEffect(() => {
    async function init() {
      try {
        const sessionRes = await fetch("/api/auth/session");
        if (!sessionRes.ok) {
          router.push("/login");
          return;
        }
        const sessionData = await sessionRes.json();
        if (!sessionData.ok) {
          router.push("/login");
          return;
        }

        const tier = sessionData.tier || "free";
        if (tier !== "pro" && tier !== "elite") {
          router.push("/dashboard");
          return;
        }

        const historyRes = await fetch("/api/chat/junior/history");
        if (historyRes.ok) {
          const data = await historyRes.json();
          setMessages(data.messages || []);
          setMessagesLeft(data.messagesLeft);
        }
      } catch {
        router.push("/dashboard");
      } finally {
        setInitialLoading(false);
      }
    }
    init();
  }, [router]);

  const handleSend = async () => {
    const text = input.trim();
    if (!text || loading) return;

    setInput("");
    setError(null);
    setMessages((prev) => [...prev, { role: "user", content: text }]);
    setLoading(true);

    try {
      const res = await fetch("/api/chat/junior", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Ошибка");
        return;
      }

      setMessages((prev) => [...prev, { role: "assistant", content: data.message }]);
      setMessagesLeft(data.messagesLeft);
    } catch {
      setError("Ошибка соединения");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (initialLoading) {
    return (
      <main className="min-h-screen bg-[#0d0d0d] flex items-center justify-center">
        <div className="text-[#888888]">Загрузка...</div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0d0d0d] flex flex-col">
      {/* Header */}
      <div className="border-b border-[#333] px-4 py-3 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.push("/dashboard")}
            className="text-[#888888] hover:text-white transition-colors text-sm"
          >
            &larr; Назад
          </button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#FF4422] flex items-center justify-center text-white text-sm font-bold">
              J
            </div>
            <span className="text-white font-semibold">Junior</span>
          </div>
        </div>
        {messagesLeft !== null && (
          <div className="text-[#888888] text-sm">
            Осталось: {messagesLeft}/50 сообщений сегодня
          </div>
        )}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        <div className="max-w-2xl mx-auto space-y-4">
          {messages.length === 0 && !loading && (
            <div className="text-center text-[#888888] mt-20">
              <Image src="/junior-bot.png" alt="Junior" width={96} height={96} className="w-24 h-24 mx-auto mb-4" />
              <p className="text-lg font-medium text-white mb-2">Привет! Я Junior</p>
              <p>AI-помощник Claw Academy. Задай мне вопрос о курсе, OpenClaw или заработке с AI.</p>
            </div>
          )}

          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm whitespace-pre-wrap ${
                  msg.role === "user"
                    ? "bg-[#FF4422] text-white"
                    : "bg-[#1a1a1a] text-white border border-[#333]"
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex justify-start">
              <div className="bg-[#1a1a1a] border border-[#333] rounded-2xl px-4 py-3 text-sm text-[#888888]">
                Junior думает...
              </div>
            </div>
          )}

          {error && (
            <div className="flex justify-center">
              <div className="bg-red-900/30 border border-red-800 rounded-lg px-4 py-2 text-sm text-red-400">
                {error}
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input */}
      <div className="border-t border-[#333] px-4 py-4 shrink-0">
        <div className="max-w-2xl mx-auto flex gap-3">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Написать сообщение..."
            rows={1}
            className="flex-1 bg-[#1a1a1a] border border-[#333] rounded-xl px-4 py-3 text-white text-sm resize-none focus:outline-none focus:border-[#FF4422] transition-colors placeholder:text-[#555]"
          />
          <button
            onClick={handleSend}
            disabled={loading || !input.trim()}
            className="px-5 py-3 bg-[#FF4422] hover:bg-[#e63d1e] disabled:opacity-40 disabled:hover:bg-[#FF4422] text-white font-semibold rounded-xl transition-colors text-sm"
          >
            →
          </button>
        </div>
      </div>
    </main>
  );
}
