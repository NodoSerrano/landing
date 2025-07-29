// Este archivo reemplaza la funcionalidad de email.ts sin usar nodemailer

// Función para registrar la notificación en la base de datos
import { sql } from "./db"

// Función para enviar notificación sin usar nodemailer
export async function sendNotification(subscriberEmail: string) {
  try {
    console.log("Registrando nueva suscripción para:", subscriberEmail)

    // Registrar la notificación en la base de datos
    try {
      await sql`
        INSERT INTO notifications (email, type, status, created_at)
        VALUES (${subscriberEmail}, 'subscription', 'pending', NOW())
      `
      console.log("Notificación registrada en la base de datos")
    } catch (error) {
      console.warn("No se pudo registrar la notificación en la base de datos:", error)
      // Continuamos aunque falle el registro
    }

    // En un entorno de producción, aquí se conectaría con un servicio de email
    // como SendGrid, Mailgun, etc. Para el entorno de preview, solo simulamos el envío.

    // Simulación de envío exitoso
    console.log("Simulando envío de notificación para:", subscriberEmail)
    console.log("Destinatario: iberras@gmail.com")
    console.log("Asunto: Nuevo suscriptor en Nodo Serrano")
    console.log("Contenido: Un nuevo usuario se ha suscrito con el email:", subscriberEmail)

    return {
      success: true,
      message: "Notificación procesada correctamente",
      note: "En el entorno de preview, el email no se envía realmente. En producción, configura un servicio de email.",
    }
  } catch (error: any) {
    console.error("Error al procesar notificación:", error)
    return {
      success: false,
      error: error.message || "Error desconocido",
    }
  }
}
