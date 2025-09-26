"use client"

import { useState } from "react"

interface Comment {
  id: string
  text: string
}

interface Post {
  id: string
  author: string
  avatar: string
  content: string
  likes: number
  comments: Comment[]
  createdAt: Date
}

export default function PostCard({ post }: { post: Post }) {
  const [likes, setLikes] = useState(post.likes)
  const [comments, setComments] = useState(post.comments)
  const [commentInput, setCommentInput] = useState("")

  const handleLike = () => setLikes((prev) => prev + 1)

  const handleComment = () => {
    if (!commentInput.trim()) return
    const newComment = { id: Date.now().toString(), text: commentInput }
    setComments([...comments, newComment])
    setCommentInput("")
  }

  return (
    <div className="bg-gray-50 rounded-xl shadow p-4">
      {/* Header */}
      <div className="flex items-center gap-3 mb-3">
        <img
          src={post.avatar}
          alt={post.author}
          className="w-8 h-8 rounded-full"
        />
        <div>
          <p className="font-semibold text-gray-900">{post.author}</p>
          <span className="text-xs text-gray-500">
            {post.createdAt.toLocaleString()}
          </span>
        </div>
      </div>

      {/* Content */}
      <p className="text-gray-800 mb-4">{post.content}</p>

      {/* Actions */}
      <div className="flex gap-3 mb-4">
        <button
          onClick={handleLike}
          className="px-4 py-1 rounded-lg bg-[#1e3a8a] text-white text-sm hover:bg-blue-900 transition"
        >
          👍 Like ({likes})
        </button>
        <button
          onClick={handleComment}
          className="px-4 py-1 rounded-lg border-2 border-[#db2777] text-[#db2777] text-sm hover:bg-[#db2777] hover:text-white transition"
        >
          💬 Comment
        </button>
      </div>

      {/* Comment Input */}
      <input
        type="text"
        placeholder="Write a comment..."
        value={commentInput}
        onChange={(e) => setCommentInput(e.target.value)}
        className="w-full px-3 py-2 mb-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#db2777] text-gray-900 placeholder-gray-500"
      />

      {/* Comment List */}
      <div className="space-y-2">
        {comments.map((c) => (
          <div
            key={c.id}
            className="text-sm text-gray-700 border-b border-gray-200 pb-1"
          >
            {c.text}
          </div>
        ))}
      </div>
    </div>
  )
}
