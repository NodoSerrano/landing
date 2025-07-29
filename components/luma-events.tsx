"use client"

import { motion } from "framer-motion"
import Link from "next/link"

// Event data structure
interface LumaEvent {
  id: string
  title: string
  description: string
  date: string
  location: string
  featured?: boolean
}

// Mock events - In a real implementation, you'd fetch this from Luma API
const mockEvents: LumaEvent[] = [
  {
    id: "evt-1",
    title: "Introducción a Ethereum",
    description: "Workshop introductorio sobre la tecnología blockchain de Ethereum, smart contracts y DeFi.",
    date: "2025-08-15",
    location: "Tandil, Buenos Aires",
    featured: true
  },
  {
    id: "evt-2", 
    title: "Workshop DeFi",
    description: "Introducción práctica a las finanzas descentralizadas",
    date: "2025-08-22",
    location: "Tandil, Buenos Aires"
  },
  {
    id: "evt-3",
    title: "Meetup Blockchain",
    description: "Networking y charlas técnicas sobre el ecosistema blockchain",
    date: "2025-08-29", 
    location: "Tandil, Buenos Aires"
  }
]

const itemFadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export default function LumaEvents() {
  const featuredEvent = mockEvents.find(event => event.featured)
  const otherEvents = mockEvents.filter(event => !event.featured)

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
  }

  return (
    <div className="grid lg:grid-cols-3 gap-8">
      {/* Featured Event - Left Highlight */}
      {featuredEvent && (
        <div className="lg:col-span-2">
          <motion.div 
            className="bg-gradient-to-r from-cyan-500/20 to-blue-600/20 p-6 rounded-lg border border-cyan-500/30 hover:border-cyan-400 transition-colors h-full"
            variants={itemFadeIn}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
          >
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="flex-1">
                <span className="inline-block px-3 py-1 bg-cyan-500/20 text-cyan-300 text-sm font-medium rounded-full mb-3">
                  Próximo Evento
                </span>
                <h3 className="text-xl font-bold text-white mb-2">{featuredEvent.title}</h3>
                <p className="text-cyan-100/80 mb-4">
                  {featuredEvent.description}
                </p>
                <div className="flex items-center gap-4 text-sm text-cyan-200/70">
                  <span>📅 {formatDate(featuredEvent.date)}</span>
                  <span>📍 {featuredEvent.location}</span>
                </div>
                <div className="mt-4">
                  <button className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-sm font-medium rounded-lg hover:from-cyan-600 hover:to-blue-700 transition-colors">
                    Registrarse
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
      
      {/* Side Events */}
      <div className="space-y-4">
        {otherEvents.map((event) => (
          <motion.div 
            key={event.id}
            className="bg-[#051030]/80 p-4 rounded-lg border border-cyan-500/20 hover:border-cyan-400/50 transition-colors"
            variants={itemFadeIn}
            whileHover={{ y: -2, transition: { duration: 0.2 } }}
          >
            <h4 className="font-semibold text-white mb-2">{event.title}</h4>
            <p className="text-sm text-cyan-100/70 mb-2">{event.description}</p>
            <div className="flex items-center justify-between">
              <span className="text-xs text-cyan-200/60">📅 {formatDate(event.date)}</span>
              <button className="text-xs text-cyan-300 hover:text-cyan-200 font-medium">
                Ver más
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}