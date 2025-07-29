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
const LUMA_USER_ID = 'usr-dJssfd2hL0CffxN'

// Mock function - In production, this would call the actual Luma API
export async function fetchLumaEvents(): Promise<LumaEvent[]> {
  try {
    // For now, return mock data until we can set up proper API access
    // In production, you would need:
    // 1. Luma API key
    // 2. Proper CORS configuration
    // 3. Backend proxy to handle API calls
    
    const mockEvents: LumaEvent[] = [
      {
        id: "evt-mock-1",
        title: "Introducción a Ethereum",
        description: "Workshop introductorio sobre la tecnología blockchain de Ethereum, smart contracts y DeFi. Aprenderemos los conceptos fundamentales y haremos ejercicios prácticos.",
        start_at: "2025-08-15T18:00:00Z",
        end_at: "2025-08-15T20:00:00Z",
        location: {
          name: "Centro de Innovación Tandil",
          city: "Tandil"
        },
        url: `https://lu.ma/evt-mock-1`,
        featured: true
      },
      {
        id: "evt-mock-2",
        title: "Workshop DeFi Avanzado",
        description: "Profundizaremos en protocolos DeFi, yield farming, y estrategias de inversión descentralizada.",
        start_at: "2025-08-22T19:00:00Z",
        end_at: "2025-08-22T21:00:00Z",
        location: {
          name: "Universidad Nacional del Centro",
          city: "Tandil"
        },
        url: `https://lu.ma/evt-mock-2`
      },
      {
        id: "evt-mock-3",
        title: "Meetup Blockchain Tandil",
        description: "Networking y charlas técnicas sobre el ecosistema blockchain. Presentaciones de proyectos locales y oportunidades laborales.",
        start_at: "2025-08-29T18:30:00Z",
        end_at: "2025-08-29T21:00:00Z",
        location: {
          name: "Coworking Tandil",
          city: "Tandil"
        },
        url: `https://lu.ma/evt-mock-3`
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

2. Example API call structure:
   const response = await fetch(`https://api.lu.ma/user/${LUMA_USER_ID}/events`, {
     headers: {
       'Authorization': `Bearer ${LUMA_API_KEY}`,
       'Content-Type': 'application/json'
     }
   })

3. Update component to use real data:
   - Add loading states
   - Handle empty states
   - Add error boundaries
*/