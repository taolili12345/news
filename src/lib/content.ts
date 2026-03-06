import { promises as fs } from 'fs';
import path from 'path';
import matter from 'gray-matter';

// 获取所有章节ID和标题
export async function getChapterList() {
  const seriesDir = path.join(process.cwd(), 'content', 'stories', 'time-connection');
  const files = await fs.readdir(seriesDir);
  
  const chapters = [];
  for (const file of files) {
    if (file.endsWith('.md')) {
      const filePath = path.join(seriesDir, file);
      const fileContent = await fs.readFile(filePath, 'utf8');
      const { data, content } = matter(fileContent);
      
      // 提取章节号 - 支持中文和数字
      let chapterNum = 0;
      const cnMatch = file.match(/第[一二三四五六七八九十百]+章/);
      const numMatch = file.match(/第(\d+)章/);
      
      if (cnMatch) {
        // 中文数字转换
        const cn = cnMatch[0].match(/[一二三四五六七八九十百]+/)[0];
        const cnMap: Record<string, number> = {
          '一':1,'二':2,'三':3,'四':4,'五':5,'六':6,'七':7,'八':8,'九':9,'十':10
        };
        chapterNum = cnMap[cn] || 0;
      } else if (numMatch) {
        chapterNum = parseInt(numMatch[1]);
      }
      
      const chapterId = `ch${chapterNum.toString().padStart(2, '0')}`;
      
      chapters.push({
        id: chapterId,
        title: data.title || content.split('\n')[0].replace('# ', '') || `第${chapterNum}章`,
        file: file.replace('.md', ''),
        content: content,
      });
    }
  }
  
  // 按章节号排序
  return chapters.sort((a, b) => a.id.localeCompare(b.id));
}

// 根据章节ID获取单章
export async function getChapterById(series: string, chapterId: string) {
  const chapterList = await getChapterList();
  const chapter = chapterList.find((c) => c.id === chapterId);
  
  if (!chapter) {
    return {
      title: '章节加载中...',
      content: '# 即将更新',
      series,
      prevChapter: null,
      nextChapter: null,
    };
  }

  const currentIndex = chapterList.findIndex((c) => c.id === chapterId);
  
  return {
    title: chapter.title,
    content: chapter.content,
    series,
    prevChapter: currentIndex > 0 ? chapterList[currentIndex - 1].id : null,
    nextChapter: currentIndex < chapterList.length - 1 ? chapterList[currentIndex + 1].id : null,
  };
}

// 获取系列数据
export async function getSeriesData() {
  const chapterList = await getChapterList();
  
  return {
    'time-connection': {
      id: 'time-connection',
      title: '时间连线',
      desc: '跨越时空的故事连结',
      chapters: chapterList.map((c) => ({
        id: c.id,
        title: c.title,
        completed: true, // 所有章节都已发布
      })),
    },
  };
}
