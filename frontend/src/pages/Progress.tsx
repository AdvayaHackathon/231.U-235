import { Trophy, Target, Smile, Calendar } from 'lucide-react';
import { useProgressStore } from '../store/progress';
import { useEffect, useState } from 'react';

function Progress() {
  const {
    streak,
    sessionsCompleted,
    moodImprovement,
    achievements,
  } = useProgressStore();

  // Track which achievements have shown completion animation
  const [completedAnimations, setCompletedAnimations] = useState<Set<string>>(new Set());

  // Check for newly completed achievements
  useEffect(() => {
    achievements.forEach((achievement) => {
      if (achievement.achieved && !completedAnimations.has(achievement.id)) {
        setCompletedAnimations((prev) => new Set([...prev, achievement.id]));
      }
    });
  }, [achievements, completedAnimations]);

  const stats = [
    { label: 'Daily Streak', value: `${streak} days`, icon: Trophy },
    { label: 'Sessions Completed', value: sessionsCompleted.toString(), icon: Target },
    { label: 'Mood Improvement', value: `${moodImprovement}%`, icon: Smile },
    { label: 'Next Session', value: 'Tomorrow', icon: Calendar },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Your Progress</h1>
        <p className="text-lg text-gray-600">Track your mental wellness journey</p>
      </header>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Statistics */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Statistics</h2>
          <div className="grid grid-cols-2 gap-4">
            {stats.map(({ label, value, icon: Icon }) => (
              <div key={label} className="bg-gray-50 rounded-lg p-4 transform transition-all duration-300 hover:scale-105">
                <div className="flex items-center mb-2">
                  <Icon className="h-5 w-5 text-blue-500 mr-2" />
                  <span className="text-sm text-gray-600">{label}</span>
                </div>
                <div className="text-2xl font-bold text-gray-900">{value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Achievements */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Achievements</h2>
          <div className="space-y-4">
            {achievements.length === 0 ? (
              <p className="text-gray-500">No achievements yet. Keep going!</p>
            ) : (
              achievements.map((achievement) => {
                const progressPercent = Math.min(
                  100,
                  (achievement.progress / achievement.target) * 100
                );
                const isNewlyCompleted = achievement.achieved && completedAnimations.has(achievement.id);

                return (
                  <div
                    key={achievement.id}
                    className={`p-4 rounded-lg transition-all duration-500 transform ${
                      achievement.achieved 
                        ? 'bg-blue-50 hover:shadow-lg' 
                        : 'bg-gray-50'
                    } ${
                      isNewlyCompleted 
                        ? 'animate-[pulse_1s_ease-in-out_2]' 
                        : ''
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Trophy
                          className={`h-5 w-5 mr-2 transition-all duration-500 ${
                            achievement.achieved 
                              ? 'text-blue-500 animate-[bounce_1s_ease-in-out]' 
                              : 'text-gray-400'
                          }`}
                        />
                        <div>
                          <h3 className="font-medium">{achievement.title}</h3>
                          <p className="text-sm text-gray-600">{achievement.description}</p>
                        </div>
                      </div>
                      <div className="text-sm font-medium">
                        {achievement.progress}/{achievement.target}
                      </div>
                    </div>
                    <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all duration-1000 ease-out ${
                          progressPercent === 100 
                            ? 'bg-green-500 animate-[pulse_1s_ease-in-out_infinite]' 
                            : 'bg-blue-500'
                        }`}
                        style={{ width: `${progressPercent}%` }}
                      />
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Progress;