export type ProfileSummary = {
  learningPathsCompleted: number;
  learningPathsInProgress: number;
  lessonPlansCount: number;
  diaryEntriesCount: number;
  activeLearningPaths: Array<{
    id: string;
    title: string;
    progress: number;
  }>;
};

export type AchievementType =
  | "FIRST_STEPS"
  | "DEDICATED_LEARNER"
  | "PLANNING_MASTER"
  | "REFLECTIVE_PROFESSIONAL"
  | "KNOWLEDGE_SEEKER"
  | "MASTER_TEACHER";

export type Achievement = {
  type: AchievementType;
  title: string;
  description: string;
  current: number;
  target: number;
  achieved: boolean;
};

export type AchievementViewModel = Achievement & {
  percentage: number;
  statusLabel: "Conquistada" | "Em progresso";
};
