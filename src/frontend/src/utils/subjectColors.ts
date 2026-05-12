// Maps subjectId to Tailwind utility classes and OKLCH vars defined in index.css

export interface SubjectColors {
  bgClass: string; // e.g. "subject-math"
  lightBg: string; // light tint for card backgrounds
  borderClass: string; // border color
  progressColor: string; // inline style value for progress bar
  emoji: string; // default emoji fallback
}

const SUBJECT_MAP: Record<string, SubjectColors> = {
  math: {
    bgClass: "subject-math",
    lightBg: "bg-[oklch(0.97_0.04_35)]",
    borderClass: "border-[oklch(0.65_0.22_35)]",
    progressColor: "oklch(0.65 0.22 35)",
    emoji: "📐",
  },
  science: {
    bgClass: "subject-science",
    lightBg: "bg-[oklch(0.97_0.04_125)]",
    borderClass: "border-[oklch(0.62_0.18_125)]",
    progressColor: "oklch(0.62 0.18 125)",
    emoji: "🔬",
  },
  social: {
    bgClass: "subject-social",
    lightBg: "bg-[oklch(0.97_0.04_270)]",
    borderClass: "border-[oklch(0.68_0.2_270)]",
    progressColor: "oklch(0.68 0.2 270)",
    emoji: "🌍",
  },
  english: {
    bgClass: "subject-english",
    lightBg: "bg-[oklch(0.97_0.04_230)]",
    borderClass: "border-[oklch(0.65_0.2_230)]",
    progressColor: "oklch(0.65 0.2 230)",
    emoji: "📖",
  },
  hindi: {
    bgClass: "subject-hindi",
    lightBg: "bg-[oklch(0.97_0.04_10)]",
    borderClass: "border-[oklch(0.62_0.18_10)]",
    progressColor: "oklch(0.62 0.18 10)",
    emoji: "प",
  },
};

const FALLBACK: SubjectColors = {
  bgClass: "bg-primary",
  lightBg: "bg-secondary",
  borderClass: "border-primary",
  progressColor: "oklch(0.65 0.22 35)",
  emoji: "📚",
};

export function getSubjectColors(subjectId: string): SubjectColors {
  return SUBJECT_MAP[subjectId.toLowerCase()] ?? FALLBACK;
}

export function getSubjectEmoji(subjectId: string): string {
  return SUBJECT_MAP[subjectId.toLowerCase()]?.emoji ?? "📚";
}
