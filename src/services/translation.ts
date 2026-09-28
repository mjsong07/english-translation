const FALLBACK_DICTIONARY: Record<string, string> = {
  "where there is a will, there is a way": "有志者，事竟成。",
  "knowledge is power": "知识就是力量。",
  "time is money": "时间就是金钱。",
  "practice makes perfect": "熟能生巧。",
  "actions speak louder than words": "行动胜于空谈。"
};

function normalizeKey(value: string) {
  return value.toLowerCase().trim().replace(/\s+/g, " ");
}

const translationMemory = new Map<string, string>();

export async function translateEnglishToChinese(english: string): Promise<string> {
  const key = normalizeKey(english);
  const inMemory = translationMemory.get(key);
  if (inMemory) return inMemory;
  if (FALLBACK_DICTIONARY[key]) return FALLBACK_DICTIONARY[key];

  const endpoint = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(english)}&langpair=en|zh-CN`;
  try {
    const response = await fetch(endpoint);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const payload = await response.json() as {
      responseData?: { translatedText?: string };
    };
    const translated = payload.responseData?.translatedText?.trim();
    if (!translated) throw new Error("Empty translation");
    translationMemory.set(key, translated);
    return translated;
  } catch {
    const fallback = `（自动翻译失败）${english}`;
    translationMemory.set(key, fallback);
    return fallback;
  }
}

export async function translateBatch(items: Array<{ id: string; english: string }>) {
  const pairs = await Promise.all(
    items.map(async (item) => ({ id: item.id, chinese: await translateEnglishToChinese(item.english) }))
  );
  return Object.fromEntries(pairs.map((pair) => [pair.id, pair.chinese])) as Record<string, string>;
}
