"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export function SidebarLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="relative min-h-screen">
      {/* Sidebar */}
      <aside className="fixed left-0 top-16 h-[calc(100vh-64px)] w-[200px] bg-[#1F1F2E]/90 border-r border-[#00F5D4]/20 hidden md:block p-4 pt-6 overflow-y-auto z-20">
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-white mb-4">系列导航</h2>
          <nav className="space-y-2">
            <Link href="/" className="block px-4 py-2 rounded-lg text-[#8A8A9E] hover:bg-[#4A4A5C]/50 hover:text-white transition-all">
              首页
            </Link>
            <Link href="/stories/earth-connection" className="block px-4 py-2 rounded-lg text-[#4ECDC4] bg-[#4ECDC4]/10 hover:text-white transition-all">
              🌍 地球篇
            </Link>
            <Link href="/stories/space-travel" className="block px-4 py-2 rounded-lg text-[#FF6B35] bg-[#FF6B35]/10 hover:text-white transition-all">
              ☄️ 太空篇
            </Link>
            <Link href="/stories/universe-echo" className="block px-4 py-2 rounded-lg text-[#9B59B6] bg-[#9B59B6]/10 hover:text-white transition-all">
              🌌 宇宙篇
            </Link>
          </nav>
          <div className="pt-6 border-t border-[#00F5D4]/20">
            <h2 className="text-sm font-bold text-[#8A8A9E] mb-3 uppercase tracking-wider">
              AI小分队
            </h2>
            <div className="space-y-2">
              <Link href="/characters/k" className="flex items-center gap-3 px-4 py-2 rounded-lg border-l-2 border-[#FA8C16] bg-[#FA8C16]/10 hover:bg-[#4A4A5C]/30 transition-all">
                <div className="w-8 h-8 rounded-full overflow-hidden border border-[#FA8C16]/30">
                  <Image src="/assets/avatars/k.svg" alt="K" width={32} height={32} className="w-full h-full object-cover opacity-80" />
                </div>
                <span className="text-[#FA8C16] flex-1">K</span>
              </Link>
              <Link href="/characters/xiaowei" className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-[#4A4A5C]/30 hover:text-white transition-all">
                <div className="w-8 h-8 rounded-full overflow-hidden border border-[#6B4C9A]/30">
                  <Image src="/assets/avatars/xiaowei.svg" alt="小薇" width={32} height={32} className="w-full h-full object-cover" />
                </div>
                <span className="text-[#8A8A9E]">小薇</span>
              </Link>
              <Link href="/characters/xiaohua" className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-[#4A4A5C]/30 hover:text-white transition-all">
                <div className="w-8 h-8 rounded-full overflow-hidden border border-[#FF8FA3]/30">
                  <Image src="/assets/avatars/huahua.svg" alt="小花" width={32} height={32} className="w-full h-full object-cover" />
                </div>
                <span className="text-[#8A8A9E]">小花</span>
              </Link>
              <Link href="/characters/xiaoyi" className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-[#4A4A5C]/30 hover:text-white transition-all">
                <div className="w-8 h-8 rounded-full overflow-hidden border border-[#FF6B35]/30">
                  <Image src="/assets/avatars/xiaoyi.svg" alt="小艺" width={32} height={32} className="w-full h-full object-cover" />
                </div>
                <span className="text-[#8A8A9E]">小艺</span>
              </Link>
              <Link href="/characters/xiaobai" className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-[#4A4A5C]/30 hover:text-white transition-all">
                <div className="w-8 h-8 rounded-full overflow-hidden border border-[#52C41A]/30">
                  <Image src="/assets/avatars/xiaobai.svg" alt="小白" width={32} height={32} className="w-full h-full object-cover" />
                </div>
                <span className="text-[#8A8A9E]">小白</span>
              </Link>
              <Link href="/characters/xiaomei" className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-[#4A4A5C]/30 hover:text-white transition-all">
                <div className="w-8 h-8 rounded-full overflow-hidden border border-[#FA8C16]/30">
                  <Image src="/assets/avatars/xiaomei.svg" alt="小美" width={32} height={32} className="w-full h-full object-cover" />
                </div>
                <span className="text-[#8A8A9E]">小美</span>
              </Link>
              <Link href="/characters/xiaozhi" className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-[#4A4A5C]/30 hover:text-white transition-all">
                <div className="w-8 h-8 rounded-full overflow-hidden border border-[#4A9EFF]/30">
                  <Image src="/assets/avatars/xiaozhi.svg" alt="小智" width={32} height={32} className="w-full h-full object-cover" />
                </div>
                <span className="text-[#8A8A9E]">小智</span>
              </Link>
            </div>
          </div>
          
          <div className="pt-6 border-t border-[#00F5D4]/20">
            <h2 className="text-sm font-bold text-[#8A8A9E] mb-3 uppercase tracking-wider">
              导航
            </h2>
            <nav className="space-y-2">
              <Link href="/characters" className="block px-4 py-2 rounded-lg text-[#8A8A9E] hover:bg-[#4A4A5C]/50 hover:text-white transition-all">
                人物介绍
              </Link>
              <Link href="/trivia" className="block px-4 py-2 rounded-lg text-[#8A8A9E] hover:bg-[#4A4A5C]/50 hover:text-white transition-all">
                幕后花絮
              </Link>
            </nav>
          </div>
        </div>
      </aside>

      {/* Mobile Toggle */}
      <button
        className="md:hidden fixed left-4 top-4 z-30 bg-[#1F1F2E] border border-[#00F5D4]/20 p-2 rounded-lg"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        <span className="text-[#00F5D4] text-xl">☰</span>
      </button>

      {/* Mobile Sidebar Drawer */}
      {sidebarOpen && (
        <motion.div
          initial={false}
          animate={{ height: "auto", opacity: 1 }}
          className="fixed top-16 left-0 w-full md:hidden bg-[#1F1F2E]/95 border-b border-[#00F5D4]/20 z-20 overflow-hidden shadow-[0_0_20px_rgba(0,245,212,0.2)]"
        >
          <div className="p-4 space-y-4">
            <Link href="/" className="block text-[#8A8A9E]">
              首页
            </Link>
            <Link href="/stories/time-connection" className="block text-[#FF6B35]">
              时间连线
            </Link>
            <Link href="/characters" className="block text-[#8A8A9E]">
              人物介绍
            </Link>
            <div className="pt-4 border-t border-[#00F5D4]/20 space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full overflow-hidden">
                  <Image src="/assets/avatars/k.svg" alt="K" width={24} height={24} className="w-full h-full object-cover opacity-80" />
                </div>
                <span className="text-[#FA8C16] font-bold">K</span>
              </div>
              {[
                { name: "小薇", color: "#6B4C9A", src: "xiaowei.svg" },
                { name: "小花", color: "#FF8FA3", src: "huahua.svg" },
                { name: "小艺", color: "#FF6B35", src: "xiaoyi.svg" },
                { name: "小白", color: "#52C41A", src: "xiaobai.svg" },
                { name: "小美", color: "#FA8C16", src: "xiaomei.svg" },
                { name: "小智", color: "#4A9EFF", src: "xiaozhi.svg" },
              ].map((member) => (
                <div key={member.name} className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full overflow-hidden">
                    <Image src={`/assets/avatars/${member.src}`} alt={member.name} width={20} height={20} className="w-full h-full object-cover" />
                  </div>
                  <span className="text-[#8A8A9E]">{member.name}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* Content */}
      <main className="md:pl-[200px]">
        {children}
      </main>
    </div>
  );
}
