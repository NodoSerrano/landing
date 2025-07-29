import { NextResponse } from "next/server"
import { sendNotification } from "@/lib/notification-service"

export async function GET(request: Request) {
  try {
    // Obtener la URL de la solicitud
    const url = new URL(request.url)

    // Obtener el parámetro de consulta 'to' (destinatario)
    const to = url.searchParams.get("to") || "test@example.com"

    // Enviar notificación de prueba
    const result = await sendNotification(to)

    return NextResponse.json({
      success: true,
      message: "Notificación de prueba procesada correctamente",
      details: result,
      note: "En el entorno de preview, el email no se envía realmente.",
    })
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: "Error al procesar notificación de prueba",
        details: error.message || "Error desconocido",
      },
      { status: 500 },
    )
  }
}
