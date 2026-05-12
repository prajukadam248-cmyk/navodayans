import Map "mo:core/Map";
import List "mo:core/List";
import Principal "mo:core/Principal";
import AccessControl "mo:caffeineai-authorization/access-control";
import MixinAuthorization "mo:caffeineai-authorization/MixinAuthorization";
import StudyTypes "types/study";
import ChatTypes "types/chat";
import MixinStudyApi "mixins/study-api";
import MixinChatApi "mixins/chat-api";
import MixinOpenAIKeyApi "mixins/openai-key-api";

actor {
  // ---- Authorization ----
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // ---- Study state (per-user) ----
  let bookmarks = Map.empty<Principal, List.List<StudyTypes.Bookmark>>();
  let completions = Map.empty<Principal, List.List<StudyTypes.CompletionStatus>>();
  let quizScores = Map.empty<Principal, List.List<StudyTypes.QuizScore>>();
  include MixinStudyApi(accessControlState, bookmarks, completions, quizScores);

  // ---- Per-user OpenAI keys ----
  let openAIKeys = Map.empty<Principal, Text>();
  include MixinOpenAIKeyApi(accessControlState, openAIKeys);

  // ---- AI chat history (per-user) ----
  let chatHistory = Map.empty<Principal, List.List<ChatTypes.ChatMessage>>();
  include MixinChatApi(accessControlState, chatHistory, openAIKeys);
};
