import React, { useState, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Users,
  Compass,
  Briefcase,
  Calendar,
  Palette,
  Image as ImageIcon,
  HeartHandshake,
  MessageCircle,
  ChevronRight,
  ChevronLeft,
  Plus,
  Trash2,
  Share2,
  Printer,
  Download,
  Maximize2,
  X,
  ExternalLink,
  Copy,
  Check,
  Heart,
  Upload,
  Sparkles,
  Info,
  Layers,
  MapPin,
  Clock,
  Youtube,
  Instagram,
  Globe,
  Video,
  Play,
  Tv,
  Mail
} from 'lucide-react';
import { MissionProject, PrayerRequest, LanguageType, UpcomingMission, GalleryPhoto } from '../types';
import { COLORING_DRAWINGS, ColoringDrawing } from '../data/kidsColoringData';
import { KIDS_VIDEOS, KidsVideo } from '../data/kidsVideosData';
import { t } from '../data/translations';
import { PWAInstall } from '../usePWAInstall';
import InstallMenuItem from './InstallMenuItem';

import childrenGroup1 from '../assets/images/children_group_1_1784054748086.jpg';
import childrenGroup2 from '../assets/images/children_group_2_1784054774596.jpg';
import childrenCloseUp from '../assets/images/children_close_up_1784054763230.jpg';
import prayerBannerImg from '../assets/images/prayer_faith_mural_1787866949488.jpg';
import ChildrenCarousel from './ChildrenCarousel';
import firstOrlandoLogo from '../assets/images/first_orlando_logo.svg';
import miudosImg from '../assets/images/miudos.jpeg';

export type MenuSubView =
  | 'menu'
  | 'quem-somos'
  | 'nossa-missao'
  | 'projetos'
  | 'proximas-missoes'
  | 'kids'
  | 'galeria'
  | 'colaborador'
  | 'fale-conosco';

interface MenuTabProps {
  installation: PWAInstall;
  initialSubView?: MenuSubView;
  onNavigateToHome: () => void;
  onShowToast: (msg: string) => void;
  selectedLanguage: LanguageType;
  onSelectLanguage: (lang: LanguageType) => void;
  prayerRequests: PrayerRequest[];
  onToggleAmen: (id: string) => void;
  onAddPrayerRequest: (author: string, text: string, cat: PrayerRequest['category']) => void;
  showPrayerModal: boolean;
  setShowPrayerModal: (b: boolean) => void;
}

const LOCALIZED_WHO_WE_ARE: Record<LanguageType, string[]> = {
  pt: [
    "Somos uma comunidade cristã do Ministério Brasileiro da First Orlando, comprometida em seguir Jesus e levar Sua mensagem a outras pessoas e lugares.",
    "Fazemos parte de uma igreja com uma visão que ultrapassa as paredes do templo: servir, compartilhar o Evangelho, cuidar de pessoas e participar da missão de Deus no mundo.",
    "O Missão Moçambique nasce desse mesmo propósito — conectar pessoas, compartilhar esperança e levar a Palavra de Deus além das fronteiras."
  ],
  pt_PT: [
    "Somos uma comunidade cristã do Ministério Brasileiro da First Orlando, comprometida em seguir Jesus e levar Sua mensagem a outras pessoas e lugares.",
    "Fazemos parte de uma igreja com uma visão que ultrapassa as paredes do templo: servir, compartilhar o Evangelho, cuidar de pessoas e participar da missão de Deus no mundo.",
    "O Missão Moçambique nasce desse mesmo propósito — conectar pessoas, compartilhar esperança e levar a Palavra de Deus além das fronteiras."
  ],
  en: [
    "We are a Christian community of the Brazilian Ministry at First Orlando, committed to following Jesus and carrying His message to other people and places.",
    "We are part of a church with a vision that extends far beyond the walls of the building: serving, sharing the Gospel, caring for people, and taking part in God's mission in the world.",
    "Mozambique Mission was born from this very purpose — connecting people, sharing hope, and taking the Word of God beyond borders."
  ],
  es: [
    "Somos una comunidad cristiana del Ministerio Brasileño de First Orlando, comprometida a seguir a Jesús y llevar Su mensaje a otras personas y lugares.",
    "Formamos parte de una iglesia con una visión que va más allá de las paredes del templo: servir, compartir el Evangelio, cuidar de las personas y participar en la misión de Dios en el mundo.",
    "Misión Mozambique nace de este mismo propósito — conectar personas, compartir esperanza y llevar la Palabra de Dios más allá de las fronteras."
  ]
};

const LOCALIZED_OUR_MISSION: Record<LanguageType, string[]> = {
  pt: [
    "Nossa missão é compartilhar o Evangelho de Jesus Cristo, levando a Palavra de Deus, esperança e cuidado a pessoas e comunidades em Moçambique.",
    "Queremos servir de maneira prática, criar conexões, fortalecer famílias e contribuir para que crianças, jovens e adultos tenham acesso à mensagem transformadora de Jesus.",
    "Mais do que levar recursos, queremos levar esperança — e participar da missão de Deus de fazer discípulos em todas as nações."
  ],
  pt_PT: [
    "Nossa missão é compartilhar o Evangelho de Jesus Cristo, levando a Palavra de Deus, esperança e cuidado a pessoas e comunidades em Moçambique.",
    "Queremos servir de maneira prática, criar conexões, fortalecer famílias e contribuir para que crianças, jovens e adultos tenham acesso à mensagem transformadora de Jesus.",
    "Mais do que levar recursos, queremos levar esperança — e participar da missão de Deus de fazer discípulos em todas as nações."
  ],
  en: [
    "Our mission is to share the Gospel of Jesus Christ, bringing the Word of God, hope, and care to individuals and communities across Mozambique.",
    "We desire to serve in practical ways, build connections, strengthen families, and help ensure that children, youth, and adults have access to the life-transforming message of Jesus.",
    "More than providing resources, we want to bring hope — and participate in God's mission of making disciples of all nations."
  ],
  es: [
    "Nuestra misión es compartir el Evangelio de Jesucristo, llevando la Palabra de Dios, esperanza y cuidado a personas y comunidades en Mozambique.",
    "Queremos servir de manera práctica, crear conexiones, fortalecer familias y contribuir a que niños, jóvenes y adultos tengan acceso al mensaje transformador de Jesús.",
    "Más que llevar recursos, queremos llevar esperanza — y participar en la misión de Dios de hacer discípulos en todas las naciones."
  ]
};

const DEFAULT_WHO_WE_ARE = LOCALIZED_WHO_WE_ARE.pt;
const DEFAULT_OUR_MISSION = LOCALIZED_OUR_MISSION.pt;

const INITIAL_PROJECTS: MissionProject[] = [
  {
    id: 'proj_pocos',
    title: 'Poços de Água Potável (Água da Vida)',
    description: 'Perfuração de poços artesianos profundos com bomba manual em aldeias remotas de Sofala e Beira, garantindo água limpa e eliminando doenças hídricas.',
    impact: 'Mais de 10 poços concluídos atendendo 3.500 famílias.',
    status: 'Em Andamento'
  },
  {
    id: 'proj_igrejas',
    title: 'Plantação de Igrejas & Treinamento Teológico',
    description: 'Apoio na construção de templos simples e formação contínua de pastores e obreiros nativos com fornecimento de Bíblias e material doutrinário sólido.',
    impact: '3 congregações ativas e 28 obreiros em discipulado.',
    status: 'Em Andamento'
  },
  {
    id: 'proj_alimentos',
    title: 'Nutrição Infantil & Cestas de Alimentos',
    description: 'Suporte nutricional emergencial para famílias em insegurança alimentar severa e amparo a lares comunitários e órfãos locais.',
    impact: 'Mais de 1.200 cestas distribuídas em períodos de seca.',
    status: 'Concluído'
  },
  {
    id: 'proj_escola',
    title: 'Escola Bíblica Comunitária & Alfabetização',
    description: 'Ensino da Palavra e apoio à alfabetização básica com voluntários e professores locais, gerando novas perspectivas de futuro para as crianças.',
    impact: 'Mais de 500 crianças cadastradas e acompanhadas semanalmente.',
    status: 'Planejado'
  }
];

const INITIAL_UPCOMING_MISSIONS: UpcomingMission[] = [
  {
    id: 'mis_1',
    title: 'Caravana Missionária Beira & Sofala 2026/2027',
    date: 'Outubro de 2026 — Março de 2027',
    location: 'Beira e Província de Sofala, Moçambique',
    description: 'Viagem de evangelismo de impacto, atendimentos voluntários na área de saúde básica e dedicação de 2 novos poços artesianos nas aldeias.',
    status: 'Inscrições Abertas'
  },
  {
    id: 'mis_2',
    title: 'Conferência de Treinamento Pastoral de Moçambique',
    date: 'Fevereiro de 2027',
    location: 'Campus Beira / Dondo',
    description: 'Imersão teológica intensiva de 5 dias com pastores nacionais, distribuição de comentários bíblicos e fortalecimento ministerial.',
    status: 'Planejado'
  },
  {
    id: 'mis_3',
    title: 'Missão Kids & Ação Comunitária de Férias',
    date: 'Julho de 2027',
    location: 'Nampula e Sofala',
    description: 'Escolas bíblicas infantis, distribuição de materiais escolares, desenhos bíblicos para colorir e alimentação diária.',
    status: 'Planejado'
  }
];

