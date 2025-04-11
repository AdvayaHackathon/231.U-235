import React, { useEffect } from 'react';
import { Play, Pause } from 'lucide-react';
import { Button } from '../components/ui/button';
import { useExerciseStore } from '../store/exercises';

function StressRelief() {
  const { exercises, activeExercise, startExercise, stopExercise, updateTimeRemaining } = useExerciseStore();

  useEffect(() => {
    let interval: number;

    if (activeExercise) {
      interval = setInterval(() => {
        updateTimeRemaining(
          activeExercise.id,
          Math.max(0, activeExercise.timeRemaining - 1)
        );

        if (activeExercise.timeRemaining <= 0) {
          stopExercise();
        }
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [activeExercise, updateTimeRemaining, stopExercise]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="max-w-4xl mx-auto">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Stress Relief Exercises</h1>
        <p className="text-lg text-gray-600">Take a moment to relax and recharge</p>
      </header>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {exercises.map((exercise) => (
          <div key={exercise.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
            <img
              src={exercise.image}
              alt={exercise.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">{exercise.title}</h3>
              <p className="text-gray-600 mb-4">{exercise.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">
                  {exercise.isActive
                    ? formatTime(exercise.timeRemaining)
                    : exercise.duration}
                </span>
                <Button
                  onClick={() =>
                    exercise.isActive ? stopExercise() : startExercise(exercise.id)
                  }
                >
                  {exercise.isActive ? (
                    <>
                      <Pause className="h-4 w-4 mr-2" />
                      Stop
                    </>
                  ) : (
                    <>
                      <Play className="h-4 w-4 mr-2" />
                      Start
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default StressRelief;