import { c as createLucideIcon, b as useQueryClient, d as useNavigate, r as reactExports, j as jsxRuntimeExports, S as Sparkles, e as useSearch } from "./index-9NMC6j-R.js";
import { u as useActor, a as useQuery, c as createActor, M as MessageRole } from "./backend-DUu4WqvQ.js";
import { u as useMutation, B as Button } from "./button-bjKP-KMk.js";
import { u as useAskAssistant } from "./useAskAssistant-C3lIPxNH.js";
import { T as Trash2, u as ue } from "./index-DS-LDzug.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "m12 19-7-7 7-7", key: "1l729n" }],
  ["path", { d: "M19 12H5", key: "x3x0zl" }]
];
const ArrowLeft = createLucideIcon("arrow-left", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z",
      key: "1ffxy3"
    }
  ],
  ["path", { d: "m21.854 2.147-10.94 10.939", key: "12cjpa" }]
];
const Send = createLucideIcon("send", __iconNode);
function useChatHistory() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["chat-history"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getChatHistory();
    },
    enabled: !!actor && !isFetching
  });
}
function useClearChatHistory() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("Actor not ready");
      return actor.clearChatHistory();
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["chat-history"] })
  });
}
function useOpenAIStatus() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["openai-configured"],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isMyOpenAIConfigured();
    },
    enabled: !!actor && !isFetching
  });
}
function useTutorContext() {
  const search = useSearch({ strict: false });
  return {
    subjectId: search.subjectId ?? null,
    subjectName: search.subjectName ?? null,
    chapterTitle: search.chapterTitle ?? null
  };
}
const SUBJECT_EMOJIS = {
  math: "🔢",
  science: "🔬",
  social_science: "🌍",
  english: "📖",
  hindi: "📝"
};
const SUBJECT_COLORS = {
  math: "oklch(0.65 0.22 35)",
  science: "oklch(0.62 0.18 125)",
  social_science: "oklch(0.68 0.2 270)",
  english: "oklch(0.65 0.2 230)",
  hindi: "oklch(0.62 0.18 10)"
};
function formatTime(ts) {
  const d = new Date(Number(ts) / 1e6);
  return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}
