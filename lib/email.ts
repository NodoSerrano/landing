import nodemailer from "nodemailer"

// Configurar el transporte de email
let transporter: nodemailer.Transporter | null = null

// Función para inicializar el transporte de email sin verificación DNS
function getTransporter() {
  if (transporter) return transporter

  // Verificar que las credenciales existan
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
    console.error("ERROR: Credenciales de email no configuradas")
    throw new Error("Credenciales de email no configuradas")
  }

  console.log(`Configurando transporte de email con usuario: ${process.env.EMAIL_USER.slice(0, 3)}...`)

  // Crear el transporte
  transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
    tls: {
      rejectUnauthorized: false,
    },
    // Desactivamos la verificación DNS que causa problemas en Vercel
    ignoreTLS: true, // Ignorar TLS para evitar verificaciones DNS
  })

  return transporter
}

// Función para enviar email de notificación sin verificación DNS
export async function sendNotificationEmail(subscriberEmail: string) {
  try {
    console.log("Intentando enviar email de notificación para:", subscriberEmail)

    // Verificar si tenemos credenciales configuradas
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
      console.warn("AVISO: Variables de entorno EMAIL_USER y EMAIL_PASSWORD no configuradas.")
      console.warn("El correo de notificación no se enviará hasta que se configuren estas variables.")

      return {
        success: false,
        error: "Credenciales de email no configuradas",
        details: {
          emailUser: process.env.EMAIL_USER ? "Configurado" : "No configurado",
          emailPassword: process.env.EMAIL_PASSWORD ? "Configurado" : "No configurado",
        },
      }
    }

    // Intentar obtener el transporte
    let transport
    try {
      transport = getTransporter()
      console.log("Transporte de email configurado correctamente")
    } catch (error: any) {
      console.error("Error al configurar el transporte de email:", error)
      return {
        success: false,
        error: "Error al configurar el transporte de email",
        details: error.message,
      }
    }

    // NO verificamos la conexión SMTP porque causa problemas en Vercel
    // Simplemente intentamos enviar el email directamente

    // Intentar enviar el email
    try {
      const info = await transport.sendMail({
        from: `"Nodo Serrano" <${process.env.EMAIL_USER}>`,
        to: "iberras@gmail.com", // Email fijo del administrador
        subject: "Nuevo suscriptor en Nodo Serrano",
        text: `Un nuevo usuario se ha suscrito con el email: ${subscriberEmail}`,
        html: `
          <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
            <h2 style="color: #0891b2;">Nuevo suscriptor en Nodo Serrano</h2>
            <p>Un nuevo usuario se ha suscrito al boletín de Nodo Serrano.</p>
            <p><strong>Email:</strong> ${subscriberEmail}</p>
            <p><strong>Fecha:</strong> ${new Date().toLocaleString()}</p>
            <hr style="border: 1px solid #eee; margin: 20px 0;" />
            <p style="font-size: 12px; color: #666;">Este es un mensaje automático, por favor no responda a este correo.</p>
          </div>
        `,
      })

      console.log("Email enviado correctamente:", info.messageId)
      return { success: true, messageId: info.messageId }
    } catch (error: any) {
      console.error("Error al enviar el email:", error)
      return {
        success: false,
        error: "Error al enviar el email",
        details: error.message,
      }
    }
  } catch (error: any) {
    console.error("Error general al procesar el envío de email:", error)
    return {
      success: false,
      error: "Error general al procesar el envío de email",
      details: error.message,
    }
  }
}
