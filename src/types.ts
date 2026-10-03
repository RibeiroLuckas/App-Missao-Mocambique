export interface JesusPassage {
  id: string;
  episode: number;
  title: string;
  description: string;
  bibleText: string;
  audioUrls: {
    pt: string; // Português
    pt_PT: string; // Português de Portugal
    en: string; // Inglês
  };
  duration: string;
  image: string;
}

export interface PrayerRequest {
  id: string;
  author: string;
  requestText: string;
  category: 'Intercessão' | 'Saúde' | 'Família' | 'Agradecimento' | 'Missões';
  createdAt: string;
  likes: number;
  likedByCurrentUser?: boolean;
}

export interface Testimonial {
  id: string;
  author: string;
  location: string;
  text: string;
  createdAt: string;
}

export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  content: string;
  date: string;
  image: string;
  author: string;
}

export interface MissionProject {
  id: string;
  title: string;
  description: string;
  impact: string;
  status: 'Concluído' | 'Em Andamento' | 'Planejado';
}

export interface UpcomingMission {
  id: string;
  title: string;
  date: string;
  location: string;
  description: string;
  status?: string;
}

export interface GalleryPhoto {
  id: string;
  title: string;
  url: string;
  date?: string;
  caption?: string;
}

export type TabType = 'inicio' | 'biblia' | 'missao' | 'louvores' | 'mais';

export type LanguageType = 'pt' | 'pt_PT' | 'en' | 'es';

export type DeviceMode = 'ios' | 'android' | 'responsive';

export type AndroidNavStyle = 'gestures' | 'buttons';
