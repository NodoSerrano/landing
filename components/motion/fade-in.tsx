"use client"

import { useEffect, useRef, useState, type CSSProperties, type ElementType, type ReactNode } from "react"

type RevealProps = {
  children?: ReactNode
  className?: string
  /** Element to render. Defaults to a <div>. */
  as?: ElementType
  /** Stagger offset in ms — applied as transition-delay. */
  delay?: number
  /** "fade-up" (default) matches the old framer variant; "scale-x" draws a bar in from the left. */
  variant?: "fade-up" | "scale-x"
  /** Merged onto the element; the reveal delay is applied on top. */
  style?: CSSProperties
}

// Scroll reveal, framer-motion-free. One IntersectionObserver per instance,
// disconnected after it fires once (the old `viewport={{ once: true }}`).
// The transition itself is CSS — see [data-reveal] in app/globals.css.
export function Reveal({
  children,
  className,
  as: Tag = "div",
  delay = 0,
  variant = "fade-up",
  style,
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    if (shown) return
    const el = ref.current
    if (!el) return
    if (typeof IntersectionObserver === "undefined") {
      setShown(true)
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShown(true)
          io.disconnect()
        }
      },
      { rootMargin: "0px 0px -10% 0px" },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [shown])

  return (
    <Tag
      ref={ref}
      className={className}
      data-reveal={shown ? "in" : "out"}
      data-reveal-variant={variant === "scale-x" ? "scale-x" : undefined}
      style={delay ? ({ ...style, "--reveal-delay": `${delay}ms` } as CSSProperties) : style}
    >
      {children}
    </Tag>
  )
}

// Back-compat: existing call sites (blog pages, labs sections) import { FadeIn }.
export const FadeIn = Reveal
