import { createActor } from "@/backend";
import type { Chapter } from "@/backend";
import { useActor } from "@caffeineai/core-infrastructure";
import { useQuery } from "@tanstack/react-query";

export function useChapters(subjectId: string) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Chapter[]>({
    queryKey: ["chapters", subjectId],
    queryFn: async () => {
      if (!actor || !subjectId) return [];
      return actor.getChapters(subjectId);
    },
    enabled: !!actor && !isFetching && !!subjectId,
    staleTime: 1000 * 60 * 5,
  });
}
