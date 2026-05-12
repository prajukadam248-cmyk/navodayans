import { createActor } from "@/backend";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useAskAssistant } from "@/hooks/useAskAssistant";
import { useChapters } from "@/hooks/useChapters";
import { useSaveQuizScore } from "@/hooks/useQuizScore";
import { useSubjects } from "@/hooks/useSubjects";
import type { Chapter, Subject } from "@/types";
import { getSubjectColors } from "@/utils/subjectColors";
import { useActor } from "@caffeineai/core-infrastructure";
import { useQuery } from "@tanstack/react-query";
import { Link, useSearch } from "@tanstack/react-router";
import {
  BookOpen,
  CheckCircle,
  RefreshCw,
  Settings,
  XCircle,
} from "lucide-react";
import { useEffect, useState } from "react";

type QuizState = "select" | "loading" | "question" | "result";

interface ParsedQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

// Robustly parse AI output into structured question objects
function parseQuestions(raw: string): ParsedQuestion[] {
  const blocks = raw
    .split(/\n(?=\s*(?:\d+[.)\s]))/)
    .map((b) => b.trim())
    .filter(Boolean);

  const results: ParsedQuestion[] = [];

  for (const block of blocks) {
    const lines = block
      .split("\n")
      .map((l) => l.trim())
      .filter(Boolean);
    if (lines.length < 5) continue;

    const questionLine = lines[0].replace(/^\d+[.)\s]+/, "").trim();
    const optionLines = lines.filter((l) => /^[A-Da-d][.)\s]/.test(l));

    if (optionLines.length < 4) continue;

    const options = optionLines
      .slice(0, 4)
      .map((l) => l.replace(/^[A-Da-d][.)\s]+/, "").trim());

    const answerLine = lines.find((l) =>
      /^(?:Answer|Correct\s*Answer|Ans)[:\s]+[A-Da-d]/i.test(l),
    );

    let correctIndex = 0;
    if (answerLine) {
      const match = answerLine.match(/[A-Da-d]/);
      if (match) {
        correctIndex = match[0].toUpperCase().charCodeAt(0) - 65;
      }
    }

    const explanationLine = lines.find((l) =>
      /^(?:Explanation|Note|Reason)[:\s]/i.test(l),
    );
    const explanation = explanationLine
      ? explanationLine
          .replace(/^(?:Explanation|Note|Reason)[:\s]+/i, "")
          .trim()
      : "Great thinking! Review this topic for more clarity.";

    results.push({
      question: questionLine,
      options,
      correctIndex,
      explanation,
    });
    if (results.length === 5) break;
  }

  if (results.length === 0) {
    const fallbackBlocks = raw.split(/\n\n+/).filter(Boolean);
    for (const block of fallbackBlocks) {
      const lines = block
        .split("\n")
        .map((l) => l.trim())
        .filter(Boolean);
      if (lines.length < 5) continue;
      const options = lines
        .slice(1, 5)
        .map((l) => l.replace(/^[A-Da-d][.)\s]+/, "").trim());
      results.push({
        question: lines[0].replace(/^\d+[.)\s]+/, "").trim(),
        options,
        correctIndex: 0,
        explanation: "Review this topic!",
      });
      if (results.length >= 5) break;
    }
  }

  return results;
}

function useOpenAIConfigured() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<boolean>({
    queryKey: ["openai-configured"],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isMyOpenAIConfigured();
    },
    enabled: !!actor && !isFetching,
    staleTime: 1000 * 60,
  });
}

const CONFETTI = ["🎊", "⭐", "🌟", "✨", "🎉", "🏆", "🎈", "💫"];

function ScoreConfetti({ pct }: { pct: number }) {
  if (pct < 60) return null;
  return (
    <div className="flex gap-1 justify-center flex-wrap" aria-hidden="true">
      {CONFETTI.slice(0, pct >= 80 ? 8 : 5).map((e) => (
        <span
          key={e}
          className="text-xl animate-bounce"
          style={{ animationDelay: `${CONFETTI.indexOf(e) * 0.1}s` }}
        >
          {e}
        </span>
      ))}
    </div>
  );
}

