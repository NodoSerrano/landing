// Luma API integration
// Note: This would require proper API keys and CORS setup in production

export interface LumaEvent {
  id: string
  title: string
  description: string
  start_at: string
  end_at: string
  location?: {
    name: string
    city?: string
  }
  url: string
  cover_image?: string
  featured?: boolean
}

// User ID from the Luma profile: usr-dJssfd2hL0CffxN
// Note: Only displaying events from the "Hosting" section
const LUMA_USER_ID = 'usr-dJssfd2hL0CffxN'

// Mock function - In production, this would call the actual Luma API
export async function fetchLumaEvents(): Promise<LumaEvent[]> {
  try {
    // For now, return mock data until we can set up proper API access
    // In production, you would need:
    // 1. Luma API key
    // 2. Proper CORS configuration
    // 3. Backend proxy to handle API calls
    
    // Only showing events from "Hosting" section of the Luma profile
    const mockEvents: LumaEvent[] = [
      {
        id: "evt-lanzamiento-nodo-serrano",
        title: "Lanzamiento Nodo Serrano",
        description: "Te invitamos al lanzamiento oficial de Nodo Serrano, la nueva comunidad de Ethereum en Tandil. Conoce nuestros objetivos, la hoja de ruta y cómo puedes formar parte de esta iniciativa que conecta la tecnología blockchain con nuestra ciudad.",
        start_at: "2025-08-10T18:00:00Z",
        end_at: "2025-08-10T20:30:00Z",
        location: {
          name: "Centro de Innovación Tandil",
          city: "Tandil"
        },
        url: `https://lu.ma/lb7dtked?tk=DHF0Xm`,
        featured: true
      },
      {
        id: "evt-placeholder-1",
        title: "Próximamente...",
        description: "Estamos preparando más eventos increíbles. Mantente atento a nuestras redes sociales para conocer las próximas fechas.",
        start_at: "2025-09-01T18:00:00Z",
        end_at: "2025-09-01T20:00:00Z",
        location: {
          name: "Por definir",
          city: "Tandil"
        },
        url: `https://lu.ma/user/usr-dJssfd2hL0CffxN`
      },
      {
        id: "evt-placeholder-2",
        title: "Próximamente...",
        description: "Más eventos en camino. Suscríbete a nuestro newsletter para ser el primero en enterarte.",
        start_at: "2025-09-15T18:00:00Z",
        end_at: "2025-09-15T20:00:00Z",
        location: {
          name: "Por definir",
          city: "Tandil"
        },
        url: `https://lu.ma/user/usr-dJssfd2hL0CffxN`
      }
    ]

    return mockEvents
  } catch (error) {
    console.error('Error fetching Luma events:', error)
    return []
  }
}

// Helper function to format dates in Spanish
export function formatEventDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

// Helper function to get relative date (e.g., "En 5 días")
export function getRelativeDate(dateString: string): string {
  const eventDate = new Date(dateString)
  const now = new Date()
  const diffTime = eventDate.getTime() - now.getTime()
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  
  if (diffDays < 0) return 'Pasado'
  if (diffDays === 0) return 'Hoy'
  if (diffDays === 1) return 'Mañana'
  if (diffDays <= 7) return `En ${diffDays} días`
  if (diffDays <= 30) return `En ${Math.ceil(diffDays / 7)} semanas`
  return `En ${Math.ceil(diffDays / 30)} meses`
}

/* 
TODO: For production implementation with real Luma API:

1. Set up API proxy endpoint:
   - Create /api/luma/events route
   - Handle CORS and authentication
   - Use Luma API key securely
   - Filter events to only show "Hosting" events

2. Example API call structure:
   const response = await fetch(`https://api.lu.ma/user/${LUMA_USER_ID}/events?filter=hosting`, {
     headers: {
       'Authorization': `Bearer ${LUMA_API_KEY}`,
       'Content-Type': 'application/json'
     }
   })

3. Update component to use real data:
   - Add loading states
   - Handle empty states when no hosting events
   - Add error boundaries
   - Show placeholders when less than 3 hosting events
*/