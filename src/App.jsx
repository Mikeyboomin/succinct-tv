import React, { useState, useEffect, useRef } from 'react';
import TV from './components/TV';
import Remote from './components/Remote';
import GalleryApp from './components/GalleryApp';
import Succflix from './components/Succflix/Succflix';
import splashImage from './assets/gallery/gallerysplash.png';

export default function App() {
  const [isOn, setIsOn] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [currentScreen, setCurrentScreen] = useState('home');
  const [showHome, setShowHome] = useState(true);
  const [remoteMove, setRemoteMove] = useState(null);
  const [remoteEnter, setRemoteEnter] = useState(false);
  const [remoteExit, setRemoteExit] = useState(false);

  const fullscreenRef = useRef(); // ✅ For controlling fullscreen actions

  const apps = [
    { id: 'gallery', label: 'Gallery' },
    { id: 'succflix', label: 'SuccFlix' },
    { id: 'music', label: 'Music' },
  ];

  const preloadImage = (src) => {
    const img = new Image();
    img.src = src;
  };

  useEffect(() => {
    preloadImage(splashImage);

    const imageModules = import.meta.glob('./assets/gallery/*.{jpg,jpeg,png,webp}', {
      eager: true,
    });

    const allImages = Object.entries(imageModules)
      .filter(([path]) => !path.includes('gallerysplash'))
      .map(([, module]) => module.default);

    allImages.slice(0, 15).forEach(preloadImage);

    apps.forEach((app) => {
      preloadImage(`/icons/${app.id}.png`);
    });
  }, []);

  const handleMove = (direction) => {
    if (!isOn) return;

    if (currentScreen === 'home') {
      if (direction === 'left') {
        setSelectedIndex((prev) => (prev === 0 ? apps.length - 1 : prev - 1));
      } else if (direction === 'right') {
        setSelectedIndex((prev) => (prev === apps.length - 1 ? 0 : prev + 1));
      }
    } else {
      setRemoteMove(direction);
    }
  };

  const handleAppSelect = (appId) => {
    if (!isOn) return;

    setCurrentScreen(appId);
    setTimeout(() => setShowHome(false), 100);
  };

  const handleEnter = () => {
    if (!isOn) return;

    if (currentScreen === 'home') {
      const selectedApp = apps[selectedIndex];
      handleAppSelect(selectedApp.id);
    } else {
      setRemoteEnter(true);
    }
  };

  const handleExit = () => {
    if (!isOn) return;

    if (currentScreen === 'home') return;

    if (currentScreen === 'gallery') {
      setRemoteExit(true);
    } else {
      setCurrentScreen('home');
      setTimeout(() => setShowHome(true), 50);
    }
  };

  // ✅ Volume / FF / RW handlers for Remote
  const handleVolumeUp = () => {
    fullscreenRef.current?.volumeUp?.();
  };

  const handleVolumeDown = () => {
    fullscreenRef.current?.volumeDown?.();
  };

  const handleFastForward = () => {
    fullscreenRef.current?.fastForward?.();
  };

  const handleRewind = () => {
    fullscreenRef.current?.rewind?.();
  };

  useEffect(() => {
    if (remoteMove) {
      const timer = setTimeout(() => setRemoteMove(null), 100);
      return () => clearTimeout(timer);
    }
  }, [remoteMove]);

  useEffect(() => {
    if (remoteEnter) {
      const timer = setTimeout(() => setRemoteEnter(false), 100);
      return () => clearTimeout(timer);
    }
  }, [remoteEnter]);

  useEffect(() => {
    if (remoteExit) {
      const timer = setTimeout(() => setRemoteExit(false), 100);
      return () => clearTimeout(timer);
    }
  }, [remoteExit]);

  return (
    <div className="w-screen h-screen text-white flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#1e1e1e] via-[#2a2a2a] to-[#1e1e1e]">
      <div className="flex flex-col lg:flex-row items-center justify-center gap-24">
        <TV isOn={isOn} currentScreen={currentScreen}>
          {currentScreen === 'home' && (
            <div className={`transition-opacity duration-500 ${showHome ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
              <div className="flex space-x-6">
                {apps.map((app, idx) => {
                  const isSelected = selectedIndex === idx;
                  const iconSrc = `/icons/${app.id}.png`;

                  return (
                    <div key={app.id} className="flex flex-col items-center transition-all duration-300 ease-in-out">
                      {isSelected && (
                        <div className="mb-2 font-bold text-center tracking-wide text-white text-xl drop-shadow-[0_0_8px_rgba(255,255,255,0.9)]">
                          {app.label}
                        </div>
                      )}
                      <div className={`w-40 h-40 rounded-2xl transition-all duration-300 ease-in-out overflow-hidden ${isSelected ? 'scale-100' : 'scale-75 opacity-50 blur-[2px]'}`}>
                        <img src={iconSrc} alt={app.label} className="w-full h-full object-cover pointer-events-none" />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {currentScreen === 'gallery' && (
            <div className="w-[800px] h-[500px] bg-black">
              <GalleryApp
                onExit={() => {
                  setCurrentScreen('home');
                  setTimeout(() => setShowHome(true), 50);
                }}
                remoteMove={remoteMove}
                remoteEnter={remoteEnter}
                remoteExit={remoteExit}
              />
            </div>
          )}

          {currentScreen === 'succflix' && (
            <Succflix
              ref={fullscreenRef} // ✅ Ref to control FullscreenPlayer
              remoteMove={remoteMove}
              remoteEnter={remoteEnter}
              remoteExit={remoteExit}
            />
          )}

          {currentScreen === 'music' && <div className="text-2xl">🎵 Music App</div>}
        </TV>

        <Remote
          onPowerToggle={() => {
            setIsOn((prev) => !prev);
            setCurrentScreen('home');
            setShowHome(true);
          }}
          onMove={handleMove}
          onEnter={handleEnter}
          onExit={handleExit}
          onSelectApp={handleAppSelect}
          onVolumeUp={handleVolumeUp} // ✅ NEW
          onVolumeDown={handleVolumeDown} // ✅ NEW
          onFastForward={handleFastForward} // ✅ NEW
          onRewind={handleRewind} // ✅ NEW
        />
      </div>
    </div>
  );
}
