import type { CSSProperties } from "react"
import NodoLogoTop from "./svgs/nodo-logo-top"
import NodoLogoBottom from "./svgs/nodo-logo-bottom"

export default function FloatingLogo({ width = 120, top = 40 }: { width?: number; top?: number }) {
  // Power scaling: larger logos move more, smaller logos move less
  // Reference: width 30px ≈ 1px, width 120px = 2px movement
  const yMovement = 3 * Math.pow(width / 120, 0.7)

  // Non-linear scaling for spacing: smaller widths have proportionally less spacing
  // Reference: width 120 = spacing 50
  const calculatedSpacing = 53 * Math.pow(width / 120, 1.05)

  // The two halves drift in opposite directions forever — was two framer
  // motion.div with animate={{ y: [...] }} repeat: Infinity. Now a pair of CSS
  // keyframes (floating-logo-up / -down in globals.css) driven by --float-y.
  const floatVar = { "--float-y": `${yMovement}px` } as CSSProperties

  return (
    <div
      style={{ width: `${width}px`, top: `${top}%` }}
      className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center"
    >
      <div className="floating-logo-top z-10" style={floatVar}>
        <NodoLogoTop style={{ width: `${width}px` }} className="h-full" />
      </div>
      <div className="floating-logo-bottom" style={floatVar}>
        <NodoLogoBottom
          style={{ width: `${width}px`, transform: `translateY(-${calculatedSpacing}px)` }}
          className="h-full"
        />
      </div>
    </div>
  )
}
