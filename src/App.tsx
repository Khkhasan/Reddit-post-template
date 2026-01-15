import React, { useState, useRef, useCallback } from 'react';
import { toPng } from 'html-to-image';
import { INITIAL_STATE } from './constants';
import { PostState } from './types';
import { EditorPanel } from './components/EditorPanel';
import { PreviewPanel } from './components/PreviewPanel';

function App() {
  const [post, setPost] = useState<PostState>(INITIAL_STATE);
  const previewRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = useCallback(async () => {
    if (previewRef.current === null) return;
    setIsDownloading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 200));
      const dataUrl = await toPng(previewRef.current, { 
        cacheBust: true,
        pixelRatio: 3,
        backgroundColor: post.isDarkMode ? '#1A1A1B' : '#FFFFFF',
      });
      const link = document.createElement('a');
      link.download = `reddit-mockup-${Date.now()}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Failed to generate image", err);
    } finally {
      setIsDownloading(false);
    }
  }, [post.isDarkMode]);

  const handleReset = () => {
    if (window.confirm("Are you sure?")) setPost(INITIAL_STATE);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-[#0F1115] text-white">
      <aside className="w-[400px] h-full border-r border-[#2A2B32] bg-[#1C1D24]">
        <EditorPanel post={post} setPost={setPost} onDownload={handleDownload} onReset={handleReset} isDownloading={isDownloading} />
      </aside>
      <main className="flex-1 h-full overflow-y-auto p-8 flex items-center justify-center">
        <PreviewPanel ref={previewRef} post={post} />
      </main>
    </div>
  );
}

export default App;
