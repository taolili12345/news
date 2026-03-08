"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface Comment {
  id: string;
  username: string;
  avatar: string;
  time: string;
  content: string;
  likes: number;
  liked: boolean;
  replies?: Comment[];
}

export default function CommentSection() {
  const [newComment, setNewComment] = useState("");
  const [showReplies, setShowReplies] = useState<Set<string>>(new Set());

  return (
    <div className="mt-16 pt-8 border-t border-[rgba(0,245,212,0.3)]">
      <div className="mb-8 p-6 bg-[#FF6B35]/10 border border-[#FF6B35]/30 rounded-xl text-center">
        <h3 className="text-xl font-bold text-[#FF6B35] mb-2">评论功能开发中...</h3>
        <p className="text-[#8A8A9E]">期待您的宝贵意见！</p>
      </div>

      <h3 className="text-2xl font-bold text-[#FFFFFF] mb-6">读者评论</h3>
      <p className="text-[#8A8A9E]">暂无评论，快来抢沙发吧～</p>
    </div>
  );
}