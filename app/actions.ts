"use server"

import { addSubscriber } from "@/lib/db"

// Simple email collection action
export async function subscribeToNewsletter(formData: FormData) {
  try {
    const emailRaw = formData.get("email")
    
    if (!emailRaw) {
      return {
        success: false,
        message: "Por favor ingresa un email",
      }
    }

    const email = String(emailRaw).trim().toLowerCase()
    
    // Basic email validation
    if (!email.includes("@") || !email.includes(".")) {
      return {
        success: false,
        message: "Por favor ingresa un email válido",
      }
    }

    // Save to database
    const result = await addSubscriber(email)
    
    if (!result.success) {
      // Check if it's a duplicate email
      if (result.code === "DUPLICATE_EMAIL") {
        return {
          success: true,
          message: "¡Ya estás en nuestra lista! Te mantendremos informado.",
        }
      }
      
      return {
        success: false,
        message: "Error al guardar tu email. Por favor intenta nuevamente.",
      }
    }

    return {
      success: true,
      message: "¡Gracias! Te mantendremos informado.",
    }
  } catch (error) {
    console.error("Error in subscribeToNewsletter:", error)
    return {
      success: false,
      message: "Ocurrió un error. Por favor intenta nuevamente.",
    }
  }
}
