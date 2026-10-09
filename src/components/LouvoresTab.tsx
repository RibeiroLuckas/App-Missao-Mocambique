import { useState, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Music,
  Play,
  Pause,
  ChevronRight,
  ChevronLeft,
  Volume2,
  VolumeX,
  Share2,
  Sparkles,
  Check,
  Download,
  MoreVertical,
  BookOpen,
  Droplet,
  Leaf,
  Crown,
  Compass,
  SkipBack,
  SkipForward,
  RotateCcw,
  RotateCw,
  Maximize2,
  X,
  Headphones
} from 'lucide-react';
import logoImg from '../assets/images/missao_mocambique_logo_clean.png';
import volume1Img from '../assets/images/Captura de tela 2026-09-08 132845.png';
import volume2Img from '../assets/images/episode_2_miracles_1784565581240.jpg';
import volume3Img from '../assets/images/episode_3_parables_1784565596220.jpg';
import volume4Img from '../assets/images/episode_4_crucifixion_1784565610276.jpg';
import jesusCoverImg from '../assets/images/passagen.svg';
import { JesusPassage, LanguageType } from '../types';
import { getLocalizedBibleVolumes, BibleTrack } from '../data/bibleVolumesData';
import { t } from '../data/translations';
import JesusPassagesIcon from './JesusPassagesIcon';

const VOLUME_IMAGES: Record<number, string> = {
  1: volume1Img,
  2: volume2Img,
  3: volume3Img,
  4: volume4Img,
};

interface LouvoresTabProps {
  // Current Audio properties
  currentPassage: JesusPassage;
  isPlaying: boolean;
  onSelectPassage: (p: JesusPassage) => void;
  onTogglePlay: () => void;
  onSkipForward?: () => void;
  onSkipBackward?: () => void;
  onNextTrack?: () => void;
  onPreviousTrack?: () => void;
  audioProgress: number;
  onSeekAudio: (pct: number) => void;
  currentAudioTime: number;
  formatTime: (sec: number) => string;
  playbackSpeed: number;
  setPlaybackSpeed: (s: number) => void;
  isMuted: boolean;
  setIsMuted: (m: boolean) => void;
  
  // Previous Jesus Passages list
  JESUS_PASSAGES: JesusPassage[];
  selectedLanguage: LanguageType;
  setSelectedLanguage: (l: LanguageType) => void;
  
  onShowToast: (msg: string) => void;
  onNavigateToHome?: () => void;
}

