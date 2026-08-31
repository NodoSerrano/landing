// Piezas compartidas entre las vistas mobile (somos.tsx) y desktop
// (somos-desktop.tsx) de la sección Somos.

// Tagline arrow mark (Figma "EthDiamond" → 2 triángulos) — flecha apuntando a la
// derecha, gradiente de marca mint→blue→violet. Paths normalizados del export.
// gradId configurable porque el componente se monta en mobile y desktop a la vez.
export function TaglineMark({ gradId = "somos-arrow-grad" }: { gradId?: string }) {
  return (
    <svg
      width="10"
      height="12"
      viewBox="0 0 9.44 11.08"
      fill="none"
      aria-hidden="true"
      className="shrink-0"
    >
      <path d="M2.906 5.539L0 0H0.439L9.432 5.539Z" fill={`url(#${gradId})`} />
      <path d="M2.906 5.540L0 11.079H0.439L9.432 5.540Z" fill={`url(#${gradId})`} />
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="5.13" y2="7.69" gradientUnits="userSpaceOnUse">
          <stop stopColor="#4FE6C3" />
          <stop offset="0.4666" stopColor="#2E9BFF" />
          <stop offset="0.9325" stopColor="#C87FE5" />
        </linearGradient>
      </defs>
    </svg>
  )
}

// Card title underline (Figma "Vector 121") — trazo fino curvado que sube leve a
// la derecha. Path normalizado del export; se estira al ancho del título.
export function CardUnderline({ gradId = "somos-underline-grad" }: { gradId?: string }) {
  return (
    <svg
      viewBox="0 0 47 6"
      fill="none"
      aria-hidden="true"
      preserveAspectRatio="none"
      className="mt-1 h-[6px] w-full"
    >
      <path
        d="M0 5.002C36.983 5.002 46.088 1.668 46.018 0"
        stroke={`url(#${gradId})`}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="0">
          <stop stopColor="#4FE6C3" />
          <stop offset="0.4666" stopColor="#2E9BFF" />
          <stop offset="0.9325" stopColor="#C87FE5" />
        </linearGradient>
      </defs>
    </svg>
  )
}
