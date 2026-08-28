import { cn } from "@/lib/utils"

// Divisor orgánico crema entre secciones — mismo lenguaje que los contenedores
// SVG de la home (community.tsx BlobBackground, sponsors.tsx CurvedContainer,
// events.tsx): siluetas irregulares, asimétricas, con lóbulos profundos junto a
// tramos casi planos y algún pellizco. No hay onda repetida.
//
// SOMBRA: se dibuja SÓLO la línea de la cresta como un <path> ABIERTO (sin los
// bordes rectos del relleno), difuminada, y el relleno crema va encima tapando
// la mitad que cae del lado claro. Queda una sombra pegada exactamente a la
// curva del lado oscuro — no un halo rectangular. La sombra sigue el contorno
// porque ES el contorno (criterio de los blobs del home).
//
// Filtro con región en objectBoundingBox (%) → Safari no lo dropea, a
// diferencia de userSpaceOnUse sobre un canvas grande (ver
// components/sections/blob-shadow-filter.tsx).
//
// Cada CREST recorre la banda y≈14–112 sobre un viewBox de 120 de alto con un
// perfil distinto (lóbulo hondo, pellizco alto, meseta, rolido, S larga…). Los
// extremos van a x=-48 / x=1488 para que las puntas del trazo queden fuera del
// viewBox. `flipX` espeja el trazado y duplica la variedad.

const CRESTS = [
  // S larga y suave
  "M-48 34 L0 34 C 300 34 470 96 760 100 C 1050 104 1210 44 1440 38 L1488 38",
  // pellizco al centro (la sección oscura muerde hondo en el medio)
  "M-48 74 L0 74 C 280 68 400 18 720 16 C 1040 14 1170 62 1440 70 L1488 70",
  // doble lóbulo asimétrico: chico y alto a la izquierda, grande y hondo a la derecha
  "M-48 46 L0 46 C 150 30 250 32 380 46 C 540 62 640 108 900 110 C 1150 112 1300 54 1440 40 L1488 40",
  // caída dramática hacia un lóbulo hondo a la derecha
  "M-48 38 L0 38 C 340 34 580 40 840 54 C 1050 66 1170 110 1310 112 C 1390 113 1430 96 1440 90 L1488 90",
  // rolido triple, espaciado y amplitud irregulares
  "M-48 58 L0 58 C 110 28 210 26 350 52 C 520 84 620 92 800 68 C 980 44 1120 22 1290 42 C 1370 52 1414 60 1440 62 L1488 62",
  // meseta ancha alta con hombros empinados
  "M-48 96 L0 96 C 110 96 190 30 430 26 C 720 21 800 27 1030 31 C 1260 35 1330 92 1440 98 L1488 98",
  // lóbulo que se hunde fuerte a la izquierda y después cola alta y calma
  "M-48 30 L0 30 C 170 30 290 100 520 104 C 760 108 940 56 1180 46 C 1320 40 1410 42 1440 44 L1488 44",
  // rolido largo y bajo, contrapunto tranquilo
  "M-48 62 L0 62 C 260 48 440 50 660 60 C 920 72 1140 72 1440 52 L1488 52",
]

export function OrganicEdge({
  side,
  variant = 0,
  flipX = false,
  shadow = true,
  className,
}: {
  side: "top" | "bottom"
  variant?: number
  flipX?: boolean
  shadow?: boolean
  className?: string
}) {
  const crest = CRESTS[((variant % CRESTS.length) + CRESTS.length) % CRESTS.length]
  const fill = `${crest} L1488 120 L-48 120 Z`
  const transform =
    [side === "top" ? "scaleY(-1)" : "", flipX ? "scaleX(-1)" : ""]
      .join(" ")
      .trim() || undefined
  const blurId = `labs-organic-edge-blur-${side}-${variant}${flipX ? "-x" : ""}`

  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-x-0 z-10 h-[64px] w-full md:h-[120px]",
        side === "top" ? "-top-px" : "-bottom-px",
        className
      )}
    >
      <svg
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        fill="none"
        className="h-full w-full overflow-visible"
        style={{ transform }}
      >
        {shadow && (
          <>
            <defs>
              <filter
                id={blurId}
                x="-1%"
                y="-60%"
                width="102%"
                height="220%"
                colorInterpolationFilters="sRGB"
              >
                {/* stdDeviation Y > X compensa la compresión vertical de
                    preserveAspectRatio="none" en viewports angostos */}
                <feGaussianBlur stdDeviation="4 5" />
              </filter>
            </defs>
            <path
              d={crest}
              fill="none"
              stroke="#070F22"
              strokeOpacity="0.5"
              strokeWidth="6"
              strokeLinecap="round"
              filter={`url(#${blurId})`}
            />
          </>
        )}
        <path d={fill} fill="var(--color-bg-light)" />
      </svg>
    </div>
  )
}
