import React, { useEffect, useRef } from 'react';
import { Play, Info } from 'lucide-react';
import featuredVideo from '../../assets/succflix/videos/featured.mp4';
import featuredThumb from '../../assets/succflix/featured-thumb.png';

export default function Featured({ isFocused, selectedButton = 0 }) {
  const videoRef = useRef();

  // 🔊 Handle volume logic based on button focus
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = !(isFocused && selectedButton === 0);
    }
  }, [isFocused, selectedButton]);

  return (
    <div className="relative w-[800px] h-[280px] bg-black overflow-hidden">
      {/* 🎬 Featured Video */}
      <video
        ref={videoRef}
        src={featuredVideo}
        autoPlay
        loop
        playsInline
        muted
        className="w-full h-full object-cover"
      />

      {/* 🔲 Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#000000cc] to-transparent" />

      {/* 📝 Text Overlay */}
      <div className="absolute bottom-20 left-6 text-white z-10">
        <h1 className="text-3xl font-bold drop-shadow-md mb-2">The Last Reboot</h1>
        <p className="text-sm text-gray-200 max-w-[500px]">
          In a world where memory is a weapon, a lone hacker must decode the past to save the chain.
        </p>
      </div>

      {/* 🎮 Buttons */}
      <div className="absolute bottom-6 left-6 z-10 flex space-x-4">
        {/* ▶️ Play */}
        <button
          className={`flex items-center gap-2 px-4 py-2 rounded transition-all duration-150 font-semibold transform ${
            isFocused && selectedButton === 0
              ? 'scale-110 bg-white text-black ring-2 ring-white'
              : 'scale-100 bg-white text-black bg-opacity-70 hover:bg-opacity-90'
          }`}
        >
          <Play size={18} /> Play
        </button>

        {/* ℹ️ More Info */}
        <button
          className={`flex items-center gap-2 px-4 py-2 rounded transition-all duration-150 font-semibold transform ${
            isFocused && selectedButton === 1
              ? 'scale-110 bg-[#333] text-white ring-2 ring-white'
              : 'scale-100 bg-[#333] text-white bg-opacity-70 hover:bg-opacity-90'
          }`}
        >
          <Info size={18} /> More Info
        </button>
      </div>
    </div>
  );
}


