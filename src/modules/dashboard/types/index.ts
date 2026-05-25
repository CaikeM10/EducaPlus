export type LearningPathSummary = {
  id: string;
  title: string;
  description: string;
  level: string;
  category: string;
  duration?: string;
  progress: number;
  steps: Array<{
    id: string;
    title: string;
    completed: boolean;
  }>;
};

export type Recommendation = {
  id: string;
  reason?: string | null;
  learningPathId?: string | null;
  resourceId?: string | null;
  learningPath?: {
    id: string;
    title: string;
    description: string;
  } | null;
  resource?: {
    title: string;
    description?: string;
  } | null;
};

export type LearningPathRecommendation = Recommendation & {
  learningPath: NonNullable<Recommendation["learningPath"]>;
};

export type ResourceRecommendation = Recommendation & {
  resource: NonNullable<Recommendation["resource"]>;
};

export type LearningPathRecommendationViewModel = {
  id: string;
  title: string;
  description: string;
  href: string;
  badge: string;
  totalLessons: number;
  progress: number;
  buttonLabel: "Começar" | "Continuar";
};

export type ResourceRecommendationViewModel = {
  id: string;
  title: string;
  description: string;
  href: string;
};

export type ActivityType =
  | "LEARNING_PATH_STARTED"
  | "LEARNING_PATH_COMPLETED"
  | "LESSON_PLAN_CREATED"
  | "LESSON_PLAN_UPDATED"
  | "DIARY_CREATED"
  | "DIARY_UPDATED";

export type ActivityItem = {
  id: string;
  type: ActivityType;
  title: string;
  occurredAt: string;
  status: "success" | "info" | "warning";
  entityId: string;
};

export type ActivityViewModel = {
  id: string;
  type: ActivityType;
  label: string;
  title: string;
  relativeDate: string;
  status: "success" | "info" | "warning";
};

export type DashboardViewModel = {
  lessonPlanCount: number;
  activeLearningPathCount: number;
  overallProgress: number;
  learningPathRecommendations: LearningPathRecommendationViewModel[];
  resourceRecommendations: ResourceRecommendationViewModel[];
  recentActivities: ActivityViewModel[];
};
