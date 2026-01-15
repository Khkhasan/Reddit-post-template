import React, { forwardRef } from 'react';
import { PostState } from '../types';

export const PreviewPanel = forwardRef<HTMLDivElement, { post: PostState }>(({ post }, ref) => {
  return (
    <div ref={ref} className={`w-full max-w-2xl rounded-lg overflow-hidden ${post.isDarkMode ? 'bg-[#1A1A1B] text-[#D7DADC]' : 'bg-white text-[#1C1C1C] shadow-sm'}`}>
      <div className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <img src={post.subredditIcon} className="w-8 h-8 rounded-full" alt="" />
          <div className="text-xs font-bold leading-none">{post.subredditName}</div>
          <div className="text-xs text-gray-500">Posted by u/{post.author} • {post.timeAgo}</div>
        </div>
        <h1 className="text-lg font-bold mb-2">{post.title}</h1>
        {post.showImage && post.imageUrl ? (
          <img src={post.imageUrl} className="w-full h-auto rounded-md mb-2" alt="" />
        ) : (
          <p className="text-sm whitespace-pre-wrap">{post.body}</p>
        )}
      </div>
      <div className="flex items-center gap-4 px-4 py-2 border-t border-gray-700/50">
        <div className="text-xs font-bold">{post.voteCount} Upvotes</div>
        <div className="text-xs font-bold">{post.commentCount} Comments</div>
      </div>
    </div>
  );
});
