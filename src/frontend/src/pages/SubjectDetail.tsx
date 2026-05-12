import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  useAddBookmark,
  useBookmarks,
  useRemoveBookmark,
} from "@/hooks/useBookmarks";
import { useChapters } from "@/hooks/useChapters";
import { useSubjects } from "@/hooks/useSubjects";
import type { Chapter } from "@/types";
import { getSubjectColors } from "@/utils/subjectColors";
import { Link, useParams } from "@tanstack/react-router";
import { ChevronLeft, MessageCircle, Star, Zap } from "lucide-react";

function ChapterCardSkeleton() {
  return (
    <div className="rounded-2xl border border-border bg-card p-4 space-y-3">
      <div className="flex items-center gap-3">
        <Skeleton className="w-10 h-10 rounded-xl flex-shrink-0" />
        <Skeleton className="h-5 flex-1 rounded-lg" />
        <Skeleton className="w-8 h-8 rounded-full flex-shrink-0" />
      </div>
      <div className="flex gap-2 ml-13">
        <Skeleton className="h-8 flex-1 rounded-full" />
        <Skeleton className="h-8 flex-1 rounded-full" />
      </div>
    </div>
  );
}

function ChapterCard({
  chapter,
  subjectId,
  progressColor,
  isBookmarked,
  onBookmarkToggle,
  ocid,
}: {
  chapter: Chapter;
  subjectId: string;
  progressColor: string;
  isBookmarked: boolean;
  onBookmarkToggle: () => void;
  ocid: string;
}) {
  return (
    <div
      data-ocid={ocid}
      className="rounded-2xl border border-border bg-card p-4 space-y-3 transition-smooth hover:shadow-md"
    >
      {/* Top row: chapter number, title, bookmark */}
      <div className="flex items-center gap-3">
        <span
          className="flex items-center justify-center w-10 h-10 rounded-xl text-sm font-black text-white flex-shrink-0"
          style={{ background: progressColor }}
        >
          {Number(chapter.number)}
        </span>
        <p className="flex-1 min-w-0 font-bold text-foreground leading-snug line-clamp-2">
          {chapter.title}
        </p>
        <button
          type="button"
          data-ocid={`${ocid}.bookmark_toggle`}
          onClick={onBookmarkToggle}
          aria-label={isBookmarked ? "Remove bookmark" : "Add bookmark"}
          className="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center transition-smooth hover:scale-110 active:scale-95"
          style={{
            background: isBookmarked ? `${progressColor}20` : "transparent",
            border: `1.5px solid ${isBookmarked ? progressColor : "oklch(0.85 0.01 75)"}`,
          }}
        >
          <Star
            className="w-4 h-4 transition-smooth"
            style={{
              fill: isBookmarked ? progressColor : "none",
              stroke: isBookmarked ? progressColor : "oklch(0.6 0.01 75)",
            }}
          />
        </button>
      </div>

      {/* Action buttons */}
      <div className="flex gap-2 pl-[52px]">
        <Link
          to="/tutor"
          search={{ subjectId, chapterId: chapter.id }}
          data-ocid={`${ocid}.tutor_link`}
          className="flex-1"
        >
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="w-full rounded-full text-xs font-bold gap-1.5 btn-playful border-2"
            style={{
              borderColor: `${progressColor}60`,
              color: progressColor,
            }}
          >
            <MessageCircle className="w-3.5 h-3.5" />
            Ask Navu
          </Button>
        </Link>
        <Link
          to="/quiz"
          search={{ subjectId, chapterId: chapter.id }}
          data-ocid={`${ocid}.quiz_link`}
          className="flex-1"
        >
          <Button
            type="button"
            size="sm"
            className="w-full rounded-full text-xs font-black gap-1.5 btn-playful text-white"
            style={{ background: progressColor }}
          >
            <Zap className="w-3.5 h-3.5" />
            Quick Quiz
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default function SubjectDetail() {
  const { subjectId } = useParams({ from: "/subjects/$subjectId" });
  const { data: chapters, isLoading: chaptersLoading } = useChapters(subjectId);
  const { data: subjects } = useSubjects();
  const { data: bookmarks } = useBookmarks();
  const addBookmark = useAddBookmark();
  const removeBookmark = useRemoveBookmark();

  const subject = subjects?.find((s) => s.id === subjectId);
  const colors = getSubjectColors(subjectId);

  const bookmarkedIds = new Set((bookmarks ?? []).map((b) => b.chapterId));

  function handleBookmarkToggle(chapter: Chapter) {
    if (bookmarkedIds.has(chapter.id)) {
      removeBookmark.mutate(chapter.id);
    } else {
      addBookmark.mutate({ chapterId: chapter.id, subjectId });
    }
  }

  const isLoading = chaptersLoading;

  return (
    <div className="min-h-screen">
      {/* Colored header band */}
      <div
        data-ocid="subject_detail.header"
        className="px-5 pt-14 pb-6 relative overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${colors.progressColor}28 0%, ${colors.progressColor}14 100%)`,
        }}
      >
        {/* Decorative blob */}
        <div
          className="absolute -top-8 -right-8 w-36 h-36 rounded-full opacity-20 pointer-events-none"
          style={{ background: colors.progressColor }}
        />

        <Link
          to="/subjects"
          data-ocid="subject_detail.back_button"
          className="inline-flex items-center gap-1 text-sm font-bold mb-4 transition-smooth hover:opacity-70"
          style={{ color: colors.progressColor }}
        >
          <ChevronLeft className="w-4 h-4" />
          All Subjects
        </Link>

        <div className="flex items-center gap-4">
          <span
            className="flex items-center justify-center w-16 h-16 rounded-2xl text-3xl flex-shrink-0 shadow-md"
            style={{ background: colors.progressColor }}
          >
            {subject?.emoji ?? "📚"}
          </span>
          <div>
            <h1 className="text-2xl font-black text-foreground leading-tight">
              {subject?.name ?? subjectId}
            </h1>
            <p className="text-sm font-semibold text-muted-foreground mt-0.5">
              {isLoading ? (
                <Skeleton className="h-4 w-24 mt-1" />
              ) : (
                `${chapters?.length ?? 0} Chapters • Class 8`
              )}
            </p>
          </div>
        </div>
      </div>

      {/* Chapters list */}
      <div className="px-5 py-5 space-y-3 bg-background pb-24">
        {isLoading ? (
          [1, 2, 3, 4, 5].map((i) => <ChapterCardSkeleton key={i} />)
        ) : (chapters ?? []).length === 0 ? (
          <div
            data-ocid="subject_detail.empty_state"
            className="flex flex-col items-center justify-center py-20 text-center"
          >
            <span className="text-6xl mb-4">📖</span>
            <p className="text-xl font-black text-foreground">
              No chapters yet!
            </p>
            <p className="text-sm font-semibold text-muted-foreground mt-2 max-w-xs">
              Chapters for this subject will appear here soon. Check back later!
            </p>
            <Link
              to="/subjects"
              data-ocid="subject_detail.empty_state.back_link"
              className="mt-6 btn-playful px-6 py-2.5 text-sm font-bold text-white rounded-full inline-block"
              style={{ background: colors.progressColor }}
            >
              Browse Other Subjects
            </Link>
          </div>
        ) : (
          (chapters ?? []).map((chapter, idx) => (
            <ChapterCard
              key={chapter.id}
              chapter={chapter}
              subjectId={subjectId}
              progressColor={colors.progressColor}
              isBookmarked={bookmarkedIds.has(chapter.id)}
              onBookmarkToggle={() => handleBookmarkToggle(chapter)}
              ocid={`subject_detail.chapter.${idx + 1}`}
            />
          ))
        )}
      </div>
    </div>
  );
}
