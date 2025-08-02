import { NextResponse } from "next/server"
import { getLatestPosts, getFeaturedPost } from "@/lib/blog/markdown"
import fs from 'fs'
import path from 'path'

export async function GET() {
  try {
    // Try runtime markdown processing first
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
    
    console.error("[API Error] Failed to fetch blog posts, trying fallback:", {
      message: errorMessage,
      endpoint: '/api/blog/posts',
      timestamp: new Date().toISOString(),
    })
    
    try {
      // Fallback: try to read pre-generated static data
      const staticDataPath = path.join(process.cwd(), 'public', 'blog-data.json')
      if (fs.existsSync(staticDataPath)) {
        const staticData = JSON.parse(fs.readFileSync(staticDataPath, 'utf-8'))
        console.log("[API] Using static fallback data")
        return NextResponse.json({
          featured: staticData.featured,
          latest: staticData.latest,
        })
      }
    } catch (fallbackError) {
      console.error("[API Error] Fallback also failed:", fallbackError)
    }
    
    return NextResponse.json(
      { 
        error: "Failed to fetch blog posts",
        message: process.env.NODE_ENV === 'development' ? errorMessage : undefined 
      },
      { status: 500 }
    )
  }
}