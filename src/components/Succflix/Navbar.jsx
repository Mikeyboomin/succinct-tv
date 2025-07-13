import React from 'react';
import succflixLogo from '../../assets/succflix/logo.png';

export default function Navbar({ focusedIndex = -1 }) {
  const navItems = ['Home', 'Series', 'My List'];

  return (
    <div className="w-[800px] px-6 py-4 flex items-center justify-between bg-[#1c1c1c] pt-12 relative overflow-hidden">
      {/* 🟥 Logo */}
      <div className="h-8 flex items-center">
        <img
          src={succflixLogo}
          alt="Succflix Logo"
          className="h-[90px] w-auto drop-shadow-[0_0_4px_#ff0000cc]"
        />
      </div>

      {/* 🟦 Navigation Links */}
      <div className="absolute left-1/2 transform -translate-x-1/2 flex space-x-8 text-sm font-semibold tracking-wide">
        {navItems.map((item, index) => (
          <span
            key={item}
            className={`cursor-pointer transition-all ${
              focusedIndex === index
                ? 'text-white'
                : 'text-gray-400'
            }`}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
