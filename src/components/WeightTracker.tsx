import React, { useState } from 'react';
import { WeightEntry } from '../types/workout';
import { calculateWeightChange } from '../utils/storage';
import { Scale, TrendingDown, TrendingUp, Plus, Check } from 'lucide-react';

interface Point {
  x: number;
  y: number;
}

export function calculateSvgPoints(
  history: WeightEntry[],
  width: number,
  height: number,
  padding: number = 10
): Point[] {
  if (history.length === 0) return [];
  if (history.length === 1) {
    return [{ x: width / 2, y: height / 2 }];
  }

  const weights = history.map(h => h.weightKg);
  const minWeight = Math.min(...weights) - 0.5;
  const maxWeight = Math.max(...weights) + 0.5;
  const range = maxWeight - minWeight || 1;

  const usableWidth = width - padding * 2;
  const usableHeight = height - padding * 2;

  return history.map((item, index) => {
    const x = padding + (index / (history.length - 1)) * usableWidth;
    // Inverte Y para que valores maiores fiquem no topo
    const normalizedY = (item.weightKg - minWeight) / range;
    const y = height - padding - normalizedY * usableHeight;
    return {
      x: Number(x.toFixed(1)),
      y: Number(y.toFixed(1))
    };
  });
}

interface WeightTrackerProps {
  history: WeightEntry[];
  onSaveWeight: (weight: number) => void;
}

export function WeightTracker({ history, onSaveWeight }: WeightTrackerProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [inputVal, setInputVal] = useState('');

  const currentWeight = history.length > 0 ? history[history.length - 1].weightKg : null;
  const delta = calculateWeightChange(history);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = parseFloat(inputVal.replace(',', '.'));
    if (!isNaN(parsed) && parsed > 30 && parsed < 250) {
      onSaveWeight(parsed);
      setInputVal('');
      setIsAdding(false);
    }
  };

  const svgWidth = 260;
  const svgHeight = 65;
  const points = calculateSvgPoints(history, svgWidth, svgHeight);
  const pointsString = points.map(p => `${p.x},${p.y}`).join(' ');

  return (
    <div className="bg-[#111728] p-4 rounded-3xl border border-white/5 shadow-md">
      {/* Top Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-orange-500/15 text-orange-400 flex items-center justify-center border border-orange-500/25">
            <Scale size={16} />
          </div>
          <div>
            <span className="text-[10px] text-slate-400 uppercase font-extrabold tracking-wider block">
              Peso Corporal
            </span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-lg font-black text-white font-mono">
                {currentWeight ? `${currentWeight.toFixed(1)} kg` : '-- kg'}
              </span>
              {history.length >= 2 && (
                <span
                  className={`text-[11px] font-bold flex items-center font-mono ${
                    delta <= 0 ? 'text-emerald-400' : 'text-amber-400'
                  }`}
                >
                  {delta <= 0 ? <TrendingDown size={12} className="mr-0.5" /> : <TrendingUp size={12} className="mr-0.5" />}
                  {delta > 0 ? `+${delta}` : delta} kg
                </span>
              )}
            </div>
          </div>
        </div>

        <button
          onClick={() => setIsAdding(prev => !prev)}
          className="text-xs font-bold px-2.5 py-1.5 rounded-xl bg-[#1b253d] text-orange-400 hover:text-white border border-white/5 flex items-center gap-1 active:scale-95 transition-all"
        >
          <Plus size={14} />
          {isAdding ? 'Fechar' : 'Registrar'}
        </button>
      </div>

      {/* Formulário de Registro Rápido */}
      {isAdding && (
        <form onSubmit={handleSubmit} className="flex gap-2 mb-3 animate-in fade-in duration-200">
          <input
            type="number"
            step="0.1"
            placeholder="Ex: 78.5"
            value={inputVal}
            onChange={e => setInputVal(e.target.value)}
            className="flex-1 bg-[#090d16] border border-white/10 rounded-xl px-3 py-1.5 text-sm text-white font-mono focus:outline-none focus:border-orange-500"
            autoFocus
          />
          <button
            type="submit"
            className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold text-xs flex items-center gap-1 shadow-md shadow-orange-500/20 active:scale-95"
          >
            <Check size={14} />
            Salvar
          </button>
        </form>
      )}

      {/* Gráfico Vetorial SVG de Evolução */}
      {history.length >= 2 ? (
        <div className="relative w-full h-16 bg-[#090d16] rounded-2xl border border-white/5 p-1 flex items-center justify-center overflow-hidden">
          <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full h-full">
            <defs>
              <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#f97316" />
                <stop offset="100%" stopColor="#22c55e" />
              </linearGradient>
            </defs>
            <polyline
              fill="none"
              stroke="url(#lineGrad)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              points={pointsString}
            />
            {points.map((pt, i) => (
              <circle
                key={i}
                cx={pt.x}
                cy={pt.y}
                r="4"
                fill="#f8fafc"
                stroke="#f97316"
                strokeWidth="2"
              />
            ))}
          </svg>
        </div>
      ) : (
        <p className="text-[11px] text-slate-500 text-center py-2 bg-[#090d16] rounded-xl border border-white/5">
          Registre seu peso periodicamente para traçar o gráfico de evolução.
        </p>
      )}
    </div>
  );
}