const INITIAL_GALLERY: GalleryPhoto[] = [
  {
    id: 'gal_1',
    title: 'Sorrisos em Moçambique',
    url: childrenGroup1,
    date: 'Missão Sofala',
    caption: 'Crianças acolhidas em ação comunitária com alimentos e louvores.'
  },
  {
    id: 'gal_2',
    title: 'Inauguração de Poço de Água',
    url: childrenGroup2,
    date: 'Região de Beira',
    caption: 'Água limpa jorrando para centenas de famílias que antes caminhavam quilômetros.'
  },
  {
    id: 'gal_3',
    title: 'Alegria do Evangelho',
    url: childrenCloseUp,
    date: 'Ministério Infantil',
    caption: 'O brilho no olhar das crianças aprendendo as histórias de Jesus.'
  },
  {
    id: 'gal_4',
    title: 'Mural de Oração & Fé',
    url: prayerBannerImg,
    date: 'First Orlando',
    caption: 'Irmãos intercedendo continuamente pelas viagens e obreiros no campo.'
  }
];

export default function MenuTab({
  installation,
  initialSubView = 'menu',
  onNavigateToHome,
  onShowToast,
  selectedLanguage,
  onSelectLanguage,
  prayerRequests,
  onToggleAmen,
  onAddPrayerRequest,
  showPrayerModal,
  setShowPrayerModal,
}: MenuTabProps) {
  const [subView, setSubView] = useState<MenuSubView>(initialSubView);

  // Synchronize when initialSubView changes from parent
  useEffect(() => {
    if (initialSubView) {
      setSubView(initialSubView);
    }
  }, [initialSubView]);

  // 1. Nossa Missão text & Quem Somos text
  const whoWeAreText = LOCALIZED_WHO_WE_ARE[selectedLanguage] || LOCALIZED_WHO_WE_ARE.pt;
  const nossaMissaoText = LOCALIZED_OUR_MISSION[selectedLanguage] || LOCALIZED_OUR_MISSION.pt;

  // 2. Projetos Missionários state (persisted)
  const [projectsList, setProjectsList] = useState<MissionProject[]>(() => {
    const saved = localStorage.getItem('fb_custom_projects');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return INITIAL_PROJECTS;
      }
    }
    return INITIAL_PROJECTS;
  });
  const [showAddProjectForm, setShowAddProjectForm] = useState(false);
  const [newProjectTitle, setNewProjectTitle] = useState('');
  const [newProjectDesc, setNewProjectDesc] = useState('');
  const [newProjectImpact, setNewProjectImpact] = useState('');
  const [newProjectStatus, setNewProjectStatus] = useState<MissionProject['status']>('Em Andamento');
  const [selectedProjectDetail, setSelectedProjectDetail] = useState(false);

  // 3. Próximas Missões state (persisted)
  const [upcomingMissions, setUpcomingMissions] = useState<UpcomingMission[]>(() => {
    const saved = localStorage.getItem('fb_proximas_missoes');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return INITIAL_UPCOMING_MISSIONS;
      }
    }
    return INITIAL_UPCOMING_MISSIONS;
  });
  const [showAddMissionForm, setShowAddMissionForm] = useState(false);
  const [newMissionTitle, setNewMissionTitle] = useState('');
  const [newMissionDate, setNewMissionDate] = useState('');
  const [newMissionLocation, setNewMissionLocation] = useState('');
  const [newMissionDesc, setNewMissionDesc] = useState('');

  // 4. Galeria de fotos state (persisted)
  const [galleryPhotos, setGalleryPhotos] = useState<GalleryPhoto[]>(() => {
    const saved = localStorage.getItem('fb_gallery_photos');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return INITIAL_GALLERY;
      }
    }
    return INITIAL_GALLERY;
  });
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryPhoto | null>(null);
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);
  const photoInputRef = useRef<HTMLInputElement>(null);

  // 5. Seja um colaborador sub-tabs ('oracao' | 'doacao')
  const [colaboradorTab, setColaboradorTab] = useState<'oracao' | 'doacao'>('oracao');

  // 6. Kids area states (Duas divisões: Vídeos e Desenhos)
  const [kidsActiveDivision, setKidsActiveDivision] = useState<'videos' | 'desenhos'>('videos');
  const [selectedVideo, setSelectedVideo] = useState<KidsVideo | null>(null);
  const [selectedDrawing, setSelectedDrawing] = useState<ColoringDrawing | null>(null);
  const [brokenImageIds, setBrokenImageIds] = useState<Record<number, boolean>>({});
  const [isMiudosModalOpen, setIsMiudosModalOpen] = useState(false);

  // 7. Prayer form states inside collaborator
  const [prayerAuthor, setPrayerAuthor] = useState('');
  const [prayerText, setPrayerText] = useState('');
  const [prayerCategory, setPrayerCategory] = useState<PrayerRequest['category']>('Intercessão');

  const handleSubmitPrayer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prayerText.trim()) {
      onShowToast('Por favor, escreva o seu pedido de oração.');
      return;
    }
    const author = prayerAuthor.trim() || 'Irmão(ã) em Cristo';
    onAddPrayerRequest(author, prayerText.trim(), prayerCategory);
    setPrayerAuthor('');
    setPrayerText('');
    setPrayerCategory('Intercessão');
    setShowPrayerModal(false);
    onShowToast('Seu pedido de oração foi adicionado ao mural!');
  };

  // Handlers for Projects
  const handleAddProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProjectTitle.trim() || !newProjectDesc.trim()) {
      onShowToast('Por favor, preencha o título e a descrição do projeto.');
      return;
    }
    const newP: MissionProject = {
      id: 'proj_' + Date.now(),
      title: newProjectTitle.trim(),
      description: newProjectDesc.trim(),
      impact: newProjectImpact.trim() || 'Comunidade beneficiada com amor e suporte.',
      status: newProjectStatus
    };
    const updated = [newP, ...projectsList];
    setProjectsList(updated);
    localStorage.setItem('fb_custom_projects', JSON.stringify(updated));
    setNewProjectTitle('');
    setNewProjectDesc('');
    setNewProjectImpact('');
    setShowAddProjectForm(false);
    onShowToast('Novo projeto missionário adicionado!');
  };

  const handleDeleteProject = (id: string) => {
    const updated = projectsList.filter(p => p.id !== id);
    setProjectsList(updated);
    localStorage.setItem('fb_custom_projects', JSON.stringify(updated));
    onShowToast('Projeto removido.');
  };

  // Handlers for Upcoming Missions
  const handleAddMission = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMissionTitle.trim() || !newMissionDate.trim()) {
      onShowToast('Por favor, preencha o nome e o período da missão.');
      return;
    }
    const newM: UpcomingMission = {
      id: 'mis_' + Date.now(),
      title: newMissionTitle.trim(),
      date: newMissionDate.trim(),
      location: newMissionLocation.trim() || 'Moçambique',
      description: newMissionDesc.trim() || 'Ação voluntária e pregação do Evangelho.',
      status: 'Confirmado'
    };
    const updated = [newM, ...upcomingMissions];
    setUpcomingMissions(updated);
    localStorage.setItem('fb_proximas_missoes', JSON.stringify(updated));
    setNewMissionTitle('');
    setNewMissionDate('');
    setNewMissionLocation('');
    setNewMissionDesc('');
    setShowAddMissionForm(false);
    onShowToast('Nova missão agendada com sucesso!');
  };

  const handleDeleteMission = (id: string) => {
    const updated = upcomingMissions.filter(m => m.id !== id);
    setUpcomingMissions(updated);
    localStorage.setItem('fb_proximas_missoes', JSON.stringify(updated));
    onShowToast('Missão removida.');
  };

  // Handlers for Photo Gallery Upload
  const handlePhotoUpload = (file: File) => {
    if (!file.type.startsWith('image/')) {
      onShowToast('Selecione uma imagem válida (JPG, PNG).');
      return;
    }
    setIsUploadingPhoto(true);
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      if (dataUrl) {
        const newPhoto: GalleryPhoto = {
          id: 'photo_' + Date.now(),
          title: file.name.replace(/\.[^/.]+$/, '').slice(0, 30),
          url: dataUrl,
          date: 'Recém Adicionada',
          caption: 'Registro fotográfico das ações de Missão Moçambique.'
        };
        const updated = [newPhoto, ...galleryPhotos];
        setGalleryPhotos(updated);
        try {
          localStorage.setItem('fb_gallery_photos', JSON.stringify(updated));
        } catch {
          // localStorage quota catch
        }
        setIsUploadingPhoto(false);
        onShowToast('Foto adicionada à galeria!');
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDeletePhoto = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = galleryPhotos.filter(p => p.id !== id);
    setGalleryPhotos(updated);
    try {
      localStorage.setItem('fb_gallery_photos', JSON.stringify(updated));
    } catch {
      // ignore
    }
    onShowToast('Foto removida da galeria.');
  };

  // Print Kids drawing helper
  const handlePrintDrawing = (drawing: ColoringDrawing) => {
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8" />
            <title>${drawing.title} - Desenho Bíblico</title>
            <style>
              @page { size: A4 portrait; margin: 10mm; }
              body { font-family: sans-serif; text-align: center; margin: 0; padding: 20px; }
              h1 { font-size: 20px; margin-bottom: 4px; }
              p { font-size: 14px; color: #555; margin-top: 0; }
              img, svg { max-width: 90%; max-height: 70vh; margin: 20px auto; display: block; }
            </style>
          </head>
          <body>
            <h1>${drawing.title}</h1>
            <p>Missão Moçambique • First Orlando Campus Brasileiro</p>
            ${
              drawing.image && !brokenImageIds[drawing.id]
                ? `<img src="${drawing.image}" alt="${drawing.title}" />`
                : (drawing.svgPath ? `<svg viewBox="0 0 200 180" style="width: 80%; height: auto;">${drawing.svgPath}</svg>` : '')
            }
            <script>
              window.onload = () => { window.print(); window.close(); };
            </script>
          </body>
        </html>
      `);
      printWindow.document.close();
    }
  };

  const handleShareDrawing = (drawing: ColoringDrawing) => {
    if (navigator.share) {
      navigator.share({
        title: `${drawing.title} - Missão Moçambique`,
        text: `Desenho bíblico para colorir: ${drawing.title}. Disponível na Missão Moçambique!`,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      onShowToast('Link copiado para compartilhar!');
    }
  };

  // Menu items list configuration (dynamically localized)
  const MENU_ITEMS = useMemo(() => [
    {
      id: 'quem-somos',
      title: t('menu_quem_somos', selectedLanguage),
      desc: t('menu_quem_somos_desc', selectedLanguage),
      icon: Users,
      color: 'text-sky-400',
      bgColor: 'bg-sky-500/15'
    },
    {
      id: 'nossa-missao',
      title: t('menu_nossa_missao', selectedLanguage),
      desc: t('menu_nossa_missao_desc', selectedLanguage),
      icon: Compass,
      color: 'text-[#f1a30a]',
      bgColor: 'bg-[#f1a30a]/15'
    },
    {
      id: 'projetos',
      title: t('menu_projetos', selectedLanguage),
      desc: t('menu_projetos_desc', selectedLanguage),
      icon: Layers,
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-500/15'
    },
    {
      id: 'proximas-missoes',
      title: t('menu_proximas_missoes', selectedLanguage),
      desc: t('menu_proximas_missoes_desc', selectedLanguage),
      icon: Calendar,
      color: 'text-amber-400',
      bgColor: 'bg-amber-500/15'
    },
    {
      id: 'kids',
      title: t('menu_kids', selectedLanguage),
      desc: t('menu_kids_desc', selectedLanguage),
      icon: Palette,
      color: 'text-pink-400',
      bgColor: 'bg-pink-500/15'
    },
    {
      id: 'galeria',
      title: t('menu_galeria', selectedLanguage),
      desc: t('menu_galeria_desc', selectedLanguage),
      icon: ImageIcon,
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/15'
    },
    {
      id: 'colaborador',
      title: t('menu_colaborador', selectedLanguage),
      desc: t('menu_colaborador_desc', selectedLanguage),
      icon: HeartHandshake,
      color: 'text-rose-400',
      bgColor: 'bg-rose-500/15'
    },
    {
      id: 'fale-conosco',
      title: t('menu_fale_conosco', selectedLanguage),
      desc: t('menu_fale_conosco_desc', selectedLanguage),
      icon: MessageCircle,
      color: 'text-teal-400',
      bgColor: 'bg-teal-500/15'
    }
  ], [selectedLanguage]);

  return (
    <div className="w-full min-h-full flex flex-col text-slate-100 pb-16 px-0 select-none">
      {/* 1. TOP HEADER BAR (Only visible inside subviews to provide the Back button) */}
      {subView !== 'menu' && (
        <header className="sticky top-0 z-30 bg-[#041d34]/95 backdrop-blur-md border-b border-[#0b2d4f] px-4 pt-[max(2.5rem,calc(env(safe-area-inset-top,0px)+0.5rem))] pb-3 flex items-center justify-between gap-2">
          <button
            type="button"
            onClick={() => setSubView('menu')}
            className="flex items-center gap-1 text-xs text-[#f1a30a] hover:text-amber-300 font-bold transition active:scale-95 py-1 px-1.5 -ml-1 rounded-lg shrink-0"
          >
            <ChevronLeft className="w-[18px] h-[18px]" />
            <span>{t('menu_back', selectedLanguage)}</span>
          </button>
        </header>
      )}

      {/* 2. VIEWS CONTAINER */}
      <div className="flex-1 w-full max-w-lg mx-auto">
        <AnimatePresence mode="wait">
          {/* ============================================================= */}
          {/* MAIN MENU HUB: Displays the 8 items with high-class typography */}
          {/* ============================================================= */}
          {subView === 'menu' && (
            <motion.div
              key="main-menu-view"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="space-y-4 p-4 pt-[max(1.25rem,calc(env(safe-area-inset-top,0px)+0.75rem))]"
            >
              {/* Top Mission Banner */}
              <div className="relative rounded-2xl overflow-hidden h-36 shadow-lg border border-[#0b2d4f] group">
                <img
                  src={childrenGroup1}
                  alt="Missão Moçambique"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#021325] via-[#021325]/50 to-transparent" />
                <div className="absolute inset-x-4 bottom-3 text-left">
                  <span className="text-[9px] font-bold tracking-wider bg-[#f1a30a] text-slate-950 px-2 py-0.5 rounded-full uppercase">
                    {t('menu_banner_badge', selectedLanguage)}
                  </span>
                  <h3 className="text-base font-black text-white mt-1 leading-tight">
                    {t('menu_banner_title', selectedLanguage)}
                  </h3>
                  <p className="text-xs text-slate-200 line-clamp-1 italic font-serif">
                    {t('menu_banner_desc', selectedLanguage)}
                  </p>
                </div>
              </div>

              {/* Menu Items List */}
              <div className="space-y-2">
                <InstallMenuItem installation={installation} language={selectedLanguage} onShowToast={onShowToast} />
                {MENU_ITEMS.map((item) => {
                  const Icon = item.icon;
                  return (
                    <motion.button
                      key={item.id}
                      type="button"
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      onClick={() => setSubView(item.id as MenuSubView)}
                      className="w-full bg-[#031d38] hover:bg-[#05284d] border border-[#0b2d4f] hover:border-[#f1a30a]/40 p-3.5 rounded-xl flex items-center justify-between transition-all group text-left shadow-sm"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className={`w-10 h-10 rounded-xl ${item.bgColor} ${item.color} flex items-center justify-center shrink-0 shadow-inner group-hover:scale-105 transition-transform`}>
                          <Icon className="w-[23px] h-[23px]" />
                        </div>
                        <div className="min-w-0">
                          <h4 className="text-sm font-bold text-white group-hover:text-[#f1a30a] transition-colors">
                            {item.title}
                          </h4>
                          <p className="text-xs text-slate-300 truncate">
                            {item.desc}
                          </p>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-[#f1a30a] group-hover:translate-x-0.5 transition-all shrink-0 ml-2" />
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* ============================================================= */}
          {/* 1. QUEM SOMOS */}
          {/* ============================================================= */}
          {subView === 'quem-somos' && (
            <motion.div
              key="quem-somos-view"
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              className="space-y-4 p-4 text-left"
            >
              {/* Header Card */}
              <div className="bg-[#031d38] border border-[#0b2d4f] rounded-2xl p-5 space-y-4 shadow-md">
                <div className="flex items-center justify-between border-b border-[#0b2d4f] pb-3">
                  <div className="flex flex-col">
                    <span className="text-sm font-black text-white tracking-wide">MISSÃO MOÇAMBIQUE</span>
                    <span className="text-[10px] text-[#f1a30a] font-semibold tracking-wider uppercase">
                      {selectedLanguage === 'en' ? 'Ministry & Social Outreach' : selectedLanguage === 'es' ? 'Ministerio y Acción Social' : 'Ministério e Ação Social'}
                    </span>
                  </div>
                  <span className="text-[10px] font-bold text-[#f1a30a] bg-[#f1a30a]/10 border border-[#f1a30a]/30 px-2.5 py-1 rounded-full uppercase tracking-wider">
                    {selectedLanguage === 'en' ? 'Official' : 'Oficial'}
                  </span>
                </div>

                {/* Requested Official Text */}
                <div className="space-y-2">
                  <h3 className="text-xs font-bold text-[#f1a30a] uppercase tracking-wider">
                    {t('menu_quem_somos', selectedLanguage)}
                  </h3>
                  <div className="text-sm text-slate-100 font-serif leading-relaxed bg-[#011122] p-4 sm:p-5 rounded-xl border border-[#0b2d4f]/60 shadow-inner space-y-3">
                    {whoWeAreText.map((paragraph, idx) => (
                      <p key={idx} className="italic text-justify sm:text-left leading-relaxed">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>

                {/* Carrossel de Fotos das Crianças - Logo abaixo do texto */}
                <div className="pt-1">
                  <ChildrenCarousel />
                </div>

                {/* Pastoral Oversight */}
                <div className="p-3.5 bg-[#021326] rounded-xl border border-[#0b2d4f] space-y-1">
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Liderança & Supervisão</span>
                  <p className="text-xs text-slate-200">
                    Sob a liderança pastoral da <strong>First Baptist Orlando</strong> e coordenação do <strong>Campus Brasileiro</strong>, assegurando integridade, transparência e fidelidade às Escrituras.
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* ============================================================= */}
          {/* 2. NOSSA MISSÃO: With field to add/edit the mission text */}
          {/* ============================================================= */}
          {subView === 'nossa-missao' && (
            <motion.div
              key="nossa-missao-view"
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              className="space-y-4 p-4 text-left"
            >
              <div className="bg-[#031d38] border border-[#0b2d4f] rounded-2xl p-5 space-y-4 shadow-md">
                <div className="flex items-center justify-between border-b border-[#0b2d4f] pb-3">
                  <div className="flex flex-col">
                    <span className="text-sm font-black text-white tracking-wide">MISSÃO MOÇAMBIQUE</span>
                    <span className="text-[10px] text-[#f1a30a] font-semibold tracking-wider uppercase">
                      {selectedLanguage === 'en' ? 'Calling & Commitment' : selectedLanguage === 'es' ? 'Llamado y Compromiso' : 'Chamado e Compromisso'}
                    </span>
                  </div>
                  <span className="text-[10px] font-bold text-[#f1a30a] bg-[#f1a30a]/10 border border-[#f1a30a]/30 px-2.5 py-1 rounded-full uppercase tracking-wider">
                    {selectedLanguage === 'en' ? 'Official' : 'Oficial'}
                  </span>
                </div>

                {/* Requested Official Text */}
                <div className="space-y-2">
                  <h3 className="text-xs font-bold text-[#f1a30a] uppercase tracking-wider">
                    {t('menu_nossa_missao', selectedLanguage)}
                  </h3>
                  <div className="text-sm text-slate-100 font-serif leading-relaxed bg-[#011122] p-4 sm:p-5 rounded-xl border border-[#0b2d4f]/60 shadow-inner space-y-3">
                    {nossaMissaoText.map((paragraph, idx) => (
                      <p key={idx} className="italic text-justify sm:text-left leading-relaxed">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>

                {/* Carrossel de Imagens das Crianças - Logo abaixo do texto */}
                <div className="pt-1">
                  <ChildrenCarousel />
                </div>
              </div>
            </motion.div>
          )}

          {/* ============================================================= */}
          {/* ============================================================= */}
          {/* 3. PROJETOS MISSIONÁRIOS: Igreja em Lugares Difíceis */}
          {/* ============================================================= */}
          {subView === 'projetos' && (
            <motion.div
              key="projetos-view"
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              className="space-y-4 p-4 text-left"
            >
              {!selectedProjectDetail ? (
                /* LISTA DE PROJETOS */
                <div className="space-y-3">
                  <div className="mb-2">
                    <h3 className="text-base font-black text-white">
                      {t('menu_projetos', selectedLanguage)}
                    </h3>
                    <p className="text-xs text-slate-300">
                      {selectedLanguage === 'en' ? 'Select a project below to learn more' : selectedLanguage === 'es' ? 'Selecciona un proyecto a continuación para saber más' : 'Selecione um projeto abaixo para conhecer os detalhes'}
                    </p>
                  </div>

                  <div
                    onClick={() => setSelectedProjectDetail(true)}
                    className="bg-[#031d38] hover:bg-[#062c54] active:scale-[0.99] border border-[#0b2d4f] hover:border-[#f1a30a]/50 p-4 rounded-2xl flex items-center justify-between gap-4 cursor-pointer transition shadow-md group"
                  >
                    <div className="flex items-center gap-4">
                      {/* Ícone customizado da igreja */}
                      <div className="w-14 h-14 rounded-2xl bg-[#2d3e2b] border border-[#d4dec4]/30 flex items-center justify-center shrink-0 shadow-md relative overflow-hidden group-hover:scale-105 transition-transform">
                        <svg viewBox="0 0 100 100" className="w-10 h-10 text-[#d4dec4]" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="50" cy="50" r="45" stroke="#d4dec4" strokeWidth="4" fill="#2d3e2b" />
                          <circle cx="50" cy="50" r="35" stroke="#d4dec4" strokeWidth="2" strokeDasharray="4 4" />
                          <circle cx="50" cy="24" r="8" stroke="#d4dec4" strokeWidth="2.5" />
                          <path d="M50 18V30M46 22H54" stroke="#d4dec4" strokeWidth="2.5" />
                          <path d="M35 48L50 38L65 48V68H35V48Z" fill="#2d3e2b" stroke="#d4dec4" strokeWidth="2.5" />
                          <path d="M44 68V56C44 53 56 53 56 56V68" stroke="#d4dec4" strokeWidth="2.5" />
                          <path d="M20 74C35 66 65 66 80 74M15 82C35 74 65 74 85 82" stroke="#d4dec4" strokeWidth="2.5" />
                        </svg>
                      </div>

                      <div className="space-y-1">
                        <h4 className="text-sm sm:text-base font-black text-white group-hover:text-[#f1a30a] transition-colors">
                          Igreja em lugares difíceis
                        </h4>
                        <p className="text-xs text-[#f1a30a] font-semibold">
                          Clique e conheça o projeto
                        </p>
                      </div>
                    </div>

                    <div className="w-9 h-9 rounded-full bg-[#02182b] border border-[#0b2d4f] flex items-center justify-center text-slate-300 group-hover:text-[#f1a30a] group-hover:border-[#f1a30a]/40 transition shrink-0">
                      <ChevronRight className="w-5 h-5" />
                    </div>
                  </div>
                </div>
              ) : (
                /* DETALHES DO PROJETO */
                <div className="space-y-4">
                  <button
                    type="button"
                    onClick={() => setSelectedProjectDetail(false)}
                    className="inline-flex items-center gap-2 text-xs font-bold text-[#f1a30a] hover:underline bg-[#031d38] border border-[#0b2d4f] px-3.5 py-2 rounded-xl transition cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>{selectedLanguage === 'en' ? 'Back to Projects' : selectedLanguage === 'es' ? 'Volver a Proyectos' : 'Voltar aos Projetos'}</span>
                  </button>

                  {/* Header Card */}
                  <div className="bg-[#031d38] border border-[#0b2d4f] rounded-2xl p-5 space-y-4 shadow-md">
                    <div className="flex items-center justify-between border-b border-[#0b2d4f] pb-3">
                      <div className="flex flex-col">
                        <span className="text-sm font-black text-white tracking-wide">MISSÃO MOÇAMBIQUE</span>
                        <span className="text-[10px] text-[#f1a30a] font-semibold tracking-wider uppercase">
                          Igreja em Lugares Difíceis • Beira
                        </span>
                      </div>
                      <span className="text-[10px] font-bold text-[#f1a30a] bg-[#f1a30a]/10 border border-[#f1a30a]/30 px-2.5 py-1 rounded-full uppercase tracking-wider">
                        {selectedLanguage === 'en' ? 'Official' : 'Oficial'}
                      </span>
                    </div>

                    <div className="space-y-1">
                      <h3 className="text-xs font-bold text-[#f1a30a] uppercase tracking-wider">
                        {t('menu_projects_title', selectedLanguage)}
                      </h3>
                      <p className="text-xs text-slate-300">
                        {selectedLanguage === 'en' ? 'Church Planting & Pastoral Training in Beira, Mozambique' : selectedLanguage === 'es' ? 'Plantación de Iglesias y Capacitación Pastoral en Beira' : 'Plantação de Igrejas e Capacitação Pastoral em Beira, Moçambique'}
                      </p>
                    </div>
                  </div>

                  {/* Video no Topo */}
                  <div className="bg-[#02182b] border border-[#0b2d4f] rounded-2xl overflow-hidden shadow-xl">
                    <div className="relative aspect-video w-full bg-black">
                      <video
                        controls
                        playsInline
                        preload="metadata"
                        poster="/ild_beira_poster.jpg"
                        className="w-full h-full object-cover"
                      >
                        <source src="/ild_beira.mp4" type="video/mp4" />
                        Seu navegador não suporta a reprodução deste vídeo.
                      </video>
                    </div>
                    <div className="p-3 bg-[#031d38] border-t border-[#0b2d4f] flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5 text-[11px] text-slate-300">
                        <MapPin className="w-3.5 h-3.5 text-[#f1a30a] shrink-0" />
                        <span className="font-medium">Nhamatanda, Região de Beira • Moçambique</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <a
                          href="https://www.instagram.com/reel/DFd8jSwN7nc/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-[11px] font-bold text-pink-400 hover:text-pink-300 bg-pink-500/10 hover:bg-pink-500/20 px-2.5 py-1 rounded-lg border border-pink-500/30 transition"
                        >
                          <Instagram className="w-3 h-3" />
                          <span>Instagram</span>
                        </a>
                        <a
                          href="https://igrejaemlugaresdificeis.com/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-[11px] font-bold text-[#f1a30a] hover:text-amber-300 bg-[#f1a30a]/10 hover:bg-[#f1a30a]/20 px-2.5 py-1 rounded-lg border border-[#f1a30a]/30 transition"
                        >
                          <Globe className="w-3 h-3" />
                          <span>Website</span>
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Bloco 1: Igreja em Lugares Difíceis */}
                  <div className="bg-[#031d38] border border-[#0b2d4f] p-4 rounded-2xl space-y-2 shadow-sm">
                    <h4 className="text-sm font-black text-[#f1a30a]">
                      Igreja em lugares difíceis
                    </h4>
                    <p className="text-xs text-slate-200 leading-relaxed font-sans">
                      Auxiliamos na plantação e fortalecimento de igrejas locais bíblicas, com liderança fiel e discipulado consistente, em alguns dos lugares mais difíceis do mundo.
                    </p>
                  </div>

                  {/* Bloco 2: Propósito */}
                  <div className="bg-[#031d38] border border-[#0b2d4f] p-4 rounded-2xl space-y-2 shadow-sm">
                    <h4 className="text-sm font-black text-white">
                      Propósito
                    </h4>
                    <p className="text-xs text-slate-200 leading-relaxed font-sans">
                      <strong className="text-white">Igreja local como instrumento de Deus:</strong> Auxiliamos na plantação e fortalecimento de igrejas locais bíblicas, com liderança fiel e discipulado consistente.
                    </p>
                  </div>

                  {/* Bloco 3: Fundador e Pastor */}
                  <div className="bg-[#031d38] border border-[#0b2d4f] p-4 rounded-2xl space-y-2.5 shadow-sm">
                    <h4 className="text-sm font-black text-white">
                      Fundador e Pastor: Dilvan de Jesus Oliveira
                    </h4>
                    <p className="text-xs text-slate-200 leading-relaxed font-sans">
                      O pastor Dilvan de Jesus Oliveira é o fundador e líder do Igreja em Lugares Difíceis. Ele e sua esposa, Cássia, dedicam-se integralmente ao ministério de plantação de igrejas e formação de líderes em comunidades pobres e remotas. O pastor Dilvan é responsável pela direção geral do ministério, supervisão do programa de aprendizagem e cuidado pastoral dos alunos e suas famílias.
                    </p>
                  </div>

                  {/* Bloco 4: Entre em Contato com a Equipe */}
                  <div className="bg-[#031d38] border border-[#0b2d4f] p-4 rounded-2xl space-y-3 shadow-sm">
                    <div>
                      <h4 className="text-sm font-black text-white">
                        Entre em Contato com a Equipe
                      </h4>
                      <p className="text-xs text-slate-300 mt-1">
                        Para saber mais sobre o trabalho do Igreja em Lugares Difíceis.
                      </p>
                    </div>

                    <div className="space-y-2 pt-1 border-t border-[#0b2d4f]/60 text-xs">
                      <div className="flex items-center gap-2 text-slate-200">
                        <Mail className="w-4 h-4 text-[#f1a30a] shrink-0" />
                        <span>
                          <strong className="text-white">E-mail:</strong>{' '}
                          <a
                            href="mailto:contato@igrejaemlugaresdificeis.com"
                            className="text-[#f1a30a] hover:underline font-mono"
                          >
                            contato@igrejaemlugaresdificeis.com
                          </a>
                        </span>
                      </div>

                      <div className="flex items-start gap-2 text-slate-200">
                        <Users className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                        <span>
                          <strong className="text-white">Redes sociais:</strong> Siga-nos no Instagram e Facebook para acompanhar novidades.
                        </span>
                      </div>

                      <div className="flex items-start gap-2 text-slate-200">
                        <Sparkles className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>
                          <strong className="text-white">Newsletter:</strong> Inscreva-se para receber atualizações mensais.
                        </span>
                      </div>
                    </div>

                    {/* Direct Action Buttons */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                      <a
                        href="https://www.instagram.com/reel/DFd8jSwN7nc/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white font-bold text-xs transition shadow-md"
                      >
                        <Instagram className="w-4 h-4" />
                        <span>Instagram</span>
                        <ExternalLink className="w-3.5 h-3.5 ml-auto opacity-70" />
                      </a>

                      <a
                        href="https://igrejaemlugaresdificeis.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-[#011122] hover:bg-[#02182b] text-[#f1a30a] hover:text-amber-300 border border-[#f1a30a]/40 font-bold text-xs transition shadow-md"
                      >
                        <Globe className="w-4 h-4" />
                        <span>Website</span>
                        <ExternalLink className="w-3.5 h-3.5 ml-auto opacity-70" />
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {/* ============================================================= */}
          {/* 4. PRÓXIMAS MISSÕES: With field to add upcoming missions */}
          {/* ============================================================= */}
          {subView === 'proximas-missoes' && (
            <motion.div
              key="proximas-missoes-view"
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              className="space-y-4 p-4 text-left"
            >
              {/* Header Card */}
              <div className="bg-[#031d38] border border-[#0b2d4f] rounded-2xl p-5 space-y-4 shadow-md">
                <div className="flex items-center justify-between border-b border-[#0b2d4f] pb-3">
                  <div className="flex flex-col">
                    <span className="text-sm font-black text-white tracking-wide">MISSÃO MOÇAMBIQUE</span>
                    <span className="text-[10px] text-[#f1a30a] font-semibold tracking-wider uppercase">
                      {selectedLanguage === 'en' ? 'Upcoming Journeys & Events' : selectedLanguage === 'es' ? 'Próximas Misiones y Viajes' : 'Próximas Missões e Viagens'}
                    </span>
                  </div>
                  <span className="text-[10px] font-bold text-[#f1a30a] bg-[#f1a30a]/10 border border-[#f1a30a]/30 px-2.5 py-1 rounded-full uppercase tracking-wider">
                    {selectedLanguage === 'en' ? 'Official' : 'Oficial'}
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="text-xs font-bold text-[#f1a30a] uppercase tracking-wider">
                    {t('menu_missions_title', selectedLanguage)}
                  </h3>
                  <div className="text-sm text-slate-100 font-serif leading-relaxed bg-[#011122] p-4 sm:p-5 rounded-xl border border-[#0b2d4f]/60 shadow-inner space-y-3">
                    <h4 className="text-sm font-black text-white font-sans">Caravanas & Viagens Missionárias</h4>
                    <p className="text-xs text-slate-300 leading-relaxed font-sans">
                      As próximas datas oficiais de viagens, caravanas humanitárias e treinamentos ministeriais serão anunciadas em breve em nossos canais oficiais.
                    </p>
                    <div className="pt-2">
                      <button
                        type="button"
                        onClick={() => setSubView('fale-conosco')}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#031d38] hover:bg-[#072445] text-[#f1a30a] border border-[#f1a30a]/30 text-xs font-bold transition shadow-sm font-sans"
                      >
                        <span>Informações & Contato</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* ============================================================= */}
          {/* 5. KIDS: Complete coloring and biblical activity experience */}
          {/* ============================================================= */}
          {subView === 'kids' && (
            <motion.div
              key="kids-view"
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              className="space-y-4 p-4 text-left"
            >
              {/* Kids Header Banner - Destaque com miudos.jpeg */}
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#031d38] via-[#073361] to-[#021830] border border-amber-400/40 p-4 sm:p-5 shadow-xl text-white">
                {/* Ambient glow effects */}
                <div className="absolute -top-10 -right-10 w-48 h-48 bg-amber-500/15 rounded-full blur-2xl pointer-events-none" />
                <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-blue-500/15 rounded-full blur-2xl pointer-events-none" />

                <div className="relative z-10 flex flex-col sm:flex-row items-center sm:items-start gap-4">
                  {/* Artwork Image Container with prominent highlight */}
                  <div
                    onClick={() => setIsMiudosModalOpen(true)}
                    className="group relative w-24 h-24 sm:w-28 sm:h-28 aspect-square shrink-0 rounded-2xl overflow-hidden shadow-[0_8px_24px_rgba(0,0,0,0.5)] border-2 border-amber-400/60 cursor-pointer bg-[#021740] transition-transform duration-300 hover:scale-105"
                    title="Toque para ampliar"
                  >
                    <img
                      src={miudosImg}
                      alt="Moçambique Miúdos"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="p-1.5 rounded-full bg-black/75 text-amber-300 border border-amber-400/50 backdrop-blur-md shadow-md">
                        <Maximize2 className="w-4 h-4" />
                      </span>
                    </div>
                  </div>

                  {/* Text */}
                  <div className="flex-1 text-center sm:text-left space-y-1 self-center">
                    <h3 className="text-base sm:text-lg font-black text-white leading-tight">
                      {t('menu_kids_title', selectedLanguage)}
                    </h3>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Cultivando a fé desde cedo: divirta-se com nossa seleção de vídeos bíblicos infantis e baixe desenhos incríveis para colorir em família.
                    </p>
                  </div>
                </div>
              </div>

              {/* Lightbox Modal for Miudos Logo */}
              <AnimatePresence>
                {isMiudosModalOpen && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setIsMiudosModalOpen(false)}
                    className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex flex-col items-center justify-center p-4"
                  >
                    <div
                      className="relative max-w-sm sm:max-w-md w-full flex flex-col items-center"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button
                        type="button"
                        onClick={() => setIsMiudosModalOpen(false)}
                        className="absolute -top-12 right-0 w-9 h-9 rounded-full bg-white/15 hover:bg-white/25 text-white flex items-center justify-center transition"
                        aria-label="Close"
                      >
                        <X className="w-5 h-5" />
                      </button>
                      <img
                        src={miudosImg}
                        alt="Moçambique Miúdos"
                        className="w-full aspect-square object-contain rounded-3xl shadow-2xl border-2 border-amber-400/50"
                      />
                      <p className="mt-3 text-center text-sm font-bold text-white font-sans">
                        Moçambique Miúdos
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* DIVISÕES KIDS: VÍDEOS E DESENHOS */}
              <div className="flex items-center gap-2 p-1.5 bg-[#011122] rounded-xl border border-[#0b2d4f] shadow-inner">
                <button
                  type="button"
                  onClick={() => setKidsActiveDivision('videos')}
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-xs font-bold transition-all ${
                    kidsActiveDivision === 'videos'
                      ? 'bg-[#f1a30a] text-[#020b18] shadow-md font-black'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Video className="w-4 h-4" />
                  <span>Vídeos</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono font-bold ${
                    kidsActiveDivision === 'videos' ? 'bg-[#020b18]/25 text-[#020b18]' : 'bg-[#0a2544] text-[#f1a30a]'
                  }`}>
                    {KIDS_VIDEOS.length}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setKidsActiveDivision('desenhos')}
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-xs font-bold transition-all ${
                    kidsActiveDivision === 'desenhos'
                      ? 'bg-[#f1a30a] text-[#020b18] shadow-md font-black'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Palette className="w-4 h-4" />
                  <span>Desenhos</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono font-bold ${
                    kidsActiveDivision === 'desenhos' ? 'bg-[#020b18]/25 text-[#020b18]' : 'bg-[#0a2544] text-[#f1a30a]'
                  }`}>
                    {COLORING_DRAWINGS.length}
                  </span>
                </button>
              </div>

              {/* ========================================================= */}
              {/* ========================================================= */}
              {/* DIVISÃO 1: VÍDEOS BÍBLICOS INFANTIS */}
              {/* ========================================================= */}
              {kidsActiveDivision === 'videos' && (
                <div className="space-y-3.5">
                  {/* Videos Grid - Todos os vídeos e playlists solicitados */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {KIDS_VIDEOS.map((video) => (
                      <div
                        key={video.id}
                        className="bg-[#031d38] border border-[#0b2d4f] rounded-2xl overflow-hidden flex flex-col shadow-sm group hover:border-[#f1a30a]/40 transition"
                      >
                        {/* Thumbnail with 16:9 Aspect Ratio and Play Overlay */}
                        <div
                          onClick={() => setSelectedVideo(video)}
                          className="relative aspect-video w-full overflow-hidden bg-slate-950 cursor-pointer"
                          title="Clique para assistir"
                        >
                          <img
                            src={video.thumbnail}
                            alt={video.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                          {/* Dark gradient overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/35" />

                          {/* Center Play Icon Button */}
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-12 h-12 rounded-full bg-[#f1a30a] text-[#020b18] flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110">
                              <Play className="w-5 h-5 fill-current ml-0.5" />
                            </div>
                          </div>

                          {/* Duration / Type Badge */}
                          {video.duration && (
                            <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/85 text-amber-300 text-[10px] font-mono font-bold shadow-md border border-white/10">
                              {video.duration}
                            </div>
                          )}

                          {/* Channel / Category Badge */}
                          {video.channel && (
                            <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-[#011122]/90 text-white text-[9.5px] font-bold uppercase tracking-wider border border-[#0b2d4f]">
                              {video.channel}
                            </div>
                          )}
                        </div>

                        {/* Video Details */}
                        <div className="p-3.5 flex-1 flex flex-col justify-between space-y-2.5">
                          <div>
                            <h4 className="text-xs sm:text-sm font-bold text-white group-hover:text-[#f1a30a] transition-colors leading-snug line-clamp-2">
                              {video.title}
                            </h4>
                            <p className="text-[11px] text-slate-300 line-clamp-2 mt-1 leading-relaxed">
                              {video.summary}
                            </p>
                          </div>

                          {/* Action Buttons */}
                          <div className="grid grid-cols-2 gap-2 pt-1 border-t border-[#0b2d4f]/60">
                            <button
                              type="button"
                              onClick={() => setSelectedVideo(video)}
                              className="bg-[#f1a30a] hover:bg-[#df9508] text-[#020b18] py-2 px-2 rounded-xl text-[11px] font-black flex items-center justify-center gap-1.5 transition shadow-sm active:scale-95"
                            >
                              <Play className="w-3.5 h-3.5 fill-current" />
                              <span>Assistir</span>
                            </button>
                            <a
                              href={video.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="bg-[#011122] hover:bg-[#02182b] text-slate-200 hover:text-white py-2 px-2 rounded-xl text-[11px] font-bold flex items-center justify-center gap-1.5 transition border border-[#0b2d4f] active:scale-95"
                            >
                              <Youtube className="w-3.5 h-3.5 text-red-500" />
                              <span>YouTube</span>
                            </a>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Channel Banner Callout */}
                  <div className="mt-4 p-4 rounded-2xl bg-[#011122] border border-[#0b2d4f] flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-red-600 text-white flex items-center justify-center shrink-0 shadow-md">
                        <Youtube className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-white">Canal Oficial no YouTube</h4>
                        <p className="text-[10px] text-slate-400">Inscreva-se no First Orlando Brasil para mais conteúdos</p>
                      </div>
                    </div>
                    <a
                      href="https://www.youtube.com/@firstorlandobrasil"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-1.5 rounded-xl bg-[#031d38] hover:bg-[#072d54] text-[#f1a30a] border border-[#f1a30a]/40 text-xs font-bold transition flex items-center gap-1.5 shrink-0"
                    >
                      <span>Acessar Canal</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              )}

              {/* ========================================================= */}
              {/* DIVISÃO 2: DESENHOS BÍBLICOS PARA COLORIR */}
              {/* ========================================================= */}
              {kidsActiveDivision === 'desenhos' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {COLORING_DRAWINGS.map((drawing) => (
                    <div
                      key={drawing.id}
                      className="bg-[#031d38] border border-[#0b2d4f] rounded-2xl overflow-hidden flex flex-col shadow-sm group hover:border-[#f1a30a]/40 transition"
                    >
                      {/* Drawing canvas preview */}
                      <div
                        onClick={() => setSelectedDrawing(drawing)}
                        className="p-3 bg-white/95 cursor-pointer relative flex items-center justify-center group-hover:scale-[1.01] transition"
                        title="Toque para ampliar"
                      >
                        <div className="w-full aspect-[4/3] flex items-center justify-center overflow-hidden">
                          {drawing.image && !brokenImageIds[drawing.id] ? (
                            <img
                              src={drawing.image}
                              alt={drawing.title}
                              className="w-full h-full object-contain"
                              onError={() => setBrokenImageIds((prev) => ({ ...prev, [drawing.id]: true }))}
                            />
                          ) : (
                            <svg
                              viewBox="0 0 200 180"
                              className="w-full h-full object-contain"
                              dangerouslySetInnerHTML={{ __html: drawing.svgPath || '' }}
                            />
                          )}
                        </div>
                        <div className="absolute inset-0 bg-slate-950/20 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-1 text-white font-bold text-xs bg-black/40">
                          <Maximize2 className="w-4 h-4" />
                          <span>Ampliar</span>
                        </div>
                      </div>

                      {/* Card Actions */}
                      <div className="p-3 flex-1 flex flex-col justify-between space-y-2">
                        <div>
                          <h4 className="text-xs font-bold text-white group-hover:text-[#f1a30a] transition-colors line-clamp-1">
                            {drawing.title}
                          </h4>
                        </div>

                        <div className="grid grid-cols-3 gap-1.5 pt-1">
                          <button
                            type="button"
                            onClick={() => handlePrintDrawing(drawing)}
                            className="bg-[#011122] hover:bg-[#02182b] text-slate-200 py-1.5 px-2 rounded-lg text-[10px] font-bold flex items-center justify-center gap-1 transition border border-[#0b2d4f]"
                          >
                            <Printer className="w-3 h-3 text-[#f1a30a]" />
                            <span>Imprimir</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => handleShareDrawing(drawing)}
                            className="bg-[#011122] hover:bg-[#02182b] text-slate-200 py-1.5 px-2 rounded-lg text-[10px] font-bold flex items-center justify-center gap-1 transition border border-[#0b2d4f]"
                          >
                            <Share2 className="w-3 h-3 text-sky-400" />
                            <span>Enviar</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => setSelectedDrawing(drawing)}
                            className="bg-[#f1a30a]/20 hover:bg-[#f1a30a]/30 text-[#f1a30a] py-1.5 px-2 rounded-lg text-[10px] font-bold flex items-center justify-center gap-1 transition border border-[#f1a30a]/40"
                          >
                            <Maximize2 className="w-3 h-3" />
                            <span>Ver</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* MODAL PLAYER DE VÍDEO RESPONSIVO */}
              <AnimatePresence>
                {selectedVideo && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setSelectedVideo(null)}
                    className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex flex-col items-center justify-center p-3 sm:p-4"
                  >
                    <div
                      className="relative max-w-xl w-full bg-[#021326] border border-[#0b2d4f] rounded-2xl overflow-hidden shadow-2xl flex flex-col"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {/* Modal Header */}
                      <div className="p-3.5 bg-[#031d38] border-b border-[#0b2d4f] flex items-center justify-between">
                        <div className="flex items-center gap-2 min-w-0 pr-2">
                          <div className="w-7 h-7 rounded-lg bg-[#f1a30a] text-[#020b18] flex items-center justify-center shrink-0">
                            <Video className="w-4 h-4" />
                          </div>
                          <div className="min-w-0 flex-1">
                            {selectedVideo.channel && (
                              <span className="text-[10px] text-[#f1a30a] font-bold uppercase tracking-wider block">
                                {selectedVideo.channel}
                              </span>
                            )}
                            <h3 className="text-xs sm:text-sm font-bold text-white truncate">
                              {selectedVideo.title}
                            </h3>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => setSelectedVideo(null)}
                          className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition shrink-0"
                          aria-label="Fechar"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>

                      {/* 16:9 Video Player Frame */}
                      <div className="relative aspect-video w-full bg-black">
                        <iframe
                          src={
                            selectedVideo.isPlaylist && selectedVideo.playlistId
                              ? `https://www.youtube-nocookie.com/embed/videoseries?list=${selectedVideo.playlistId}&autoplay=1`
                              : `https://www.youtube-nocookie.com/embed/${selectedVideo.youtubeId}?autoplay=1&rel=0&modestbranding=1`
                          }
                          title={selectedVideo.title}
                          className="w-full h-full border-0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      </div>

                      {/* Modal Footer Info & Actions */}
                      <div className="p-4 space-y-3 bg-[#011122]">
                        <p className="text-xs text-slate-200 leading-relaxed font-sans">
                          {selectedVideo.summary}
                        </p>
                        <div className="flex items-center justify-between gap-2 pt-2 border-t border-[#0b2d4f]">
                          <span className="text-[10px] text-slate-400 font-mono">
                            {selectedVideo.duration ? `Duração: ${selectedVideo.duration}` : 'YouTube Oficial'}
                          </span>
                          <a
                            href={selectedVideo.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition shadow-sm"
                          >
                            <Youtube className="w-3.5 h-3.5" />
                            <span>Abrir no YouTube</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}

          {/* ============================================================= */}
          {/* 6. GALERIA DE FOTOS: Real mission photos + upload/media field */}
          {/* ============================================================= */}
          {subView === 'galeria' && (
            <motion.div
              key="galeria-view"
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              className="space-y-4 p-4 text-left"
            >
              {/* Header Card */}
              <div className="bg-[#031d38] border border-[#0b2d4f] rounded-2xl p-5 space-y-4 shadow-md">
                <div className="flex items-center justify-between border-b border-[#0b2d4f] pb-3">
                  <div className="flex flex-col">
                    <span className="text-sm font-black text-white tracking-wide">MISSÃO MOÇAMBIQUE</span>
                    <span className="text-[10px] text-[#f1a30a] font-semibold tracking-wider uppercase">
                      {selectedLanguage === 'en' ? 'Photos & Visual Records' : selectedLanguage === 'es' ? 'Fotos y Registros Visuales' : 'Fotos e Registros Visuais'}
                    </span>
                  </div>
                  <span className="text-[10px] font-bold text-[#f1a30a] bg-[#f1a30a]/10 border border-[#f1a30a]/30 px-2.5 py-1 rounded-full uppercase tracking-wider">
                    {selectedLanguage === 'en' ? 'Official' : 'Oficial'}
                  </span>
                </div>

                <div className="space-y-1">
                  <h3 className="text-xs font-bold text-[#f1a30a] uppercase tracking-wider">
                    {t('menu_gallery_title', selectedLanguage)}
                  </h3>
                  <p className="text-xs text-slate-300">
                    {selectedLanguage === 'en' ? 'Remarkable moments of the Mozambique Mission' : selectedLanguage === 'es' ? 'Momentos destacados de la Misión Mozambique' : 'Momentos marcantes da Missão Moçambique'}
                  </p>
                </div>
              </div>

              {/* Hidden File Input */}
              <input
                type="file"
                ref={photoInputRef}
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handlePhotoUpload(file);
                  e.target.value = '';
                }}
                className="hidden"
                id="gallery-photo-input"
              />

              {/* Photos Grid */}
              <div className="grid grid-cols-2 gap-3">
                {galleryPhotos.map((photo, index) => (
                  <div
                    key={photo.id}
                    onClick={() => setSelectedPhoto(photo)}
                    className="bg-[#031d38] border border-[#0b2d4f] rounded-xl overflow-hidden shadow-sm group hover:border-[#f1a30a]/50 transition cursor-pointer relative"
                  >
                    <div className="aspect-[4/3] w-full overflow-hidden bg-slate-900 relative">
                      <img
                        src={photo.url}
                        alt={`${t('menu_gallery_item_title', selectedLanguage)} ${index + 1}`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#010e1d]/80 via-transparent to-transparent opacity-80" />
                      
                      {/* Delete button if user added photo */}
                      {photo.id.startsWith('photo_') && (
                        <button
                          type="button"
                          onClick={(e) => handleDeletePhoto(photo.id, e)}
                          className="absolute top-2 right-2 p-1.5 rounded-full bg-black/60 text-red-400 hover:text-red-300 backdrop-blur-md transition"
                          title="Excluir foto"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}

                      <div className="absolute inset-x-2.5 bottom-2 text-left">
                        <span className="text-[8.5px] font-mono text-[#f1a30a] font-bold block truncate">
                          {photo.date || 'Moçambique'}
                        </span>
                        <h4 className="text-xs font-bold text-white truncate drop-shadow">
                          {`${t('menu_gallery_item_title', selectedLanguage)} ${index + 1}`}
                        </h4>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* ============================================================= */}
          {/* 7. SEJA UM COLABORADOR: Pedido de oração + Doação */}
          {/* ============================================================= */}
          {subView === 'colaborador' && (
            <motion.div
              key="colaborador-view"
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              className="space-y-4 p-4 text-left"
            >
              {/* Header Card */}
              <div className="bg-[#031d38] border border-[#0b2d4f] rounded-2xl p-5 space-y-4 shadow-md">
                <div className="flex items-center justify-between border-b border-[#0b2d4f] pb-3">
                  <div className="flex flex-col">
                    <span className="text-sm font-black text-white tracking-wide">MISSÃO MOÇAMBIQUE</span>
                    <span className="text-[10px] text-[#f1a30a] font-semibold tracking-wider uppercase">
                      {selectedLanguage === 'en' ? 'Humanitarian Support & Outreach' : selectedLanguage === 'es' ? 'Apoyo Humanitario y Sustento' : 'Apoio Humanitário e Sustento'}
                    </span>
                  </div>
                  <span className="text-[10px] font-bold text-[#f1a30a] bg-[#f1a30a]/10 border border-[#f1a30a]/30 px-2.5 py-1 rounded-full uppercase tracking-wider">
                    {selectedLanguage === 'en' ? 'Official' : 'Oficial'}
                  </span>
                </div>

                <div className="space-y-1">
                  <h3 className="text-xs font-bold text-[#f1a30a] uppercase tracking-wider">
                    {t('menu_colaborador', selectedLanguage)}
                  </h3>
                  <p className="text-xs text-slate-300">
                    Apoio Humanitário e Sustento da Missão em Moçambique
                  </p>
                </div>
              </div>

              {/* Official Giving Portal */}
              <div className="bg-[#031d38] border border-[#f1a30a]/40 p-5 rounded-2xl space-y-4 shadow-md">
                <div className="pb-2 border-b border-[#0b2d4f]">
                  <h4 className="text-sm font-black text-white">{t('menu_donation_title', selectedLanguage)}</h4>
                </div>
                
                <p className="text-xs text-slate-200 leading-relaxed">
                  Todas as ofertas para a Missão Moçambique são administradas e fiscalizadas pela <strong>First Baptist Orlando</strong>, garantindo prestação de contas integral e transparência cristã.
                </p>

                <div className="bg-[#011122] border border-[#0b2d4f] p-3.5 rounded-xl space-y-1.5 text-xs text-slate-300">
                  <span className="font-bold text-white block">Como sua doação transforma vidas:</span>
                  <ul className="list-disc list-inside space-y-1 text-slate-300 text-[11.5px]">
                    <li>Perfuração e manutenção de poços artesianos de água potável</li>
                    <li>Nutrição e apoio emergencial a famílias e crianças</li>
                    <li>Formação e capacitação de pastores e líderes comunitários</li>
                    <li>Plantação e fortalecimento de igrejas locais bíblicas</li>
                  </ul>
                </div>

                <a
                  href="https://pushpay.com/g/firstorlando?fnd=Brazilian%20Campus"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[#f1a30a] hover:bg-[#df9508] text-[#020b18] font-black text-xs py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 transition shadow-lg uppercase tracking-wider text-center"
                >
                  <span>{t('menu_donation_btn', selectedLanguage)}</span>
                  <ExternalLink className="w-[18px] h-[18px]" />
                </a>
              </div>
            </motion.div>
          )}

          {/* ============================================================= */}
          {/* 8. FALE CONOSCO: Requested links */}
          {/* ============================================================= */}
          {subView === 'fale-conosco' && (
            <motion.div
              key="fale-conosco-view"
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              className="space-y-4 p-4 text-left"
            >
              <div className="bg-[#031d38] border border-[#0b2d4f] rounded-2xl p-5 space-y-4 shadow-md">
                <div className="flex items-center justify-between border-b border-[#0b2d4f] pb-3">
                  <div className="flex flex-col">
                    <span className="text-sm font-black text-white tracking-wide">MISSÃO MOÇAMBIQUE</span>
                    <span className="text-[10px] text-[#f1a30a] font-semibold tracking-wider uppercase">
                      {t('menu_contact_connect', selectedLanguage)}
                    </span>
                  </div>
                  <span className="text-[10px] font-bold text-[#f1a30a] bg-[#f1a30a]/10 border border-[#f1a30a]/30 px-2.5 py-1 rounded-full uppercase tracking-wider">
                    {selectedLanguage === 'en' ? 'Official' : 'Oficial'}
                  </span>
                </div>

                <div className="space-y-1">
                  <h3 className="text-xs font-bold text-[#f1a30a] uppercase tracking-wider">
                    {t('menu_contact_title', selectedLanguage)}
                  </h3>
                </div>

                <div className="space-y-3">
                  {/* 1. Website */}
                  <a
                    href="https://firstorlandobrasil.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3.5 bg-[#011122] hover:bg-[#02182b] border border-[#0b2d4f] hover:border-[#f1a30a]/40 rounded-xl flex items-center justify-between transition group"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-9 h-9 rounded-lg bg-sky-500/15 text-sky-400 flex items-center justify-center shrink-0">
                        <Globe className="w-[23px] h-[23px]" />
                      </div>
                      <div className="min-w-0">
                        <h4 className="text-xs font-bold text-white group-hover:text-[#f1a30a] transition-colors">
                          First Baptist Orlando • Campus Brasileiro
                        </h4>
                        <p className="text-[11px] text-slate-400 truncate font-mono">
                          firstorlandobrasil.com
                        </p>
                      </div>
                    </div>
                    <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-[#f1a30a] shrink-0" />
                  </a>

                  {/* 2. Instagram */}
                  <a
                    href="https://www.instagram.com/firstorlandobrasil/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3.5 bg-[#011122] hover:bg-[#02182b] border border-[#0b2d4f] hover:border-pink-500/40 rounded-xl flex items-center justify-between transition group"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-9 h-9 rounded-lg bg-pink-500/15 text-pink-400 flex items-center justify-center shrink-0">
                        <Instagram className="w-[23px] h-[23px]" />
                      </div>
                      <div className="min-w-0">
                        <h4 className="text-xs font-bold text-white group-hover:text-pink-400 transition-colors">
                          {t('menu_contact_instagram', selectedLanguage)}
                        </h4>
                        <p className="text-[11px] text-slate-400 truncate font-mono">
                          @firstorlandobrasil
                        </p>
                      </div>
                    </div>
                    <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-pink-400 shrink-0" />
                  </a>

                  {/* 3. YouTube */}
                  <a
                    href="https://www.youtube.com/@firstorlandobrasil"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3.5 bg-[#011122] hover:bg-[#02182b] border border-[#0b2d4f] hover:border-red-500/40 rounded-xl flex items-center justify-between transition group"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-9 h-9 rounded-lg bg-red-500/15 text-red-400 flex items-center justify-center shrink-0">
                        <Youtube className="w-[23px] h-[23px]" />
                      </div>
                      <div className="min-w-0">
                        <h4 className="text-xs font-bold text-white group-hover:text-red-400 transition-colors">
                          {t('menu_contact_youtube', selectedLanguage)}
                        </h4>
                        <p className="text-[11px] text-slate-400 truncate font-mono">
                          @firstorlandobrasil
                        </p>
                      </div>
                    </div>
                    <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-red-400 shrink-0" />
                  </a>
                </div>

                {/* Physical Address & Contact Info */}
                <div className="pt-3 border-t border-[#0b2d4f] space-y-1.5">
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">{t('menu_contact_campus', selectedLanguage)}</span>
                  <p className="text-xs text-slate-200">
                    <strong>First Baptist Orlando • Campus Brasileiro</strong><br />
                    3000 S John Young Pkwy, Orlando, FL 32805, Estados Unidos
                  </p>
                </div>
              </div>

            </motion.div>
          )}
        </AnimatePresence>

        {/* RODAPÉ DA ABA MISSÃO - LOGO FIRST ORLANDO */}
        <footer className="mt-8 mb-6 pt-6 pb-2 border-t border-[#0b2d4f]/60 px-4 text-center">
          <a
            href="https://firstorlandobrasil.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex flex-col items-center justify-center gap-3 p-5 rounded-2xl bg-[#02182b]/80 hover:bg-[#021d36] border border-[#0b2d4f] hover:border-[#f1a30a]/50 transition group shadow-md max-w-sm mx-auto w-full"
          >
            <div className="flex justify-center items-center py-1">
              <img
                src={firstOrlandoLogo}
                alt="First Baptist Orlando • Campus Brasileiro"
                className="w-full max-w-[250px] h-auto object-contain transition-transform group-hover:scale-105 duration-200"
              />
            </div>
            <div className="pt-2 border-t border-[#0b2d4f]/60 w-full flex items-center justify-center gap-1.5 text-xs text-slate-400 group-hover:text-[#f1a30a] transition-colors">
              <span className="font-medium font-mono text-[11px]">firstorlandobrasil.com</span>
              <ExternalLink className="w-[18px] h-[18px]" />
            </div>
          </a>
        </footer>
      </div>

      {/* PHOTO LIGHTBOX MODAL */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          >
            <div className="relative max-w-lg w-full bg-[#021123] border border-[#0b2d4f] rounded-2xl overflow-hidden shadow-2xl flex flex-col">
              <div className="p-3 bg-[#031d38] border-b border-[#0b2d4f] flex items-center justify-between">
                <h4 className="text-xs font-bold text-white truncate pr-2">{selectedPhoto.title}</h4>
                <button
                  type="button"
                  onClick={() => setSelectedPhoto(null)}
                  className="p-1 rounded-full bg-black/40 text-slate-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="max-h-[70vh] bg-black flex items-center justify-center overflow-hidden">
                <img
                  src={selectedPhoto.url}
                  alt={selectedPhoto.title}
                  className="max-h-[65vh] w-auto object-contain"
                />
              </div>

              {selectedPhoto.caption && (
                <div className="p-3 bg-[#021123] text-left text-xs text-slate-300 font-sans">
                  {selectedPhoto.caption}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* DRAWING LIGHTBOX MODAL FOR KIDS */}
      <AnimatePresence>
        {selectedDrawing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          >
            <div className="relative max-w-md w-full bg-[#021123] border border-[#0b2d4f] rounded-2xl overflow-hidden shadow-2xl flex flex-col p-4 space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-[#0b2d4f]">
                <h4 className="text-xs font-bold text-white">{selectedDrawing.title}</h4>
                <button
                  type="button"
                  onClick={() => setSelectedDrawing(null)}
                  className="p-1 rounded-full bg-black/40 text-slate-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="w-full aspect-[4/3] bg-white rounded-xl flex items-center justify-center p-3">
                {selectedDrawing.image && !brokenImageIds[selectedDrawing.id] ? (
                  <img
                    src={selectedDrawing.image}
                    alt={selectedDrawing.title}
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <svg
                    viewBox="0 0 200 180"
                    className="w-full h-full object-contain"
                    dangerouslySetInnerHTML={{ __html: selectedDrawing.svgPath || '' }}
                  />
                )}
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => handlePrintDrawing(selectedDrawing)}
                  className="bg-[#f1a30a] hover:bg-amber-400 text-slate-950 font-bold text-xs py-2 rounded-xl flex items-center justify-center gap-1.5 transition"
                >
                  <Printer className="w-[18px] h-[18px]" />
                  <span>Imprimir A4</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleShareDrawing(selectedDrawing)}
                  className="bg-[#031d38] hover:bg-[#05284d] text-white font-bold text-xs py-2 rounded-xl border border-[#0b2d4f] flex items-center justify-center gap-1.5 transition"
                >
                  <Share2 className="w-4 h-4 text-sky-400" />
                  <span>Compartilhar</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* PRAYER REQUEST MODAL */}
      <AnimatePresence>
        {showPrayerModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setShowPrayerModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
              className="relative max-w-md w-full bg-[#02182b] border border-[#0b2d4f] rounded-2xl overflow-hidden shadow-2xl flex flex-col p-5 space-y-4"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between pb-3 border-b border-[#0b2d4f]">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-[#f1a30a]/20 flex items-center justify-center text-[#f1a30a] text-base">
                    🙏
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">{t('menu_modal_title', selectedLanguage)}</h3>
                    <p className="text-[11px] text-slate-400">{t('menu_modal_subtitle', selectedLanguage)}</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setShowPrayerModal(false)}
                  className="w-8 h-8 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition border border-white/10"
                  aria-label="Fechar modal"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmitPrayer} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    {t('menu_modal_name_label', selectedLanguage)}
                  </label>
                  <input
                    type="text"
                    value={prayerAuthor}
                    onChange={(e) => setPrayerAuthor(e.target.value)}
                    placeholder={t('menu_modal_name_ph', selectedLanguage)}
                    className="w-full bg-[#011122] border border-[#0b2d4f] rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#f1a30a] transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    {t('menu_modal_cat_label', selectedLanguage)}
                  </label>
                  <div className="grid grid-cols-3 gap-1.5">
                    {(['Intercessão', 'Saúde', 'Família', 'Agradecimento', 'Missões'] as PrayerRequest['category'][]).map((cat) => (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => setPrayerCategory(cat)}
                        className={`text-[11px] font-medium py-1.5 px-2 rounded-lg border transition text-center ${
                          prayerCategory === cat
                            ? 'bg-[#f1a30a] text-slate-950 font-bold border-[#f1a30a] shadow-sm'
                            : 'bg-[#011122] text-slate-300 border-[#0b2d4f] hover:border-slate-500'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    {t('menu_modal_text_label', selectedLanguage)} <span className="text-[#f1a30a]">*</span>
                  </label>
                  <textarea
                    rows={4}
                    value={prayerText}
                    onChange={(e) => setPrayerText(e.target.value)}
                    placeholder={t('menu_modal_text_ph', selectedLanguage)}
                    className="w-full bg-[#011122] border border-[#0b2d4f] rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#f1a30a] transition resize-none leading-relaxed"
                    required
                  />
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowPrayerModal(false)}
                    className="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold py-2.5 rounded-xl border border-slate-700 transition"
                  >
                    {t('menu_modal_btn_cancel', selectedLanguage)}
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-[#f1a30a] hover:bg-[#df9508] text-slate-950 text-xs font-bold py-2.5 rounded-xl transition shadow flex items-center justify-center gap-1.5"
                  >
                    <span>{t('menu_modal_btn_submit', selectedLanguage)}</span>
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
