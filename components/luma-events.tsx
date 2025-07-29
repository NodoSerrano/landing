"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { useEffect, useState } from "react"
import { fetchLumaEvents, formatEventDate, getRelativeDate, type LumaEvent } from "@/lib/luma-api"

const itemFadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export default function LumaEvents() {
  const [events, setEvents] = useState<LumaEvent[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadEvents() {
      try {
        const eventData = await fetchLumaEvents()
        setEvents(eventData)
      } catch (error) {
        console.error('Failed to load events:', error)
      } finally {
        setLoading(false)
      }
    }
    loadEvents()
  }, [])

  if (loading) {
    return (
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-gradient-to-r from-cyan-500/10 to-blue-600/10 p-6 rounded-lg border border-cyan-500/20 animate-pulse">
            <div className="h-40 bg-cyan-500/10 rounded"></div>
          </div>
        </div>
        <div className="space-y-4">
          <div className="bg-[#051030]/60 p-4 rounded-lg border border-cyan-500/10 animate-pulse">
            <div className="h-20 bg-cyan-500/10 rounded"></div>
          </div>
          <div className="bg-[#051030]/60 p-4 rounded-lg border border-cyan-500/10 animate-pulse">
            <div className="h-20 bg-cyan-500/10 rounded"></div>
          </div>
        </div>
      </div>
    )
  }

  const featuredEvent = events.find(event => event.featured) || events[0]
  const otherEvents = events.filter(event => event.id !== featuredEvent?.id)

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
                <div className="flex items-center gap-4 text-sm text-cyan-200/70 mb-3">
                  <span>📅 {formatEventDate(featuredEvent.start_at)}</span>
                  <span>📍 {featuredEvent.location?.name || 'Tandil'}</span>
                </div>
                <div className="flex items-center gap-2 mb-4">
                  <span className="px-2 py-1 bg-cyan-500/30 text-cyan-200 text-xs font-medium rounded">
                    {getRelativeDate(featuredEvent.start_at)}
                  </span>
                </div>
                <div className="mt-4">
                  <Link 
                    href={featuredEvent.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-block px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-sm font-medium rounded-lg hover:from-cyan-600 hover:to-blue-700 transition-colors"
                  >
                    Registrarse en Luma
                  </Link>
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
            <p className="text-sm text-cyan-100/70 mb-3 line-clamp-2">{event.description}</p>
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <div className="text-xs text-cyan-200/60">📅 {formatEventDate(event.start_at)}</div>
                <div className="text-xs text-cyan-200/60">📍 {event.location?.name || 'Tandil'}</div>
              </div>
              <Link 
                href={event.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-xs text-cyan-300 hover:text-cyan-200 font-medium"
              >
                Ver en Luma
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}