// components/Succflix/Splash.jsx
import React, { useEffect, useRef } from 'react';
import splashImage from '../../assets/succflix/succflixsplash.png';
import featuredVideo from '../../assets/succflix/videos/featured.mp4'; // Update path as needed

export default function SuccflixSplash({ onComplete }) {
  const videoRef = useRef();

  useEffect(() => {
    // Preload featured video
    if (videoRef.current) {
      videoRef.current.load(); // triggers preload
    }

    const timer = setTimeout(onComplete, 4000); // ⏱ 4 seconds total
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="w-[800px] h-[500px] relative bg-black">
      {/* 👇 Black background and splash image */}
      <img
        src={splashImage}
        alt="SuccFlix Splash"
        className="w-full h-full object-cover animate-fade-in"
      />

      {/* 👇 Hidden preload-only video element */}
      <video ref={videoRef} preload="auto" className="hidden">
        <source src={featuredVideo} type="video/mp4" />
      </video>
    </div>
  );
}
