import React, { useState } from 'react';
import { PostState, Preset, Award as AwardType } from '../types';
import { AwardSelector } from './AwardSelector';
import { PRESETS } from '../constants';
import { 
    Image as ImageIcon, 
    Type, 
    Award, 
    Settings, 
    Download, 
    RotateCcw, 
    ChevronDown, 
    ChevronUp, 
    Upload,
    Check,
    Smartphone
} from 'lucide-react';

interface EditorPanelProps {
  post: PostState;
  setPost: React.Dispatch<React.SetStateAction<PostState>>;
  onDownload: () => void;
  onReset: () => void;
  isDownloading: boolean;
}

// Helper Component for Collapsible Sections
const AccordionItem = ({ title, icon: Icon, children, isOpen, onToggle }: any) => (
    <div className="border-b border-[#2A2B32]">
        <button 
            onClick={onToggle}
            className="w-full flex items-center justify-between p-4 hover:bg-[#25262C] transition-colors text-left"
        >
            <div className="flex items-center gap-3 text-sm font-medium text-gray-200">
                {Icon && <Icon size={16} className="text-blue-400" />}
                {title}
            </div>
            {isOpen ? <ChevronUp size={14} className="text-gray-500" /> : <ChevronDown size={14} className="text-gray-500" />}
        </button>
        {isOpen && (
            <div className="p-4 bg-[#1C1D24] animate-in slide-in-from-top-2 duration-200">
                {children}
            </div>
        )}
    </div>
);

