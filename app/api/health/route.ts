import { NextResponse } from "next/server"
import { sql } from "@/lib/db"

// Health check endpoint
export const dynamic = 'force-dynamic'

export async function GET() {
  const checks = {
    environment: process.env.NODE_ENV,
    databaseUrlSet: !!process.env.DATABASE_URL,
    databaseConnection: false,
    subscriberCount: null,
    error: null
  }

  try {
    // Try to connect to database
    const result = await sql`SELECT COUNT(*) as count FROM subscribers`
    checks.databaseConnection = true
    checks.subscriberCount = parseInt(result[0].count)
  } catch (error: any) {
    checks.error = error.message
  }

  return NextResponse.json({
    status: checks.databaseConnection ? "healthy" : "unhealthy",
    timestamp: new Date().toISOString(),
    checks
  })
}