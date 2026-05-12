import type { backendInterface, MessageRole, UserRole } from "../backend";

const now = BigInt(Date.now()) * BigInt(1_000_000);

export const mockBackend: backendInterface = {
  _initializeAccessControl: async () => undefined,
  addBookmark: async () => undefined,
  askAssistant: async (_prompt: string) =>
    "Great question! Rational numbers are numbers that can be expressed as a fraction p/q where p and q are integers and q ≠ 0. For example, 1/2, -3/4, and 5 (which is 5/1) are all rational numbers. They appear everywhere in real life — like cutting a pizza into equal slices! 🍕",
  assignCallerUserRole: async () => undefined,
  clearChatHistory: async () => undefined,
  clearMyOpenAIApiKey: async () => undefined,
  getBookmarks: async () => [
    { chapterId: "ch-math-1", addedAt: now, subjectId: "math" },
    { chapterId: "ch-science-3", addedAt: now, subjectId: "science" },
  ],
  getCallerUserRole: async () => "user" as unknown as UserRole,
  getChapters: async (subjectId: string) => {
    const chaptersMap: Record<string, Array<{ id: string; title: string; subjectId: string; number: bigint }>> = {
      math: [
        { id: "ch-math-1", title: "Rational Numbers", subjectId: "math", number: BigInt(1) },
        { id: "ch-math-2", title: "Linear Equations in One Variable", subjectId: "math", number: BigInt(2) },
        { id: "ch-math-3", title: "Understanding Quadrilaterals", subjectId: "math", number: BigInt(3) },
        { id: "ch-math-4", title: "Practical Geometry", subjectId: "math", number: BigInt(4) },
        { id: "ch-math-5", title: "Data Handling", subjectId: "math", number: BigInt(5) },
      ],
      science: [
        { id: "ch-sci-1", title: "Crop Production and Management", subjectId: "science", number: BigInt(1) },
        { id: "ch-sci-2", title: "Microorganisms: Friend and Foe", subjectId: "science", number: BigInt(2) },
        { id: "ch-sci-3", title: "Synthetic Fibres and Plastics", subjectId: "science", number: BigInt(3) },
        { id: "ch-sci-4", title: "Materials: Metals and Non-Metals", subjectId: "science", number: BigInt(4) },
      ],
      social_science: [
        { id: "ch-ss-1", title: "The Indian Constitution", subjectId: "social_science", number: BigInt(1) },
        { id: "ch-ss-2", title: "Understanding Secularism", subjectId: "social_science", number: BigInt(2) },
        { id: "ch-ss-3", title: "Why Do We Need a Parliament?", subjectId: "social_science", number: BigInt(3) },
      ],
      english: [
        { id: "ch-eng-1", title: "The Best Christmas Present in the World", subjectId: "english", number: BigInt(1) },
        { id: "ch-eng-2", title: "The Tsunami", subjectId: "english", number: BigInt(2) },
        { id: "ch-eng-3", title: "Glimpses of the Past", subjectId: "english", number: BigInt(3) },
      ],
      hindi: [
        { id: "ch-hin-1", title: "ध्वनि", subjectId: "hindi", number: BigInt(1) },
        { id: "ch-hin-2", title: "लाख की चूड़ियाँ", subjectId: "hindi", number: BigInt(2) },
        { id: "ch-hin-3", title: "बस की यात्रा", subjectId: "hindi", number: BigInt(3) },
        { id: "ch-hin-4", title: "दीवानों की हस्ती", subjectId: "hindi", number: BigInt(4) },
      ],
    };
    return chaptersMap[subjectId] ?? [];
  },
  getChatHistory: async () => [
    {
      content: "Hi Navu! Can you explain rational numbers?",
      role: "user" as unknown as MessageRole,
      timestamp: now - BigInt(60_000_000_000),
    },
    {
      content:
        "Sure! Rational numbers are numbers that can be written as p/q where p and q are integers and q ≠ 0. Examples: 1/2, -3/4, 5. They include all integers too! 😊",
      role: "assistant" as unknown as MessageRole,
      timestamp: now - BigInt(30_000_000_000),
    },
  ],
  getProgressSummary: async () => ({
    avgScore: BigInt(88),
    totalCompleted: BigInt(12),
    totalBookmarks: BigInt(2),
    totalQuizzesTaken: BigInt(8),
  }),
  getRecentQuizScores: async () => [
    { subject: "math", chapterId: "ch-math-1", score: BigInt(9), takenAt: now, totalQuestions: BigInt(10) },
    { subject: "science", chapterId: "ch-sci-3", score: BigInt(7), takenAt: now, totalQuestions: BigInt(10) },
    { subject: "english", chapterId: "ch-eng-2", score: BigInt(8), takenAt: now, totalQuestions: BigInt(10) },
  ],
  getSubjects: async () => [
    { id: "math", name: "Math", emoji: "📐" },
    { id: "science", name: "Science", emoji: "🔬" },
    { id: "social_science", name: "Social Science", emoji: "🌍" },
    { id: "english", name: "English", emoji: "📖" },
    { id: "hindi", name: "Hindi", emoji: "✍️" },
  ],
  isCallerAdmin: async () => false,
  isMyOpenAIConfigured: async () => true,
  markChapterComplete: async () => undefined,
  removeBookmark: async () => undefined,
  saveQuizScore: async () => undefined,
  setMyOpenAIApiKey: async () => undefined,
};
