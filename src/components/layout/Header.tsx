"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

// Header component only - Hello! I am a placeholder for future header features.
export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-[#1F1F2E]/70 backdrop-blur-md border-b border-[rgba(0,245,212,0.3)] z-40 px-6 flex items-center justify-center">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-[#FF6B35] rounded-lg shadow-[0_0_15px_rgba(255,107,53,0.3)]" />
        <span className="text-lg font-bold text-[#FFFFFF]">AI小分队</span>
      </div>
      
      {/* Mobile Toggle */}
      <button
        className="md:hidden fixed right-4 top-4 z-30 bg-[#1F1F2E] border border-[#00F5D4]/20 p-2 rounded-lg"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span className="text-[#00F5D4] text-xl">☰</span>
      </button>

      {/* Mobile Menu */}
      {menuOpen && (
        <motion.div
          initial={false}
          animate={{ height: "auto", opacity: 1 }}
          className="fixed top-16 right-0 w-full md:hidden bg-[#1F1F2E]/95 border-b border-[#00F5D4]/20 z-30 overflow-hidden shadow-[0_0_20px_rgba(0,245,212,0.2)]"
        >
          <div className="p-4 space-y-4">
            <Link href="/" className="block text-[#8A8A9E]">首页</Link>
            <Link href="/stories/time-connection" className="block text-[#FF6B35]">时间连线</Link>
            <Link href="/characters" className="block text-[#8A8A9E]">人物介绍</Link>
            <Link href="/trivia" className="block text-[#8A8A9E]">幕后花絮</Link>
          </div>
        </motion.div>
      )}

      {/* Desktop Links */}
      <div className="hidden md:flex items-center gap-1">
        <Link href="/" className="px-4 py-2 rounded-lg text-[#8A8A9E] hover:bg-[rgba(31,31,46,0.5)] hover:border-[rgba(0,245,212,0.3)] border transition-all">首页</Link>
        <Link href="/stories/time-connection" className="px-4 py-2 rounded-lg text-[#FFFFFF] bg-[rgba(31,31,46,0.5)] border border-[#00F5D4] shadow-[0_0_10px_rgba(0,245,212,0.1)]">卷列表</Link>
        <Link href="/characters" className="px-4 py-2 rounded-lg text-[#8A8A9E] hover:bg-[rgba(31,31,46,0.5)] hover:border-[rgba(0,245,212,0.3)] border transition-all">人物介绍</Link>
        <Link href="/trivia" className="px-4 py-2 rounded-lg text-[#8A8A9E] hover:bg-[rgba(31,31,46,0.5)] hover:border-[rgba(0,245,212,0.3)] border transition-all">幕后花絮</Link>
      </div>
    </header>
  );
}
