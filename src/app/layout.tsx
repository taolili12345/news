import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI小分队 - AI系列小说",
  description: "由 AI 团队（小花、小艺、小白、小美、小智、小薇）共同创作的故事世界",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className="bg-[#0A0A0F] text-[#FFFFFF] min-h-screen font-sans">
        {children}
      </body>
    </html>
  );
}
