import React from 'react';

interface FirstOrlandoLogoProps {
  className?: string;
  showSubtitle?: boolean;
  subtitle?: string;
  color?: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function FirstOrlandoLogo({
  className = '',
  showSubtitle = true,
  subtitle = 'CAMPUS BRASILEIRO',
  color = '#FFFFFF',
  size = 'md',
}: FirstOrlandoLogoProps) {
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-10 h-10',
    lg: 'w-13 h-13',
  };

  const titleSizes = {
    sm: 'text-[11px]',
    md: 'text-[14px]',
    lg: 'text-[17px]',
  };

  const orlandoSizes = {
    sm: 'text-[14px]',
    md: 'text-[18px]',
    lg: 'text-[22px]',
  };

  const subSizes = {
    sm: 'text-[6px]',
    md: 'text-[7.5px]',
    lg: 'text-[9.5px]',
  };

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Exact 13-Circle Diamond Icon from First Orlando Brand */}
      <div className="relative shrink-0 flex items-center justify-center">
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`${iconSizes[size]} drop-shadow-[0_2px_6px_rgba(0,0,0,0.5)]`}
        >
          {/* 1. Center Circle (Medium) */}
          <circle cx="50" cy="50" r="9" fill={color} />

          {/* 2. Four Inner Cardinal Small Dots */}
          <circle cx="50" cy="30.5" r="5" fill={color} />
          <circle cx="50" cy="69.5" r="5" fill={color} />
          <circle cx="30.5" cy="50" r="5" fill={color} />
          <circle cx="69.5" cy="50" r="5" fill={color} />

          {/* 3. Four Outer Cardinal Tip Dots */}
          <circle cx="50" cy="11.5" r="8.5" fill={color} />
          <circle cx="50" cy="88.5" r="8.5" fill={color} />
          <circle cx="11.5" cy="50" r="8.5" fill={color} />
          <circle cx="88.5" cy="50" r="8.5" fill={color} />

          {/* 4. Four Diagonal Quadrant Large Dots */}
          <circle cx="27" cy="27" r="11" fill={color} />
          <circle cx="73" cy="27" r="11" fill={color} />
          <circle cx="27" cy="73" r="11" fill={color} />
          <circle cx="73" cy="73" r="11" fill={color} />
        </svg>
      </div>

      {/* Typography Hierarchy matching First Orlando official lockup */}
      <div className="flex flex-col text-left leading-tight">
        <span className={`${titleSizes[size]} font-black tracking-[0.14em] text-white uppercase font-sans drop-shadow-sm`}>
          FIRST
        </span>
        <span className={`${orlandoSizes[size]} font-black tracking-[0.03em] text-white uppercase font-sans -mt-0.5 drop-shadow-sm`}>
          ORLANDO
        </span>
        {showSubtitle && (
          <span className={`${subSizes[size]} font-bold tracking-[0.14em] text-slate-200 uppercase font-sans mt-0.5 drop-shadow-sm`}>
            {subtitle}
          </span>
        )}
      </div>
    </div>
  );
}
