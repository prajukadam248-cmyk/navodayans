import Map "mo:core/Map";
import List "mo:core/List";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import Time "mo:core/Time";
import AccessControl "mo:caffeineai-authorization/access-control";
import ChatTypes "../types/chat";
import Chat "../lib/chat";
import OpenAI "../lib/openai";

mixin (
  accessControlState : AccessControl.AccessControlState,
  chatHistory : Map.Map<Principal, List.List<ChatTypes.ChatMessage>>,
  openAIKeys : Map.Map<Principal, Text>,
) {
  /// Send a message to the AI assistant and return its response.
  /// Appends both user message and assistant reply to the stored history.
  public shared ({ caller }) func askAssistant(prompt : Text) : async Text {
    if (caller.isAnonymous()) { Runtime.trap("Sign in to use this feature") };
    let ?key = openAIKeys.get(caller) else {
      Runtime.trap("Set your OpenAI API key first");
    };
    let systemPrompt = "You are Navodayans AI, a friendly and encouraging study assistant for 8th-grade students in India. " #
      "You help with NCERT topics in Mathematics, Science, Social Science, English, and Hindi. " #
      "Always explain concepts in simple, clear language that a 13-14 year old can understand. " #
      "Use relatable examples and be enthusiastic and supportive. " #
      "Keep explanations concise but thorough. When asked to generate practice questions, make them age-appropriate and aligned with 8th-grade difficulty.";
    let userMsg : ChatTypes.ChatMessage = { role = #user; content = prompt; timestamp = Time.now() };
    Chat.appendMessage(chatHistory, caller, userMsg);
    let reply = await* OpenAI.runChatCompletionWithSystem(OpenAI.configForKey(key), systemPrompt, prompt);
    let assistantMsg : ChatTypes.ChatMessage = { role = #assistant; content = reply; timestamp = Time.now() };
    Chat.appendMessage(chatHistory, caller, assistantMsg);
    reply;
  };

  /// Retrieve the current conversation history for the caller.
  public query ({ caller }) func getChatHistory() : async [ChatTypes.ChatMessage] {
    if (caller.isAnonymous()) { Runtime.trap("Sign in to use this feature") };
    Chat.getHistory(chatHistory, caller);
  };

  /// Clear the caller's conversation history.
  public shared ({ caller }) func clearChatHistory() : async () {
    if (caller.isAnonymous()) { Runtime.trap("Sign in to use this feature") };
    Chat.clearHistory(chatHistory, caller);
  };
};
