import { c as createLucideIcon, b as useQueryClient, r as reactExports, e as useSearch, j as jsxRuntimeExports, a as Skeleton, B as BookOpen, L as Link, f as Settings } from "./index-9NMC6j-R.js";
import { u as useActor, c as createActor, a as useQuery } from "./backend-DUu4WqvQ.js";
import { u as useMutation, B as Button } from "./button-bjKP-KMk.js";
import { u as useAskAssistant } from "./useAskAssistant-C3lIPxNH.js";
import { u as useChapters } from "./useChapters-X7v_ktb0.js";
import { u as useSubjects } from "./useSubjects-B5vKzfHF.js";
import { g as getSubjectColors } from "./subjectColors-soC9M0pk.js";
import { C as CircleCheckBig } from "./circle-check-big-VzGSKuEK.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m15 9-6 6", key: "1uzhvr" }],
  ["path", { d: "m9 9 6 6", key: "z0biqf" }]
];
const CircleX = createLucideIcon("circle-x", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8", key: "v9h5vc" }],
  ["path", { d: "M21 3v5h-5", key: "1q7to0" }],
  ["path", { d: "M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16", key: "3uifl3" }],
  ["path", { d: "M8 16H3v5", key: "1cv678" }]
];
const RefreshCw = createLucideIcon("refresh-cw", __iconNode);
function useSaveQuizScore() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      subject,
      chapterId,
      score,
      totalQuestions
    }) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.saveQuizScore(
        subject,
        chapterId,
        BigInt(score),
        BigInt(totalQuestions)
      );
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["quiz-scores"] });
      qc.invalidateQueries({ queryKey: ["progress"] });
    }
  });
}
function parseQuestions(raw) {
  const blocks = raw.split(/\n(?=\s*(?:\d+[.)\s]))/).map((b) => b.trim()).filter(Boolean);
  const results = [];
  for (const block of blocks) {
    const lines = block.split("\n").map((l) => l.trim()).filter(Boolean);
    if (lines.length < 5) continue;
    const questionLine = lines[0].replace(/^\d+[.)\s]+/, "").trim();
    const optionLines = lines.filter((l) => /^[A-Da-d][.)\s]/.test(l));
    if (optionLines.length < 4) continue;
    const options = optionLines.slice(0, 4).map((l) => l.replace(/^[A-Da-d][.)\s]+/, "").trim());
    const answerLine = lines.find(
      (l) => /^(?:Answer|Correct\s*Answer|Ans)[:\s]+[A-Da-d]/i.test(l)
    );
    let correctIndex = 0;
    if (answerLine) {
      const match = answerLine.match(/[A-Da-d]/);
      if (match) {
        correctIndex = match[0].toUpperCase().charCodeAt(0) - 65;
      }
    }
    const explanationLine = lines.find(
      (l) => /^(?:Explanation|Note|Reason)[:\s]/i.test(l)
    );
    const explanation = explanationLine ? explanationLine.replace(/^(?:Explanation|Note|Reason)[:\s]+/i, "").trim() : "Great thinking! Review this topic for more clarity.";
    results.push({
      question: questionLine,
      options,
      correctIndex,
      explanation
    });
    if (results.length === 5) break;
  }
  if (results.length === 0) {
    const fallbackBlocks = raw.split(/\n\n+/).filter(Boolean);
    for (const block of fallbackBlocks) {
      const lines = block.split("\n").map((l) => l.trim()).filter(Boolean);
      if (lines.length < 5) continue;
      const options = lines.slice(1, 5).map((l) => l.replace(/^[A-Da-d][.)\s]+/, "").trim());
      results.push({
        question: lines[0].replace(/^\d+[.)\s]+/, "").trim(),
        options,
        correctIndex: 0,
        explanation: "Review this topic!"
      });
      if (results.length >= 5) break;
    }
  }
  return results;
}
function useOpenAIConfigured() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["openai-configured"],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isMyOpenAIConfigured();
    },
    enabled: !!actor && !isFetching,
    staleTime: 1e3 * 60
  });
}
const CONFETTI = ["🎊", "⭐", "🌟", "✨", "🎉", "🏆", "🎈", "💫"];
function ScoreConfetti({ pct }) {
  if (pct < 60) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1 justify-center flex-wrap", "aria-hidden": "true", children: CONFETTI.slice(0, pct >= 80 ? 8 : 5).map((e) => /* @__PURE__ */ jsxRuntimeExports.jsx(
    "span",
    {
      className: "text-xl animate-bounce",
      style: { animationDelay: `${CONFETTI.indexOf(e) * 0.1}s` },
      children: e
    },
    e
  )) });
}
function Quiz() {
  const [quizState, setQuizState] = reactExports.useState("select");
  const [selectedSubject, setSelectedSubject] = reactExports.useState(null);
  const [selectedChapter, setSelectedChapter] = reactExports.useState(null);
  const [questions, setQuestions] = reactExports.useState([]);
  const [currentQ, setCurrentQ] = reactExports.useState(0);
  const [selectedOption, setSelectedOption] = reactExports.useState(null);
  const [score, setScore] = reactExports.useState(0);
  const [answers, setAnswers] = reactExports.useState([]);
  const [parseError, setParseError] = reactExports.useState(false);
  const { data: subjects, isLoading: subjectsLoading } = useSubjects();
  const { data: chapters, isLoading: chaptersLoading } = useChapters(
    (selectedSubject == null ? void 0 : selectedSubject.id) ?? ""
  );
  const { mutateAsync: ask } = useAskAssistant();
  const { mutate: saveScore } = useSaveQuizScore();
  const { data: isOpenAIConfigured, isLoading: keyLoading } = useOpenAIConfigured();
  const searchParams = useSearch({ strict: false });
  reactExports.useEffect(() => {
    if (!subjects || subjects.length === 0) return;
    const { subjectId } = searchParams;
    if (subjectId && !selectedSubject) {
      const subj = subjects.find((s) => s.id === subjectId);
      if (subj) setSelectedSubject(subj);
    }
  }, [subjects]);
  reactExports.useEffect(() => {
    if (!chapters || chapters.length === 0) return;
    const { chapterId } = searchParams;
    if (chapterId && !selectedChapter) {
      const ch = chapters.find((c) => c.id === chapterId);
      if (ch) setSelectedChapter(ch);
    }
  }, [chapters]);
  async function startQuiz() {
    if (!selectedSubject || !selectedChapter) return;
    setQuizState("loading");
    setParseError(false);
    try {
      const prompt = [
        `Create exactly 5 multiple-choice quiz questions for a Class 8 student about "${selectedChapter.title}" in ${selectedSubject.name}.`,
        "For each question use this exact format (no extra blank lines within a question):",
        "1. [Question text]",
        "A) [Option A]",
        "B) [Option B]",
        "C) [Option C]",
        "D) [Option D]",
        "Answer: [A/B/C/D]",
        "Explanation: [1-2 sentences]",
        "",
        "Separate each question with a blank line. Use simple, clear language suitable for a 13-year-old."
      ].join("\n");
      const raw = await ask(prompt);
      const parsed = parseQuestions(raw);
      if (parsed.length >= 3) {
        setQuestions(parsed.slice(0, 5));
        setCurrentQ(0);
        setScore(0);
        setAnswers([]);
        setSelectedOption(null);
        setQuizState("question");
      } else {
        setParseError(true);
        setQuizState("select");
      }
    } catch {
      setParseError(true);
      setQuizState("select");
    }
  }
  function handleAnswer(optionIdx) {
    if (selectedOption !== null) return;
    setSelectedOption(optionIdx);
    const correct = optionIdx === questions[currentQ].correctIndex;
    if (correct) setScore((s) => s + 1);
    setAnswers((a) => [...a, correct]);
  }
  function nextQuestion() {
    if (currentQ < questions.length - 1) {
      setCurrentQ((q) => q + 1);
      setSelectedOption(null);
    } else {
      if (selectedSubject && selectedChapter) {
        saveScore({
          subject: selectedSubject.id,
          chapterId: selectedChapter.id,
          score,
          totalQuestions: questions.length
        });
      }
      setQuizState("result");
    }
  }
  function resetQuiz() {
    setQuizState("select");
    setSelectedChapter(null);
    setQuestions([]);
    setCurrentQ(0);
    setScore(0);
    setAnswers([]);
    setSelectedOption(null);
    setParseError(false);
  }
  const colors = selectedSubject ? getSubjectColors(selectedSubject.id) : getSubjectColors("math");
  if (quizState === "loading") {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center min-h-screen gap-5 px-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-6xl animate-bounce block", children: "🧠" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: "absolute -top-1 -right-2 text-2xl animate-spin",
            style: { animationDuration: "2s" },
            children: "✨"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center space-y-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xl font-black text-foreground", children: "Navu is thinking…" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-semibold text-muted-foreground", children: [
          "Generating your quiz for ",
          selectedChapter == null ? void 0 : selectedChapter.title,
          "!"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-48 space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-full rounded-full" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-3/4 rounded-full" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-5/6 rounded-full" })
      ] })
    ] });
  }
  if (quizState === "result") {
    const pct = Math.round(score / questions.length * 100);
    const emoji = pct >= 80 ? "🏆" : pct >= 60 ? "👍" : "💪";
    const message = pct >= 80 ? "Brilliant work! You're a star!" : pct >= 60 ? "Good job! Keep practising!" : "Don't give up! Every attempt helps you learn!";
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col min-h-screen", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "px-5 pt-14 pb-6",
          style: { background: `${colors.progressColor}20` },
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              BookOpen,
              {
                className: "w-5 h-5",
                style: { color: colors.progressColor }
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "span",
              {
                className: "text-sm font-black",
                style: { color: colors.progressColor },
                children: [
                  selectedSubject == null ? void 0 : selectedSubject.name,
                  " — ",
                  selectedChapter == null ? void 0 : selectedChapter.title
                ]
              }
            )
          ] })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 flex flex-col items-center justify-center px-5 gap-6 py-8 bg-background text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ScoreConfetti, { pct }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-7xl", children: emoji }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-black text-foreground", children: "Quiz Complete!" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-muted-foreground mt-1", children: message })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "w-full max-w-xs py-6 px-8 rounded-3xl",
            style: {
              background: `${colors.progressColor}12`,
              border: `2px solid ${colors.progressColor}35`
            },
            "data-ocid": "quiz.result_card",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "p",
                {
                  className: "text-6xl font-black",
                  style: { color: colors.progressColor },
                  children: [
                    pct,
                    "%"
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-lg font-bold text-foreground mt-1", children: [
                score,
                " / ",
                questions.length,
                " correct"
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2", "aria-label": "Question results", children: answers.map((correct, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "w-8 h-8 rounded-full flex items-center justify-center text-sm",
            style: {
              background: correct ? "oklch(0.62 0.18 145 / 0.15)" : "oklch(0.6 0.2 25 / 0.12)",
              border: `2px solid ${correct ? "oklch(0.62 0.18 145)" : "oklch(0.6 0.2 25)"}`
            },
            "aria-label": `Question ${i + 1}: ${correct ? "correct" : "wrong"}`,
            children: correct ? "✓" : "✗"
          },
          `answer-${i}-${correct ? "ok" : "ng"}`
        )) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-xs space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              type: "button",
              onClick: resetQuiz,
              "data-ocid": "quiz.try_again_button",
              className: "btn-playful w-full py-4 text-base font-black text-white",
              style: { background: colors.progressColor },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-4 h-4 mr-2" }),
                " Try Another Quiz"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/subjects", className: "block", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              variant: "outline",
              "data-ocid": "quiz.subjects_button",
              className: "w-full py-4 text-base font-bold rounded-full",
              children: "📚 Back to Subjects"
            }
          ) })
        ] })
      ] })
    ] });
  }
  if (quizState === "question" && questions.length > 0) {
    const q = questions[currentQ];
    const OPTION_LABELS = ["A", "B", "C", "D"];
    const answered = selectedOption !== null;
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col min-h-screen", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "px-5 pt-14 pb-5 flex-shrink-0",
          style: { background: `${colors.progressColor}18` },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "span",
                {
                  className: "text-xs font-black truncate max-w-[65%]",
                  style: { color: colors.progressColor },
                  children: [
                    selectedSubject == null ? void 0 : selectedSubject.name,
                    " — ",
                    selectedChapter == null ? void 0 : selectedChapter.title
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-bold text-muted-foreground", children: [
                currentQ + 1,
                " / ",
                questions.length
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-2.5 bg-border rounded-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "h-full rounded-full transition-smooth",
                style: {
                  width: `${(currentQ + 1) / questions.length * 100}%`,
                  background: colors.progressColor
                }
              }
            ) })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 px-5 py-6 bg-background overflow-y-auto", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1.5 mb-4", "aria-hidden": "true", children: questions.map((qItem, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "h-1.5 flex-1 rounded-full",
            style: {
              background: i < currentQ ? answers[i] ? "oklch(0.62 0.18 145)" : "oklch(0.6 0.2 25)" : i === currentQ ? colors.progressColor : "oklch(0.88 0.015 280)",
              opacity: i === currentQ ? 1 : 0.6
            }
          },
          qItem.question.slice(0, 20)
        )) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-base font-black text-foreground mb-5 leading-snug", children: q.question }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: q.options.map((opt, i) => {
          let optBg = "oklch(0.99 0.003 75)";
          let optBorder = "oklch(0.88 0.015 280)";
          let optText = "oklch(0.25 0.02 280)";
          let icon = null;
          if (answered) {
            if (i === q.correctIndex) {
              optBg = "oklch(0.62 0.18 145 / 0.14)";
              optBorder = "oklch(0.62 0.18 145)";
              optText = "oklch(0.28 0.12 145)";
              icon = /* @__PURE__ */ jsxRuntimeExports.jsx(
                CircleCheckBig,
                {
                  className: "w-5 h-5 flex-shrink-0",
                  style: { color: "oklch(0.52 0.18 145)" }
                }
              );
            } else if (i === selectedOption) {
              optBg = "oklch(0.6 0.2 25 / 0.1)";
              optBorder = "oklch(0.6 0.2 25)";
              optText = "oklch(0.3 0.1 25)";
              icon = /* @__PURE__ */ jsxRuntimeExports.jsx(
                CircleX,
                {
                  className: "w-5 h-5 flex-shrink-0",
                  style: { color: "oklch(0.55 0.2 25)" }
                }
              );
            }
          }
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => handleAnswer(i),
              "data-ocid": `quiz.option.${i + 1}`,
              disabled: answered,
              className: "w-full flex items-center gap-3 p-4 rounded-2xl border text-left font-semibold transition-smooth hover:scale-[1.015] disabled:cursor-default",
              style: {
                background: optBg,
                borderColor: optBorder,
                color: optText
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black text-white",
                    style: {
                      background: answered && i === q.correctIndex ? "oklch(0.52 0.18 145)" : i === selectedOption && answered ? "oklch(0.55 0.2 25)" : colors.progressColor
                    },
                    children: OPTION_LABELS[i]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex-1 text-sm min-w-0", children: opt || "Option" }),
                icon
              ]
            },
            opt.slice(0, 20) || String(i)
          );
        }) }),
        answered && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "mt-5 p-4 rounded-2xl",
            style: {
              background: selectedOption === q.correctIndex ? "oklch(0.62 0.18 145 / 0.1)" : "oklch(0.6 0.2 25 / 0.08)",
              border: `1px solid ${selectedOption === q.correctIndex ? "oklch(0.62 0.18 145 / 0.3)" : "oklch(0.6 0.2 25 / 0.25)"}`
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-black mb-1", children: selectedOption === q.correctIndex ? "✅ Correct!" : "❌ Not quite!" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-semibold text-foreground leading-relaxed", children: [
                "💡 ",
                q.explanation
              ] })
            ]
          }
        )
      ] }),
      answered && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-5 pb-6 pt-3 flex-shrink-0 bg-background border-t border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          type: "button",
          onClick: nextQuestion,
          "data-ocid": "quiz.next_button",
          className: "w-full py-4 text-base font-black btn-playful text-white",
          style: { background: colors.progressColor },
          children: currentQ < questions.length - 1 ? "Next Question →" : "See Results 🎉"
        }
      ) })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "px-5 pt-14 pb-6",
        style: {
          background: "linear-gradient(160deg, oklch(0.88 0.12 75), oklch(0.82 0.1 55))"
        },
        "data-ocid": "quiz.page",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "h1",
            {
              className: "text-3xl font-black",
              style: { color: "oklch(0.2 0.04 55)" },
              children: "❓ Practice Quiz"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              className: "text-sm font-semibold mt-1",
              style: { color: "oklch(0.35 0.05 55)" },
              children: "Test your knowledge chapter by chapter!"
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-5 py-6 space-y-6 bg-background", children: [
      !keyLoading && isOpenAIConfigured === false && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "rounded-2xl p-4 flex items-start gap-3",
          style: {
            background: "oklch(0.65 0.22 35 / 0.08)",
            border: "1.5px solid oklch(0.65 0.22 35 / 0.35)"
          },
          "data-ocid": "quiz.no_key_nudge",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl flex-shrink-0", children: "🔑" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  className: "text-sm font-black",
                  style: { color: "oklch(0.3 0.1 35)" },
                  children: "Navu needs your API key!"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  className: "text-xs font-semibold mt-0.5",
                  style: { color: "oklch(0.45 0.08 35)" },
                  children: "Add your OpenAI key in Settings to generate quizzes."
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/settings", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                type: "button",
                size: "sm",
                className: "btn-playful text-white flex-shrink-0 text-xs",
                style: { background: "oklch(0.65 0.22 35)" },
                "data-ocid": "quiz.go_to_settings_button",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Settings, { className: "w-3 h-3 mr-1" }),
                  "Settings"
                ]
              }
            ) })
          ]
        }
      ),
      parseError && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "rounded-2xl p-4 flex items-center gap-3",
          style: {
            background: "oklch(0.6 0.2 25 / 0.08)",
            border: "1.5px solid oklch(0.6 0.2 25 / 0.3)"
          },
          "data-ocid": "quiz.error_state",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl", children: "😅" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-bold text-foreground", children: "Navu had trouble making the quiz. Please try again!" })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-base font-black text-foreground mb-3", children: "1. Pick a subject" }),
        subjectsLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-2", children: [1, 2, 3, 4, 5].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-16 rounded-2xl" }, i)) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-2", children: (subjects ?? []).map((s) => {
          const c = getSubjectColors(s.id);
          const active = (selectedSubject == null ? void 0 : selectedSubject.id) === s.id;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => {
                setSelectedSubject(s);
                setSelectedChapter(null);
              },
              "data-ocid": `quiz.subject_select.${s.id}`,
              className: "flex flex-col items-center gap-1 p-3 rounded-2xl transition-smooth hover:scale-[1.03] font-bold text-xs",
              style: {
                background: active ? `${c.progressColor}22` : "oklch(0.97 0.01 75)",
                border: `2px solid ${active ? c.progressColor : "oklch(0.9 0.01 75)"}`,
                color: active ? c.progressColor : "oklch(0.45 0.01 280)"
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl", children: s.emoji || "📚" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate w-full text-center text-[11px]", children: s.name })
              ]
            },
            s.id
          );
        }) })
      ] }),
      selectedSubject && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-base font-black text-foreground mb-3", children: "2. Pick a chapter" }),
        chaptersLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-12 rounded-xl" }, i)) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: (chapters ?? []).map((ch, idx) => {
          const c = getSubjectColors(selectedSubject.id);
          const active = (selectedChapter == null ? void 0 : selectedChapter.id) === ch.id;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => setSelectedChapter(ch),
              "data-ocid": `quiz.chapter_select.${idx + 1}`,
              className: "w-full flex items-center gap-3 p-3 rounded-xl text-left transition-smooth hover:scale-[1.01] font-semibold text-sm",
              style: {
                background: active ? `${c.progressColor}15` : "oklch(0.98 0.005 75)",
                border: `1.5px solid ${active ? c.progressColor : "oklch(0.9 0.01 75)"}`
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "w-7 h-7 rounded-lg flex items-center justify-center text-[11px] font-black text-white flex-shrink-0",
                    style: { background: c.progressColor },
                    children: Number(ch.number)
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex-1 text-foreground min-w-0 truncate", children: ch.title }),
                active && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  CircleCheckBig,
                  {
                    className: "w-4 h-4 flex-shrink-0",
                    style: { color: c.progressColor }
                  }
                )
              ]
            },
            ch.id
          );
        }) })
      ] }),
      selectedChapter && /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          type: "button",
          onClick: startQuiz,
          disabled: !isOpenAIConfigured,
          "data-ocid": "quiz.start_button",
          className: "w-full py-5 text-base font-black rounded-2xl text-white btn-playful",
          style: {
            background: isOpenAIConfigured ? colors.progressColor : "oklch(0.7 0.01 280)"
          },
          children: isOpenAIConfigured === false ? "🔑 API Key Required" : "Generate Quiz ✨"
        }
      )
    ] })
  ] });
}
export {
  Quiz as default
};
