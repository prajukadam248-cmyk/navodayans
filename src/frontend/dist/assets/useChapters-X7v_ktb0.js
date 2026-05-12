import { u as useActor, a as useQuery, c as createActor } from "./backend-DUu4WqvQ.js";
import "./index-9NMC6j-R.js";
function useChapters(subjectId) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["chapters", subjectId],
    queryFn: async () => {
      if (!actor || !subjectId) return [];
      return actor.getChapters(subjectId);
    },
    enabled: !!actor && !isFetching && !!subjectId,
    staleTime: 1e3 * 60 * 5
  });
}
export {
  useChapters as u
};
