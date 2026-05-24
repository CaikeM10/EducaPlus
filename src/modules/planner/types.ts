export type LessonPlan = {
  id: string;
  title: string;
  description: string;
  content: string;
  objectives: string[];
  strategies: string[];
  inclusions: string[];
  createdAt: string;
};

export type CreateLessonPlanInput = {
  title: string;
  description: string;
  content: string;
  objectives: string[];
  strategies: string[];
  inclusions: string[];
};
