import Map "mo:core/Map";
import List "mo:core/List";
import Principal "mo:core/Principal";
import ChatTypes "../types/chat";

module {
  // Max messages kept per user in conversation history.
  public let MAX_HISTORY : Nat = 20;

  public func getHistory(
    history : Map.Map<Principal, List.List<ChatTypes.ChatMessage>>,
    user : Principal,
  ) : [ChatTypes.ChatMessage] {
    switch (history.get(user)) {
      case (?list) list.toArray();
      case null [];
    };
  };

  public func appendMessage(
    history : Map.Map<Principal, List.List<ChatTypes.ChatMessage>>,
    user : Principal,
    msg : ChatTypes.ChatMessage,
  ) : () {
    let list = switch (history.get(user)) {
      case (?l) l;
      case null {
        let l = List.empty<ChatTypes.ChatMessage>();
        history.add(user, l);
        l;
      };
    };
    list.add(msg);
    // Trim to MAX_HISTORY: keep only the most recent MAX_HISTORY messages
    if (list.size() > MAX_HISTORY) {
      let all = list.toArray();
      let start = all.size() - MAX_HISTORY;
      list.clear();
      list.addAll(all.values().drop(start));
    };
  };

  public func clearHistory(
    history : Map.Map<Principal, List.List<ChatTypes.ChatMessage>>,
    user : Principal,
  ) : () {
    switch (history.get(user)) {
      case (?list) list.clear();
      case null {};
    };
  };
};
