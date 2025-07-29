import { neon } from "@neondatabase/serverless"

// Crear una instancia de cliente SQL reutilizable
export const sql = neon(process.env.DATABASE_URL!)

// Función para agregar un nuevo suscriptor con mejor manejo de errores
export async function addSubscriber(email: string, name?: string | null) {
  try {
    console.log("=== INICIO addSubscriber ===")
    console.log("Email recibido:", email)
    console.log("Nombre recibido:", name)
    console.log("Tipo de email:", typeof email)
    console.log("DATABASE_URL configurado:", !!process.env.DATABASE_URL)

    // Validación adicional
    if (!email || typeof email !== "string") {
      console.error("Email inválido:", email)
      throw new Error("Email inválido")
    }

    // Limpiar el email
    const cleanEmail = email.trim().toLowerCase()
    console.log("Email limpio:", cleanEmail)

    // Validación básica
    if (!cleanEmail.includes("@")) {
      console.error("Email sin @:", cleanEmail)
      throw new Error("El email debe contener @")
    }

    console.log("Intentando insertar en la base de datos...")

    const result = await sql`
      INSERT INTO subscribers (email, name)
      VALUES (${cleanEmail}, ${name || null})
      ON CONFLICT (email) 
      DO UPDATE SET 
        status = 'active',
        created_at = CURRENT_TIMESTAMP
      RETURNING id, email, created_at
    `

    console.log("Resultado de la inserción:", result)
    console.log("=== FIN addSubscriber EXITOSO ===")

    return { success: true, data: result[0] }
  } catch (error: any) {
    console.error("=== ERROR en addSubscriber ===")
    console.error("Error completo:", error)
    console.error("Mensaje del error:", error.message)
    console.error("Stack del error:", error.stack)

    // Manejar errores específicos de la base de datos
    if (error.message?.includes("duplicate key") || error.message?.includes("unique constraint")) {
      console.log("Email duplicado detectado")
      return {
        success: true, // Consideramos esto como éxito ya que el email ya existe
        data: { email: email.trim().toLowerCase() },
        message: "Este email ya está registrado",
        code: "DUPLICATE_EMAIL",
      }
    }

    if (error.message?.includes("relation") && error.message?.includes("does not exist")) {
      console.error("La tabla subscribers no existe")
      return {
        success: false,
        error: "La tabla de suscriptores no existe. Necesita ser creada.",
        code: "TABLE_NOT_EXISTS",
      }
    }

    return {
      success: false,
      error: `Error al guardar el email: ${error.message || "Error desconocido"}`,
      details: error,
    }
  }
}

// Función para obtener todos los suscriptores activos
export async function getActiveSubscribers() {
  try {
    console.log("Obteniendo suscriptores activos...")
    const subscribers = await sql`
      SELECT * FROM subscribers 
      WHERE status = 'active' 
      ORDER BY created_at DESC
    `
    console.log("Suscriptores encontrados:", subscribers.length)
    return { success: true, data: subscribers }
  } catch (error: any) {
    console.error("Error al obtener suscriptores:", error)
    return { success: false, error: "Error al obtener suscriptores" }
  }
}
