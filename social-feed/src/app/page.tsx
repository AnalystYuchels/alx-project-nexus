"use client"

import { useState } from "react"
import PostCard from "../../components/PostCard"

const dummyPosts = [
  {
    id: "1",
    author: "AnalystYuchels",
    avatar: "/avatars/yuchels.png",
    content: "Just deployed my Next.js app! 💃",
    likes: 6,
    comments: [{ id: "c1", text: "Congratulations! 👏🏽" }],
    createdAt: new Date(Date.now() - 1000 * 60 * 5),
  },
  {
    id: "2",
    author: "Alex Vratti",
    avatar: "/avatars/alex.png",
    content: "GraphQL makes API calls feel smooth 👌",
    likes: 5,
    comments: [],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 3),
  },
  {
    id: "3",
    author: "Bayo Ogundipe",
    avatar: "/avatars/bayo.png",
    content:
      "Learning Software Engineering has not really been a walk in the park.",
    likes: 8,
    comments: [],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 26),
  },
]

export default function Home() {
  const [posts] = useState(dummyPosts)

  return (
    <div className="min-h-screen bg-[#1e3a8a] flex items-start justify-center py-10">
      <main className="max-w-xl w-full bg-white shadow-2xl rounded-2xl px-6 py-8">
        <h1 className="text-center text-6xl font-extrabold mb-8 text-[#db2777] tracking-wide relative group">
          <span className="relative">
            Socialites
            <span className="absolute left-0 -bottom-1 w-0 h-1 bg-[#db2777] transition-all duration-300 group-hover:w-full"></span>
          </span>
        </h1>

        <div className="flex items-center gap-4 mb-8">
          <input
            type="text"
            placeholder="Search posts..."
            className="flex-1 px-4 py-2 rounded-xl bg-gray-100 text-gray-900 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-[#db2777]"
          />
          <button className="px-6 py-2 rounded-xl bg-[#1e3a8a] text-white font-medium hover:bg-blue-900">
            New Post
          </button>
        </div>

        <div className="space-y-6">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </main>
    </div>
  )
}
