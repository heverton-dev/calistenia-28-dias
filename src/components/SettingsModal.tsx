import { AppSettings, AppTheme } from '../types/workout';
import { X, Volume2, VolumeX, Clock, Sliders, Smartphone, Palette, Check } from 'lucide-react';

interface SettingsModalProps {
  settings: AppSettings;
  currentTheme?: AppTheme;
  onSelectTheme?: (theme: AppTheme) => void;
  onUpdateSettings: (settings: Partial<AppSettings>) => void;
  onClose: () => void;
}

export function SettingsModal({
  settings,
  currentTheme = 'orange',
  onSelectTheme,
  onUpdateSettings,
  onClose
}: SettingsModalProps) {
  const THEMES: { id: AppTheme; hex: string; name: string }[] = [
    { id: 'orange', hex: '#f97316', name: 'Laranja' },
    { id: 'yellow', hex: '#eab308', name: 'Amarelo' },
    { id: 'pink', hex: '#ec4899', name: 'Rosa' },
    { id: 'blue', hex: '#0ea5e9', name: 'Azul' },
    { id: 'green', hex: '#10b981', name: 'Verde' }
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-4 select-none">
      <div className="bg-[#0b101d] w-full max-w-md rounded-t-3xl sm:rounded-3xl border border-white/10 flex flex-col overflow-hidden animate-in slide-in-from-bottom duration-200 shadow-2xl">
        {/* Header */}
        <div className="p-4 border-b border-white/5 flex items-center justify-between bg-[#0e1424]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-theme-subtle text-theme flex items-center justify-center border border-theme-subtle">
              <Sliders size={16} />
            </div>
            <div>
              <span className="text-[10px] font-extrabold text-theme uppercase tracking-widest block whitespace-nowrap">
                Preferências
              </span>
              <h3 className="text-sm font-black text-white whitespace-nowrap">Ajustes do Treinador</h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-[#141c30] text-slate-300 hover:text-white border border-white/5 active:scale-90 transition-transform"
            aria-label="Fechar"
          >
            <X size={16} />
          </button>
        </div>

        {/* Opções */}
        <div className="p-4 sm:p-5 space-y-4 overflow-y-auto no-scrollbar max-h-[75vh]">
          {/* Seletor de Cores da Aplicação */}
          {onSelectTheme && (
            <div className="p-3.5 rounded-2xl bg-[#111728] border border-white/5 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5 whitespace-nowrap">
                  <Palette size={15} className="text-theme" />
                  Cor do Aplicativo
                </span>
                <span className="text-[10px] text-slate-400 capitalize font-medium">{currentTheme}</span>
              </div>

              <div className="flex items-center justify-between gap-2 pt-1">
                {THEMES.map(t => {
                  const isSelected = currentTheme === t.id;
                  return (
                    <button
                      key={t.id}
                      onClick={() => onSelectTheme(t.id)}
                      className={`flex-1 py-2 px-1 rounded-xl flex flex-col items-center gap-1 transition-all border ${
                        isSelected
                          ? 'border-white/30 bg-white/5 shadow-md'
                          : 'border-transparent hover:bg-white/5'
                      }`}
                    >
                      <div
                        className="w-5 h-5 rounded-full flex items-center justify-center transition-transform"
                        style={{ backgroundColor: t.hex }}
                      >
                        {isSelected && <Check size={11} className="text-white stroke-[3]" />}
                      </div>
                      <span className="text-[9px] font-bold text-slate-300 whitespace-nowrap">{t.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Som e Bips de Contagem */}
          <div className="flex items-center justify-between p-3.5 rounded-2xl bg-[#111728] border border-white/5 flex-nowrap gap-2">
            <div className="flex items-center gap-3 min-w-0">
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${settings.soundEnabled ? 'bg-theme-subtle text-theme' : 'bg-slate-800 text-slate-500'}`}>
                {settings.soundEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
              </div>
              <div className="min-w-0">
                <span className="text-sm font-bold text-white block whitespace-nowrap">Áudio do Treino</span>
                <span className="text-xs text-slate-400 block whitespace-nowrap">Bips 3-2-1 e sinos de transição</span>
              </div>
            </div>

            <button
              onClick={() => onUpdateSettings({ soundEnabled: !settings.soundEnabled })}
              className={`w-12 h-7 rounded-full transition-colors p-1 flex items-center shrink-0 ${
                settings.soundEnabled ? 'bg-theme justify-end' : 'bg-slate-800 justify-start'
              }`}
            >
              <div className="w-5 h-5 rounded-full bg-white shadow-md" />
            </button>
          </div>

          {/* Tempo de Preparação Inicial */}
          <div className="p-3.5 rounded-2xl bg-[#111728] border border-white/5 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-300 whitespace-nowrap">
              <Clock size={15} className="text-theme" />
              Tempo de Preparação Inicial
            </div>

            <div className="grid grid-cols-3 gap-2">
              {[3, 5, 10].map(seconds => (
                <button
                  key={seconds}
                  onClick={() => onUpdateSettings({ prepTimeSeconds: seconds })}
                  className={`py-2 rounded-xl text-xs font-mono font-bold transition-all border whitespace-nowrap ${
                    settings.prepTimeSeconds === seconds
                      ? 'bg-theme text-white border-white/20 shadow-theme'
                      : 'bg-[#090d16] text-slate-400 border-white/5 hover:text-white'
                  }`}
                >
                  {seconds} segundos
                </button>
              ))}
            </div>
          </div>

          {/* Ritmo de Descanso */}
          <div className="p-3.5 rounded-2xl bg-[#111728] border border-white/5 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-300 whitespace-nowrap">
              <Sliders size={15} className="text-theme" />
              Multiplicador de Descanso
            </div>

            <div className="grid grid-cols-3 gap-2">
              {[
                { label: '0.8x (Ágil)', val: 0.8 },
                { label: '1.0x (Padrão)', val: 1.0 },
                { label: '1.2x (Longo)', val: 1.2 }
              ].map(item => (
                <button
                  key={item.val}
                  onClick={() => onUpdateSettings({ restTimeMultiplier: item.val })}
                  className={`py-2 rounded-xl text-xs font-bold transition-all border whitespace-nowrap ${
                    settings.restTimeMultiplier === item.val
                      ? 'bg-theme text-white border-white/20 shadow-theme'
                      : 'bg-[#090d16] text-slate-400 border-white/5 hover:text-white'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Vibração Háptica */}
          <div className="flex items-center justify-between p-3.5 rounded-2xl bg-[#111728] border border-white/5 flex-nowrap gap-2">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-9 h-9 rounded-xl bg-slate-800 text-slate-400 flex items-center justify-center shrink-0">
                <Smartphone size={18} />
              </div>
              <div className="min-w-0">
                <span className="text-sm font-bold text-white block whitespace-nowrap">Vibração Háptica</span>
                <span className="text-xs text-slate-400 block whitespace-nowrap">Vibrar nos bips de troca</span>
              </div>
            </div>

            <button
              onClick={() => onUpdateSettings({ vibrateEnabled: !settings.vibrateEnabled })}
              className={`w-12 h-7 rounded-full transition-colors p-1 flex items-center shrink-0 ${
                settings.vibrateEnabled ? 'bg-theme justify-end' : 'bg-slate-800 justify-start'
              }`}
            >
              <div className="w-5 h-5 rounded-full bg-white shadow-md" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
