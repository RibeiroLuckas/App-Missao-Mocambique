import React from 'react';
import MenuTab, { MenuSubView } from './MenuTab';
import { MissionProject, NewsItem, LanguageType, PrayerRequest } from '../types';
import { PWAInstall } from '../usePWAInstall';

interface MissionTabProps {
  installation: PWAInstall;
  MISSION_PROJECTS: MissionProject[];
  newsItemsList: NewsItem[];
  onShowToast: (msg: string) => void;
  onNavigateToHome?: () => void;
  selectedLanguage: LanguageType;
  onSelectLanguage?: (lang: LanguageType) => void;
  prayerRequests: PrayerRequest[];
  onToggleAmen: (id: string) => void;
  onAddPrayerRequest: (author: string, text: string, cat: PrayerRequest['category']) => void;
  showPrayerModal: boolean;
  setShowPrayerModal: (b: boolean) => void;
  initialSubView?: MenuSubView;
}

export default function MissionTab({
  installation,
  onShowToast,
  onNavigateToHome = () => {},
  selectedLanguage,
  onSelectLanguage = () => {},
  prayerRequests,
  onToggleAmen,
  onAddPrayerRequest,
  showPrayerModal,
  setShowPrayerModal,
  initialSubView = 'menu',
}: MissionTabProps) {
  return (
    <MenuTab
      installation={installation}
      initialSubView={initialSubView}
      onNavigateToHome={onNavigateToHome}
      onShowToast={onShowToast}
      selectedLanguage={selectedLanguage}
      onSelectLanguage={onSelectLanguage}
      prayerRequests={prayerRequests}
      onToggleAmen={onToggleAmen}
      onAddPrayerRequest={onAddPrayerRequest}
      showPrayerModal={showPrayerModal}
      setShowPrayerModal={setShowPrayerModal}
    />
  );
}
