import { create } from 'zustand';

interface Exercise {
  id: number;
  title: string;
  duration: string;
  description: string;
  image: string;
  isActive: boolean;
  timeRemaining: number;
}

interface ExerciseState {
  exercises: Exercise[];
  activeExercise: Exercise | null;
  startExercise: (id: number) => void;
  stopExercise: () => void;
  updateTimeRemaining: (id: number, time: number) => void;
}

export const useExerciseStore = create<ExerciseState>((set) => ({
  exercises: [
    {
      id: 1,
      title: 'Deep Breathing',
      duration: '5 minutes',
      description: 'Practice deep breathing exercises to reduce stress and anxiety.',
      image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=1000',
      isActive: false,
      timeRemaining: 300, // 5 minutes in seconds
    },
    {
      id: 2,
      title: 'Progressive Muscle Relaxation',
      duration: '10 minutes',
      description: 'Systematically tense and relax different muscle groups.',
      image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=1000',
      isActive: false,
      timeRemaining: 600, // 10 minutes in seconds
    },
    {
      id: 3,
      title: 'Guided Meditation',
      duration: '15 minutes',
      description: 'Follow a calming meditation session for mental clarity.',
      image: 'https://images.unsplash.com/photo-1593811167562-9cef47bfc4d7?auto=format&fit=crop&q=80&w=1000',
      isActive: false,
      timeRemaining: 900, // 15 minutes in seconds
    },
  ],
  activeExercise: null,
  startExercise: (id) =>
    set((state) => ({
      exercises: state.exercises.map((ex) =>
        ex.id === id ? { ...ex, isActive: true } : ex
      ),
      activeExercise: state.exercises.find((ex) => ex.id === id) || null,
    })),
  stopExercise: () =>
    set((state) => ({
      exercises: state.exercises.map((ex) => ({ ...ex, isActive: false })),
      activeExercise: null,
    })),
  updateTimeRemaining: (id, time) =>
    set((state) => ({
      exercises: state.exercises.map((ex) =>
        ex.id === id ? { ...ex, timeRemaining: time } : ex
      ),
    })),
}));