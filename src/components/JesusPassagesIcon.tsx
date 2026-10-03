import React from 'react';
import defaultPassagenSvg from '../assets/images/passagen.svg';

export const passagenImg = defaultPassagenSvg;

interface JesusPassagesIconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
  isActive?: boolean;
}

/**
 * Official "As Mais Belas Passagens de Jesus" Icon (icone.jpeg)
 * Features:
 * - Royal navy blue squircle canvas with subtle border
 * - Top circular celestial glow & arch
 * - Radiant white Latin Cross with golden halo
 * - Concentric golden broadcast audio waves ((( ✝ )))
 * - Open Bible with layered white pages and golden binding rim
 * - "AS MAIS BELAS PASSAGENS DE"
 * - 3D Golden "JESUS" typography
 * - Golden audio wave equalizer divider (——— ||||| ———)
 * - "Á U D I O" in gold
 */
export default function JesusPassagesIcon({
  className = "w-6 h-6",
  isActive = false,
  ...props
}: JesusPassagesIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 400 400"
      fill="none"
      className={className}
      aria-hidden="true"
      {...props}
    >
      <defs>
        <radialGradient id="jesusNavyBg" cx="50%" cy="35%" r="70%">
          <stop offset="0%" stopColor="#0a4699" />
          <stop offset="35%" stopColor="#062e6e" />
          <stop offset="70%" stopColor="#031a44" />
          <stop offset="100%" stopColor="#010c22" />
        </radialGradient>

        <radialGradient id="jesusDomeGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#145bc0" stopOpacity="0.8" />
          <stop offset="70%" stopColor="#062d6b" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#021435" stopOpacity="0" />
        </radialGradient>

        <radialGradient id="jesusDivineLight" cx="50%" cy="45%" r="45%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
          <stop offset="25%" stopColor="#ffea75" stopOpacity="0.9" />
          <stop offset="55%" stopColor="#f59e0b" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
        </radialGradient>

        <linearGradient id="jesus3DGoldGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="18%" stopColor="#ffea75" />
          <stop offset="48%" stopColor="#f5b318" />
          <stop offset="85%" stopColor="#d97706" />
          <stop offset="100%" stopColor="#b45309" />
        </linearGradient>

        <linearGradient id="jesusGoldRim" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#d97706" />
          <stop offset="25%" stopColor="#fcd34d" />
          <stop offset="50%" stopColor="#ffffff" />
          <stop offset="75%" stopColor="#fcd34d" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>

        <linearGradient id="jesusBroadcast" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fff8db" />
          <stop offset="50%" stopColor="#ffc107" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>

        <linearGradient id="jesusBorder" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#1e5bb5" />
          <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#0a2558" />
        </linearGradient>
      </defs>

      {/* Base App Squircle Canvas */}
      <rect x="6" y="6" width="388" height="388" rx="82" ry="82" fill="url(#jesusNavyBg)" />
      <rect
        x="6"
        y="6"
        width="388"
        height="388"
        rx="82"
        ry="82"
        fill="none"
        stroke={isActive ? "#ffea00" : "url(#jesusBorder)"}
        strokeWidth={isActive ? "6" : "3"}
      />

      {/* Top Dome Arch Background */}
      <circle cx="200" cy="130" r="102" fill="url(#jesusDomeGlow)" />
      <path d="M 98 135 A 102 102 0 1 1 302 135" fill="none" stroke="#2563eb" strokeWidth="2.5" opacity="0.4" />

      {/* Divine Light Burst */}
      <circle cx="200" cy="115" r="75" fill="url(#jesusDivineLight)" opacity="0.85" />

      {/* Concentric Broadcast Audio Waves ((( ✝ ))) */}
      <g stroke="url(#jesusBroadcast)" fill="none" strokeLinecap="round">
        {/* Left Waves */}
        <path d="M 166 94 A 36 36 0 0 0 166 136" strokeWidth="5" />
        <path d="M 150 82 A 54 54 0 0 0 150 148" strokeWidth="5.5" />
        <path d="M 134 70 A 74 74 0 0 0 134 160" strokeWidth="6" />

        {/* Right Waves */}
        <path d="M 234 94 A 36 36 0 0 1 234 136" strokeWidth="5" />
        <path d="M 250 82 A 54 54 0 0 1 250 148" strokeWidth="5.5" />
        <path d="M 266 70 A 74 74 0 0 1 266 160" strokeWidth="6" />
      </g>

      {/* Shining Latin Cross */}
      <g>
        {/* Golden cross bevel backing */}
        <rect x="190.5" y="44" width="19" height="136" rx="4" fill="#d97706" />
        <rect x="156.5" y="77" width="87" height="19" rx="4" fill="#d97706" />

        {/* Pure Brilliant White / Light Gold Cross Core */}
        <rect x="192.5" y="46" width="15" height="132" rx="3" fill="#ffffff" />
        <rect x="158.5" y="79" width="83" height="15" rx="3" fill="#ffffff" />

        {/* Highlight Beam */}
        <line x1="200" y1="50" x2="200" y2="175" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" />
        <line x1="162" y1="86.5" x2="238" y2="86.5" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" />
      </g>

      {/* Open Bible with Layered Pages & Golden Binding */}
      <g>
        {/* Base Rim */}
        <path
          d="M 46 222 C 105 192 165 204 200 216 C 235 204 295 192 354 222 C 342 232 290 228 200 224 C 110 228 58 232 46 222 Z"
          fill="#06204c"
        />
        {/* Golden Bottom Trim */}
        <path
          d="M 46 222 Q 124 196 200 218 Q 276 196 354 222 C 342 234 278 226 200 227 C 122 226 58 234 46 222 Z"
          fill="url(#jesusGoldRim)"
          stroke="#b45309"
          strokeWidth="1.5"
        />
        {/* Middle Layer Pages */}
        <path
          d="M 52 216 C 110 188 168 198 200 214 C 232 198 290 188 348 216 C 334 204 278 195 200 210 C 122 195 66 204 52 216 Z"
          fill="#e2e8f0"
        />
        {/* Top Left Open Page */}
        <path
          d="M 200 214 C 172 162 120 152 68 198 C 66 201 68 205 72 204 C 122 184 170 190 200 214 Z"
          fill="#ffffff"
        />
        {/* Top Right Open Page */}
        <path
          d="M 200 214 C 228 162 280 152 332 198 C 334 201 332 205 328 204 C 278 184 230 190 200 214 Z"
          fill="#ffffff"
        />
        {/* Center Spine Crease */}
        <polygon points="197,214 203,214 201,170 199,170" fill="#fcd34d" opacity="0.8" />
      </g>

      {/* TEXT: "AS MAIS BELAS PASSAGENS DE" */}
      <text
        x="200"
        y="254"
        textAnchor="middle"
        fontFamily="system-ui, -apple-system, 'Montserrat', 'Inter', sans-serif"
        fontWeight="800"
        fontSize="19"
        letterSpacing="2.8"
        fill="#ffffff"
      >
        AS MAIS BELAS PASSAGENS DE
      </text>

      {/* HERO TEXT: "JESUS" */}
      <g>
        <text
          x="200"
          y="320"
          textAnchor="middle"
          fontFamily="system-ui, -apple-system, 'Montserrat', 'Arial Black', sans-serif"
          fontWeight="900"
          fontSize="64"
          letterSpacing="3.5"
          fill="#010a1a"
          stroke="#010a1a"
          strokeWidth="7"
          strokeLinejoin="round"
        >
          JESUS
        </text>
        <text
          x="200"
          y="318"
          textAnchor="middle"
          fontFamily="system-ui, -apple-system, 'Montserrat', 'Arial Black', sans-serif"
          fontWeight="900"
          fontSize="64"
          letterSpacing="3.5"
          fill="url(#jesus3DGoldGrad)"
        >
          JESUS
        </text>
      </g>

      {/* AUDIO EQUALIZER DIVIDER (——— ||||| ———) */}
      <g transform="translate(200, 338)">
        <line x1="-125" y1="0" x2="-26" y2="0" stroke="url(#jesusGoldRim)" strokeWidth="2.5" strokeLinecap="round" />
        <rect x="-20" y="-6" width="5.5" height="12" rx="2.75" fill="url(#jesusBroadcast)" />
        <rect x="-10" y="-11" width="5.5" height="22" rx="2.75" fill="url(#jesusBroadcast)" />
        <rect x="0" y="-17" width="5.5" height="34" rx="2.75" fill="#ffffff" />
        <rect x="10" y="-11" width="5.5" height="22" rx="2.75" fill="url(#jesusBroadcast)" />
        <rect x="20" y="-6" width="5.5" height="12" rx="2.75" fill="url(#jesusBroadcast)" />
        <line x1="26" y1="0" x2="125" y2="0" stroke="url(#jesusGoldRim)" strokeWidth="2.5" strokeLinecap="round" />
      </g>

      {/* SUBTITLE TEXT: "Á U D I O" */}
      <text
        x="200"
        y="370"
        textAnchor="middle"
        fontFamily="system-ui, -apple-system, 'Montserrat', 'Inter', sans-serif"
        fontWeight="700"
        fontSize="16"
        letterSpacing="9"
        fill="#fcd34d"
      >
        Á U D I O
      </text>
    </svg>
  );
}
