import { AlertTriangle, X, Trash2, Ban } from 'lucide-react';

interface ResetConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export function ResetConfirmationModal({ isOpen, onClose, onConfirm }: ResetConfirmationModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-md flex items-center justify-center p-4 select-none">
      <div className="bg-[#0b101d] w-full max-w-md rounded-3xl border border-white/10 shadow-2xl animate-in fade-in duration-200 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-white/5 flex items-center justify-between bg-[#0e1424]">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-red-500/15 text-red-400 flex items-center justify-center border border-red-400/20 shrink-0">
              <AlertTriangle size={20} />
            </div>
            <div>
              <span className="text-[10px] font-extrabold text-red-400 uppercase tracking-widest block whitespace-nowrap">
                Atenção
              </span>
              <h3 className="text-sm font-black text-white whitespace-nowrap">Reiniciar Progresso</h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-[#141c30] text-slate-300 hover:text-white border border-white/5 active:scale-90 transition-transform"
            aria-label="Cancelar"
          >
            <X size={16} />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-3">
          <p className="text-sm text-slate-300 leading-relaxed">
            Você está prestes a <span className="text-white font-bold">reiniciar todo o seu progresso</span> do Desafio de 28 Dias.
          </p>
          <p className="text-sm text-slate-400 leading-relaxed">
            Esta ação <span className="text-red-400 font-bold">não pode ser desfeita</span>. Todos os dias concluídos, histórico de peso e streak serão apagados.
          </p>
          <div className="flex items-start gap-2 p-2.5 rounded-xl bg-red-500/5 border border-red-400/10 mt-3">
            <AlertTriangle size={14} className="text-red-400 mt-0.5 shrink-0" />
            <span className="text-xs text-red-300">
              Certifique-se de que deseja continuar. Seus dados não serão recuperados após esta ação.
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="border-t border-white/5 p-3 flex gap-2.5">
          <button
            onClick={onClose}
            className="flex-1 py-3 rounded-2xl font-bold text-xs text-slate-300 hover:text-white bg-[#111728] border border-white/5 active:scale-95 transition-all flex items-center justify-center gap-1.5"
          >
            <Ban size={14} />
            Cancelar
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="flex-1 py-3 rounded-2xl font-black text-xs text-white bg-gradient-to-r from-red-500 to-red-600 hover:opacity-90 shadow-lg active:scale-95 transition-all flex items-center justify-center gap-1.5"
          >
            <Trash2 size={14} />
            Reiniciar Tudo
          </button>
        </div>
      </div>
    </div>
  );
}
