import React, { useRef, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

interface AudioPlayerProps {
  audioUrl: string;
  label: string;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ audioUrl, label }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div 
      className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 cursor-pointer"
      onClick={togglePlay}
    >
      {isPlaying ? (
        <Volume2 className="w-5 h-5 text-blue-500" />
      ) : (
        <VolumeX className="w-5 h-5 text-gray-500" />
      )}
      <span className="text-sm">{label}</span>
      <audio ref={audioRef} src={audioUrl} loop />
    </div>
  );
};

export default AudioPlayer;