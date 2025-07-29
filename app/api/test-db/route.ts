import { NextResponse } from "next/server"
import { addSubscriber } from "@/lib/db"

export async function POST(request: Request) {
  try {
    const { email, name } = await request.json()

    if (!email) {
      return NextResponse.json({ success: false, error: "Email es requerido" }, { status: 400 })
    }

    console.log("Probando inserción en DB con:", { email, name })

    const result = await addSubscriber(email, name)

    return NextResponse.json({
      success: result.success,
      message: result.success ? "Suscriptor agregado correctamente" : "Error al agregar suscriptor",
      data: result.data || null,
      error: result.error || null,
    })
  } catch (error: any) {
    console.error("Error en test-db:", error)
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Error desconocido",
      },
      { status: 500 },
    )
  }
}

export async function GET() {
  return NextResponse.json({
    message: "Usa POST para probar la inserción en la base de datos",
    example: {
      method: "POST",
      body: {
        email: "test@example.com",
        name: "Test User",
      },
    },
  })
}
