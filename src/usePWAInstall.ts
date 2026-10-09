import { useEffect, useRef, useState } from 'react';

interface InstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

const DISPLAY_MODE = '(display-mode: standalone), (display-mode: minimal-ui), (display-mode: fullscreen), (display-mode: window-controls-overlay)';

function isStandalone() {
  return window.matchMedia(DISPLAY_MODE).matches ||
    Boolean((navigator as Navigator & { standalone?: boolean }).standalone);
}

export function usePWAInstall() {
  const [installed, setInstalled] = useState(isStandalone);
  const [available, setAvailable] = useState(false);
  const [installing, setInstalling] = useState(false);
  const promptRef = useRef<InstallPromptEvent | null>(null);
  const installingRef = useRef(false);
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) ||
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);

  // Listen from App so the event is retained even before the menu is opened.
  useEffect(() => {
    const displayMode = window.matchMedia(DISPLAY_MODE);
    const onPrompt = (event: Event) => {
      if (isStandalone()) return;
      event.preventDefault();
      promptRef.current = event as InstallPromptEvent;
      setInstalled(false);
      setAvailable(true);
    };
    const onInstalled = () => {
      promptRef.current = null;
      setAvailable(false);
      setInstalled(true);
    };
    const onDisplayModeChange = () => {
      if (isStandalone()) onInstalled();
      else setInstalled(false);
    };
    window.addEventListener('beforeinstallprompt', onPrompt);
    window.addEventListener('appinstalled', onInstalled);
    displayMode.addEventListener('change', onDisplayModeChange);
    return () => {
      window.removeEventListener('beforeinstallprompt', onPrompt);
      window.removeEventListener('appinstalled', onInstalled);
      displayMode.removeEventListener('change', onDisplayModeChange);
    };
  }, []);

  const install = async () => {
    const event = promptRef.current;
    if (!event || installingRef.current || installed) return;
    installingRef.current = true;
    setInstalling(true);
    try {
      await event.prompt();
      const choice = await event.userChoice;
      if (choice.outcome === 'accepted') setInstalled(true);
    } finally {
      // Each beforeinstallprompt event can only be used once.
      if (promptRef.current === event) {
        promptRef.current = null;
        setAvailable(false);
      }
      installingRef.current = false;
      setInstalling(false);
    }
  };

  return { canInstall: !installed && (available || isIOS), isIOS, installing, install };
}

export type PWAInstall = ReturnType<typeof usePWAInstall>;
