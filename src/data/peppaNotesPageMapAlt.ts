const EPISODE_TOTAL = 51;

const manualPageOverrides: Partial<Record<number, number>> = {
  // Optional manual fixes: episode -> page, e.g. 17: 10,
};

export const peppaNotesPageMapAlt: Record<number, number | null> = {
  1: 1,
  2: 2,
  3: 2,
  4: 3,
  5: 4,
  6: 4,
  7: 4,
  8: 5,
  9: 6,
  10: 6,
  11: 7,
  12: 7,
  13: 8,
  14: 8,
  15: 9,
  16: 9,
  17: null,
  18: 10,
  19: 10,
  20: 11,
  21: 11,
  22: null,
  23: null,
  24: null,
  25: null,
  26: null,
  27: null,
  28: 12,
  29: null,
  30: 13,
  31: 13,
  32: 14,
  33: 14,
  34: null,
  35: null,
  36: 15,
  37: null,
  38: 15,
  39: null,
  40: 16,
  41: 17,
  42: 17,
  43: 17,
  44: 18,
  45: 18,
  46: null,
  47: null,
  48: 19,
  49: 19,
  50: 20,
  51: 20,
};

export function getPeppaNotesPageAlt(episodeNumber: number): number | null {
  const normalized = Math.min(Math.max(Math.round(episodeNumber || 1), 1), EPISODE_TOTAL);
  return manualPageOverrides[normalized] ?? peppaNotesPageMapAlt[normalized] ?? null;
}
