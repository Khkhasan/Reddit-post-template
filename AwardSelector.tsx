import React from 'react';
import { MOCK_AWARDS } from '../constants';
import { Award } from '../types';
import { Plus, Minus, Trash2, Upload } from 'lucide-react';

interface AwardSelectorProps {
  selectedAwards: { [id: string]: number };
  customAwards: Award[];
  onUpdate: (id: string, delta: number) => void;
  onClear: () => void;
  onAddCustom: (file: File) => void;
}

export const AwardSelector: React.FC<AwardSelectorProps> = ({ 
  selectedAwards, 
  customAwards,
  onUpdate, 
  onClear,
  onAddCustom
}) => {
  const allAwards = [...MOCK_AWARDS, ...customAwards];

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center px-1">
        <h3 className="text-xs font-semibold text-gray-400 uppercase">Available Awards</h3>
        <button 
          onClick={onClear}
          className="text-xs text-red-400 hover:text-red-300 flex items-center gap-1 transition-colors"
        >
          <Trash2 size={12} /> Clear All
        </button>
      </div>
      
      <div className="grid grid-cols-4 gap-2">
        {allAwards.map((award) => {
          const count = selectedAwards[award.id] || 0;
          return (
            <div 
              key={award.id} 
              className={`
                relative flex flex-col items-center justify-center p-2 rounded-lg border transition-all cursor-pointer group
                ${count > 0 
                  ? 'border-blue-500 bg-[#2A2B32]' 
                  : 'border-[#3A3B45] hover:border-gray-500 bg-[#25262C]'
                }
              `}
              onClick={() => onUpdate(award.id, 1)}
            >
              <img 
                src={award.imageUrl} 
                alt={award.name} 
                className="w-8 h-8 object-contain mb-1"
                // Add crossOrigin to help with download if the server supports it
                crossOrigin="anonymous"
              />
              <span className="text-[10px] font-medium text-gray-400 text-center truncate w-full">{award.name}</span>
              
              {count > 0 && (
                <div className="absolute -top-1.5 -right-1.5 flex items-center bg-[#25262C] shadow-md rounded-full border border-[#3A3B45] overflow-hidden z-10 scale-90">
                  <button 
                    className="p-0.5 hover:bg-[#32333B] text-gray-400"
                    onClick={(e) => {
                      e.stopPropagation();
                      onUpdate(award.id, -1);
                    }}
                  >
                    <Minus size={10} />
                  </button>
                  <span className="text-[10px] font-bold px-1 min-w-[12px] text-center text-white">{count}</span>
                  <button 
                    className="p-0.5 hover:bg-[#32333B] text-blue-400"
                    onClick={(e) => {
                      e.stopPropagation();
                      onUpdate(award.id, 1);
                    }}
                  >
                    <Plus size={10} />
                  </button>
                </div>
              )}
            </div>
          );
        })}

        {/* Upload Button */}
        <label className="flex flex-col items-center justify-center p-2 rounded-lg border border-dashed border-[#3A3B45] hover:border-blue-500 hover:bg-[#2A2B32] cursor-pointer transition-all">
          <Upload size={16} className="text-gray-500 mb-1" />
          <span className="text-[9px] font-medium text-gray-500 text-center uppercase">Upload</span>
          <input 
            type="file" 
            accept="image/*" 
            className="hidden" 
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                onAddCustom(file);
                e.target.value = '';
              }
            }}
          />
        </label>
      </div>
    </div>
  );
};