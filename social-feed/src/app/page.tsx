import PostCard from "../../components/PostCard"

const dummyPosts = [
  {
    id: "1",
    author: "AnalystYuchels",
    content: "Just deployed my Next.js app!💃🏽",
    likes: 6,
    comments: [{ id: "c1", text: "Congratulations!👏🏽" }],
  },
  {
    id: "2",
    author: "Alex Vratti",
    content: "GraphQL makes API calls feel smooth 👌",
    likes: 5,
    comments: [],
  },
  {
    id: "3",
    author: "Bayo Ogundipe",
    content: "Learning Software Engineering has not really been a walk in the park.",
    likes: 8,
    comments: [],
  },
]

export default function Home() {
  return (
    <main className="max-w-xl mx-auto py-6">
      <h1 className="text-2xl font-bold mb-6">Social Feed</h1>
      {dummyPosts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </main>
  )
}
