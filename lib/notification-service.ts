// Este archivo reemplaza la funcionalidad de email.ts sin usar nodemailer

// Función para simular el envío de notificaciones sin usar DNS
export async function sendNotification(subscriberEmail: string) {
  try {
    console.log("Procesando notificación para:", subscriberEmail)

    // En un entorno de producción, aquí se conectaría con un servicio de email
    // como SendGrid, Mailgun, etc. Para el entorno de preview, solo simulamos el envío.

    // Simulación de envío exitoso
    console.log("Simulando envío de notificación:")
    console.log("- Destinatario: iberras@gmail.com")
    console.log("- Asunto: Nuevo suscriptor en Nodo Serrano")
    console.log("- Contenido: Un nuevo usuario se ha suscrito con el email:", subscriberEmail)

    return {
      success: true,
      message: "Notificación procesada correctamente",
      note: "En el entorno de preview, el email no se envía realmente.",
    }
  } catch (error: any) {
    console.error("Error al procesar notificación:", error)
    return {
      success: false,
      error: error.message || "Error desconocido",
    }
  }
}
