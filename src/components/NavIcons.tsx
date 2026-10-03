import React from 'react';
import JesusPassagesIcon, { passagenImg } from './JesusPassagesIcon';

interface NavIconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
  isActive?: boolean;
}

/**
 * 1. INÍCIO (Home) - Estilo moderno com silhueta e portal dourado
 */
export function HomeNavIcon({
  className = "w-[33px] h-[33px]",
  isActive = false,
  ...props
}: NavIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
      {...props}
    >
      <defs>
        <linearGradient id="navGoldHome" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffbe0b" />
          <stop offset="100%" stopColor="#f1a30a" />
        </linearGradient>
      </defs>

      {/* Teto e paredes do templo / lar */}
      <path
        d="M3 10.5L12 3l9 7.5v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-9z"
        stroke="currentColor"
        strokeWidth="2.1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Portal dourado de luz interior */}
      <path
        d="M10 21v-6a2 2 0 0 1 4 0v6"
        fill="url(#navGoldHome)"
        opacity={isActive ? 1 : 0.85}
      />
    </svg>
  );
}

/**
 * 2. BÍBLIA (Bible) - Bíblia Sagrada aberta com marcador de cruz dourada
 */
export function BibleNavIcon({
  className = "w-[33px] h-[33px]",
  isActive = false,
  ...props
}: NavIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
      {...props}
    >
      <defs>
        <linearGradient id="navGoldBible" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffbe0b" />
          <stop offset="100%" stopColor="#f1a30a" />
        </linearGradient>
      </defs>

      {/* Páginas abertas da Bíblia */}
      <path
        d="M3 19a8.5 8.5 0 0 1 9 0 8.5 8.5 0 0 1 9 0V6a8.5 8.5 0 0 0-9 0 8.5 8.5 0 0 0-9 0v13z"
        stroke="currentColor"
        strokeWidth="2.1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Lombada central */}
      <line
        x1="12"
        y1="6"
        x2="12"
        y2="19"
        stroke="currentColor"
        strokeWidth="1.8"
      />

      {/* Fita / cruz dourada marcadora */}
      <path
        d="M11 6.5h2v6.5l-1-.8-1 .8V6.5z"
        fill="url(#navGoldBible)"
        opacity={isActive ? 1 : 0.85}
      />
    </svg>
  );
}

/**
 * 3. MISSÃO (Mission / Globe) - Globo terrestre com estrela missionária dourada
 */
export function MissionNavIcon({
  className = "w-[33px] h-[33px]",
  isActive = false,
  ...props
}: NavIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
      {...props}
    >
      <defs>
        <linearGradient id="navGoldMission" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffbe0b" />
          <stop offset="100%" stopColor="#f1a30a" />
        </linearGradient>
      </defs>

      {/* Esfera do globo terrestre */}
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2.1" />
      <path d="M3 12h18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M12 3a13 13 0 0 1 0 18" stroke="currentColor" strokeWidth="1.5" />
      <path d="M12 3a13 13 0 0 0 0 18" stroke="currentColor" strokeWidth="1.5" />

      {/* Estrela / Farol Missionário Dourado central */}
      <path
        d="M12 7.5l1.2 3.3 3.3 1.2-3.3 1.2-1.2 3.3-1.2-3.3-3.3-1.2 3.3-1.2z"
        fill="url(#navGoldMission)"
        opacity={isActive ? 1 : 0.9}
      />
    </svg>
  );
}

/**
 * 4. PASSAGENS DE JESUS (Jesus Áudio) - Ícone Oficial com Cruz Dourada, Nome JESUS Ultra-Legível e Equalizador
 */
export function JesusPassagesNavIcon({
  className = "w-[39px] h-[39px]",
  isActive = false,
  ...props
}: NavIconProps) {
  return (
    <JesusPassagesIcon
      className={`${className} transition-transform ${
        isActive ? 'scale-105 drop-shadow-[0_0_8px_rgba(255,234,0,0.6)]' : 'hover:scale-105'
      }`}
      isActive={isActive}
      {...props}
    />
  );
}

/**
  * 5. MAIS (Menu / Hub) - 4 Módulos com acento dourado moderno
  */
export function MoreNavIcon({
  className = "w-[33px] h-[33px]",
  isActive = false,
  ...props
}: NavIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
      {...props}
    >
      <defs>
        <linearGradient id="navGoldMore" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffbe0b" />
          <stop offset="100%" stopColor="#f1a30a" />
        </linearGradient>
      </defs>

      {/* Módulos do Menu */}
      <rect x="3.5" y="3.5" width="6.5" height="6.5" rx="2" stroke="currentColor" strokeWidth="2.1" />
      <rect x="14" y="3.5" width="6.5" height="6.5" rx="2" stroke="currentColor" strokeWidth="2.1" />
      <rect x="3.5" y="14" width="6.5" height="6.5" rx="2" stroke="currentColor" strokeWidth="2.1" />

      {/* 4º Módulo de destaque Dourado */}
      <rect
        x="14"
        y="14"
        width="6.5"
        height="6.5"
        rx="2"
        fill="url(#navGoldMore)"
        stroke="url(#navGoldMore)"
        strokeWidth="0.8"
        opacity={isActive ? 1 : 0.9}
      />
    </svg>
  );
}
