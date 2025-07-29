import { neon } from "@neondatabase/serverless"

// Create database connection only when DATABASE_URL is available
// This prevents build errors when the env var is not set during build
export const sql = process.env.DATABASE_URL 
  ? neon(process.env.DATABASE_URL)
  : (() => { 
      console.warn('DATABASE_URL not set, database operations will fail');
      return async () => { throw new Error('Database not configured') };
    })() as any

export async function addSubscriber(email: string) {
  try {
    const cleanEmail = email.trim().toLowerCase()
    
    console.log(`[addSubscriber] DATABASE_URL exists: ${!!process.env.DATABASE_URL}`)
    console.log(`[addSubscriber] Attempting to insert email: ${cleanEmail}`)

    const result = await sql`
      INSERT INTO subscribers (email, created_at)
      VALUES (${cleanEmail}, CURRENT_TIMESTAMP)
      ON CONFLICT (email) 
      DO UPDATE SET 
        updated_at = CURRENT_TIMESTAMP
      RETURNING id, email, created_at
    `

    console.log(`[addSubscriber] Insert successful:`, result[0])
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

