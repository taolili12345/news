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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {[
            { id: "time-connection", title: "时间连线", chapters: 4, desc: "跨越时空的故事连结" },
            { id: "jie-wu-bian-jie", title: "界无边界", chapters: 4, desc: "打破界限的终极挑战" },
            { id: "series-3", title: "系列三（预留）", chapters: 0, desc: "未来待创作" },
          ].map((series, idx) => (
            <motion.div
              key={series.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.2 }}
              whileHover={{
                scale: 1.03,
                rotateY: 2,
                boxShadow: "0 20px 40px rgba(0,245,212,0.4)",
              }}
              className="perspective-1000 bg-[#1F1F2E]/50 border border-[#00F5D4]/30 rounded-xl p-6 hover:border-[#00F5D4]/50 transition-all cursor-pointer shadow-[0_0_20px_rgba(0,245,212,0.2)] hover:shadow-[0_0_30px_rgba(0,245,212,0.5)]"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-white">{series.title}</h2>
                <span className="text-[#FF6B35] font-mono">{series.chapters}章</span>
              </div>
              <p className="text-[#8A8A9E] mb-6">{series.desc}</p>
              <Link
                href={`/stories/${series.id}`}
                className={`inline-block px-6 py-3 rounded-lg font-medium transition-all ${
                  series.chapters > 0
                    ? "bg-[#FF6B35] text-white hover:brightness-110 border border-[#00F5D4]/30 shadow-[0_0_15px_rgba(255,107,53,0.3)] hover:shadow-[0_0_25px_rgba(255,107,53,0.5)]"
                    : "bg-[#4A4A5C]/30 text-[#8A8A9E] cursor-not-allowed border border-[#8A8A9E]/10"
                }`}
                aria-disabled={series.chapters === 0}
              >
                {series.chapters > 0 ? "开始阅读" : "敬请期待"}
              </Link>
            </motion.div>
          ))}
        </div>


      </motion.div>
    </SidebarLayout>
  );
}
