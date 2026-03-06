"use server";

import { promises as fs } from 'fs';
import path from 'path';
import matter from 'gray-matter';
import iconv from 'iconv-lite';

export async function getChapterById(id: string, volume: string = 'v1') {
  const chapterNum = parseInt(id.replace('ch', ''));
  const filePath = path.join(process.cwd(), 'content', 'stories', 'time-connection', volume, `${chapterNum}.md`);
  
  try {
    const buffer = await fs.readFile(filePath);
    // 直接用 UTF-8 解码，gray-matter 会自动处理 BOM
    const content = buffer.toString('utf8');
    const { data, content: body } = matter(content);
    
    return { 
      id,
      title: data.title || `第${chapterNum}章`,
      content: body || '',
      prevChapter: chapterNum > 1 ? `ch${(chapterNum - 1).toString().padStart(2, '0')}` : null,
      nextChapter: chapterNum < 12 ? `ch${(chapterNum + 1).toString().padStart(2, '0')}` : null,
      wordCount: data.wordCount?.match(/\d+/)?.[0] || '0',
    };
  } catch (e) {
    return {
      id,
      title: '章节不存在',
      content: `章节不存在：${id}`,
      prevChapter: null,
      nextChapter: null,
      wordCount: '0',
    };
  }
}

export async function getChaptersByVolume(volume: string = 'v1') {
  const volumePath = path.join(process.cwd(), 'content', 'stories', 'time-connection', volume);
  
  try {
    const files = await fs.readdir(volumePath);
    const mdFiles = files.filter(f => f.endsWith('.md')).sort((a, b) => {
      const numA = parseInt(a.replace('.md', ''));
      const numB = parseInt(b.replace('.md', ''));
      return numA - numB;
    });
    
    const chapters = [];
    for (const file of mdFiles) {
      const num = parseInt(file.replace('.md', ''));
      const filePath = path.join(volumePath, file);
      const buffer = await fs.readFile(filePath);
      const content = buffer.toString('utf8');
      const { data, content: body } = matter(content);
      
      chapters.push({
        id: `ch${num.toString().padStart(2, '0')}`,
        title: data.title || `第${num}章`,
        content: body || '',
        wordCount: data.wordCount?.match(/\d+/)?.[0] || '0',
      });
    }
    
    return chapters;
  } catch (e) {
    return [];
  }
}
