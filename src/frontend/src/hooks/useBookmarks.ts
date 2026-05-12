import { createActor } from "@/backend";
import type { Bookmark } from "@/backend";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useBookmarks() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Bookmark[]>({
    queryKey: ["bookmarks"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getBookmarks();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAddBookmark() {
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
      return actor.addBookmark(chapterId, subjectId);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["bookmarks"] }),
  });
}

export function useRemoveBookmark() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (chapterId: string) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.removeBookmark(chapterId);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["bookmarks"] }),
  });
}
