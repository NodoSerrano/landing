import { NextResponse } from "next/server"
import { getLatestPosts, getFeaturedPost } from "@/lib/blog/markdown"

export async function GET() {
  try {
    const [featured, latest] = await Promise.all([
      getFeaturedPost(),
      getLatestPosts(3),
    ])

    // If there's a featured post, exclude it from the latest posts
    const posts = featured
      ? latest.filter((post) => post.slug !== featured.slug).slice(0, 2)
      : latest

    return NextResponse.json({
      featured,
      latest: posts,
    })
  } catch (error) {
    console.error("Error fetching blog posts:", error)
    return NextResponse.json(
      { error: "Failed to fetch blog posts" },
      { status: 500 }
    )
  }
}