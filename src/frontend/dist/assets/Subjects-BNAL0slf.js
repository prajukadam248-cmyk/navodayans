import { c as createLucideIcon, j as jsxRuntimeExports, a as Skeleton, L as Link } from "./index-9NMC6j-R.js";
import { u as useSubjects } from "./useSubjects-B5vKzfHF.js";
import { g as getSubjectColors, a as getSubjectEmoji } from "./subjectColors-soC9M0pk.js";
import "./backend-DUu4WqvQ.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "m12 5 7 7-7 7", key: "xquz4c" }]
];
const ArrowRight = createLucideIcon("arrow-right", __iconNode);
const SUBJECT_DESCRIPTIONS = {
  math: "Numbers, algebra, geometry & more",
  science: "Physics, chemistry & biology",
  social: "History, geography & civics",
  english: "Reading, grammar & writing",
  hindi: "भाषा, व्याकरण और साहित्य"
};
const SUBJECT_CHAPTER_COUNTS = {
  math: 16,
  science: 18,
  social: 19,
  english: 10,
  hindi: 17
};
function Subjects() {
  const { data: subjects, isLoading } = useSubjects();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "px-5 pt-14 pb-7",
        style: {
          background: "linear-gradient(160deg, oklch(0.90 0.13 80) 0%, oklch(0.84 0.11 55) 100%)"
        },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "h1",
            {
              className: "text-3xl font-black leading-tight",
              style: { color: "oklch(0.18 0.05 55)" },
              children: "📚 All Subjects"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              className: "text-sm font-semibold mt-1",
              style: { color: "oklch(0.32 0.06 55)" },
              children: "Class 8 — NCERT Curriculum"
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 py-6 bg-background", children: [
      isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 gap-4", children: [1, 2, 3, 4, 5].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-48 rounded-3xl" }, i)) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 gap-4", children: (subjects ?? []).map((subject, idx) => {
        const colors = getSubjectColors(subject.id);
        const emoji = subject.emoji || getSubjectEmoji(subject.id);
        const desc = SUBJECT_DESCRIPTIONS[subject.id.toLowerCase()] ?? "Explore chapters";
        const chapCount = SUBJECT_CHAPTER_COUNTS[subject.id.toLowerCase()] ?? 10;
        const isLast = idx === ((subjects == null ? void 0 : subjects.length) ?? 0) - 1;
        const totalItems = (subjects == null ? void 0 : subjects.length) ?? 0;
        const isOdd = totalItems % 2 !== 0;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Link,
          {
            to: "/subjects/$subjectId",
            params: { subjectId: subject.id },
            "data-ocid": `subjects.item.${idx + 1}`,
            className: `card-hover rounded-3xl overflow-hidden flex flex-col${isLast && isOdd ? " col-span-2 sm:col-span-1" : ""}`,
            style: {
              boxShadow: `0 4px 20px ${colors.progressColor}30`
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "flex flex-col items-center justify-center pt-7 pb-4 px-3 gap-2",
                  style: { background: colors.progressColor },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        className: "text-5xl leading-none drop-shadow-sm",
                        role: "img",
                        "aria-label": subject.name,
                        children: emoji
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white font-black text-lg text-center leading-tight", children: subject.name })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col flex-1 px-4 py-3 bg-card", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-muted-foreground line-clamp-2 mb-3 flex-1", children: desc }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "span",
                    {
                      className: "text-[10px] font-bold px-2 py-0.5 rounded-full",
                      style: {
                        background: `${colors.progressColor}18`,
                        color: colors.progressColor
                      },
                      children: [
                        chapCount,
                        " Chapters"
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "span",
                    {
                      className: "flex items-center gap-0.5 text-xs font-black transition-smooth",
                      style: { color: colors.progressColor },
                      children: [
                        "Explore ",
                        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-3.5 h-3.5" })
                      ]
                    }
                  )
                ] })
              ] })
            ]
          },
          subject.id
        );
      }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "mt-6 rounded-2xl p-4 flex items-center gap-4",
          style: {
            background: "linear-gradient(135deg, oklch(0.90 0.13 80 / 0.5), oklch(0.94 0.08 270 / 0.4))",
            border: "1.5px solid oklch(0.88 0.08 75)"
          },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-3xl", children: "🎯" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-black text-sm text-foreground", children: "Keep up the great work!" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-muted-foreground", children: "Pick any subject and start your next chapter." })
            ] })
          ]
        }
      )
    ] })
  ] });
}
export {
  Subjects as default
};
