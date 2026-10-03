import React from 'react';

interface JesusAudioBadgeProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

/**
 * High-fidelity Jesus Áudio Emblem Badge
 * Exactly reproducing the graphic logo from the user image:
 * Deep blue background, white headphones, golden soundwave bars, bold "JESUS", and "— ÁUDIO —".
 */
export default function JesusAudioBadge({
  className = "",
  size = "md"
}: JesusAudioBadgeProps) {
  const dimensions = {
    sm: "w-12 h-12",
    md: "w-20 h-20",
    lg: "w-28 h-28"
  }[size];

  return (
    <div
      className={`relative rounded-2xl overflow-hidden shadow-2xl flex flex-col items-center justify-between p-2 select-none shrink-0 border border-blue-400/20 bg-gradient-to-b from-[#024089] via-[#012555] to-[#01122a] ${dimensions} ${className}`}
    >
      {/* Background Radial Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(20,110,220,0.55),transparent_70%)] pointer-events-none" />

      {/* SVG Headphones + Audio Waves */}
      <div className="relative z-10 w-full flex-1 flex items-center justify-center">
        <svg
          viewBox="0 0 100 80"
          className="w-full h-full max-h-[70%]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="badgeGoldWave" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ffbe0b" />
              <stop offset="100%" stopColor="#f1a30a" />
            </linearGradient>
            <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Headphone Arch */}
          <path
            d="M 16 52 A 34 34 0 0 1 84 52"
            stroke="white"
            strokeWidth="8.5"
            strokeLinecap="round"
          />

          {/* Left Earcup */}
          <rect x="8" y="44" width="14" height="28" rx="7" fill="white" />
          {/* Right Earcup */}
          <rect x="78" y="44" width="14" height="28" rx="7" fill="white" />

          {/* Golden Soundwave Bars */}
          <g filter="url(#softGlow)">
            {/* 1 */}
            <rect x="30" y="38" width="5.5" height="22" rx="2.75" fill="url(#badgeGoldWave)" />
            {/* 2 */}
            <rect x="38.5" y="27" width="5.5" height="38" rx="2.75" fill="url(#badgeGoldWave)" />
            {/* 3 (Center) */}
            <rect x="47.2" y="16" width="5.6" height="54" rx="2.8" fill="url(#badgeGoldWave)" />
            {/* 4 */}
            <rect x="56" y="27" width="5.5" height="38" rx="2.75" fill="url(#badgeGoldWave)" />
            {/* 5 */}
            <rect x="64.5" y="38" width="5.5" height="22" rx="2.75" fill="url(#badgeGoldWave)" />
          </g>
        </svg>
      </div>

      {/* Typography: JESUS & — ÁUDIO — */}
      <div className="relative z-10 w-full text-center leading-none mt-0.5">
        <span className="block font-black text-white tracking-wider text-[11px] sm:text-[13px] font-sans drop-shadow-md">
          JESUS
        </span>
        <div className="flex items-center justify-center gap-1 mt-0.5">
          <div className="h-[2px] w-2 sm:w-3 bg-[#f1a30a] rounded-full" />
          <span className="font-extrabold text-[#f1a30a] tracking-widest text-[6px] sm:text-[7.5px] uppercase">
            ÁUDIO
          </span>
          <div className="h-[2px] w-2 sm:w-3 bg-[#f1a30a] rounded-full" />
        </div>
      </div>
    </div>
  );
}