export default function Quiz() {
  const [quizState, setQuizState] = useState<QuizState>("select");
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [selectedChapter, setSelectedChapter] = useState<Chapter | null>(null);
  const [questions, setQuestions] = useState<ParsedQuestion[]>([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<boolean[]>([]);
  const [parseError, setParseError] = useState(false);

  const { data: subjects, isLoading: subjectsLoading } = useSubjects();
  const { data: chapters, isLoading: chaptersLoading } = useChapters(
    selectedSubject?.id ?? "",
  );
  const { mutateAsync: ask } = useAskAssistant();
  const { mutate: saveScore } = useSaveQuizScore();
  const { data: isOpenAIConfigured, isLoading: keyLoading } =
    useOpenAIConfigured();

  // Read query params — TanStack Router v1 (always called at top level)
  const searchParams = useSearch({ strict: false }) as {
    subjectId?: string;
    chapterId?: string;
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: intentional one-time pre-fill
  useEffect(() => {
    if (!subjects || subjects.length === 0) return;
    const { subjectId } = searchParams;
    if (subjectId && !selectedSubject) {
      const subj = subjects.find((s) => s.id === subjectId);
      if (subj) setSelectedSubject(subj);
    }
  }, [subjects]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: intentional one-time pre-fill
  useEffect(() => {
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
        "Separate each question with a blank line. Use simple, clear language suitable for a 13-year-old.",
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

  function handleAnswer(optionIdx: number) {
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
          totalQuestions: questions.length,
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

  const colors = selectedSubject
    ? getSubjectColors(selectedSubject.id)
    : getSubjectColors("math");

  // ── Loading state ──────────────────────────────────────────────────────────
  if (quizState === "loading") {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-5 px-6">
        <div className="relative">
          <span className="text-6xl animate-bounce block">🧠</span>
          <span
            className="absolute -top-1 -right-2 text-2xl animate-spin"
            style={{ animationDuration: "2s" }}
          >
            ✨
          </span>
        </div>
        <div className="text-center space-y-1">
          <p className="text-xl font-black text-foreground">
            Navu is thinking…
          </p>
          <p className="text-sm font-semibold text-muted-foreground">
            Generating your quiz for {selectedChapter?.title}!
          </p>
        </div>
        <div className="w-48 space-y-2">
          <Skeleton className="h-3 w-full rounded-full" />
          <Skeleton className="h-3 w-3/4 rounded-full" />
          <Skeleton className="h-3 w-5/6 rounded-full" />
        </div>
      </div>
    );
  }

  // ── Result screen ──────────────────────────────────────────────────────────
  if (quizState === "result") {
    const pct = Math.round((score / questions.length) * 100);
    const emoji = pct >= 80 ? "🏆" : pct >= 60 ? "👍" : "💪";
    const message =
      pct >= 80
        ? "Brilliant work! You're a star!"
        : pct >= 60
          ? "Good job! Keep practising!"
          : "Don't give up! Every attempt helps you learn!";

    return (
      <div className="flex flex-col min-h-screen">
        <div
          className="px-5 pt-14 pb-6"
          style={{ background: `${colors.progressColor}20` }}
        >
          <div className="flex items-center gap-2 mb-1">
            <BookOpen
              className="w-5 h-5"
              style={{ color: colors.progressColor }}
            />
            <span
              className="text-sm font-black"
              style={{ color: colors.progressColor }}
            >
              {selectedSubject?.name} — {selectedChapter?.title}
            </span>
          </div>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center px-5 gap-6 py-8 bg-background text-center">
          <ScoreConfetti pct={pct} />
          <div className="text-7xl">{emoji}</div>
          <div>
            <h2 className="text-2xl font-black text-foreground">
              Quiz Complete!
            </h2>
            <p className="text-sm font-semibold text-muted-foreground mt-1">
              {message}
            </p>
          </div>

          <div
            className="w-full max-w-xs py-6 px-8 rounded-3xl"
            style={{
              background: `${colors.progressColor}12`,
              border: `2px solid ${colors.progressColor}35`,
            }}
            data-ocid="quiz.result_card"
          >
            <p
              className="text-6xl font-black"
              style={{ color: colors.progressColor }}
            >
              {pct}%
            </p>
            <p className="text-lg font-bold text-foreground mt-1">
              {score} / {questions.length} correct
            </p>
          </div>

          <div className="flex gap-2" aria-label="Question results">
            {answers.map((correct, i) => (
              <div
                key={`answer-${i}-${correct ? "ok" : "ng"}`}
                className="w-8 h-8 rounded-full flex items-center justify-center text-sm"
                style={{
                  background: correct
                    ? "oklch(0.62 0.18 145 / 0.15)"
                    : "oklch(0.6 0.2 25 / 0.12)",
                  border: `2px solid ${
                    correct ? "oklch(0.62 0.18 145)" : "oklch(0.6 0.2 25)"
                  }`,
                }}
                aria-label={`Question ${i + 1}: ${correct ? "correct" : "wrong"}`}
              >
                {correct ? "✓" : "✗"}
              </div>
            ))}
          </div>

          <div className="w-full max-w-xs space-y-3">
            <Button
              type="button"
              onClick={resetQuiz}
              data-ocid="quiz.try_again_button"
              className="btn-playful w-full py-4 text-base font-black text-white"
              style={{ background: colors.progressColor }}
            >
              <RefreshCw className="w-4 h-4 mr-2" /> Try Another Quiz
            </Button>
            <Link to="/subjects" className="block">
              <Button
                type="button"
                variant="outline"
                data-ocid="quiz.subjects_button"
                className="w-full py-4 text-base font-bold rounded-full"
              >
                📚 Back to Subjects
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ── Active question ────────────────────────────────────────────────────────
  if (quizState === "question" && questions.length > 0) {
    const q = questions[currentQ];
    const OPTION_LABELS = ["A", "B", "C", "D"];
    const answered = selectedOption !== null;

    return (
      <div className="flex flex-col min-h-screen">
        <div
          className="px-5 pt-14 pb-5 flex-shrink-0"
          style={{ background: `${colors.progressColor}18` }}
        >
          <div className="flex items-center justify-between mb-2">
            <span
              className="text-xs font-black truncate max-w-[65%]"
              style={{ color: colors.progressColor }}
            >
              {selectedSubject?.name} — {selectedChapter?.title}
            </span>
            <span className="text-xs font-bold text-muted-foreground">
              {currentQ + 1} / {questions.length}
            </span>
          </div>
          <div className="w-full h-2.5 bg-border rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-smooth"
              style={{
                width: `${((currentQ + 1) / questions.length) * 100}%`,
                background: colors.progressColor,
              }}
            />
          </div>
        </div>

        <div className="flex-1 px-5 py-6 bg-background overflow-y-auto">
          <div className="flex gap-1.5 mb-4" aria-hidden="true">
            {questions.map((qItem, i) => (
              <div
                key={qItem.question.slice(0, 20)}
                className="h-1.5 flex-1 rounded-full"
                style={{
                  background:
                    i < currentQ
                      ? answers[i]
                        ? "oklch(0.62 0.18 145)"
                        : "oklch(0.6 0.2 25)"
                      : i === currentQ
                        ? colors.progressColor
                        : "oklch(0.88 0.015 280)",
                  opacity: i === currentQ ? 1 : 0.6,
                }}
              />
            ))}
          </div>

          <p className="text-base font-black text-foreground mb-5 leading-snug">
            {q.question}
          </p>

          <div className="space-y-3">
            {q.options.map((opt, i) => {
              let optBg = "oklch(0.99 0.003 75)";
              let optBorder = "oklch(0.88 0.015 280)";
              let optText = "oklch(0.25 0.02 280)";
              let icon: React.ReactNode = null;

              if (answered) {
                if (i === q.correctIndex) {
                  optBg = "oklch(0.62 0.18 145 / 0.14)";
                  optBorder = "oklch(0.62 0.18 145)";
                  optText = "oklch(0.28 0.12 145)";
                  icon = (
                    <CheckCircle
                      className="w-5 h-5 flex-shrink-0"
                      style={{ color: "oklch(0.52 0.18 145)" }}
                    />
                  );
                } else if (i === selectedOption) {
                  optBg = "oklch(0.6 0.2 25 / 0.1)";
                  optBorder = "oklch(0.6 0.2 25)";
                  optText = "oklch(0.3 0.1 25)";
                  icon = (
                    <XCircle
                      className="w-5 h-5 flex-shrink-0"
                      style={{ color: "oklch(0.55 0.2 25)" }}
                    />
                  );
                }
              }

              return (
                <button
                  key={opt.slice(0, 20) || String(i)}
                  type="button"
                  onClick={() => handleAnswer(i)}
                  data-ocid={`quiz.option.${i + 1}`}
                  disabled={answered}
                  className="w-full flex items-center gap-3 p-4 rounded-2xl border text-left font-semibold transition-smooth hover:scale-[1.015] disabled:cursor-default"
                  style={{
                    background: optBg,
                    borderColor: optBorder,
                    color: optText,
                  }}
                >
                  <span
                    className="flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black text-white"
                    style={{
                      background:
                        answered && i === q.correctIndex
                          ? "oklch(0.52 0.18 145)"
                          : i === selectedOption && answered
                            ? "oklch(0.55 0.2 25)"
                            : colors.progressColor,
                    }}
                  >
                    {OPTION_LABELS[i]}
                  </span>
                  <span className="flex-1 text-sm min-w-0">
                    {opt || "Option"}
                  </span>
                  {icon}
                </button>
              );
            })}
          </div>

          {answered && (
            <div
              className="mt-5 p-4 rounded-2xl"
              style={{
                background:
                  selectedOption === q.correctIndex
                    ? "oklch(0.62 0.18 145 / 0.1)"
                    : "oklch(0.6 0.2 25 / 0.08)",
                border: `1px solid ${
                  selectedOption === q.correctIndex
                    ? "oklch(0.62 0.18 145 / 0.3)"
                    : "oklch(0.6 0.2 25 / 0.25)"
                }`,
              }}
            >
              <p className="text-sm font-black mb-1">
                {selectedOption === q.correctIndex
                  ? "✅ Correct!"
                  : "❌ Not quite!"}
              </p>
              <p className="text-sm font-semibold text-foreground leading-relaxed">
                💡 {q.explanation}
              </p>
            </div>
          )}
        </div>

        {answered && (
          <div className="px-5 pb-6 pt-3 flex-shrink-0 bg-background border-t border-border">
            <Button
              type="button"
              onClick={nextQuestion}
              data-ocid="quiz.next_button"
              className="w-full py-4 text-base font-black btn-playful text-white"
              style={{ background: colors.progressColor }}
            >
              {currentQ < questions.length - 1
                ? "Next Question →"
                : "See Results 🎉"}
            </Button>
          </div>
        )}
      </div>
    );
  }

  // ── Select subject + chapter (default view) ────────────────────────────────
  return (
    <div className="min-h-screen">
      <div
        className="px-5 pt-14 pb-6"
        style={{
          background:
            "linear-gradient(160deg, oklch(0.88 0.12 75), oklch(0.82 0.1 55))",
        }}
        data-ocid="quiz.page"
      >
        <h1
          className="text-3xl font-black"
          style={{ color: "oklch(0.2 0.04 55)" }}
        >
          ❓ Practice Quiz
        </h1>
        <p
          className="text-sm font-semibold mt-1"
          style={{ color: "oklch(0.35 0.05 55)" }}
        >
          Test your knowledge chapter by chapter!
        </p>
      </div>

      <div className="px-5 py-6 space-y-6 bg-background">
        {!keyLoading && isOpenAIConfigured === false && (
          <div
            className="rounded-2xl p-4 flex items-start gap-3"
            style={{
              background: "oklch(0.65 0.22 35 / 0.08)",
              border: "1.5px solid oklch(0.65 0.22 35 / 0.35)",
            }}
            data-ocid="quiz.no_key_nudge"
          >
            <span className="text-2xl flex-shrink-0">🔑</span>
            <div className="flex-1 min-w-0">
              <p
                className="text-sm font-black"
                style={{ color: "oklch(0.3 0.1 35)" }}
              >
                Navu needs your API key!
              </p>
              <p
                className="text-xs font-semibold mt-0.5"
                style={{ color: "oklch(0.45 0.08 35)" }}
              >
                Add your OpenAI key in Settings to generate quizzes.
              </p>
            </div>
            <Link to="/settings">
              <Button
                type="button"
                size="sm"
                className="btn-playful text-white flex-shrink-0 text-xs"
                style={{ background: "oklch(0.65 0.22 35)" }}
                data-ocid="quiz.go_to_settings_button"
              >
                <Settings className="w-3 h-3 mr-1" />
                Settings
              </Button>
            </Link>
          </div>
        )}

        {parseError && (
          <div
            className="rounded-2xl p-4 flex items-center gap-3"
            style={{
              background: "oklch(0.6 0.2 25 / 0.08)",
              border: "1.5px solid oklch(0.6 0.2 25 / 0.3)",
            }}
            data-ocid="quiz.error_state"
          >
            <span className="text-xl">😅</span>
            <p className="text-sm font-bold text-foreground">
              Navu had trouble making the quiz. Please try again!
            </p>
          </div>
        )}

        <div>
          <p className="text-base font-black text-foreground mb-3">
            1. Pick a subject
          </p>
          {subjectsLoading ? (
            <div className="grid grid-cols-3 gap-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <Skeleton key={i} className="h-16 rounded-2xl" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-2">
              {(subjects ?? []).map((s) => {
                const c = getSubjectColors(s.id);
                const active = selectedSubject?.id === s.id;
                return (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => {
                      setSelectedSubject(s);
                      setSelectedChapter(null);
                    }}
                    data-ocid={`quiz.subject_select.${s.id}`}
                    className="flex flex-col items-center gap-1 p-3 rounded-2xl transition-smooth hover:scale-[1.03] font-bold text-xs"
                    style={{
                      background: active
                        ? `${c.progressColor}22`
                        : "oklch(0.97 0.01 75)",
                      border: `2px solid ${
                        active ? c.progressColor : "oklch(0.9 0.01 75)"
                      }`,
                      color: active ? c.progressColor : "oklch(0.45 0.01 280)",
                    }}
                  >
                    <span className="text-2xl">{s.emoji || "📚"}</span>
                    <span className="truncate w-full text-center text-[11px]">
                      {s.name}
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {selectedSubject && (
          <div>
            <p className="text-base font-black text-foreground mb-3">
              2. Pick a chapter
            </p>
            {chaptersLoading ? (
              <div className="space-y-2">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-12 rounded-xl" />
                ))}
              </div>
            ) : (
              <div className="space-y-2">
                {(chapters ?? []).map((ch, idx) => {
                  const c = getSubjectColors(selectedSubject.id);
                  const active = selectedChapter?.id === ch.id;
                  return (
                    <button
                      key={ch.id}
                      type="button"
                      onClick={() => setSelectedChapter(ch)}
                      data-ocid={`quiz.chapter_select.${idx + 1}`}
                      className="w-full flex items-center gap-3 p-3 rounded-xl text-left transition-smooth hover:scale-[1.01] font-semibold text-sm"
                      style={{
                        background: active
                          ? `${c.progressColor}15`
                          : "oklch(0.98 0.005 75)",
                        border: `1.5px solid ${
                          active ? c.progressColor : "oklch(0.9 0.01 75)"
                        }`,
                      }}
                    >
                      <span
                        className="w-7 h-7 rounded-lg flex items-center justify-center text-[11px] font-black text-white flex-shrink-0"
                        style={{ background: c.progressColor }}
                      >
                        {Number(ch.number)}
                      </span>
                      <span className="flex-1 text-foreground min-w-0 truncate">
                        {ch.title}
                      </span>
                      {active && (
                        <CheckCircle
                          className="w-4 h-4 flex-shrink-0"
                          style={{ color: c.progressColor }}
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {selectedChapter && (
          <Button
            type="button"
            onClick={startQuiz}
            disabled={!isOpenAIConfigured}
            data-ocid="quiz.start_button"
            className="w-full py-5 text-base font-black rounded-2xl text-white btn-playful"
            style={{
              background: isOpenAIConfigured
                ? colors.progressColor
                : "oklch(0.7 0.01 280)",
            }}
          >
            {isOpenAIConfigured === false
              ? "🔑 API Key Required"
              : "Generate Quiz ✨"}
          </Button>
        )}
      </div>
    </div>
  );
}
