import { createActor } from "@/backend";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface SaveQuizScoreParams {
  subject: string;
  chapterId: string;
  score: number;
  totalQuestions: number;
}

export function useSaveQuizScore() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      subject,
      chapterId,
      score,
      totalQuestions,
    }: SaveQuizScoreParams) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.saveQuizScore(
        subject,
        chapterId,
        BigInt(score),
        BigInt(totalQuestions),
      );
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["quiz-scores"] });
      qc.invalidateQueries({ queryKey: ["progress"] });
    },
  });
}