export default function LouvoresTab({
  currentPassage,
  isPlaying,
  onSelectPassage,
  onTogglePlay,
  onSkipForward,
  onSkipBackward,
  onNextTrack,
  onPreviousTrack,
  audioProgress,
  onSeekAudio,
  currentAudioTime,
  formatTime,
  playbackSpeed,
  setPlaybackSpeed,
  isMuted,
  setIsMuted,
  JESUS_PASSAGES,
  selectedLanguage,
  setSelectedLanguage,
  onShowToast,
  onNavigateToHome,
}: LouvoresTabProps) {
  const [subView, setSubView] = useState<'lobby' | 'player'>('lobby');
  const [selectedVolumeId, setSelectedVolumeId] = useState<number | null>(null);
  const [isCoverModalOpen, setIsCoverModalOpen] = useState(false);

  const bibleVolumes = useMemo(() => getLocalizedBibleVolumes(selectedLanguage), [selectedLanguage]);

  const getVolumeTitle = (volId: number) => {
    return t(`louvores_vol${volId}_title`, selectedLanguage);
  };

  const getVolumeSub = (volId: number) => {
    return t(`louvores_vol${volId}_sub`, selectedLanguage);
  };

  const getVolumeIntro = (volId: number) => {
    return t(`louvores_vol${volId}_intro`, selectedLanguage);
  };

  const handlePlayTrack = (track: BibleTrack) => {
    const trackNumStr = track.trackNumber < 10 ? `0${track.trackNumber}` : `${track.trackNumber}`;
    const passage: JesusPassage = {
      id: track.id,
      episode: track.volumeId,
      title: `Track ${trackNumStr} — ${track.title}`,
      description: `${t('louvores_vol_label', selectedLanguage)} ${track.volumeId} • ${track.reference}`,
      bibleText: `${track.title} (${track.reference})`,
      audioUrls: {
        pt: track.audioUrl || "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
        pt_PT: track.audioUrl || "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
        en: track.audioUrl || "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"
      },
      duration: track.duration || "4:00",
      image: VOLUME_IMAGES[track.volumeId] || volume1Img
    };
    onSelectPassage(passage);
    setSubView('player');
    onShowToast(`Track ${trackNumStr}: ${track.title}`);
  };

  const carouselRef = useRef<HTMLDivElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleScroll = () => {
    if (carouselRef.current) {
      const container = carouselRef.current;
      const scrollPosition = container.scrollLeft;
      const cards = container.children;
      
      let closestIndex = 0;
      let minDistance = Infinity;
      const containerCenter = scrollPosition + container.clientWidth / 2;

      for (let i = 0; i < cards.length; i++) {
        const card = cards[i] as HTMLElement;
        const cardCenter = card.offsetLeft + card.clientWidth / 2;
        const distance = Math.abs(containerCenter - cardCenter);
        if (distance < minDistance) {
          minDistance = distance;
          closestIndex = i;
        }
      }
      
      if (closestIndex !== currentSlide) {
        setCurrentSlide(closestIndex);
      }
    }
  };

  const scrollToIndex = (index: number) => {
    if (carouselRef.current) {
      const container = carouselRef.current;
      const cards = container.children;
      if (cards && cards[index]) {
        const card = cards[index] as HTMLElement;
        container.scrollTo({
          left: card.offsetLeft - (container.clientWidth - card.clientWidth) / 2,
          behavior: 'smooth'
        });
        setCurrentSlide(index);
      }
    }
  };

  const handlePlayEpisode = (episodeNumber: number) => {
    const p = JESUS_PASSAGES.find(x => x.episode === episodeNumber);
    if (p) {
      onSelectPassage(p);
      setSubView('player');
      onShowToast(selectedLanguage === 'pt_PT' ? `A reproduzir o Episódio ${episodeNumber}: ${p.title}` : `Reproduzindo Episódio ${episodeNumber}: ${p.title}`);
    } else {
      onShowToast(`Episódio ${episodeNumber} não disponível.`);
    }
  };

  return (
    <div className="w-full min-h-full flex flex-col space-y-4 pb-12 px-0 text-left">
      {/* High-Fidelity Custom Navigation Header */}
      <div className="sticky top-0 z-30 bg-[#041d34]/95 backdrop-blur-md flex items-center justify-between border-b border-[#0b2d4f] pt-[max(2.5rem,calc(var(--app-safe-top)+0.5rem))] pb-3 mb-1 px-4">
        <button
          onClick={() => {
            if (subView !== 'lobby') {
              setSubView('lobby');
            } else if (onNavigateToHome) {
              onNavigateToHome();
            }
          }}
          className="p-1 rounded-none hover:bg-[#041d34] text-slate-400 hover:text-white transition active:scale-95"
        >
          <ChevronLeft className="w-5 h-5 text-[#f1a30a]" />
        </button>
        
        <div className="flex items-center justify-center gap-2 flex-1 mx-2 min-w-0">
          <JesusPassagesIcon className="w-5 h-5 shrink-0" />
          <h2 className="text-xs font-black text-slate-100 uppercase tracking-wider truncate">
            {subView === 'lobby' ? t('louvores_title', selectedLanguage) : t('louvores_playing', selectedLanguage)}
          </h2>
        </div>

        <div className="w-8" />
      </div>

      <AnimatePresence mode="wait">
        
        {/* LOBBY / LIBRARY LIST: Série Especial Passagens Bíblicas */}
        {subView === 'lobby' && (
          <motion.div
            key="passagens-lobby"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-4"
          >
            {/* HERO SPOTLIGHT: Imagem em Destaque no Topo de Passagens de Jesus */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#06152d] via-[#0b244d] to-[#030d1c] border border-slate-800/40 p-4 sm:p-5 shadow-2xl text-white">
              {/* Ambient radial glow */}
              <div className="absolute -top-12 -right-12 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />

              <div className="relative z-10 flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-5">
                {/* Artwork Thumbnail with Expand Overlay */}
                <div
                  onClick={() => setIsCoverModalOpen(true)}
                  className="group relative w-36 sm:w-44 aspect-square shrink-0 rounded-[24px] overflow-hidden shadow-[0_14px_32px_rgba(0,0,0,0.6)] cursor-pointer transition-transform duration-300 hover:scale-[1.03] ring-1 ring-white/10"
                  title="Clique para ampliar"
                >
                  <img
                    src={jesusCoverImg}
                    alt="As Mais Belas Passagens de Jesus"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/35 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="p-2 rounded-full bg-black/75 text-amber-300 border border-amber-400/50 backdrop-blur-md shadow-md">
                      <Maximize2 className="w-5 h-5" />
                    </span>
                  </div>
                </div>

                {/* Information */}
                <div className="flex-1 text-center sm:text-left space-y-1.5 self-center">
                  <h1 className="font-serif font-black text-xl sm:text-2xl text-amber-100 tracking-wide leading-tight drop-shadow-sm">
                    {selectedLanguage === 'en'
                      ? 'The Most Beautiful Passages of Jesus'
                      : selectedLanguage === 'es'
                      ? 'Las Más Bellas Pasajes de Jesús'
                      : 'As Mais Belas Passagens de Jesus'}
                  </h1>
                  <p className="text-xs sm:text-[13px] text-slate-300 font-sans leading-relaxed">
                    {selectedLanguage === 'en'
                      ? 'Epic dramatized audio series with orchestral soundtrack depicting the life and miracles of Jesus Christ.'
                      : selectedLanguage === 'es'
                      ? 'Serie de audio dramatizado épico con banda sonora orquestada sobre la vida y milagros de Jesucristo.'
                      : 'Série especial em áudio dramatizado com orquestração sobre os momentos mais marcantes da vida e milagres de Cristo.'}
                  </p>
                </div>
              </div>
            </div>

            {/* Lightbox Modal for Full View */}
            <AnimatePresence>
              {isCoverModalOpen && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setIsCoverModalOpen(false)}
                  className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex flex-col items-center justify-center p-4"
                >
                  <div
                    className="relative max-w-lg w-full flex flex-col items-center"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      type="button"
                      onClick={() => setIsCoverModalOpen(false)}
                      className="absolute -top-12 right-0 w-9 h-9 rounded-full bg-white/15 hover:bg-white/25 text-white flex items-center justify-center transition"
                      aria-label="Close"
                    >
                      <X className="w-5 h-5" />
                    </button>
                    <img
                      src={jesusCoverImg}
                      alt="As Mais Belas Passagens de Jesus"
                      className="w-full max-h-[75vh] object-contain rounded-2xl shadow-2xl border border-white/10"
                    />
                    <p className="mt-3 text-center text-xs text-slate-300 font-sans">
                      As Mais Belas Passagens de Jesus
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* TAB CONTENTS: SÉRIE ESPECIAL PASSAGENS - 100% Width & Rounded-none */}
            <div className="space-y-4">
              <div className="bg-[#fcfbf7] border-y border-[#e2dec9] rounded-none p-4 sm:p-6 text-slate-900 shadow-md relative overflow-hidden flex flex-col">
                {/* Decorative top dark green ribbon */}
                <div className="absolute top-0 inset-x-0 h-1.5 bg-[#0e5c3e]" />
                
                {/* Slogan and details */}
                <div className="space-y-2 text-left pt-1">
                  <p className="font-serif italic font-bold text-slate-800 text-xs sm:text-sm tracking-wide border-b border-[#e2dec9]/40 pb-2">
                    {t('louvores_motto', selectedLanguage)}
                  </p>
                  <p className="text-[11px] text-[#3a4f43] leading-relaxed font-sans font-medium text-justify">
                    {t('louvores_main_desc', selectedLanguage)}
                  </p>
                </div>

                {/* 1. MENU COM 4 VOLUMES (CARDS 100% WIDTH, ROUNDED-NONE) */}
                {selectedVolumeId === null ? (
                  <div className="mt-4 pt-4 border-t border-[#e2dec9]/60 space-y-3">
                    {/* Header */}
                    <div className="flex items-center justify-between text-left">
                      <div>
                        <h2 className="font-serif font-black text-slate-900 text-sm sm:text-base tracking-wide flex items-center gap-1.5">
                          <BookOpen className="w-4 h-4 text-[#0e5c3e]" />
                          {t('louvores_collection_volumes', selectedLanguage)}
                        </h2>
                        <p className="text-[10.5px] text-[#3a4f43] font-sans">
                          {t('louvores_collection_desc', selectedLanguage)}
                        </p>
                      </div>
                      <span className="text-[9.5px] font-mono font-bold px-2 py-0.5 rounded-none bg-[#e8e4da]/80 text-slate-700">
                        4 {t('louvores_vol_label', selectedLanguage)}s
                      </span>
                    </div>

                    {/* CARDS HORIZONTAIS - ROUNDED NONE */}
                    <div className="space-y-3 pt-1">
                      {bibleVolumes.map(vol => {
                        const volImage = VOLUME_IMAGES[vol.id];
                        return (
                          <button
                            key={vol.id}
                            type="button"
                            onClick={() => {
                              setSelectedVolumeId(vol.id);
                              window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}
                            className="group w-full text-left rounded-none border border-[#e2dec9] hover:border-[#0e5c3e] bg-white overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 flex flex-row items-stretch relative focus:outline-none min-h-[105px] sm:min-h-[115px]"
                          >
                            {/* Left: Uniform size for all volumes */}
                            <div className="relative w-32 sm:w-36 shrink-0 self-stretch overflow-hidden bg-slate-900 rounded-none">
                              <img
                                src={volImage}
                                alt={getVolumeSub(vol.id)}
                                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                referrerPolicy="no-referrer"
                              />
                              <div className="absolute bottom-2 right-2 w-7 h-7 rounded-none bg-[#012513]/90 text-amber-400 border border-amber-400/30 flex items-center justify-center shadow-md group-hover:scale-110 group-hover:bg-amber-400 group-hover:text-slate-950 transition-all">
                                <Play className="w-3.5 h-3.5 fill-current translate-x-px" />
                              </div>
                            </div>

                            {/* Right: Info */}
                            <div className="p-3 sm:p-4 flex-1 min-w-0 flex flex-col justify-between space-y-2 text-left">
                              <div>
                                <span className="text-[11px] font-mono font-bold text-slate-700 block mb-0.5">
                                  {t('louvores_vol_label', selectedLanguage)} {vol.id}:
                                </span>
                                <h3 className="font-serif font-black text-slate-900 text-xs sm:text-sm group-hover:text-[#0e5c3e] transition leading-snug line-clamp-2">
                                  {getVolumeSub(vol.id)}
                                </h3>
                              </div>
                              <div className="pt-2 border-t border-[#f4efe4] flex items-center justify-between text-[10px] text-slate-500 font-medium">
                                <span>{t('louvores_tap_to_view', selectedLanguage)}</span>
                                <span className="text-[#0e5c3e] font-bold flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform">
                                  {t('louvores_open', selectedLanguage)} <ChevronRight className="w-[18px] h-[18px]" />
                                </span>
                              </div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  /* 2. SELECTED VOLUME DETAIL VIEW */
                  <div className="mt-4 pt-1 space-y-4">
                    {/* Top Navigation Bar */}
                    <div className="flex items-center justify-between gap-2 border-b border-[#e2dec9]/60 pb-3">
                      <button
                        type="button"
                        onClick={() => setSelectedVolumeId(null)}
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-none bg-[#012513] text-amber-400 hover:bg-[#0e5c3e] text-xs font-bold transition shadow-sm active:scale-95"
                      >
                        <ChevronLeft className="w-[18px] h-[18px]" />
                        {t('louvores_back_volumes', selectedLanguage)}
                      </button>

                      {(() => {
                        const curVol = bibleVolumes.find(v => v.id === selectedVolumeId);
                        return curVol ? (
                          <span className="text-[11px] font-mono font-bold text-slate-700">
                            {t('louvores_vol_label', selectedLanguage)} {curVol.id}:
                          </span>
                        ) : null;
                      })()}
                    </div>

                    {/* Active Volume Presentation Card */}
                    {(() => {
                      const activeVol = bibleVolumes.find(v => v.id === selectedVolumeId) || bibleVolumes[0];
                      const volImage = VOLUME_IMAGES[activeVol.id];
                      const visibleTracks = activeVol.tracks;

                      return (
                        <div className="bg-[#fcfbf9] rounded-none border border-[#e8e4da] overflow-hidden shadow-sm space-y-3">
                          {/* Cover Banner */}
                          <div className="relative h-44 sm:h-52 w-full overflow-hidden bg-slate-900 rounded-none">
                            <img
                              src={volImage}
                              alt={getVolumeSub(activeVol.id)}
                              className="w-full h-full object-cover"
                              referrerPolicy="no-referrer"
                            />
                          </div>

                          {/* Volume Info Header below image */}
                          <div className="p-4 space-y-3.5 text-left">
                            <div className="flex items-center justify-between border-b border-[#e8e4da] pb-2.5">
                              <div>
                                <span className="text-[11px] font-mono font-bold text-slate-700 block mb-0.5">
                                  {t('louvores_vol_label', selectedLanguage)} {activeVol.id}:
                                </span>
                                <h2 className="font-serif font-black text-slate-900 text-base sm:text-lg leading-tight">
                                  {getVolumeSub(activeVol.id)}
                                </h2>
                              </div>
                            </div>

                            {/* Volume Introduction Quote */}
                            <div className="bg-[#f4efe4]/80 p-3 rounded-none border border-[#e2dec9]/80 text-[11.5px] font-serif italic text-slate-700 leading-relaxed">
                              &ldquo;{getVolumeIntro(activeVol.id)}&rdquo;
                            </div>

                            {/* Tracks Header & Counter */}
                            <div className="flex items-center justify-between border-b border-[#e8e4da] pb-2">
                              <span className="font-serif font-bold text-xs text-slate-800 uppercase tracking-wide">
                                {t('louvores_audio_tracks', selectedLanguage)}
                              </span>
                              <span className="text-[10px] font-mono text-slate-500 font-bold">
                                {visibleTracks.length} {t('louvores_tracks_of', selectedLanguage)} {activeVol.tracks.length} {t('louvores_tracks', selectedLanguage)}
                              </span>
                            </div>

                            {/* Tracks List */}
                            <div className="space-y-1.5 pt-1">
                              {visibleTracks.map(track => {
                                const trackNumStr = track.trackNumber < 10 ? `0${track.trackNumber}` : `${track.trackNumber}`;
                                return (
                                  <button
                                    key={track.id}
                                    onClick={() => handlePlayTrack(track)}
                                    className="w-full p-2.5 rounded-none border border-[#e8e4da] hover:border-[#0e5c3e] bg-white hover:bg-[#f4efe4]/50 transition flex items-center justify-between group text-left shadow-2xs"
                                  >
                                    <div className="flex items-center gap-2.5 min-w-0 pr-2">
                                      <div className="w-7 h-7 rounded-none bg-[#012513] text-amber-400 flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition">
                                        <Play className="w-3.5 h-3.5 fill-amber-400 translate-x-px" />
                                      </div>
                                      <div className="min-w-0">
                                        <h4 className="text-[11px] font-bold text-slate-900 group-hover:text-[#0e5c3e] leading-snug truncate">
                                          Track {trackNumStr} — {track.title}
                                        </h4>
                                        <p className="text-[9.5px] font-mono text-[#0e5c3e] font-semibold">
                                          {track.reference}
                                        </p>
                                      </div>
                                    </div>

                                    <span className="text-[10px] font-mono text-slate-400 shrink-0">
                                      {track.duration}
                                    </span>
                                  </button>
                                );
                              })}
                            </div>

                            {/* Bottom Navigation Button */}
                            <div className="pt-3 flex justify-center border-t border-[#e8e4da]">
                              <button
                                type="button"
                                onClick={() => setSelectedVolumeId(null)}
                                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-none bg-[#e8e4da]/70 hover:bg-[#e8e4da] text-slate-700 text-xs font-bold transition active:scale-95"
                              >
                                <ChevronLeft className="w-[18px] h-[18px]" />
                                {t('louvores_back_volumes', selectedLanguage)}
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                )}

                {/* Booklet Footer */}
                <div className="mt-8 pt-6 border-t border-[#e2dec9]/60 text-center flex flex-col items-center justify-center space-y-2.5">
                  {/* 1. COLEÇÃO COMPLETA DE ÁUDIOS — BÍBLIA SAGRADA */}
                  <span className="text-[10px] sm:text-[11px] font-mono tracking-widest text-slate-500 font-black uppercase block">
                    {t('louvores_complete_collection', selectedLanguage)}
                  </span>

                  {/* 2. LOGO (+30% maior) */}
                  <div className="py-1.5">
                    <img
                      src={logoImg}
                      alt="Missão Moçambique Logo"
                      className="w-[104px] h-[104px] sm:w-[125px] sm:h-[125px] object-contain drop-shadow-md transition-transform duration-300 hover:scale-105"
                    />
                  </div>

                  {/* 3. MISSÃO MOÇAMBIQUE */}
                  <span className="font-serif font-black text-slate-900 text-sm sm:text-base tracking-wider uppercase block">
                    MISSÃO MOÇAMBIQUE
                  </span>

                  {/* 4. CONECTANDO VIDAS, COMPARTILHANDO ESPERANÇA */}
                  <p className="text-[9.5px] sm:text-[10.5px] font-sans font-black tracking-widest text-slate-500 uppercase block">
                    {t('louvores_slogan', selectedLanguage)}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* 2. FULL-SCREEN IMMERSIVE PLAYER VIEW (Option 1 MP3 controls) */}
        {subView === 'player' && (
          <motion.div
            key="louvores-player"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0 }}
            className="space-y-4"
          >
            {/* Player Header */}
            <div className="flex items-center gap-3 border-b border-slate-900 pb-2 px-4">
              <button
                onClick={() => setSubView('lobby')}
                className="p-1 rounded-none hover:bg-slate-900 text-slate-400 hover:text-white transition"
              >
                <ChevronLeft className="w-[23px] h-[23px]" />
              </button>
              <div className="flex items-center gap-2.5 flex-1 min-w-0">
                <JesusPassagesIcon className="w-5 h-5 text-[#f1a30a] shrink-0" />
                <div className="min-w-0 flex-1">
                  <span className="text-[8px] font-mono text-emerald-400 font-bold uppercase tracking-widest block">{t('louvores_playing', selectedLanguage)}</span>
                  <h3 className="text-xs font-extrabold text-white truncate">{currentPassage.title}</h3>
                </div>
              </div>
            </div>

            {/* Big Artwork Card - 100% Width */}
            <div className="relative rounded-none overflow-hidden h-40 border-y border-slate-800 shadow-lg flex items-end p-4">
              <img
                src={currentPassage.image}
                alt={currentPassage.title}
                className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-50"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
              
              <div className="relative z-10 w-full space-y-1">
                <span className="text-[8.5px] font-mono tracking-widest text-amber-400 font-bold uppercase bg-slate-950/70 border border-amber-500/20 px-2 py-0.5 rounded-none w-fit block backdrop-blur-sm">
                  {t('louvores_audio_offline', selectedLanguage)}
                </span>
                <h3 className="text-sm font-serif font-bold text-white leading-tight">
                  {currentPassage.title}
                </h3>
              </div>
            </div>

            {/* Interactive Player Deck - 100% Width */}
            <div className="bg-slate-900 border-y border-slate-800 rounded-none p-4.5 space-y-4 shadow-xl">
              <div>
                <h4 className="text-xs font-extrabold text-white line-clamp-1">{currentPassage.title}</h4>
                <p className="text-[10px] text-slate-400 mt-0.5">{t('louvores_ministry_subtitle', selectedLanguage)}</p>
              </div>

              {/* Progress Slider */}
              <div className="space-y-1.5">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={audioProgress}
                  onChange={(e) => onSeekAudio(parseFloat(e.target.value))}
                  className="w-full h-1 bg-slate-850 rounded-none appearance-none cursor-pointer accent-amber-500"
                />
                <div className="flex justify-between text-[10px] font-mono text-slate-500">
                  <span>{formatTime(currentAudioTime)}</span>
                  <span>{currentPassage.duration}</span>
                </div>
              </div>

              {/* Central Control Panel */}
              <div className="flex items-center justify-between px-2 sm:px-4">
                {/* Playback speed toggle */}
                <button
                  type="button"
                  onClick={() => {
                    const speeds = [0.75, 1, 1.25, 1.5, 2];
                    const idx = (speeds.indexOf(playbackSpeed) + 1) % speeds.length;
                    setPlaybackSpeed(speeds[idx]);
                    onShowToast(`${t('louvores_speed', selectedLanguage)}: ${speeds[idx]}x`);
                  }}
                  className="px-2 py-1 rounded-none text-[10px] font-mono font-bold bg-slate-950 border border-slate-800 text-amber-400 hover:border-amber-400/50 transition"
                  title="Velocidade"
                >
                  {playbackSpeed}x
                </button>

                {/* Voltar Faixa */}
                {onPreviousTrack && (
                  <button
                    type="button"
                    onClick={onPreviousTrack}
                    className="p-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-none transition active:scale-95"
                    title="Faixa anterior"
                  >
                    <SkipBack className="w-5 h-5 fill-current" />
                  </button>
                )}

                {/* Voltar 10s */}
                {onSkipBackward && (
                  <button
                    type="button"
                    onClick={onSkipBackward}
                    className="p-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-none transition active:scale-95 relative flex items-center justify-center"
                    title="Voltar 10 segundos"
                  >
                    <RotateCcw className="w-5 h-5" />
                    <span className="absolute text-[8px] font-black -bottom-0.5 text-amber-400">10</span>
                  </button>
                )}

                {/* Central play button */}
                <button
                  type="button"
                  onClick={onTogglePlay}
                  className="w-13 h-13 rounded-none bg-amber-500 hover:bg-amber-400 text-slate-950 flex items-center justify-center hover:scale-105 active:scale-95 shadow-lg shadow-amber-500/25 transition"
                  title={isPlaying ? "Pausar" : "Tocar"}
                >
                  {isPlaying ? <Pause className="w-6 h-6 fill-slate-950" /> : <Play className="w-6 h-6 fill-slate-950 translate-x-px" />}
                </button>

                {/* Avançar 10s */}
                {onSkipForward && (
                  <button
                    type="button"
                    onClick={onSkipForward}
                    className="p-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-none transition active:scale-95 relative flex items-center justify-center"
                    title="Avançar 10 segundos"
                  >
                    <RotateCw className="w-5 h-5" />
                    <span className="absolute text-[8px] font-black -bottom-0.5 text-amber-400">10</span>
                  </button>
                )}

                {/* Avançar Faixa */}
                {onNextTrack && (
                  <button
                    type="button"
                    onClick={onNextTrack}
                    className="p-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-none transition active:scale-95"
                    title="Próxima faixa"
                  >
                    <SkipForward className="w-5 h-5 fill-current" />
                  </button>
                )}

                {/* Mute toggle button */}
                <button
                  type="button"
                  onClick={() => setIsMuted(!isMuted)}
                  className="p-2 rounded-none bg-slate-950 border border-slate-800 text-slate-400 hover:text-white transition"
                  title={isMuted ? "Ativar som" : "Silenciar"}
                >
                  {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
                </button>
              </div>

              {/* Actions row */}
              <div className="grid grid-cols-2 gap-2.5 pt-1 px-4">
                <button
                  onClick={() => onShowToast(selectedLanguage === 'en' ? 'Audio download: Coming soon' : selectedLanguage === 'es' ? 'Descarga de audio: Próximamente' : 'Download de áudio: Em breve')}
                  className="bg-slate-950 hover:bg-slate-850 border border-slate-800 py-2 rounded-none text-[10px] font-bold text-slate-200 flex items-center justify-center gap-1 transition uppercase"
                >
                  <Download className="w-3.5 h-3.5 text-amber-500" />
                  <span>{t('louvores_download', selectedLanguage)}</span>
                </button>

                <button
                  onClick={() => onShowToast(selectedLanguage === 'en' ? 'Link copied!' : selectedLanguage === 'es' ? '¡Enlace copiado!' : 'Link copiado!')}
                  className="bg-slate-950 hover:bg-slate-850 border border-slate-800 py-2 rounded-none text-[10px] font-bold text-slate-200 flex items-center justify-center gap-1 transition uppercase"
                >
                  <Share2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{t('louvores_share', selectedLanguage)}</span>
                </button>
              </div>
            </div>

            {/* Scriptural Text sync box */}
            {currentPassage.bibleText && (
              <div className="space-y-2 text-left px-4">
                <span className="text-[9px] font-mono text-slate-500 uppercase">{t('louvores_scripture', selectedLanguage)}</span>
                <div className="bg-slate-900/50 rounded-none p-4 border border-slate-850 text-xs italic font-serif leading-relaxed text-slate-300 text-justify">
                  &ldquo;{currentPassage.bibleText}&rdquo;
                </div>
              </div>
            )}
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}
