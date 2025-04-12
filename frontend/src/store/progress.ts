import { create } from 'zustand';

interface Achievement {
  id: string;
  title: string;
  description: string;
  progress: number;
  target: number;
  achieved: boolean;
}

interface ProgressState {
  streak: number;
  sessionsCompleted: number;
  moodImprovement: number;
  achievements: Achievement[];
  incrementStreak: () => void;
  completeSession: () => void;
  updateMood: (value: number) => void;
  updateAchievementProgress: (id: string, progress: number) => void;
}

export const useProgressStore = create<ProgressState>((set) => ({
  streak: 0,
  sessionsCompleted: 0,
  moodImprovement: 0,
  achievements: [
    {
      id: '1',
      title: 'Consistency Champion',
      description: 'Complete 5 consecutive daily sessions',
      progress: 0,
      target: 5,
      achieved: false,
    },
    {
      id: '2',
      title: 'Mood Master',
      description: 'Achieve 30% mood improvement',
      progress: 0,
      target: 30,
      achieved: false,
    },
    {
      id: '3',
      title: 'Session Superstar',
      description: 'Complete 10 sessions',
      progress: 0,
      target: 10,
      achieved: false,
    },
  ],
  incrementStreak: () =>
    set((state) => ({
      streak: state.streak + 1,
      achievements: state.achievements.map((achievement) => {
        if (achievement.id === '1') {
          const newProgress = Math.min(achievement.progress + 1, achievement.target);
          return {
            ...achievement,
            progress: newProgress,
            achieved: newProgress === achievement.target,
          };
        }
        return achievement;
      }),
    })),
  completeSession: () =>
    set((state) => ({
      sessionsCompleted: state.sessionsCompleted + 1,
      achievements: state.achievements.map((achievement) => {
        if (achievement.id === '3') {
          const newProgress = Math.min(achievement.progress + 1, achievement.target);
          return {
            ...achievement,
            progress: newProgress,
            achieved: newProgress === achievement.target,
          };
        }
        return achievement;
      }),
    })),
  updateMood: (value) =>
    set((state) => ({
      moodImprovement: value,
      achievements: state.achievements.map((achievement) => {
        if (achievement.id === '2') {
          const newProgress = Math.min(value, achievement.target);
          return {
            ...achievement,
            progress: newProgress,
            achieved: newProgress === achievement.target,
          };
        }
        return achievement;
      }),
    })),
  updateAchievementProgress: (id, progress) =>
    set((state) => ({
      achievements: state.achievements.map((achievement) => {
        if (achievement.id === id) {
          const newProgress = Math.min(progress, achievement.target);
          return {
            ...achievement,
            progress: newProgress,
            achieved: newProgress === achievement.target,
          };
        }
        return achievement;
      }),
    })),
}));