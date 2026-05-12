import Map "mo:core/Map";
import List "mo:core/List";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import Time "mo:core/Time";
import AccessControl "mo:caffeineai-authorization/access-control";
import Common "../types/common";
import StudyTypes "../types/study";
import Study "../lib/study";

mixin (
  accessControlState : AccessControl.AccessControlState,
  bookmarks : Map.Map<Principal, List.List<StudyTypes.Bookmark>>,
  completions : Map.Map<Principal, List.List<StudyTypes.CompletionStatus>>,
  quizScores : Map.Map<Principal, List.List<StudyTypes.QuizScore>>,
) {
  // ---- Static catalogue ----

  /// Returns the list of all 8th-grade NCERT subjects.
  public query func getSubjects() : async [StudyTypes.Subject] {
    Study.getSubjects();
  };

  /// Returns all chapters for the given subject.
  public query func getChapters(subjectId : Common.SubjectId) : async [StudyTypes.Chapter] {
    Study.getChapters(subjectId);
  };

  // ---- Bookmarks ----

  public query ({ caller }) func getBookmarks() : async [StudyTypes.Bookmark] {
    if (caller.isAnonymous()) { Runtime.trap("Sign in to use this feature") };
    Study.getBookmarks(bookmarks, caller);
  };

  public shared ({ caller }) func addBookmark(
    chapterId : Common.ChapterId,
    subjectId : Common.SubjectId,
  ) : async () {
    if (caller.isAnonymous()) { Runtime.trap("Sign in to use this feature") };
    Study.addBookmark(bookmarks, caller, chapterId, subjectId, Time.now());
  };

  public shared ({ caller }) func removeBookmark(chapterId : Common.ChapterId) : async () {
    if (caller.isAnonymous()) { Runtime.trap("Sign in to use this feature") };
    Study.removeBookmark(bookmarks, caller, chapterId);
  };

  // ---- Chapter completion ----

  public shared ({ caller }) func markChapterComplete(
    chapterId : Common.ChapterId,
    subjectId : Common.SubjectId,
  ) : async () {
    if (caller.isAnonymous()) { Runtime.trap("Sign in to use this feature") };
    Study.markChapterComplete(completions, caller, chapterId, subjectId, Time.now());
  };

  // ---- Quiz scores ----

  public shared ({ caller }) func saveQuizScore(
    subject : Common.SubjectId,
    chapterId : Common.ChapterId,
    score : Nat,
    totalQuestions : Nat,
  ) : async () {
    if (caller.isAnonymous()) { Runtime.trap("Sign in to use this feature") };
    Study.saveQuizScore(quizScores, caller, { subject; chapterId; score; totalQuestions; takenAt = Time.now() });
  };

  public query ({ caller }) func getRecentQuizScores(limit : Nat) : async [StudyTypes.QuizScore] {
    if (caller.isAnonymous()) { Runtime.trap("Sign in to use this feature") };
    Study.getRecentQuizScores(quizScores, caller, limit);
  };

  // ---- Progress summary ----

  public query ({ caller }) func getProgressSummary() : async StudyTypes.ProgressSummary {
    if (caller.isAnonymous()) { Runtime.trap("Sign in to use this feature") };
    Study.getProgressSummary(bookmarks, completions, quizScores, caller);
  };
};
