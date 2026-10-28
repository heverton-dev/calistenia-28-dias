import { AppTheme } from '../types/workout';
import { X, Check, Palette } from 'lucide-react';

interface ThemeSelectorModalProps {
  currentTheme: AppTheme;
  onSelectTheme: (theme: AppTheme) => void;
  onClose: () => void;
}

interface ThemeOption {
  id: AppTheme;
  name: string;
  colorHex: string;
  borderHex: string;
  glowHex: string;
  description: string;
}

const THEME_OPTIONS: ThemeOption[] = [
  {
    id: 'orange',
    name: 'Laranja Atlético',
    colorHex: '#f97316',
    borderHex: '#fb923c',
    glowHex: 'rgba(249, 115, 22, 0.4)',
    description: 'Padrão calistênico esportivo de alta energia'
  },
  {
    id: 'yellow',
    name: 'Amarelo Cyber',
    colorHex: '#eab308',
    borderHex: '#facc15',
    glowHex: 'rgba(234, 179, 8, 0.4)',
    description: 'Dourado vibrante de foco e superação'
  },
  {
    id: 'pink',
    name: 'Rosa Neon',
    colorHex: '#ec4899',
    borderHex: '#f472b6',
    glowHex: 'rgba(236, 72, 153, 0.4)',
    description: 'Magenta atlético moderno e arrojado'
  },
  {
    id: 'blue',
    name: 'Azul Elétrico',
    colorHex: '#0ea5e9',
    borderHex: '#38bdf8',
    glowHex: 'rgba(14, 165, 233, 0.4)',
    description: 'Ciano esportivo de alta precisão técnica'
  },
  {
    id: 'green',
    name: 'Verde Calistenia',
    colorHex: '#10b981',
    borderHex: '#34d399',
    glowHex: 'rgba(16, 185, 129, 0.4)',
    description: 'Verde esmeralda bioenergético e resistência'
  }
];

export function ThemeSelectorModal({
  currentTheme,
  onSelectTheme,
  onClose
}: ThemeSelectorModalProps) {
  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-4 select-none">
      <div className="bg-[#0c1222] w-full max-w-sm rounded-t-3xl sm:rounded-3xl border border-white/10 flex flex-col overflow-hidden animate-in slide-in-from-bottom duration-200 shadow-2xl">
        {/* Header */}
        <div className="p-4 border-b border-white/5 flex items-center justify-between bg-[#0e1628]">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 text-white">
              <Palette size={18} />
            </div>
            <div>
              <h3 className="text-base font-black text-white">Cores do Aplicativo</h3>
              <span className="text-[10px] text-slate-400 font-medium">Personalize a identidade visual</span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-2xl bg-[#141d33] text-slate-300 hover:text-white border border-white/5 active:scale-90 transition-transform"
            aria-label="Fechar"
          >
            <X size={18} />
          </button>
        </div>

        {/* Lista de Temas */}
        <div className="p-4 space-y-2.5">
          {THEME_OPTIONS.map(opt => {
            const isSelected = currentTheme === opt.id;

            return (
              <button
                key={opt.id}
                onClick={() => {
                  onSelectTheme(opt.id);
                  onClose();
                }}
                className={`w-full p-3 rounded-2xl border flex items-center justify-between transition-all active:scale-[0.98] ${
                  isSelected
                    ? 'bg-[#141f38] border-white/20 shadow-lg'
                    : 'bg-[#101728] border-white/5 hover:border-white/10'
                }`}
                style={
                  isSelected
                    ? {
                        borderColor: opt.colorHex,
                        boxShadow: `0 8px 20px -4px ${opt.glowHex}`
                      }
                    : undefined
                }
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-xl flex items-center justify-center shadow-md transition-transform"
                    style={{
                      backgroundColor: opt.colorHex,
                      boxShadow: `0 4px 12px ${opt.glowHex}`
                    }}
                  >
                    {isSelected && <Check size={16} className="text-white stroke-[3]" />}
                  </div>

                  <div className="text-left">
                    <span className="text-xs font-black text-white block">{opt.name}</span>
                    <span className="text-[10px] text-slate-400 line-clamp-1">{opt.description}</span>
                  </div>
                </div>

                <div
                  className="w-3.5 h-3.5 rounded-full border-2 transition-all"
                  style={{
                    borderColor: isSelected ? opt.colorHex : 'rgba(255,255,255,0.2)',
                    backgroundColor: isSelected ? opt.colorHex : 'transparent'
                  }}
                />
              </button>
            );
          })}
        </div>

        <div className="p-3 border-t border-white/5 bg-[#090e1a] text-center">
          <span className="text-[10px] text-slate-500">Salvo instantaneamente no dispositivo</span>
        </div>
      </div>
    </div>
  );
}
