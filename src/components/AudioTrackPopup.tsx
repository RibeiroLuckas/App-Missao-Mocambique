import React, { ChangeEvent } from 'react';
import { motion } from 'motion/react';
import {
  Play,
  Pause,
  RotateCcw,
  RotateCw,
  SkipBack,
  SkipForward,
  X,
  Maximize2
} from 'lucide-react';
import { JesusPassage, LanguageType } from '../types';
import { t } from '../data/translations';
import JesusAudioBadge from './JesusAudioBadge';

interface AudioTrackPopupProps {
  currentPassage: JesusPassage;
  isPlaying: boolean;
  onTogglePlay: () => void;
  onSkipForward: () => void;
  onSkipBackward: () => void;
  onNextTrack: () => void;
  onPreviousTrack: () => void;
  audioProgress: number;
  onSeekAudio: (e: ChangeEvent<HTMLInputElement>) => void;
  currentAudioTime: number;
  audioDuration: number;
  formatTime: (sec: number) => string;
  onClose: () => void;
  onOpenFullPlayer: () => void;
  selectedLanguage: LanguageType;
}

export default function AudioTrackPopup({
  currentPassage,
  isPlaying,
  onTogglePlay,
  onSkipForward,
  onSkipBackward,
  onNextTrack,
  onPreviousTrack,
  audioProgress,
  onSeekAudio,
  currentAudioTime,
  audioDuration,
  formatTime,
  onClose,
  onOpenFullPlayer,
  selectedLanguage,
}: AudioTrackPopupProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 35, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 25, scale: 0.98 }}
      transition={{ type: "spring", stiffness: 350, damping: 30 }}
      className="absolute bottom-[calc(6.85rem+env(safe-area-inset-bottom,0px))] inset-x-2.5 sm:inset-x-4 z-50 select-none"
    >
      <div className="relative rounded-2xl overflow-hidden bg-[#031528]/95 backdrop-blur-xl border border-[#0d3b66] shadow-[0_12px_40px_rgba(0,0,0,0.75)] p-2.5 sm:p-3 text-white">
        {/* Subtle Top Ambient Glow Line */}
        <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#f1a30a] to-transparent opacity-80" />

        {/* PROGRESS SCRUBBER BAR */}
        <div className="w-full mb-2 px-1">
          <div className="relative flex items-center group">
            <input
              type="range"
              min="0"
              max="100"
              step="0.1"
              value={isNaN(audioProgress) ? 0 : audioProgress}
              onChange={onSeekAudio}
              className="w-full h-1.5 bg-slate-800/90 rounded-full appearance-none cursor-pointer accent-[#f1a30a] focus:outline-none"
              style={{
                background: `linear-gradient(to right, #f1a30a ${audioProgress}%, rgba(30, 41, 59, 0.9) ${audioProgress}%)`
              }}
              title="Avançar / Voltar no áudio"
            />
          </div>
          <div className="flex justify-between items-center text-[9px] font-mono font-medium text-slate-400 mt-1">
            <span>{formatTime(currentAudioTime)}</span>
            <span className="text-[8px] uppercase tracking-wider text-[#f1a30a]/80 font-bold">
              {isPlaying ? t('louvores_playing', selectedLanguage) : 'Pausado'}
            </span>
            <span>{formatTime(audioDuration || 0)}</span>
          </div>
        </div>

        {/* MAIN ROW: TRACK INFO & CONTROLS */}
        <div className="flex items-center justify-between gap-2">
          {/* LEFT: Artwork & Track Title (Clickable to open full player) */}
          <div
            onClick={onOpenFullPlayer}
            className="flex items-center gap-2.5 flex-1 min-w-0 cursor-pointer group"
            title="Toque para abrir reprodutor completo"
          >
            {/* Visual Icon Badge (Blue Jesus Audio emblem) */}
            <div className="relative shrink-0 w-10 h-10 rounded-xl overflow-hidden shadow-md border border-blue-400/30 group-hover:scale-105 transition-transform">
              <JesusAudioBadge size="sm" className="w-full h-full" />
            </div>

            {/* Title & Subtitle */}
            <div className="flex-1 min-w-0 text-left">
              <h4 className="text-xs font-bold text-white group-hover:text-[#f1a30a] transition truncate leading-snug">
                {currentPassage.title}
              </h4>
              <p className="text-[10px] text-slate-400 font-sans truncate leading-none mt-0.5">
                {currentPassage.description || t('louvores_main_subtitle', selectedLanguage)}
              </p>
            </div>
          </div>

          {/* CENTER/RIGHT: COMPACT CONTROLS */}
          <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
            {/* Voltar Faixa (Previous Track) */}
            <button
              type="button"
              onClick={onPreviousTrack}
              className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 active:scale-95 transition"
              title="Faixa anterior"
              aria-label="Faixa anterior"
            >
              <SkipBack className="w-4 h-4 fill-current" />
            </button>

            {/* Voltar 10s no Áudio */}
            <button
              type="button"
              onClick={onSkipBackward}
              className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 active:scale-95 transition relative flex items-center justify-center"
              title="Voltar 10 segundos no áudio"
              aria-label="Voltar 10 segundos"
            >
              <RotateCcw className="w-4 h-4" />
              <span className="absolute text-[7px] font-black -bottom-0.5 text-[#f1a30a]">10</span>
            </button>

            {/* Play / Pause (Golden Hero Button) */}
            <button
              type="button"
              onClick={onTogglePlay}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#f1a30a] hover:bg-[#df9508] active:scale-95 text-[#020b18] flex items-center justify-center shadow-[0_2px_12px_rgba(241,163,10,0.4)] transition"
              title={isPlaying ? "Pausar áudio" : "Tocar áudio"}
              aria-label={isPlaying ? "Pausar" : "Tocar"}
            >
              {isPlaying ? (
                <Pause className="w-4 h-4 fill-current" />
              ) : (
                <Play className="w-4 h-4 fill-current translate-x-0.5" />
              )}
            </button>

            {/* Avançar 10s no Áudio */}
            <button
              type="button"
              onClick={onSkipForward}
              className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 active:scale-95 transition relative flex items-center justify-center"
              title="Avançar 10 segundos no áudio"
              aria-label="Avançar 10 segundos"
            >
              <RotateCw className="w-4 h-4" />
              <span className="absolute text-[7px] font-black -bottom-0.5 text-[#f1a30a]">10</span>
            </button>

            {/* Avançar Faixa (Next Track) */}
            <button
              type="button"
              onClick={onNextTrack}
              className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 active:scale-95 transition"
              title="Próxima faixa"
              aria-label="Próxima faixa"
            >
              <SkipForward className="w-4 h-4 fill-current" />
            </button>

            {/* Abrir player completo */}
            <button
              type="button"
              onClick={onOpenFullPlayer}
              className="p-1.5 rounded-lg text-slate-400 hover:text-[#f1a30a] hover:bg-white/10 active:scale-95 transition hidden sm:inline-flex"
              title="Ver detalhes completos"
              aria-label="Expandir"
            >
              <Maximize2 className="w-3.5 h-3.5" />
            </button>

            {/* Fechar Pop-up */}
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 active:scale-95 transition ml-0.5"
              title="Fechar reprodutor"
              aria-label="Fechar"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
