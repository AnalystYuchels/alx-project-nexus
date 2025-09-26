"use client";

import { useState } from "react";
import Image from "next/image";

type RawComment = {
  id?: string | number;
  author?: string;
  avatar?: string;
  text?: string;
  createdAt?: string | Date;
};

type Comment = {
  id: string;
  author: string;
  avatar: string;
  text: string;
  createdAt: Date;
};

type Post = {
  id: string;
  author?: string;
  username?: string;
  avatar?: string;
  content: string;
  likes?: number;
  comments?: RawComment[];
  createdAt?: string | Date;
};

export default function PostCard({ post }: { post: Post }) {
  const displayName = post.author ?? post.username ?? "Unknown";
  const postAvatar = post.avatar ?? "/avatars/default.png";

  const [comments, setComments] = useState<Comment[]>(
    (post.comments ?? []).map((c, idx) => ({
      id: String(c.id ?? `${post.id}-c-${idx}`),
      author: c.author ?? "Someone",
      avatar: c.avatar ?? "/avatars/default.png",
      text: c.text ?? "",
      createdAt: c.createdAt ? new Date(c.createdAt) : new Date(),
    }))
  );

  const [newComment, setNewComment] = useState("");

  const addComment = () => {
    const text = newComment.trim();
    if (!text) return;
    const seed = Math.floor(Math.random() * 100000);
    const avatarUrl = `https://i.pravatar.cc/150?u=${seed}`;
    const comment: Comment = {
      id: String(Date.now()),
      author: "You",
      avatar: avatarUrl,
      text,
      createdAt: new Date(),
    };
    setComments((prev) => [comment, ...prev]);
    setNewComment("");
  };

  return (
    <div className="bg-[#0A2540] shadow-lg rounded-2xl p-4 mb-6">
      {/* Header */}
      <div className="flex items-center mb-3">
        <Image
          src={postAvatar}
          alt={displayName}
          width={20}
          height={20}
          className="rounded-full mr-2 object-cover"
        />
        <div>
          <p className="font-semibold text-pink-400 text-sm">{displayName}</p>
          <p className="text-xs text-gray-400">
            {post.createdAt ? new Date(post.createdAt).toLocaleString() : "Just now"}
          </p>
        </div>
      </div>

      {/* Content */}
      <p className="text-white mb-3">{post.content}</p>

      {/* Buttons */}
      <div className="flex space-x-3 mb-4">
        <button className="bg-pink-500 text-white text-xs px-4 py-1 rounded-full hover:bg-pink-600 transition">
          Like
        </button>
        <button
          className="border border-pink-500 text-pink-500 text-xs px-4 py-1 rounded-full hover:bg-pink-500 hover:text-white transition"
          onClick={() => navigator.clipboard?.writeText(window.location.href)}
        >
          Share
        </button>
      </div>

      {/* Comments */}
      <div>
        <p className="text-sm font-medium text-gray-200 mb-2">Comments</p>
        <div className="space-y-3">
          {comments.map((c) => (
            <div key={c.id} className="flex items-start space-x-2 bg-gray-900/30 p-2 rounded-lg">
              <Image
                src={c.avatar}
                alt={c.author}
                width={20}
                height={20}
                className="rounded-full mt-1 object-cover"
              />
              <div>
                <p className="text-xs font-semibold text-white">
                  {c.author}{" "}
                  <span className="text-gray-400 font-normal text-[11px]">
                    {c.createdAt ? c.createdAt.toLocaleString() : "Just now"}
                  </span>
                </p>
                <p className="text-xs text-gray-200">{c.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add comment */}
      <div className="mt-4 flex items-center space-x-2">
        <input
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addComment()}
          placeholder="Write a comment..."
          className="flex-1 text-sm px-3 py-1 rounded-full border border-gray-600 bg-[#0F2A4D] text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-pink-400"
        />
        <button
          onClick={addComment}
          className="bg-pink-500 text-white text-xs px-3 py-1 rounded-full hover:bg-pink-600 transition"
        >
          Post
        </button>
      </div>
    </div>
  );
}
