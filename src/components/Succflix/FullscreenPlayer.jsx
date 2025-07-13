import React, { useEffect, useRef, useState } from 'react';
import { Pause } from 'lucide-react';
import featuredVideo from '../../assets/succflix/videos/featured.mp4';

export default function FullscreenPlayer({
  onExit,
  remoteVolumeUp,       // ✅ new props
  remoteVolumeDown,
  remoteFastForward,
  remoteRewind
}) {
  const videoRef = useRef();
  const [isPaused, setIsPaused] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [showTimeline, setShowTimeline] = useState(true);
  const [showVolumeBar, setShowVolumeBar] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const video = videoRef.current;
    video.volume = volume;
    video.currentTime = 0;
    video.play();

    const updateInterval = setInterval(() => {
      if (video.duration) {
        setProgress((video.currentTime / video.duration) * 100);
      }
    }, 500);

    const allVideos = document.querySelectorAll('video');
    allVideos.forEach((v) => {
      if (v !== video) v.pause();
    });

    return () => clearInterval(updateInterval);
  }, []);

  // ✅ Handle remote volume up/down
  useEffect(() => {
    if (!remoteVolumeUp) return;
    const video = videoRef.current;
    setVolume((v) => {
      const newVol = Math.min(v + 0.1, 1);
      video.volume = newVol;
      triggerVolumeFlash();
      return newVol;
    });
  }, [remoteVolumeUp]);

  useEffect(() => {
    if (!remoteVolumeDown) return;
    const video = videoRef.current;
    setVolume((v) => {
      const newVol = Math.max(v - 0.1, 0);
      video.volume = newVol;
      triggerVolumeFlash();
      return newVol;
    });
  }, [remoteVolumeDown]);

  // ✅ Handle remote fast forward / rewind
  useEffect(() => {
    if (!remoteFastForward && !remoteRewind) return;
    const video = videoRef.current;

    if (remoteFastForward) {
      video.currentTime = Math.min(video.currentTime + 10, video.duration);
      triggerTimelineFlash();
    }
    if (remoteRewind) {
      video.currentTime = Math.max(video.currentTime - 10, 0);
      triggerTimelineFlash();
    }
  }, [remoteFastForward, remoteRewind]);

  // Keyboard fallback (unchanged)
  useEffect(() => {
    const handleKeyDown = (e) => {
      const video = videoRef.current;

      switch (e.key) {
        case 'Enter':
          if (video.paused) {
            video.play();
            setIsPaused(false);
          } else {
            video.pause();
            setIsPaused(true);
          }
          break;

        case 'ArrowRight':
          video.currentTime = Math.min(video.currentTime + 10, video.duration);
          triggerTimelineFlash();
          break;

        case 'ArrowLeft':
          video.currentTime = Math.max(video.currentTime - 10, 0);
          triggerTimelineFlash();
          break;

        case 'ArrowUp':
          setVolume((v) => {
            const newVol = Math.min(v + 0.1, 1);
            video.volume = newVol;
            triggerVolumeFlash();
            return newVol;
          });
          break;

        case 'ArrowDown':
          setVolume((v) => {
            const newVol = Math.max(v - 0.1, 0);
            video.volume = newVol;
            triggerVolumeFlash();
            return newVol;
          });
          break;

        case 'Backspace':
        case 'Escape':
          video.pause();
          onExit();
          break;

        default:
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const triggerTimelineFlash = () => {
    setShowTimeline(true);
    setTimeout(() => setShowTimeline(false), 1000);
  };

  const triggerVolumeFlash = () => {
    setShowVolumeBar(true);
    setTimeout(() => setShowVolumeBar(false), 1000);
  };

  return (
    <div className="w-full h-full bg-black relative">
      <video
        ref={videoRef}
        src={featuredVideo}
        className="w-full h-full object-cover"
        autoPlay
        playsInline
      />

      {isPaused && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
          <Pause size={64} className="text-white" />
        </div>
      )}

      {showTimeline && (
        <div className="absolute bottom-0 left-0 w-full h-2 bg-red-600">
          <div className="h-full bg-white" style={{ width: `${progress}%` }} />
        </div>
      )}

      {showVolumeBar && (
        <div className="absolute right-6 top-1/2 -translate-y-1/2 w-2 h-40 bg-red-800 rounded">
          <div
            className="bg-white w-full rounded"
            style={{
              height: `${volume * 100}%`,
              marginTop: `${(1 - volume) * 100}%`
            }}
          />
        </div>
      )}
    </div>
  );
}