export const EditorPanel: React.FC<EditorPanelProps> = ({ post, setPost, onDownload, onReset, isDownloading }) => {
  // State for accordions
  const [openSection, setOpenSection] = useState<string | null>('header');

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  const handleChange = (key: keyof PostState, value: any) => {
    setPost(prev => ({ ...prev, [key]: value }));
  };

  const handleAwardUpdate = (id: string, delta: number) => {
    setPost(prev => {
      const current = prev.selectedAwards[id] || 0;
      const newCount = Math.max(0, current + delta);
      const newAwards = { ...prev.selectedAwards };
      if (newCount === 0) {
        delete newAwards[id];
      } else {
        newAwards[id] = newCount;
      }
      return { ...prev, selectedAwards: newAwards };
    });
  };

  const handleAddCustomAward = (file: File) => {
    const url = URL.createObjectURL(file);
    const newId = `custom_${Date.now()}`;
    const newAward: AwardType = {
      id: newId,
      name: 'Custom',
      imageUrl: url,
      price: 0
    };
    
    setPost(prev => ({
      ...prev,
      customAwards: [...(prev.customAwards || []), newAward],
      selectedAwards: { ...prev.selectedAwards, [newId]: 1 }
    }));
  };

  return (
    <div className="flex flex-col h-full bg-[#1C1D24] text-gray-300">
        {/* Top Header */}
        <div className="p-5 border-b border-[#2A2B32] flex items-center justify-between bg-[#15161A]">
            <div>
                <h1 className="text-lg font-bold text-white tracking-tight">RedditGen</h1>
                <p className="text-[10px] text-gray-500 font-medium uppercase tracking-wider mt-0.5">Mockup Generator</p>
            </div>
            <div className="flex gap-2">
                 <button onClick={onReset} className="p-2 hover:bg-[#2A2B32] rounded-md transition text-gray-400" title="Reset">
                    <RotateCcw size={16} />
                 </button>
            </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
            
            {/* Presets Row */}
            <div className="p-4 flex gap-2 overflow-x-auto border-b border-[#2A2B32] scrollbar-hide">
                {PRESETS.map(p => (
                    <button
                        key={p.name}
                        onClick={() => setPost(prev => ({ ...prev, ...p.data }))}
                        className="px-3 py-1.5 bg-[#25262C] hover:bg-[#32333B] border border-[#2A2B32] rounded-md text-xs font-medium whitespace-nowrap transition text-gray-300 flex-shrink-0"
                    >
                        {p.name}
                    </button>
                ))}
            </div>

            <AccordionItem 
                title="Post Header" 
                icon={Settings} 
                isOpen={openSection === 'header'} 
                onToggle={() => toggleSection('header')}
            >
                <div className="space-y-4">
                    <div>
                        <label className="text-xs font-semibold text-gray-500 uppercase mb-2 block">Community Icon</label>
                        <div className="flex items-center gap-3">
                            <div className="relative group w-12 h-12 rounded-full overflow-hidden border border-[#3A3B45] bg-[#25262C]">
                                <img src={post.subredditIcon} alt="" className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                                    <Upload size={14} className="text-white" />
                                </div>
                                <input 
                                    type="file" 
                                    accept="image/*"
                                    className="absolute inset-0 opacity-0 cursor-pointer"
                                    onChange={(e) => {
                                        const file = e.target.files?.[0];
                                        if(file) handleChange('subredditIcon', URL.createObjectURL(file));
                                    }}
                                />
                            </div>
                            <div className="flex-1">
                                <input 
                                    type="text" 
                                    value={post.subredditIcon}
                                    onChange={(e) => handleChange('subredditIcon', e.target.value)}
                                    placeholder="Image URL..."
                                    className="w-full bg-[#25262C] border border-[#3A3B45] rounded px-3 py-2 text-xs text-gray-200 focus:border-blue-500 outline-none"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-3">
                        <div>
                            <label className="text-xs font-semibold text-gray-500 uppercase mb-1.5 block">Author Name</label>
                            <input 
                                type="text" 
                                value={post.author} 
                                onChange={(e) => handleChange('author', e.target.value)}
                                className="w-full bg-[#25262C] border border-[#3A3B45] rounded px-3 py-2 text-sm text-white font-medium focus:border-blue-500 outline-none"
                            />
                        </div>
                    </div>

                    <label className="flex items-center justify-between p-3 rounded bg-[#25262C] border border-[#3A3B45] cursor-pointer hover:border-gray-500 transition">
                        <span className="text-sm text-gray-300">Verified Badge</span>
                        <div className={`w-5 h-5 rounded border flex items-center justify-center ${post.isVerified ? 'bg-blue-500 border-blue-500' : 'border-gray-500'}`}>
                             {post.isVerified && <Check size={12} className="text-white" />}
                        </div>
                        <input 
                            type="checkbox" 
                            className="hidden" 
                            checked={post.isVerified}
                            onChange={(e) => handleChange('isVerified', e.target.checked)}
                        />
                    </label>
                </div>
            </AccordionItem>

            <AccordionItem 
                title="Awards" 
                icon={Award} 
                isOpen={openSection === 'awards'} 
                onToggle={() => toggleSection('awards')}
            >
                <AwardSelector 
                    selectedAwards={post.selectedAwards} 
                    customAwards={post.customAwards || []}
                    onUpdate={handleAwardUpdate}
                    onClear={() => handleChange('selectedAwards', {})}
                    onAddCustom={handleAddCustomAward}
                />
            </AccordionItem>

            <AccordionItem 
                title="Post Content" 
                icon={Type} 
                isOpen={openSection === 'content'} 
                onToggle={() => toggleSection('content')}
            >
                <div className="space-y-4">
                    <div>
                        <label className="text-xs font-semibold text-gray-500 uppercase mb-1.5 block">Title</label>
                        <textarea 
                            rows={2}
                            value={post.title} 
                            onChange={(e) => handleChange('title', e.target.value)}
                            className="w-full bg-[#25262C] border border-[#3A3B45] rounded px-3 py-2 text-sm text-white focus:border-blue-500 outline-none resize-none font-bold"
                            placeholder="Enter post title..."
                        />
                    </div>

                    {/* Content Type Toggles */}
                    <div className="grid grid-cols-2 gap-1 bg-[#25262C] p-1 rounded-lg border border-[#3A3B45]">
                        <button 
                            onClick={() => handleChange('showImage', false)}
                            className={`flex items-center justify-center gap-2 py-1.5 rounded text-xs font-medium transition ${!post.showImage ? 'bg-[#3A3B45] text-white shadow-sm' : 'text-gray-500 hover:text-gray-300'}`}
                        >
                            <Type size={12} /> Text
                        </button>
                        <button 
                            onClick={() => handleChange('showImage', true)}
                            className={`flex items-center justify-center gap-2 py-1.5 rounded text-xs font-medium transition ${post.showImage ? 'bg-[#3A3B45] text-white shadow-sm' : 'text-gray-500 hover:text-gray-300'}`}
                        >
                            <ImageIcon size={12} /> Image
                        </button>
                    </div>

                    {post.showImage ? (
                        <div>
                            <label className="text-xs font-semibold text-gray-500 uppercase mb-1.5 block">Image</label>
                            <div className="border-2 border-dashed border-[#3A3B45] rounded-lg p-4 hover:bg-[#25262C] transition text-center cursor-pointer relative group">
                                <input 
                                    type="file" 
                                    accept="image/*"
                                    className="absolute inset-0 opacity-0 cursor-pointer z-10"
                                    onChange={(e) => {
                                        const file = e.target.files?.[0];
                                        if(file) handleChange('imageUrl', URL.createObjectURL(file));
                                    }}
                                />
                                {post.imageUrl ? (
                                    <div className="relative">
                                        <img src={post.imageUrl} className="h-32 mx-auto object-contain rounded" />
                                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                                            <span className="text-xs text-white font-medium bg-black/50 px-2 py-1 rounded">Change Image</span>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="py-4">
                                        <Upload size={24} className="mx-auto text-gray-500 mb-2" />
                                        <span className="text-xs text-gray-400">Click to upload image</span>
                                    </div>
                                )}
                            </div>
                            <input 
                                type="text" 
                                value={post.imageUrl || ''}
                                onChange={(e) => handleChange('imageUrl', e.target.value)}
                                placeholder="Or paste URL..."
                                className="w-full bg-[#25262C] border border-[#3A3B45] rounded px-3 py-2 text-xs text-gray-300 mt-2 focus:border-blue-500 outline-none"
                            />
                        </div>
                    ) : (
                        <div>
                            <label className="text-xs font-semibold text-gray-500 uppercase mb-1.5 block">Body Text</label>
                            <textarea 
                                rows={6}
                                value={post.body} 
                                onChange={(e) => handleChange('body', e.target.value)}
                                className="w-full bg-[#25262C] border border-[#3A3B45] rounded px-3 py-2 text-sm text-white focus:border-blue-500 outline-none font-bold"
                                placeholder="Enter post body..."
                            />
                        </div>
                    )}
                </div>
            </AccordionItem>
            
            <AccordionItem 
                title="View Settings" 
                icon={Smartphone} 
                isOpen={openSection === 'view'} 
                onToggle={() => toggleSection('view')}
            >
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-300">Dark Mode</span>
                        <button 
                            onClick={() => handleChange('isDarkMode', !post.isDarkMode)}
                            className={`w-10 h-6 rounded-full p-1 transition-colors duration-200 ${post.isDarkMode ? 'bg-blue-500' : 'bg-[#3A3B45]'}`}
                        >
                            <div className={`w-4 h-4 bg-white rounded-full shadow-sm transform transition-transform duration-200 ${post.isDarkMode ? 'translate-x-4' : 'translate-x-0'}`} />
                        </button>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="text-xs font-semibold text-gray-500 uppercase mb-1.5 block">Votes</label>
                            <input 
                                type="text" 
                                value={post.voteCount}
                                onChange={(e) => handleChange('voteCount', e.target.value)}
                                className="w-full bg-[#25262C] border border-[#3A3B45] rounded px-3 py-2 text-xs text-white"
                            />
                        </div>
                        <div>
                            <label className="text-xs font-semibold text-gray-500 uppercase mb-1.5 block">Comments</label>
                            <input 
                                type="text" 
                                value={post.commentCount}
                                onChange={(e) => handleChange('commentCount', e.target.value)}
                                className="w-full bg-[#25262C] border border-[#3A3B45] rounded px-3 py-2 text-xs text-white"
                            />
                        </div>
                    </div>
                </div>
            </AccordionItem>
        </div>

        {/* Footer Button */}
        <div className="p-5 border-t border-[#2A2B32] bg-[#15161A]">
            <button 
                onClick={onDownload}
                disabled={isDownloading}
                className={`
                    w-full flex items-center justify-center gap-2 py-3 rounded-lg font-bold text-sm transition shadow-lg
                    ${isDownloading 
                        ? 'bg-gray-600 cursor-wait opacity-80' 
                        : 'bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white'
                    }
                `}
            >
                {isDownloading ? (
                    <>Processing...</>
                ) : (
                    <><Download size={18} /> Download Snapshot</>
                )}
            </button>
        </div>
    </div>
  );
};