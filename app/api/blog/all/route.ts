import { NextResponse } from "next/server"
import { getAllPosts } from "@/lib/blog/markdown"
import fs from 'fs'
import path from 'path'

export async function GET() {
  try {
    const posts = await getAllPosts()
    return NextResponse.json(posts)
  } catch (error) {
    // Enhanced error logging for API route
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    
    console.error("[API Error] Failed to fetch all blog posts, trying fallback:", {
      message: errorMessage,
      endpoint: '/api/blog/all',
      timestamp: new Date().toISOString(),
    })
    
    try {
      // Fallback: try to read pre-generated static data
      const staticDataPath = path.join(process.cwd(), 'public', 'blog-data.json')
      if (fs.existsSync(staticDataPath)) {
        const staticData = JSON.parse(fs.readFileSync(staticDataPath, 'utf-8'))
        console.log("[API] Using static fallback data for all posts")
        return NextResponse.json(staticData.allPosts)
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