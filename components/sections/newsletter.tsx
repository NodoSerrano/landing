"use client"

import type React from "react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react"
import { subscribeToNewsletter } from "@/app/actions"

const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
}

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
}

function SignupForm() {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [message, setMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!email.trim()) {
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
        setTimeout(() => {
          setStatus("idle")
          setMessage("")
        }, 5000)
      } else {
        setStatus("error")
        setMessage(result.message)
      }
    } catch {
      setStatus("error")
      setMessage("Ocurrió un error. Por favor intenta nuevamente.")
    }
  }

  return (
    <div className="flex w-full flex-col gap-4">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 sm:flex-row">
        <input
          type="email"
          placeholder="tu@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={status === "loading"}
          required
          className="h-[52px] w-full rounded-[10px] border border-(--color-warm-yellow)/40 bg-(--color-bg-elev-dark) px-5 font-inter text-body text-(--color-text-primary-dark) placeholder:text-(--color-text-soft) outline-none transition-colors focus:border-(--color-warm-yellow) disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="inline-flex h-[52px] min-w-[160px] shrink-0 items-center justify-center gap-2 rounded-br-[10px] rounded-tl-[10px] border-2 border-(--color-warm-yellow) px-8 font-inter text-body text-(--color-text-primary-dark) transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
          style={{ boxShadow: "var(--shadow-btn-warm)" }}
        >
          {status === "loading" ? <Loader2 className="h-4 w-4 animate-spin" /> : "Suscribirme"}
        </button>
      </form>

      <AnimatePresence mode="wait">
        {message && (
          <motion.p
            key={status}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            className={`flex items-center justify-center gap-1.5 font-inter text-body-sm ${
              status === "error" ? "text-(--color-warm-red)" : "text-(--color-accent-teal)"
            }`}
          >
            {status === "error" ? (
              <AlertCircle className="h-4 w-4 shrink-0" />
            ) : (
              <CheckCircle2 className="h-4 w-4 shrink-0" />
            )}
            {message}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function Newsletter() {
  return (
    <section id="signup" className="relative z-10 px-4 py-20 md:py-28">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={stagger}
        className="relative z-10 mx-auto flex w-full max-w-[720px] flex-col items-center gap-10 text-center"
      >
        <motion.div variants={fadeInUp} className="flex flex-col items-center gap-2">
          <h2 className="font-display text-h1 font-bold">
            <span className="text-(--color-text-primary-light)">Sumate al</span>{" "}
            <span className="inline-block rounded-[4px] bg-gradient-warm px-3 py-1 text-(--color-text-primary-dark)">
              NODO
            </span>
          </h2>
          <p className="font-display text-h3 font-medium text-(--color-warm-violet)">
            Novedades, eventos y talleres directo a tu email
          </p>
        </motion.div>

        <motion.div
          variants={fadeInUp}
          className="flex w-full flex-col items-center gap-6 rounded-[24px] rounded-tr-none border border-(--color-warm-yellow) bg-(--color-bg-elev-dark) px-6 py-10 md:px-12"
          style={{ boxShadow: "var(--shadow-neumorphic-dark)" }}
        >
          <p className="max-w-md font-inter text-body text-(--color-text-primary-dark)">
            Sé parte de la revolución blockchain en Tandil. Registrate para recibir novedades
            sobre eventos, talleres y oportunidades.
          </p>
          <SignupForm />
        </motion.div>
      </motion.div>
    </section>
  )
}
