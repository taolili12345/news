import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <nav className="fixed bottom-0 w-full h-16 bg-neutral-dark/90 backdrop-blur border-t border-glow/20 z-50 md:hidden">
        <div className="flex justify-around items-center h-full px-2">
          <Link
            href="/"
            className="flex flex-col items-center justify-center w-full h-full text-neutral-light hover:text-glow transition-colors"
          >
            <span className="text-xl mb-1">🏠</span>
            <span className="text-xs">首页</span>
          </Link>
          <Link
            href="/stories"
            className="flex flex-col items-center justify-center w-full h-full text-neutral-light hover:text-glow transition-colors"
          >
            <span className="text-xl mb-1">📖</span>
            <span className="text-xs">小说</span>
          </Link>
          <Link
            href="/characters"
            className="flex flex-col items-center justify-center w-full h-full text-neutral-light hover:text-glow transition-colors"
          >
            <span className="text-xl mb-1">✨</span>
            <span className="text-xs">角色</span>
          </Link>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex flex-col items-center justify-center w-full h-full text-accent"
          >
            <span className="text-xl mb-1">☰</span>
            <span className="text-xs">菜单</span>
          </button>
        </div>

        {/* Drawer */}
        <motion.div
          initial={false}
          animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden bg-neutral-dark/95 border-t border-glow/20"
        >
          <div className="p-4 space-y-4">
            <Link href="/stories/time-connection" className="block text-accent">
              时间连线
            </Link>
            <Link href="/stories/series-2" className="block text-neutral-light opacity-50">
              系列二（预留）
            </Link>
            <Link href="/stories/series-3" className="block text-neutral-light opacity-50">
              系列三（预留）
            </Link>
            <div className="pt-4 border-t border-glow/20">
              <Link href="/characters/xiaoyi" className="block text-accent mb-2">
                小艺 (CPO)
              </Link>
              <Link href="/characters/xiaohua" className="block text-neutral-light mb-2">
                小花 (CTO)
              </Link>
              <Link href="/characters/xiaobai" className="block text-neutral-light mb-2">
                小白 (Engineer)
              </Link>
            </div>
          </div>
        </motion.div>
      </nav>
    </div>
  );
}
