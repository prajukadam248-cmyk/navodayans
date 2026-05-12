const SUBJECT_MAP = {
  math: {
    bgClass: "subject-math",
    lightBg: "bg-[oklch(0.97_0.04_35)]",
    borderClass: "border-[oklch(0.65_0.22_35)]",
    progressColor: "oklch(0.65 0.22 35)",
    emoji: "📐"
  },
  science: {
    bgClass: "subject-science",
    lightBg: "bg-[oklch(0.97_0.04_125)]",
    borderClass: "border-[oklch(0.62_0.18_125)]",
    progressColor: "oklch(0.62 0.18 125)",
    emoji: "🔬"
  },
  social: {
    bgClass: "subject-social",
    lightBg: "bg-[oklch(0.97_0.04_270)]",
    borderClass: "border-[oklch(0.68_0.2_270)]",
    progressColor: "oklch(0.68 0.2 270)",
    emoji: "🌍"
  },
  english: {
    bgClass: "subject-english",
    lightBg: "bg-[oklch(0.97_0.04_230)]",
    borderClass: "border-[oklch(0.65_0.2_230)]",
    progressColor: "oklch(0.65 0.2 230)",
    emoji: "📖"
  },
  hindi: {
    bgClass: "subject-hindi",
    lightBg: "bg-[oklch(0.97_0.04_10)]",
    borderClass: "border-[oklch(0.62_0.18_10)]",
    progressColor: "oklch(0.62 0.18 10)",
    emoji: "प"
  }
};
const FALLBACK = {
  bgClass: "bg-primary",
  lightBg: "bg-secondary",
  borderClass: "border-primary",
  progressColor: "oklch(0.65 0.22 35)",
  emoji: "📚"
};
function getSubjectColors(subjectId) {
  return SUBJECT_MAP[subjectId.toLowerCase()] ?? FALLBACK;
}
function getSubjectEmoji(subjectId) {
  var _a;
  return ((_a = SUBJECT_MAP[subjectId.toLowerCase()]) == null ? void 0 : _a.emoji) ?? "📚";
}
export {
  getSubjectEmoji as a,
  getSubjectColors as g
};
