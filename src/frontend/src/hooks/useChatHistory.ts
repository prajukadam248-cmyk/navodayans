import { createActor } from "@/backend";
import type { ChatMessage } from "@/backend";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useChatHistory() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<ChatMessage[]>({
    queryKey: ["chat-history"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getChatHistory();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useClearChatHistory() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("Actor not ready");
      return actor.clearChatHistory();
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["chat-history"] }),
  });
}
