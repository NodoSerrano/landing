import { neon } from "@neondatabase/serverless"

export const sql = neon(process.env.DATABASE_URL!)

export async function addSubscriber(email: string) {
  try {
    const cleanEmail = email.trim().toLowerCase()

    const result = await sql`
      INSERT INTO subscribers (email, created_at)
      VALUES (${cleanEmail}, CURRENT_TIMESTAMP)
      ON CONFLICT (email) 
      DO UPDATE SET 
        updated_at = CURRENT_TIMESTAMP
      RETURNING id, email, created_at
    `

    return { success: true, data: result[0] }
  } catch (error: any) {
    // Handle duplicate emails
    if (error.message?.includes("duplicate key") || error.message?.includes("unique constraint")) {
      return {
        success: false,
        code: "DUPLICATE_EMAIL",
        message: "Este email ya está registrado",
      }
    }

    // Handle missing table
    if (error.message?.includes("relation") && error.message?.includes("does not exist")) {
      console.error("Subscribers table does not exist")
      return {
        success: false,
        code: "TABLE_NOT_EXISTS",
        error: "Database table missing",
      }
    }

    console.error("Database error:", error)
    return {
      success: false,
      error: error.message || "Database error",
    }
  }
}

