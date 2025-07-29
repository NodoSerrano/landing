"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { subscribeToNewsletter } from "@/app/actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { AlertCircle, Loader2 } from "lucide-react"
import SuccessNotification from "./success-notification"
import ConfettiEffect from "./confetti-effect"

export default function NewsletterForm() {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [message, setMessage] = useState("")
  const [showNotification, setShowNotification] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // Validación básica del lado del cliente
    // Simplificamos la validación para evitar falsos positivos
    if (!email || email.trim() === "") {
      setStatus("error")
      setMessage("Por favor ingresa tu email")
      return
    }

    setStatus("loading")
    setMessage("Procesando tu suscripción...")

    const formData = new FormData()
    // Aseguramos que el email esté limpio de espacios
    formData.append("email", email.trim())

    try {
      console.log("Enviando email:", email.trim())
      const result = await subscribeToNewsletter(formData)
      console.log("Resultado:", result)

      if (result.success) {
        setStatus("success")
        setMessage(result.message || "¡Gracias por suscribirte! Te mantendremos informado.")
        setShowNotification(true)
        setShowConfetti(true)
        setEmail("")

        // Ocultar el confeti después de 5 segundos
        setTimeout(() => {
          setShowConfetti(false)
        }, 5000)
      } else {
        setStatus("error")
        setMessage(result.message || "Ocurrió un error. Por favor intenta nuevamente.")
      }
    } catch (error) {
      console.error("Error al enviar formulario:", error)
      setStatus("error")
      setMessage("Ocurrió un error inesperado. Por favor intenta nuevamente.")
    }
  }

  return (
    <div className="w-full">
      {/* Notificación de éxito */}
      <SuccessNotification show={showNotification} message={message} onClose={() => setShowNotification(false)} />

      {/* Efecto de confeti */}
      {showConfetti && <ConfettiEffect />}

      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <Input
          type="email"
          placeholder="Ingresa tu email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={status === "loading"}
          className="bg-white/10 border-cyan-500/50 text-white placeholder:text-white/60"
        />
        <motion.div
          whileHover={{ scale: status !== "loading" ? 1.05 : 1 }}
          whileTap={{ scale: status !== "loading" ? 0.95 : 1 }}
        >
          <Button
            type="submit"
            disabled={status === "loading"}
            className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 whitespace-nowrap w-full sm:w-auto"
          >
            {status === "loading" && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {status === "loading" ? "Procesando..." : "Suscribirse"}
          </Button>
        </motion.div>
      </form>

      {message && status === "error" && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm mt-3 flex items-center text-red-300"
        >
          <AlertCircle className="h-4 w-4 mr-1" />
          {message}
        </motion.p>
      )}
    </div>
  )
}
