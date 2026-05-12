import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type ChapterId = string;
export interface Chapter {
    id: ChapterId;
    title: string;
    subjectId: SubjectId;
    number: bigint;
}
export type Timestamp = bigint;
export interface Bookmark {
    chapterId: ChapterId;
    addedAt: Timestamp;
    subjectId: SubjectId;
}
export interface QuizScore {
    subject: SubjectId;
    chapterId: ChapterId;
    score: bigint;
    takenAt: Timestamp;
    totalQuestions: bigint;
}
export interface ChatMessage {
    content: string;
    role: MessageRole;
    timestamp: Timestamp;
}
export type SubjectId = string;
export interface Subject {
    id: SubjectId;
    name: string;
    emoji: string;
}
export interface ProgressSummary {
    avgScore: bigint;
    totalCompleted: bigint;
    totalBookmarks: bigint;
    totalQuizzesTaken: bigint;
}
export enum MessageRole {
    user = "user",
    assistant = "assistant"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addBookmark(chapterId: ChapterId, subjectId: SubjectId): Promise<void>;
    askAssistant(prompt: string): Promise<string>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    clearChatHistory(): Promise<void>;
    clearMyOpenAIApiKey(): Promise<void>;
    getBookmarks(): Promise<Array<Bookmark>>;
    getCallerUserRole(): Promise<UserRole>;
    getChapters(subjectId: SubjectId): Promise<Array<Chapter>>;
    getChatHistory(): Promise<Array<ChatMessage>>;
    getProgressSummary(): Promise<ProgressSummary>;
    getRecentQuizScores(limit: bigint): Promise<Array<QuizScore>>;
    getSubjects(): Promise<Array<Subject>>;
    isCallerAdmin(): Promise<boolean>;
    isMyOpenAIConfigured(): Promise<boolean>;
    markChapterComplete(chapterId: ChapterId, subjectId: SubjectId): Promise<void>;
    removeBookmark(chapterId: ChapterId): Promise<void>;
    saveQuizScore(subject: SubjectId, chapterId: ChapterId, score: bigint, totalQuestions: bigint): Promise<void>;
    setMyOpenAIApiKey(key: string): Promise<void>;
}
