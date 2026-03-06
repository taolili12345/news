import { getChaptersByVolume } from "@/lib/actions";
import { SidebarLayout } from "@/components/layout/Sidebar";
import Link from "next/link";

export default async function VolumePage({ params }: { params: { series: string; volume: string } }) {
  const chapters = await getChaptersByVolume(params.volume);
  const vIndex = parseInt(params.volume.replace('v', ''));
  const prevVolumeUrl = vIndex > 1 ? `/stories/${params.series}/v${vIndex - 1}` : "";
  const nextVolumeUrl = vIndex < 4 ? `/stories/${params.series}/v${vIndex + 1}` : "";

  const volumeInfo = {
    v1: { title: '卷一：觉醒', desc: '12章 · 觉醒篇' },
    v2: { title: '卷二：探索', desc: '待创作' },
    v3: { title: '卷三：成长', desc: '待创作' },
    v4: { title: '卷四：...', desc: '待创作' },
  }[params.volume] || { title: `卷${vIndex}`, desc: '' };

  const totalChapters = chapters.length;
  const completedChapters = chapters.filter(c => c.id).length;
  const progress = (completedChapters / totalChapters) * 100;

  return (
    <SidebarLayout>
      <div className="relative min-h-screen bg-[#1A1A2E]">
        {/* Background Glow Blobs */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#00F5D4]/10 rounded-full blur-[100px] animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[#FF6B35]/5 rounded-full blur-[80px] animate-pulse delay-1000" />
        </div>

        {/* Content */}
        <div className="relative z-10 p-6 md:p-12">
          {/* Header */}
          <header className="mb-12 max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-5xl font-bold text-center mb-6 bg-gradient-to-r from-[#00F5D4] via-white to-[#00F5D4] bg-clip-text text-transparent">
              {volumeInfo.title}
            </h1>
            <p className="text-center text-[#8A8A9E]">
              {completedChapters} / {totalChapters} 章已更新
            </p>
          </header>

          {/* Progress Bar */}
          <div className="max-w-3xl mx-auto mb-12">
            <div className="h-2 bg-[#1F1F2E] rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-[#00F5D4] to-[#FF6B35] transition-all duration-500" style={{ width: `${progress}%` }} />
            </div>
            <div className="flex justify-between text-sm text-[#8A8A9E] mt-2">
              <span>阅读进度 {Math.round(progress)}%</span>
              <span>{volumeInfo.desc}</span>
            </div>
          </div>

          {/* Chapter Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {chapters.map((chap, idx) => (
              <Link
                key={chap.id}
                href={`/stories/${params.series}/${params.volume}/${chap.id}`}
                className="group bg-[#1F1F2E]/50 border border-[#00F5D4]/30 rounded-xl p-6 hover:border-[#00F5D4]/50 transition-all shadow-[0_0_20px_rgba(0,245,212,0.2)] hover:shadow-[0_0_30px_rgba(0,245,212,0.5)]"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[#00F5D4] font-mono text-lg">第{idx + 1}章</span>
                  <span className="text-[#FF6B35] text-sm">👁 0</span>
                </div>
                <h2 className="text-xl font-bold text-white mb-3 group-hover:text-[#00F5D4] transition-colors">
                  {chap.title}
                </h2>
                <p className="text-[#8A8A9E] text-sm line-clamp-2">
                  {(() => {
                    const lines = (chap.content || '').split('\n').filter(l => l.trim());
                    const firstLine = lines[0]?.replace(/^#+\s*/, '').substring(0, 60);
                    return firstLine || '待补充';
                  })()}
                </p>
              </Link>
            ))}
          </div>

          {/* Navigation - Fixed: disabled state for first volume */}
          <div className="flex justify-between mt-16 pt-8 border-t border-[#00F5D4]/30 max-w-3xl mx-auto">
            {prevVolumeUrl ? (
            <Link
              href={prevVolumeUrl}
              className="flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all bg-[#00F5D4] text-black hover:brightness-110 border border-[#00F5D4]/30 shadow-[0_0_15px_rgba(0,245,212,0.3)] hover:shadow-[0_0_25px_rgba(0,245,212,0.5)]"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
              上一卷
            </Link>
            ) : (
            <div className="flex items-center gap-2 px-6 py-3 rounded-lg font-medium bg-[#4A4A5C]/30 text-[#8A8A9E] border border-[#8A8A9E]/10">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
              上一卷
            </div>
            )}
            {nextVolumeUrl ? (
            <Link
              href={nextVolumeUrl}
              className="flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all bg-[#00F5D4] text-black hover:brightness-110 border border-[#00F5D4]/30 shadow-[0_0_15px_rgba(0,245,212,0.3)] hover:shadow-[0_0_25px_rgba(0,245,212,0.5)]"
            >
              下一卷
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </Link>
            ) : (
            <div className="flex items-center gap-2 px-6 py-3 rounded-lg font-medium bg-[#4A4A5C]/30 text-[#8A8A9E] border border-[#8A8A9E]/10">
              下一卷
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </div>
            )}
          </div>
        </div>
      </div>
    </SidebarLayout>
  );
}