"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { useEffect, useState } from "react"
import { fetchLumaEvents, formatEventDate, getRelativeDate, type LumaEvent } from "@/lib/luma-api"

const itemFadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export default function LumaEvents() {
  const [events, setEvents] = useState<LumaEvent[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadEvents() {
      try {
        console.log('Starting to fetch Luma events...')
        const eventData = await fetchLumaEvents()
        console.log('Fetched events:', eventData)
        console.log('Number of events:', eventData?.length || 0)
        
        if (eventData && Array.isArray(eventData)) {
          setEvents(eventData)
          console.log('Events set successfully:', eventData.length, 'events')
        } else {
          console.warn('Event data is not an array:', eventData)
          setEvents([])
        }
      } catch (error) {
        console.error('Failed to load events:', error)
        setError(error instanceof Error ? error.message : 'Unknown error occurred')
      } finally {
        setLoading(false)
      }
    }
    loadEvents()
  }, []) // Remove events from dependency array - it causes infinite loop

  // Debug render to show current state
  console.log('Current render state:', { loading, events: events.length, error })

  if (loading) {
    return (
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-slate-800/60 p-6 rounded-lg border border-violet-400/30 animate-pulse">
            <div className="h-40 bg-slate-700/60 rounded"></div>
            <div className="mt-4 text-center text-slate-400">
              Cargando eventos de Luma...
            </div>
          </div>
        </div>
        <div className="space-y-4">
          <div className="bg-slate-800/60 p-4 rounded-lg border border-violet-400/30 animate-pulse">
            <div className="h-20 bg-slate-700/60 rounded"></div>
          </div>
          <div className="bg-slate-800/60 p-4 rounded-lg border border-violet-400/30 animate-pulse">
            <div className="h-20 bg-slate-700/60 rounded"></div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-3">
          <div className="bg-red-900/20 border border-red-500/30 p-6 rounded-lg">
            <h3 className="text-red-400 font-semibold mb-2">Error loading events</h3>
            <p className="text-red-300 text-sm">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-4 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (!events || events.length === 0) {
    return (
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-3">
          <div className="bg-slate-800/60 p-6 rounded-lg border border-violet-400/30 text-center">
            <p className="text-slate-400">No hay eventos disponibles en este momento.</p>
            <p className="text-slate-500 text-sm mt-2">
              Verifica la configuración de la API de Luma o intenta más tarde.
            </p>
          </div>
        </div>
      </div>
    )
  }

  const featuredEvent = events.find(event => event.featured) || events[0]
  const otherEvents = events.filter(event => event.id !== featuredEvent?.id)

  return (
    <div className="grid lg:grid-cols-3 gap-8">
      {/* Debug info - remove in production */}
      {process.env.NODE_ENV === 'development' && (
        <div className="lg:col-span-3 mb-4">
          <div className="bg-blue-900/20 border border-blue-500/30 p-4 rounded-lg">
            <p className="text-blue-300 text-sm">
              Debug: Loaded {events.length} events | Featured: {featuredEvent?.title || 'None'}
            </p>
          </div>
        </div>
      )}

      {/* Featured Event - Left Highlight */}
      {featuredEvent && (
        <div className="lg:col-span-2">
          <motion.div 
            className="bg-slate-800/70 backdrop-blur-sm p-6 rounded-lg border border-violet-400/30 hover:border-violet-400/50 transition-colors shadow-sm flex flex-col justify-center items-center"
            variants={itemFadeIn}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
          >
            <div className="flex flex-col lg:flex-row gap-4">
              {featuredEvent.cover_image && (
                <div className="w-full lg:w-48 h-48 flex-shrink-0 rounded-lg overflow-hidden">
                  <Image
                    src={featuredEvent.cover_image}
                    alt={featuredEvent.title}
                    width={200}
                    height={200}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="flex-1">
                <span className="inline-block px-3 py-1 bg-cyan-500/30 text-cyan-300 text-sm font-medium rounded-full mb-3">
                  {featuredEvent.id === 'evt-lanzamiento-nodo-serrano' ? 'Evento Principal' : 'Próximo Evento'}
                </span>
                <h3 className="text-xl font-bold text-off-white mb-2">{featuredEvent.title}</h3>
                <p className="text-off-white mb-4">
                  {featuredEvent.description}
                </p>
                <div className="flex items-center gap-4 text-sm text-off-white mb-3">
                  <span>📅 {formatEventDate(featuredEvent.start_at)}</span>
                  <span>📍 {featuredEvent.location?.name || 'Tandil'}</span>
                </div>
                <div className="flex items-center gap-2 mb-4">
                  <span className="px-2 py-1 bg-cyan-500/40 text-cyan-300 text-xs font-medium rounded">
                    {getRelativeDate(featuredEvent.start_at)}
                  </span>
                </div>
                <div className="mt-4">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="inline-block">
                    <Link 
                      href={featuredEvent.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-block px-4 py-3 bg-gradient-to-r from-violet-500 to-blue-500 text-off-white text-base font-bold rounded-lg hover:from-violet-600 hover:to-blue-600 transition-colors"
                    >
                      Registrarse en Luma
                    </Link>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
      
      {/* Side Events */}
      <div className="space-y-4">
        {otherEvents.map((event) => {
          const isPlaceholder = event.id.startsWith('evt-placeholder')
          
          return (
            <motion.div 
              key={event.id}
              className={`bg-slate-800/60 backdrop-blur-sm p-4 rounded-lg border transition-colors shadow-sm ${
                isPlaceholder 
                  ? 'border-slate-600/30 opacity-60' 
                  : 'border-violet-400/30 hover:border-violet-400/50'
              }`}
              variants={itemFadeIn}
              whileHover={!isPlaceholder ? { y: -2, transition: { duration: 0.2 } } : {}}
            >
              <h4 className={`font-semibold mb-2 ${
                isPlaceholder ? 'text-slate-300' : 'text-off-white'
              }`}>{event.title}</h4>
              <p className={`text-sm mb-3 line-clamp-2 ${
                isPlaceholder ? 'text-slate-400' : 'text-off-white'
              }`}>{event.description}</p>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <div className={`text-xs ${
                    isPlaceholder ? 'text-slate-400' : 'text-off-white'
                  }`}>📅 {isPlaceholder ? 'Fecha por confirmar' : formatEventDate(event.start_at)}</div>
                  <div className={`text-xs ${
                    isPlaceholder ? 'text-slate-400' : 'text-off-white'
                  }`}>📍 {event.location?.name || 'Tandil'}</div>
                </div>
                {!isPlaceholder && (
                  <Link 
                    href={event.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-xs text-violet-400 hover:text-violet-300 font-medium"
                  >
                    Ver en Luma
                  </Link>
                )}
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
