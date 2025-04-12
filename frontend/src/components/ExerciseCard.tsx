import React from 'react';
import { Play } from 'lucide-react';

interface ExerciseCardProps {
  title: string;
  imageUrl: string;
  duration: string;
  onSelect: () => void;
}

const ExerciseCard: React.FC<ExerciseCardProps> = ({ title, imageUrl, duration, onSelect }) => {
  return (
    <div 
      className="relative group cursor-pointer bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105"
      onClick={onSelect}
    >
      <img 
        src={imageUrl} 
        alt={title} 
        className="w-full h-48 object-cover"
      />
      <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
        <Play className="w-12 h-12 text-white" />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        <p className="text-sm text-gray-600">{duration}</p>
      </div>
    </div>
  );
}

export default ExerciseCard