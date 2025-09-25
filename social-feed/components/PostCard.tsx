"use client"

import { useState } from "react"

interface Post {
  id: string
  author: string
  content: string
  likes: number
  comments: { id: string; text: string }[]
}

export default function PostCard({ post }: { post: Post }) {
  const [likes, setLikes] = useState(post.likes)
  const [comments, setComments] = useState(post.comments)
  const [newComment, setNewComment] = useState("")

  const handleLike = () => {
    setLikes(likes + 1) // later this will update backend
  }

  const handleAddComment = () => {
    if (!newComment.trim()) return
    setComments([...comments, { id: Date.now().toString(), text: newComment }])
    setNewComment("")
  }

  return (
    <div className="border rounded-xl p-4 mb-4 bg-white shadow-sm">
      <h2 className="font-bold">{post.author}</h2>
      <p className="mt-2">{post.content}</p>

      <div className="flex gap-4 mt-3">
        <button onClick={handleLike} className="text-blue-500 hover:underline">
          👍 Like ({likes})
        </button>
        <button className="text-green-500 hover:underline">
          💬 Comment ({comments.length})
        </button>
        <button className="text-purple-500 hover:underline">↗ Share</button>
      </div>

      {/* Comments */}
      <div className="mt-3">
        {comments.map((c) => (
          <p key={c.id} className="text-sm text-gray-700">
            {c.text}
          </p>
        ))}

        <div className="flex gap-2 mt-2">
          <input
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write a comment..."
            className="flex-1 border rounded px-2 py-1 text-sm"
          />
          <button
            onClick={handleAddComment}
            className="px-3 py-1 text-sm bg-blue-500 text-white rounded"
          >
            Post
          </button>
        </div>
      </div>
    </div>
  )
}
