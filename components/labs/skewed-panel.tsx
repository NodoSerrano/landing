"use client"

import {
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from "react"
import { cn } from "@/lib/utils"

// Contenedor con silueta de trapecio inclinado (el lado derecho es más alto: el
// borde superior baja hacia la derecha y el inferior sube), el mismo motivo de
// marca que la card "Nodo LABS" del home (community.tsx) y el menú mobile del
// header. El path se dibuja desde el tamaño medido en px — no un viewBox fijo —
// así el redondeo de esquinas queda igual a cualquier relación de aspecto y los
// ángulos escalan con la caja.

type Point = { x: number; y: number }

// Punto sobre el segmento de `v` hacia `toward`, a distancia `d` (clampeado a la
// mitad del segmento para que dos esquinas contiguas nunca se superpongan).
function cornerInset(v: Point, toward: Point, d: number): Point {
  const dx = toward.x - v.x
  const dy = toward.y - v.y
  const len = Math.hypot(dx, dy)
  const t = Math.min(d, len / 2) / len
  return { x: v.x + dx * t, y: v.y + dy * t }
}

export function SkewedPanel({
  children,
  className,
  contentClassName,
  fill = "var(--color-bg-elev-dark)",
  strokeWidth = 2,
  cornerRadius = 8,
  topSlope = 0.035,
  bottomSlope = 0.028,
  rightLean = 0.02,
  maxTopDrop = 16,
  maxBottomRise = 12,
  maxRightLean = 8,
  shadow,
  gradient = "brand",
}: {
  children: ReactNode
  className?: string
  contentClassName?: string
  fill?: string
  strokeWidth?: number
  cornerRadius?: number
  topSlope?: number
  bottomSlope?: number
  rightLean?: number
  maxTopDrop?: number
  maxBottomRise?: number
  maxRightLean?: number
  // CSS `filter` (p.ej. drop-shadow(...)) aplicado al <svg> de la silueta, para
  // que la sombra siga el trapecio y no un rectángulo.
  shadow?: string
  // Gradiente del borde: "brand" (frío) o "warm".
  gradient?: "brand" | "warm"
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [size, setSize] = useState({ width: 0, height: 0 })
  const gradientId = `labs-skew-${useId().replace(/[^a-zA-Z0-9]/g, "")}`

  useLayoutEffect(() => {
    const el = containerRef.current
    if (!el) return
    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect
      setSize({ width, height })
    })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const { width: w, height: h } = size
  const r = cornerRadius
  const inset = strokeWidth / 2
  const left = inset
  const top = inset
  const right = w - inset
  const bottom = h - inset

  let path = ""
  if (w > 0 && h > 0) {
    const topDrop = Math.min(topSlope * (right - left), maxTopDrop)
    const bottomRise = Math.min(bottomSlope * (right - left), maxBottomRise)
    const lean = Math.min(rightLean * (bottom - top), maxRightLean)
    const verts: Point[] = [
      { x: left, y: top + topDrop },
      { x: right, y: top },
      { x: right - lean, y: bottom },
      { x: left, y: bottom - bottomRise },
    ]
    path =
      verts
        .map((v, i) => {
          const prev = verts[(i + verts.length - 1) % verts.length]
          const next = verts[(i + 1) % verts.length]
          const entry = cornerInset(v, prev, r)
          const exit = cornerInset(v, next, r)
          return `${i === 0 ? "M" : "L"}${entry.x},${entry.y} Q${v.x},${v.y} ${exit.x},${exit.y}`
        })
        .join(" ") + " Z"
  }

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      {path && (
        <svg
          style={{ width: w, height: h, filter: shadow }}
          className="pointer-events-none absolute inset-0"
          fill="none"
          aria-hidden="true"
        >
          <path
            d={path}
            fill={fill}
            stroke={strokeWidth > 0 ? `url(#${gradientId})` : undefined}
            strokeWidth={strokeWidth}
          />
          {strokeWidth > 0 && (
            <defs>
              <linearGradient
                id={gradientId}
                x1={w}
                y1={h}
                x2="0"
                y2="0"
                gradientUnits="userSpaceOnUse"
              >
                {gradient === "warm" ? (
                  <>
                    <stop stopColor="var(--color-warm-yellow)" />
                    <stop offset="0.5" stopColor="var(--color-warm-red)" />
                    <stop offset="1" stopColor="var(--color-warm-violet)" />
                  </>
                ) : (
                  <>
                    <stop stopColor="var(--color-brand-mint)" />
                    <stop offset="0.466597" stopColor="var(--color-brand-blue)" />
                    <stop offset="0.932457" stopColor="var(--color-brand-violet)" />
                  </>
                )}
              </linearGradient>
            </defs>
          )}
        </svg>
      )}
      <div className={cn("relative", contentClassName)}>{children}</div>
    </div>
  )
}
