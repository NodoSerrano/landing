"use client"

import type React from "react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { subscribeToNewsletter } from "@/app/actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react"

export default function NewsletterForm() {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [message, setMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!email || email.trim() === "") {
      setStatus("error")
      setMessage("Por favor ingresa tu email")
      return
    }

    setStatus("loading")
    const formData = new FormData()
    formData.append("email", email.trim())

    try {
      const result = await subscribeToNewsletter(formData)

      if (result.success) {
        setStatus("success")
        setMessage(result.message)
        setEmail("")
        
        // Reset to idle after 5 seconds
        setTimeout(() => {
          setStatus("idle")
          setMessage("")
        }, 5000)
      } else {
        setStatus("error")
        setMessage(result.message)
      }
    } catch (error) {
      setStatus("error")
      setMessage("Ocurrió un error. Por favor intenta nuevamente.")
    }
  }

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <Input
          type="email"
          placeholder="tu@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={status === "loading"}
          className="bg-white/80 border-cyan-200 text-slate-800 placeholder:text-slate-500 focus:border-cyan-300"
          required
        />
        <motion.div
          whileHover={{ scale: status !== "loading" ? 1.02 : 1 }}
          whileTap={{ scale: status !== "loading" ? 0.98 : 1 }}
        >
          <Button
            type="submit"
            disabled={status === "loading"}
            className="bg-gradient-to-r from-cyan-400 to-blue-400 hover:from-cyan-500 hover:to-blue-500 text-white whitespace-nowrap w-full sm:w-auto"
          >
            {status === "loading" && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {status === "loading" ? "Enviando..." : "Suscribirse"}
          </Button>
        </motion.div>
      </form>

      <AnimatePresence mode="wait">
        {message && (
          <motion.p
            key={status}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`text-sm mt-3 flex items-center ${
              status === "error" ? "text-red-600" : "text-green-700"
            }`}
          >
            {status === "error" ? (
              <AlertCircle className="h-4 w-4 mr-1" />
            ) : (
              <CheckCircle2 className="h-4 w-4 mr-1" />
            )}
            {message}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}
