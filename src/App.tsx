import { useState, useEffect, useRef, useMemo, ChangeEvent, FormEvent } from 'react';
import {
  Home,
  BookOpen,
  Users,
  HeartHandshake,
  Languages,
  RotateCcw,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Sparkles,
  ChevronRight,
  ExternalLink,
  Download,
  Share2,
  Globe,
  Menu,
  ChevronDown,
  Check
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

import {
  JesusPassage,
  PrayerRequest,
  TabType,
  LanguageType
} from './types';

import {
  JESUS_PASSAGES,
  getLocalizedJesusPassages,
  BIBLE_BOOKS,
  NEWS_ITEMS,
  MISSION_PROJECTS,
  DEFAULT_PRAYER_REQUESTS,
  DAILY_VERSES,
  getLocalizedDailyVerse
} from './data/mockData';
import { ALL_BIBLE_BOOKS, BookMeta } from './data/bibleBooksMeta';

import HomeTab from './components/HomeTab';
import BibleTab from './components/BibleTab';
import MissionTab from './components/MissionTab';
import LouvoresTab from './components/LouvoresTab';
import JesusPassagesIcon from './components/JesusPassagesIcon';
import AudioTrackPopup from './components/AudioTrackPopup';
import LanguageSelector from './components/LanguageSelector';
import { useRegisterSW } from 'virtual:pwa-register/react';
import { usePWAInstall } from './usePWAInstall';

import { getLocalizedBibleVolumes, BibleTrack } from './data/bibleVolumesData';
import volume1Img from './assets/images/Captura de tela 2026-09-08 132845.png';
import volume2Img from './assets/images/episode_2_miracles_1784565581240.jpg';
import volume3Img from './assets/images/episode_3_parables_1784565596220.jpg';
import volume4Img from './assets/images/episode_4_crucifixion_1784565610276.jpg';
import {
  HomeNavIcon,
  BibleNavIcon,
  MissionNavIcon,
  JesusPassagesNavIcon,
  MoreNavIcon
} from './components/NavIcons';
import { t } from './data/translations';

const VOLUME_IMAGES: Record<number, string> = {
  1: volume1Img,
  2: volume2Img,
  3: volume3Img,
  4: volume4Img,
};

export default function App() {
  const installation = usePWAInstall();
  // Device mode & Simulator defaults
  const [activeTab, setActiveTab] = useState<TabType>('inicio');
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageType>(() => {
    const saved = localStorage.getItem('fb_selected_language');
    if (!saved || saved === 'pt_PT') {
      localStorage.setItem('fb_selected_language', 'pt');
      return 'pt';
    }
    return saved as LanguageType;
  });


  
  // Real Audio State for Louvores / Episode playback
  const localizedPassages = useMemo(() => getLocalizedJesusPassages(selectedLanguage), [selectedLanguage]);
  const [currentPassage, setCurrentPassage] = useState<JesusPassage>(localizedPassages[0]);
  
  useEffect(() => {
    setCurrentPassage(prev => {
      const updated = localizedPassages.find(p => p.id === prev.id);
      return updated || prev;
    });
  }, [selectedLanguage, localizedPassages]);

  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [audioDuration, setAudioDuration] = useState<number>(0);
  const [audioProgress, setAudioProgress] = useState<number>(0);
  const [currentAudioTime, setCurrentAudioTime] = useState<number>(0);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [hasStartedAudio, setHasStartedAudio] = useState<boolean>(false);
  const [isPopupDismissed, setIsPopupDismissed] = useState<boolean>(false);
  
  // HTML5 Audio Reference
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Bible Audio Player States
  const [bibleAudioBaseUrl, setBibleAudioBaseUrl] = useState(() => {
    return localStorage.getItem('fb_bible_audio_base_url') || 'https://bible-audio-missao.b-cdn.net/';
  });
  const [selectedAudioBook, setSelectedAudioBook] = useState<BookMeta>(ALL_BIBLE_BOOKS[39]); // Default to Mateus (Matthew)
  const [selectedAudioChapter, setSelectedAudioChapter] = useState<number>(1);
  const [audioLanguage, setAudioLanguage] = useState<'pt' | 'en'>('pt');
  
  const [isBibleAudioPlaying, setIsBibleAudioPlaying] = useState<boolean>(false);
  const [bibleAudioDuration, setBibleAudioDuration] = useState<number>(0);
  const [bibleAudioProgress, setBibleAudioProgress] = useState<number>(0);
  const [bibleCurrentAudioTime, setBibleCurrentAudioTime] = useState<number>(0);

  // Flexible Bible Audio Settings (persisted)
  const [useDemoAudio, setUseDemoAudio] = useState(() => {
    const saved = localStorage.getItem('fb_bible_use_demo_audio');
    return saved === null ? true : saved === 'true'; // Enabled by default so we play working test files!
  });
  const [ntBookPrefixStyle, setNtBookPrefixStyle] = useState<'B40_B66' | 'B01_B27'>(() => {
    return (localStorage.getItem('fb_bible_nt_book_prefix_style') as 'B40_B66' | 'B01_B27') || 'B40_B66';
  });
  const [ptOtVersionCode, setPtOtVersionCode] = useState(() => localStorage.getItem('fb_bible_pt_ot_code') || 'PORBBSO1DA');
  const [ptNtVersionCode, setPtNtVersionCode] = useState(() => localStorage.getItem('fb_bible_pt_nt_code') || 'PORBBSN1DA');
  const [enOtVersionCode, setEnOtVersionCode] = useState(() => localStorage.getItem('fb_bible_en_ot_code') || 'ENGBERO1DA');
  const [enNtVersionCode, setEnNtVersionCode] = useState(() => localStorage.getItem('fb_bible_en_nt_code') || 'ENGBERN1DA');
  const [includeVersionInPath, setIncludeVersionInPath] = useState(() => {
    const saved = localStorage.getItem('fb_bible_include_version_in_path');
    return saved === null ? true : saved === 'true';
  });
  const [filenamePattern, setFilenamePattern] = useState<'fcbh_full' | 'fcbh_short' | 'fcbh_pt_full' | 'fcbh_pt_short' | 'numeric' | 'fcbh_custom_3_letter'>(() => {
    return (localStorage.getItem('fb_bible_filename_pattern') as 'fcbh_full' | 'fcbh_short' | 'fcbh_pt_full' | 'fcbh_pt_short' | 'numeric' | 'fcbh_custom_3_letter') || 'fcbh_full';
  });
  
  const bibleAudioRef = useRef<HTMLAudioElement | null>(null);

  // Prayer list state (synced with localStorage)
  const [prayerRequests, setPrayerRequests] = useState<PrayerRequest[]>(() => {
    const saved = localStorage.getItem('fb_prayer_requests');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return DEFAULT_PRAYER_REQUESTS;
      }
    }
    return DEFAULT_PRAYER_REQUESTS;
  });

  // Bible search and reading state
  const [selectedBook, setSelectedBook] = useState(BIBLE_BOOKS[0]);
  const [selectedChapter, setSelectedChapter] = useState(BIBLE_BOOKS[0].chapters[0]);
  const [bibleSearchQuery, setBibleSearchQuery] = useState('');
  const [copiedVerseIndex, setCopiedVerseIndex] = useState<string | null>(null);
  
  // Dynamic collections for Admin edits
  const [dailyVersesList, setDailyVersesList] = useState(DAILY_VERSES);
  const [newsItemsList, setNewsItemsList] = useState(NEWS_ITEMS);
  
  // Prayer modal state
  const [showPrayerModal, setShowPrayerModal] = useState<boolean>(false);

  // Daily Verse Index (automatic date-based selection)
  const [verseIndex, setVerseIndex] = useState(() => {
    const day = new Date().getDate(); // 1 to 31
    return day % DAILY_VERSES.length;
  });

  // Devotional diary text area (synced with localStorage - preserved and recovered)
  const [devotionalText, setDevotionalText] = useState(() => {
    try {
      const saved = localStorage.getItem('fb_devotional_note');
      return saved !== null ? saved : '';
    } catch (e) {
      return '';
    }
  });

  // Online Status Hook & Offline Banner
  const [isOnline, setIsOnline] = useState(() => (typeof navigator !== 'undefined' ? navigator.onLine : true));
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const getOfflineBannerText = (lang: LanguageType) => {
    if (lang === 'en') {
      return "You are offline. Some content may be unavailable.";
    }
    if (lang === 'es') {
      return "Estás sin conexión. Algunos contenidos pueden no estar disponibles.";
    }
    return "Você está sem conexão. Alguns conteúdos podem estar indisponíveis.";
  };

  // Notification Banner State
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Save changes helper
  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Sync prayer requests to local storage
  useEffect(() => {
    localStorage.setItem('fb_prayer_requests', JSON.stringify(prayerRequests));
  }, [prayerRequests]);

  // Sync devotional diary to local storage
  useEffect(() => {
    localStorage.setItem('fb_devotional_note', devotionalText);
  }, [devotionalText]);

  // Sync selected language to local storage
  useEffect(() => {
    localStorage.setItem('fb_selected_language', selectedLanguage);
  }, [selectedLanguage]);

  // Daily Verse rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setVerseIndex((prev) => (prev + 1) % dailyVersesList.length);
    }, 120000); // changes every 2 mins or manual click
    return () => clearInterval(interval);
  }, [dailyVersesList]);

  // Update audio source when selected audio URL or passage changes
  useEffect(() => {
    if (audioRef.current) {
      const src = currentPassage.audioUrls[selectedLanguage] || currentPassage.audioUrls.pt_PT || currentPassage.audioUrls.pt || currentPassage.audioUrls.en;
      if (src) {
        audioRef.current.src = src;
        audioRef.current.load();
        if (isPlaying) {
          audioRef.current.play().catch(() => setIsPlaying(false));
        }
      }
    }
  }, [currentPassage, selectedLanguage]);

  // Sync speed & volume changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.playbackRate = playbackSpeed;
    }
  }, [playbackSpeed]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = isMuted;
    }
  }, [isMuted]);

  // Initialize HTML5 audio event listeners
  const handleAudioTimeUpdate = () => {
    if (audioRef.current) {
      const current = audioRef.current.currentTime;
      const duration = audioRef.current.duration || 1;
      setCurrentAudioTime(current);
      setAudioProgress((current / duration) * 100);
    }
  };

  const handleAudioLoadedMetadata = () => {
    if (audioRef.current) {
      setAudioDuration(audioRef.current.duration || 0);
    }
  };

  // All tracks across all 4 Bible volumes
  const allBibleTracks = useMemo(() => {
    const volumes = getLocalizedBibleVolumes(selectedLanguage);
    return volumes.flatMap(v => v.tracks);
  }, [selectedLanguage]);

  // Index of currently playing track
  const currentTrackIndex = useMemo(() => {
    return allBibleTracks.findIndex(t =>
      t.id === currentPassage.id ||
      currentPassage.title.toLowerCase().includes(t.title.toLowerCase())
    );
  }, [allBibleTracks, currentPassage]);

  // Helper trigger to start listening to any passage from lists
  const handleSelectPassage = (passage: JesusPassage) => {
    setCurrentPassage(passage);
    setHasStartedAudio(true);
    setIsPopupDismissed(false);
    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch(err => {
          console.warn(err);
          setIsPlaying(true);
        });
      }
    }, 150);
    showToast(`Carregando: ${passage.title}`);
  };

  // Play a specific BibleTrack object
  const playTrackByObject = (track: BibleTrack) => {
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
    handleSelectPassage(passage);
  };

  // Next Track (Avançar Faixa)
  const handleNextTrack = () => {
    if (allBibleTracks.length === 0) return;
    const nextIdx = currentTrackIndex >= 0 ? (currentTrackIndex + 1) % allBibleTracks.length : 0;
    playTrackByObject(allBibleTracks[nextIdx]);
  };

  // Previous Track (Voltar Faixa)
  const handlePreviousTrack = () => {
    if (allBibleTracks.length === 0) return;
    const prevIdx = currentTrackIndex > 0 ? currentTrackIndex - 1 : allBibleTracks.length - 1;
    playTrackByObject(allBibleTracks[prevIdx]);
  };

  const handleAudioEnded = () => {
    setIsPlaying(false);
    setAudioProgress(0);
    setCurrentAudioTime(0);
    // Auto-advance to next track
    if (allBibleTracks.length > 0 && currentTrackIndex >= 0) {
      handleNextTrack();
    }
  };

  const togglePlayPause = () => {
    if (!audioRef.current) return;
    setHasStartedAudio(true);
    setIsPopupDismissed(false);
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((err) => {
        console.warn("Audio play prevented:", err);
        showToast("Selecione um áudio disponível para iniciar.");
      });
    }
  };

  const skipForward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.min(audioRef.current.duration, audioRef.current.currentTime + 10);
    }
  };

  const skipBackward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.max(0, audioRef.current.currentTime - 10);
    }
  };

  const handleProgressChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current && audioRef.current.duration) {
      const newPct = parseFloat(e.target.value);
      const newTime = (newPct / 100) * audioRef.current.duration;
      audioRef.current.currentTime = newTime;
      setAudioProgress(newPct);
      setCurrentAudioTime(newTime);
    }
  };

  const formatTime = (timeInSecs: number) => {
    if (isNaN(timeInSecs)) return "0:00";
    const mins = Math.floor(timeInSecs / 60);
    const secs = Math.floor(timeInSecs % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // Save base URL changes
  useEffect(() => {
    localStorage.setItem('fb_bible_audio_base_url', bibleAudioBaseUrl);
  }, [bibleAudioBaseUrl]);

  // Save flexible Bible Audio configurations
  useEffect(() => {
    localStorage.setItem('fb_bible_use_demo_audio', String(useDemoAudio));
  }, [useDemoAudio]);

  useEffect(() => {
    localStorage.setItem('fb_bible_nt_book_prefix_style', ntBookPrefixStyle);
  }, [ntBookPrefixStyle]);

  useEffect(() => {
    localStorage.setItem('fb_bible_pt_ot_code', ptOtVersionCode);
  }, [ptOtVersionCode]);

  useEffect(() => {
    localStorage.setItem('fb_bible_pt_nt_code', ptNtVersionCode);
  }, [ptNtVersionCode]);

  useEffect(() => {
    localStorage.setItem('fb_bible_en_ot_code', enOtVersionCode);
  }, [enOtVersionCode]);

  useEffect(() => {
    localStorage.setItem('fb_bible_en_nt_code', enNtVersionCode);
  }, [enNtVersionCode]);

  useEffect(() => {
    localStorage.setItem('fb_bible_include_version_in_path', String(includeVersionInPath));
  }, [includeVersionInPath]);

  useEffect(() => {
    localStorage.setItem('fb_bible_filename_pattern', filenamePattern);
  }, [filenamePattern]);

  // Compute file name and full path for bible audio streaming
  const computedBibleAudioUrl = useMemo(() => {
    if (useDemoAudio) {
      // Provide stable, fast-loading, beautiful royalty-free music/audio for testing
      if (audioLanguage === 'pt') {
        return "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3";
      } else {
        return "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3";
      }
    }

    const isNT = selectedAudioBook.testament === 'Novo';
    
    // Select version code based on language and testament
    let version = '';
    if (audioLanguage === 'pt') {
      version = isNT ? ptNtVersionCode : ptOtVersionCode;
    } else {
      version = isNT ? enNtVersionCode : enOtVersionCode;
    }
    
    let chapStr = selectedAudioChapter.toString();
    if (selectedAudioBook.fcbhId === 'B19') {
      chapStr = chapStr.padStart(3, '0');
    } else {
      chapStr = chapStr.padStart(2, '0');
    }
    
    // Determine the book's FCBH ID inside this testament group
    let bookPrefix = selectedAudioBook.fcbhId;
    if (isNT && ntBookPrefixStyle === 'B01_B27') {
      // Find the index of the book in the Novo Testamento list (1-based)
      const ntBooks = ALL_BIBLE_BOOKS.filter(b => b.testament === 'Novo');
      const ntIndex = ntBooks.findIndex(b => b.fcbhId === selectedAudioBook.fcbhId) + 1;
      bookPrefix = 'B' + ntIndex.toString().padStart(2, '0');
    }
    
    // Generate filename based on pattern
    const sanitizePTName = (name: string) => {
      let cleaned = name.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      cleaned = cleaned.replace(/\s+/g, '');
      return cleaned;
    };

    const bookNameEN = selectedAudioBook.nameEN.replace(/\s+/g, '');
    const bookNamePT = sanitizePTName(selectedAudioBook.namePT);

    let filename = '';
    if (filenamePattern === 'fcbh_full') {
      filename = `${bookPrefix}___${chapStr}_${bookNameEN}_____${version}.mp3`;
    } else if (filenamePattern === 'fcbh_short') {
      filename = `${bookPrefix}___${chapStr}_${bookNameEN}.mp3`;
    } else if (filenamePattern === 'fcbh_pt_full') {
      filename = `${bookPrefix}___${chapStr}_${bookNamePT}_____${version}.mp3`;
    } else if (filenamePattern === 'fcbh_pt_short') {
      filename = `${bookPrefix}___${chapStr}_${bookNamePT}.mp3`;
    } else if (filenamePattern === 'fcbh_custom_3_letter') {
      const FCBH_3_LETTER_MAP: Record<string, string> = {
        B01: 'GEN', B02: 'EXO', B03: 'LEV', B04: 'NUM', B05: 'DEU', B06: 'JOS', B07: 'JDG', B08: 'RUT',
        B09: '1SA', B10: '2SA', B11: '1KI', B12: '2KI', B13: '1CH', B14: '2CH', B15: 'EZR', B16: 'NEH',
        B17: 'EST', B18: 'JOB', B19: 'PSA', B20: 'PRO', B21: 'ECC', B22: 'SNG', B23: 'ISA', B24: 'JER',
        B25: 'LAM', B26: 'EZK', B27: 'DAN', B28: 'HOS', B29: 'JOL', B30: 'AMO', B31: 'OBD', B32: 'JON',
        B33: 'MIC', B34: 'NAM', B35: 'HAB', B36: 'ZEP', B37: 'HAG', B38: 'ZEC', B39: 'MAL',
        B40: 'MAT', B41: 'MRK', B42: 'LUK', B43: 'JHN', B44: 'ACT', B45: 'ROM', B46: '1CO', B47: '2CO',
        B48: 'GAL', B49: 'EPH', B50: 'PHP', B51: 'COL', B52: '1TH', B53: '2TH', B54: '1TI', B55: '2TI',
        B56: 'TIT', B57: 'PHM', B58: 'HEB', B59: 'JAS', B60: '1PE', B61: '2PE', B62: '1JN', B63: '2JN',
        B64: '3JN', B65: 'JUD', B66: 'REV'
      };
      const bookAbbr = FCBH_3_LETTER_MAP[selectedAudioBook.fcbhId] || 'MAT';
      const chap3Str = selectedAudioChapter.toString().padStart(3, '0');
      filename = `${version}_${bookPrefix}_${bookAbbr}_${chap3Str}.mp3`;
    } else {
      filename = `${bookPrefix}_${chapStr}.mp3`;
    }
    
    const base = bibleAudioBaseUrl.endsWith('/') ? bibleAudioBaseUrl : bibleAudioBaseUrl + '/';
    const pathPrefix = includeVersionInPath ? `${version}/` : '';
    
    return `${base}${pathPrefix}${filename}`;
  }, [
    useDemoAudio,
    bibleAudioBaseUrl, 
    selectedAudioBook, 
    selectedAudioChapter, 
    audioLanguage,
    ptOtVersionCode,
    ptNtVersionCode,
    enOtVersionCode,
    enNtVersionCode,
    includeVersionInPath,
    filenamePattern,
    ntBookPrefixStyle
  ]);

  // Sync bible source changes
  useEffect(() => {
    if (bibleAudioRef.current) {
      bibleAudioRef.current.src = computedBibleAudioUrl;
      bibleAudioRef.current.load();
      if (isBibleAudioPlaying) {
        bibleAudioRef.current.play().catch(() => setIsBibleAudioPlaying(false));
      }
    }
  }, [computedBibleAudioUrl]);

  const handleBibleAudioTimeUpdate = () => {
    if (bibleAudioRef.current) {
      const current = bibleAudioRef.current.currentTime;
      const duration = bibleAudioRef.current.duration || 1;
      setBibleCurrentAudioTime(current);
      setBibleAudioProgress((current / duration) * 100);
    }
  };

  const handleBibleAudioLoadedMetadata = () => {
    if (bibleAudioRef.current) {
      setBibleAudioDuration(bibleAudioRef.current.duration || 0);
    }
  };

  const handleBibleAudioEnded = () => {
    setIsBibleAudioPlaying(false);
    setBibleAudioProgress(0);
    setBibleCurrentAudioTime(0);
  };

  const toggleBiblePlayPause = () => {
    if (!bibleAudioRef.current) return;
    if (isBibleAudioPlaying) {
      bibleAudioRef.current.pause();
      setIsBibleAudioPlaying(false);
    } else {
      // Pause other audio player first to prevent dual playback
      if (audioRef.current && isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      }
      bibleAudioRef.current.play().then(() => {
        setIsBibleAudioPlaying(true);
      }).catch((err) => {
        console.warn("Bible play failed for URL:", computedBibleAudioUrl, err);
        setIsBibleAudioPlaying(false);
        if (useDemoAudio) {
          showToast("Áudio de demonstração indisponível.");
        } else {
          showToast("Erro ao carregar da Nuvem! Verifique o link e padrão de arquivo no Painel Admin.");
        }
      });
    }
  };

  const skipBibleForward = () => {
    if (bibleAudioRef.current) {
      bibleAudioRef.current.currentTime = Math.min(bibleAudioRef.current.duration, bibleAudioRef.current.currentTime + 10);
    }
  };

  const skipBibleBackward = () => {
    if (bibleAudioRef.current) {
      bibleAudioRef.current.currentTime = Math.max(0, bibleAudioRef.current.currentTime - 10);
    }
  };

  const handleBibleProgressChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (bibleAudioRef.current && bibleAudioRef.current.duration) {
      const newPct = parseFloat(e.target.value);
      const newTime = (newPct / 100) * bibleAudioRef.current.duration;
      bibleAudioRef.current.currentTime = newTime;
      setBibleAudioProgress(newPct);
      setBibleCurrentAudioTime(newTime);
    }
  };

  // Add Amen / Like to intercession requests
  const handleToggleAmen = (id: string) => {
    setPrayerRequests(prev =>
      prev.map(p => {
        if (p.id === id) {
          const liked = !p.likedByCurrentUser;
          return {
            ...p,
            likedByCurrentUser: liked,
            likes: liked ? p.likes + 1 : p.likes - 1
          };
        }
        return p;
      })
    );
    showToast("Amém integrado! Obrigado por interceder.");
  };

  // Change selected book update chapter automatic
  const handleBookSelect = (bookName: string) => {
    const book = BIBLE_BOOKS.find(b => b.name === bookName);
    if (book) {
      setSelectedBook(book);
      setSelectedChapter(book.chapters[0]);
    }
  };

  // Copy verse to clipboard
  const handleCopyVerse = (text: string, refText: string) => {
    const fullText = `${text} (${refText})`;
    navigator.clipboard.writeText(fullText);
    setCopiedVerseIndex(text);
    showToast("Versículo copiado com sucesso!");
    setTimeout(() => setCopiedVerseIndex(null), 2000);
  };

  // Filter verses or books
  const filteredBibleSearchResults = useMemo(() => {
    if (!bibleSearchQuery.trim()) return [];
    const results: { book: string; chapter: number; verse: string }[] = [];
    BIBLE_BOOKS.forEach(b => {
      b.chapters.forEach(c => {
        c.verses.forEach(v => {
          if (v.toLowerCase().includes(bibleSearchQuery.toLowerCase())) {
            results.push({ book: b.name, chapter: c.number, verse: v });
          }
        });
      });
    });
    return results;
  }, [bibleSearchQuery]);

  // PWA Register SW for controlled updates
  const {
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegistered(r) {
      if (r) {
        setInterval(() => {
          r.update();
        }, 60 * 60 * 1000);
      }
    },
  });

  const handleUpdateApp = () => {
    try {
      localStorage.setItem('fb_devotional_note', devotionalText);
    } catch (e) {
      showToast(
        selectedLanguage === 'en'
          ? "Failed to save note. Update cancelled."
          : selectedLanguage === 'es'
          ? "Error al guardar nota. Actualización cancelada."
          : "Falha ao salvar anotação. Atualização cancelada."
      );
      return;
    }

    if (isPlaying || isBibleAudioPlaying) {
      const confirmMsg =
        selectedLanguage === 'en'
          ? "Updating now will interrupt audio playback. Do you want to continue?"
          : selectedLanguage === 'es'
          ? "Actualizar ahora interrumpirá la reproducción de audio. ¿Deseas continuar?"
          : "Atualizar agora interromperá a reprodução de áudio em andamento. Deseja continuar?";
      if (!window.confirm(confirmMsg)) {
        return;
      }
    }

    updateServiceWorker(true);
  };

  // Simulated download (audio downloads pending real server implementation)
  const handleDownloadOfflineEmulation = (_filename: string) => {
    showToast(
      selectedLanguage === 'en'
        ? "Audio download: Coming soon"
        : selectedLanguage === 'es'
        ? "Descarga de audio: Próximamente"
        : "Download de áudio: Em breve"
    );
  };

  // Simulated sharing
  const handleShareAudioSimulation = (title: string) => {
    const dummyUrl = `https://missao-mocambique.org/passagens?title=${encodeURIComponent(title)}`;
    navigator.clipboard.writeText(dummyUrl);
    showToast("Link de partilha copiado para a área de transferência!");
  };

  const handleLanguageChange = (lang: LanguageType) => {
    setSelectedLanguage(lang);
    showToast(
      lang === 'en'
        ? 'Language changed to English'
        : lang === 'es'
        ? 'Idioma cambiado a Spain (Español)'
        : 'Idioma alterado para Português - PT'
    );
  };

  return (
    <div className="w-full min-h-[100dvh] bg-[#041d34] text-slate-100 font-sans flex flex-col relative overflow-x-hidden selection:bg-amber-500 selection:text-slate-950">
      
      {/* Grouped Language Selector in Top-Right Corner (Only on Home screen 'inicio') */}
      {activeTab === 'inicio' && (
        <LanguageSelector selectedLanguage={selectedLanguage} onSelectLanguage={handleLanguageChange} />
      )}

      {/* Hidden HTML5 Audio Element for playing real MP3 */}
        <audio
          ref={audioRef}
          onTimeUpdate={handleAudioTimeUpdate}
          onLoadedMetadata={handleAudioLoadedMetadata}
          onEnded={handleAudioEnded}
        />

        {/* Hidden HTML5 Audio Element for Bible Audio streaming */}
        <audio
          ref={bibleAudioRef}
          onTimeUpdate={handleBibleAudioTimeUpdate}
          onLoadedMetadata={handleBibleAudioLoadedMetadata}
          onEnded={handleBibleAudioEnded}
        />

        {/* Floating System-wide Toast Notification */}
        <AnimatePresence>
          {toastMessage && (
            <motion.div
              initial={{ opacity: 0, y: -50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              className="absolute top-4 left-1/2 -translate-x-1/2 z-50 bg-amber-500 text-slate-950 font-medium px-5 py-3 rounded-none shadow-2xl flex items-center gap-2 max-w-sm border border-amber-300"
            >
              <Sparkles className="w-4 h-4 shrink-0 animate-bounce" />
              <span className="text-sm cursor-default">{toastMessage}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* APP ACTIVE CONTENT PORTAL - Scrollable inside the device frame */}
        <div className="flex-1 overflow-y-auto custom-scrollbar bg-[#041d34] flex flex-col w-full p-0 pb-[7rem]">

            {/* SCREEN PORTALS */}
            {activeTab === 'inicio' && (
              <HomeTab
                dailyVerse={getLocalizedDailyVerse(verseIndex, selectedLanguage)}
                onRotateVerse={() => setVerseIndex(prev => (prev + 1) % dailyVersesList.length)}
                onNavigateToMission={() => setActiveTab('missao')}
                onNavigateToPassages={() => setActiveTab('louvores')}
                onShowToast={showToast}
                selectedLanguage={selectedLanguage}
                onSelectLanguage={handleLanguageChange}

              />
            )}

            {activeTab === 'biblia' && (
              <BibleTab
                selectedAudioBook={selectedAudioBook}
                setSelectedAudioBook={setSelectedAudioBook}
                selectedAudioChapter={selectedAudioChapter}
                setSelectedAudioChapter={setSelectedAudioChapter}
                audioLanguage={audioLanguage}
                setAudioLanguage={setAudioLanguage}
                isBibleAudioPlaying={isBibleAudioPlaying}
                bibleAudioDuration={bibleAudioDuration}
                bibleAudioProgress={bibleAudioProgress}
                bibleCurrentAudioTime={bibleCurrentAudioTime}
                onToggleBibleAudioPlay={toggleBiblePlayPause}
                onSeekBibleAudio={(pct) => {
                  if (bibleAudioRef.current && bibleAudioRef.current.duration) {
                     const newTime = (pct / 100) * bibleAudioRef.current.duration;
                     bibleAudioRef.current.currentTime = newTime;
                     setBibleAudioProgress(pct);
                     setBibleCurrentAudioTime(newTime);
                  }
                }}
                BIBLE_BOOKS={BIBLE_BOOKS}
                ALL_BIBLE_BOOKS={ALL_BIBLE_BOOKS}
                devotionalText={devotionalText}
                setDevotionalText={setDevotionalText}
                onShowToast={showToast}
                formatTime={formatTime}
                onNavigateToHome={() => setActiveTab('inicio')}
                selectedLanguage={selectedLanguage}
                onSelectLanguage={handleLanguageChange}
              />
            )}

            {(activeTab === 'missao' || activeTab === 'mais') && (
              <MissionTab
                installation={installation}
                MISSION_PROJECTS={MISSION_PROJECTS}
                newsItemsList={newsItemsList}
                onShowToast={showToast}
                onNavigateToHome={() => setActiveTab('inicio')}
                selectedLanguage={selectedLanguage}
                onSelectLanguage={handleLanguageChange}
                prayerRequests={prayerRequests}
                onToggleAmen={handleToggleAmen}
                onAddPrayerRequest={(author, text, cat) => {
                  const newRequest: PrayerRequest = {
                    id: "pr_user_" + Date.now(),
                    author,
                    requestText: text,
                    category: cat,
                    createdAt: new Date().toISOString(),
                    likes: 1,
                    likedByCurrentUser: true
                  };
                  setPrayerRequests(prev => [newRequest, ...prev]);
                }}
                showPrayerModal={showPrayerModal}
                setShowPrayerModal={setShowPrayerModal}
                initialSubView={activeTab === 'missao' ? 'nossa-missao' : 'menu'}
              />
            )}

            {activeTab === 'louvores' && (
              <LouvoresTab
                currentPassage={currentPassage}
                isPlaying={isPlaying}
                onSelectPassage={handleSelectPassage}
                onTogglePlay={togglePlayPause}
                audioProgress={audioProgress}
                onSeekAudio={handleProgressChange}
                currentAudioTime={currentAudioTime}
                formatTime={formatTime}
                playbackSpeed={playbackSpeed}
                setPlaybackSpeed={setPlaybackSpeed}
                isMuted={isMuted}
                setIsMuted={setIsMuted}
                onSkipForward={skipForward}
                onSkipBackward={skipBackward}
                onNextTrack={handleNextTrack}
                onPreviousTrack={handlePreviousTrack}
                JESUS_PASSAGES={localizedPassages}
                selectedLanguage={selectedLanguage}
                setSelectedLanguage={handleLanguageChange}
                onShowToast={showToast}
                onNavigateToHome={() => setActiveTab('inicio')}
              />
            )}

          </div>

          {/* POP-UP FLUTUANTE DE ÁUDIO (Permite pausar, avançar/voltar áudio e avançar/voltar faixa) */}
          <AnimatePresence>
            {hasStartedAudio && !isPopupDismissed && (
              <AudioTrackPopup
                currentPassage={currentPassage}
                isPlaying={isPlaying}
                onTogglePlay={togglePlayPause}
                onSkipForward={skipForward}
                onSkipBackward={skipBackward}
                onNextTrack={handleNextTrack}
                onPreviousTrack={handlePreviousTrack}
                audioProgress={audioProgress}
                onSeekAudio={handleProgressChange}
                currentAudioTime={currentAudioTime}
                audioDuration={audioDuration}
                formatTime={formatTime}
                onClose={() => {
                  setIsPopupDismissed(true);
                  if (audioRef.current) {
                    audioRef.current.pause();
                  }
                  setIsPlaying(false);
                }}
                onOpenFullPlayer={() => setActiveTab('louvores')}
                selectedLanguage={selectedLanguage}
              />
            )}
          </AnimatePresence>

          {/* PHONE NAVIGATION BAR (5 items: Inicio, Passagens de Jesus, Missao, Biblia, Mais) - Scaled +10% */}
          <nav className="fixed bottom-0 left-0 right-0 w-full min-h-[6.1rem] bg-[#010c18]/95 backdrop-blur-lg border-t border-[#0b2d4f]/60 shadow-[0_-6px_28px_rgba(0,0,0,0.65)] flex justify-around items-center px-1 z-40 pt-2 pb-[max(0.7rem,env(safe-area-inset-bottom,0px))]">
            
            {/* 1. Início */}
            <button
              id="nav-tab-inicio"
              onClick={() => setActiveTab('inicio')}
              className={`flex flex-col items-center justify-center flex-1 py-1.5 transition ${
                activeTab === 'inicio' ? 'text-[#f1a30a]' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <div className={`p-1.5 rounded-xl transition ${activeTab === 'inicio' ? 'bg-[#f1a30a]/15 text-[#f1a30a]' : ''}`}>
                <HomeNavIcon className="w-[33px] h-[33px]" isActive={activeTab === 'inicio'} />
              </div>
              <span className={`text-[13px] sm:text-[14px] mt-1 tracking-tight ${activeTab === 'inicio' ? 'font-bold text-[#f1a30a]' : 'font-medium text-slate-400'}`}>
                {t('tab_inicio', selectedLanguage)}
              </span>
            </button>

            {/* 2. Passagens de Jesus (Ícone Oficial Ultra-Legível) */}
            <button
              id="nav-tab-louvores"
              onClick={() => setActiveTab('louvores')}
              className={`flex flex-col items-center justify-center flex-1 py-1.5 transition ${
                activeTab === 'louvores' ? 'text-[#f1a30a]' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <div className={`p-0.5 rounded-xl transition ${activeTab === 'louvores' ? 'ring-2 ring-[#f1a30a] shadow-[0_0_12px_rgba(241,163,10,0.6)]' : ''}`}>
                <JesusPassagesNavIcon className="w-[39px] h-[39px]" isActive={activeTab === 'louvores'} />
              </div>
              <span className={`text-[11.5px] sm:text-[12.5px] mt-1 text-center leading-tight max-w-[94px] tracking-tight ${activeTab === 'louvores' ? 'font-bold text-[#f1a30a]' : 'font-medium text-slate-400'}`}>
                {t('tab_louvores', selectedLanguage)}
              </span>
            </button>

            {/* 3. Missão */}
            <button
              id="nav-tab-missao"
              onClick={() => setActiveTab('missao')}
              className={`flex flex-col items-center justify-center flex-1 py-1.5 transition ${
                activeTab === 'missao' ? 'text-[#f1a30a]' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <div className={`p-1.5 rounded-xl transition ${activeTab === 'missao' ? 'bg-[#f1a30a]/15 text-[#f1a30a]' : ''}`}>
                <MissionNavIcon className="w-[33px] h-[33px]" isActive={activeTab === 'missao'} />
              </div>
              <span className={`text-[13px] sm:text-[14px] mt-1 tracking-tight ${activeTab === 'missao' ? 'font-bold text-[#f1a30a]' : 'font-medium text-slate-400'}`}>
                {t('tab_missao', selectedLanguage)}
              </span>
            </button>

            {/* 4. Bíblia */}
            <button
              id="nav-tab-biblia"
              onClick={() => setActiveTab('biblia')}
              className={`flex flex-col items-center justify-center flex-1 py-1.5 transition ${
                activeTab === 'biblia' ? 'text-[#f1a30a]' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <div className={`p-1.5 rounded-xl transition ${activeTab === 'biblia' ? 'bg-[#f1a30a]/15 text-[#f1a30a]' : ''}`}>
                <BibleNavIcon className="w-[33px] h-[33px]" isActive={activeTab === 'biblia'} />
              </div>
              <span className={`text-[13px] sm:text-[14px] mt-1 tracking-tight ${activeTab === 'biblia' ? 'font-bold text-[#f1a30a]' : 'font-medium text-slate-400'}`}>
                {t('tab_biblia', selectedLanguage)}
              </span>
            </button>

            {/* 5. Mais (Menu / Hub) */}
            <button
              id="nav-tab-mais"
              onClick={() => setActiveTab('mais')}
              className={`flex flex-col items-center justify-center flex-1 py-1.5 transition ${
                activeTab === 'mais' ? 'text-[#f1a30a]' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <div className={`p-1.5 rounded-xl transition ${activeTab === 'mais' ? 'bg-[#f1a30a]/15 text-[#f1a30a]' : ''}`}>
                <MoreNavIcon className="w-[33px] h-[33px]" isActive={activeTab === 'mais'} />
              </div>
              <span className={`text-[13px] sm:text-[14px] mt-1 tracking-tight ${activeTab === 'mais' ? 'font-bold text-[#f1a30a]' : 'font-medium text-slate-400'}`}>
                {t('tab_mais', selectedLanguage)}
              </span>
            </button>

          </nav>

          {/* Offline Indicator Banner */}
          {!isOnline && (
            <div className="fixed bottom-[max(5rem,calc(env(safe-area-inset-bottom,0px)+4.5rem))] left-4 right-4 z-50 flex items-center justify-center gap-2 rounded-xl bg-amber-600/95 backdrop-blur-md px-4 py-2 text-xs font-bold text-white shadow-xl border border-amber-400/40 animate-pulse">
              <span className="h-2.5 w-2.5 rounded-full bg-white animate-ping shrink-0" />
              <span>{getOfflineBannerText(selectedLanguage)}</span>
            </div>
          )}

          {/* PWA Update Prompt Banner */}
          {needRefresh && (
            <div className="fixed bottom-[max(5rem,calc(env(safe-area-inset-bottom,0px)+4.5rem))] left-4 right-4 z-50 flex items-center justify-between gap-3 rounded-xl bg-blue-600/95 backdrop-blur-md px-4 py-3 text-xs font-bold text-white shadow-2xl border border-blue-400/40">
              <span>
                {selectedLanguage === 'en'
                  ? "A new version of the app is available."
                  : selectedLanguage === 'es'
                  ? "Una nueva versión de la aplicación está disponible."
                  : "Uma nova versão do aplicativo está disponível."}
              </span>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={handleUpdateApp}
                  className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-black transition cursor-pointer"
                >
                  {selectedLanguage === 'en' ? "Update" : selectedLanguage === 'es' ? "Actualizar" : "Atualizar"}
                </button>
                <button
                  type="button"
                  onClick={() => setNeedRefresh(false)}
                  className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white transition cursor-pointer"
                >
                  {selectedLanguage === 'en' ? "Later" : selectedLanguage === 'es' ? "Después" : "Depois"}
                </button>
              </div>
            </div>
          )}


      </div>
  );
}
