import React from 'react';
import { PostState } from '../types';

export const EditorPanel: React.FC<{ post: PostState; setPost: any; onDownload: any; onReset: any; isDownloading: boolean }> = ({ post, setPost, onDownload, onReset, isDownloading }) => {
  const handleChange = (key: keyof PostState, value: any) => setPost((prev: any) => ({ ...prev, [key]: value }));

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-lg font-bold text-white">Editor</h2>
      <div>
        <label className="block text-xs uppercase text-gray-500 mb-1">Title</label>
        <textarea 
          className="w-full bg-[#25262C] border border-gray-700 rounded p-2 text-sm text-white"
          value={post.title}
          onChange={(e) => handleChange('title', e.target.value)}
        />
      </div>
      <div>
        <label className="block text-xs uppercase text-gray-500 mb-1">Subreddit</label>
        <input 
          className="w-full bg-[#25262C] border border-gray-700 rounded p-2 text-sm text-white"
          value={post.subredditName}
          onChange={(e) => handleChange('subredditName', e.target.value)}
        />
      </div>
      <div className="flex items-center justify-between">
        <span className="text-sm">Dark Mode</span>
        <input 
          type="checkbox" 
          checked={post.isDarkMode} 
          onChange={(e) => handleChange('isDarkMode', e.target.checked)} 
        />
      </div>
      <button 
        onClick={onDownload} 
        disabled={isDownloading}
        className="w-full py-2 bg-blue-600 hover:bg-blue-500 rounded font-bold text-white transition-colors"
      >
        {isDownloading ? 'Processing...' : 'Download Snapshot'}
      </button>
      <button onClick={onReset} className="w-full py-2 bg-gray-700 hover:bg-gray-600 rounded text-sm text-white transition-colors">Reset</button>
    </div>
  );
};
