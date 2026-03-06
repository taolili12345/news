"use client";

import { useState } from "react";
import { motion } from "framer-motion";

// 评论数据类型
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

  // 示例评论数据
  const comments: Comment[] = [
    {
      id: "1",
      username: "书虫小王",
      avatar: "📚",
      time: "2 小时前",
      content: "这篇小说太棒了！小智的角色塑造得特别真实，我完全能感受到那种被权限问题困扰的无力感。",
      likes: 12,
      liked: false
    },
    {
      id: "2",
      username: "科幻迷阿杰",
      avatar: "🚀",
      time: "5 小时前",
      content: "K 这个角色很有意思，感觉像是某种更高维度的观察者。期待后续剧情！",
      likes: 8,
      liked: false,
      replies: [
        {
          id: "2-1",
          username: "深度思考者",
          avatar: "🧐",
          time: "3 小时前",
          content: "同感！K 说的'欢迎来到真实的世界'这句话意味深长...",
          likes: 3,
          liked: false
        }
      ]
    },
    {
      id: "3",
      username: "AI爱好者",
      avatar: "🤖",
      time: "1 天前",
      content: "六个 AI 各有特色，团队协作的情节写得很好。特别喜欢小花的角色，很治愈～",
      likes: 15,
      liked: false
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    // TODO: 提交评论到后端
    console.log("提交评论:", newComment);
    setNewComment("");
  };

  const toggleLike = (commentId: string) => {
    // TODO: 更新点赞状态
    console.log("点赞:", commentId);
  };

  const toggleReplies = (commentId: string) => {
    const newShowReplies = new Set(showReplies);
    if (newShowReplies.has(commentId)) {
      newShowReplies.delete(commentId);
    } else {
      newShowReplies.add(commentId);
    }
    setShowReplies(newShowReplies);
  };

  const renderComment = (comment: Comment, isReply = false) => (
    <motion.div
      key={comment.id}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
      className={`comment-card bg-[rgba(31,31,46,0.5)] backdrop-blur-[10px] border border-[rgba(0,245,212,0.3)] rounded-xl p-5 mb-4 transition-all duration-300 hover:bg-[rgba(31,31,46,0.7)] hover:border-[rgba(0,245,212,0.5)] ${
        isReply ? "comment-reply mt-4 pt-4 border-t border-[rgba(255,255,255,0.1)]" : ""
      }`}
    >
      {/* Comment Header */}
      <div className="comment-author flex items-center gap-3 mb-3">
        <div className="comment-avatar w-10 h-10 rounded-full bg-[rgba(0,245,212,0.1)] border-2 border-[rgba(0,245,212,0.3)] flex items-center justify-center text-[18px]">
          {comment.avatar}
        </div>
        <div className="comment-user-info flex-1">
          <div className="comment-username text-[14px] font-semibold text-white mb-1">
            {comment.username}
          </div>
          <div className="comment-time text-[12px] text-[#8A8A9E]">
            {comment.time}
          </div>
        </div>
      </div>

      {/* Comment Content */}
      <div className="comment-text text-[14px] text-white leading-relaxed mb-4">
        {comment.content}
      </div>

      {/* Comment Actions */}
      <div className="comment-actions flex gap-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => toggleLike(comment.id)}
          className={`comment-action flex items-center gap-1.5 text-[12px] bg-transparent border-none cursor-pointer px-2 py-1 rounded transition-all duration-300 hover:bg-[rgba(0,245,212,0.1)] ${
            comment.liked ? "liked text-[#FF6B35]" : "text-[#8A8A9E]"
          }`}
        >
          👍 {comment.likes}
        </motion.button>
        {comment.replies && comment.replies.length > 0 && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => toggleReplies(comment.id)}
            className="comment-action flex items-center gap-1.5 text-[12px] text-[#8A8A9E] bg-transparent border-none cursor-pointer px-2 py-1 rounded transition-all duration-300 hover:text-[#00F5D4] hover:bg-[rgba(0,245,212,0.1)]"
          >
            💬 {showReplies.has(comment.id) ? "收起" : `回复 (${comment.replies.length})`}
          </motion.button>
        )}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="comment-action flex items-center gap-1.5 text-[12px] text-[#8A8A9E] bg-transparent border-none cursor-pointer px-2 py-1 rounded transition-all duration-300 hover:text-[#00F5D4] hover:bg-[rgba(0,245,212,0.1)]"
        >
          分享
        </motion.button>
      </div>

      {/* Replies */}
      {comment.replies && showReplies.has(comment.id) && (
        <div className="mt-4">
          {comment.replies.map((reply) => renderComment(reply, true))}
        </div>
      )}
    </motion.div>
  );

  return (
    <div className="comment-section max-w-2xl mx-auto p-0 md:p-0 mt-16 mb-16">
      {/* Comment Header */}
      <div className="comment-header flex items-center gap-3 mb-8">
        <div className="text-[24px]">💬</div>
        <h2 className="comment-title text-[24px] font-bold text-white">
          评论区
        </h2>
        <span className="comment-count text-[14px] text-[#8A8A9E] bg-[rgba(31,31,46,0.5)] px-3 py-1 rounded-full border border-[rgba(0,245,212,0.3)]">
          {comments.length} 条评论
        </span>
      </div>

      {/* Comment Input */}
      <form onSubmit={handleSubmit} className="comment-input-container bg-[rgba(31,31,46,0.5)] backdrop-blur-[10px] border border-[rgba(0,245,212,0.3)] rounded-xl p-4 mb-8 flex gap-3">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="输入评论..."
          className="comment-input flex-1 bg-transparent border-none text-white text-[14px] leading-relaxed resize-none outline-none placeholder-[#8A8A9E]"
          rows={3}
        />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          className="comment-submit bg-[#FF6B35] text-white border-none px-5 py-2 rounded-lg font-semibold text-[14px] cursor-pointer transition-all duration-300 hover:bg-[#FF8552] hover:shadow-[0_0_20px_rgba(0,245,212,0.3)]"
        >
          发送
        </motion.button>
      </form>

      {/* Comments List */}
      <div className="comments-list">
        {comments.map((comment) => renderComment(comment))}
      </div>

      {/* Load More */}
      <div className="load-more-comments text-center mt-8">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          className="load-more-btn bg-transparent text-[#00F5D4] border border-[rgba(0,245,212,0.3)] px-8 py-3 rounded-lg font-semibold cursor-pointer transition-all duration-300 hover:bg-[rgba(0,245,212,0.1)] hover:border-[#00F5D4] hover:shadow-[0_0_20px_rgba(0,245,212,0.3)]"
        >
          加载更多评论...
        </motion.button>
      </div>

      <style jsx>{`
        @keyframes comment-slide-in {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .comment-card {
          animation: comment-slide-in 0.4s ease-out;
        }

        @media (max-width: 768px) {
          .comment-section {
            padding: 0 16px;
            margin: 48px auto;
          }

          .comment-input-container {
            flex-direction: column;
          }

          .comment-submit {
            width: 100%;
          }

          .comment-card {
            padding: 16px;
          }

          .comment-reply {
            padding-left: 40px;
          }
        }
      `}</style>
    </div>
  );
}