function MessageBubble({ msg, idx }) {
  const isUser = msg.role === MessageRole.user;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: `flex w-full mb-3 ${isUser ? "justify-end" : "justify-start"}`,
      "data-ocid": `tutor.message.${idx + 1}`,
      children: [
        !isUser && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center mr-2 mt-1 shadow-sm",
            style: { background: "oklch(0.65 0.22 35)" },
            children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm", children: "✨" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: `max-w-[75%] rounded-2xl px-4 py-3 shadow-sm ${isUser ? "rounded-tr-sm" : "rounded-tl-sm"}`,
            style: {
              background: isUser ? "oklch(0.65 0.22 35)" : "oklch(1.0 0.005 75)",
              color: isUser ? "white" : "oklch(0.18 0.02 280)",
              border: isUser ? "none" : "1.5px solid oklch(0.9 0.012 75)"
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold leading-relaxed whitespace-pre-wrap break-words", children: msg.content }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  className: `text-xs mt-1 ${isUser ? "text-white/70" : "text-muted-foreground"}`,
                  children: formatTime(msg.timestamp)
                }
              )
            ]
          }
        ),
        isUser && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ml-2 mt-1 shadow-sm",
            style: { background: "oklch(0.94 0.02 280)" },
            children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm", children: "🧑‍🎓" })
          }
        )
      ]
    }
  );
}
function TypingIndicator() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-end gap-2 mb-3", "data-ocid": "tutor.loading_state", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "w-8 h-8 rounded-full flex items-center justify-center shadow-sm flex-shrink-0",
        style: { background: "oklch(0.65 0.22 35)" },
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm", children: "✨" })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm",
        style: {
          background: "oklch(1.0 0.005 75)",
          border: "1.5px solid oklch(0.9 0.012 75)"
        },
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1 items-center h-5", children: [0, 1, 2].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: "w-2 h-2 rounded-full inline-block",
            style: {
              background: "oklch(0.65 0.22 35)",
              animation: `navu-bounce 1.2s ease-in-out ${i * 0.2}s infinite`
            }
          },
          i
        )) })
      }
    )
  ] });
}
function NoKeyNudge({ onGoToSettings }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex flex-col items-center justify-center flex-1 px-6 text-center gap-5 py-16",
      "data-ocid": "tutor.no_key_state",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "w-28 h-28 rounded-full flex items-center justify-center shadow-lg",
            style: { background: "oklch(0.94 0.08 75)" },
            children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-6xl", children: "🤖" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-black text-foreground", children: "Navu needs a key! 🔑" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-muted-foreground max-w-xs", children: "Set up your AI key in Settings to chat with Navu and get instant explanations!" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "button",
            onClick: onGoToSettings,
            className: "btn-playful text-white px-8",
            style: { background: "oklch(0.65 0.22 35)" },
            "data-ocid": "tutor.go_to_settings_button",
            children: "⚙️ Go to Settings"
          }
        )
      ]
    }
  );
}
const SUGGESTION_CHIPS = [
  "Explain Rational Numbers 🔢",
  "What is Photosynthesis? 🌱",
  "Tell me about the Constitution 🌍",
  "What are Synthetic Fibres? 🧪"
];
function EmptyChat({
  contextLabel,
  onSuggestion
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex flex-col items-center justify-center px-6 text-center gap-5 py-12",
      "data-ocid": "tutor.empty_state",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "w-28 h-28 rounded-full flex items-center justify-center shadow-lg",
            style: { background: "oklch(0.94 0.08 75)" },
            children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-6xl", children: "💬" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-black text-foreground", children: "Ask me anything! 🌟" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-muted-foreground max-w-xs", children: contextLabel ? `Ready to help with ${contextLabel}! Ask your first question ↓` : "Hi! I'm Navu, your Class 8 AI buddy. Ask about Math, Science, Social Science, English or Hindi!" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-2 w-full max-w-xs", children: SUGGESTION_CHIPS.map((chip) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => onSuggestion(chip.replace(/ [\S]+$/u, "").trim()),
            className: "text-left text-sm font-bold px-4 py-2.5 rounded-2xl transition-smooth hover:scale-[1.02] active:scale-95",
            style: {
              background: "oklch(0.65 0.22 35 / 0.1)",
              border: "1.5px solid oklch(0.65 0.22 35 / 0.3)",
              color: "oklch(0.35 0.08 55)"
            },
            children: chip
          },
          chip
        )) })
      ]
    }
  );
}
function Tutor() {
  const ctx = useTutorContext();
  const navigate = useNavigate();
  const { data: messages = [], isLoading: historyLoading } = useChatHistory();
  const { data: keyConfigured, isLoading: keyLoading } = useOpenAIStatus();
  const clearHistory = useClearChatHistory();
  const askAssistant = useAskAssistant();
  const [input, setInput] = reactExports.useState("");
  const listEndRef = reactExports.useRef(null);
  const textareaRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    var _a;
    (_a = listEndRef.current) == null ? void 0 : _a.scrollIntoView({ behavior: "smooth" });
  }, [messages.length, askAssistant.isPending]);
  const contextLabel = ctx.chapterTitle && ctx.subjectName ? `${ctx.subjectName} — ${ctx.chapterTitle}` : ctx.subjectName ?? null;
  const subjectColor = ctx.subjectId ? SUBJECT_COLORS[ctx.subjectId] ?? "oklch(0.65 0.22 35)" : "oklch(0.65 0.22 35)";
  const subjectEmoji = ctx.subjectId ? SUBJECT_EMOJIS[ctx.subjectId] ?? "💡" : "💡";
  function handleSend(text) {
    const raw = (text ?? input).trim();
    if (!raw || askAssistant.isPending) return;
    let prompt = raw;
    if (ctx.chapterTitle && ctx.subjectName && messages.length === 0) {
      prompt = `[Context: Class 8 ${ctx.subjectName}, Chapter: ${ctx.chapterTitle}]

${raw}`;
    }
    setInput("");
    if (textareaRef.current) textareaRef.current.style.height = "auto";
    askAssistant.mutate(prompt, {
      onError: () => ue.error("Navu couldn't respond. Please try again! 😅")
    });
  }
  function handleKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }
  function handleTextareaChange(e) {
    setInput(e.target.value);
    const el = e.target;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 120)}px`;
  }
  function handleClear() {
    clearHistory.mutate(void 0, {
      onSuccess: () => ue.success("✨ Chat cleared! Fresh start!"),
      onError: () => ue.error("Couldn't clear chat.")
    });
  }
  const isLoading = historyLoading || keyLoading;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col min-h-screen", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "sticky top-0 z-20 px-4 pt-12 pb-3 flex items-center gap-3",
        style: {
          background: `linear-gradient(160deg, ${subjectColor}, oklch(0.68 0.2 270))`
        },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => navigate({ to: "/" }),
              className: "w-9 h-9 rounded-full flex items-center justify-center transition-smooth hover:bg-white/20",
              "aria-label": "Go back",
              "data-ocid": "tutor.back_button",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-5 h-5 text-white" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "w-9 h-9 rounded-full flex items-center justify-center shadow-sm flex-shrink-0",
                style: { background: "rgba(255,255,255,0.25)" },
                children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-lg", children: subjectEmoji })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-base font-black text-white leading-tight truncate", children: "Navu AI Tutor ✨" }),
              contextLabel && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-white/80 truncate", children: contextLabel })
            ] })
          ] }),
          messages.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: handleClear,
              disabled: clearHistory.isPending,
              className: "w-9 h-9 rounded-full flex items-center justify-center transition-smooth hover:bg-white/20",
              "aria-label": "Clear chat history",
              "data-ocid": "tutor.clear_button",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-4 h-4 text-white" })
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex-1 overflow-y-auto",
        style: { background: "oklch(0.97 0.008 75)" },
        children: [
          isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-3 p-4 mt-4", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: `flex ${i % 2 === 0 ? "justify-end" : "justify-start"}`,
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "rounded-2xl h-14 animate-pulse",
                  style: {
                    width: `${50 + i * 12}%`,
                    background: i % 2 === 0 ? "oklch(0.65 0.22 35 / 0.2)" : "oklch(0.9 0.01 75)"
                  }
                }
              )
            },
            i
          )) }) : !keyConfigured ? /* @__PURE__ */ jsxRuntimeExports.jsx(NoKeyNudge, { onGoToSettings: () => navigate({ to: "/settings" }) }) : messages.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            EmptyChat,
            {
              contextLabel: contextLabel ?? void 0,
              onSuggestion: (text) => handleSend(text)
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 py-4", children: [
            messages.map((msg, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(MessageBubble, { msg, idx }, String(msg.timestamp))),
            askAssistant.isPending && /* @__PURE__ */ jsxRuntimeExports.jsx(TypingIndicator, {}),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref: listEndRef })
          ] }),
          keyConfigured && !isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2" })
        ]
      }
    ),
    keyConfigured && !isLoading && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "sticky bottom-0 px-4 py-3 safe-area-pb",
        style: {
          background: "oklch(1.0 0.005 75)",
          borderTop: "1.5px solid oklch(0.9 0.012 75)"
        },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex items-end gap-2 rounded-2xl px-4 py-2",
              style: {
                background: "oklch(0.96 0.01 75)",
                border: "1.5px solid oklch(0.88 0.015 75)"
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Sparkles,
                  {
                    className: "w-5 h-5 flex-shrink-0 mb-1.5",
                    style: { color: "oklch(0.65 0.22 35)" }
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "textarea",
                  {
                    ref: textareaRef,
                    value: input,
                    onChange: handleTextareaChange,
                    onKeyDown: handleKeyDown,
                    placeholder: "Ask Navodayans AI...",
                    rows: 1,
                    disabled: askAssistant.isPending,
                    className: "flex-1 resize-none bg-transparent text-sm font-semibold text-foreground placeholder:text-muted-foreground focus:outline-none py-1.5 min-w-0",
                    style: { maxHeight: "120px" },
                    "data-ocid": "tutor.input",
                    "aria-label": "Chat input"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => handleSend(),
                    disabled: !input.trim() || askAssistant.isPending,
                    className: "w-9 h-9 rounded-full flex items-center justify-center transition-smooth active:scale-90 flex-shrink-0 mb-0.5",
                    style: {
                      background: !input.trim() || askAssistant.isPending ? "oklch(0.88 0.01 75)" : "oklch(0.65 0.22 35)"
                    },
                    "aria-label": "Send message",
                    "data-ocid": "tutor.send_button",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "w-4 h-4 text-white" })
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-xs text-muted-foreground mt-1.5 font-semibold", children: "Enter to send · Shift+Enter for new line" })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("style", { children: `
        @keyframes navu-bounce {
          0%, 60%, 100% { transform: translateY(0); }
          30% { transform: translateY(-6px); }
        }
      ` })
  ] });
}
export {
  Tutor as default
};
