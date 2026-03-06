// src/lib/chapter-cache.ts
const CACHE_KEY_PREFIX = 'k-story-chapter-';
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24小时

interface ChapterCache {
  data: ChapterData;
  timestamp: number;
}

interface ChapterData {
  id: string;
  title: string;
  content: string;
  prevChapter: string | null;
  nextChapter: string | null;
}

export async function getChapterFromCache(id: string): Promise<ChapterData | null> {
  try {
    const cached = localStorage.getItem(`${CACHE_KEY_PREFIX}${id}`);
    if (!cached) return null;
    
    const { data, timestamp }: ChapterCache = JSON.parse(cached);
    const now = Date.now();
    
    // 超过缓存时间则失效
    if (now - timestamp > CACHE_DURATION) {
      localStorage.removeItem(`${CACHE_KEY_PREFIX}${id}`);
      return null;
    }
    
    return data;
  } catch (e) {
    return null;
  }
}

export async function saveChapterToCache(id: string, data: ChapterData): Promise<void> {
  try {
    const cache: ChapterCache = {
      data,
      timestamp: Date.now(),
    };
    localStorage.setItem(`${CACHE_KEY_PREFIX}${id}`, JSON.stringify(cache));
  } catch (e) {
    // 忽略缓存写入错误（可能 localStorage 满了）
  }
}
