import { NextResponse } from "next/server"

type Post = {
  id: number
  author: string
  avatar: string
  content: string
  likes: number
  comments: string[]
  createdAt: Date
}

// In-memory store
let posts: Post[] = [
  {
    id: 1,
    author: "AnalystYuchels",
    avatar: "/avatars/yuchels.png",
    content: "Just deployed my Next.js app! 💃",
    likes: 6,
    comments: ["Congratulations! 👏🏽"],
    createdAt: new Date(Date.now() - 1000 * 60 * 5), // 5 min ago
  },
  {
    id: 2,
    author: "Alex Vratti",
    avatar: "/avatars/alex.png",
    content: "GraphQL makes API calls feel smooth 👌",
    likes: 5,
    comments: [],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 3), // 3h ago
  },
  {
    id: 3,
    author: "Bayo Ogundipe",
    avatar: "/avatars/bayo.png",
    content:
      "Learning Software Engineering has not really been a walk in the park.",
    likes: 8,
    comments: [],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 26), // 26h ago
  },
]

export async function GET() {
  return NextResponse.json(posts)
}

export async function POST(req: Request) {
  const { postId, type, comment } = await req.json()
  const post = posts.find((p) => p.id === postId)

  if (!post) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 })
  }

  if (type === "like") {
    post.likes += 1
  } else if (type === "comment" && comment) {
    post.comments.push(comment)
  }

  return NextResponse.json(post)
}
