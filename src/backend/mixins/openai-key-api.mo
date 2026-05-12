import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";

mixin (
  accessControlState : AccessControl.AccessControlState,
  openAIKeys : Map.Map<Principal, Text>,
) {
  /// Returns whether the caller has stored an OpenAI API key.
  public query ({ caller }) func isMyOpenAIConfigured() : async Bool {
    openAIKeys.containsKey(caller);
  };

  /// Store (or replace) the caller's OpenAI API key.
  public shared ({ caller }) func setMyOpenAIApiKey(key : Text) : async () {
    if (caller.isAnonymous()) {
      Runtime.trap("Sign in to use this feature");
    };
    openAIKeys.add(caller, key);
  };

  /// Remove the caller's stored OpenAI API key.
  public shared ({ caller }) func clearMyOpenAIApiKey() : async () {
    if (caller.isAnonymous()) {
      Runtime.trap("Sign in to use this feature");
    };
    openAIKeys.remove(caller);
  };
};
