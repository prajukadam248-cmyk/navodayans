import Common "common";

module {
  public type MessageRole = { #user; #assistant };

  public type ChatMessage = {
    role : MessageRole;
    content : Text;
    timestamp : Common.Timestamp;
  };
};
