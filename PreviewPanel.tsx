import React, { forwardRef } from 'react';
import { PostState } from '../types';
import { MOCK_AWARDS } from '../constants';
import { AwardIcon } from './AwardIcon';
import { Share2, ArrowBigUp, ArrowBigDown, MessageCircle, BadgeCheck, MoreHorizontal } from 'lucide-react';

interface PreviewPanelProps {
  post: PostState;
}

export const PreviewPanel = forwardRef<HTMLDivElement, PreviewPanelProps>(({ post }, ref) => {
  const allAwards = [...MOCK_AWARDS, ...(post.customAwards || [])];

  const activeAwards = Object.entries(post.selectedAwards)
    .filter(([_, count]) => count > 0)
    .map(([id, count]) => {
      const award = allAwards.find(a => a.id === id);
      return award ? { ...award, count } : null;
    })
    .filter(Boolean) as (typeof MOCK_AWARDS[0] & { count: number })[];

  return (
    <div 
        ref={ref}
        className={`
          w-[400px] flex-shrink-0 rounded-xl overflow-hidden shadow-2xl transition-all duration-300 font-sans
          ${post.isDarkMode 
            ? 'bg-[#1A1A1B] text-[#D7DADC] border border-[#343536]' 
            : 'bg-white text-[#1c1c1c] border border-gray-200'
          }
        `}
      >
        {/* Header Section */}
        <div className="p-3 pb-1">
            <div className="flex items-start gap-2">
                {/* Avatar */}
                <div className="flex-shrink-0 mt-0.5">
                    {post.subredditIcon ? (
                        <img 
                            src={post.subredditIcon} 
                            alt="icon" 
                            className="w-10 h-10 rounded-full object-cover" 
                            crossOrigin="anonymous"
                        />
                    ) : (
                        <div className="w-10 h-10 rounded-full bg-gray-200" />
                    )}
                </div>

                <div className="flex flex-col min-w-0 flex-1">
                    {/* Username & Checkmark Line */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                            <span className={`text-[15px] font-bold leading-none truncate ${post.isDarkMode ? 'text-[#D7DADC]' : 'text-black'}`}>
                                {post.author}
                            </span>
                            {post.isVerified && (
                                <BadgeCheck className="w-[18px] h-[18px] text-blue-500 fill-blue-500 text-white flex-shrink-0" />
                            )}
                            <span className="text-xs text-gray-500 mx-1">• {post.timeAgo}</span>
                        </div>
                        <button className="text-gray-500">
                             <MoreHorizontal size={16} />
                        </button>
                    </div>

                    {/* Awards Row - Tightly packed below name */}
                    {activeAwards.length > 0 && (
                        <div className="flex flex-wrap items-center gap-[2px] mt-1">
                            {activeAwards.map(award => (
                                <AwardIcon key={award.id} award={award} count={award.count} size="sm" />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>

        {/* Content Body */}
        <div className="px-3 pb-2 pt-1">
          {post.title && (
            <h2 className={`text-[18px] font-semibold leading-6 mb-2 ${post.isDarkMode ? 'text-[#D7DADC]' : 'text-[#1c1c1c]'}`}>
              {post.title}
            </h2>
          )}

          {post.showImage && post.imageUrl ? (
             <div className="w-[calc(100%+24px)] -mx-3 mt-2 mb-2">
                <img 
                    src={post.imageUrl} 
                    alt="Post content" 
                    className="w-full h-auto object-cover max-h-[500px]" 
                    crossOrigin="anonymous"
                />
             </div>
          ) : (
            <div className={`
                ${post.body ? 'mb-2' : ''} 
                ${post.isDarkMode ? 'text-[#D7DADC]' : 'text-[#1c1c1c]'}
                text-[15px] whitespace-pre-wrap leading-5
            `}>
              {post.body}
            </div>
          )}
        </div>

        {/* Footer / Actions Pills */}
        <div className="px-3 pb-3 flex items-center justify-between gap-2 text-xs font-bold text-gray-500">
            
            {/* Vote Pill */}
            <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border ${post.isDarkMode ? 'border-[#343536]' : 'border-gray-200'}`}>
               <ArrowBigUp className={`w-6 h-6 stroke-[1.5px] ${post.isDarkMode ? 'text-gray-400 hover:text-red-500' : 'text-gray-500 hover:text-red-500'}`} />
               <span className={`text-sm ${post.isDarkMode ? 'text-[#D7DADC]' : 'text-black'}`}>{post.voteCount}</span>
               <ArrowBigDown className={`w-6 h-6 stroke-[1.5px] ${post.isDarkMode ? 'text-gray-400 hover:text-blue-500' : 'text-gray-500 hover:text-blue-500'}`} />
            </div>

            {/* Comment Pill */}
            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full border ${post.isDarkMode ? 'border-[#343536]' : 'border-gray-200'}`}>
                <MessageCircle className="w-5 h-5 stroke-[1.5px]" />
                <span className={`text-sm ${post.isDarkMode ? 'text-[#D7DADC]' : 'text-black'}`}>{post.commentCount}</span>
            </div>

            {/* Share Pill */}
            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full border ${post.isDarkMode ? 'border-[#343536]' : 'border-gray-200'}`}>
                <Share2 className="w-5 h-5 stroke-[1.5px]" />
                <span>Share</span>
            </div>

        </div>
    </div>
  );
});

PreviewPanel.displayName = 'PreviewPanel';