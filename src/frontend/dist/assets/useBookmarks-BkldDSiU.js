import { u as useActor, a as useQuery, c as createActor } from "./backend-DUu4WqvQ.js";
import { b as useQueryClient } from "./index-9NMC6j-R.js";
import { u as useMutation } from "./button-bjKP-KMk.js";
function useBookmarks() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["bookmarks"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getBookmarks();
    },
    enabled: !!actor && !isFetching
  });
}
function useAddBookmark() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      chapterId,
      subjectId
    }) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.addBookmark(chapterId, subjectId);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["bookmarks"] })
  });
}
function useRemoveBookmark() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (chapterId) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.removeBookmark(chapterId);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["bookmarks"] })
  });
}
export {
  useAddBookmark as a,
  useRemoveBookmark as b,
  useBookmarks as u
};
