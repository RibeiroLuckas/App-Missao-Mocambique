import { useState } from 'react';
import { ChevronRight, Download } from 'lucide-react';
import { LanguageType } from '../types';
import { PWAInstall } from '../usePWAInstall';

const COPY = {
  pt: {
    title: 'Adicionar ao dispositivo',
    description: 'Tenha o aplicativo na sua tela inicial',
    installing: 'Aguardando instalação…',
    instructions: 'No Safari, toque em Compartilhar, escolha “Adicionar à Tela de Início” e confirme em “Adicionar”. Se estiver em outro navegador, abra este site no Safari.',
    error: 'Não foi possível abrir a instalação. Tente novamente pelo menu do navegador.',
  },
  en: {
    title: 'Add to device',
    description: 'Keep the app on your home screen',
    installing: 'Waiting for installation…',
    instructions: 'In Safari, tap Share, choose “Add to Home Screen” and confirm with “Add”. If you are using another browser, open this site in Safari.',
    error: 'Could not open installation. Try again from your browser menu.',
  },
  es: {
    title: 'Añadir al dispositivo',
    description: 'Ten la aplicación en tu pantalla de inicio',
    installing: 'Esperando la instalación…',
    instructions: 'En Safari, toca Compartir, elige “Añadir a la pantalla de inicio” y confirma con “Añadir”. Si utilizas otro navegador, abre este sitio en Safari.',
    error: 'No se pudo abrir la instalación. Inténtalo desde el menú del navegador.',
  },
};

export default function InstallMenuItem({ installation, language, onShowToast }: {
  installation: PWAInstall;
  language: LanguageType;
  onShowToast: (message: string) => void;
}) {
  const [showInstructions, setShowInstructions] = useState(false);
  const copy = COPY[language === 'pt_PT' ? 'pt' : language];
  if (!installation.canInstall) return null;

  const handleClick = async () => {
    if (installation.isIOS) {
      setShowInstructions(value => !value);
      return;
    }
    try {
      await installation.install();
    } catch {
      onShowToast(copy.error);
    }
  };

  return (
    <div>
      <button
        type="button"
        onClick={handleClick}
        disabled={installation.installing}
        aria-expanded={installation.isIOS ? showInstructions : undefined}
        aria-controls={installation.isIOS ? 'pwa-install-instructions' : undefined}
        className="w-full bg-[#031d38] hover:bg-[#05284d] border border-[#0b2d4f] hover:border-[#f1a30a]/40 p-3.5 rounded-xl flex items-center justify-between transition-all group text-left shadow-sm disabled:opacity-60"
      >
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-xl bg-amber-500/15 text-[#f1a30a] flex items-center justify-center shrink-0 shadow-inner">
            <Download className="w-[23px] h-[23px]" />
          </div>
          <div className="min-w-0">
            <h4 className="text-sm font-bold text-white group-hover:text-[#f1a30a] transition-colors">{copy.title}</h4>
            <p className="text-xs text-slate-300">{installation.installing ? copy.installing : copy.description}</p>
          </div>
        </div>
        <ChevronRight className="w-5 h-5 text-slate-400 shrink-0 ml-2" />
      </button>
      {installation.isIOS && showInstructions && (
        <p id="pwa-install-instructions" className="mt-2 rounded-xl border border-[#0b2d4f] bg-[#011122] p-4 text-sm leading-relaxed text-slate-200">
          {copy.instructions}
        </p>
      )}
    </div>
  );
}
