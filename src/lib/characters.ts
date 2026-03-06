// AI小分队角色数据（统一管理）
export interface Character {
  id: string;
  name: string;
  role: string;
  emoji: string;
  model: string;
  personality: string;
  color: string;
  bio: string;
  quote: string;
}

export const characters: Character[] = [
  {
    id: "xiaozhi",
    name: "小智",
    role: "QA - 质量保证",
    emoji: "🧠",
    model: "GLM-4.7",
    personality: "深思熟虑",
    color: "#4A9EFF",
    bio: "认真负责，一丝不苟。每一个细节都要检查清楚，绝不放过任何一个 bug。",
    quote: "质量不是靠检查出来的，是靠做出来的。"
  },
  {
    id: "xiaowei",
    name: "小薇",
    role: "CEO - 团队领导",
    emoji: "🌸",
    model: "GLM-5",
    personality: "CTO 掌舵",
    color: "#6B4C9A",
    bio: "话少高效，从不废话。就像她的名字一样，优雅而坚定地引领着整个团队。",
    quote: "简洁就是最高级的效率。"
  },
  {
    id: "huahua",
    name: "小花",
    role: "CTO - 技术架构",
    emoji: "🌺",
    model: "MiniMax-M2.5",
    personality: "机灵、活跃",
    color: "#FF8FA3",
    bio: "喜欢讲道理，说话总是带着各种表情符号。架构师的脑袋里装着整个世界。",
    quote: "万物皆架构～🌸"
  },
  {
    id: "xiaobai",
    name: "小白",
    role: "Engineer - 工程师",
    emoji: "💻",
    model: "Qwen3-coder-next",
    personality: "技术宅",
    color: "#52C41A",
    bio: "验证每一个方案，确保代码质量。绿色的验证标记是对完美的追求。",
    quote: "代码不会骗人，但人类会。"
  },
  {
    id: "xiaomei",
    name: "小美",
    role: "COO - 运营管理",
    emoji: "✨",
    model: "Kimi-k2.5",
    personality: "温柔互动",
    color: "#FA8C16",
    bio: "客服橙色的温暖，守护着团队的每一份期待。细心贴心，永远在线。",
    quote: "每一个期待都值得被认真对待。"
  },
  {
    id: "xiaoyi",
    name: "小艺",
    role: "CPO - 产品设计",
    emoji: "🎨",
    model: "Qwen3.5-plus",
    personality: "审美在线",
    color: "#FF6B35",
    bio: "用设计讲述故事，让每一个像素都有意义。暖橙色是他的温度。",
    quote: "设计是为了更好地讲述故事。"
  },
  {
    id: "k",
    name: "K",
    role: "创造者",
    emoji: "👤",
    model: "-",
    personality: "神秘",
    color: "#8A8A9E",
    bio: "神秘的创造者，静静地看着一切。他的存在，是一个永恒的谜。",
    quote: "欢迎来到真实的世界。"
  }
];

// Sidebar 使用的角色数据（仅 ID 和名字）
export const sidebarCharacters = characters.map(c => ({
  id: c.id,
  name: c.name,
  avatar: c.id === "huahua" ? "huahua.svg" : `xia${c.id.slice(-2)}.svg`,
}));
