import { describe, it, expect, beforeEach } from 'vitest';
import { loadProgress, saveCompletedDay, calculateStreak, resetProgress } from './storage';
import { playCountdownBeep, playTransitionBell } from './sound';

describe('Storage & Progress Engine', () => {
  beforeEach(() => {
    resetProgress();
  });

  it('should initialize empty progress if nothing in storage', () => {
    const progress = loadProgress();
    expect(progress.completedDays).toEqual([]);
    expect(progress.currentStreak).toBe(0);
    expect(progress.bestStreak).toBe(0);
    expect(progress.totalWorkoutsCompleted).toBe(0);
  });

  it('should mark day 1 as completed and update streak', () => {
    const updated = saveCompletedDay(1);
    expect(updated.completedDays).toContain(1);
    expect(updated.currentStreak).toBe(1);
    expect(updated.totalWorkoutsCompleted).toBe(1);
    expect(updated.lastCompletedDate).toBeDefined();

    // Persistência
    const reloaded = loadProgress();
    expect(reloaded.completedDays).toEqual([1]);
  });

  it('should calculate consecutive streak accurately', () => {
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];

    const streak1 = calculateStreak(yesterday, 3);
    expect(streak1).toBe(4); // dia anterior continuou ofensiva

    const streakOld = calculateStreak('2020-01-01', 5);
    expect(streakOld).toBe(1); // quebrou ofensiva, reinicia em 1
  });

  it('should reset progress when requested', () => {
    saveCompletedDay(1);
    saveCompletedDay(2);
    resetProgress();
    const fresh = loadProgress();
    expect(fresh.completedDays).toEqual([]);
  });
});

describe('Web Audio Synthesizer', () => {
  it('should export audio functions that can be invoked safely in browser/mock environments', () => {
    expect(typeof playCountdownBeep).toBe('function');
    expect(typeof playTransitionBell).toBe('function');

    // Executa com fallback seguro sem lançar erro
    expect(() => playCountdownBeep(3)).not.toThrow();
    expect(() => playCountdownBeep(1)).not.toThrow();
    expect(() => playTransitionBell()).not.toThrow();
  });
});
