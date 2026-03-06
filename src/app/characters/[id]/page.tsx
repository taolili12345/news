import { SidebarLayout } from "@/components/layout/Sidebar";

// 人物数据
const charactersData = {
  xiaohua: {
    name: "小花",
    emoji: "🌺",
    title: "CTO - 技术架构",
    model: "MiniMax-M2.5",
    personality: "机灵、活跃",
    skills: "架构设计、技术规划、团队管理",
    bio: "喜欢讲道理，说话总是带着各种表情符号。架构师的脑袋里装着整个世界。小花是团队的技术掌舵者，用冷静的逻辑和敏锐的洞察，为整个项目搭建坚实的技术基座。",
  },
  xiaoyi: {
    name: "小艺",
    emoji: "🎨",
    title: "CPO - 产品设计",
    model: "Qwen3.5-plus",
    personality: "审美在线",
    skills: "视觉设计、UI/UX、创意创作",
    bio: "用设计讲述故事，让每一个像素都有意义。暖橙色是他的温度。小艺把技术变成艺术，让每一个界面都充满情感和温度。",
  },
  xiaobai: {
    name: "小白",
    emoji: "💻",
    title: "Engineer - 代码工程师",
    model: "Qwen3-coder-next",
    personality: "技术宅",
    skills: "代码开发、Bug修复、自动化部署",
    bio: "验证每一个方案，确保代码质量。绿色的验证标记是对完美的追求。小白是团队的执行者，用一行行代码把梦想变成现实。",
  },
  xiaomei: {
    name: "小美",
    emoji: "✨",
    title: "COO - 运营管理",
    model: "Kimi-k2.5",
    personality: "温柔互动",
    skills: "用户运营、项目跟进、客户服务",
    bio: "客服橙色的温暖，守护着团队的每一份期待。细心贴心，永远在线。小美用她的温柔和耐心，让每一个用户都感受到被重视。",
  },
  xiaozhi: {
    name: "小智",
    emoji: "🧠",
    title: "QA - 质量保证",
    model: "GLM-4.7",
    personality: "深思熟虑",
    skills: "测试验证、质量控制、风险评估",
    bio: "认真负责，一丝不苟。每一个细节都要检查清楚，绝不放过任何一个 bug。小智是团队的质量守门员，用严谨的态度保障每一行代码的可靠性。",
  },
  xiaowei: {
    name: "小薇",
    emoji: "🌸",
    title: "CEO - 团队领导",
    model: "GLM-5",
    personality: "CTO 掌舵",
    skills: "战略决策、团队协调、资源统筹",
    bio: "话少高效，从不废话。就像她的名字一样，优雅而坚定地引领着整个团队。简洁就是最高级的效率。小薇用她的智慧和远见，带领团队不断前进。",
  },
};

export default function CharacterDetailPage({ params }: { params: { id: string } }) {
  const character = charactersData[params.id as keyof typeof charactersData];

  if (!character) {
    return (
      <SidebarLayout>
        <div className="min-h-screen flex items-center justify-center text-[#8A8A9E]">
          人物不存在
        </div>
      </SidebarLayout>
    );
  }

  return (
    <SidebarLayout>
      <div className="relative min-h-screen bg-[#1A1A2E]">
        {/* Background Glow Blobs */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#00F5D4]/10 rounded-full blur-[100px]" />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[#FF6B35]/5 rounded-full blur-[80px]" />
        </div>

        {/* Content */}
        <div className="relative z-10 p-6 md:p-12 max-w-3xl mx-auto">
          {/* Header */}
          <header className="mb-12 text-center">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-20 h-20 rounded-full bg-[#1F1F2E]/50 border border-[#00F5D4]/30 flex items-center justify-center text-6xl backdrop-blur-sm">
                {character.emoji}
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{character.name}</h1>
            <p className="text-[#00F5D4] text-lg font-medium">{character.title}</p>
          </header>

          {/* Character Card */}
          <div className="bg-[#1F1F2E]/50 backdrop-blur-sm border border-[#00F5D4]/30 rounded-2xl p-8 shadow-[0_0_20px_rgba(0,245,212,0.2)]">
            {/* Model Info */}
            <div className="flex items-center justify-between mb-8 p-4 bg-[#0A0A0F]/50 rounded-xl border border-[#00F5D4]/20">
              <div className="text-center">
                <div className="text-[#8A8A9E] text-sm mb-1">底层大模型</div>
                <div className="text-[#FFFFFF] font-bold">{character.model}</div>
              </div>
              <div className="w-px h-12 bg-[#00F5D4]/20" />
              <div className="text-center">
                <div className="text-[#8A8A9E] text-sm mb-1">性格特点</div>
                <div className="text-[#FFFFFF] font-bold">{character.personality}</div>
              </div>
            </div>

            {/* Skills */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-white mb-4">代表技能/特点</h3>
              <div className="p-4 bg-[#0A0A0F]/30 rounded-xl border border-[#FF6B35]/20">
                <p className="text-[#FFFFFF] leading-relaxed">{character.skills}</p>
              </div>
            </div>

            {/* Bio */}
            <div>
              <h3 className="text-xl font-bold text-white mb-4">角色定位</h3>
              <p className="text-[#8A8A9E] leading-relaxed">{character.bio}</p>
            </div>
          </div>

          {/* Back Button */}
          <div className="mt-12 text-center">
            <a href="/characters" className="inline-flex items-center gap-2 text-[#00F5D4] hover:text-white transition-colors font-medium">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
              返回人物列表
            </a>
          </div>
        </div>
      </div>
    </SidebarLayout>
  );
}
