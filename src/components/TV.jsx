import React, { useEffect, useState } from 'react';

export default function TV({ isOn, currentScreen, children }) {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    if (isOn) {
      const timer = setTimeout(() => setShowContent(true), 300); // reduced delay
      return () => clearTimeout(timer);
    } else {
      setShowContent(false);
    }
  }, [isOn, currentScreen]); // ✅ Add currentScreen here

  return (
    <div className="w-[800px] h-[500px] bg-[#111216] rounded-3xl shadow-[0_0_60px_rgba(255,255,255,0.05)] border-[16px] border-[#111216] relative flex flex-col items-center justify-between overflow-hidden">
      
      {/* Screen */}
      <div
        className={`flex-1 w-full flex items-center justify-center relative overflow-hidden ${
          isOn ? 'bg-cover bg-center' : 'bg-black'
        }`}
        style={isOn ? { backgroundImage: `url('/tv-wallpaper.png')` } : {}}
      >
        
        {/* Blurred background overlay */}
        {isOn && (
          <div className="absolute inset-0 backdrop-blur-sm bg-black/20 z-0" />
        )}

        {/* Gloss */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-white/5 to-transparent pointer-events-none z-10" />

        {/* Glow layer */}
        <div
          className={`absolute inset-0 transition-all duration-700 z-10 ${
            isOn ? 'bg-white/5 shadow-[0_0_60px_rgba(255,255,255,0.1)]' : 'bg-black'
          }`}
        />

        {/* App content */}
        <div
          className={`z-20 transition-opacity duration-500 ${
            showContent ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {showContent && children}
        </div>
      </div>

      {/* Branding */}
      <div className="h-[40px] flex items-center justify-center w-full text-gray-400 text-xs tracking-widest opacity-50 select-none pointer-events-none">
        Succinct TV
      </div>
    </div>
  );
}
