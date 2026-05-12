import { createActor } from "@/backend";
import { Button } from "@/components/ui/button";
import { useAskAssistant } from "@/hooks/useAskAssistant";
import { useChatHistory, useClearChatHistory } from "@/hooks/useChatHistory";
import { MessageRole } from "@/types";
import type { ChatMessage } from "@/types";
import { useActor } from "@caffeineai/core-infrastructure";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { ArrowLeft, Send, Sparkles, Trash2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

function useOpenAIStatus() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<boolean>({
    queryKey: ["openai-configured"],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isMyOpenAIConfigured();
    },
    enabled: !!actor && !isFetching,
  });
}

function useTutorContext() {
  const search = useSearch({ strict: false }) as Record<
    string,
    string | undefined
  >;
  return {
    subjectId: search.subjectId ?? null,
    subjectName: search.subjectName ?? null,
    chapterTitle: search.chapterTitle ?? null,
  };
}

const SUBJECT_EMOJIS: Record<string, string> = {
  math: "🔢",
  science: "🔬",
  social_science: "🌍",
  english: "📖",
  hindi: "📝",
};

const SUBJECT_COLORS: Record<string, string> = {
  math: "oklch(0.65 0.22 35)",
  science: "oklch(0.62 0.18 125)",
  social_science: "oklch(0.68 0.2 270)",
  english: "oklch(0.65 0.2 230)",
  hindi: "oklch(0.62 0.18 10)",
};

