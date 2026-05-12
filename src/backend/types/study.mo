import Common "common";

module {
  // ---- Subject (static catalogue) ----
  public type Subject = {
    id : Common.SubjectId;   // e.g. "math"
    name : Text;             // e.g. "Mathematics"
    emoji : Text;            // e.g. "🔢"
  };

  // ---- Chapter (static catalogue) ----
  public type Chapter = {
    id : Common.ChapterId;   // e.g. "math-ch1"
    subjectId : Common.SubjectId;
    number : Nat;            // 1-based chapter number
    title : Text;            // e.g. "Rational Numbers"
  };

  // ---- Bookmark ----
  public type Bookmark = {
    chapterId : Common.ChapterId;
    subjectId : Common.SubjectId;
    addedAt : Common.Timestamp;
  };

  // ---- Chapter completion ----
  public type CompletionStatus = {
    chapterId : Common.ChapterId;
    subjectId : Common.SubjectId;
    completedAt : Common.Timestamp;
  };

  // ---- Quiz score ----
  public type QuizScore = {
    subject : Common.SubjectId;
    chapterId : Common.ChapterId;
    score : Nat;      // 0-100
    totalQuestions : Nat;
    takenAt : Common.Timestamp;
  };

  // ---- Progress summary (returned to frontend) ----
  public type ProgressSummary = {
    totalBookmarks : Nat;
    totalCompleted : Nat;
    totalQuizzesTaken : Nat;
    avgScore : Nat;   // 0-100, 0 when no quizzes
  };
};
