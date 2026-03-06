import { getChapterById } from "@/lib/actions";
import Link from "next/link";
import dynamic from "next/dynamic";

// 动态导入评论组件，禁用 SSR
const CommentSection = dynamic(() => import("@/components/CommentSection"), { ssr: false });

export default async function ChapterPage({ params }: { params: { series: string; volume: string; chapter: string } }) {
  const chapter = await getChapterById(params.chapter, params.volume);
  const seriesChapters = Array.from({ length: 12 }, (_, i) => ({
    id: `ch${(i + 1).toString().padStart(2, '0')}`,
    title: `第${i + 1}章`,
  }));
  const currentIndex = seriesChapters.findIndex((c) => c.id === params.chapter);

  const prevChapterUrl = chapter.prevChapter ? `/stories/${params.series}/${params.volume}/${chapter.prevChapter}` : "";
  const nextChapterUrl = chapter.nextChapter ? `/stories/${params.series}/${params.volume}/${chapter.nextChapter}` : "";
  const returnUrl = `/stories/${params.series}/${params.volume}`;

  return (
    <div className="relative min-h-screen bg-[#1A1A2E]">
      {/* Background Glow Blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#00F5D4]/15 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[#FF6B35]/10 rounded-full blur-[80px]" />
      </div>

      {/* Top Navigation */}
      <nav className="fixed top-0 left-0 right-0 h-16 bg-[#1F1F2E]/70 backdrop-blur-md border-b border-[rgba(0,245,212,0.3)] z-50 px-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-[#FF6B35] rounded-lg shadow-[0_0_15px_rgba(255,107,53,0.3)]" />
          <span className="text-lg font-bold text-[#FFFFFF]">AI小分队</span>
        </div>
        <div className="hidden md:flex items-center gap-1">
          <Link href="/" className="px-4 py-2 rounded-lg text-[#8A8A9E] hover:bg-[rgba(31,31,46,0.5)] hover:border-[rgba(0,245,212,0.3)] border transition-all">首页</Link>
          <Link href={`/stories/${params.series}`} className="px-4 py-2 rounded-lg text-[#FFFFFF] bg-[rgba(31,31,46,0.5)] border border-[#00F5D4] shadow-[0_0_10px_rgba(0,245,212,0.1)]">卷列表</Link>
          <Link href="#" className="px-4 py-2 rounded-lg text-[#8A8A9E] hover:bg-[rgba(31,31,46,0.5)] hover:border-[rgba(0,245,212,0.3)] border transition-all">关于</Link>
        </div>
      </nav>

      {/* Main Layout */}
      <div className="pt-20 flex flex-col md:flex-row min-h-[calc(100vh-64px)]">
        {/* Sidebar */}
        <aside className="w-72 bg-[#1F1F2E]/70 backdrop-blur-md border-r border-[rgba(0,245,212,0.3)] overflow-y-auto hidden md:block">
          <div className="p-6">
            <div className="bg-[rgba(31,31,46,0.5)] backdrop-blur-md border border-[rgba(0,245,212,0.3)] rounded-xl p-6 mb-8">
              <div className="text-4xl font-bold text-[#00F5D4] mb-2">
                {params.volume.replace('v', '.')}
              </div>
              <div className="text-[#FFFFFF] font-medium text-lg">
                {params.chapter.replace('ch', '')}
              </div>
            </div>

            <h3 className="text-sm font-semibold text-[#8A8A9E] uppercase tracking-wider mb-4">章节列表</h3>
            <nav className="space-y-2">
              {seriesChapters.map((chap, idx) => (
                <Link
                  key={chap.id}
                  href={`/stories/${params.series}/${params.volume}/${chap.id}`}
                  className={`block p-4 rounded-lg transition-all ${
                    chap.id === params.chapter
                      ? "bg-[#FF6B35] text-[#FFFFFF] font-bold shadow-[0_0_15px_rgba(255,107,53,0.3)]"
                      : "bg-[#1F1F2E]/70 border border-[rgba(0,245,212,0.3)] hover:bg-[rgba(31,31,46,0.7)] hover:border-[rgba(0,245,212,0.6)]"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{idx + 1}. {chap.title}</span>
                    {chap.id === params.chapter && <span className="text-sm opacity-80">当前</span>}
                  </div>
                </Link>
              ))}
            </nav>

            <div className="mt-8 pt-6 border-t border-[rgba(0,245,212,0.3)]">
              <Link href={returnUrl} className="block w-full py-3 text-center rounded-lg bg-[#1F1F2E]/70 text-[#8A8A9E] hover:bg-[#00F5D4] hover:text-[#1A1A2E] transition-all border border-[rgba(0,245,212,0.3)]">
                ← 返回目录
              </Link>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 md:p-10 lg:p-12 overflow-y-auto max-w-[720px] mx-auto">
          <header className="mb-12 text-center border-b border-[rgba(0,245,212,0.3)] pb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-[#FFFFFF] mb-4">
              {chapter.title}
            </h1>
            <div className="text-[#8A8A9E] text-sm flex items-center justify-center gap-4">
              <span className="flex items-center gap-1">📅 2026-03-04</span>
              <span>•</span>
              <span>{chapter.content && typeof chapter.content === 'string' ? chapter.content.length : 0} 字</span>
            </div>
          </header>

          <article className="prose prose-invert max-w-none leading-[1.8]">
            <div
              className="whitespace-pre-wrap text-[#FFFFFF] text-lg leading-relaxed"
              dangerouslySetInnerHTML={{
                __html: chapter.content
                  // 移除 md 标题（已由页面 header 渲染）
                  .replace(/^#\s+(.+)$/gm, '<!-- $1 -->')
                  // 加粗：**文字** -> <strong>文字</strong>
                  .replace(/\*\*(.+?)\*\*/g, '<strong class="text-[#FF6B35]">$1</strong>')
                  // 斜体：*文字* -> <em>文字</em>
                  .replace(/\*(.+?)\*/g, '<em class="italic text-[#9D4EDD]">$1</em>'),
              }}
            />
          </article>

          {/* Navigation */}
          <div className="flex justify-between mt-16 pt-8 border-t border-[rgba(0,245,212,0.3)]">
            {prevChapterUrl ? (
            <Link
              href={prevChapterUrl}
              className="flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all bg-[#00F5D4] text-white hover:shadow-[0_0_20px_rgba(0,245,212,0.3)]"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
              上一章
            </Link>
            ) : (
            <div className="flex items-center gap-2 px-6 py-3 rounded-lg font-medium bg-[rgba(31,31,46,0.5)] text-[#8A8A9E] cursor-not-allowed border border-[rgba(0,245,212,0.1)]">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
              上一章
            </div>
            )}
            <Link href={returnUrl} className="px-6 py-3 text-[#8A8A9E] hover:text-[#00F5D4] transition-colors">
              返回目录
            </Link>
            <Link
              href={nextChapterUrl}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
                nextChapterUrl
                  ? "bg-[#FF6B35] text-[#FFFFFF] hover:shadow-[0_0_20px_rgba(255,107,53,0.3)]"
                  : "bg-[rgba(31,31,46,0.5)] text-[#8A8A9E] cursor-not-allowed border border-[rgba(0,245,212,0.1)]"
              }`}
            >
              下一章
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </Link>
          </div>

          {/* Comment Section */}
          <CommentSection />
        </main>
      </div>

      {/* Bottom Progress */}
      <div className="fixed bottom-0 left-0 right-0 h-1 bg-[rgba(0,245,212,0.15)] z-50">
        <div className="h-full bg-gradient-to-r from-[#00F5D4] to-[#FF6B35]" style={{ width: `${((currentIndex + 1) / seriesChapters.length) * 100}%` }} />
      </div>
    </div>
  );
}
