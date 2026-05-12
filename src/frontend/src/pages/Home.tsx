import { Skeleton } from "@/components/ui/skeleton";
import { useProgressSummary } from "@/hooks/useProgress";
import { useSubjects } from "@/hooks/useSubjects";
import { getSubjectColors } from "@/utils/subjectColors";
import { Link } from "@tanstack/react-router";
import { CheckCircle, Flame, Sparkles, Star } from "lucide-react";

const SUBJECT_HINTS: Record<
  string,
  { chapter: string; done: number; total: number; cta: string }
> = {
  math: {
    chapter: "Chapter 1: Rational Numbers",
    done: 3,
    total: 10,
    cta: "Continue",
  },
  science: {
    chapter: "Chapter 3: Synthetic Fibres",
    done: 0,
    total: 12,
    cta: "Start",
  },
  social: {
    chapter: "Chapter 1: The Indian Constitution",
    done: 5,
    total: 14,
    cta: "Continue",
  },
  english: { chapter: "Unit 2: The Tsunami", done: 2, total: 8, cta: "Read" },
  hindi: { chapter: "पाठ 4: दीवानों की हस्ती", done: 0, total: 9, cta: "शुरू करें" },
};

const TOTAL_CHAPTERS = 55;

export default function Home() {
  const { data: subjects, isLoading: subjectsLoading } = useSubjects();
  const { data: progress } = useProgressSummary();

  const completed = Number(progress?.totalCompleted ?? 0);
  const avgScore = Number(progress?.avgScore ?? 88);
  const completedPct = Math.round((completed / TOTAL_CHAPTERS) * 100);

  return (
    <div className="min-h-screen">
      {/* ── Hero banner ── */}
      <div
        className="px-5 pt-12 pb-8"
        style={{
          background:
            "linear-gradient(160deg, oklch(0.90 0.13 80) 0%, oklch(0.84 0.11 55) 100%)",
        }}
      >
        {/* App logo row */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <span className="text-2xl">💡</span>
            <span
              className="text-lg font-black tracking-tight"
              style={{ color: "oklch(0.22 0.06 55)" }}
            >
              Navodayans
            </span>
          </div>
          <Link
            to="/tutor"
            data-ocid="home.chat_navu_button"
            aria-label="Chat with Navu AI Tutor"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-bold transition-smooth hover:scale-105 active:scale-95"
            style={{
              background: "oklch(1 0 0 / 0.88)",
              color: "oklch(0.28 0.06 55)",
              boxShadow: "0 2px 8px oklch(0.6 0.2 35 / 0.2)",
            }}
          >
            <Sparkles
              className="w-4 h-4"
              style={{ color: "oklch(0.62 0.22 35)" }}
            />
            <span>Chat Navu</span>
          </Link>
        </div>

        {/* Greeting */}
        <h1
          className="text-3xl font-black mb-1 leading-tight"
          style={{ color: "oklch(0.18 0.05 55)" }}
        >
          Namaste! 👋
        </h1>
        <p
          className="text-base font-semibold"
          style={{ color: "oklch(0.32 0.06 55)" }}
        >
          Let&apos;s explore your studies today!
        </p>
      </div>

      {/* ── Subjects grid ── */}
      <div className="px-4 py-6 bg-background">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-black text-foreground">Your Subjects</h2>
          <span
            className="text-xs font-bold px-2.5 py-1 rounded-full"
            style={{
              background: "oklch(0.90 0.13 80 / 0.4)",
              color: "oklch(0.28 0.06 55)",
            }}
          >
            8th Grade
          </span>
        </div>

        {subjectsLoading ? (
          <div className="grid grid-cols-2 gap-3">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-40 rounded-2xl" />
            ))}
            <Skeleton className="h-40 rounded-2xl col-span-2" />
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {(subjects ?? []).map((subject, idx) => {
              const colors = getSubjectColors(subject.id);
              const hint = SUBJECT_HINTS[subject.id.toLowerCase()] ?? {
                chapter: "Chapter 1",
                done: 0,
                total: 10,
                cta: "Start",
              };
              const pct = hint.total > 0 ? (hint.done / hint.total) * 100 : 0;
              const isLast = idx === (subjects?.length ?? 0) - 1;
              const isOdd = (subjects?.length ?? 0) % 2 !== 0;

              return (
                <Link
                  key={subject.id}
                  to="/subjects/$subjectId"
                  params={{ subjectId: subject.id }}
                  data-ocid={`home.subject_card.${idx + 1}`}
                  className={`card-hover rounded-2xl p-4 flex flex-col${isLast && isOdd ? " col-span-2" : ""}`}
                  style={{
                    background: `${colors.progressColor}1a`,
                    border: `1.5px solid ${colors.progressColor}45`,
                  }}
                >
                  {/* Icon + name */}
                  <div className="flex items-center gap-2 mb-3">
                    <span
                      className="flex items-center justify-center w-10 h-10 rounded-xl text-white text-lg font-black flex-shrink-0"
                      style={{ background: colors.progressColor }}
                    >
                      {subject.emoji ||
                        ["📐", "🔬", "🌍", "📖", "प"][idx] ||
                        "📚"}
                    </span>
                    <span className="font-black text-sm text-foreground leading-tight">
                      {subject.name}
                    </span>
                  </div>

                  {/* Chapter hint */}
                  <p className="text-xs font-semibold text-muted-foreground mb-2 line-clamp-2 flex-1">
                    {hint.chapter}
                  </p>

                  {/* Progress bar */}
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex-1 h-1.5 bg-border rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-smooth"
                        style={{
                          width: `${pct}%`,
                          background: colors.progressColor,
                        }}
                      />
                    </div>
                    <span className="text-[10px] font-bold text-muted-foreground whitespace-nowrap">
                      {hint.done}/{hint.total}
                    </span>
                  </div>

                  {/* CTA */}
                  <button
                    type="button"
                    className="w-full py-1.5 rounded-xl text-sm font-bold transition-smooth hover:opacity-90 active:scale-95"
                    style={{
                      background: "oklch(1 0 0 / 0.85)",
                      color: "oklch(0.2 0.03 280)",
                    }}
                  >
                    {hint.cta}
                  </button>
                </Link>
              );
            })}
          </div>
        )}
      </div>

      {/* ── Progress dashboard ── */}
      <div className="px-4 pb-8" style={{ background: "oklch(0.96 0.015 75)" }}>
        <h2 className="text-xl font-black text-foreground mb-4 pt-5">
          Your Progress Dashboard
        </h2>

        <div className="grid grid-cols-3 gap-3 mb-4">
          {/* Chapters completed */}
          <div
            className="rounded-2xl p-3 flex flex-col items-center text-center"
            style={{
              background: "oklch(1 0 0 / 0.92)",
              border: "1.5px solid oklch(0.9 0.025 75)",
            }}
            data-ocid="home.progress.chapters"
          >
            <div className="relative w-14 h-14 mb-1">
              <svg
                viewBox="0 0 56 56"
                className="w-full h-full -rotate-90"
                aria-hidden="true"
              >
                <circle
                  cx="28"
                  cy="28"
                  r="22"
                  fill="none"
                  stroke="oklch(0.91 0.04 75)"
                  strokeWidth="5"
                />
                <circle
                  cx="28"
                  cy="28"
                  r="22"
                  fill="none"
                  stroke="oklch(0.65 0.22 35)"
                  strokeWidth="5"
                  strokeDasharray={`${2 * Math.PI * 22}`}
                  strokeDashoffset={`${2 * Math.PI * 22 * (1 - completedPct / 100)}`}
                  strokeLinecap="round"
                />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center text-[9px] font-black text-foreground">
                {completedPct}%
              </span>
            </div>
            <p className="text-[10px] font-semibold text-muted-foreground">
              Chapters Completed
            </p>
            <p className="text-sm font-black text-foreground">
              {completed}/{TOTAL_CHAPTERS}
            </p>
          </div>

          {/* Quiz score */}
          <div
            className="rounded-2xl p-3 flex flex-col items-center text-center"
            style={{
              background: "oklch(1 0 0 / 0.92)",
              border: "1.5px solid oklch(0.9 0.025 75)",
            }}
            data-ocid="home.progress.quiz_score"
          >
            <div className="flex gap-0.5 mb-1">
              {[1, 2, 3].map((s) => (
                <Star
                  key={s}
                  className="w-4 h-4 fill-[oklch(0.78_0.18_75)] text-[oklch(0.78_0.18_75)]"
                />
              ))}
            </div>
            <p
              className="text-2xl font-black"
              style={{ color: "oklch(0.55 0.18 75)" }}
            >
              {avgScore}%
            </p>
            <p className="text-[10px] font-semibold text-muted-foreground">
              Quiz Score Avg
            </p>
          </div>

          {/* Streak */}
          <div
            className="rounded-2xl p-3 flex flex-col items-center text-center"
            style={{
              background: "oklch(1 0 0 / 0.92)",
              border: "1.5px solid oklch(0.9 0.025 75)",
            }}
            data-ocid="home.progress.streak"
          >
            <Flame
              className="w-8 h-8 mb-1"
              style={{ color: "oklch(0.62 0.22 35)" }}
            />
            <p className="text-2xl font-black text-foreground">7</p>
            <p className="text-[10px] font-semibold text-muted-foreground">
              Study Streak Days
            </p>
          </div>
        </div>

        {/* Quick action buttons */}
        <div className="flex gap-3">
          <Link
            to="/tutor"
            data-ocid="home.quick_tutor_button"
            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl font-bold text-sm text-white transition-smooth hover:scale-[1.02] active:scale-[0.98]"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.65 0.22 35), oklch(0.68 0.2 270))",
            }}
          >
            <Sparkles className="w-4 h-4" /> Ask AI Tutor
          </Link>
          <Link
            to="/quiz"
            data-ocid="home.quick_quiz_button"
            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl font-bold text-sm text-white transition-smooth hover:scale-[1.02] active:scale-[0.98]"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.62 0.18 125), oklch(0.65 0.2 230))",
            }}
          >
            <CheckCircle className="w-4 h-4" /> Quick Quiz
          </Link>
        </div>
      </div>
    </div>
  );
}
