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

    console.log(`[subscribeToNewsletter] Attempting to save email: ${email}`)
    
    // Save to database
    const result = await addSubscriber(email)
    
    console.log(`[subscribeToNewsletter] Database result:`, result)
    
    if (!result.success) {
      // Check if it's a duplicate email
      if (result.code === "DUPLICATE_EMAIL") {
        return {
          success: true,
          message: "¡Ya estás en nuestra lista! Te mantendremos informado.",
        }
      }
      
      console.error(`[subscribeToNewsletter] Failed to save email:`, result.error)
      
      return {
        success: false,
        message: result.error || "Error al guardar tu email. Por favor intenta nuevamente.",
      }
    }

    console.log(`[subscribeToNewsletter] Email saved successfully: ${email}`)
    
    return {
      success: true,
      message: "¡Gracias! Te mantendremos informado.",
    }
  } catch (error) {
    console.error("[subscribeToNewsletter] Unexpected error:", error)
    return {
      success: false,
      message: "Ocurrió un error. Por favor intenta nuevamente.",
    }
  }
}
