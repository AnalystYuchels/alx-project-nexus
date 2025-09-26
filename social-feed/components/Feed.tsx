"use client";

import React, { useEffect, useRef, useState } from "react";
import { useQuery, gql } from "@apollo/client";
import PostCard from "./PostCard";

const GET_POSTS = gql`
  query GetPosts {
    posts {
      id
      author
      username
      avatar
      content
      createdAt
      likes
      comments {
        id
        author
        avatar
        content
        createdAt
      }
    }
  }
`;

export default function Feed() {
  const { data, loading, error } = useQuery(GET_POSTS);
  const [posts, setPosts] = useState<any[]>([]);
  const sentinelRef = useRef<HTMLDivElement>(null);

  // Merge GraphQL posts with fallback mock posts
  useEffect(() => {
    if (data?.posts) {
      const ensuredPosts = data.posts.map((p: any) => ({
        ...p,
        content: p.content || "No content available for this post 📝",
      }));
      setPosts(ensuredPosts);
    } else {
      // Fallback mock posts (with guaranteed content)
      setPosts([
        {
          id: "1",
          author: "Jane Doe",
          username: "@janedoe",
          avatar: "/avatars/jane.png",
          content: "This is my very first post 🚀 Excited to share my thoughts here!",
          createdAt: "2025-09-26T07:23:00Z",
          likes: 10,
          comments: [],
        },
        {
          id: "2",
          author: "John Smith",
          username: "@johnsmith",
          avatar: "/avatars/john.png",
          content: "Loving this new social feed app ❤️ Feels like home already.",
          createdAt: "2025-09-25T18:45:00Z",
          likes: 5,
          comments: [],
        },
        {
          id: "3",
          author: "Ada Lovelace",
          username: "@adalovelace",
          avatar: "/avatars/ada.png",
          content: "Debugging code with coffee ☕ + music 🎶 = productivity unlocked!",
          createdAt: "2025-09-24T12:15:00Z",
          likes: 42,
          comments: [],
        },
      ]);
    }
  }, [data]);

  if (loading) return <p className="text-center">Loading posts...</p>;
  if (error) return <p className="text-center text-red-500">Error loading posts</p>;

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="space-y-4">
        {posts.map((p) => (
          <PostCard key={p.id} post={p} />
        ))}
      </div>

      <div ref={sentinelRef} className="h-16 flex items-center justify-center">
        <p className="text-gray-500">You’ve reached the end of the feed ✨</p>
      </div>
    </div>
  );
}
