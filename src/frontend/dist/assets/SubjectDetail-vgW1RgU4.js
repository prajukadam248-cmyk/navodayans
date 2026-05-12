import { c as createLucideIcon, u as useParams, j as jsxRuntimeExports, L as Link, a as Skeleton } from "./index-9NMC6j-R.js";
import { B as Button } from "./button-bjKP-KMk.js";
import { u as useBookmarks, a as useAddBookmark, b as useRemoveBookmark } from "./useBookmarks-BkldDSiU.js";
import { u as useChapters } from "./useChapters-X7v_ktb0.js";
import { u as useSubjects } from "./useSubjects-B5vKzfHF.js";
import { g as getSubjectColors } from "./subjectColors-soC9M0pk.js";
import { S as Star } from "./star-BFpjmMdk.js";
import "./backend-DUu4WqvQ.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [["path", { d: "m15 18-6-6 6-6", key: "1wnfg3" }]];
const ChevronLeft = createLucideIcon("chevron-left", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M7.9 20A9 9 0 1 0 4 16.1L2 22Z", key: "vv11sd" }]
];
const MessageCircle = createLucideIcon("message-circle", __iconNode$1);
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
      d: "M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z",
      key: "1xq2db"
    }
  ]
];
const Zap = createLucideIcon("zap", __iconNode);
function ChapterCardSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-card p-4 space-y-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "w-10 h-10 rounded-xl flex-shrink-0" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 flex-1 rounded-lg" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "w-8 h-8 rounded-full flex-shrink-0" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 ml-13", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 flex-1 rounded-full" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 flex-1 rounded-full" })
    ] })
  ] });
}
function ChapterCard({
  chapter,
  subjectId,
  progressColor,
  isBookmarked,
  onBookmarkToggle,
  ocid
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      "data-ocid": ocid,
      className: "rounded-2xl border border-border bg-card p-4 space-y-3 transition-smooth hover:shadow-md",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: "flex items-center justify-center w-10 h-10 rounded-xl text-sm font-black text-white flex-shrink-0",
              style: { background: progressColor },
              children: Number(chapter.number)
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "flex-1 min-w-0 font-bold text-foreground leading-snug line-clamp-2", children: chapter.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              "data-ocid": `${ocid}.bookmark_toggle`,
              onClick: onBookmarkToggle,
              "aria-label": isBookmarked ? "Remove bookmark" : "Add bookmark",
              className: "flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center transition-smooth hover:scale-110 active:scale-95",
              style: {
                background: isBookmarked ? `${progressColor}20` : "transparent",
                border: `1.5px solid ${isBookmarked ? progressColor : "oklch(0.85 0.01 75)"}`
              },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                Star,
                {
                  className: "w-4 h-4 transition-smooth",
                  style: {
                    fill: isBookmarked ? progressColor : "none",
                    stroke: isBookmarked ? progressColor : "oklch(0.6 0.01 75)"
                  }
                }
              )
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 pl-[52px]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Link,
            {
              to: "/tutor",
              search: { subjectId, chapterId: chapter.id },
              "data-ocid": `${ocid}.tutor_link`,
              className: "flex-1",
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  type: "button",
                  variant: "outline",
                  size: "sm",
                  className: "w-full rounded-full text-xs font-bold gap-1.5 btn-playful border-2",
                  style: {
                    borderColor: `${progressColor}60`,
                    color: progressColor
                  },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "w-3.5 h-3.5" }),
                    "Ask Navu"
                  ]
                }
              )
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Link,
            {
              to: "/quiz",
              search: { subjectId, chapterId: chapter.id },
              "data-ocid": `${ocid}.quiz_link`,
              className: "flex-1",
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  type: "button",
                  size: "sm",
                  className: "w-full rounded-full text-xs font-black gap-1.5 btn-playful text-white",
                  style: { background: progressColor },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "w-3.5 h-3.5" }),
                    "Quick Quiz"
                  ]
                }
              )
            }
          )
        ] })
      ]
    }
  );
}
function SubjectDetail() {
  const { subjectId } = useParams({ from: "/subjects/$subjectId" });
  const { data: chapters, isLoading: chaptersLoading } = useChapters(subjectId);
  const { data: subjects } = useSubjects();
  const { data: bookmarks } = useBookmarks();
  const addBookmark = useAddBookmark();
  const removeBookmark = useRemoveBookmark();
  const subject = subjects == null ? void 0 : subjects.find((s) => s.id === subjectId);
  const colors = getSubjectColors(subjectId);
  const bookmarkedIds = new Set((bookmarks ?? []).map((b) => b.chapterId));
  function handleBookmarkToggle(chapter) {
    if (bookmarkedIds.has(chapter.id)) {
      removeBookmark.mutate(chapter.id);
    } else {
      addBookmark.mutate({ chapterId: chapter.id, subjectId });
    }
  }
  const isLoading = chaptersLoading;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        "data-ocid": "subject_detail.header",
        className: "px-5 pt-14 pb-6 relative overflow-hidden",
        style: {
          background: `linear-gradient(135deg, ${colors.progressColor}28 0%, ${colors.progressColor}14 100%)`
        },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "absolute -top-8 -right-8 w-36 h-36 rounded-full opacity-20 pointer-events-none",
              style: { background: colors.progressColor }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Link,
            {
              to: "/subjects",
              "data-ocid": "subject_detail.back_button",
              className: "inline-flex items-center gap-1 text-sm font-bold mb-4 transition-smooth hover:opacity-70",
              style: { color: colors.progressColor },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "w-4 h-4" }),
                "All Subjects"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: "flex items-center justify-center w-16 h-16 rounded-2xl text-3xl flex-shrink-0 shadow-md",
                style: { background: colors.progressColor },
                children: (subject == null ? void 0 : subject.emoji) ?? "📚"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-black text-foreground leading-tight", children: (subject == null ? void 0 : subject.name) ?? subjectId }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-muted-foreground mt-0.5", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-24 mt-1" }) : `${(chapters == null ? void 0 : chapters.length) ?? 0} Chapters • Class 8` })
            ] })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-5 py-5 space-y-3 bg-background pb-24", children: isLoading ? [1, 2, 3, 4, 5].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(ChapterCardSkeleton, {}, i)) : (chapters ?? []).length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        "data-ocid": "subject_detail.empty_state",
        className: "flex flex-col items-center justify-center py-20 text-center",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-6xl mb-4", children: "📖" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xl font-black text-foreground", children: "No chapters yet!" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-muted-foreground mt-2 max-w-xs", children: "Chapters for this subject will appear here soon. Check back later!" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Link,
            {
              to: "/subjects",
              "data-ocid": "subject_detail.empty_state.back_link",
              className: "mt-6 btn-playful px-6 py-2.5 text-sm font-bold text-white rounded-full inline-block",
              style: { background: colors.progressColor },
              children: "Browse Other Subjects"
            }
          )
        ]
      }
    ) : (chapters ?? []).map((chapter, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      ChapterCard,
      {
        chapter,
        subjectId,
        progressColor: colors.progressColor,
        isBookmarked: bookmarkedIds.has(chapter.id),
        onBookmarkToggle: () => handleBookmarkToggle(chapter),
        ocid: `subject_detail.chapter.${idx + 1}`
      },
      chapter.id
    )) })
  ] });
}
export {
  SubjectDetail as default
};
