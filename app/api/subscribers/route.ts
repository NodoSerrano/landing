import { getActiveSubscribers } from "@/lib/db"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const result = await getActiveSubscribers()

    if (!result.success) {
      return NextResponse.json({ error: "Error al obtener suscriptores" }, { status: 500 })
    }

    // Devolver solo el número de suscriptores por seguridad
    return NextResponse.json({
      count: result.data.length,
      message: "Los suscriptores se están guardando correctamente en la base de datos",
    })
  } catch (error) {
    console.error("Error en la ruta API de suscriptores:", error)
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 })
  }
}
