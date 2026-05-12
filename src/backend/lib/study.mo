import Map "mo:core/Map";
import List "mo:core/List";
import Principal "mo:core/Principal";
import Common "../types/common";
import StudyTypes "../types/study";
import Array "mo:core/Array";
import Nat "mo:core/Nat";

module {
  // ---- Static subject/chapter catalogue ----

  public func getSubjects() : [StudyTypes.Subject] {
    [
      { id = "math"; name = "Mathematics"; emoji = "🔢" },
      { id = "science"; name = "Science"; emoji = "🔬" },
      { id = "social"; name = "Social Science"; emoji = "🌍" },
      { id = "english"; name = "English"; emoji = "📖" },
      { id = "hindi"; name = "Hindi"; emoji = "📝" },
    ];
  };

  public func getChapters(subjectId : Common.SubjectId) : [StudyTypes.Chapter] {
    switch (subjectId) {
      case "math" [
        { id = "math-ch1"; subjectId = "math"; number = 1; title = "Rational Numbers" },
        { id = "math-ch2"; subjectId = "math"; number = 2; title = "Linear Equations in One Variable" },
        { id = "math-ch3"; subjectId = "math"; number = 3; title = "Understanding Quadrilaterals" },
        { id = "math-ch4"; subjectId = "math"; number = 4; title = "Practical Geometry" },
        { id = "math-ch5"; subjectId = "math"; number = 5; title = "Data Handling" },
        { id = "math-ch6"; subjectId = "math"; number = 6; title = "Squares and Square Roots" },
        { id = "math-ch7"; subjectId = "math"; number = 7; title = "Cubes and Cube Roots" },
        { id = "math-ch8"; subjectId = "math"; number = 8; title = "Comparing Quantities" },
        { id = "math-ch9"; subjectId = "math"; number = 9; title = "Algebraic Expressions and Identities" },
        { id = "math-ch10"; subjectId = "math"; number = 10; title = "Visualising Solid Shapes" },
      ];
      case "science" [
        { id = "sci-ch1"; subjectId = "science"; number = 1; title = "Crop Production and Management" },
        { id = "sci-ch2"; subjectId = "science"; number = 2; title = "Microorganisms: Friend and Foe" },
        { id = "sci-ch3"; subjectId = "science"; number = 3; title = "Synthetic Fibres and Plastics" },
        { id = "sci-ch4"; subjectId = "science"; number = 4; title = "Materials: Metals and Non-Metals" },
        { id = "sci-ch5"; subjectId = "science"; number = 5; title = "Coal and Petroleum" },
        { id = "sci-ch6"; subjectId = "science"; number = 6; title = "Combustion and Flame" },
        { id = "sci-ch7"; subjectId = "science"; number = 7; title = "Conservation of Plants and Animals" },
        { id = "sci-ch8"; subjectId = "science"; number = 8; title = "Cell: Structure and Functions" },
        { id = "sci-ch9"; subjectId = "science"; number = 9; title = "Reproduction in Animals" },
        { id = "sci-ch10"; subjectId = "science"; number = 10; title = "Reaching the Age of Adolescence" },
      ];
      case "social" [
        { id = "soc-ch1"; subjectId = "social"; number = 1; title = "How, When and Where" },
        { id = "soc-ch2"; subjectId = "social"; number = 2; title = "From Trade to Territory" },
        { id = "soc-ch3"; subjectId = "social"; number = 3; title = "Ruling the Countryside" },
        { id = "soc-ch4"; subjectId = "social"; number = 4; title = "Tribals, Dikus and the Vision of a Golden Age" },
        { id = "soc-ch5"; subjectId = "social"; number = 5; title = "When People Rebel: 1857 and After" },
        { id = "soc-ch6"; subjectId = "social"; number = 6; title = "Weavers, Iron Smelters and Factory Owners" },
        { id = "soc-ch7"; subjectId = "social"; number = 7; title = "Civilising the Native, Educating the Nation" },
        { id = "soc-ch8"; subjectId = "social"; number = 8; title = "Women, Caste and Reform" },
        { id = "soc-ch9"; subjectId = "social"; number = 9; title = "The Making of the National Movement" },
      ];
      case "english" [
        { id = "eng-ch1"; subjectId = "english"; number = 1; title = "The Best Christmas Present in the World" },
        { id = "eng-ch2"; subjectId = "english"; number = 2; title = "The Tsunami" },
        { id = "eng-ch3"; subjectId = "english"; number = 3; title = "Glimpses of the Past" },
        { id = "eng-ch4"; subjectId = "english"; number = 4; title = "Bepin Choudhury's Lapse of Memory" },
        { id = "eng-ch5"; subjectId = "english"; number = 5; title = "The Summit Within" },
        { id = "eng-ch6"; subjectId = "english"; number = 6; title = "This is Jody's Fawn" },
        { id = "eng-ch7"; subjectId = "english"; number = 7; title = "A Visit to Cambridge" },
        { id = "eng-ch8"; subjectId = "english"; number = 8; title = "A Short Monsoon Diary" },
      ];
      case "hindi" [
        { id = "hin-ch1"; subjectId = "hindi"; number = 1; title = "ध्वनि" },
        { id = "hin-ch2"; subjectId = "hindi"; number = 2; title = "लाख की चूड़ियाँ" },
        { id = "hin-ch3"; subjectId = "hindi"; number = 3; title = "बस की यात्रा" },
        { id = "hin-ch4"; subjectId = "hindi"; number = 4; title = "दीवानों की हस्ती" },
        { id = "hin-ch5"; subjectId = "hindi"; number = 5; title = "चिट्ठियों की अनूठी दुनिया" },
        { id = "hin-ch6"; subjectId = "hindi"; number = 6; title = "भगवान के डाकिए" },
        { id = "hin-ch7"; subjectId = "hindi"; number = 7; title = "क्या निराश हुआ जाए" },
        { id = "hin-ch8"; subjectId = "hindi"; number = 8; title = "यह सबसे कठिन समय नहीं" },
      ];
      case _ [];
    };
  };

  // ---- Bookmark helpers ----

  public func getBookmarks(
    bookmarks : Map.Map<Principal, List.List<StudyTypes.Bookmark>>,
    user : Principal,
  ) : [StudyTypes.Bookmark] {
    switch (bookmarks.get(user)) {
      case (?list) list.toArray();
      case null [];
    };
  };

  public func addBookmark(
    bookmarks : Map.Map<Principal, List.List<StudyTypes.Bookmark>>,
    user : Principal,
    chapterId : Common.ChapterId,
    subjectId : Common.SubjectId,
    now : Common.Timestamp,
  ) : () {
    let list = switch (bookmarks.get(user)) {
      case (?l) l;
      case null {
        let l = List.empty<StudyTypes.Bookmark>();
        bookmarks.add(user, l);
        l;
      };
    };
    // Avoid duplicate bookmarks for the same chapter
    let exists = list.find(func(b) { b.chapterId == chapterId }) != null;
    if (not exists) {
      list.add({ chapterId; subjectId; addedAt = now });
    };
  };

  public func removeBookmark(
    bookmarks : Map.Map<Principal, List.List<StudyTypes.Bookmark>>,
    user : Principal,
    chapterId : Common.ChapterId,
  ) : () {
    switch (bookmarks.get(user)) {
      case (?list) {
        let filtered = list.filter(func(b) { b.chapterId != chapterId });
        list.clear();
        list.append(filtered);
      };
      case null {};
    };
  };

  // ---- Chapter completion helpers ----

  public func markChapterComplete(
    completions : Map.Map<Principal, List.List<StudyTypes.CompletionStatus>>,
    user : Principal,
    chapterId : Common.ChapterId,
    subjectId : Common.SubjectId,
    now : Common.Timestamp,
  ) : () {
    let list = switch (completions.get(user)) {
      case (?l) l;
      case null {
        let l = List.empty<StudyTypes.CompletionStatus>();
        completions.add(user, l);
        l;
      };
    };
    // Avoid duplicate completions for the same chapter
    let exists = list.find(func(c) { c.chapterId == chapterId }) != null;
    if (not exists) {
      list.add({ chapterId; subjectId; completedAt = now });
    };
  };

  public func getCompletions(
    completions : Map.Map<Principal, List.List<StudyTypes.CompletionStatus>>,
    user : Principal,
  ) : [StudyTypes.CompletionStatus] {
    switch (completions.get(user)) {
      case (?list) list.toArray();
      case null [];
    };
  };

  // ---- Quiz score helpers ----

  public func saveQuizScore(
    quizScores : Map.Map<Principal, List.List<StudyTypes.QuizScore>>,
    user : Principal,
    entry : StudyTypes.QuizScore,
  ) : () {
    let list = switch (quizScores.get(user)) {
      case (?l) l;
      case null {
        let l = List.empty<StudyTypes.QuizScore>();
        quizScores.add(user, l);
        l;
      };
    };
    list.add(entry);
  };

  public func getRecentQuizScores(
    quizScores : Map.Map<Principal, List.List<StudyTypes.QuizScore>>,
    user : Principal,
    limit : Nat,
  ) : [StudyTypes.QuizScore] {
    switch (quizScores.get(user)) {
      case (?list) {
        let all = list.toArray();
        let size = all.size();
        if (size <= limit) { all } else {
          // Return the most recent `limit` entries (tail of array)
          all.sliceToArray(size.toInt() - limit.toInt(), size.toInt());
        };
      };
      case null [];
    };
  };

  // ---- Progress summary ----

  public func getProgressSummary(
    bookmarks : Map.Map<Principal, List.List<StudyTypes.Bookmark>>,
    completions : Map.Map<Principal, List.List<StudyTypes.CompletionStatus>>,
    quizScores : Map.Map<Principal, List.List<StudyTypes.QuizScore>>,
    user : Principal,
  ) : StudyTypes.ProgressSummary {
    let totalBookmarks = switch (bookmarks.get(user)) {
      case (?list) list.size();
      case null 0;
    };
    let totalCompleted = switch (completions.get(user)) {
      case (?list) list.size();
      case null 0;
    };
    let (totalQuizzesTaken, totalScore) = switch (quizScores.get(user)) {
      case (?list) {
        let n = list.size();
        let sum = list.foldLeft(0, func(acc, q) { acc + q.score });
        (n, sum);
      };
      case null (0, 0);
    };
    let avgScore = if (totalQuizzesTaken == 0) 0 else totalScore / totalQuizzesTaken;
    { totalBookmarks; totalCompleted; totalQuizzesTaken; avgScore };
  };
};
