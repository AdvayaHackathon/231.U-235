import { create } from 'zustand';

interface Achievement {
  id: number;
  title: string;
  description: string;
  achieved: boolean;
  progress: number;
  target: number;
}

interface ProgressState {
  streak: number;
  sessionsCompleted: number;
  moodImprovement: number;
  achievements: Achievement[];
  updateStreak: (streak: number) => void;
  completeSession: () => void;
  updateMood: (improvement: number) => void;
  updateAchievement: (id: number, progress: number) => void;
}

export const useProgressStore = create<ProgressState>((set) => ({
  streak: 7,
  sessionsCompleted: 12,
  moodImprovement: 25,
  achievements: [
    {
      id: 1,
      title: 'First Step',
      description: 'Complete your first session',
      achieved: true,
      progress: 1,
      target: 1,
    },
    {
      id: 2,
      title: 'Week Warrior',
      description: 'Maintain a 7-day streak',
      achieved: true,
      progress: 7,
      target: 7,
    },
    {
      id: 3,
      title: 'Mindfulness Master',
      description: 'Complete 10 meditation sessions',
      achieved: false,
      progress: 7,
      target: 10,
    },
    {
      id: 4,
      title: 'Consistency King',
      description: 'Complete 30 days of exercises',
      achieved: false,
      progress: 12,
      target: 30,
    },
  ],
  updateStreak: (streak) => set({ streak }),
  completeSession: () =>
    set((state) => ({
      sessionsCompleted: state.sessionsCompleted + 1,
      achievements: state.achievements.map((achievement) => {
        if (achievement.id === 3 || achievement.id === 4) {
          const newProgress = achievement.progress + 1;
          return {
            ...achievement,
            progress: newProgress,
            achieved: newProgress >= achievement.target,
          };
        }
        return achievement;
      }),
    })),
  updateMood: (improvement) => set({ moodImprovement: improvement }),
  updateAchievement: (id, progress) =>
    set((state) => ({
      achievements: state.achievements.map((achievement) =>
        achievement.id === id
          ? {
              ...achievement,
              progress,
              achieved: progress >= achievement.target,
            }
          : achievement
      ),
    })),
}));