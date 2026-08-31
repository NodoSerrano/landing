import type { ReactNode } from "react"

// Per-blob drop shadow for the decorative section containers (blog, events,
// somos, sponsors). Recreates Figma's `_dd` filter (navy #070F22 +18/+18 +
// slate #393B5B -18/-18, blur 18, blend overlay) as two CSS drop-shadows so it
// composites on the GPU instead of an SVG <filter>, which iOS Safari
// CPU-rasterises on every scrolled frame. `overlay` has no drop-shadow
// equivalent, so the alphas are lower than the export. One knob — tune here.
export const DECO_BLOB_SHADOW =
  "drop-shadow(16px 16px 28px rgba(7,15,34,0.26)) drop-shadow(-14px -14px 22px rgba(57,59,91,0.16))"

// One decorative blob = its own <div><svg> layer. The CSS `filter` goes on the
// <div> (Safari ignores `filter` on <svg> children) and, because each blob is
// its own composited layer, its shadow falls on the blobs behind it — the
// depth a single shadow on the whole <svg> can't give. `shadow={false}` for a
// layer that had no Figma shadow (e.g. a bare outline stroke).
export function DecoLayer({
  viewBox,
  shadow = true,
  filter,
  children,
}: {
  viewBox: string
  shadow?: boolean
  /** Override DECO_BLOB_SHADOW for one section (see events.tsx). */
  filter?: string
  children: ReactNode
}) {
  return (
    <div
      className="absolute inset-0"
      style={shadow ? { filter: filter ?? DECO_BLOB_SHADOW } : undefined}
    >
      <svg
        viewBox={viewBox}
        preserveAspectRatio="xMidYMid slice"
        fill="none"
        className="h-full w-full overflow-visible"
      >
        {children}
      </svg>
    </div>
  )
}
