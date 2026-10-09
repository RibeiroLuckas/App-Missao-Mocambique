import { useState, useMemo, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  BookOpen,
  Search,
  Book,
  FileText,
  Star,
  Bookmark,
  RotateCcw,
  Clock,
  ChevronLeft,
  ChevronRight,
  Share2,
  Check,
  Sparkles,
  Award,
  Heart,
  RotateCw,
  MoreVertical
} from 'lucide-react';
import { BookMeta, getLocalizedBookName } from '../data/bibleBooksMeta';
import { LanguageType } from '../types';
import { t } from '../data/translations';
import JesusPassagesIcon from './JesusPassagesIcon';

interface BibleTabProps {
  // Bible Audio States
  selectedAudioBook: BookMeta;
  setSelectedAudioBook: (b: BookMeta) => void;
  selectedAudioChapter: number;
  setSelectedAudioChapter: (c: number) => void;
  audioLanguage: 'pt' | 'en';
  setAudioLanguage: (l: 'pt' | 'en') => void;
  
  isBibleAudioPlaying: boolean;
  bibleAudioDuration: number;
  bibleAudioProgress: number;
  bibleCurrentAudioTime: number;
  onToggleBibleAudioPlay: () => void;
  onSeekBibleAudio: (pct: number) => void;
  
  // Static Bible books text
  BIBLE_BOOKS: any[];
  ALL_BIBLE_BOOKS: BookMeta[];
  
  // Devotional diary
  devotionalText: string;
  setDevotionalText: (t: string) => void;
  
  // Toasts
  onShowToast: (msg: string) => void;
  formatTime: (sec: number) => string;
  onNavigateToHome?: () => void;
  selectedLanguage: LanguageType;
  onSelectLanguage?: (lang: LanguageType) => void;
}

