import React, { useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import ResultCard from './ResultCard';

const ShareSection = ({ code, title, description }) => {
  const cardRef = useRef(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleDownload = async () => {
    if (!cardRef.current) return;
    
    try {
      setIsGenerating(true);
      
      // Capture the DOM node
      const canvas = await html2canvas(cardRef.current, {
        scale: 2, // High quality
        useCORS: true, // Handle cross-origin images if any
        backgroundColor: '#111827', // Ensure dark background
        width: 350, // Fixed width to prevent CSS distortion
        windowWidth: 350,
        logging: false,
      });

      // Convert to PNG data URI
      const dataUrl = canvas.toDataURL('image/png', 1.0);

      // Create hidden anchor and trigger download
      const link = document.createElement('a');
      link.download = `developer-profile-${code.toLowerCase()}.png`;
      link.href = dataUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Failed to generate image:', error);
      alert('生成工牌失败，请重试。');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black p-4 space-y-8">
      {/* The Result Card to be captured */}
      <div className="flex justify-center w-full">
        <ResultCard 
          ref={cardRef} 
          code={code || 'INTP'} 
          title={title || '架构师'} 
          description={description || '喜欢重构，追求完美的系统设计。'} 
        />
      </div>

      {/* Download Button */}
      <button
        onClick={handleDownload}
        disabled={isGenerating}
        className={`px-8 py-3 rounded-lg font-bold text-white uppercase tracking-wider transition-all duration-300 shadow-[0_0_15px_rgba(236,72,153,0.5)] border border-pink-500
          ${isGenerating 
            ? 'bg-pink-800 cursor-not-allowed opacity-70' 
            : 'bg-pink-600 hover:bg-pink-500 hover:shadow-[0_0_25px_rgba(236,72,153,0.8)] hover:-translate-y-1'
          }`}
      >
        {isGenerating ? '正在生成...' : '生成我的工牌'}
      </button>
    </div>
  );
};

export default ShareSection;
