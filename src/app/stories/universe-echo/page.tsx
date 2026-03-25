"use client";

import { SidebarLayout } from "@/components/layout/Sidebar";
import { motion } from "framer-motion";
import Link from "next/link";

export default function UniverseEchoPage() {
  const universeSeries = [
    { id: "S9", title: "S9 - 宇宙回响", chapters: 48, desc: "跨星系信号的发现", status: "planned" },
    { id: "S10", title: "S10 - 星舰远征", chapters: 48, desc: "穿越银河系的史诗旅程", status: "planned" },
    { id: "S11", title: "S11 - 异星文明", chapters: 48, desc: "遇见宇宙中的其他智慧生命", status: "planned" },
    { id: "S12", title: "S12 - 终焉回响", chapters: 48, desc: "宇宙篇最终章，一切的解答", status: "planned" },
  ];

  return (
    <SidebarLayout>
      {/* Background Glow Blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <motion.div
          animate={{ opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#9B59B6]/10 rounded-full blur-[100px]"
        />
        <motion.div
          animate={{ opacity: [0.2, 0.6, 0.2] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[#9B59B6]/5 rounded-full blur-[100px]"
        />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 p-6 md:p-12"
      >
        <header className="mb-16 max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center mb-6"
          >
            <div className="w-20 h-20 rounded-full bg-[#9B59B6]/10 flex items-center justify-center text-4xl">
              🌌
            </div>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-4xl md:text-6xl font-bold text-center mb-4 bg-gradient-to-r from-[#9B59B6] via-[#B388FF] to-[#9B59B6] bg-clip-text text-transparent"
          >
            宇宙篇
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-center text-[#8A8A9E]"
          >
            穿越银河系的远方
          </motion.p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {universeSeries.map((series, idx) => {
            const isCompleted = series.status === "completed";
            const isWriting = series.status === "writing";
            const isPlanned = series.status === "planned";

            return (
              <motion.div
                key={series.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.3 }}
                className="perspective-1000 bg-[#1F1F2E]/60 border border-[#9B59B6]/30 rounded-xl p-6 hover:border-[#9B59B6]/50 transition-all cursor-pointer shadow-[0_0_20px_rgba(155,89,182,0.2)] hover:shadow-[0_0_30px_rgba(155,89,182,0.5)]"
              >
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold text-[#9B59B6]">{series.title}</h2>
                  <span className="text-[#9B59B6] font-mono">{series.chapters}章</span>
                </div>

                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs px-3 py-1 rounded-full bg-[#9B59B620] text-[#9B59B6]">
                    {isCompleted ? "✅ 已完成" : isWriting ? "✍️ 创作中" : "⏳ 敬请期待"}
                  </span>
                </div>

                <p className="text-[#8A8A9E] mb-4">{series.desc}</p>

                {isWriting && (
                  <p className="text-xs text-[#FFD93D] mb-4">
                    ⚠️ 创作中，部分章节待更新
                  </p>
                )}

                {isCompleted ? (
                  <Link
                    href={`/stories/${series.id}`}
                    className="inline-block w-full px-4 py-2 rounded-lg font-medium text-center text-sm transition-all bg-[#9B59B6] text-white hover:brightness-110 border border-[#9B59B6]/30 shadow-[0_0_15px_rgba(155,89,182,0.3)]"
                  >
                    开始阅读
                  </Link>
                ) : isWriting ? (
                  <div className="inline-block w-full px-4 py-2 rounded-lg font-medium text-center text-sm bg-[#FFD93D20] text-[#FFD93D]">
                    创作中
                  </div>
                ) : (
                  <div className="inline-block w-full px-4 py-2 rounded-lg font-medium text-center text-sm bg-[#8A8A9E20] text-[#8A8A9E]">
                    敬请期待
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </SidebarLayout>
  );
}
