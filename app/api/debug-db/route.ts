import { NextResponse } from "next/server"
import { sql } from "@/lib/db"

export async function GET() {
  try {
    // Verificar si la tabla existe
    const tableExists = await sql`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'subscribers'
      );
    `

    // Contar suscriptores
    let subscriberCount = 0
    let subscribers = []

    if (tableExists[0].exists) {
      const countResult = await sql`SELECT COUNT(*) as count FROM subscribers`
      subscriberCount = countResult[0].count

      // Obtener los últimos 5 suscriptores
      subscribers = await sql`
        SELECT id, email, name, status, created_at 
        FROM subscribers 
        ORDER BY created_at DESC 
        LIMIT 5
      `
    }

    return NextResponse.json({
      success: true,
      tableExists: tableExists[0].exists,
      subscriberCount,
      latestSubscribers: subscribers,
      timestamp: new Date().toISOString(),
    })
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Error desconocido",
        details: error,
      },
      { status: 500 },
    )
  }
}
