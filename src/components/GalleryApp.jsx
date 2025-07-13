import React, { useEffect, useRef, useState } from 'react';
import { Download } from 'lucide-react';
import splashImage from '../assets/gallery/gallerysplash.png';

const imageModules = import.meta.glob('../assets/gallery/*.{jpg,jpeg,png,webp}', {
  eager: true,
});

const imagePaths = Object.entries(imageModules)
  .filter(([path]) => !path.includes('gallerysplash'))
  .map(([, module]) => module.default);

export default function GalleryApp({ onExit, remoteMove, remoteEnter, remoteExit }) {
  const [mode, setMode] = useState('splash');
  const [selectedGridIndex, setSelectedGridIndex] = useState(0);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const [showSavedText, setShowSavedText] = useState(false);

  const totalImages = imagePaths.length;
  const columns = 5;
  const imageRefs = useRef([]);
  const gridContainerRef = useRef();

  const handleSaveImage = () => {
    const imageUrl = imagePaths[selectedImageIndex];
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = `image-${selectedImageIndex + 1}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setShowSavedText(true);
    setTimeout(() => setShowSavedText(false), 2000);
  };

  useEffect(() => {
    if (mode === 'splash') {
      const timer = setTimeout(() => setMode('grid'), 2000);
      return () => clearTimeout(timer);
    }
  }, [mode]);

  useEffect(() => {
    if (mode === 'grid' && imageRefs.current[selectedGridIndex]) {
      imageRefs.current[selectedGridIndex].scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'nearest',
      });
    }
  }, [selectedGridIndex, mode]);

  useEffect(() => {
    if (!remoteMove) return;

    if (mode === 'grid') {
      if (remoteMove === 'right') {
        setSelectedGridIndex((prev) => (prev + 1) % totalImages);
      } else if (remoteMove === 'left') {
        setSelectedGridIndex((prev) => (prev - 1 + totalImages) % totalImages);
      } else if (remoteMove === 'down') {
        setSelectedGridIndex((prev) =>
          prev + columns >= totalImages ? prev : prev + columns
        );
      } else if (remoteMove === 'up') {
        setSelectedGridIndex((prev) =>
          prev - columns < 0 ? prev : prev - columns
        );
      }
    } else if (mode === 'fullscreen') {
      setTransitioning(true);
      setTimeout(() => setTransitioning(false), 200);

      if (remoteMove === 'right') {
        setSelectedImageIndex((prev) => (prev + 1) % totalImages);
      } else if (remoteMove === 'left') {
        setSelectedImageIndex((prev) => (prev - 1 + totalImages) % totalImages);
      }
    }
  }, [remoteMove]);

  useEffect(() => {
    if (remoteEnter && mode === 'grid') {
      setSelectedImageIndex(selectedGridIndex);
      setMode('fullscreen');
    } else if (remoteEnter && mode === 'fullscreen') {
      handleSaveImage();
    }
  }, [remoteEnter]);

  useEffect(() => {
    if (remoteExit) {
      if (mode === 'fullscreen') {
        setMode('grid');
        setSelectedGridIndex(selectedImageIndex);
      } else if (mode === 'grid') {
        onExit();
      }
    }
  }, [remoteExit]);

  if (mode === 'splash') {
    return (
      <div className="w-[800px] h-[500px] relative">
        <div className="absolute inset-0 bg-black z-0" />
        <img
          src={splashImage}
          alt="Gallery Splash"
          className="w-full h-full object-cover relative z-10 animate-fade-in"
        />
      </div>
    );
  }

  if (mode === 'fullscreen') {
    return (
      <div className="w-[800px] h-[500px] flex items-center justify-center bg-black transition-all duration-500 relative overflow-hidden">
        <img
          key={selectedImageIndex}
          src={imagePaths[selectedImageIndex]}
          alt="Full View"
          className={`max-w-full max-h-full object-contain absolute transition-opacity duration-300 ${
            transitioning ? 'opacity-0' : 'opacity-100'
          }`}
        />

        {/* ✅ Save Button with Lucide Download icon */}
        <button
          onClick={handleSaveImage}
          className="absolute bottom-12 left-8 pl-2 pr-3 py-2 bg-black bg-opacity-60 rounded-lg border border-cyan-400 shadow-[0_0_12px_#00f0ff] flex items-center gap-2"
        >
          <Download className="w-5 h-5 text-cyan-300" />
          <span className="text-cyan-300 font-semibold">Save</span>
        </button>

        {showSavedText && (
          <div className="absolute bottom-24 left-6 bg-black bg-opacity-70 text-white text-sm px-3 py-1 rounded shadow-lg">
            Image saved!
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="w-[800px] h-[500px] flex flex-col bg-black px-10 pb-2 transition-all duration-500 relative">
      <div className="pointer-events-none absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-black to-transparent z-10" />

      <div className="text-white text-xl font-bold mb-4 tracking-widest pt-16 drop-shadow-[0_0_8px_#00f0ff]">
        FEATURED
      </div>

      <div
        ref={gridContainerRef}
        className="flex-1 overflow-y-auto pr-2 custom-scrollbar"
      >
        <div className="pl-3">
          <div className="grid grid-cols-5 gap-4 pt-4 pb-6">
            {imagePaths.map((src, idx) => (
              <div
                key={idx}
                ref={(el) => (imageRefs.current[idx] = el)}
                className={`rounded-xl border-2 aspect-square overflow-hidden transition-all duration-300 ${
                  selectedGridIndex === idx
                    ? 'border-cyan-400 shadow-[0_0_8px_#00f0ff] scale-105 z-10'
                    : 'border-transparent opacity-50 blur-[1px] scale-95'
                }`}
              >
                <img
                  src={src}
                  alt={`Image ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
