import { c as createLucideIcon, j as jsxRuntimeExports, L as Link, S as Sparkles, a as Skeleton } from "./index-9NMC6j-R.js";
import { u as useProgressSummary } from "./useProgress-D-MNHSXX.js";
import { u as useSubjects } from "./useSubjects-B5vKzfHF.js";
import { g as getSubjectColors } from "./subjectColors-soC9M0pk.js";
import { S as Star } from "./star-BFpjmMdk.js";
import { C as CircleCheckBig } from "./circle-check-big-VzGSKuEK.js";
import "./backend-DUu4WqvQ.js";
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
      d: "M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z",
      key: "96xj49"
    }
  ]
];
const Flame = createLucideIcon("flame", __iconNode);
const SUBJECT_HINTS = {
  math: {
    chapter: "Chapter 1: Rational Numbers",
    done: 3,
    total: 10,
    cta: "Continue"
  },
  science: {
    chapter: "Chapter 3: Synthetic Fibres",
    done: 0,
    total: 12,
    cta: "Start"
  },
  social: {
    chapter: "Chapter 1: The Indian Constitution",
    done: 5,
    total: 14,
    cta: "Continue"
  },
  english: { chapter: "Unit 2: The Tsunami", done: 2, total: 8, cta: "Read" },
  hindi: { chapter: "पाठ 4: दीवानों की हस्ती", done: 0, total: 9, cta: "शुरू करें" }
};
const TOTAL_CHAPTERS = 55;
function Home() {
  const { data: subjects, isLoading: subjectsLoading } = useSubjects();
  const { data: progress } = useProgressSummary();
  const completed = Number((progress == null ? void 0 : progress.totalCompleted) ?? 0);
  const avgScore = Number((progress == null ? void 0 : progress.avgScore) ?? 88);
  const completedPct = Math.round(completed / TOTAL_CHAPTERS * 100);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "px-5 pt-12 pb-8",
        style: {
          background: "linear-gradient(160deg, oklch(0.90 0.13 80) 0%, oklch(0.84 0.11 55) 100%)"
        },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl", children: "💡" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "text-lg font-black tracking-tight",
                  style: { color: "oklch(0.22 0.06 55)" },
                  children: "Navodayans"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Link,
              {
                to: "/tutor",
                "data-ocid": "home.chat_navu_button",
                "aria-label": "Chat with Navu AI Tutor",
                className: "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-bold transition-smooth hover:scale-105 active:scale-95",
                style: {
                  background: "oklch(1 0 0 / 0.88)",
                  color: "oklch(0.28 0.06 55)",
                  boxShadow: "0 2px 8px oklch(0.6 0.2 35 / 0.2)"
                },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Sparkles,
                    {
                      className: "w-4 h-4",
                      style: { color: "oklch(0.62 0.22 35)" }
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Chat Navu" })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "h1",
            {
              className: "text-3xl font-black mb-1 leading-tight",
              style: { color: "oklch(0.18 0.05 55)" },
              children: "Namaste! 👋"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              className: "text-base font-semibold",
              style: { color: "oklch(0.32 0.06 55)" },
              children: "Let's explore your studies today!"
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 py-6 bg-background", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-black text-foreground", children: "Your Subjects" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: "text-xs font-bold px-2.5 py-1 rounded-full",
            style: {
              background: "oklch(0.90 0.13 80 / 0.4)",
              color: "oklch(0.28 0.06 55)"
            },
            children: "8th Grade"
          }
        )
      ] }),
      subjectsLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
        [1, 2, 3, 4].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-40 rounded-2xl" }, i)),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-40 rounded-2xl col-span-2" })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-3", children: (subjects ?? []).map((subject, idx) => {
        const colors = getSubjectColors(subject.id);
        const hint = SUBJECT_HINTS[subject.id.toLowerCase()] ?? {
          chapter: "Chapter 1",
          done: 0,
          total: 10,
          cta: "Start"
        };
        const pct = hint.total > 0 ? hint.done / hint.total * 100 : 0;
        const isLast = idx === ((subjects == null ? void 0 : subjects.length) ?? 0) - 1;
        const isOdd = ((subjects == null ? void 0 : subjects.length) ?? 0) % 2 !== 0;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Link,
          {
            to: "/subjects/$subjectId",
            params: { subjectId: subject.id },
            "data-ocid": `home.subject_card.${idx + 1}`,
            className: `card-hover rounded-2xl p-4 flex flex-col${isLast && isOdd ? " col-span-2" : ""}`,
            style: {
              background: `${colors.progressColor}1a`,
              border: `1.5px solid ${colors.progressColor}45`
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "flex items-center justify-center w-10 h-10 rounded-xl text-white text-lg font-black flex-shrink-0",
                    style: { background: colors.progressColor },
                    children: subject.emoji || ["📐", "🔬", "🌍", "📖", "प"][idx] || "📚"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-black text-sm text-foreground leading-tight", children: subject.name })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-muted-foreground mb-2 line-clamp-2 flex-1", children: hint.chapter }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 h-1.5 bg-border rounded-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "h-full rounded-full transition-smooth",
                    style: {
                      width: `${pct}%`,
                      background: colors.progressColor
                    }
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] font-bold text-muted-foreground whitespace-nowrap", children: [
                  hint.done,
                  "/",
                  hint.total
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  className: "w-full py-1.5 rounded-xl text-sm font-bold transition-smooth hover:opacity-90 active:scale-95",
                  style: {
                    background: "oklch(1 0 0 / 0.85)",
                    color: "oklch(0.2 0.03 280)"
                  },
                  children: hint.cta
                }
              )
            ]
          },
          subject.id
        );
      }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 pb-8", style: { background: "oklch(0.96 0.015 75)" }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-black text-foreground mb-4 pt-5", children: "Your Progress Dashboard" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-3 mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "rounded-2xl p-3 flex flex-col items-center text-center",
            style: {
              background: "oklch(1 0 0 / 0.92)",
              border: "1.5px solid oklch(0.9 0.025 75)"
            },
            "data-ocid": "home.progress.chapters",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-14 h-14 mb-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "svg",
                  {
                    viewBox: "0 0 56 56",
                    className: "w-full h-full -rotate-90",
                    "aria-hidden": "true",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "circle",
                        {
                          cx: "28",
                          cy: "28",
                          r: "22",
                          fill: "none",
                          stroke: "oklch(0.91 0.04 75)",
                          strokeWidth: "5"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "circle",
                        {
                          cx: "28",
                          cy: "28",
                          r: "22",
                          fill: "none",
                          stroke: "oklch(0.65 0.22 35)",
                          strokeWidth: "5",
                          strokeDasharray: `${2 * Math.PI * 22}`,
                          strokeDashoffset: `${2 * Math.PI * 22 * (1 - completedPct / 100)}`,
                          strokeLinecap: "round"
                        }
                      )
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "absolute inset-0 flex items-center justify-center text-[9px] font-black text-foreground", children: [
                  completedPct,
                  "%"
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-semibold text-muted-foreground", children: "Chapters Completed" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-black text-foreground", children: [
                completed,
                "/",
                TOTAL_CHAPTERS
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "rounded-2xl p-3 flex flex-col items-center text-center",
            style: {
              background: "oklch(1 0 0 / 0.92)",
              border: "1.5px solid oklch(0.9 0.025 75)"
            },
            "data-ocid": "home.progress.quiz_score",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-0.5 mb-1", children: [1, 2, 3].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                Star,
                {
                  className: "w-4 h-4 fill-[oklch(0.78_0.18_75)] text-[oklch(0.78_0.18_75)]"
                },
                s
              )) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "p",
                {
                  className: "text-2xl font-black",
                  style: { color: "oklch(0.55 0.18 75)" },
                  children: [
                    avgScore,
                    "%"
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-semibold text-muted-foreground", children: "Quiz Score Avg" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "rounded-2xl p-3 flex flex-col items-center text-center",
            style: {
              background: "oklch(1 0 0 / 0.92)",
              border: "1.5px solid oklch(0.9 0.025 75)"
            },
            "data-ocid": "home.progress.streak",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Flame,
                {
                  className: "w-8 h-8 mb-1",
                  style: { color: "oklch(0.62 0.22 35)" }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-black text-foreground", children: "7" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-semibold text-muted-foreground", children: "Study Streak Days" })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Link,
          {
            to: "/tutor",
            "data-ocid": "home.quick_tutor_button",
            className: "flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl font-bold text-sm text-white transition-smooth hover:scale-[1.02] active:scale-[0.98]",
            style: {
              background: "linear-gradient(135deg, oklch(0.65 0.22 35), oklch(0.68 0.2 270))"
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-4 h-4" }),
              " Ask AI Tutor"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Link,
          {
            to: "/quiz",
            "data-ocid": "home.quick_quiz_button",
            className: "flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl font-bold text-sm text-white transition-smooth hover:scale-[1.02] active:scale-[0.98]",
            style: {
              background: "linear-gradient(135deg, oklch(0.62 0.18 125), oklch(0.65 0.2 230))"
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-4 h-4" }),
              " Quick Quiz"
            ]
          }
        )
      ] })
    ] })
  ] });
}
export {
  Home as default
};
