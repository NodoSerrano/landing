"use server"

import { addSubscriber } from "@/lib/db"
import { sendNotification } from "@/lib/notification-service"
import { z } from "zod"

// Esquema de validación para el formulario con validación más permisiva
const SubscribeSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "El email es requerido")
    .refine((email) => email.includes("@"), {
      message: "El email debe contener @",
    }),
  name: z.string().optional().nullable(),
})

// Acción del servidor para manejar la suscripción
export async function subscribeToNewsletter(formData: FormData) {
  try {
    console.log("=== INICIO subscribeToNewsletter ===")

    // Extraer datos del formulario
    const emailRaw = formData.get("email")
    const nameRaw = formData.get("name")

    console.log("Datos del formulario:")
    console.log("- emailRaw:", emailRaw)
    console.log("- nameRaw:", nameRaw)
    console.log("- Tipo emailRaw:", typeof emailRaw)

    // Verificar que el email no sea null o undefined
    if (!emailRaw) {
      console.error("Email no proporcionado")
      return {
        success: false,
        message: "Por favor ingresa un email",
      }
    }

    const email = String(emailRaw).trim()
    const name = nameRaw ? String(nameRaw).trim() : undefined

    console.log("Datos procesados:")
    console.log("- email:", email)
    console.log("- name:", name)

    // Validación básica antes de usar Zod
    if (!email.includes("@")) {
      console.error("Email sin @:", email)
      return {
        success: false,
        message: "Por favor ingresa un email válido con @",
      }
    }

    try {
      // Validar los datos con Zod
      const validatedData = SubscribeSchema.parse({ email, name })
      console.log("Datos validados con Zod:", validatedData)

      // Guardar en la base de datos
      console.log("Llamando a addSubscriber...")
      const result = await addSubscriber(validatedData.email, validatedData.name || undefined)
      console.log("Resultado de addSubscriber:", result)

      if (!result.success) {
        console.error("Error al guardar en la base de datos:", result.error)
        return {
          success: false,
          message: result.error || "Error al guardar tu email. Por favor intenta nuevamente.",
        }
      }

      console.log("Suscriptor guardado en la base de datos correctamente")

      // Enviar notificación
      console.log("Enviando notificación...")
      const notificationResult = await sendNotification(validatedData.email)
      console.log("Resultado de notificación:", notificationResult)

      if (!notificationResult.success) {
        console.warn("No se pudo enviar la notificación:", notificationResult.error)
      } else {
        console.log("Notificación procesada correctamente")
      }

      console.log("=== FIN subscribeToNewsletter EXITOSO ===")

      // Independientemente del resultado de las notificaciones, la suscripción fue exitosa
      return {
        success: true,
        message: "¡Gracias por suscribirte! Te mantendremos informado.",
      }
    } catch (zodError) {
      console.error("Error de validación Zod:", zodError)

      if (zodError instanceof z.ZodError) {
        const errorMessage = zodError.errors.map((err) => `${err.path}: ${err.message}`).join(", ")
        console.error("Detalles del error Zod:", errorMessage)
        return {
          success: false,
          message: `Error de validación: ${errorMessage}`,
        }
      }

      throw zodError // Re-lanzar si no es un error de Zod
    }
  } catch (error) {
    console.error("=== ERROR en subscribeToNewsletter ===")
    console.error("Error completo:", error)

    return {
      success: false,
      message: "Ocurrió un error. Por favor intenta nuevamente.",
    }
  }
}
