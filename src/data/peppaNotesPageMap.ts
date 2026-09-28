const EPISODE_TOTAL = 51;

const manualPageOverrides: Record<number, number> = {
  // Optional manual fixes: episode -> page, e.g. 8: 224,
};

export const peppaNotesPageMap: Record<number, number> = {
  1: 1,
  2: 5,
  3: 15,
  4: 9,
  5: 20,
  6: 25,
  7: 30,
  8: 224,
  9: 46,
  10: 58,
  11: 137,
  12: 161,
  13: 74,
  14: 175,
  15: 40,
  16: 53,
  17: 81,
  18: 122,
  19: 100,
  20: 113,
  21: 88,
  22: 191,
  23: 106,
  24: 197,
  25: 130,
  26: 145,
  27: 153,
  28: 166,
  29: 184,
  30: 258,
  31: 66,
  32: 203,
  33: 35,
  34: 248,
  35: 265,
  36: 320,
  37: 217,
  38: 233,
  39: 240,
  40: 282,
  41: 336,
  42: 273,
  43: 345,
  44: 299,
  45: 292,
  46: 94,
  47: 305,
  48: 313,
  49: 210,
  50: 328,
  51: 354,
};

export function getPeppaNotesPage(episodeNumber: number): number {
  const normalized = Math.min(Math.max(Math.round(episodeNumber || 1), 1), EPISODE_TOTAL);
  return manualPageOverrides[normalized] ?? peppaNotesPageMap[normalized] ?? 1;
}
