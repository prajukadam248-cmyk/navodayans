import { c as createLucideIcon, j as jsxRuntimeExports, g as cn, a as Skeleton, B as BookOpen, T as TrendingUp } from "./index-9NMC6j-R.js";
import { S as Slot, c as cva, B as Button } from "./button-bjKP-KMk.js";
import { C as Card, a as CardContent } from "./card-JQI9Jozo.js";
import { u as useBookmarks, b as useRemoveBookmark } from "./useBookmarks-BkldDSiU.js";
import { u as useProgressSummary, a as useRecentQuizScores } from "./useProgress-D-MNHSXX.js";
import { g as getSubjectColors } from "./subjectColors-soC9M0pk.js";
import { S as Star } from "./star-BFpjmMdk.js";
import "./backend-DUu4WqvQ.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2Z", key: "169p4p" }],
  ["path", { d: "m14.5 7.5-5 5", key: "3lb6iw" }],
  ["path", { d: "m9.5 7.5 5 5", key: "ko136h" }]
];
const BookmarkX = createLucideIcon("bookmark-x", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    {
      d: "M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z",
      key: "l5xja"
    }
  ],
  [
    "path",
    {
      d: "M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z",
      key: "ep3f8r"
    }
  ],
  ["path", { d: "M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4", key: "1p4c4q" }],
  ["path", { d: "M17.599 6.5a3 3 0 0 0 .399-1.375", key: "tmeiqw" }],
  ["path", { d: "M6.003 5.125A3 3 0 0 0 6.401 6.5", key: "105sqy" }],
  ["path", { d: "M3.477 10.896a4 4 0 0 1 .585-.396", key: "ql3yin" }],
  ["path", { d: "M19.938 10.5a4 4 0 0 1 .585.396", key: "1qfode" }],
  ["path", { d: "M6 18a4 4 0 0 1-1.967-.516", key: "2e4loj" }],
  ["path", { d: "M19.967 17.484A4 4 0 0 1 18 18", key: "159ez6" }]
];
const Brain = createLucideIcon("brain", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M6 9H4.5a2.5 2.5 0 0 1 0-5H6", key: "17hqa7" }],
  ["path", { d: "M18 9h1.5a2.5 2.5 0 0 0 0-5H18", key: "lmptdp" }],
  ["path", { d: "M4 22h16", key: "57wxv0" }],
  ["path", { d: "M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22", key: "1nw9bq" }],
  ["path", { d: "M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22", key: "1np0yb" }],
  ["path", { d: "M18 2H6v7a6 6 0 0 0 12 0V2Z", key: "u46fv3" }]
];
const Trophy = createLucideIcon("trophy", __iconNode);
const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
        secondary: "border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
        destructive: "border-transparent bg-destructive text-destructive-foreground [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline: "text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
function Badge({
  className,
  variant,
  asChild = false,
  ...props
}) {
  const Comp = asChild ? Slot : "span";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Comp,
    {
      "data-slot": "badge",
      className: cn(badgeVariants({ variant }), className),
      ...props
    }
  );
}
const SUBJECT_NAMES = {
  math: "Mathematics",
  science: "Science",
  social: "Social Science",
  english: "English",
  hindi: "Hindi"
};
const CHAPTER_NAMES = {
  ch1: "Chapter 1",
  ch2: "Chapter 2",
  ch3: "Chapter 3",
  ch4: "Chapter 4",
  ch5: "Chapter 5",
  ch6: "Chapter 6",
  ch7: "Chapter 7",
  ch8: "Chapter 8",
  ch9: "Chapter 9",
  ch10: "Chapter 10"
};
function getChapterLabel(chapterId) {
  return CHAPTER_NAMES[chapterId] ?? chapterId.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}
