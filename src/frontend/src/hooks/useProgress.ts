import { createActor } from "@/backend";
import type { ProgressSummary, QuizScore } from "@/backend";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useProgressSummary() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<ProgressSummary>({
    queryKey: ["progress"],
    queryFn: async () => {
      if (!actor) {
        return {
          avgScore: 0n,
          totalCompleted: 0n,
          totalBookmarks: 0n,
          totalQuizzesTaken: 0n,
        };
      }
      return actor.getProgressSummary();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useRecentQuizScores(limit = 10) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<QuizScore[]>({
    queryKey: ["quiz-scores", limit],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getRecentQuizScores(BigInt(limit));
    },
    enabled: !!actor && !isFetching,
  });
}

export function useMarkChapterComplete() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      chapterId,
      subjectId,
    }: {
      chapterId: string;
      subjectId: string;
    }) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.markChapterComplete(chapterId, subjectId);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["progress"] }),
  });
}
