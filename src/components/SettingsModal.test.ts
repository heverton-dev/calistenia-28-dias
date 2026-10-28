import { describe, it, expect, beforeEach } from 'vitest';
import { loadProgress, saveSettings, resetProgress } from '../utils/storage';

describe('Settings Management & Persistence', () => {
  beforeEach(() => {
    resetProgress();
  });

  it('should load default settings initially', () => {
    const progress = loadProgress();
    expect(progress.settings.soundEnabled).toBe(true);
    expect(progress.settings.prepTimeSeconds).toBe(5);
    expect(progress.settings.restTimeMultiplier).toBe(1.0);
  });

  it('should update and persist customized settings', () => {
    saveSettings({
      soundEnabled: false,
      prepTimeSeconds: 10,
      restTimeMultiplier: 1.2
    });

    const reloaded = loadProgress();
    expect(reloaded.settings.soundEnabled).toBe(false);
    expect(reloaded.settings.prepTimeSeconds).toBe(10);
    expect(reloaded.settings.restTimeMultiplier).toBe(1.2);
  });
});
