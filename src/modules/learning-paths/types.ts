export type LearningPath = {
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
    description?: string;
    completed: boolean;
    resources?: Array<{
      id: string;
      title: string;
      type: string;
      url: string;
    }>;
  }>;
};
