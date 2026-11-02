import childrenGroup1 from '../assets/images/children_group_1_1784054748086.jpg';
import childrenGroup2 from '../assets/images/children_group_2_1784054774596.jpg';
import childrenCloseUp from '../assets/images/children_close_up_1784054763230.jpg';
import prayerBannerImg from '../assets/images/prayer_faith_mural_1787866949488.jpg';
import type { GalleryPhoto } from '../types';
export const originalPhotoUrls: Record<string, string> = { gal_1: childrenGroup1, gal_2: childrenGroup2, gal_3: childrenCloseUp, gal_4: prayerBannerImg };
export const INITIAL_GALLERY: GalleryPhoto[] = [
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
