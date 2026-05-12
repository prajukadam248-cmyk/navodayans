import { u as useActor, a as useQuery, c as createActor } from "./backend-DUu4WqvQ.js";
import "./index-9NMC6j-R.js";
function useProgressSummary() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["progress"],
    queryFn: async () => {
      if (!actor) {
        return {
          avgScore: 0n,
          totalCompleted: 0n,
          totalBookmarks: 0n,
          totalQuizzesTaken: 0n
        };
      }
      return actor.getProgressSummary();
    },
    enabled: !!actor && !isFetching
  });
}
function useRecentQuizScores(limit = 10) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["quiz-scores", limit],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getRecentQuizScores(BigInt(limit));
    },
    enabled: !!actor && !isFetching
  });
}
export {
  useRecentQuizScores as a,
  useProgressSummary as u
};
