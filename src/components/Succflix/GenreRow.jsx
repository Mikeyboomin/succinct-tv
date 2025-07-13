import React from 'react';
import { Play, Plus } from 'lucide-react';

export default function GenreRow({ title, videos = [], focusedIndex = -1 }) {
  return (
    <div className="mb-6 px-6">
      {/* 🔹 Genre Title */}
      <h2 className="text-white text-lg font-semibold mb-3">{title}</h2>

      {/* 🔸 Horizontal Scrollable Row */}
      <div className="flex overflow-x-auto space-x-4 scrollbar-hide">
        {videos.map((video, index) => {
          const isFocused = index === focusedIndex;

          return (
            <div
              key={index}
              className={`relative min-w-[140px] h-[80px] rounded-lg overflow-hidden bg-neutral-800 flex-shrink-0 transition-transform duration-200 ${
                isFocused ? 'scale-105 ring-2 ring-cyan-400' : 'hover:scale-105'
              }`}
            >
              <img
                src={video.thumbnail}
                alt={video.title}
                className="w-full h-full object-cover"
              />

              {/* ▶️ & ➕ Buttons when focused */}
              {isFocused && (
                <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center space-y-2">
                  <button className="flex items-center gap-1 px-3 py-1 bg-white text-black text-xs font-semibold rounded hover:bg-gray-300 transition">
                    <Play size={14} /> Play
                  </button>
                  <button className="flex items-center gap-1 px-3 py-1 bg-[#333] text-white text-xs font-semibold rounded hover:bg-gray-600 transition">
                    <Plus size={14} /> My List
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
