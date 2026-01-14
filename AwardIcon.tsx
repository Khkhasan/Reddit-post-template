import React from 'react';
import { Award } from '../types';

interface AwardIconProps {
  award: Award;
  count: number;
  size?: 'sm' | 'md' | 'lg';
}

export const AwardIcon: React.FC<AwardIconProps> = ({ award, count, size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  };

  return (
    <div className="relative group cursor-pointer transition-transform hover:scale-110">
      <img 
        src={award.imageUrl} 
        alt={award.name} 
        className={`${sizeClasses[size]} object-contain drop-shadow-sm`}
        style={{ imageRendering: 'auto' }}
        crossOrigin="anonymous"
      />
      {count > 1 && (
        <span className="absolute -bottom-1 -right-1 flex h-3 min-w-[12px] items-center justify-center rounded-full bg-reddit-gray px-0.5 text-[8px] font-bold text-reddit-text border border-white">
          {count}
        </span>
      )}
    </div>
  );
};