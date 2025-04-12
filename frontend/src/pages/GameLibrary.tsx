import React, { useState } from 'react';
import { Brain, Compass, Flower2, Waves } from 'lucide-react';
import Confetti from 'react-confetti';

interface Game {
  id: string;
  title: string;
  description: string;
  url: string;
  icon: React.ReactNode;
  imageUrl: string;
}

const games: Game[] = [
  {
    id: 'cozy-roll',
    title: 'Cozy Village',
    description: 'A relaxing rolling experience to help reduce stress and anxiety',
    url: 'https://fellowdev.me/cozy-village',
    icon: <Waves className="w-6 h-6" />,
    imageUrl: 'https://images.unsplash.com/photo-1517582082532-16a092d47074?auto=format&fit=crop&q=80&w=1200',
  },
  {
    id: 'emotional-maze',
    title: 'Emotional Maze',
    description: 'Navigate through a maze while exploring and understanding your emotions',
    url: 'https://fellowdev.me/emotional-maze',
    icon: <Compass className="w-6 h-6" />,
    imageUrl: 'https://images.unsplash.com/photo-1604871000636-074fa5117945?auto=format&fit=crop&q=80&w=1200',
  },
  {
    id: 'dream-loop',
    title: 'Dream Loop',
    description: 'A meditative journey through calming loops and patterns',
    url: 'https://fellowdev.me/dream-loop',
    icon: <Flower2 className="w-6 h-6" />,
    imageUrl: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&q=80&w=1200',
  },
  {
    id: 'mind-roll',
    title: 'Mind Roll',
    description: 'Exercise your mind with this engaging cognitive wellness game',
    url: 'https://fellowdev.me/mind-roll',
    icon: <Brain className="w-6 h-6" />,
    imageUrl: 'https://images.unsplash.com/photo-1447069387593-a5de0862481e?auto=format&fit=crop&q=80&w=1200',
  },
];

function App() {
  const [progress, setProgress] = useState(0);

  const handleGameClick = () => {
    setProgress((prevProgress) => Math.min(prevProgress + 25, 100)); // Increment progress by 25%, max 100%
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100">
      {progress === 100 && <Confetti />} {/* Show confetti when progress is 100% */}
      <div className="container mx-auto px-4 py-12">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-blue-900 mb-4">Wellness Games</h1>
          <p className="text-lg text-blue-700 max-w-2xl mx-auto">
            Explore our collection of mindfulness and therapeutic games designed to support your mental well-being
          </p>
          <div className="mt-4">
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div
                className="bg-blue-600 h-4 rounded-full"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-blue-700 mt-2">{progress}% Progress</p>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {games.map((game) => (
            <a
              key={game.id}
              href={game.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleGameClick} // Increment progress on click
              className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={game.imageUrl}
                  alt={game.title}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </div>
              
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                    {game.icon}
                  </div>
                  <h2 className="text-xl font-semibold text-gray-900">{game.title}</h2>
                </div>
                <p className="text-gray-600">{game.description}</p>
                
                <div className="mt-4 flex items-center text-blue-600 font-medium">
                  Play Now
                  <svg
                    className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;