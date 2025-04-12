import { useState } from 'react';
import ExerciseCard from '../components/ExerciseCard';
import Timer from '../components/Timer';
import AudioPlayer from '../components/AudioPlayer'
import { useProgressStore } from '../store/progress';

const exercises = [
  {
    id: 1,
    title: 'Deep Breathing',
    imageUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=500',
    duration: '5 minutes',
    instructions: 'Inhale deeply through your nose for 4 counts, hold for 4, exhale for 4.',
  },
  {
    id: 2,
    title: 'Progressive Relaxation',
    imageUrl: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=500',
    duration: '10 minutes',
    instructions: 'Tense and relax each muscle group, starting from toes to head.',
  },
  {
    id: 3,
    title: 'Mindful Meditation',
    imageUrl: 'https://images.unsplash.com/photo-1593811167562-9cef47bfc4d7?auto=format&fit=crop&q=80&w=500',
    duration: '15 minutes',
    instructions: 'Focus on your breath and observe your thoughts without judgment.',
  },
];

const audioTracks = [
  {
    label: 'Birds Chirping',
    url: 'https://assets.mixkit.co/active_storage/sfx/2516/2516.wav',
  },
  {
    label: 'Ocean Waves',
    url: 'https://assets.mixkit.co/active_storage/sfx/2515/2515.wav',
  },
  {
    label: 'Rain Sounds',
    url: 'https://assets.mixkit.co/active_storage/sfx/2517/2517.wav',
  },
];

function App() {
  const [selectedExercise, setSelectedExercise] = useState<typeof exercises[0] | null>(null);
  const [isExerciseActive, setIsExerciseActive] = useState(false);

  const { completeSession, incrementStreak, updateMood } = useProgressStore();

const handleExerciseComplete = () => {
  completeSession(); // Marks a session as completed
  incrementStreak(); // Increments streak
  updateMood(Math.min(useProgressStore.getState().moodImprovement + 10, 100)); // Slightly improve mood

  setIsExerciseActive(false);
  setSelectedExercise(null);
};

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8">Stress Relief Exercises</h1>
        
        {selectedExercise ? (
          <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-2xl font-semibold mb-2">{selectedExercise.title}</h2>
                <p className="text-gray-600">{selectedExercise.instructions}</p>
              </div>
              <Timer 
                duration={parseInt(selectedExercise.duration) * 60}
                isActive={isExerciseActive}
                onComplete={handleExerciseComplete}
              />
            </div>
            <img 
              src={selectedExercise.imageUrl}
              alt={selectedExercise.title}
              className="w-full h-64 object-cover rounded-lg mb-6"
            />
            <div className="grid grid-cols-3 gap-4">
              {audioTracks.map((track) => (
                <AudioPlayer 
                  key={track.label}
                  audioUrl={track.url}
                  label={track.label}
                />
              ))}
            </div>
            <button
              onClick={() => setIsExerciseActive(true)}
              className="mt-6 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
            >
              Start Exercise
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {exercises.map((exercise) => (
              <ExerciseCard
                key={exercise.id}
                title={exercise.title}
                imageUrl={exercise.imageUrl}
                duration={exercise.duration}
                onSelect={() => setSelectedExercise(exercise)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;