import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ZoomIn, ZoomOut, RotateCcw, X, Check, Eye } from 'lucide-react';
import { LanguageType } from '../types';
import { t } from '../data/translations';

interface ZoomModalProps {
  isOpen: boolean;
  onClose: () => void;
  appZoom: number;
  onSetAppZoom: (zoom: number) => void;
  selectedLanguage: LanguageType;
}

const PRESETS = [
  { value: 0.85, label: '85%', tag: 'Compacto' },
  { value: 1.0, label: '100%', tag: 'Padrão' },
  { value: 1.15, label: '115%', tag: 'Médio' },
  { value: 1.25, label: '125%', tag: 'Grande' },
  { value: 1.4, label: '140%', tag: 'Máximo' },
];

export default function ZoomModal({
  isOpen,
  onClose,
  appZoom,
  onSetAppZoom,
  selectedLanguage,
}: ZoomModalProps) {
  if (!isOpen) return null;

  const currentPercent = Math.round(appZoom * 100);

  const handleStep = (direction: 'in' | 'out') => {
    const delta = direction === 'in' ? 0.05 : -0.05;
    const nextVal = Math.min(1.4, Math.max(0.8, Number((appZoom + delta).toFixed(2))));
    onSetAppZoom(nextVal);
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value) / 100;
    onSetAppZoom(Number(val.toFixed(2)));
  };

  const handleReset = () => {
    onSetAppZoom(1.0);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-sm rounded-2xl bg-[#031d38] border border-[#0d3b66] shadow-[0_20px_50px_rgba(0,0,0,0.8)] text-white overflow-hidden p-5 space-y-5"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-[#0b2d4f] pb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#f1a30a]/15 text-[#f1a30a] flex items-center justify-center shrink-0 border border-[#f1a30a]/30">
                <ZoomIn className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white tracking-wide">
                  {t('zoom_title', selectedLanguage) || 'Ajustar Zoom do App'}
                </h3>
                <p className="text-[11px] text-slate-400">
                  {t('zoom_subtitle', selectedLanguage) || 'Personalize o tamanho do app'}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white flex items-center justify-center transition"
              aria-label="Fechar"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Current Zoom Display Counter */}
          <div className="bg-[#011122] rounded-xl p-4 border border-[#0b2d4f] flex items-center justify-between">
            <div className="space-y-0.5">
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block">
                Nível de Zoom Atual
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black text-[#f1a30a] font-mono tracking-tight">
                  {currentPercent}%
                </span>
                <span className="text-xs font-bold text-slate-300">
                  {currentPercent === 100
                    ? '• Padrão'
                    : currentPercent < 100
                    ? '• Compacto'
                    : currentPercent <= 115
                    ? '• Médio'
                    : currentPercent <= 125
                    ? '• Grande'
                    : '• Extra Grande'}
                </span>
              </div>
            </div>

            {/* Stepper Buttons (- and +) */}
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => handleStep('out')}
                disabled={currentPercent <= 80}
                className="w-10 h-10 rounded-lg bg-[#021830] hover:bg-[#062c54] active:scale-95 disabled:opacity-30 disabled:pointer-events-none border border-[#0b2d4f] text-slate-200 flex items-center justify-center transition"
                title="Diminuir Zoom (-5%)"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => handleStep('in')}
                disabled={currentPercent >= 140}
                className="w-10 h-10 rounded-lg bg-[#021830] hover:bg-[#062c54] active:scale-95 disabled:opacity-30 disabled:pointer-events-none border border-[#0b2d4f] text-slate-200 flex items-center justify-center transition"
                title="Aumentar Zoom (+5%)"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Continuous Range Slider */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono">
              <span>80% (Menor)</span>
              <span>100% (Padrão)</span>
              <span>140% (Maior)</span>
            </div>
            <input
              type="range"
              min="80"
              max="140"
              step="5"
              value={currentPercent}
              onChange={handleSliderChange}
              className="w-full h-2 bg-[#011122] rounded-full appearance-none cursor-pointer accent-[#f1a30a] focus:outline-none border border-[#0b2d4f]"
            />
          </div>

          {/* Quick Preset Buttons */}
          <div className="space-y-1.5">
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block">
              Predefinições Rápidas
            </span>
            <div className="grid grid-cols-5 gap-1.5">
              {PRESETS.map((preset) => {
                const isActive = Math.round(preset.value * 100) === currentPercent;
                return (
                  <button
                    key={preset.label}
                    type="button"
                    onClick={() => onSetAppZoom(preset.value)}
                    className={`py-2 px-1 rounded-xl text-center transition flex flex-col items-center justify-center border ${
                      isActive
                        ? 'bg-[#f1a30a] text-slate-950 font-black border-[#f1a30a] shadow-[0_0_12px_rgba(241,163,10,0.5)]'
                        : 'bg-[#011122] hover:bg-[#021830] text-slate-300 font-bold border-[#0b2d4f]'
                    }`}
                  >
                    <span className="text-xs leading-none">{preset.label}</span>
                    <span
                      className={`text-[8.5px] mt-1 uppercase tracking-tight ${
                        isActive ? 'text-slate-950 font-black' : 'text-slate-400'
                      }`}
                    >
                      {preset.tag}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Replicability Note */}
          <div className="flex items-start gap-2 p-2.5 rounded-xl bg-[#011122]/70 border border-[#0b2d4f]/80 text-[11px] text-slate-300 leading-snug">
            <Eye className="w-4 h-4 text-[#f1a30a] shrink-0 mt-0.5" />
            <span>
              {t('zoom_applied_all', selectedLanguage) ||
                'O zoom é replicado em todas as páginas, passagens, Bíblia, menus e player do aplicativo.'}
            </span>
          </div>

          {/* Footer Actions */}
          <div className="flex items-center gap-2 pt-2 border-t border-[#0b2d4f]">
            <button
              type="button"
              onClick={handleReset}
              disabled={currentPercent === 100}
              className="flex-1 py-2.5 px-3 rounded-xl bg-[#011122] hover:bg-[#021830] disabled:opacity-40 disabled:pointer-events-none text-slate-300 text-xs font-bold transition flex items-center justify-center gap-1.5 border border-[#0b2d4f]"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{t('zoom_reset', selectedLanguage) || 'Redefinir (100%)'}</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 px-3 rounded-xl bg-gradient-to-r from-amber-500 to-[#f1a30a] hover:from-amber-400 hover:to-amber-500 text-slate-950 text-xs font-black transition flex items-center justify-center gap-1.5 shadow-md active:scale-95"
            >
              <Check className="w-4 h-4" />
              <span>{t('zoom_done', selectedLanguage) || 'Concluir'}</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
