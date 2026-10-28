import { AppSettings } from '../types/workout';
import { X, Volume2, VolumeX, Clock, Sliders, Smartphone } from 'lucide-react';

interface SettingsModalProps {
  settings: AppSettings;
  onUpdateSettings: (settings: Partial<AppSettings>) => void;
  onClose: () => void;
}

export function SettingsModal({
  settings,
  onUpdateSettings,
  onClose
}: SettingsModalProps) {
  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="bg-[#0b101d] w-full max-w-md rounded-t-3xl sm:rounded-3xl border border-white/10 flex flex-col overflow-hidden animate-in slide-in-from-bottom duration-200 shadow-2xl">
        {/* Header */}
        <div className="p-4 border-b border-white/5 flex items-center justify-between bg-[#0e1424]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-orange-500/20 text-orange-400 flex items-center justify-center border border-orange-500/30">
              <Sliders size={16} />
            </div>
            <div>
              <span className="text-[10px] font-extrabold text-orange-400 uppercase tracking-widest block">
                Preferências
              </span>
              <h3 className="text-sm font-black text-white">Ajustes do Treinador</h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-[#141c30] text-slate-300 hover:text-white border border-white/5"
            aria-label="Fechar"
          >
            <X size={16} />
          </button>
        </div>

        {/* Opções */}
        <div className="p-5 space-y-5">
          {/* Som e Bips de Contagem */}
          <div className="flex items-center justify-between p-3.5 rounded-2xl bg-[#111728] border border-white/5">
            <div className="flex items-center gap-3">
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${settings.soundEnabled ? 'bg-orange-500/20 text-orange-400' : 'bg-slate-800 text-slate-500'}`}>
                {settings.soundEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
              </div>
              <div>
                <span className="text-sm font-bold text-white block">Áudio do Treino</span>
                <span className="text-xs text-slate-400">Bips 3-2-1 e sinos de transição</span>
              </div>
            </div>

            <button
              onClick={() => onUpdateSettings({ soundEnabled: !settings.soundEnabled })}
              className={`w-12 h-7 rounded-full transition-colors p-1 flex items-center ${
                settings.soundEnabled ? 'bg-orange-500 justify-end' : 'bg-slate-800 justify-start'
              }`}
            >
              <div className="w-5 h-5 rounded-full bg-white shadow-md" />
            </button>
          </div>

          {/* Tempo de Preparação */}
          <div className="p-3.5 rounded-2xl bg-[#111728] border border-white/5 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-300">
              <Clock size={15} className="text-orange-400" />
              Tempo de Preparação Inicial
            </div>

            <div className="grid grid-cols-3 gap-2">
              {[3, 5, 10].map(seconds => (
                <button
                  key={seconds}
                  onClick={() => onUpdateSettings({ prepTimeSeconds: seconds })}
                  className={`py-2 rounded-xl text-xs font-mono font-bold transition-all border ${
                    settings.prepTimeSeconds === seconds
                      ? 'bg-orange-500 text-white border-orange-400 shadow-md shadow-orange-500/30'
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
            <div className="flex items-center gap-2 text-xs font-bold text-slate-300">
              <Sliders size={15} className="text-orange-400" />
              Multiplicador de Descanso
            </div>

            <div className="grid grid-cols-3 gap-2">
              {[
                { label: 'Rápido (0.8x)', val: 0.8 },
                { label: 'Padrão (1.0x)', val: 1.0 },
                { label: 'Longo (1.2x)', val: 1.2 }
              ].map(item => (
                <button
                  key={item.val}
                  onClick={() => onUpdateSettings({ restTimeMultiplier: item.val })}
                  className={`py-2 rounded-xl text-xs font-bold transition-all border ${
                    settings.restTimeMultiplier === item.val
                      ? 'bg-orange-500 text-white border-orange-400 shadow-md shadow-orange-500/30'
                      : 'bg-[#090d16] text-slate-400 border-white/5 hover:text-white'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Vibração */}
          <div className="flex items-center justify-between p-3.5 rounded-2xl bg-[#111728] border border-white/5">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-slate-800 text-slate-400 flex items-center justify-center">
                <Smartphone size={18} />
              </div>
              <div>
                <span className="text-sm font-bold text-white block">Vibração Háptica</span>
                <span className="text-xs text-slate-400">Vibrar nos bips de troca</span>
              </div>
            </div>

            <button
              onClick={() => onUpdateSettings({ vibrateEnabled: !settings.vibrateEnabled })}
              className={`w-12 h-7 rounded-full transition-colors p-1 flex items-center ${
                settings.vibrateEnabled ? 'bg-orange-500 justify-end' : 'bg-slate-800 justify-start'
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
