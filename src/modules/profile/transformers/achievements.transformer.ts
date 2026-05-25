import { Achievement, AchievementViewModel } from "../types";

export function toAchievementViewModel(
  achievement: Achievement,
): AchievementViewModel {
  const percentage =
    achievement.target === 0
      ? 0
      : Math.min(100, Math.round((achievement.current / achievement.target) * 100));

  return {
    ...achievement,
    percentage,
    statusLabel: achievement.achieved ? "Conquistada" : "Em progresso",
  };
}
