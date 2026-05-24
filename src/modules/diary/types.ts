import { LessonPlan } from "../planner/types";

export type DiaryEntry = {
  id: string;
  lessonPlanId: string;
  whatWorked: string;
  whatFailed?: string;
  studentResponse?: string;
  inclusionReflection?: string;
  createdAt: string;
  lessonPlan?: Pick<LessonPlan, "id" | "title">;
};
