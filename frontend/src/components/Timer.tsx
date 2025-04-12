import React, { useState, useEffect } from 'react';
import { Timer as TimerIcon, Pause, Play, RotateCcw } from 'lucide-react';

interface TimerProps {
  duration: number;
  isActive: boolean;
  onComplete: () => void;
}

const Timer: React.FC<TimerProps> = ({ duration, isActive, onComplete }) => {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;

    if (isActive && !isPaused && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => {
          if (time <= 1) {
            clearInterval(interval);
            onComplete();
            return 0;
          }
          return time - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isActive, isPaused, timeLeft, onComplete]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const resetTimer = () => {
    setTimeLeft(duration);
    setIsPaused(false);
  };

  return (
    <div className="flex items-center space-x-4 bg-white rounded-lg p-4 shadow-md">
      <TimerIcon className="w-6 h-6 text-blue-500" />
      <span className="text-2xl font-semibold">{formatTime(timeLeft)}</span>
      <div className="flex space-x-2">
        <button
          onClick={() => setIsPaused(!isPaused)}
          className="p-2 rounded-full hover:bg-gray-100"
        >
          {isPaused ? <Play className="w-5 h-5" /> : <Pause className="w-5 h-5" />}
        </button>
        <button
          onClick={resetTimer}
          className="p-2 rounded-full hover:bg-gray-100"
        >
          <RotateCcw className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default Timer;