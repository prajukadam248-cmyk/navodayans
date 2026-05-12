import { u as useActor, c as createActor } from "./backend-DUu4WqvQ.js";
import { b as useQueryClient } from "./index-9NMC6j-R.js";
import { u as useMutation } from "./button-bjKP-KMk.js";
function useAskAssistant() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (prompt) => {
      if (!actor) throw new Error("Actor not ready");
      const response = await actor.askAssistant(prompt);
      return response;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["chat-history"] });
    }
  });
}
export {
  useAskAssistant as u
};
