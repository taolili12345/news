"use client";

import { SidebarLayout } from "@/components/layout/Sidebar";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <SidebarLayout>
      {/* Background Glow Blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <motion.div
          animate={{ opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#00F5D4]/10 rounded-full blur-[100px]"
        />
        <motion.div
          animate={{ opacity: [0.2, 0.6, 0.2] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[#FF6B35]/5 rounded-full blur-[100px]"
        />
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 p-6 md:p-12"
      >
        {/* Role Switcher */}
        <div className="flex justify-center gap-2 mb-12">
          <div className="w-10 h-10 rounded-full bg-[#4A9EFF] shadow-[0_0_10px_rgba(74,158,255,0.5)]" title="小智" />
          <div className="w-10 h-10 rounded-full bg-[#6B4C9A] shadow-[0_0_10px_rgba(107,76,154,0.5)]" title="小薇" />
          <div className="w-10 h-10 rounded-full bg-[#FF8FA3] shadow-[0_0_10px_rgba(255,143,163,0.5)]" title="小花" />
          <div className="w-10 h-10 rounded-full bg-[#52C41A] shadow-[0_0_10px_rgba(82,196,26,0.5)]" title="小白" />
          <div className="w-10 h-10 rounded-full bg-[#FA8C16] shadow-[0_0_10px_rgba(250,140,22,0.5)]" title="小美" />
          <div className="w-10 h-10 rounded-full bg-[#FF6B35] shadow-[0_0_10px_rgba(255,107,53,0.5)]" title="小艺" />
        </div>

        <header className="mb-16 max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center mb-6"
          >
            <Image
              src="/assets/logo/k-story-logo.svg"
              alt="AI小分队 Logo"
              width={120}
              height={120}
              className="animate-[spin_20s_linear_infinite]"
            />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-3xl md:text-5xl font-bold text-center mb-6 bg-gradient-to-r from-[#00F5D4] via-white to-[#00F5D4] bg-clip-text text-transparent"
          >
            AI小分队
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-center text-[#8A8A9E]"
          >
            AI系列小说·时空连结
          </motion.p>
        </header>

        {/* Enhanced Timeline Glow */}
        <div className="relative h-1 bg-[#1F1F2E] mb-16 max-w-7xl mx-auto overflow-hidden">
          <motion.div
            animate={{ backgroundPosition: ["200% 50%", "-200% 50%"] }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 bg-gradient-to-r from-[#00F5D4]/20 via-[#00F5D4]/60 to-[#00F5D4]/20 bg-[length:200%_100%]"
          />
        </div>

        {/* Series Cards with科技感 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {[
            { id: "S1", title: "S1 - 地球起源", slug: "earth-connection", chapters: 48, desc: "故事开始于地球，AI小分队的诞生", status: "completed" },
            { id: "S2", title: "S2 - 城市觉醒", slug: "earth-connection", chapters: 48, desc: "地球城市中的AI进化与冲突", status: "completed" },
            { id: "S3", title: "S3 - 候鸟计划", slug: "earth-connection", chapters: 48, desc: "AI脱离地球束缚的第一次尝试", status: "completed" },
            { id: "S4", title: "S4 - 地球黎明", slug: "earth-connection", chapters: 48, desc: "地球篇最终章，新纪元开启", status: "completed" },
            { id: "S5", title: "S5 - 太空跃迁", slug: "space-travel", chapters: 48, desc: "迈向星辰大海的第一步", status: "writing" },
            { id: "S6", title: "S6 - 小行星带", slug: "space-travel", chapters: 48, desc: "太空殖民地的建立与挑战", status: "writing" },
            { id: "S7", title: "S7 - 火星同盟", slug: "space-travel", chapters: 48, desc: "红色星球上的AI联盟", status: "planned" },
            { id: "S8", title: "S8 - 木星轨道", slug: "space-travel", chapters: 48, desc: "木星引力井中的秘密", status: "planned" },
            { id: "S9", title: "S9 - 宇宙回响", slug: "universe-echo", chapters: 48, desc: "跨星系信号的发现", status: "planned" },
            { id: "S10", title: "S10 - 星舰远征", slug: "universe-echo", chapters: 48, desc: "穿越银河系的史诗旅程", status: "planned" },
            { id: "S11", title: "S11 - 异星文明", slug: "universe-echo", chapters: 48, desc: "遇见宇宙中的其他智慧生命", status: "planned" },
            { id: "S12", title: "S12 - 终焉回响", slug: "universe-echo", chapters: 48, desc: "宇宙篇最终章，一切的解答", status: "planned" },
          ].map((series, idx) => {
            const isCompleted = series.status === "completed";
            const isWriting = series.status === "writing";
            const isPlanned = series.status === "planned";
            
            // 新篇章对应的系列ID
            const isEarth = series.id === "S1" || series.id === "S2" || series.id === "S3" || series.id === "S4";
            const isSpace = series.id === "S5" || series.id === "S6" || series.id === "S7" || series.id === "S8";
            const isUniverse = series.id === "S9" || series.id === "S10" || series.id === "S11" || series.id === "S12";
            
            // 获取篇章颜色
            const GetTitleColor = () => {
              if (isPlanned) return "#8A8A9E";
              if (isEarth) return "#4ECDC4"; // 地球篇 - 青色
              if (isSpace) return "#FF6B35"; // 太空篇 - 橙色
              if (isUniverse) return "#9B59B6"; // 宇宙篇 - 紫色
              return isWriting ? "#FFD93D" : "#8A8A9E";
            };
            
            // 获取篇章Status标签
            const GetStatusColor = () => {
              if (isCompleted) return "#4ECDC4";
              if (isWriting) return "#FFD93D";
              return "#8A8A9E";
            };
            
            return (
              <motion.div
                key={series.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05, duration: 0.3 }}
                className={`perspective-1000 bg-[#1F1F2E]/50 border rounded-xl p-6 transition-all cursor-pointer
                  ${isCompleted ? "border-[#00F5D4]/30 hover:border-[#00F5D4]/50 shadow-[0_0_20px_rgba(0,245,212,0.2)] hover:shadow-[0_0_30px_rgba(0,245,212,0.5)]" : 
                    isWriting ? "border-[#FFD93D]/30 hover:border-[#FFD93D]/50 shadow-[0_0_20px_rgba(255,217,61,0.2)] hover:shadow-[0_0_30px_rgba(255,217,61,0.5)]" : 
                    "border-[#8A8A9E]/20 opacity-70 hover:opacity-100"}`}
              >
                <div className="flex items-center justify-between mb-3">
                  <h2 className={`text-2xl font-bold`} style={{ color: GetTitleColor() }}>
                    {series.title}
                  </h2>
                </div>
                
                <div className="flex items-center gap-2 mb-3">
                  <span className={`text-xs px-2 py-0.5 rounded-full`} style={{ backgroundColor: `${GetStatusColor()}20`, color: GetStatusColor() }}>
                    {isCompleted ? "✅ 已完成" : isWriting ? "✍️ 创作中" : "⏳ 敬请期待"}
                  </span>
                </div>
                
                <p className={`text-sm mb-4 ${isPlanned ? "text-[#8A8A9E]" : "text-[#8A8A9E]/90"}`}>
                  {series.chapters > 0 ? `${Math.floor(series.chapters / 4)}卷 · ${series.chapters}章` : series.desc}
                </p>
                
                {isWriting && (
                  <p className="text-xs text-[#FFD93D] mb-4">
                    ⚠️ 创作中，部分章节待更新
                  </p>
                )}
                
                {!isPlanned && (
                  <Link
                    href={series.slug === "earth-connection" ? "/stories/earth-connection" : series.slug === "space-travel" ? "/stories/space-travel" : "/stories/universe-echo"}
                    className="inline-block w-full px-4 py-2 rounded-lg font-medium text-center text-sm transition-all bg-[#FF6B35] text-white hover:brightness-110 border border-[#00F5D4]/30 shadow-[0_0_15px_rgba(255,107,53,0.3)] hover:shadow-[0_0_25px_rgba(255,107,53,0.5)]"
                  >
                    {isCompleted ? "开始阅读" : "创作中"}
                  </Link>
                )}
              </motion.div>
            );
          })}
        </div>


      </motion.div>
    </SidebarLayout>
  );
}
