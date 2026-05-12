// Re-export types from backend.d.ts for convenient local usage
export type {
  Subject,
  SubjectId,
  Chapter,
  ChapterId,
  Bookmark,
  QuizScore,
  ChatMessage,
  ProgressSummary,
  Timestamp,
} from "./backend";

export { MessageRole } from "./backend";

// UI-only types
export interface SubjectMeta {
  id: string;
  colorClass: string;
  bgVar: string;
  textVar: string;
  hoverClass: string;
}

export interface NavItem {
  label: string;
  path: string;
  icon: string;
  ocid: string;
}
