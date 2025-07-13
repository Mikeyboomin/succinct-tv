import React from 'react';
import {
  Power,
  CornerUpLeft,
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Volume2,
  VolumeX,
  FastForward,
  Rewind,
} from 'lucide-react';

export default function Remote({
  onPowerToggle,
  onMove,
  onEnter,
  onExit,
  onSelectApp,
  onVolumeUp,
  onVolumeDown,
  onFastForward,
  onRewind,
}) {
  return (
    <div className="bg-[#111216] text-white pt-6 pb-6 px-6 rounded-2xl shadow-xl w-52 h-[550px] flex flex-col justify-between relative">
      {/* Power Button - Top Left */}
      <div className="absolute top-6 left-4">
        <button
          onClick={onPowerToggle}
          className="w-8 h-8 bg-red-600 rounded-full shadow flex items-center justify-center"
        >
          <Power className="w-4 h-4" />
        </button>
      </div>

      {/* Exit Button - Top Right beside Up */}
      <div className="absolute top-[85px] right-4">
        <button
          onClick={onExit}
          className="w-8 h-8 bg-gray-800 rounded-full shadow flex items-center justify-center"
        >
          <CornerUpLeft className="w-4 h-4" />
        </button>
      </div>

      {/* Spacer */}
      <div className="h-8" />

      {/* D-Pad with OK */}
      <div className="flex flex-col items-center space-y-2 mt-4">
        <button
          onClick={() => onMove('up')}
          className="w-10 h-10 bg-gray-800 rounded-md flex items-center justify-center"
        >
          <ChevronUp className="w-4 h-4" />
        </button>

        <div className="flex space-x-2">
          <button
            onClick={() => onMove('left')}
            className="w-10 h-10 bg-gray-800 rounded-md flex items-center justify-center"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <button
            onClick={onEnter}
            className="w-10 h-10 bg-gray-800 rounded-full font-semibold flex items-center justify-center"
          >
            OK
          </button>

          <button
            onClick={() => onMove('right')}
            className="w-10 h-10 bg-gray-800 rounded-md flex items-center justify-center"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <button
          onClick={() => onMove('down')}
          className="w-10 h-10 bg-gray-800 rounded-md flex items-center justify-center"
        >
          <ChevronDown className="w-4 h-4" />
        </button>
      </div>

      {/* Volume & Program Pills */}
      <div className="flex items-start justify-center gap-4 mt-4">
        {/* Volume Pill */}
        <div className="flex flex-col items-center bg-gray-700 rounded-full overflow-hidden w-12">
          <button
            onClick={onVolumeUp}
            className="w-full h-8 bg-gray-800 flex items-center justify-center"
          >
            <Volume2 className="w-4 h-4" />
          </button>
          <div className="text-xs py-1 text-gray-300">VOL</div>
          <button
            onClick={onVolumeDown}
            className="w-full h-8 bg-gray-800 flex items-center justify-center"
          >
            <VolumeX className="w-4 h-4" />
          </button>
        </div>

        {/* Program Pill (optional logic) */}
        <div className="flex flex-col items-center bg-gray-700 rounded-full overflow-hidden w-12">
          <button className="w-full h-8 bg-gray-800 flex items-center justify-center text-xs font-bold">
            P+
          </button>
          <div className="text-xs py-1 text-gray-300">PROG</div>
          <button className="w-full h-8 bg-gray-800 flex items-center justify-center text-xs font-bold">
            P-
          </button>
        </div>
      </div>

      {/* SuccFlix Button */}
      <div className="mt-4 flex justify-center">
        <button
          onClick={() => onSelectApp && onSelectApp('succflix')}
          className="px-4 py-2 bg-pink-700 rounded-xl text-sm font-semibold shadow-md"
        >
          SUCCFLIX
        </button>
      </div>

      {/* Rewind / Fast-forward */}
      <div className="flex items-center justify-center gap-4 mt-4">
        <button
          onClick={onRewind}
          className="w-10 h-10 bg-gray-800 rounded-md flex items-center justify-center"
        >
          <Rewind className="w-4 h-4" />
        </button>
        <button
          onClick={onFastForward}
          className="w-10 h-10 bg-gray-800 rounded-md flex items-center justify-center"
        >
          <FastForward className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