function formatTime(ts: bigint): string {
  const d = new Date(Number(ts) / 1_000_000);
  return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function MessageBubble({ msg, idx }: { msg: ChatMessage; idx: number }) {
  const isUser = msg.role === MessageRole.user;
  return (
    <div
      className={`flex w-full mb-3 ${isUser ? "justify-end" : "justify-start"}`}
      data-ocid={`tutor.message.${idx + 1}`}
    >
      {!isUser && (
        <div
          className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center mr-2 mt-1 shadow-sm"
          style={{ background: "oklch(0.65 0.22 35)" }}
        >
          <span className="text-sm">✨</span>
        </div>
      )}
      <div
        className={`max-w-[75%] rounded-2xl px-4 py-3 shadow-sm ${
          isUser ? "rounded-tr-sm" : "rounded-tl-sm"
        }`}
        style={{
          background: isUser ? "oklch(0.65 0.22 35)" : "oklch(1.0 0.005 75)",
          color: isUser ? "white" : "oklch(0.18 0.02 280)",
          border: isUser ? "none" : "1.5px solid oklch(0.9 0.012 75)",
        }}
      >
        <p className="text-sm font-semibold leading-relaxed whitespace-pre-wrap break-words">
          {msg.content}
        </p>
        <p
          className={`text-xs mt-1 ${isUser ? "text-white/70" : "text-muted-foreground"}`}
        >
          {formatTime(msg.timestamp)}
        </p>
      </div>
      {isUser && (
        <div
          className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ml-2 mt-1 shadow-sm"
          style={{ background: "oklch(0.94 0.02 280)" }}
        >
          <span className="text-sm">🧑‍🎓</span>
        </div>
      )}
    </div>
  );
}

function TypingIndicator() {
  return (
    <div className="flex items-end gap-2 mb-3" data-ocid="tutor.loading_state">
      <div
        className="w-8 h-8 rounded-full flex items-center justify-center shadow-sm flex-shrink-0"
        style={{ background: "oklch(0.65 0.22 35)" }}
      >
        <span className="text-sm">✨</span>
      </div>
      <div
        className="rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm"
        style={{
          background: "oklch(1.0 0.005 75)",
          border: "1.5px solid oklch(0.9 0.012 75)",
        }}
      >
        <div className="flex gap-1 items-center h-5">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="w-2 h-2 rounded-full inline-block"
              style={{
                background: "oklch(0.65 0.22 35)",
                animation: `navu-bounce 1.2s ease-in-out ${i * 0.2}s infinite`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function NoKeyNudge({ onGoToSettings }: { onGoToSettings: () => void }) {
  return (
    <div
      className="flex flex-col items-center justify-center flex-1 px-6 text-center gap-5 py-16"
      data-ocid="tutor.no_key_state"
    >
      <div
        className="w-28 h-28 rounded-full flex items-center justify-center shadow-lg"
        style={{ background: "oklch(0.94 0.08 75)" }}
      >
        <span className="text-6xl">🤖</span>
      </div>
      <div className="space-y-2">
        <h2 className="text-2xl font-black text-foreground">
          Navu needs a key! 🔑
        </h2>
        <p className="text-sm font-semibold text-muted-foreground max-w-xs">
          Set up your AI key in Settings to chat with Navu and get instant
          explanations!
        </p>
      </div>
      <Button
        type="button"
        onClick={onGoToSettings}
        className="btn-playful text-white px-8"
        style={{ background: "oklch(0.65 0.22 35)" }}
        data-ocid="tutor.go_to_settings_button"
      >
        ⚙️ Go to Settings
      </Button>
    </div>
  );
}

const SUGGESTION_CHIPS = [
  "Explain Rational Numbers 🔢",
  "What is Photosynthesis? 🌱",
  "Tell me about the Constitution 🌍",
  "What are Synthetic Fibres? 🧪",
];

function EmptyChat({
  contextLabel,
  onSuggestion,
}: {
  contextLabel?: string;
  onSuggestion: (text: string) => void;
}) {
  return (
    <div
      className="flex flex-col items-center justify-center px-6 text-center gap-5 py-12"
      data-ocid="tutor.empty_state"
    >
      <div
        className="w-28 h-28 rounded-full flex items-center justify-center shadow-lg"
        style={{ background: "oklch(0.94 0.08 75)" }}
      >
        <span className="text-6xl">💬</span>
      </div>
      <div className="space-y-2">
        <h2 className="text-2xl font-black text-foreground">
          Ask me anything! 🌟
        </h2>
        <p className="text-sm font-semibold text-muted-foreground max-w-xs">
          {contextLabel
            ? `Ready to help with ${contextLabel}! Ask your first question ↓`
            : "Hi! I'm Navu, your Class 8 AI buddy. Ask about Math, Science, Social Science, English or Hindi!"}
        </p>
      </div>
      <div className="flex flex-col gap-2 w-full max-w-xs">
        {SUGGESTION_CHIPS.map((chip) => (
          <button
            key={chip}
            type="button"
            onClick={() => onSuggestion(chip.replace(/ [\S]+$/u, "").trim())}
            className="text-left text-sm font-bold px-4 py-2.5 rounded-2xl transition-smooth hover:scale-[1.02] active:scale-95"
            style={{
              background: "oklch(0.65 0.22 35 / 0.1)",
              border: "1.5px solid oklch(0.65 0.22 35 / 0.3)",
              color: "oklch(0.35 0.08 55)",
            }}
          >
            {chip}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function Tutor() {
  const ctx = useTutorContext();
  const navigate = useNavigate();
  const { data: messages = [], isLoading: historyLoading } = useChatHistory();
  const { data: keyConfigured, isLoading: keyLoading } = useOpenAIStatus();
  const clearHistory = useClearChatHistory();
  const askAssistant = useAskAssistant();

  const [input, setInput] = useState("");
  const listEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // biome-ignore lint/correctness/useExhaustiveDependencies: intentional scroll-on-message
  useEffect(() => {
    listEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length, askAssistant.isPending]);

  const contextLabel =
    ctx.chapterTitle && ctx.subjectName
      ? `${ctx.subjectName} — ${ctx.chapterTitle}`
      : (ctx.subjectName ?? null);

  const subjectColor = ctx.subjectId
    ? (SUBJECT_COLORS[ctx.subjectId] ?? "oklch(0.65 0.22 35)")
    : "oklch(0.65 0.22 35)";
  const subjectEmoji = ctx.subjectId
    ? (SUBJECT_EMOJIS[ctx.subjectId] ?? "💡")
    : "💡";

  function handleSend(text?: string) {
    const raw = (text ?? input).trim();
    if (!raw || askAssistant.isPending) return;

    let prompt = raw;
    if (ctx.chapterTitle && ctx.subjectName && messages.length === 0) {
      prompt = `[Context: Class 8 ${ctx.subjectName}, Chapter: ${ctx.chapterTitle}]\n\n${raw}`;
    }

    setInput("");
    if (textareaRef.current) textareaRef.current.style.height = "auto";

    askAssistant.mutate(prompt, {
      onError: () => toast.error("Navu couldn't respond. Please try again! 😅"),
    });
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  function handleTextareaChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setInput(e.target.value);
    const el = e.target;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 120)}px`;
  }

  function handleClear() {
    clearHistory.mutate(undefined, {
      onSuccess: () => toast.success("✨ Chat cleared! Fresh start!"),
      onError: () => toast.error("Couldn't clear chat."),
    });
  }

  const isLoading = historyLoading || keyLoading;

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <div
        className="sticky top-0 z-20 px-4 pt-12 pb-3 flex items-center gap-3"
        style={{
          background: `linear-gradient(160deg, ${subjectColor}, oklch(0.68 0.2 270))`,
        }}
      >
        <button
          type="button"
          onClick={() => navigate({ to: "/" })}
          className="w-9 h-9 rounded-full flex items-center justify-center transition-smooth hover:bg-white/20"
          aria-label="Go back"
          data-ocid="tutor.back_button"
        >
          <ArrowLeft className="w-5 h-5 text-white" />
        </button>

        <div className="flex items-center gap-2 flex-1 min-w-0">
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center shadow-sm flex-shrink-0"
            style={{ background: "rgba(255,255,255,0.25)" }}
          >
            <span className="text-lg">{subjectEmoji}</span>
          </div>
          <div className="min-w-0">
            <h1 className="text-base font-black text-white leading-tight truncate">
              Navu AI Tutor ✨
            </h1>
            {contextLabel && (
              <p className="text-xs font-semibold text-white/80 truncate">
                {contextLabel}
              </p>
            )}
          </div>
        </div>

        {messages.length > 0 && (
          <button
            type="button"
            onClick={handleClear}
            disabled={clearHistory.isPending}
            className="w-9 h-9 rounded-full flex items-center justify-center transition-smooth hover:bg-white/20"
            aria-label="Clear chat history"
            data-ocid="tutor.clear_button"
          >
            <Trash2 className="w-4 h-4 text-white" />
          </button>
        )}
      </div>

      {/* Messages area */}
      <div
        className="flex-1 overflow-y-auto"
        style={{ background: "oklch(0.97 0.008 75)" }}
      >
        {isLoading ? (
          <div className="flex flex-col gap-3 p-4 mt-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className={`flex ${i % 2 === 0 ? "justify-end" : "justify-start"}`}
              >
                <div
                  className="rounded-2xl h-14 animate-pulse"
                  style={{
                    width: `${50 + i * 12}%`,
                    background:
                      i % 2 === 0
                        ? "oklch(0.65 0.22 35 / 0.2)"
                        : "oklch(0.9 0.01 75)",
                  }}
                />
              </div>
            ))}
          </div>
        ) : !keyConfigured ? (
          <NoKeyNudge onGoToSettings={() => navigate({ to: "/settings" })} />
        ) : messages.length === 0 ? (
          <EmptyChat
            contextLabel={contextLabel ?? undefined}
            onSuggestion={(text) => handleSend(text)}
          />
        ) : (
          <div className="px-4 py-4">
            {messages.map((msg, idx) => (
              <MessageBubble key={String(msg.timestamp)} msg={msg} idx={idx} />
            ))}
            {askAssistant.isPending && <TypingIndicator />}
            <div ref={listEndRef} />
          </div>
        )}
        {keyConfigured && !isLoading && <div className="h-2" />}
      </div>

      {/* Input area */}
      {keyConfigured && !isLoading && (
        <div
          className="sticky bottom-0 px-4 py-3 safe-area-pb"
          style={{
            background: "oklch(1.0 0.005 75)",
            borderTop: "1.5px solid oklch(0.9 0.012 75)",
          }}
        >
          <div
            className="flex items-end gap-2 rounded-2xl px-4 py-2"
            style={{
              background: "oklch(0.96 0.01 75)",
              border: "1.5px solid oklch(0.88 0.015 75)",
            }}
          >
            <Sparkles
              className="w-5 h-5 flex-shrink-0 mb-1.5"
              style={{ color: "oklch(0.65 0.22 35)" }}
            />
            <textarea
              ref={textareaRef}
              value={input}
              onChange={handleTextareaChange}
              onKeyDown={handleKeyDown}
              placeholder="Ask Navodayans AI..."
              rows={1}
              disabled={askAssistant.isPending}
              className="flex-1 resize-none bg-transparent text-sm font-semibold text-foreground placeholder:text-muted-foreground focus:outline-none py-1.5 min-w-0"
              style={{ maxHeight: "120px" }}
              data-ocid="tutor.input"
              aria-label="Chat input"
            />
            <button
              type="button"
              onClick={() => handleSend()}
              disabled={!input.trim() || askAssistant.isPending}
              className="w-9 h-9 rounded-full flex items-center justify-center transition-smooth active:scale-90 flex-shrink-0 mb-0.5"
              style={{
                background:
                  !input.trim() || askAssistant.isPending
                    ? "oklch(0.88 0.01 75)"
                    : "oklch(0.65 0.22 35)",
              }}
              aria-label="Send message"
              data-ocid="tutor.send_button"
            >
              <Send className="w-4 h-4 text-white" />
            </button>
          </div>
          <p className="text-center text-xs text-muted-foreground mt-1.5 font-semibold">
            Enter to send · Shift+Enter for new line
          </p>
        </div>
      )}

      <style>{`
        @keyframes navu-bounce {
          0%, 60%, 100% { transform: translateY(0); }
          30% { transform: translateY(-6px); }
        }
      `}</style>
    </div>
  );
}
