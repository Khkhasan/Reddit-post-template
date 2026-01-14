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
    if (previewRef.current === null) {
      return;
    }

    setIsDownloading(true);

    try {
      // Small delay to ensure render is stable
      await new Promise(resolve => setTimeout(resolve, 200));
      
      // We process the node to ensure all images are loaded
      const dataUrl = await toPng(previewRef.current, { 
        cacheBust: true,
        pixelRatio: 3, // Very high resolution
        backgroundColor: post.isDarkMode ? '#1A1A1B' : '#FFFFFF',
        skipAutoScale: true,
        // Using a filter to exclude any UI elements if necessary (not needed here usually)
      });
      
      const link = document.createElement('a');
      link.download = `reddit-mockup-${Date.now()}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Failed to generate image", err);
      alert("Something went wrong while generating the image. This is often due to external image security policies (CORS). Try using images hosted on standard platforms.");
    } finally {
      setIsDownloading(false);
    }
  }, [post.isDarkMode]);

  const handleReset = () => {
    if (window.confirm("Are you sure you want to reset all changes?")) {
      setPost(INITIAL_STATE);
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-[#0F1115] text-white font-sans selection:bg-blue-500 selection:text-white">
      {/* Left Pane: Professional Editor Sidebar */}
      <aside className="w-[400px] flex-shrink-0 h-full border-r border-[#2A2B32] bg-[#1C1D24] flex flex-col z-20 shadow-2xl">
        <EditorPanel 
          post={post} 
          setPost={setPost} 
          onDownload={handleDownload}
          onReset={handleReset}
          isDownloading={isDownloading}
        />
      </aside>

      {/* Right Pane: Live Preview Canvas */}
      <main className="flex-1 h-full relative overflow-y-auto bg-[#0F1115] flex items-center justify-center p-8">
        <div className="relative w-full max-w-2xl flex flex-col items-center">
            
            {/* Live Preview Label */}
            <div className="mb-6 flex items-center gap-2 opacity-50">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-xs font-mono uppercase tracking-widest text-gray-400">Live Preview</span>
            </div>

            {/* The Canvas */}
            <PreviewPanel ref={previewRef} post={post} />

            <div className="mt-8 text-center max-w-md">
                <p className="text-xs text-gray-500">
                    Note: The download button generates a high-quality static snapshot. 
                    Animated GIFs are view-only in the browser due to browser security restrictions on exporting animations.
                </p>
            </div>
        </div>
      </main>
    </div>
  );
}

export default App;