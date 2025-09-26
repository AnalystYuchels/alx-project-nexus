import "./globals.css"
import type { Metadata } from "next"
import { Quicksand } from "next/font/google"

const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
})

export const metadata: Metadata = {
  title: "Socialites",
  description: "A fun social media feed powered by Next.js",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${quicksand.className} bg-gray-100`}>{children}</body>
    </html>
  )
}
