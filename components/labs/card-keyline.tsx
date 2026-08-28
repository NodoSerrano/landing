// Keyline de gradiente que envuelve la esquina superior derecha de una card.
// Cada tramo arranca transparente en su primer ~1/4 y recién ahí funde al
// gradiente, que se mantiene sólido el 3/4 restante:
//   · borde superior  → funde de izquierda a derecha
//   · borde derecho   → funde de abajo hacia arriba
// El corte se hace con `mask-image` (un linear-gradient de alpha), así el color
// del gradiente no cambia. `gradient`: "brand" (frío, cards oscuras) o "warm"
// (cards sobre fondo claro). El contenedor debe ser `relative` + `overflow-hidden`.

const FADE_TOP =
  "linear-gradient(to right, transparent 0%, transparent 25%, #000 50%, #000 100%)"
const FADE_RIGHT =
  "linear-gradient(to top, transparent 0%, transparent 25%, #000 50%, #000 100%)"

const RIGHT_BG = {
  brand:
    "linear-gradient(to top, var(--color-brand-mint) 0%, var(--color-brand-blue) 46.66%, var(--color-brand-violet) 93.25%)",
  warm: "linear-gradient(to top, var(--color-warm-yellow) 0%, var(--color-warm-red) 50%, var(--color-warm-violet) 100%)",
}

export function CardKeyline({
  gradient = "brand",
}: {
  gradient?: "brand" | "warm"
}) {
  return (
    <>
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute inset-x-0 top-0 h-[2px] ${
          gradient === "warm" ? "bg-gradient-warm" : "bg-gradient-brand"
        }`}
        style={{ maskImage: FADE_TOP, WebkitMaskImage: FADE_TOP }}
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 w-[2px]"
        style={{
          backgroundImage: RIGHT_BG[gradient],
          maskImage: FADE_RIGHT,
          WebkitMaskImage: FADE_RIGHT,
        }}
      />
    </>
  )
}
