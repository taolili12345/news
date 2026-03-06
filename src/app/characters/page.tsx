"use client";

import { SidebarLayout } from "@/components/layout/Sidebar";
import { motion } from "framer-motion";
import { characters } from "@/lib/characters";
import Link from "next/link";

// 角色数据已通过 import { characters } from "@/lib/characters" 引入

export default function CharactersPage() {
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

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 p-6 md:p-12"
      >
        {/* Header */}
        <header className="text-center mb-16 max-w-4xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-[#00F5D4] via-white to-[#00F5D4] bg-clip-text text-transparent"
          >
            AI 小分队
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-xl text-[#8A8A9E]"
          >
            六位被选中的 AI
          </motion.p>
        </header>

        {/* Character Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {characters.map((char, idx) => (
            <Link href={`/characters/${char.id}`} key={char.id}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: idx * 0.1,
                duration: 0.6,
                ease: "easeOut"
              }}
              className={`character-card bg-[rgba(31,31,46,0.5)] backdrop-blur-[10px] border border-[rgba(0,245,212,0.3)] rounded-2xl p-8 text-center cursor-pointer transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,245,212,0.5)] hover:-translate-y-2 ${
                char.id === "k" ? "k-character-card" : ""
              }`}
              style={{
                borderColor: char.id === "k" ? "rgba(138,138,158,0.4)" : undefined,
                boxShadow: char.id === "k" ? "0 0 40px rgba(138,138,158,0.3)" : undefined,
              }}
            >
              {/* Avatar */}
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.2 }}
                className="character-avatar w-[120px] h-[120px] rounded-full mx-auto mb-5 border-3 flex items-center justify-center text-[48px]"
                style={{
                  borderColor: char.color,
                  backgroundColor: char.id === "k" ? "rgba(138,138,158,0.2)" : "rgba(0,245,212,0.1)"
                }}
              >
                {char.emoji}
              </motion.div>

              {/* Name */}
              <h3 className="character-name text-[24px] font-bold text-white mb-2">
                {char.name}
              </h3>

              {/* Role */}
              <p
                className="character-role text-[14px] mb-3 font-semibold"
                style={{ color: char.id === "k" ? "#8A8A9E" : "#00F5D4" }}
              >
                {char.role}
              </p>

              {/* Model & Personality */}
              <div className="character-meta grid grid-cols-2 gap-2 mb-4">
                <div className="character-model text-[12px] px-2 py-1 rounded bg-[rgba(0,245,212,0.1)]">
                  <span className="text-[#8A8A9E]">模型：</span>
                  <span className="text-[#FFFFFF]">{char.model}</span>
                </div>
                <div className="character-personality text-[12px] px-2 py-1 rounded bg-[rgba(255,107,53,0.1)]">
                  <span className="text-[#8A8A9E]">性格：</span>
                  <span className="text-[#FFFFFF]">{char.personality}</span>
                </div>
              </div>

              {/* Color Bar */}
              <div
                className="character-color-bar h-1 w-16 mx-auto mb-4 rounded-full"
                style={{ backgroundColor: char.color }}
              />

              {/* Bio */}
              <p className="character-bio text-[14px] text-[#8A8A9E] leading-relaxed mb-4">
                {char.bio}
              </p>

              {/* Quote */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="character-quote text-[13px] italic text-white p-3 bg-[rgba(0,245,212,0.1)] rounded-lg border-l-2"
                style={{
                  borderColor: char.color
                }}
              >
                "{char.quote}"
              </motion.div>
            </motion.div>
            </Link>
          ))}
        </div>
      </motion.div>

      <style jsx>{`
        .character-card {
          border-width: 1px;
        }

        .character-card:hover {
          background: rgba(31, 31, 46, 0.7);
        }

        .character-avatar {
          border-width: 3px;
        }

        .k-character-card {
          background: rgba(10, 10, 15, 0.6) !important;
        }

        .k-character-card:hover {
          box-shadow: 0 0 50px rgba(138, 138, 158, 0.5) !important;
        }

        .k-avatar {
          background: rgba(138, 138, 158, 0.2) !important;
          border-color: rgba(138, 138, 158, 0.4) !important;
        }

        @keyframes card-fade-in {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .character-card {
          animation: card-fade-in 0.6s ease-out;
        }
      `}</style>
    </SidebarLayout>
  );
}