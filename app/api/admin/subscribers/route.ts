import { NextRequest, NextResponse } from "next/server"
import { sql } from "@/lib/db"

// Simple API key protection - set ADMIN_API_KEY in environment variables
const ADMIN_API_KEY = process.env.ADMIN_API_KEY

export async function GET(request: NextRequest) {
  // Check for API key in headers
  const apiKey = request.headers.get("x-api-key")
  
  if (ADMIN_API_KEY && apiKey !== ADMIN_API_KEY) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    )
  }

  try {
    // Get query parameters
    const searchParams = request.nextUrl.searchParams
    const limit = parseInt(searchParams.get("limit") || "50")
    const offset = parseInt(searchParams.get("offset") || "0")
    const search = searchParams.get("search") || ""

    let query
    let totalQuery

    if (search) {
      // Search by email
      query = sql`
        SELECT id, email, created_at, updated_at
        FROM subscribers
        WHERE email ILIKE ${`%${search}%`}
        ORDER BY created_at DESC
        LIMIT ${limit}
        OFFSET ${offset}
      `
      
      totalQuery = sql`
        SELECT COUNT(*) as total
        FROM subscribers
        WHERE email ILIKE ${`%${search}%`}
      `
    } else {
      // Get all subscribers
      query = sql`
        SELECT id, email, created_at, updated_at
        FROM subscribers
        ORDER BY created_at DESC
        LIMIT ${limit}
        OFFSET ${offset}
      `
      
      totalQuery = sql`
        SELECT COUNT(*) as total
        FROM subscribers
      `
    }

    const [subscribers, totalResult] = await Promise.all([query, totalQuery])
    const total = totalResult[0].total

    return NextResponse.json({
      subscribers,
      pagination: {
        total: parseInt(total),
        limit,
        offset,
        pages: Math.ceil(parseInt(total) / limit)
      }
    })
  } catch (error: any) {
    console.error("Error fetching subscribers:", error)
    return NextResponse.json(
      { error: "Failed to fetch subscribers" },
      { status: 500 }
    )
  }
}

// Export CSV endpoint
export async function POST(request: NextRequest) {
  // Check for API key in headers
  const apiKey = request.headers.get("x-api-key")
  
  if (ADMIN_API_KEY && apiKey !== ADMIN_API_KEY) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    )
  }

  try {
    const { format } = await request.json()
    
    if (format !== "csv") {
      return NextResponse.json(
        { error: "Only CSV format is supported" },
        { status: 400 }
      )
    }

    // Get all subscribers for export
    const subscribers = await sql`
      SELECT email, created_at
      FROM subscribers
      ORDER BY created_at DESC
    `

    // Create CSV content
    const csv = [
      "Email,Subscribed Date",
      ...subscribers.map(sub => 
        `"${sub.email}","${new Date(sub.created_at).toISOString()}"`
      )
    ].join("\n")

    return new NextResponse(csv, {
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition": `attachment; filename="subscribers-${new Date().toISOString().split('T')[0]}.csv"`
      }
    })
  } catch (error: any) {
    console.error("Error exporting subscribers:", error)
    return NextResponse.json(
      { error: "Failed to export subscribers" },
      { status: 500 }
    )
  }
}