import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useBookmarks, useRemoveBookmark } from "@/hooks/useBookmarks";
import { useProgressSummary, useRecentQuizScores } from "@/hooks/useProgress";
import { getSubjectColors } from "@/utils/subjectColors";
import {
  BookOpen,
  BookmarkX,
  Brain,
  Star,
  TrendingUp,
  Trophy,
} from "lucide-react";

const SUBJECT_NAMES: Record<string, string> = {
  math: "Mathematics",
  science: "Science",
  social: "Social Science",
  english: "English",
  hindi: "Hindi",
};

const CHAPTER_NAMES: Record<string, string> = {
  ch1: "Chapter 1",
  ch2: "Chapter 2",
  ch3: "Chapter 3",
  ch4: "Chapter 4",
  ch5: "Chapter 5",
  ch6: "Chapter 6",
  ch7: "Chapter 7",
  ch8: "Chapter 8",
  ch9: "Chapter 9",
  ch10: "Chapter 10",
};

function getChapterLabel(chapterId: string): string {
  return (
    CHAPTER_NAMES[chapterId] ??
    chapterId.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
  );
}

function getSubjectLabel(subjectId: string): string {
  return SUBJECT_NAMES[subjectId.toLowerCase()] ?? subjectId;
}

function formatDate(timestamp: bigint): string {
  const ms = Number(timestamp / 1_000_000n);
  const d = new Date(ms);
  if (Number.isNaN(d.getTime())) return "Recent";
  return d.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function getScoreColor(score: number): string {
  if (score >= 80) return "text-[oklch(0.55_0.18_145)]";
  if (score >= 50) return "text-[oklch(0.60_0.2_55)]";
  return "text-[oklch(0.60_0.2_25)]";
}

function getScoreEmoji(score: number): string {
  if (score >= 90) return "🏆";
  if (score >= 80) return "⭐";
  if (score >= 60) return "👍";
  if (score >= 40) return "💪";
  return "📚";
}

interface StatCardProps {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  colorClass: string;
  bgClass: string;
  ocid: string;
}

function StatCard({
  label,
  value,
  icon,
  colorClass,
  bgClass,
  ocid,
}: StatCardProps) {
  return (
    <Card
      data-ocid={ocid}
      className={`rounded-2xl border-0 shadow-md ${bgClass} overflow-hidden`}
    >
      <CardContent className="p-4 flex flex-col gap-2">
        <div
          className={`w-10 h-10 rounded-xl flex items-center justify-center ${colorClass}`}
        >
          {icon}
        </div>
        <p className="text-2xl font-extrabold text-foreground leading-none">
          {value}
        </p>
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
          {label}
        </p>
      </CardContent>
    </Card>
  );
}

export default function Progress() {
  const { data: progress, isLoading: progressLoading } = useProgressSummary();
  const { data: bookmarks = [], isLoading: bookmarksLoading } = useBookmarks();
  const { data: quizScores = [], isLoading: scoresLoading } =
    useRecentQuizScores(5);
  const removeBookmark = useRemoveBookmark();

  const totalBookmarks = progress ? Number(progress.totalBookmarks) : 0;
  const chaptersCompleted = progress ? Number(progress.totalCompleted) : 0;
  const quizzesTaken = progress ? Number(progress.totalQuizzesTaken) : 0;
  const avgScore = progress ? Number(progress.avgScore) : 0;

  return (
    <div className="max-w-2xl mx-auto pb-8" data-ocid="progress.page">
      {/* Header banner */}
      <div className="bg-gradient-to-r from-[oklch(0.68_0.2_270)] to-[oklch(0.65_0.2_230)] px-5 pt-6 pb-8 rounded-b-3xl shadow-lg">
        <div className="flex items-center gap-3 mb-1">
          <span className="text-3xl">📊</span>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">
            My Progress
          </h1>
        </div>
        <p className="text-white/80 text-sm font-medium pl-1">
          Track your journey — every step counts! 🌟
        </p>
      </div>

      <div className="px-4 -mt-4 space-y-6">
        {/* Stats grid */}
        <section data-ocid="progress.stats.section">
          {progressLoading ? (
            <div className="grid grid-cols-2 gap-3">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className="h-28 rounded-2xl" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              <StatCard
                ocid="progress.stat.bookmarks"
                label="Total Bookmarks"
                value={totalBookmarks}
                icon={<BookOpen className="w-5 h-5 text-white" />}
                colorClass="subject-english"
                bgClass="bg-[oklch(0.97_0.04_230)]"
              />
              <StatCard
                ocid="progress.stat.completed"
                label="Chapters Done"
                value={chaptersCompleted}
                icon={<BookOpen className="w-5 h-5 text-white" />}
                colorClass="subject-math"
                bgClass="bg-[oklch(0.97_0.04_35)]"
              />
              <StatCard
                ocid="progress.stat.quizzes"
                label="Quizzes Taken"
                value={quizzesTaken}
                icon={<Brain className="w-5 h-5 text-white" />}
                colorClass="subject-science"
                bgClass="bg-[oklch(0.97_0.04_125)]"
              />
              <StatCard
                ocid="progress.stat.avgscore"
                label="Average Score"
                value={quizzesTaken > 0 ? `${avgScore}%` : "–"}
                icon={<Star className="w-5 h-5 text-white" />}
                colorClass="subject-hindi"
                bgClass="bg-[oklch(0.97_0.04_10)]"
              />
            </div>
          )}
        </section>

        {/* Bookmarks section */}
        <section data-ocid="progress.bookmarks.section">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xl">🔖</span>
            <h2 className="text-lg font-extrabold text-foreground">
              Saved Chapters
            </h2>
          </div>

          {bookmarksLoading ? (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-16 rounded-2xl" />
              ))}
            </div>
          ) : bookmarks.length === 0 ? (
            <Card
              className="rounded-2xl border-dashed border-2 border-border shadow-none bg-card"
              data-ocid="progress.bookmarks.empty_state"
            >
              <CardContent className="p-6 text-center space-y-2">
                <p className="text-3xl">🌟</p>
                <p className="font-bold text-foreground">No bookmarks yet!</p>
                <p className="text-sm text-muted-foreground">
                  Tap the bookmark icon on any chapter to save it here. Keep
                  studying! 📚
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-3">
              {bookmarks.map((bm, idx) => {
                const colors = getSubjectColors(bm.subjectId);
                return (
                  <Card
                    key={`${bm.chapterId}-${idx}`}
                    data-ocid={`progress.bookmarks.item.${idx + 1}`}
                    className="rounded-2xl border-0 shadow-sm bg-card overflow-hidden"
                  >
                    <CardContent className="p-0">
                      <div className="flex items-center gap-3 p-3">
                        <div
                          className={`w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center text-lg ${colors.bgClass}`}
                        >
                          {colors.emoji}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-bold text-sm text-foreground truncate">
                            {getChapterLabel(bm.chapterId)}
                          </p>
                          <Badge
                            variant="secondary"
                            className={`mt-0.5 text-xs px-2 py-0 rounded-full border ${colors.borderClass} ${colors.lightBg} text-foreground font-semibold`}
                          >
                            {getSubjectLabel(bm.subjectId)}
                          </Badge>
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          data-ocid={`progress.bookmarks.delete_button.${idx + 1}`}
                          className="flex-shrink-0 h-8 w-8 rounded-xl text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-smooth"
                          onClick={() => removeBookmark.mutate(bm.chapterId)}
                          aria-label={`Remove bookmark for ${getChapterLabel(bm.chapterId)}`}
                        >
                          <BookmarkX className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </section>

        {/* Recent quiz scores */}
        <section data-ocid="progress.scores.section">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xl">🏅</span>
            <h2 className="text-lg font-extrabold text-foreground">
              Recent Quiz Scores
            </h2>
          </div>

          {scoresLoading ? (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-16 rounded-2xl" />
              ))}
            </div>
          ) : quizScores.length === 0 ? (
            <Card
              className="rounded-2xl border-dashed border-2 border-border shadow-none bg-card"
              data-ocid="progress.scores.empty_state"
            >
              <CardContent className="p-6 text-center space-y-2">
                <p className="text-3xl">💪</p>
                <p className="font-bold text-foreground">
                  No quizzes taken yet!
                </p>
                <p className="text-sm text-muted-foreground">
                  Keep studying to see your progress here! Take a quiz to get
                  started. 🚀
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-3">
              {quizScores.map((qs, idx) => {
                const colors = getSubjectColors(qs.subject);
                const scorePercent =
                  qs.totalQuestions > 0n
                    ? Number((qs.score * 100n) / qs.totalQuestions)
                    : 0;
                return (
                  <Card
                    key={`${qs.subject}-${qs.chapterId}-${idx}`}
                    data-ocid={`progress.scores.item.${idx + 1}`}
                    className="rounded-2xl border-0 shadow-sm bg-card overflow-hidden"
                  >
                    <CardContent className="p-0">
                      <div className="flex items-center gap-3 p-3">
                        <div
                          className={`w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center text-xl ${colors.bgClass}`}
                        >
                          {getScoreEmoji(scorePercent)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-bold text-sm text-foreground truncate">
                            {getChapterLabel(qs.chapterId)}
                          </p>
                          <div className="flex items-center gap-2 mt-0.5">
                            <Badge
                              variant="secondary"
                              className={`text-xs px-2 py-0 rounded-full border ${colors.borderClass} ${colors.lightBg} text-foreground font-semibold`}
                            >
                              {getSubjectLabel(qs.subject)}
                            </Badge>
                            <span className="text-xs text-muted-foreground">
                              {formatDate(qs.takenAt)}
                            </span>
                          </div>
                        </div>
                        <div className="flex flex-col items-end flex-shrink-0">
                          <span
                            className={`text-xl font-extrabold ${getScoreColor(scorePercent)}`}
                          >
                            {scorePercent}%
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {Number(qs.score)}/{Number(qs.totalQuestions)}
                          </span>
                        </div>
                      </div>
                      {/* Score bar */}
                      <div className="px-3 pb-3">
                        <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                          <div
                            className="h-full rounded-full transition-smooth"
                            style={{
                              width: `${scorePercent}%`,
                              background: colors.progressColor,
                            }}
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </section>

        {/* Motivational footer */}
        <Card className="rounded-2xl border-0 shadow-md bg-gradient-to-r from-[oklch(0.65_0.22_35)] to-[oklch(0.62_0.18_55)] overflow-hidden">
          <CardContent className="p-5 flex items-center gap-4">
            <span className="text-4xl">🌟</span>
            <div>
              <p className="font-extrabold text-white text-base">
                You're doing great!
              </p>
              <p className="text-white/80 text-sm">
                Every chapter you study brings you closer to your goals. Keep it
                up! 🚀
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="flex items-center justify-center gap-2 py-2">
          <TrendingUp className="w-4 h-4 text-muted-foreground" />
          <p className="text-xs text-muted-foreground font-semibold">
            Keep studying to unlock more achievements! 🏆
          </p>
          <Trophy className="w-4 h-4 text-muted-foreground" />
        </div>
      </div>
    </div>
  );
}
