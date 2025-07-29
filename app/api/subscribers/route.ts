import { NextResponse } from "next/server"
import { subscribeToNewsletter } from "@/app/actions"
import { sql } from "@/lib/db"

// Ensure this route is not statically analyzed during build
export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    // Get subscriber count directly
    const result = await sql`SELECT COUNT(*) as count FROM subscribers`
    
    return NextResponse.json({
      count: parseInt(result[0].count),
      message: "Los suscriptores se están guardando correctamente en la base de datos",
    })
  } catch (error) {
    console.error("Error en la ruta API de suscriptores:", error)
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json(
        { success: false, message: "Email is required" },
        { status: 400 }
      )
    }

    const formData = new FormData()
    formData.append("email", email)

    const response = await subscribeToNewsletter(formData)

    if (response.success) {
      return NextResponse.json(response, { status: 200 })
    } else {
      return NextResponse.json(response, { status: 400 })
    }
  } catch (error) {
    console.error("Error in POST /api/subscribers:", error)
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    )
  }
}
