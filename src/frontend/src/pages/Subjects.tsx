import { Skeleton } from "@/components/ui/skeleton";
import { useSubjects } from "@/hooks/useSubjects";
import { getSubjectColors, getSubjectEmoji } from "@/utils/subjectColors";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

const SUBJECT_DESCRIPTIONS: Record<string, string> = {
  math: "Numbers, algebra, geometry & more",
  science: "Physics, chemistry & biology",
  social: "History, geography & civics",
  english: "Reading, grammar & writing",
  hindi: "भाषा, व्याकरण और साहित्य",
};

const SUBJECT_CHAPTER_COUNTS: Record<string, number> = {
  math: 16,
  science: 18,
  social: 19,
  english: 10,
  hindi: 17,
};

export default function Subjects() {
  const { data: subjects, isLoading } = useSubjects();

  return (
    <div className="min-h-screen">
      {/* ── Header ── */}
      <div
        className="px-5 pt-14 pb-7"
        style={{
          background:
            "linear-gradient(160deg, oklch(0.90 0.13 80) 0%, oklch(0.84 0.11 55) 100%)",
        }}
      >
        <h1
          className="text-3xl font-black leading-tight"
          style={{ color: "oklch(0.18 0.05 55)" }}
        >
          📚 All Subjects
        </h1>
        <p
          className="text-sm font-semibold mt-1"
          style={{ color: "oklch(0.32 0.06 55)" }}
        >
          Class 8 — NCERT Curriculum
        </p>
      </div>

      {/* ── Subject grid ── */}
      <div className="px-4 py-6 bg-background">
        {isLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <Skeleton key={i} className="h-48 rounded-3xl" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {(subjects ?? []).map((subject, idx) => {
              const colors = getSubjectColors(subject.id);
              const emoji = subject.emoji || getSubjectEmoji(subject.id);
              const desc =
                SUBJECT_DESCRIPTIONS[subject.id.toLowerCase()] ??
                "Explore chapters";
              const chapCount =
                SUBJECT_CHAPTER_COUNTS[subject.id.toLowerCase()] ?? 10;
              const isLast = idx === (subjects?.length ?? 0) - 1;
              const totalItems = subjects?.length ?? 0;
              const isOdd = totalItems % 2 !== 0;

              return (
                <Link
                  key={subject.id}
                  to="/subjects/$subjectId"
                  params={{ subjectId: subject.id }}
                  data-ocid={`subjects.item.${idx + 1}`}
                  className={`card-hover rounded-3xl overflow-hidden flex flex-col${
                    isLast && isOdd ? " col-span-2 sm:col-span-1" : ""
                  }`}
                  style={{
                    boxShadow: `0 4px 20px ${colors.progressColor}30`,
                  }}
                >
                  {/* Colored top half */}
                  <div
                    className="flex flex-col items-center justify-center pt-7 pb-4 px-3 gap-2"
                    style={{ background: colors.progressColor }}
                  >
                    <span
                      className="text-5xl leading-none drop-shadow-sm"
                      role="img"
                      aria-label={subject.name}
                    >
                      {emoji}
                    </span>
                    <p className="text-white font-black text-lg text-center leading-tight">
                      {subject.name}
                    </p>
                  </div>

                  {/* White bottom half */}
                  <div className="flex flex-col flex-1 px-4 py-3 bg-card">
                    <p className="text-xs font-semibold text-muted-foreground line-clamp-2 mb-3 flex-1">
                      {desc}
                    </p>
                    <div className="flex items-center justify-between">
                      <span
                        className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                        style={{
                          background: `${colors.progressColor}18`,
                          color: colors.progressColor,
                        }}
                      >
                        {chapCount} Chapters
                      </span>
                      <span
                        className="flex items-center gap-0.5 text-xs font-black transition-smooth"
                        style={{ color: colors.progressColor }}
                      >
                        Explore <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}

        {/* Motivational footer card */}
        <div
          className="mt-6 rounded-2xl p-4 flex items-center gap-4"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.90 0.13 80 / 0.5), oklch(0.94 0.08 270 / 0.4))",
            border: "1.5px solid oklch(0.88 0.08 75)",
          }}
        >
          <span className="text-3xl">🎯</span>
          <div className="min-w-0">
            <p className="font-black text-sm text-foreground">
              Keep up the great work!
            </p>
            <p className="text-xs font-semibold text-muted-foreground">
              Pick any subject and start your next chapter.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
