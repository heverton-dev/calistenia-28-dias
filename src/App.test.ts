import { describe, it, expect } from 'vitest';
import { groupDaysByWeek, getNextAvailableDay } from './utils/challengeUtils';
import { CHALLENGE_28_DAYS } from './data/challenge28';

describe('Challenge 28-Days Grouping and Progression', () => {
  it('should split 28 days into 4 distinct weeks with 7 days each', () => {
    const weeks = groupDaysByWeek(CHALLENGE_28_DAYS);
    expect(weeks.length).toBe(4);
    expect(weeks[0].days.length).toBe(7);
    expect(weeks[1].days.length).toBe(7);
    expect(weeks[2].days.length).toBe(7);
    expect(weeks[3].days.length).toBe(7);

    expect(weeks[0].title).toContain('Semana 1');
    expect(weeks[3].title).toContain('Semana 4');
  });

  it('should return Day 1 as next available day if no completed days', () => {
    const nextDay = getNextAvailableDay([], CHALLENGE_28_DAYS);
    expect(nextDay.dayNumber).toBe(1);
  });

  it('should return Day 3 if Day 1 and Day 2 are completed', () => {
    const nextDay = getNextAvailableDay([1, 2], CHALLENGE_28_DAYS);
    expect(nextDay.dayNumber).toBe(3);
  });
});
