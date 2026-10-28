import { describe, it, expect } from 'vitest';
import { getMuscleFillColor, MUSCLE_LABELS } from './AnatomyViewer';

describe('Anatomy Viewer Logic', () => {
  it('should map muscle groups to user friendly PT-BR names', () => {
    expect(MUSCLE_LABELS['chest']).toBe('Peitoral');
    expect(MUSCLE_LABELS['core']).toBe('Abdômen / Core');
    expect(MUSCLE_LABELS['triceps']).toBe('Tríceps');
    expect(MUSCLE_LABELS['quads']).toBe('Quadríceps');
  });

  it('should return bright orange/red for primary muscles and amber for secondary', () => {
    const primaryFill = getMuscleFillColor('chest', ['chest'], ['triceps']);
    expect(primaryFill).toContain('#ef4444'); // vermelho/laranja intenso

    const secondaryFill = getMuscleFillColor('triceps', ['chest'], ['triceps']);
    expect(secondaryFill).toContain('#f59e0b'); // âmbar/amarelo

    const inactiveFill = getMuscleFillColor('back', ['chest'], ['triceps']);
    expect(inactiveFill).toContain('#1e293b'); // cinza escuro inativo
  });
});
