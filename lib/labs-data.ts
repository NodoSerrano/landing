// Contenido de la página Nodo LABS (/labs). Traducido del doc de contenido
// ("Software & Security Engineering — B2B services by Nodo Serrano").

export interface CapabilityGroup {
  title: string
  items: string[]
}

export interface Step {
  title: string
  description: string
}

export interface ValueItem {
  title: string
  description: string
}

export interface Fact {
  label: string
  value: string
}

// "About Us" — dos párrafos.
export const aboutParagraphs: string[] = [
  "Nodo Labs es un laboratorio de ingeniería de software y seguridad enfocado en sistemas resilientes, investigación aplicada, estrategia técnica e implementación práctica. Trabajamos con equipos que necesitan evaluación técnica precisa, prácticas de ingeniería segura y soporte pragmático en la entrega.",
  "Nodo Labs es la división de servicios profesionales de Nodo Serrano, un hackerspace y comunidad de investigación dedicada al ecosistema Ethereum, con base en Tandil, Argentina. Nuestra práctica combina la profundidad de una comunidad de investigación aplicada con la disciplina de una firma de ingeniería profesional, aportando un stack riguroso, ético y de tecnología de frontera a cada proyecto.",
]

// Frase de apoyo del hero (primera oración del "About", acortada).
export const heroIntro =
  "Un laboratorio de ingeniería de software y seguridad enfocado en sistemas resilientes, investigación aplicada, estrategia técnica e implementación práctica."

// "Fast Facts" — panel lateral.
export const fastFacts: Fact[] = [
  {
    label: "Ubicación",
    value: "Tandil, Buenos Aires, Argentina",
  },
  {
    label: "Origen",
    value:
      "La división de ingeniería profesional de Nodo Serrano, un hackerspace y comunidad de investigación aplicada.",
  },
  {
    label: "Universidad",
    value: "Vinculados a la UNICEN, dictando cursos de blockchain.",
  },
  {
    label: "Formación de carrera",
    value:
      "Construido sobre la mentoría y el crecimiento profesional de developers.",
  },
  {
    label: "Frontera",
    value: "Soluciones AI-native para investigación y aplicaciones.",
  },
]

// "Our Capabilities" — 8 ítems del doc, agrupados en 4 clusters temáticos.
export const capabilityGroups: CapabilityGroup[] = [
  {
    title: "Arquitectura y revisión",
    items: [
      "Revisión de arquitectura de software y diseño de sistemas",
      "Revisión de backend, APIs, infraestructura, CI/CD y despliegues",
    ],
  },
  {
    title: "Seguridad",
    items: [
      "Revisión de código segura y asesoría de ingeniería",
      "Revisión de smart contracts e ingeniería adyacente a blockchain",
      "Modelado de amenazas, priorización de riesgos y planes de remediación",
    ],
  },
  {
    title: "Implementación",
    items: [
      "Desarrollo hands-on, refactorización, testing y documentación",
    ],
  },
  {
    title: "Producto y experiencia",
    items: [
      "Diseño de interfaces: web, mobile y desktop",
      "Investigación e implementación de experiencia de usuario",
    ],
  },
]

// "How We Work" — narrativa + flujo Evaluación → Roadmap → Entrega.
export const processIntro =
  "Cada proyecto comienza con una evaluación técnica focalizada. Priorizamos riesgos y oportunidades en un roadmap accionable, y luego acompañamos la ejecución mediante asesoría, revisión o entrega hands-on embebida. Siempre con documentación clara y resultados medibles."

export const processSteps: Step[] = [
  {
    title: "Evaluación",
    description:
      "Un diagnóstico técnico focalizado del sistema, el código y los riesgos.",
  },
  {
    title: "Roadmap",
    description:
      "Riesgos y oportunidades priorizados en un plan accionable.",
  },
  {
    title: "Entrega",
    description:
      "Ejecución vía asesoría, revisión o desarrollo embebido, con resultados medibles.",
  },
]

// "Our Values" — 4 valores.
export const values: ValueItem[] = [
  {
    title: "Comunidad",
    description:
      "Construimos con y para nuestra comunidad, conectando el talento local con redes globales.",
  },
  {
    title: "Educación",
    description:
      "La investigación y la formación continua mantienen nuestra práctica rigurosa y actualizada.",
  },
  {
    title: "Apertura",
    description:
      "Favorecemos las tecnologías abiertas, los procesos transparentes y el conocimiento compartido.",
  },
  {
    title: "Potenciar personas",
    description:
      "Contribuimos al crecimiento personal y técnico de quienes integran el equipo.",
  },
]

// Contacto — CTA final.
export const CONTACT_EMAIL = "hey@nodoserrano.org"
