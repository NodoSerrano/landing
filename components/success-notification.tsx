"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { CheckCircle, X } from "lucide-react"

interface SuccessNotificationProps {
  show: boolean
  message: string
  onClose: () => void
}

export default function SuccessNotification({ show, message, onClose }: SuccessNotificationProps) {
  const [isVisible, setIsVisible] = useState(false)

  // Efecto para manejar la visibilidad y el cierre automático
  useEffect(() => {
    if (show) {
      setIsVisible(true)
      // Cerrar automáticamente después de 5 segundos
      const timer = setTimeout(() => {
        setIsVisible(false)
        setTimeout(onClose, 500) // Dar tiempo para la animación de salida
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [show, onClose])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-md"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.3 }}
        >
          <div className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white p-4 rounded-lg shadow-lg mx-4">
            <div className="flex items-start justify-between">
              <div className="flex items-center">
                <CheckCircle className="h-6 w-6 mr-3 text-white" />
                <div>
                  <h3 className="font-bold text-lg">¡Suscripción exitosa!</h3>
                  <p className="text-white/90">{message}</p>
                </div>
              </div>
              <button
                onClick={() => {
                  setIsVisible(false)
                  setTimeout(onClose, 500)
                }}
                className="text-white/80 hover:text-white transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