export default function BibleTab({
  selectedAudioBook,
  setSelectedAudioBook,
  selectedAudioChapter,
  setSelectedAudioChapter,
  audioLanguage,
  setAudioLanguage,
  isBibleAudioPlaying,
  bibleAudioDuration,
  bibleAudioProgress,
  bibleCurrentAudioTime,
  onToggleBibleAudioPlay,
  onSeekBibleAudio,
  BIBLE_BOOKS,
  ALL_BIBLE_BOOKS,
  devotionalText,
  setDevotionalText,
  onShowToast,
  formatTime,
  onNavigateToHome,
  selectedLanguage,
  onSelectLanguage,
}: BibleTabProps) {
  const [subView, setSubView] = useState<'grid' | 'completa' | 'planos' | 'favoritos' | 'anotacoes' | 'destaques' | 'historico'>('completa');
  const [searchQuery, setSearchQuery] = useState('');
  const [textBook, setTextBook] = useState(BIBLE_BOOKS[0]);
  const [textChapter, setTextChapter] = useState(BIBLE_BOOKS[0].chapters[0]);
  const [copiedVerse, setCopiedVerse] = useState<string | null>(null);

  const [selectedReadBook, setSelectedReadBook] = useState<BookMeta>(selectedAudioBook || ALL_BIBLE_BOOKS[39]);
  const [selectedReadChapter, setSelectedReadChapter] = useState<number>(selectedAudioChapter || 1);
  interface BibleVerseObj {
    number: number;
    text: string;
  }
  const [loadedVerses, setLoadedVerses] = useState<BibleVerseObj[]>([]);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [isLoadingVerses, setIsLoadingVerses] = useState<boolean>(false);
  const [selectedTranslation, setSelectedTranslation] = useState<'almeida' | 'web' | 'kjv'>('almeida');
  const versesContainerRef = useRef<HTMLDivElement>(null);

  // Automatically scroll back to top (verse 1) when chapter, book or translation is changed
  useEffect(() => {
    if (versesContainerRef.current) {
      versesContainerRef.current.scrollTop = 0;
    }
  }, [selectedReadChapter, selectedReadBook, selectedTranslation]);

  // Automatically update the default translation based on the app's selected language
  useEffect(() => {
    if (selectedLanguage === 'en') {
      setSelectedTranslation('web');
    } else {
      setSelectedTranslation('almeida');
    }
  }, [selectedLanguage]);

  // Helper function to map Portuguese book name to abibliadigital abbreviation
  const getAbbreviation = (bookNamePT: string): string => {
    const norm = bookNamePT
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "") // remove accents
      .trim();

    const map: Record<string, string> = {
      "genesis": "gn",
      "exodo": "ex",
      "levitico": "lv",
      "numeros": "nm",
      "deuteronomio": "dt",
      "josue": "js",
      "juizes": "jz",
      "rute": "rt",
      "1 samuel": "1sm",
      "2 samuel": "2sm",
      "1 reis": "1rs",
      "2 reis": "2rs",
      "1 cronicas": "1cr",
      "2 cronicas": "2cr",
      "esdras": "ed",
      "neemias": "ne",
      "ester": "et",
      "jo": "jó", // Jó has accent in abibliadigital
      "salmos": "sl",
      "proverbios": "pv",
      "eclesiastes": "ec",
      "canticos": "ct",
      "isaias": "is",
      "jeremias": "jr",
      "lamentacoes": "lm",
      "ezequiel": "ez",
      "daniel": "dn",
      "oseias": "os",
      "joel": "jl",
      "amos": "am",
      "obadias": "ob",
      "jonas": "jn",
      "miqueias": "mq",
      "naum": "na",
      "habacuque": "hc",
      "sofonias": "sf",
      "ageu": "ag",
      "zacarias": "zc",
      "malaquias": "ml",
      "mateus": "mt",
      "marcos": "mc",
      "lucas": "lc",
      "joao": "jo",
      "atos": "at",
      "romanos": "rm",
      "1 corintios": "1co",
      "2 corintios": "2co",
      "galatas": "gl",
      "efesios": "ef",
      "filipenses": "fp",
      "colossenses": "cl",
      "1 tessalonicenses": "1ts",
      "2 tessalonicenses": "2ts",
      "1 timoteo": "1tm",
      "2 timoteo": "2tm",
      "tito": "tt",
      "filemon": "fm",
      "hebreus": "hb",
      "tiago": "tg",
      "1 pedro": "1pe",
      "2 pedro": "2pe",
      "1 joao": "1jo",
      "2 joao": "2jo",
      "3 joao": "3jo",
      "judas": "jd",
      "apocalipse": "ap"
    };

    return map[norm] || "gn";
  };

  // IndexedDB Helpers for Bible Chapters Caching (Version 2 migration, LRU limit 300)
  const openBibleDB = (): Promise<IDBDatabase> => {
    return new Promise((resolve, reject) => {
      if (typeof indexedDB === 'undefined') {
        reject(new Error('IndexedDB not supported'));
        return;
      }
      const request = indexedDB.open('missao_mocambique_bible_db', 2);
      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result);
      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        // Invalidate old unvalidated cache
        if (db.objectStoreNames.contains('chapters')) {
          db.deleteObjectStore('chapters');
        }
        db.createObjectStore('chapters', { keyPath: 'id' });
      };
    });
  };

  const saveChapterToDB = async (translation: string, book: string, chapter: number, verses: BibleVerseObj[]) => {
    if (!Array.isArray(verses) || verses.length === 0) return;
    const isValid = verses.every(v => typeof v.number === 'number' && typeof v.text === 'string' && v.text.trim().length > 0);
    if (!isValid) return;

    try {
      const db = await openBibleDB();
      const tx = db.transaction('chapters', 'readwrite');
      const store = tx.objectStore('chapters');
      const id = `${translation}_${book}_${chapter}`;

      // Enforce LRU limit (max 300 chapters)
      const allReq = store.getAll();
      allReq.onsuccess = () => {
        const items = allReq.result || [];
        if (items.length >= 300) {
          items.sort((a, b) => (a.timestamp || 0) - (b.timestamp || 0));
          store.delete(items[0].id);
        }
      };

      store.put({ id, translation, book, chapter, verses, timestamp: Date.now() });
      await new Promise((resolve, reject) => {
        tx.oncomplete = () => resolve(true);
        tx.onerror = () => reject(tx.error);
        tx.onabort = () => reject(tx.error);
      });
    } catch (e) {
      // Ignore storage limits / write failures silently
    }
  };

  const getChapterFromDB = async (translation: string, book: string, chapter: number): Promise<BibleVerseObj[] | null> => {
    try {
      const db = await openBibleDB();
      return new Promise((resolve) => {
        const tx = db.transaction('chapters', 'readonly');
        const store = tx.objectStore('chapters');
        const id = `${translation}_${book}_${chapter}`;
        const request = store.get(id);
        request.onsuccess = () => {
          const result = request.result;
          if (result && result.verses && Array.isArray(result.verses)) {
            resolve(result.verses);
          } else {
            resolve(null);
          }
        };
        request.onerror = () => resolve(null);
      });
    } catch (e) {
      return null;
    }
  };

  // Fetch verses from IndexedDB cache or API (bible-api.com)
  useEffect(() => {
    let active = true;
    const controller = new AbortController();

    const fetchVerses = async () => {
      setIsLoadingVerses(true);
      setLoadError(null);

      const bookName = selectedReadBook.namePT;
      const chapterNum = selectedReadChapter;

      // 1. Check IndexedDB cache first (validated complete chapters)
      const cached = await getChapterFromDB(selectedTranslation, bookName, chapterNum);
      if (cached && cached.length > 0) {
        if (active) {
          setLoadedVerses(cached);
          setIsLoadingVerses(false);
        }
        return;
      }

      // 2. If offline and not in cache, show offline message
      if (typeof navigator !== 'undefined' && !navigator.onLine) {
        if (active) {
          setLoadedVerses([]);
          setIsLoadingVerses(false);
        }
        return;
      }

      // 3. Try fetching from API (bible-api.com)
      try {
        const bookIdentifier = selectedReadBook.nameEN || bookName;
        const url = `https://bible-api.com/${encodeURIComponent(bookIdentifier)}+${chapterNum}?translation=${selectedTranslation}`;

        const timeoutId = setTimeout(() => controller.abort(), 4000);
        const res = await fetch(url, { signal: controller.signal });
        clearTimeout(timeoutId);

        if (!res.ok) {
          throw new Error(`API status ${res.status}`);
        }
        const data = await res.json();
        if (active) {
          if (data && data.verses && Array.isArray(data.verses) && data.verses.length > 0) {
            const versesArr: BibleVerseObj[] = data.verses.map((v: any, idx: number) => ({
              number: typeof v.verse === 'number' ? v.verse : (idx + 1),
              text: String(v.text || '').trim()
            }));
            await saveChapterToDB(selectedTranslation, bookName, chapterNum, versesArr);
            setLoadedVerses(versesArr);
          } else {
            setLoadedVerses([]);
          }
        }
      } catch (err) {
        if (active) {
          const cachedRetry = await getChapterFromDB(selectedTranslation, bookName, chapterNum);
          if (cachedRetry && cachedRetry.length > 0) {
            setLoadedVerses(cachedRetry);
          } else {
            setLoadedVerses([]);
            setLoadError(
              selectedLanguage === 'en'
                ? "Could not load this chapter. Please try again."
                : selectedLanguage === 'es'
                ? "No se pudo cargar este capítulo. Inténtalo de nuevo."
                : "Não foi possível carregar este capítulo. Tente novamente."
            );
          }
        }
      } finally {
        if (active) {
          setIsLoadingVerses(false);
        }
      }
    };

    fetchVerses();
    return () => {
      active = false;
      controller.abort();
    };
  }, [selectedReadBook, selectedReadChapter, selectedTranslation]);
  
  // Synchronize translation with selected language
  useEffect(() => {
    if (selectedLanguage === 'en') {
      setSelectedTranslation('web');
    } else {
      setSelectedTranslation('almeida');
    }
  }, [selectedLanguage]);

  // Theme verse display modal
  const [selectedThemeVerse, setSelectedThemeVerse] = useState<{
    theme: string;
    ref: string;
    text: string;
    image: string;
  } | null>(null);

  // Search through all mock verses in the static books
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const results: Array<{ book: string; chapter: number; verse: string }> = [];
    BIBLE_BOOKS.forEach((bk) => {
      bk.chapters.forEach((ch: any) => {
        ch.verses.forEach((v: string) => {
          if (v.toLowerCase().includes(searchQuery.toLowerCase())) {
            results.push({
              book: bk.name,
              chapter: ch.number,
              verse: v
            });
          }
        });
      });
    });
    return results;
  }, [searchQuery, BIBLE_BOOKS]);

  const handleCopyVerse = (text: string, ref: string) => {
    navigator.clipboard.writeText(`"${text}" — ${ref}`);
    setCopiedVerse(text);
    onShowToast(selectedLanguage === 'en' ? `Copied: ${ref}` : selectedLanguage === 'es' ? `Copiado: ${ref}` : `Copiado: ${ref}`);
    setTimeout(() => setCopiedVerse(null), 2000);
  };

  // Themed Jesus passages localized for 4 languages
  const themeVerses = useMemo(() => [
    {
      theme: selectedLanguage === 'en' ? "Love" : selectedLanguage === 'es' ? "Amor" : "Amor",
      ref: selectedLanguage === 'en' ? "John 3:16" : selectedLanguage === 'es' ? "Juan 3:16" : "João 3:16",
      text: selectedLanguage === 'en'
        ? "For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life."
        : selectedLanguage === 'es'
        ? "Porque de tal manera amó Dios al mundo, que ha dado a su Hijo unigénito, para que todo aquel que en él cree, no se pierda, mas tenga vida eterna."
        : "Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito, para que todo aquele que nele crê não pereça, mas tenha a vida eterna.",
      image: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=800&auto=format&fit=crop&q=80" // Sunset forest
    },
    {
      theme: selectedLanguage === 'en' ? "Faith" : selectedLanguage === 'es' ? "Fe" : "Fé",
      ref: selectedLanguage === 'en' ? "Matthew 17:20" : selectedLanguage === 'es' ? "Mateo 17:20" : "Mateus 17:20",
      text: selectedLanguage === 'en'
        ? "If you have faith as small as a mustard seed, you can say to this mountain, 'Move from here to there,' and it will move. Nothing will be impossible for you."
        : selectedLanguage === 'es'
        ? "Si tuviereis fe como un grano de mostaza, diréis a este monte: Pásate de aquí allá, y se pasará; y nada os será imposible."
        : "Se tiverdes fé como um grão de mostarda, direis a este monte: Passa daqui para acolá, e ele passará; e nada vos será impossível.",
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80" // Mountains sunrise
    },
    {
      theme: selectedLanguage === 'en' ? "Hope" : selectedLanguage === 'es' ? "Esperanza" : "Esperança",
      ref: selectedLanguage === 'en' ? "John 14:1" : selectedLanguage === 'es' ? "Juan 14:1" : "João 14:1",
      text: selectedLanguage === 'en'
        ? "Do not let your hearts be troubled. You believe in God; believe also in me. My Father's house has many rooms."
        : selectedLanguage === 'es'
        ? "No se turbe vuestro corazón; creéis en Dios, creed también en mí. En la casa de mi Padre muchas moradas hay."
        : "Não se turbe o vosso coração; credes em Deus, crede também em mim. Na casa de meu Pai há muitas moradas.",
      image: "https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?w=800&auto=format&fit=crop&q=80" // Morning sunbeams
    },
    {
      theme: selectedLanguage === 'en' ? "Forgiveness" : selectedLanguage === 'es' ? "Perdón" : "Perdão",
      ref: selectedLanguage === 'en' ? "Matthew 6:14" : selectedLanguage === 'es' ? "Mateo 6:14" : "Mateus 6:14",
      text: selectedLanguage === 'en'
        ? "For if you forgive other people when they sin against you, your heavenly Father will also forgive you."
        : selectedLanguage === 'es'
        ? "Porque si perdonáis a los hombres sus ofensas, os perdonará también a vosotros vuestro Padre celestial."
        : "Porque, se perdoardes aos homens as suas ofensas, também vosso Pai celeste vos perdoará.",
      image: "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?w=800&auto=format&fit=crop&q=80" // Light clouds peace
    },
    {
      theme: selectedLanguage === 'en' ? "Salvation" : selectedLanguage === 'es' ? "Salvación" : "Salvação",
      ref: selectedLanguage === 'en' ? "John 11:25" : selectedLanguage === 'es' ? "Juan 11:25" : "João 11:25",
      text: selectedLanguage === 'en'
        ? "Jesus said to her, 'I am the resurrection and the life. The one who believes in me will live, even though they die.'"
        : selectedLanguage === 'es'
        ? "Le dijo Jesús: Yo soy la resurrección y la vida; el que cree en mí, aunque esté muerto, vivirá."
        : "Disse-lhe Jesus: Eu sou a ressurreição e a vida; quem crê em mim, ainda que esteja morto, viverá.",
      image: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=800&auto=format&fit=crop&q=80" // Flowering field
    },
    {
      theme: selectedLanguage === 'en' ? "Peace" : selectedLanguage === 'es' ? "Paz" : "Paz",
      ref: selectedLanguage === 'en' ? "John 14:27" : selectedLanguage === 'es' ? "Juan 14:27" : "João 14:27",
      text: selectedLanguage === 'en'
        ? "Peace I leave with you; my peace I give you. I do not give to you as the world gives. Do not let your hearts be troubled and do not be afraid."
        : selectedLanguage === 'es'
        ? "La paz os dejo, mi paz os doy; yo no os la doy como el mundo la da. No se turbe vuestro corazón, ni tenga miedo."
        : "Deixo-vos a paz, a minha paz vos dou; não vo-la dou como o mundo a dá. Não se turbe o vosso coração, nem se atemorize.",
      image: "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=800&auto=format&fit=crop&q=80" // Calm misty river
    }
  ], [selectedLanguage]);

  return (
    <div className="w-full min-h-full flex flex-col space-y-4 pb-12 px-0 text-left">
      {/* High-Fidelity Custom Navigation Header matching screenshot */}
      <div className="sticky top-0 z-30 bg-[#041d34]/95 backdrop-blur-md flex items-center justify-between border-b border-[#0b2d4f] pt-[max(2.5rem,calc(var(--app-safe-top)+0.5rem))] pb-3 mb-1 px-4">
        <button
          onClick={() => {
            if (subView !== 'grid') {
              setSubView('grid');
            } else if (onNavigateToHome) {
              onNavigateToHome();
            }
          }}
          className="p-1 rounded-none hover:bg-[#041d34] text-slate-400 hover:text-white transition active:scale-95"
        >
          <ChevronLeft className="w-5 h-5 text-[#f1a30a]" />
        </button>
        
        <h2 className="text-xs font-black text-slate-100 uppercase tracking-wider text-center flex-1 mx-2 truncate">
          {subView === 'grid' 
            ? t('bible_title', selectedLanguage) 
            : subView === 'completa' 
              ? t('bible_reader_title', selectedLanguage) 
              : subView === 'planos' 
                ? t('bible_sub_plans', selectedLanguage) 
                : subView === 'favoritos' 
                  ? t('bible_sub_favs', selectedLanguage) 
                  : subView === 'anotacoes' 
                    ? t('bible_sub_notes', selectedLanguage) 
                    : subView === 'destaques' 
                      ? t('bible_sub_highlights', selectedLanguage) 
                      : t('bible_sub_history', selectedLanguage)}
        </h2>

        <button
          onClick={() => onShowToast("Menu de opções da Bíblia.")}
          className="p-1 rounded-none hover:bg-[#041d34] text-slate-400 hover:text-white transition active:scale-95"
        >
          <MoreVertical className="w-4 h-4 text-slate-400" />
        </button>
      </div>

      {/* Dynamic Navigation Subviews */}
      <AnimatePresence mode="wait">
        {subView === 'grid' && (
          <motion.div
            key="grid-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-4"
          >
            {/* Header with search */}
            <div className="flex flex-col gap-2 text-left px-4">
              <div className="relative">
                <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder={t('bible_search_placeholder', selectedLanguage)}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#041d34] border border-[#0b2d4f] text-slate-200 rounded-none pl-9 pr-4 py-2 text-xs focus:outline-none focus:border-[#f1a30a] font-medium"
                />
              </div>
            </div>

            {/* Render Search Results if query exists */}
            {searchQuery ? (
              <div className="bg-slate-900/80 rounded-none p-4 border-y border-slate-800 text-left space-y-3">
                <div className="flex justify-between items-center border-b border-slate-850 pb-2">
                  <span className="text-[10px] font-mono text-slate-400 uppercase font-bold">
                    {selectedLanguage === 'en' ? 'Search Results' : selectedLanguage === 'es' ? 'Resultados de la Búsqueda' : 'Resultados da Busca'} ({searchResults.length})
                  </span>
                  <button
                    onClick={() => setSearchQuery('')}
                    className="text-[9px] font-mono font-bold text-red-400 hover:underline"
                  >
                    {selectedLanguage === 'en' ? 'Clear' : selectedLanguage === 'es' ? 'Limpiar' : 'Limpar'}
                  </button>
                </div>
                <div className="space-y-3 max-h-[300px] overflow-y-auto custom-scrollbar pr-1">
                  {searchResults.length > 0 ? (
                    searchResults.map((res, i) => (
                      <div
                        key={i}
                        onClick={() => handleCopyVerse(res.verse, `${res.book} ${res.chapter}`)}
                        className="p-2.5 rounded-none hover:bg-slate-800/40 cursor-copy border-b border-slate-950/60 last:border-0 transition"
                      >
                        <span className="text-[9.5px] font-mono text-amber-500 font-bold block uppercase">
                          {res.book} {res.chapter}
                        </span>
                        <p className="text-xs text-slate-300 font-serif leading-relaxed mt-1">
                          {res.verse}
                        </p>
                      </div>
                    ))
                  ) : (
                    <p className="text-xs text-slate-500 italic text-center py-4">
                      {selectedLanguage === 'en' ? 'No verses found matching' : selectedLanguage === 'es' ? 'No se encontraron versículos para' : 'Nenhum versículo encontrado para'} &quot;{searchQuery}&quot;
                    </p>
                  )}
                </div>
              </div>
            ) : (
              <>
                {/* Daily Verse Feature Card with Leaf/Branch design */}
                <div className="bg-gradient-to-br from-slate-900 to-slate-950 rounded-none p-4 border-y border-slate-800 shadow-md relative overflow-hidden text-left flex gap-3">
                  <div className="absolute right-0 top-0 w-24 h-24 bg-emerald-500/5 rounded-none blur-2xl pointer-events-none" />
                  <div className="w-10 h-10 rounded-none bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                    <Sparkles className="w-5 h-5 animate-pulse" />
                  </div>
                  <div className="space-y-1">
                    <span className="text-[8.5px] font-mono tracking-widest text-emerald-400 font-bold uppercase">
                      {t('bible_recommendation', selectedLanguage)}
                    </span>
                    <p className="text-xs text-slate-200 font-serif leading-relaxed italic">
                      {selectedLanguage === 'en' 
                        ? '“Have I not commanded you? Be strong and courageous. Do not be afraid... for the Lord your God will be with you wherever you go.”'
                        : selectedLanguage === 'es'
                        ? '“¿No te he mandado que te esfuerces y seas valiente? No temas ni desmayes, porque Jehová tu Dios estará contigo en dondequiera que vayas.”'
                        : '“Não fui eu que ordenei? Seja forte e corajoso! Não se apavore... pois o Senhor, o seu Deus, estará com você por onde você andar.”'}
                    </p>
                    <p className="text-[10px] font-bold text-slate-400">— {selectedLanguage === 'en' ? 'Joshua 1:9' : 'Josué 1:9'}</p>
                  </div>
                </div>

                {/* 6 Grid Buttons (exactly matching native phone mockup layout!) */}
                <div className="grid grid-cols-2 gap-3 px-4">
                  <button
                    onClick={() => setSubView('completa')}
                    className="bg-slate-900 hover:bg-slate-850 p-4 rounded-none border border-slate-800 flex flex-col items-start gap-2.5 transition active:scale-95 text-left group"
                  >
                    <div className="w-9 h-9 rounded-none bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 group-hover:bg-blue-500/20">
                      <Book className="w-[23px] h-[23px]" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white leading-tight">{t('bible_btn_full', selectedLanguage)}</h4>
                      <p className="text-[9px] text-slate-400 mt-0.5">{t('bible_desc_full', selectedLanguage)}</p>
                    </div>
                  </button>

                  <button
                    onClick={() => setSubView('planos')}
                    className="bg-slate-900 hover:bg-slate-850 p-4 rounded-none border border-slate-800 flex flex-col items-start gap-2.5 transition active:scale-95 text-left group"
                  >
                    <div className="w-9 h-9 rounded-none bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 group-hover:bg-amber-500/20">
                      <Award className="w-[23px] h-[23px]" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white leading-tight">{t('bible_btn_plans', selectedLanguage)}</h4>
                      <p className="text-[9px] text-slate-400 mt-0.5">{t('bible_desc_plans', selectedLanguage)}</p>
                    </div>
                  </button>

                  <button
                    onClick={() => setSubView('favoritos')}
                    className="bg-slate-900 hover:bg-slate-850 p-4 rounded-none border border-slate-800 flex flex-col items-start gap-2.5 transition active:scale-95 text-left group"
                  >
                    <div className="w-9 h-9 rounded-none bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 group-hover:bg-purple-500/20">
                      <Star className="w-[23px] h-[23px]" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white leading-tight">{t('bible_btn_favs', selectedLanguage)}</h4>
                      <p className="text-[9px] text-slate-400 mt-0.5">{t('bible_desc_favs', selectedLanguage)}</p>
                    </div>
                  </button>

                  <button
                    onClick={() => setSubView('anotacoes')}
                    className="bg-slate-900 hover:bg-slate-850 p-4 rounded-none border border-slate-800 flex flex-col items-start gap-2.5 transition active:scale-95 text-left group"
                  >
                    <div className="w-9 h-9 rounded-none bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:bg-emerald-500/20">
                      <FileText className="w-[23px] h-[23px]" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white leading-tight">{t('bible_btn_notes', selectedLanguage)}</h4>
                      <p className="text-[9px] text-slate-400 mt-0.5">{t('bible_desc_notes', selectedLanguage)}</p>
                    </div>
                  </button>

                  <button
                    onClick={() => setSubView('destaques')}
                    className="bg-slate-900 hover:bg-slate-850 p-4 rounded-none border border-slate-800 flex flex-col items-start gap-2.5 transition active:scale-[0.97] text-left group"
                  >
                    <div className="w-9 h-9 rounded-none bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400 group-hover:bg-rose-500/20">
                      <Bookmark className="w-[23px] h-[23px]" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white leading-tight">{t('bible_btn_highlights', selectedLanguage)}</h4>
                      <p className="text-[9px] text-slate-400 mt-0.5">{t('bible_desc_highlights', selectedLanguage)}</p>
                    </div>
                  </button>

                  <button
                    onClick={() => setSubView('historico')}
                    className="bg-slate-900 hover:bg-slate-850 p-4 rounded-none border border-slate-800 flex flex-col items-start gap-2.5 transition active:scale-95 text-left group"
                  >
                    <div className="w-9 h-9 rounded-none bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400 group-hover:bg-teal-500/20">
                      <Clock className="w-[23px] h-[23px]" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white leading-tight">{t('bible_btn_history', selectedLanguage)}</h4>
                      <p className="text-[9px] text-slate-400 mt-0.5">{t('bible_desc_history', selectedLanguage)}</p>
                    </div>
                  </button>
                </div>
              </>
            )}
          </motion.div>
        )}

        {/* 1. BÍBLIA COMPLETA VIEW */}
        {subView === 'completa' && (
          <motion.div
            key="completa-view"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0 }}
            className="space-y-4 text-left"
          >
            {/* Sub Header */}
            <div className="flex items-center gap-3 border-b border-slate-900 pb-2 px-4">
              <button
                onClick={() => setSubView('grid')}
                className="p-1 rounded-none hover:bg-slate-900 text-slate-400 hover:text-white transition"
              >
                <ChevronLeft className="w-[23px] h-[23px]" />
              </button>
              <div>
                <span className="text-[8px] font-mono text-emerald-400 font-bold uppercase tracking-widest block">{t('bible_reading', selectedLanguage)}</span>
                <h3 className="text-xs font-extrabold text-white">{t('bible_full_reader', selectedLanguage)}</h3>
              </div>
            </div>

            {/* Holy Bible Partnership Header */}
            <div className="bg-slate-900/50 rounded-none p-3 border-y border-slate-850 flex items-center justify-between gap-3 shadow-md px-4">
              <div className="space-y-0.5">
                <span className="text-[8px] font-mono tracking-widest text-amber-400 font-bold uppercase block">{t('bible_partnership', selectedLanguage)}</span>
                <h3 className="text-xs font-serif font-bold text-white flex items-center gap-1">
                  Holy Bible <span className="text-[10px] font-sans text-slate-400 font-normal">by YouVersion</span>
                </h3>
              </div>
              <div className="px-2 py-1 bg-amber-500 text-slate-950 rounded-none text-[9px] font-extrabold uppercase font-sans">
                HOLY
              </div>
            </div>

            {/* TEXT READING HUB */}
            <div className="bg-[#041d34] rounded-none p-4 border-y border-[#0b2d4f] space-y-3.5 shadow-md">
              <div className="flex flex-col gap-2 border-b border-[#0b2d4f] pb-3">
                {/* Book & Chapter Selectors with Prev/Next buttons */}
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    disabled={selectedReadChapter <= 1}
                    onClick={() => setSelectedReadChapter(prev => Math.max(1, prev - 1))}
                    className="p-1.5 rounded-none bg-[#010c18] border border-[#0b2d4f] text-slate-300 hover:text-white hover:border-[#f1a30a] disabled:opacity-30 disabled:cursor-not-allowed active:scale-95 transition shrink-0"
                    title={selectedLanguage === 'en' ? 'Previous Chapter' : 'Capítulo Anterior'}
                  >
                    <ChevronLeft className="w-4 h-4 text-[#f1a30a]" />
                  </button>

                  <select
                    value={selectedReadBook.fcbhId}
                    onChange={(e) => {
                      const bk = ALL_BIBLE_BOOKS.find(b => b.fcbhId === e.target.value);
                      if (bk) {
                        setSelectedReadBook(bk);
                        setSelectedReadChapter(1);
                      }
                    }}
                    className="flex-1 min-w-0 bg-[#010c18] text-slate-100 border border-[#0b2d4f] rounded-none px-2 py-1.5 text-xs font-bold focus:outline-none focus:border-[#f1a30a] truncate"
                  >
                    <optgroup label={t('bible_nt', selectedLanguage)} className="bg-[#010c18]">
                      {ALL_BIBLE_BOOKS.filter(b => b.testament === 'Novo').map(b => (
                        <option key={b.fcbhId} value={b.fcbhId}>{getLocalizedBookName(b, selectedLanguage)}</option>
                      ))}
                    </optgroup>
                    <optgroup label={t('bible_at', selectedLanguage)} className="bg-[#010c18]">
                      {ALL_BIBLE_BOOKS.filter(b => b.testament === 'Antigo').map(b => (
                        <option key={b.fcbhId} value={b.fcbhId}>{getLocalizedBookName(b, selectedLanguage)}</option>
                      ))}
                    </optgroup>
                  </select>

                  <select
                    value={selectedReadChapter}
                    onChange={(e) => setSelectedReadChapter(parseInt(e.target.value, 10))}
                    className="w-20 bg-[#010c18] text-slate-100 border border-[#0b2d4f] rounded-none px-2 py-1.5 text-xs font-bold font-mono focus:outline-none focus:border-[#f1a30a] shrink-0"
                  >
                    {Array.from({ length: selectedReadBook.numChapters }, (_, i) => i + 1).map(num => (
                      <option key={num} value={num}>{t('bible_chapter_short', selectedLanguage)} {num}</option>
                    ))}
                  </select>

                  <button
                    type="button"
                    disabled={selectedReadChapter >= selectedReadBook.numChapters}
                    onClick={() => setSelectedReadChapter(prev => Math.min(selectedReadBook.numChapters, prev + 1))}
                    className="p-1.5 rounded-none bg-[#010c18] border border-[#0b2d4f] text-slate-300 hover:text-white hover:border-[#f1a30a] disabled:opacity-30 disabled:cursor-not-allowed active:scale-95 transition shrink-0"
                    title={selectedLanguage === 'en' ? 'Next Chapter' : 'Próximo Capítulo'}
                  >
                    <ChevronRight className="w-4 h-4 text-[#f1a30a]" />
                  </button>
                </div>

                {/* Translation selector and API indicator */}
                <div className="flex items-center justify-between text-[10px] text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <span className={`w-2 h-2 rounded-none ${isLoadingVerses ? 'bg-amber-500 animate-ping' : 'bg-emerald-500'}`}></span>
                    API: <strong className="text-slate-300 font-sans uppercase">Holy Bible</strong>
                  </span>
                  
                  <div className="flex bg-[#010c18] p-0.5 rounded-none border border-[#0b2d4f]">
                    <button
                      type="button"
                      onClick={() => setSelectedTranslation('almeida')}
                      className={`px-1.5 py-0.5 rounded-none text-[8px] font-bold transition uppercase tracking-wider ${
                        selectedTranslation === 'almeida' ? 'bg-[#f1a30a] text-slate-950 font-black' : 'text-slate-400'
                      }`}
                    >
                      Português
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedTranslation('web')}
                      className={`px-1.5 py-0.5 rounded-none text-[8px] font-bold transition uppercase tracking-wider ${
                        selectedTranslation === 'web' ? 'bg-[#f1a30a] text-slate-950 font-black' : 'text-slate-400'
                      }`}
                    >
                      English
                    </button>
                  </div>
                </div>
              </div>

              {/* Text Area verses with auto-scroll ref */}
              <div ref={versesContainerRef} className="space-y-3 max-h-[440px] overflow-y-auto custom-scrollbar pr-1 min-h-[150px] relative scroll-smooth">
                {isLoadingVerses && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#010c18]/60 rounded-none space-y-2 z-10">
                    <div className="w-6 h-6 border-2 border-[#f1a30a] border-t-transparent rounded-none animate-spin"></div>
                    <span className="text-[10px] text-slate-400 font-mono">{t('bible_loading', selectedLanguage)}</span>
                  </div>
                )}

                {loadedVerses.length === 0 && !isLoadingVerses ? (
                  <div className="bg-[#010c18] border border-[#0b2d4f] rounded-none p-6 text-center space-y-3 my-4">
                    <BookOpen className="w-8 h-8 text-[#f1a30a] mx-auto opacity-80" />
                    <p className="text-xs text-slate-200 leading-relaxed font-sans font-medium">
                      {selectedLanguage === 'en'
                        ? "This chapter is not yet available offline. Open it while connected to save it to this device."
                        : selectedLanguage === 'es'
                        ? "Este capítulo aún no está disponible sin conexión. Ábrelo con conexión para guardarlo en este dispositivo."
                        : "Este capítulo ainda não está disponível sem internet. Abra-o com conexão para salvá-lo neste aparelho."}
                    </p>
                  </div>
                ) : (
                  <div className={isLoadingVerses ? "opacity-30 pointer-events-none space-y-3" : "space-y-3"}>
                    {loadedVerses.map((verseObj: BibleVerseObj, index: number) => {
                      const isCopied = copiedVerse === verseObj.text;
                      return (
                        <div
                          key={verseObj.number || index}
                          id={`bible-verse-${index}`}
                          onClick={() => handleCopyVerse(verseObj.text, `${selectedReadBook.namePT} ${selectedReadChapter}:${verseObj.number}`)}
                          className="group p-2 rounded-none cursor-pointer border-b border-[#0b2d4f]/30 last:border-0 relative transition hover:bg-[#010c18]/45"
                          title={selectedLanguage === 'en' ? 'Click to copy' : 'Clique para copiar'}
                        >
                          <p className="text-xs font-serif leading-relaxed pr-8 text-justify text-slate-200">
                            <span className="font-mono text-[9px] font-bold mr-1.5 inline-flex items-center gap-1 text-[#f1a30a]">
                              {verseObj.number}
                            </span>
                            {verseObj.text}
                          </p>
                          
                          <div className="absolute right-2 top-2.5 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition">
                            <div className="p-1">
                              {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5 text-slate-400 hover:text-white" />}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Bottom Chapter Quick Controls Bar */}
              <div className="flex items-center justify-between border-t border-[#0b2d4f]/60 pt-2.5">
                <button
                  type="button"
                  disabled={selectedReadChapter <= 1}
                  onClick={() => setSelectedReadChapter(prev => Math.max(1, prev - 1))}
                  className="flex items-center gap-1 px-2.5 py-1 rounded-none bg-[#010c18] border border-[#0b2d4f] text-[10px] font-bold text-slate-300 hover:text-white hover:border-[#f1a30a] disabled:opacity-30 disabled:cursor-not-allowed active:scale-95 transition"
                >
                  <ChevronLeft className="w-3.5 h-3.5 text-[#f1a30a]" />
                  <span>{selectedLanguage === 'en' ? 'Prev' : selectedLanguage === 'es' ? 'Anterior' : 'Anterior'}</span>
                </button>

                <span className="text-[10px] font-mono font-bold text-[#f1a30a] uppercase tracking-wider">
                  {getLocalizedBookName(selectedReadBook, selectedLanguage)} {selectedReadChapter}
                </span>

                <button
                  type="button"
                  disabled={selectedReadChapter >= selectedReadBook.numChapters}
                  onClick={() => setSelectedReadChapter(prev => Math.min(selectedReadBook.numChapters, prev + 1))}
                  className="flex items-center gap-1 px-2.5 py-1 rounded-none bg-[#010c18] border border-[#0b2d4f] text-[10px] font-bold text-slate-300 hover:text-white hover:border-[#f1a30a] disabled:opacity-30 disabled:cursor-not-allowed active:scale-95 transition"
                >
                  <span>{selectedLanguage === 'en' ? 'Next' : selectedLanguage === 'es' ? 'Siguiente' : 'Próximo'}</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#f1a30a]" />
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* 2. PLANOS DE LEITURA (INCLUDES SECOND PHONE AS MAIS BELAS PASSAGENS) */}
        {subView === 'planos' && (
          <motion.div
            key="planos-view"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0 }}
            className="space-y-4 text-left"
          >
            {/* Header */}
            <div className="flex items-center gap-3 border-b border-slate-900 pb-2 px-4">
              <button
                onClick={() => setSubView('grid')}
                className="p-1 rounded-none hover:bg-slate-900 text-slate-400 hover:text-white transition"
              >
                <ChevronLeft className="w-[23px] h-[23px]" />
              </button>
              <div>
                <span className="text-[8px] font-mono text-emerald-400 font-bold uppercase tracking-widest block">
                  {selectedLanguage === 'en' ? 'DEVOTIONAL PLANS' : selectedLanguage === 'es' ? 'PLANES DEVOCIONALES' : 'PLANOS DEVOCIONAIS'}
                </span>
                <h3 className="text-xs font-extrabold text-white">{t('bible_sub_plans', selectedLanguage)}</h3>
              </div>
            </div>

            {/* Plan Card 1 */}
            <div className="bg-slate-900/60 rounded-none p-4 border-y border-slate-800 space-y-1">
              <h4 className="text-xs font-bold text-white">
                {selectedLanguage === 'en' ? 'Covenant and Strengthening Plan' : selectedLanguage === 'es' ? 'Plan de Alianza y Fortalecimiento' : 'Plano de Aliança e Fortalecimento'}
              </h4>
              <p className="text-[10px] text-slate-400 leading-normal">
                {selectedLanguage === 'en'
                  ? 'Daily devotional on faith, commitment, and commission to serve others in arid lands.'
                  : selectedLanguage === 'es'
                  ? 'Devocional diario sobre fe, compromiso y comisión de servir al prójimo en tierras áridas.'
                  : 'Devocional diário sobre fé, compromisso, comissão de servir o próximo em terras áridas.'}
              </p>
              <div className="pt-1.5 flex justify-between items-center text-[8.5px] font-mono">
                <span className="text-emerald-400 font-bold uppercase">
                  {selectedLanguage === 'en' ? '7 DAYS • 100% FREE' : selectedLanguage === 'es' ? '7 DÍAS • 100% GRATIS' : '7 DIAS • 100% GRÁTIS'}
                </span>
                <button
                  onClick={() => onShowToast(selectedLanguage === 'en' ? "Covenant Plan started!" : selectedLanguage === 'es' ? "¡Plan Alianza iniciado!" : "Plano Aliança iniciado localmente!")}
                  className="bg-slate-950 hover:bg-slate-800 border border-slate-800 px-2 py-0.5 rounded-none text-amber-400 font-bold uppercase"
                >
                  {selectedLanguage === 'en' ? 'Start' : selectedLanguage === 'es' ? 'Iniciar' : 'Iniciar'}
                </button>
              </div>
            </div>

            {/* AS MAIS BELAS PASSAGENS DE JESUS SECTION */}
            <div className="space-y-2.5 pt-1 px-4">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-extrabold text-slate-300 uppercase tracking-widest font-mono">
                  {t('louvores_main_subtitle', selectedLanguage)}
                </h4>
                <span className="text-[8px] font-mono text-slate-500 uppercase">
                  {selectedLanguage === 'en' ? 'Select a theme' : selectedLanguage === 'es' ? 'Seleccione un tema' : 'Selecione um tema'}
                </span>
              </div>

              {/* Six Themes Beautiful Bento Grid with Image/Text overlay */}
              <div className="grid grid-cols-2 gap-3">
                {themeVerses.map((item) => (
                  <button
                    key={item.theme}
                    onClick={() => setSelectedThemeVerse(item)}
                    className="relative rounded-none overflow-hidden h-24 border border-slate-850 shadow-md group text-left active:scale-[0.97] transition"
                  >
                    <img
                      src={item.image}
                      alt={item.theme}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent" />
                    
                    <div className="absolute bottom-2.5 left-3 right-3 flex flex-col">
                      <span className="text-[11px] font-extrabold text-white font-serif leading-tight group-hover:text-amber-400 transition">
                        {item.theme}
                      </span>
                      <span className="text-[8.5px] text-slate-300 font-mono mt-0.5">{item.ref}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* 3. FAVORITOS VIEW */}
        {subView === 'favoritos' && (
          <motion.div
            key="favoritos-view"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0 }}
            className="space-y-4 text-left"
          >
            {/* Header */}
            <div className="flex items-center gap-3 border-b border-slate-900 pb-2 px-4">
              <button
                onClick={() => setSubView('grid')}
                className="p-1 rounded-none hover:bg-slate-900 text-slate-400 hover:text-white transition"
              >
                <ChevronLeft className="w-[23px] h-[23px]" />
              </button>
              <div>
                <span className="text-[8px] font-mono text-emerald-400 font-bold uppercase tracking-widest block">{selectedLanguage === 'en' ? 'YOUR STARS' : selectedLanguage === 'es' ? 'TUS ESTRELLAS' : 'AS SUAS ESTRELAS'}</span>
                <h3 className="text-xs font-extrabold text-white">{t('bible_sub_favs', selectedLanguage)}</h3>
              </div>
            </div>

            <div className="bg-slate-900/40 rounded-none p-4 border-y border-slate-850 space-y-3.5">
               <div className="flex gap-2 border-b border-slate-850 pb-2 italic text-slate-400 text-[10px]">
                <Star className="w-4 h-4 text-purple-400 fill-purple-400 shrink-0" />
                <span>{selectedLanguage === 'en' ? 'Your highlighted verses are saved here. Click to copy and share.' : selectedLanguage === 'es' ? 'Aquí se guardan tus versículos destacados. Haz clic para copiar y compartir.' : 'Aqui ficam guardados os seus versículos iluminados. Clique neles para partilhar.'}</span>
              </div>

              <div className="space-y-3">
                <div
                  onClick={() => handleCopyVerse(
                    selectedLanguage === 'en' ? "Seek first the kingdom of God, and all these things will be added to you." : selectedLanguage === 'es' ? "Mas buscad primeramente el reino de Dios, y todas estas coisas os serão acrescentadas." : "Buscai antes o reino de Deus, e todas estas coisas vos serão acrescentadas.",
                    selectedLanguage === 'en' ? "Luke 12:31" : selectedLanguage === 'es' ? "Lucas 12:31" : "Lucas 12:31"
                  )}
                  className="p-2.5 rounded-none bg-slate-950 border border-slate-850 hover:border-slate-700 cursor-pointer transition text-left"
                >
                  <p className="text-xs text-slate-200 font-serif leading-relaxed italic">
                    &ldquo;{selectedLanguage === 'en' ? 'Seek first the kingdom of God, and all these things will be added to you.' : selectedLanguage === 'es' ? 'Mas buscad primeramente el reino de Dios, y todas estas cosas os serán añadidas.' : 'Buscai antes o reino de Deus, e todas estas coisas vos serão acrescentadas.'}&rdquo;
                  </p>
                  <span className="text-[8.5px] font-mono text-amber-500 font-bold block pt-1 uppercase">— {selectedLanguage === 'en' ? 'Luke 12:31' : 'Lucas 12:31'}</span>
                </div>

                <div
                  onClick={() => handleCopyVerse(
                    selectedLanguage === 'en' ? "Do not fear, for I am with you; do not be dismayed, for I am your God..." : selectedLanguage === 'es' ? "No temas, porque yo estoy contigo; no desmayes, porque yo soy tu Dios..." : "Não temas, porque eu sou contigo; não te assombres, porque eu sou o teu Deus...",
                    selectedLanguage === 'en' ? "Isaiah 41:10" : selectedLanguage === 'es' ? "Isaías 41:10" : "Isaías 41:10"
                  )}
                  className="p-2.5 rounded-none bg-slate-950 border border-slate-850 hover:border-slate-700 cursor-pointer transition text-left"
                >
                  <p className="text-xs text-slate-200 font-serif leading-relaxed italic">
                    &ldquo;{selectedLanguage === 'en' ? 'Do not fear, for I am with you; do not be dismayed, for I am your God; I will strengthen you and help you...' : selectedLanguage === 'es' ? 'No temas, porque yo estoy contigo; no desmayes, porque yo soy tu Dios; siempre te sustentaré con la diestra de mi justicia...' : 'Não temas, porque eu sou contigo; não te assombres, porque eu sou o teu Deus; eu te fortaleço, e te ajudo...'}&rdquo;
                  </p>
                  <span className="text-[8.5px] font-mono text-amber-500 font-bold block pt-1 uppercase">— {selectedLanguage === 'en' ? 'Isaiah 41:10' : 'Isaías 41:10'}</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* 4. DIÁRIO DEVOCIONAL ANOTAÇÕES */}
        {subView === 'anotacoes' && (
          <motion.div
            key="anotacoes-view"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0 }}
            className="space-y-4 text-left"
          >
            {/* Header */}
            <div className="flex items-center gap-3 border-b border-slate-900 pb-2 px-4">
              <button
                onClick={() => setSubView('grid')}
                className="p-1 rounded-none hover:bg-slate-900 text-slate-400 hover:text-white transition"
              >
                <ChevronLeft className="w-[23px] h-[23px]" />
              </button>
              <div>
                <span className="text-[8px] font-mono text-emerald-400 font-bold uppercase tracking-widest block">
                  {selectedLanguage === 'en' ? 'FAITH NOTEBOOK' : selectedLanguage === 'es' ? 'CUADERNO DE FE' : 'CADERNO DE FÉ'}
                </span>
                <h3 className="text-xs font-extrabold text-white">{t('bible_sub_notes', selectedLanguage)}</h3>
              </div>
            </div>

            <div className="bg-slate-900/60 rounded-none p-4 border-y border-slate-800 space-y-3.5">
              <div className="flex items-start gap-2 text-slate-400 text-[10.5px]">
                <Sparkles className="w-4 h-4 text-amber-400 animate-pulse shrink-0 mt-0.5" />
                <p>
                  {selectedLanguage === 'en'
                    ? 'Write what God has been speaking to your heart. Your thoughts are automatically saved locally.'
                    : selectedLanguage === 'es'
                    ? 'Escribe lo que Dios ha estado hablando a tu corazón. Tus pensamientos se guardan localmente.'
                    : 'Escreva o que Deus tem falado ao seu coração. Os seus pensamentos são guardados automaticamente no seu dispositivo local.'}
                </p>
              </div>

              <textarea
                placeholder={
                  selectedLanguage === 'en'
                    ? 'Today I learned that faith requires courage to take the first step...'
                    : selectedLanguage === 'es'
                    ? 'Hoy aprendí que la fe requiere valor para dar el primer paso...'
                    : 'Hoje aprendi que a fé exige coragem para dar o primeiro passo...'
                }
                value={devotionalText}
                onChange={(e) => setDevotionalText(e.target.value)}
                className="w-full min-h-[160px] bg-slate-950 rounded-none border border-slate-850 p-3 text-xs text-slate-200 focus:outline-none focus:border-emerald-500 placeholder-slate-700 leading-relaxed resize-none custom-scrollbar"
              />

              <div className="flex justify-between items-center text-[9px] text-slate-500">
                <span>{selectedLanguage === 'en' ? 'Personal and local reflection' : selectedLanguage === 'es' ? 'Reflexión personal y local' : 'Reflexão pessoal e local'}</span>
                {devotionalText && (
                  <button
                    onClick={() => { setDevotionalText(''); onShowToast(selectedLanguage === 'en' ? "Notes cleared." : selectedLanguage === 'es' ? "Notas borradas." : "Anotações apagadas."); }}
                    className="text-red-400 hover:underline"
                  >
                    {selectedLanguage === 'en' ? 'Clear All' : selectedLanguage === 'es' ? 'Borrar Todo' : 'Apagar Tudo'}
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {/* 5. DESTAQUES */}
        {subView === 'destaques' && (
          <motion.div
            key="destaques-view"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0 }}
            className="space-y-4 text-left"
          >
            {/* Header */}
            <div className="flex items-center gap-3 border-b border-slate-900 pb-2 px-4">
              <button
                onClick={() => setSubView('grid')}
                className="p-1 rounded-none hover:bg-slate-900 text-slate-400 hover:text-white transition"
              >
                <ChevronLeft className="w-[23px] h-[23px]" />
              </button>
              <div>
                <span className="text-[8px] font-mono text-emerald-400 font-bold uppercase tracking-widest block">
                  {selectedLanguage === 'en' ? 'STUDIES' : selectedLanguage === 'es' ? 'ESTUDIOS' : 'ESTUDOS'}
                </span>
                <h3 className="text-xs font-extrabold text-white">{t('bible_sub_highlights', selectedLanguage)}</h3>
              </div>
            </div>

            <div className="grid gap-3 px-4">
              <div className="bg-slate-900/60 p-3.5 rounded-none border border-slate-850 text-left space-y-1">
                <span className="text-[8.5px] font-mono font-bold text-amber-400 uppercase">
                  {selectedLanguage === 'en' ? 'TOPIC: EVANGELISM' : selectedLanguage === 'es' ? 'TEMA: EVANGELISMO' : 'TÓPICO: EVANGELISMO'}
                </span>
                <h4 className="text-xs font-bold text-white">
                  {selectedLanguage === 'en' ? 'The Great Commission' : selectedLanguage === 'es' ? 'La Gran Comisión' : 'A Grande Comissão'}
                </h4>
                <p className="text-[11px] text-slate-400 font-serif leading-relaxed italic">
                  &ldquo;{selectedLanguage === 'en' ? 'And he said to them: Go into all the world and preach the gospel to all creation.' : selectedLanguage === 'es' ? 'Y les dijo: Id por todo el mundo y predicad el evangelio a toda criatura.' : 'E disse-lhes: Ide por todo o mundo, pregai o evangelho a toda criatura.'}&rdquo;
                </p>
                <span className="text-[8.5px] font-mono text-slate-500 block pt-0.5">— {selectedLanguage === 'en' ? 'Mark 16:15' : 'Marcos 16:15'}</span>
              </div>

              <div className="bg-slate-900/60 p-3.5 rounded-none border border-slate-850 text-left space-y-1">
                <span className="text-[8.5px] font-mono font-bold text-emerald-400 uppercase">
                  {selectedLanguage === 'en' ? 'TOPIC: SOLIDARITY' : selectedLanguage === 'es' ? 'TEMA: SOLIDARIDAD' : 'TÓPICO: SOLIDARIEDADE'}
                </span>
                <h4 className="text-xs font-bold text-white">
                  {selectedLanguage === 'en' ? 'Love in Action' : selectedLanguage === 'es' ? 'El Amor en Acción' : 'O Amor em Prática'}
                </h4>
                <p className="text-[11px] text-slate-400 font-serif leading-relaxed italic">
                  &ldquo;{selectedLanguage === 'en' ? 'Let us not become weary in doing good, for at the proper time we will reap a harvest.' : selectedLanguage === 'es' ? 'No nos cansemos, pues, de hacer bien; porque a su tiempo segaremos.' : 'Não deixemos de fazer o bem a todos, mas principalmente aos da família da fé.'}&rdquo;
                </p>
                <span className="text-[8.5px] font-mono text-slate-500 block pt-0.5">— {selectedLanguage === 'en' ? 'Galatians 6:10' : 'Gálatas 6:10'}</span>
              </div>
            </div>
          </motion.div>
        )}

        {/* 6. HISTÓRICO */}
        {subView === 'historico' && (
          <motion.div
            key="historico-view"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0 }}
            className="space-y-4 text-left"
          >
            {/* Header */}
            <div className="flex items-center gap-3 border-b border-slate-900 pb-2 px-4">
              <button
                onClick={() => setSubView('grid')}
                className="p-1 rounded-none hover:bg-slate-900 text-slate-400 hover:text-white transition"
              >
                <ChevronLeft className="w-[23px] h-[23px]" />
              </button>
              <div>
                <span className="text-[8px] font-mono text-emerald-400 font-bold uppercase tracking-widest block">
                  {selectedLanguage === 'en' ? 'TIMELINE' : selectedLanguage === 'es' ? 'LÍNEA DE TIEMPO' : 'LINHA DO TEMPO'}
                </span>
                <h3 className="text-xs font-extrabold text-white">{t('bible_sub_history', selectedLanguage)}</h3>
              </div>
            </div>

            <div className="bg-slate-900/50 rounded-none p-3 border-y border-slate-850 px-4">
              <div className="flex items-center justify-between text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-teal-400" />
                  <span className="font-bold">{selectedLanguage === 'en' ? 'Matthew Chapter 1' : selectedLanguage === 'es' ? 'Mateo Capítulo 1' : 'Mateus Capítulo 1'}</span>
                </div>
                <span className="text-[9px] font-mono text-slate-500">{selectedLanguage === 'en' ? 'Read 1h ago' : selectedLanguage === 'es' ? 'Leído hace 1h' : 'Lido há 1h'}</span>
              </div>
            </div>

            <div className="bg-slate-900/50 rounded-none p-3 border-y border-slate-850 px-4">
              <div className="flex items-center justify-between text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-teal-400" />
                  <span className="font-bold">{selectedLanguage === 'en' ? 'Mark Chapter 16' : selectedLanguage === 'es' ? 'Marcos Capítulo 16' : 'Marcos Capítulo 16'}</span>
                </div>
                <span className="text-[9px] font-mono text-slate-500">{selectedLanguage === 'en' ? 'Read yesterday' : selectedLanguage === 'es' ? 'Leído ayer' : 'Lido ontem'}</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* OVERLAY THEME VERSE DISPLAY PANEL (Matches Second Phone mockup exactly!) */}
      <AnimatePresence>
        {selectedThemeVerse && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-slate-950/95 z-50 p-6 flex flex-col justify-between rounded-none"
          >
            {/* Header */}
            <div className="flex justify-between items-center border-b border-slate-900 pb-3">
              <div className="flex items-center gap-2">
                <JesusPassagesIcon className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-extrabold text-white font-mono uppercase tracking-wider">
                  {t('louvores_main_subtitle', selectedLanguage)}
                </span>
              </div>
              <button
                onClick={() => setSelectedThemeVerse(null)}
                className="p-1 rounded-none bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
              >
                <ChevronLeft className="w-[23px] h-[23px]" />
              </button>
            </div>

            {/* Immersive Image with Scriptural Text */}
            <div className="flex-1 my-6 relative rounded-none overflow-hidden shadow-2xl border border-slate-800/80 flex items-center justify-center p-6 text-center">
              <img
                src={selectedThemeVerse.image}
                alt={selectedThemeVerse.theme}
                className="absolute inset-0 w-full h-full object-cover opacity-35 mix-blend-overlay"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-slate-950" />
              
              <div className="relative z-10 space-y-4">
                <span className="px-3 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/30 rounded-none font-mono font-bold text-[10px] tracking-widest uppercase">
                  {selectedLanguage === 'en' ? 'THEME' : selectedLanguage === 'es' ? 'TEMA' : 'TEMA'}: {selectedThemeVerse.theme}
                </span>
                
                <p className="text-sm text-slate-100 font-serif leading-relaxed italic font-light px-2">
                  &ldquo;{selectedThemeVerse.text}&rdquo;
                </p>
                
                <h5 className="text-xs font-mono font-bold text-slate-400">
                  — {selectedThemeVerse.ref}
                </h5>
              </div>
            </div>

            {/* Actions for the theme verse */}
            <div className="grid grid-cols-2 gap-3 pb-2">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(`"${selectedThemeVerse.text}" — ${selectedThemeVerse.ref}`);
                  onShowToast(selectedLanguage === 'en' ? `Text of ${selectedThemeVerse.theme} copied!` : selectedLanguage === 'es' ? `¡Texto de ${selectedThemeVerse.theme} copiado!` : `Texto de ${selectedThemeVerse.theme} copiado!`);
                }}
                className="bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 text-xs py-3 rounded-none font-bold transition flex items-center justify-center gap-1.5"
              >
                <Check className="w-4 h-4 text-emerald-400" />
                <span>{selectedLanguage === 'en' ? 'Copy' : selectedLanguage === 'es' ? 'Copiar' : 'Copiar'}</span>
              </button>
              
              <button
                onClick={() => {
                  onShowToast(selectedLanguage === 'en' ? `Shared: ${selectedThemeVerse.ref}` : selectedLanguage === 'es' ? `Compartido: ${selectedThemeVerse.ref}` : `Partilhado: ${selectedThemeVerse.ref}`);
                }}
                className="bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs py-3 rounded-none font-extrabold transition flex items-center justify-center gap-1.5"
              >
                <Share2 className="w-4 h-4" />
                <span>{selectedLanguage === 'en' ? 'Share' : selectedLanguage === 'es' ? 'Compartir' : 'Partilhar'}</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
