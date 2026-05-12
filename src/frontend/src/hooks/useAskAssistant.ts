import { createActor } from "@/backend";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useAskAssistant() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (prompt: string) => {
      if (!actor) throw new Error("Actor not ready");
      const response = await actor.askAssistant(prompt);
      return response;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["chat-history"] });
    },
  });
}
