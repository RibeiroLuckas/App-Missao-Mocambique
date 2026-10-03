import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { LanguageType } from '../types';

interface LanguageSelectorProps {
  selectedLanguage: LanguageType;
  onSelectLanguage: (lang: LanguageType) => void;
}

export default function LanguageSelector({ selectedLanguage, onSelectLanguage }: LanguageSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const languages = [
    {
      code: 'pt',
      label: 'Português',
      flag: (
        <svg className="w-5 h-3.5 rounded-sm shadow-sm shrink-0 object-cover" viewBox="0 0 720 504" xmlns="http://www.w3.org/2000/svg">
          <rect width="720" height="504" fill="#009c3b"/>
          <polygon points="360,42 678,252 360,462 42,252" fill="#ffdf00"/>
          <circle cx="360" cy="252" r="126" fill="#002776"/>
        </svg>
      )
    },
    {
      code: 'en',
      label: 'English',
      flag: (
        <svg className="w-5 h-3.5 rounded-sm shadow-sm shrink-0 object-cover" viewBox="0 0 7410 3900" xmlns="http://www.w3.org/2000/svg">
          <rect width="7410" height="3900" fill="#bf0a30"/>
          <path d="M0,450H7410M0,1350H7410M0,2250H7410M0,3150H7410" stroke="#fff" strokeWidth="300"/>
          <rect width="2964" height="2100" fill="#002868"/>
        </svg>
      )
    },
    {
      code: 'es',
      label: 'Español',
      flag: (
        <svg className="w-5 h-3.5 rounded-sm shadow-sm shrink-0 object-cover" viewBox="0 0 750 500" xmlns="http://www.w3.org/2000/svg">
          <rect width="750" height="500" fill="#c60b1e"/>
          <rect width="750" height="250" y="125" fill="#ffc400"/>
        </svg>
      )
    }
  ];

  const currentLang = languages.find(l => l.code === (selectedLanguage === 'pt_PT' ? 'pt' : selectedLanguage)) || languages[0];

  return (
    <div className="absolute top-3.5 right-4 z-40" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 bg-[#02182b]/95 hover:bg-[#062c54] active:scale-95 text-slate-100 border border-[#0b2d4f] hover:border-[#f1a30a]/60 px-3.5 py-2 rounded-xl backdrop-blur-md shadow-xl transition text-xs font-bold cursor-pointer"
        title="Selecionar Idioma"
      >
        {currentLang.flag}
        <span className="font-sans font-black tracking-wide">{currentLang.label}</span>
        <ChevronDown className={`w-3.5 h-3.5 text-[#f1a30a] transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-[#02182b] border border-[#0b2d4f] rounded-2xl shadow-2xl overflow-hidden py-1.5 z-50 backdrop-blur-xl">
          {languages.map((lang) => {
            const isSelected = selectedLanguage === lang.code || (lang.code === 'pt' && selectedLanguage === 'pt_PT');
            return (
              <button
                key={lang.code}
                type="button"
                onClick={() => {
                  onSelectLanguage(lang.code as LanguageType);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 text-left text-xs font-bold transition cursor-pointer ${
                  isSelected
                    ? 'bg-[#f1a30a] text-[#020b18]'
                    : 'text-slate-200 hover:bg-[#062c54]/80'
                }`}
              >
                {lang.flag}
                <span className="flex-1 font-sans">{lang.label}</span>
                {isSelected && <span className="text-[10px] font-black">✓</span>}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
