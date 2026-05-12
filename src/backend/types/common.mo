import Time "mo:core/Time";

module {
  public type UserId = Principal;
  public type Timestamp = Int; // Time.now() returns Int (nanoseconds)
  public type SubjectId = Text; // e.g. "math", "science"
  public type ChapterId = Text; // e.g. "math-ch1"
};
