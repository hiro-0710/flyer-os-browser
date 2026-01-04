// src/components/FlyerConsole.tsx

"use client";

import { useState } from "react";
import { flyerCore } from "@/lib/flyer-core";

type Message = {
  id: number;
  role: "user" | "flyer";
  content: string;
};

export function FlyerConsole() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      role: "flyer",
      content: "Flyer OS minimal console を起動しました。入力してみてください。"
    }
  ]);
  const [counter, setCounter] = useState(2);

  function addMessage(role: "user" | "flyer", content: string) {
    setMessages(prev => [
      ...prev,
      { id: counter, role, content }
    ]);
    setCounter(c => c + 1);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;

    // ユーザーメッセージ
    addMessage("user", trimmed);

    // Flyer Core をブラウザ内で直接実行
    const result = flyerCore(trimmed);

    // Flyer からの応答
    addMessage("flyer", result.content);

    setInput("");
  }

  return (
    <div className="flyer-root">
      <div className="flyer-frame">
        <div className="flyer-header">
          <div className="flyer-logo">Flyer OS</div>
          <div className="flyer-status">Core: local / browser-only</div>
        </div>

        <div className="flyer-console">
          {messages.map(m => (
            <div
              key={m.id}
              className={`flyer-message flyer-message-${m.role}`}
            >
              <span className="flyer-message-label">
                {m.role === "user" ? "You" : "Flyer"}
              </span>
              <span className="flyer-message-content">{m.content}</span>
            </div>
          ))}
        </div>

        <form className="flyer-input-row" onSubmit={handleSubmit}>
          <input
            className="flyer-input"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Flyer に指示や質問を送る..."
          />
          <button className="flyer-send" type="submit">
            Send
          </button>
        </form>
      </div>

      <style jsx>{`
        .flyer-root {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: radial-gradient(circle at top, #111827, #020617);
          color: #e5e7eb;
          font-family: system-ui, -apple-system, BlinkMacSystemFont, "SF Pro Text",
            "Segoe UI", sans-serif;
        }

        .flyer-frame {
          width: 100%;
          max-width: 720px;
          border-radius: 24px;
          border: 1px solid rgba(148, 163, 184, 0.25);
          background: radial-gradient(circle at top left, #020617, #020617 40%, #020617);
          box-shadow:
            0 40px 120px rgba(15, 23, 42, 0.9),
            0 0 0 1px rgba(15, 23, 42, 0.9);
          overflow: hidden;
        }

        .flyer-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 14px 18px;
          border-bottom: 1px solid rgba(51, 65, 85, 0.8);
          background: linear-gradient(to right, rgba(15, 23, 42, 0.9), rgba(15, 23, 42, 0.7));
        }

        .flyer-logo {
          font-size: 14px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #9ca3af;
        }

        .flyer-status {
          font-size: 11px;
          color: #6b7280;
        }

        .flyer-console {
          max-height: 420px;
          overflow-y: auto;
          padding: 20px 18px;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .flyer-message {
          font-size: 13px;
          display: flex;
          flex-direction: column;
          gap: 3px;
        }

        .flyer-message-label {
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.16em;
          color: #6b7280;
        }

        .flyer-message-user .flyer-message-content {
          align-self: flex-end;
          background: rgba(15, 118, 110, 0.35);
          border-radius: 999px;
          padding: 8px 12px;
        }

        .flyer-message-flyer .flyer-message-content {
          align-self: flex-start;
          background: rgba(15, 23, 42, 0.9);
          border-radius: 999px;
          padding: 8px 12px;
          border: 1px solid rgba(55, 65, 81, 0.9);
        }

        .flyer-input-row {
          display: flex;
          gap: 8px;
          padding: 10px 10px 12px;
          border-top: 1px solid rgba(30, 64, 175, 0.5);
          background: radial-gradient(circle at top, rgba(15, 23, 42, 0.96), #020617);
        }

        .flyer-input {
          flex: 1;
          border-radius: 999px;
          border: 1px solid rgba(51, 65, 85, 0.9);
          background: rgba(15, 23, 42, 0.9);
          padding: 8px 12px;
          font-size: 13px;
          color: #e5e7eb;
          outline: none;
        }

        .flyer-input::placeholder {
          color: #4b5563;
        }

        .flyer-send {
          border-radius: 999px;
          border: none;
          padding: 8px 14px;
          font-size: 12px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          background: linear-gradient(to right, #0f766e, #22c55e);
          color: #f9fafb;
          cursor: pointer;
        }

        .flyer-send:hover {
          opacity: 0.9;
        }
      `}</style>
    </div>
  );
}
