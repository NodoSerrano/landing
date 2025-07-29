"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function TestSubscriptionPage() {
  const [email, setEmail] = useState("")
  const [result, setResult] = useState<any>(null)
  const [dbStatus, setDbStatus] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const testDirectDB = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/test-db", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name: "Test User" }),
      })
      const data = await response.json()
      setResult(data)
    } catch (error) {
      setResult({ success: false, error: "Error de red" })
    }
    setLoading(false)
  }

  const checkDBStatus = async () => {
    try {
      const response = await fetch("/api/debug-db")
      const data = await response.json()
      setDbStatus(data)
    } catch (error) {
      setDbStatus({ success: false, error: "Error de red" })
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-6">Prueba de Suscripción</h1>

        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-semibold mb-3">Estado de la Base de Datos</h2>
            <Button onClick={checkDBStatus} className="mb-3">
              Verificar Estado de DB
            </Button>
            {dbStatus && (
              <pre className="bg-gray-100 p-3 rounded text-sm overflow-auto">{JSON.stringify(dbStatus, null, 2)}</pre>
            )}
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-3">Prueba Directa de DB</h2>
            <div className="flex gap-3 mb-3">
              <Input
                type="email"
                placeholder="test@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Button onClick={testDirectDB} disabled={loading}>
                {loading ? "Probando..." : "Probar DB"}
              </Button>
            </div>
            {result && (
              <pre className="bg-gray-100 p-3 rounded text-sm overflow-auto">{JSON.stringify(result, null, 2)}</pre>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
