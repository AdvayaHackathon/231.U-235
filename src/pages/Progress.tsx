import React from 'react';
import { Trophy, Target, Smile, Calendar } from 'lucide-react';
import { useProgressStore } from '../store/progress';

function Progress() {
  const { streak, sessionsCompleted, moodImprovement, achievements } = useProgressStore();

  const stats = [
    { label: 'Daily Streak', value: `${streak} days`, icon: Trophy },
    { label: 'Sessions Completed', value: sessionsCompleted.toString(), icon: Target },
    { label: 'Mood Improvement', value: `+${moodImprovement}%`, icon: Smile },
    { label: 'Next Session', value: 'Tomorrow', icon: Calendar },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Your Progress</h1>
        <p className="text-lg text-gray-600">Track your mental wellness journey</p>
      </header>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Statistics</h2>
          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <Icon className="h-5 w-5 text-blue-500 mr-2" />
                    <span className="text-sm text-gray-600">{stat.label}</span>
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Achievements</h2>
          <div className="space-y-4">
            {achievements.map((achievement) => (
              <div
                key={achievement.id}
                className={`p-4 rounded-lg ${
                  achievement.achieved ? 'bg-blue-50' : 'bg-gray-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Trophy
                      className={`h-5 w-5 mr-2 ${
                        achievement.achieved ? 'text-blue-500' : 'text-gray-400'
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
                    className="h-full bg-blue-500 transition-all duration-300"
                    style={{
                      width: `${(achievement.progress / achievement.target) * 100}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Progress;