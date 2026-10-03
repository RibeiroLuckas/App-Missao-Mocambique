import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Maximize2, X } from 'lucide-react';
import { LanguageType } from '../types';

import missaoLogo from '../assets/images/missao_mocambique_logo_clean.png';
import childrenGroup1 from '../assets/images/children_group_1_1784054748086.jpg';
import missao2026Banner from '../assets/images/missao_2026_banner.jpeg';
import childrenGroup2 from '../assets/images/children_group_2_1784054774596.jpg';

interface CarouselItem {
  id: string;
  src: string;
  title: string;
  subtitle: string;
}

interface ChildrenCarouselProps {
  className?: string;
  selectedLanguage?: LanguageType;
}

export default function ChildrenCarousel({ className = '', selectedLanguage = 'pt' }: ChildrenCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const slides: CarouselItem[] = useMemo(() => {
    if (selectedLanguage === 'en') {
      return [
        {
          id: 'missao_logo',
          src: missaoLogo,
          title: 'Mozambique Mission',
          subtitle: 'Bringing the love of Christ, hope, and holistic transformation',
        },
        {
          id: 'group_1',
          src: childrenGroup1,
          title: 'Community & Future',
          subtitle: 'Families and youth in the villages of Sofala and Beira in Mozambique',
        },
        {
          id: 'missao_2026',
          src: missao2026Banner,
          title: 'Mission 2026 Mozambique',
          subtitle: 'God is breathing life into Mozambique. And you can be part of this.',
        },
        {
          id: 'group_2',
          src: childrenGroup2,
          title: 'Love & Practical Care',
          subtitle: 'Nutrition programs, discipleship, and ongoing humanitarian support',
        },
      ];
    }
    if (selectedLanguage === 'es') {
      return [
        {
          id: 'missao_logo',
          src: missaoLogo,
          title: 'Misión Mozambique',
          subtitle: 'Llevando el amor de Cristo, esperanza y transformación integral',
        },
        {
          id: 'group_1',
          src: childrenGroup1,
          title: 'Comunidad y Futuro',
          subtitle: 'Familias y jóvenes en las aldeas de Sofala y Beira en Mozambique',
        },
        {
          id: 'missao_2026',
          src: missao2026Banner,
          title: 'Misión 2026 Mozambique',
          subtitle: 'Dios está soplando vida sobre Mozambique. Y tú puedes ser parte de esto.',
        },
        {
          id: 'group_2',
          src: childrenGroup2,
          title: 'Amor y Cuidado Práctico',
          subtitle: 'Acciones de nutrición, discipulado y apoyo humanitario continuo',
        },
      ];
    }
    return [
      {
        id: 'missao_logo',
        src: missaoLogo,
        title: 'Missão Moçambique',
        subtitle: 'Levando o amor de Cristo, esperança e transformação integral',
      },
      {
        id: 'group_1',
        src: childrenGroup1,
        title: 'Comunidade e Futuro',
        subtitle: 'Famílias e jovens nas aldeias de Sofala e Beira em Moçambique',
      },
      {
        id: 'missao_2026',
        src: missao2026Banner,
        title: 'Missão 2026 Mozambique',
        subtitle: 'Deus está soprando vida sobre Moçambique. E você pode fazer parte disso.',
      },
      {
        id: 'group_2',
        src: childrenGroup2,
        title: 'Amor e Cuidado Prático',
        subtitle: 'Ações de nutrição, discipulado e apoio humanitário contínuo',
      },
    ];
  }, [selectedLanguage]);

  // Auto-advance carousel every 10 seconds when not paused or in modal
  useEffect(() => {
    if (isPaused || isModalOpen) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 10000);
    return () => clearInterval(interval);
  }, [isPaused, isModalOpen, slides.length]);

  const handlePrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
    touchStartX.current = null;
  };

  const activeSlide = slides[currentIndex] || slides[0];
  const isLogoSlide = activeSlide.id === 'missao_logo';
  const isBannerSlide = activeSlide.id === 'missao_2026';

  return (
    <div
      className={`relative w-full rounded-2xl overflow-hidden bg-[#011122] border border-[#0b2d4f] shadow-lg select-none ${className}`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Main Carousel Viewport - Square frame kept with zoom to eliminate outer white borders */}
      <div
        className={`relative w-full overflow-hidden bg-[#010e1c] group transition-all duration-300 ${
          isLogoSlide ? 'aspect-square' : 'aspect-[16/10] sm:aspect-[16/9]'
        }`}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSlide.id}
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="w-full h-full cursor-pointer relative flex items-center justify-center overflow-hidden"
            onClick={() => setIsModalOpen(true)}
          >
            <img
              src={activeSlide.src}
              alt={activeSlide.title}
              className={`w-full h-full transition-transform duration-500 ease-out ${
                isBannerSlide
                  ? 'object-contain bg-[#0e5963]'
                  : isLogoSlide
                  ? 'object-contain p-2.5 bg-[#011122]'
                  : 'object-cover object-center'
              }`}
              loading="lazy"
            />
            {/* Gradients only on landscape photo slides, keeping the logo & banner 100% clean */}
            {!isLogoSlide && !isBannerSlide && (
              <>
                <div className="absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-black/50 to-transparent pointer-events-none" />
                <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#010e1c] to-transparent pointer-events-none" />
              </>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Top Badges: Counter + Expand Button */}
        <div className="absolute top-2.5 inset-x-3 flex items-center justify-between pointer-events-none z-10">
          <span className="text-[10px] font-mono font-bold bg-black/70 text-[#f1a30a] border border-[#f1a30a]/40 px-2.5 py-0.5 rounded-full backdrop-blur-md shadow-sm">
            {currentIndex + 1} / {slides.length}
          </span>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setIsModalOpen(true);
            }}
            className="pointer-events-auto w-7 h-7 rounded-full bg-black/60 hover:bg-black/85 text-white/90 hover:text-white border border-white/20 flex items-center justify-center backdrop-blur-md transition active:scale-95 shadow-sm"
            title={selectedLanguage === 'en' ? 'Enlarge photo' : selectedLanguage === 'es' ? 'Ampliar foto' : 'Ampliar foto'}
            aria-label={selectedLanguage === 'en' ? 'Enlarge photo' : selectedLanguage === 'es' ? 'Ampliar foto' : 'Ampliar foto'}
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Navigation Arrows (Prev / Next) */}
        <button
          type="button"
          onClick={handlePrev}
          className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 hover:bg-black/85 active:scale-95 text-white border border-white/20 flex items-center justify-center backdrop-blur-md transition opacity-80 group-hover:opacity-100 shadow-md z-10"
          title={selectedLanguage === 'en' ? 'Previous photo' : selectedLanguage === 'es' ? 'Foto anterior' : 'Foto anterior'}
          aria-label={selectedLanguage === 'en' ? 'Previous photo' : selectedLanguage === 'es' ? 'Foto anterior' : 'Foto anterior'}
        >
          <ChevronLeft className="w-[23px] h-[23px]" />
        </button>

        <button
          type="button"
          onClick={handleNext}
          className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 hover:bg-black/85 active:scale-95 text-white border border-white/20 flex items-center justify-center backdrop-blur-md transition opacity-80 group-hover:opacity-100 shadow-md z-10"
          title={selectedLanguage === 'en' ? 'Next photo' : selectedLanguage === 'es' ? 'Siguiente foto' : 'Próxima foto'}
          aria-label={selectedLanguage === 'en' ? 'Next photo' : selectedLanguage === 'es' ? 'Siguiente foto' : 'Próxima foto'}
        >
          <ChevronRight className="w-[23px] h-[23px]" />
        </button>
      </div>

      {/* Slide Info & Pagination */}
      <div className="py-2.5 px-3.5 bg-[#021326] flex items-center justify-between gap-3 border-t border-[#0b2d4f]/60">
        <div className="min-w-0 flex-1 text-left">
          <h4 className="text-xs sm:text-sm font-bold text-white truncate">
            {activeSlide.title}
          </h4>
          <p className="text-[11px] text-slate-300 truncate font-sans">
            {activeSlide.subtitle}
          </p>
        </div>
        <div className="flex items-center gap-1.5 shrink-0">
          {slides.map((slide, idx) => (
            <button
              key={slide.id}
              type="button"
              onClick={() => setCurrentIndex(idx)}
              className={`h-1.5 rounded-full transition-all ${
                idx === currentIndex
                  ? 'w-6 bg-[#f1a30a]'
                  : 'w-1.5 bg-slate-600 hover:bg-slate-400'
              }`}
              title={selectedLanguage === 'en' ? `Go to photo ${idx + 1}` : selectedLanguage === 'es' ? `Ir a foto ${idx + 1}` : `Ir para foto ${idx + 1}`}
              aria-label={selectedLanguage === 'en' ? `Go to photo ${idx + 1}` : selectedLanguage === 'es' ? `Ir a foto ${idx + 1}` : `Ir para foto ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Fullscreen Photo Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col justify-between p-4"
            onClick={() => setIsModalOpen(false)}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between w-full max-w-4xl mx-auto pt-2">
              <div className="text-left">
                <span className="text-xs font-mono text-[#f1a30a] uppercase font-bold tracking-wider">
                  {selectedLanguage === 'en' ? `Photo ${currentIndex + 1} of ${slides.length}` : selectedLanguage === 'es' ? `Foto ${currentIndex + 1} de ${slides.length}` : `Foto ${currentIndex + 1} de ${slides.length}`}
                </span>
                <h3 className="text-sm font-bold text-white">{activeSlide.title}</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="w-9 h-9 rounded-full bg-slate-800 hover:bg-slate-700 text-white flex items-center justify-center transition border border-white/20"
                title={selectedLanguage === 'en' ? 'Close view' : selectedLanguage === 'es' ? 'Cerrar vista' : 'Fechar visualização'}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Image */}
            <div
              className="relative flex-1 flex items-center justify-center p-2"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={activeSlide.src}
                alt={activeSlide.title}
                className="max-w-full max-h-[75vh] object-contain rounded-xl shadow-2xl"
              />

              {/* Prev/Next inside modal */}
              <button
                type="button"
                onClick={handlePrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 hover:bg-black/85 text-white border border-white/20 flex items-center justify-center backdrop-blur-md transition active:scale-95"
              >
                <ChevronLeft className="w-[28px] h-[28px]" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 hover:bg-black/85 text-white border border-white/20 flex items-center justify-center backdrop-blur-md transition active:scale-95"
              >
                <ChevronRight className="w-[28px] h-[28px]" />
              </button>
            </div>

            {/* Modal Footer Caption */}
            <div className="w-full max-w-2xl mx-auto pb-4 text-center">
              <p className="text-xs text-slate-300 font-sans">{activeSlide.subtitle}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
