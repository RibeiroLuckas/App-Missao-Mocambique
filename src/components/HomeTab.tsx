import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, X, ChevronRight } from 'lucide-react';
import homeBgNovaCapa from '../assets/images/nova_capa.jpg';
import missaoLogoClean from '../assets/images/missao_mocambique_logo_clean.png';
import firstOrlandoLogo from '../assets/images/first_orlando_logo.svg';
import { LanguageType } from '../types';
import { t } from '../data/translations';
import { getPastorMessageContent } from '../data/pastorMessageData';

interface HomeTabProps {
  dailyVerse: { text: string; ref: string; theme?: string };
  onRotateVerse: () => void;
  onNavigateToMission: () => void;
  onNavigateToPassages?: () => void;
  onShowToast?: (msg: string) => void;
  selectedLanguage: LanguageType;
  onSelectLanguage: (lang: LanguageType) => void;
}

export default function HomeTab({
  dailyVerse,
  onRotateVerse,
  onNavigateToMission,
  onNavigateToPassages,
  selectedLanguage,
  onSelectLanguage,
}: HomeTabProps) {
  const [showMissionPopup, setShowMissionPopup] = useState(false);
  const msg = getPastorMessageContent(selectedLanguage);

  return (
    <motion.div
      key="home-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative flex-1 shrink-0 w-full min-h-full flex flex-col justify-between overflow-hidden select-none"
    >
      {/* BACKGROUND IMAGE - EXATAMENTE src/assets/images/nova capa.jpg */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <img
          src={homeBgNovaCapa}
          alt="Missão Moçambique - Capa Oficial"
          className="w-full h-full object-cover object-center"
        />
      </div>

      {/* Spacer to keep center area responsive */}
      <div className="flex-1 min-h-[0.5rem]" />

      {/* VERSÍCULO DO DIA CARD + "CONHEÇA A MISSÃO" BUTTON + BANDEIRAS SVG DE IDIOMA */}
      <footer className="relative z-10 px-4 pt-[calc(var(--app-safe-top)+4rem)] pb-6 w-full max-w-lg mx-auto space-y-5">
        {/* Versículo do dia Glassmorphism Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          onClick={onRotateVerse}
          className="bg-[#0c233c]/85 hover:bg-[#0e2a47]/90 active:scale-[0.99] backdrop-blur-md border border-white/15 rounded-2xl p-4 sm:p-5 shadow-[0_8px_30px_rgba(0,0,0,0.6)] cursor-pointer transition text-left relative overflow-hidden group"
          title={t('home_verse_tooltip', selectedLanguage)}
        >
          <div className="flex items-start gap-4">
            {/* Bible Circular Icon Container */}
            <div className="w-12 h-12 rounded-full bg-[#16385d] border border-white/10 flex items-center justify-center text-white shrink-0 shadow-inner">
              <BookOpen className="w-6 h-6 text-white" />
            </div>

            {/* Verse content */}
            <div className="flex-1 min-w-0 space-y-1">
              <span className="text-sm sm:text-base font-semibold text-white/95 block tracking-wide">
                {t('home_daily_verse', selectedLanguage)}
              </span>
              <p className="text-sm text-slate-100 font-sans italic leading-relaxed font-normal">
                "{dailyVerse.text.replace(/^["']|["']$/g, '')}"
              </p>
              <p className="text-sm font-bold text-white tracking-wide pt-0.5">
                {dailyVerse.ref}
              </p>
            </div>
          </div>
        </motion.div>

        {/* CONHEÇA A MISSÃO Call to Action Button */}
        <motion.button
          initial={{ opacity: 0, y: 20, scale: 1 }}
          animate={{
            opacity: 1,
            y: 0,
            scale: [1, 1.028, 1],
            boxShadow: [
              "0 6px 20px rgba(241,163,10,0.45), 0 0 0 0 rgba(241,163,10,0.65)",
              "0 12px 36px rgba(241,163,10,0.8), 0 0 0 10px rgba(241,163,10,0)",
              "0 6px 20px rgba(241,163,10,0.45), 0 0 0 0 rgba(241,163,10,0)"
            ]
          }}
          transition={{
            opacity: { duration: 0.5, delay: 0.2 },
            y: { duration: 0.5, delay: 0.2 },
            scale: { duration: 2.2, repeat: Infinity, ease: "easeInOut" },
            boxShadow: { duration: 2.2, repeat: Infinity, ease: "easeInOut" }
          }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.98 }}
          type="button"
          onClick={() => setShowMissionPopup(true)}
          id="btn-conheca-missao"
          className="w-full bg-[#f1a30a] hover:bg-[#df9508] text-[#020b18] font-black uppercase text-[15px] tracking-wider py-4 px-5 rounded-xl transition-colors flex items-center justify-center text-center font-sans cursor-pointer shadow-lg"
        >
          <span>{msg.btnText}</span>
        </motion.button>

      </footer>

      {/* POP-UP: CONHEÇA A MISSÃO */}
      <AnimatePresence>
        {showMissionPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4"
            onClick={() => setShowMissionPopup(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              transition={{ duration: 0.2 }}
              className="relative max-w-lg w-full h-[92vh] max-h-[860px] bg-[#02182b] border border-[#0b2d4f] rounded-[28px] overflow-hidden shadow-2xl flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Logo da Igreja no Topo (Sem bordas brancas - Logo Clean) */}
              <div className="relative w-full h-[40%] shrink-0 overflow-hidden bg-[#011122] border-b border-[#0b2d4f] flex items-center justify-center p-6">
                <img
                  src={missaoLogoClean}
                  alt="Missão Moçambique"
                  className="max-h-full max-w-full object-contain drop-shadow-lg"
                />

                {/* Botão Fechar no Topo */}
                <button
                  type="button"
                  onClick={() => setShowMissionPopup(false)}
                  className="absolute top-3.5 right-3.5 w-9 h-9 rounded-full bg-black/60 hover:bg-black/85 text-white flex items-center justify-center backdrop-blur-md transition shadow-md z-20 cursor-pointer"
                  aria-label="Fechar"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Título */}
              <div className="px-5 pt-3.5 pb-2.5 border-b border-[#0b2d4f]/60 bg-[#02182b] text-left shrink-0">
                <h3 className="text-xl sm:text-2xl font-black text-white leading-tight">
                  {msg.title}
                </h3>
                <p className="text-xs text-slate-300 mt-0.5">
                  {msg.subtitle}
                </p>
              </div>

              {/* Conteúdo com Texto Oficial */}
              <div className="flex-1 overflow-y-auto custom-scrollbar p-5 space-y-4 text-left text-xs sm:text-sm text-slate-200 leading-relaxed font-sans">
                <p className="font-semibold text-white text-[13px] sm:text-[14.5px]">
                  {msg.p1}
                </p>

                <p>
                  {msg.p2}
                </p>

                <p>
                  {msg.p3}
                </p>

                <p>
                  {msg.p4}
                </p>

                <p>
                  {msg.p5}
                </p>

                <p>
                  {msg.p6}
                </p>

                <p>
                  {msg.p7}
                </p>

                <p>
                  {msg.p8}
                </p>

                <p className="font-bold text-[#f1a30a] pt-1">
                  {msg.p9}
                </p>

                <p className="text-center font-black text-base sm:text-lg text-[#f1a30a] pt-2">
                  {msg.amen}
                </p>

                {/* Logo da First Orlando no Final do Texto (Como no Menu Mais) */}
                <div className="pt-5 pb-3 flex flex-col items-center justify-center">
                  <img
                    src={firstOrlandoLogo}
                    alt="First Baptist Orlando • Campus Brasileiro"
                    className="w-full max-w-[210px] h-auto object-contain drop-shadow-md"
                  />
                </div>
              </div>

              {/* Rodapé do Modal */}
              <div className="p-4 bg-[#011122] border-t border-[#0b2d4f] flex items-center justify-between gap-3 shrink-0">
                <button
                  type="button"
                  onClick={() => setShowMissionPopup(false)}
                  className="px-4 py-2.5 rounded-xl border border-[#0b2d4f] text-slate-300 hover:text-white text-xs font-bold transition"
                >
                  {msg.closeBtn}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowMissionPopup(false);
                    if (onNavigateToPassages) {
                      onNavigateToPassages();
                    } else {
                      onNavigateToMission();
                    }
                  }}
                  className="flex-1 bg-[#f1a30a] hover:bg-[#df9508] active:scale-[0.98] text-[#020b18] font-black text-xs sm:text-sm py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 transition shadow-md uppercase tracking-wider"
                >
                  <BookOpen className="w-4 h-4 shrink-0" />
                  <span>{msg.ctaBtn}</span>
                  <ChevronRight className="w-4 h-4 shrink-0" />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
