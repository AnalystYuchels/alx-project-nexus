import type { Metadata } from "next"
import "../../styles/globals.css"

export const metadata: Metadata = {
  title: "Socialites",
  description: "A dynamic social media feed built with Next.js, GraphQL, and Tailwind CSS",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900">
        {children}
      </body>
    </html>
  )
}
