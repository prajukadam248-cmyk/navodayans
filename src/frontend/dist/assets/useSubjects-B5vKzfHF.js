import { u as useActor, a as useQuery, c as createActor } from "./backend-DUu4WqvQ.js";
import "./index-9NMC6j-R.js";
function useSubjects() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["subjects"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getSubjects();
    },
    enabled: !!actor && !isFetching,
    staleTime: 1e3 * 60 * 5
  });
}
export {
  useSubjects as u
};
