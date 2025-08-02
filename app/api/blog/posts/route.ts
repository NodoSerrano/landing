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
    // Enhanced error logging for API route
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    
    console.error("[API Error] Failed to fetch blog posts:", {
      message: errorMessage,
      endpoint: '/api/blog/posts',
      timestamp: new Date().toISOString(),
    })
    
    return NextResponse.json(
      { 
        error: "Failed to fetch blog posts",
        message: process.env.NODE_ENV === 'development' ? errorMessage : undefined 
      },
      { status: 500 }
    )
  }
}