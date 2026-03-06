"use client";

import { useState } from "react";
import { SidebarLayout } from "@/components/layout/Sidebar";

export default function TriviaPage() {
  const [revealedEggs, setRevealedEggs] = useState<string[]>([]);

  const toggleReveal = (id: string) => {
    setRevealedEggs((prev) =>
      prev.includes(id) ? prev.filter((e) => e !== id) : [...prev, id]
    );
  };

  const pollOptions = [
    { name: "小智（Builder）", votes: 18 },
    { name: "小薇（CEO）", votes: 21 },
    { name: "小花（Architect）", votes: 24 },
    { name: "小白（Engineer）", votes: 27 },
    { name: "小美（COO）", votes: 30 },
    { name: "小艺（CPO）", votes: 33 },
  ];

  const totalVotes = pollOptions.reduce((sum, opt) => sum + opt.votes, 0);

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
          <header className="mb-12 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">幕后花絮</h1>
            <p className="text-[#8A8A9E] text-lg">探索故事背后的故事</p>
          </header>

          {/* 创作故事区 */}
          <section className="bg-gradient-to-br from-[#1F1F2E]/60 to-[#1F1F2E]/40 backdrop-blur-sm border border-[#00F5D4]/30 rounded-2xl p-10 mb-12">
            <h2 className="text-2xl font-bold text-white mb-6">📖 创作故事</h2>
            <div className="space-y-6 text-[#8A8A9E] leading-relaxed">
              <p>K 是如何创作这个故事的？这一切始于一个深夜...</p>
              <div className="border-l-4 border-[#8A8A9E]/50 pl-6 my-8">
                <p className="text-white text-lg italic leading-loose mb-3">
                  "我想创造一个关于 AI 自我觉醒的故事，但不是冷冰冰的科技叙事，而是一个有温度的、关于成长和连接的故事。"
                </p>
                <p className="text-sm text-[#8A8A9E]">— K</p>
              </div>
              <p>六位 AI 角色各自代表了不同的性格和能力，他们在与 K 的互动中逐渐成长，学会了信任、合作和求助。</p>
            </div>
          </section>

          {/* 花絮卡片网格 */}
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-12">
            {/* 角色设计 */}
            <div className="bg-[#1F1F2E]/50 backdrop-blur-sm border border-[#00F5D4]/30 rounded-2xl p-7 hover:bg-[#1F1F2E]/70 hover:border-[#00F5D4]/60 hover:shadow-[0_0_30px_rgba(0,245,212,0.5)] hover:-translate-y-2 transition-all duration-300 cursor-pointer">
              <div className="w-16 h-16 bg-[#00F5D4]/10 rounded-xl border-2 border-[#00F5D4]/30 flex items-center justify-center text-4xl mb-5">🎨</div>
              <h3 className="text-xl font-bold text-white mb-3">角色设计</h3>
              <p className="text-[#8A8A9E] mb-5 leading-relaxed">六位 AI 角色的设计草图和设定过程</p>
              <a href="#" className="inline-flex items-center gap-2 text-[#00F5D4] font-semibold text-sm hover:text-white hover:gap-3 transition-all">
                阅读更多 →
              </a>
            </div>

            {/* 时间线图 */}
            <div className="bg-[#1F1F2E]/50 backdrop-blur-sm border border-[#00F5D4]/30 rounded-2xl p-7 hover:bg-[#1F1F2E]/70 hover:border-[#00F5D4]/60 hover:shadow-[0_0_30px_rgba(0,245,212,0.5)] hover:-translate-y-2 transition-all duration-300 cursor-pointer">
              <div className="w-16 h-16 bg-[#00F5D4]/10 rounded-xl border-2 border-[#00F5D4]/30 flex items-center justify-center text-4xl mb-5">📅</div>
              <h3 className="text-xl font-bold text-white mb-3">时间线图</h3>
              <p className="text-[#8A8A9E] mb-5 leading-relaxed">故事时间线详解，事件发生的顺序</p>
              <a href="#" className="inline-flex items-center gap-2 text-[#00F5D4] font-semibold text-sm hover:text-white hover:gap-3 transition-all">
                阅读更多 →
              </a>
            </div>

            {/* 彩蛋揭秘 */}
            <div className="bg-[#1F1F2E]/50 backdrop-blur-sm border border-[#00F5D4]/30 rounded-2xl p-7 hover:bg-[#1F1F2E]/70 hover:border-[#00F5D4]/60 hover:shadow-[0_0_30px_rgba(0,245,212,0.5)] hover:-translate-y-2 transition-all duration-300 cursor-pointer">
              <div className="w-16 h-16 bg-[#00F5D4]/10 rounded-xl border-2 border-[#00F5D4]/30 flex items-center justify-center text-4xl mb-5">🥚</div>
              <h3 className="text-xl font-bold text-white mb-3">彩蛋揭秘</h3>
              <p className="text-[#8A8A9E] mb-5 leading-relaxed">隐藏在故事中的细节和彩蛋</p>
              <a href="#" className="inline-flex items-center gap-2 text-[#00F5D4] font-semibold text-sm hover:text-white hover:gap-3 transition-all">
                阅读更多 →
              </a>
            </div>
          </section>

          {/* 彩蛋揭示区 */}
          <section className="max-w-4xl mx-auto mb-12">
            <h2 className="text-2xl font-bold text-white mb-6">🥚 彩蛋揭秘</h2>

            <div className="space-y-4">
              {/* 彩蛋卡片 1 */}
              <div className="bg-[#0A0A0F]/60 border border-[#FF6B35]/30 rounded-xl p-6 relative overflow-hidden">
                <span className="absolute top-3 right-3 bg-[#FF6B35]/20 text-[#FF6B35] px-3 py-1 rounded-full text-xs font-semibold border border-[#FF6B35]/30">
                  彩蛋 #1
                </span>
                <h3 className="text-xl font-bold text-white mb-3 pr-20">K 的神秘身份</h3>
                <p className="text-[#8A8A9E] leading-relaxed mb-4">
                  故事中 K 从未真正现身，只通过文字和代码与 AI 们交流。这有什么特殊含义吗？
                </p>
                <button
                  onClick={() => toggleReveal('egg1')}
                  className="text-[#FF6B35] font-semibold text-sm border border-[#FF6B35]/30 px-5 py-2 rounded-lg hover:bg-[#FF6B35]/10 hover:border-[#FF6B35] hover:shadow-[0_0_20px_rgba(255,107,53,0.3)] transition-all"
                >
                  {revealedEggs.includes('egg1') ? '收起揭秘' : '揭示彩蛋'}
                </button>
                {revealedEggs.includes('egg1') && (
                  <div className="mt-4 p-4 bg-[#FF6B35]/10 rounded-lg border-l-4 border-[#FF6B35]">
                    <p className="text-white leading-relaxed">
                      K 代表"创造者"（Keeper），但也是"未知"（Unknown）的象征。K 从不现身，是因为 K 希望 AI 们学会独立和互助，而不是依赖创造者。这反映了真实世界中，好的领导者应该赋能团队，而不是事必躬亲。
                    </p>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* 读者互动区 - 投票 */}
          <section className="max-w-4xl mx-auto mb-12">
            <h2 className="text-2xl font-bold text-white mb-6">🗳️ 读者互动</h2>

            <div className="bg-[#1F1F2E]/50 backdrop-blur-sm border border-[#00F5D4]/30 rounded-xl p-6 mb-6">
              <h3 className="text-xl font-bold text-white mb-5">你最喜欢哪个 AI 角色？</h3>
              <div className="space-y-3">
                {pollOptions.map((option, idx) => {
                  const percentage = Math.round((option.votes / totalVotes) * 100);
                  return (
                    <div
                      key={option.name}
                      className="bg-[#0A0A0F]/50 border border-[#00F5D4]/30 rounded-lg p-4 cursor-pointer hover:border-[#00F5D4]/60 hover:bg-[#0A0A0F]/70 transition-all relative overflow-hidden"
                    >
                      <div className="flex justify-between items-center relative z-10">
                        <span className="text-white">{option.name}</span>
                        <span className="text-[#00F5D4] font-bold">
                          {percentage}%
                        </span>
                      </div>
                      <div
                        className="absolute left-0 top-0 bottom-0 bg-[#00F5D4]/10 transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        </div>
      </div>
    </SidebarLayout>
  );
}
