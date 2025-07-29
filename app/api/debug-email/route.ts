import { NextResponse } from "next/server"

export async function GET() {
  try {
    // Verificar si las variables de entorno están configuradas
    const emailUser = process.env.EMAIL_USER
    const emailPassword = process.env.EMAIL_PASSWORD

    // No mostrar la contraseña completa por seguridad
    const maskedPassword = emailPassword
      ? "*".repeat(Math.max(emailPassword.length - 4, 0)) + emailPassword.slice(-4)
      : null

    // Información de diagnóstico
    const diagnosticInfo = {
      emailConfigured: {
        user: !!emailUser,
        password: !!emailPassword,
        userValue: emailUser ? `${emailUser.slice(0, 3)}...${emailUser.slice(-8)}` : null,
        passwordMasked: maskedPassword,
      },
      environment: process.env.NODE_ENV,
      timestamp: new Date().toISOString(),
    }

    return NextResponse.json({
      ...diagnosticInfo,
      message: "Esta información de diagnóstico te ayudará a identificar problemas con la configuración de email.",
      note: "En el entorno de preview, se utiliza un servicio de notificación simulado en lugar de enviar emails reales.",
    })
  } catch (error: any) {
    return NextResponse.json(
      {
        error: "Error al obtener información de diagnóstico",
        message: error.message || "Error desconocido",
      },
      { status: 500 },
    )
  }
}
