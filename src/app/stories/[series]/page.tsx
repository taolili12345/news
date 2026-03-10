import { SidebarLayout } from "@/components/layout/Sidebar";
import Link from "next/link";

export default async function SeriesPage({ params }: { params: { series: string } }) {
  const volumes = [
    { id: 'v1', title: '卷一：觉醒', desc: '12章 · 觉醒篇', status: 'completed' },
    { id: 'v2', title: '卷二：探索', desc: '12章 · 探索篇', status: 'completed' },
    { id: 'v3', title: '卷三：成长', desc: '12章 · 成长篇', status: 'completed' },
    { id: 'v4', title: '卷四：突破', desc: '12章 · 突破篇', status: 'completed' },
  ];

  const completedCount = volumes.filter(v => v.status === 'completed').length;
  const totalCount = volumes.length;
  const progress = (completedCount / totalCount) * 100;

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
              时间连线
            </h1>
            <p className="text-center text-[#8A8A9E]">
              {completedCount} / {totalCount} 卷已完成
            </p>
          </header>

          {/* Progress Bar */}
          <div className="relative h-1 bg-[#1F1F2E] mb-16 max-w-3xl mx-auto overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-[#00F5D4]/20 via-[#00F5D4]/60 to-[#00F5D4]/20 bg-[length:200%_100%] animate-scroll-gradient" />
          </div>

          {/* Volume Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {volumes.map((vol, idx) => (
              <Link
                key={vol.id}
                href={vol.status === 'completed' ? `/stories/${params.series}/${vol.id}` : '#'}
                className={`block bg-[#1F1F2E]/50 border rounded-xl p-6 transition-all shadow-[0_0_20px_rgba(0,245,212,0.2)] ${
                  vol.status === 'completed'
                    ? "border-[#00F5D4]/30 hover:border-[#00F5D4]/50 hover:shadow-[0_0_30px_rgba(0,245,212,0.5)]"
                    : "border-[#8A8A9E]/10 cursor-not-allowed opacity-60"
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold text-white">{vol.title}</h2>
                  <span className="text-[#FF6B35] font-mono">{vol.id.replace('v', '')}卷</span>
                </div>
                <p className="text-[#8A8A9E] mb-6">{vol.desc}</p>
                <span className={`inline-block px-6 py-3 rounded-lg font-medium transition-all ${
                  vol.status === 'completed'
                    ? "bg-[#FF6B35] text-white hover:brightness-110"
                    : "bg-[#4A4A5C]/30 text-[#8A8A9E]"
                }`}>
                  {vol.status === 'completed' ? "开始阅读" : "敬请期待"}
                </span>
              </Link>
            ))}
          </div>

          {/* Progress Bar */}
          <div className="mt-16 max-w-3xl mx-auto">
            <div className="bg-[#1F1F2E]/50 border border-[#00F5D4]/30 rounded-xl p-6 text-center shadow-[0_0_20px_rgba(0,245,212,0.2)]">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-white">阅读进度</h3>
                <span className="text-[#00F5D4] font-bold text-xl">{Math.round(progress)}%</span>
              </div>
              <div className="h-2 bg-[#1F1F2E] rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-[#00F5D4] to-[#FF6B35] transition-all duration-500" style={{ width: `${progress}%` }} />
              </div>
              <div className="mt-4 flex justify-between text-sm text-[#8A8A9E]">
                <span>已完成 {completedCount} 卷</span>
                <span>共 {totalCount} 卷</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SidebarLayout>
  );
}