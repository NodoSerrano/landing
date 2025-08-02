import { NextResponse } from "next/server"
import { getAllPosts } from "@/lib/blog/markdown"

export async function GET() {
  try {
    const posts = await getAllPosts()
    return NextResponse.json(posts)
  } catch (error) {
    // Enhanced error logging for API route
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    
    console.error("[API Error] Failed to fetch all blog posts:", {
      message: errorMessage,
      endpoint: '/api/blog/all',
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