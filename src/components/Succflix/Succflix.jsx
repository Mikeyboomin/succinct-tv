import React, { useEffect, useState } from 'react';
import Splash from './Splash';
import Navbar from './Navbar';
import Featured from './Featured';
import GenreRow from './GenreRow';
import FullscreenPlayer from './FullscreenPlayer';

export default function Succflix({
  remoteMove,
  remoteEnter,
  remoteVolumeUp,      // ✅ NEW
  remoteVolumeDown,    // ✅ NEW
  remoteFastForward,   // ✅ NEW
  remoteRewind         // ✅ NEW
}) {
  const [showSplash, setShowSplash] = useState(true);
  const [focusedSection, setFocusedSection] = useState('navbar');
  const [navbarIndex, setNavbarIndex] = useState(0);
  const [featuredButtonIndex, setFeaturedButtonIndex] = useState(0);
  const [genreRowIndex, setGenreRowIndex] = useState(0);
  const [cardIndex, setCardIndex] = useState(0);
  const [move, setMove] = useState(null);
  const [isPlayingFullscreen, setIsPlayingFullscreen] = useState(false);

  const maxNavbarIndex = 2;
  const maxGenreRows = 2;
  const maxFeaturedButtons = 1;

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 4000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (remoteMove) setMove(remoteMove);
  }, [remoteMove]);

  useEffect(() => {
    if (!remoteEnter || showSplash) return;
    if (focusedSection === 'featured' && featuredButtonIndex === 0) {
      setIsPlayingFullscreen(true);
    }
  }, [remoteEnter, showSplash, focusedSection, featuredButtonIndex]);

  useEffect(() => {
    if (!move || showSplash) return;
    const currentMove = move;
    setMove(null);

    if (focusedSection === 'navbar') {
      if (currentMove === 'right') {
        if (navbarIndex === maxNavbarIndex) {
          setFocusedSection('featured');
          setFeaturedButtonIndex(0);
        } else {
          setNavbarIndex((prev) => prev + 1);
        }
      } else if (currentMove === 'left') {
        setNavbarIndex((prev) => (prev > 0 ? prev - 1 : maxNavbarIndex));
      } else if (currentMove === 'down') {
        setFocusedSection('featured');
        setFeaturedButtonIndex(0);
      }
    }

    else if (focusedSection === 'featured') {
      if (currentMove === 'left') {
        if (featuredButtonIndex === 0) {
          setFocusedSection('navbar');
          setNavbarIndex(2);
        } else {
          setFeaturedButtonIndex(0);
        }
      } else if (currentMove === 'right') {
        if (featuredButtonIndex === 0) {
          setFeaturedButtonIndex(1);
        } else {
          setFocusedSection('genre');
          setGenreRowIndex(0);
          setCardIndex(0);
        }
      } else if (currentMove === 'down') {
        if (featuredButtonIndex === 0) {
          setFeaturedButtonIndex(1);
        } else {
          setFocusedSection('genre');
          setGenreRowIndex(0);
          setCardIndex(0);
        }
      } else if (currentMove === 'up') {
        if (featuredButtonIndex === 0) {
          setFocusedSection('navbar');
          setNavbarIndex(0);
        } else {
          setFeaturedButtonIndex(0);
        }
      }
    }

    else if (focusedSection === 'genre') {
      if (currentMove === 'left') {
        setCardIndex((prev) => Math.max(prev - 1, 0));
      } else if (currentMove === 'right') {
        setCardIndex((prev) => prev + 1);
      } else if (currentMove === 'down') {
        if (genreRowIndex < maxGenreRows) {
          setGenreRowIndex((prev) => prev + 1);
          setCardIndex(0);
        }
      } else if (currentMove === 'up') {
        if (genreRowIndex === 0) {
          setFocusedSection('featured');
          setFeaturedButtonIndex(1);
        } else {
          setGenreRowIndex((prev) => prev - 1);
          setCardIndex(0);
        }
      }
    }
  }, [move, focusedSection, showSplash]);

  if (showSplash) return <Splash />;

  return (
    <div className="w-[800px] h-[500px] bg-[#1c1c1c] text-white overflow-hidden relative">
      <div className="absolute inset-0 overflow-y-auto custom-scrollbar">
        {isPlayingFullscreen ? (
          <FullscreenPlayer
            onExit={() => setIsPlayingFullscreen(false)}
            remoteVolumeUp={remoteVolumeUp}           // ✅ Pass to player
            remoteVolumeDown={remoteVolumeDown}       // ✅ Pass to player
            remoteFastForward={remoteFastForward}     // ✅ Pass to player
            remoteRewind={remoteRewind}               // ✅ Pass to player
          />
        ) : (
          <>
            <Navbar focusedIndex={focusedSection === 'navbar' ? navbarIndex : -1} />
            <Featured
              isFocused={focusedSection === 'featured'}
              selectedButton={focusedSection === 'featured' ? featuredButtonIndex : -1}
            />
            <div className="space-y-10 px-6 pb-10 pt-8">
              <GenreRow
                title="Action"
                folder="action"
                isFocused={focusedSection === 'genre' && genreRowIndex === 0}
                activeCardIndex={
                  focusedSection === 'genre' && genreRowIndex === 0 ? cardIndex : -1
                }
              />
              <GenreRow
                title="Drama"
                folder="drama"
                isFocused={focusedSection === 'genre' && genreRowIndex === 1}
                activeCardIndex={
                  focusedSection === 'genre' && genreRowIndex === 1 ? cardIndex : -1
                }
              />
              <GenreRow
                title="Sci-Fi"
                folder="scifi"
                isFocused={focusedSection === 'genre' && genreRowIndex === 2}
                activeCardIndex={
                  focusedSection === 'genre' && genreRowIndex === 2 ? cardIndex : -1
                }
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