function getSubjectLabel(subjectId) {
  return SUBJECT_NAMES[subjectId.toLowerCase()] ?? subjectId;
}
function formatDate(timestamp) {
  const ms = Number(timestamp / 1000000n);
  const d = new Date(ms);
  if (Number.isNaN(d.getTime())) return "Recent";
  return d.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric"
  });
}
function getScoreColor(score) {
  if (score >= 80) return "text-[oklch(0.55_0.18_145)]";
  if (score >= 50) return "text-[oklch(0.60_0.2_55)]";
  return "text-[oklch(0.60_0.2_25)]";
}
function getScoreEmoji(score) {
  if (score >= 90) return "🏆";
  if (score >= 80) return "⭐";
  if (score >= 60) return "👍";
  if (score >= 40) return "💪";
  return "📚";
}
function StatCard({
  label,
  value,
  icon,
  colorClass,
  bgClass,
  ocid
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Card,
    {
      "data-ocid": ocid,
      className: `rounded-2xl border-0 shadow-md ${bgClass} overflow-hidden`,
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-4 flex flex-col gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: `w-10 h-10 rounded-xl flex items-center justify-center ${colorClass}`,
            children: icon
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-extrabold text-foreground leading-none", children: value }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wide", children: label })
      ] })
    }
  );
}
function Progress() {
  const { data: progress, isLoading: progressLoading } = useProgressSummary();
  const { data: bookmarks = [], isLoading: bookmarksLoading } = useBookmarks();
  const { data: quizScores = [], isLoading: scoresLoading } = useRecentQuizScores(5);
  const removeBookmark = useRemoveBookmark();
  const totalBookmarks = progress ? Number(progress.totalBookmarks) : 0;
  const chaptersCompleted = progress ? Number(progress.totalCompleted) : 0;
  const quizzesTaken = progress ? Number(progress.totalQuizzesTaken) : 0;
  const avgScore = progress ? Number(progress.avgScore) : 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl mx-auto pb-8", "data-ocid": "progress.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gradient-to-r from-[oklch(0.68_0.2_270)] to-[oklch(0.65_0.2_230)] px-5 pt-6 pb-8 rounded-b-3xl shadow-lg", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-3xl", children: "📊" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-extrabold text-white tracking-tight", children: "My Progress" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/80 text-sm font-medium pl-1", children: "Track your journey — every step counts! 🌟" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 -mt-4 space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("section", { "data-ocid": "progress.stats.section", children: progressLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-3", children: [1, 2, 3, 4].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-28 rounded-2xl" }, i)) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          StatCard,
          {
            ocid: "progress.stat.bookmarks",
            label: "Total Bookmarks",
            value: totalBookmarks,
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-5 h-5 text-white" }),
            colorClass: "subject-english",
            bgClass: "bg-[oklch(0.97_0.04_230)]"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          StatCard,
          {
            ocid: "progress.stat.completed",
            label: "Chapters Done",
            value: chaptersCompleted,
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-5 h-5 text-white" }),
            colorClass: "subject-math",
            bgClass: "bg-[oklch(0.97_0.04_35)]"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          StatCard,
          {
            ocid: "progress.stat.quizzes",
            label: "Quizzes Taken",
            value: quizzesTaken,
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Brain, { className: "w-5 h-5 text-white" }),
            colorClass: "subject-science",
            bgClass: "bg-[oklch(0.97_0.04_125)]"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          StatCard,
          {
            ocid: "progress.stat.avgscore",
            label: "Average Score",
            value: quizzesTaken > 0 ? `${avgScore}%` : "–",
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-5 h-5 text-white" }),
            colorClass: "subject-hindi",
            bgClass: "bg-[oklch(0.97_0.04_10)]"
          }
        )
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "data-ocid": "progress.bookmarks.section", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl", children: "🔖" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-extrabold text-foreground", children: "Saved Chapters" })
        ] }),
        bookmarksLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-16 rounded-2xl" }, i)) }) : bookmarks.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          Card,
          {
            className: "rounded-2xl border-dashed border-2 border-border shadow-none bg-card",
            "data-ocid": "progress.bookmarks.empty_state",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-6 text-center space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-3xl", children: "🌟" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-foreground", children: "No bookmarks yet!" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Tap the bookmark icon on any chapter to save it here. Keep studying! 📚" })
            ] })
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: bookmarks.map((bm, idx) => {
          const colors = getSubjectColors(bm.subjectId);
          return /* @__PURE__ */ jsxRuntimeExports.jsx(
            Card,
            {
              "data-ocid": `progress.bookmarks.item.${idx + 1}`,
              className: "rounded-2xl border-0 shadow-sm bg-card overflow-hidden",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 p-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: `w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center text-lg ${colors.bgClass}`,
                    children: colors.emoji
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-sm text-foreground truncate", children: getChapterLabel(bm.chapterId) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Badge,
                    {
                      variant: "secondary",
                      className: `mt-0.5 text-xs px-2 py-0 rounded-full border ${colors.borderClass} ${colors.lightBg} text-foreground font-semibold`,
                      children: getSubjectLabel(bm.subjectId)
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    type: "button",
                    variant: "ghost",
                    size: "icon",
                    "data-ocid": `progress.bookmarks.delete_button.${idx + 1}`,
                    className: "flex-shrink-0 h-8 w-8 rounded-xl text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-smooth",
                    onClick: () => removeBookmark.mutate(bm.chapterId),
                    "aria-label": `Remove bookmark for ${getChapterLabel(bm.chapterId)}`,
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(BookmarkX, { className: "w-4 h-4" })
                  }
                )
              ] }) })
            },
            `${bm.chapterId}-${idx}`
          );
        }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "data-ocid": "progress.scores.section", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl", children: "🏅" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-extrabold text-foreground", children: "Recent Quiz Scores" })
        ] }),
        scoresLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-16 rounded-2xl" }, i)) }) : quizScores.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          Card,
          {
            className: "rounded-2xl border-dashed border-2 border-border shadow-none bg-card",
            "data-ocid": "progress.scores.empty_state",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-6 text-center space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-3xl", children: "💪" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-foreground", children: "No quizzes taken yet!" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Keep studying to see your progress here! Take a quiz to get started. 🚀" })
            ] })
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: quizScores.map((qs, idx) => {
          const colors = getSubjectColors(qs.subject);
          const scorePercent = qs.totalQuestions > 0n ? Number(qs.score * 100n / qs.totalQuestions) : 0;
          return /* @__PURE__ */ jsxRuntimeExports.jsx(
            Card,
            {
              "data-ocid": `progress.scores.item.${idx + 1}`,
              className: "rounded-2xl border-0 shadow-sm bg-card overflow-hidden",
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 p-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: `w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center text-xl ${colors.bgClass}`,
                      children: getScoreEmoji(scorePercent)
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-sm text-foreground truncate", children: getChapterLabel(qs.chapterId) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mt-0.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Badge,
                        {
                          variant: "secondary",
                          className: `text-xs px-2 py-0 rounded-full border ${colors.borderClass} ${colors.lightBg} text-foreground font-semibold`,
                          children: getSubjectLabel(qs.subject)
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: formatDate(qs.takenAt) })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-end flex-shrink-0", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "span",
                      {
                        className: `text-xl font-extrabold ${getScoreColor(scorePercent)}`,
                        children: [
                          scorePercent,
                          "%"
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
                      Number(qs.score),
                      "/",
                      Number(qs.totalQuestions)
                    ] })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-3 pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1.5 rounded-full bg-muted overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "h-full rounded-full transition-smooth",
                    style: {
                      width: `${scorePercent}%`,
                      background: colors.progressColor
                    }
                  }
                ) }) })
              ] })
            },
            `${qs.subject}-${qs.chapterId}-${idx}`
          );
        }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "rounded-2xl border-0 shadow-md bg-gradient-to-r from-[oklch(0.65_0.22_35)] to-[oklch(0.62_0.18_55)] overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-5 flex items-center gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-4xl", children: "🌟" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-extrabold text-white text-base", children: "You're doing great!" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/80 text-sm", children: "Every chapter you study brings you closer to your goals. Keep it up! 🚀" })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-2 py-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-4 h-4 text-muted-foreground" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-semibold", children: "Keep studying to unlock more achievements! 🏆" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { className: "w-4 h-4 text-muted-foreground" })
      ] })
    ] })
  ] });
}
export {
  Progress as default
};
