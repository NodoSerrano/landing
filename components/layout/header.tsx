"use client"

import { useState, useEffect, useRef, useLayoutEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"

const NAV_ITEMS: { label: string; href: string }[] = [
  { label: "SOMOS", href: "#about" },
  { label: "Próximos EVENTOS", href: "#events" },
  { label: "BLOG", href: "/blog" },
  { label: "Nos APOYAN", href: "#sponsors" },
  { label: "Contactanos", href: "#signup" },
]

// Desktop nav labels/order match the Figma desktop header spec (node 84:288),
// which differs from the mobile dropdown above (Nodo LABS as its own item, no separate "Contactanos").
const DESKTOP_NAV_ITEMS: { label: string; href: string }[] = [
  { label: "Nodo LABS", href: "#" },
  { label: "SOMOS", href: "#about" },
  { label: "Próximos EVENTOS", href: "#events" },
  { label: "Nuestro BLOG", href: "/blog" },
  { label: "Nos BANCAN", href: "#sponsors" },
]

const MOBILE_MENU_GRADIENT_ID = "mobile-menu-brand-gradient"
// Border weight + corner radius matched to the hamburger icon
// (public/menu-header.svg: stroke-width 3, corner radius ≈6.4).
const MOBILE_MENU_CORNER_RADIUS = 6.4
const MOBILE_MENU_STROKE_WIDTH = 1
// Skew ratios derived from the Figma menu container (node 84:259, box 361×483):
// the right side is taller — the top edge rises toward the right and the bottom
// edge drops toward the right, with the left edge vertical. Expressed as a
// fraction of the width so the ~5° angle holds at any menu size.
const MOBILE_MENU_TOP_SLOPE = 0.087
const MOBILE_MENU_BOTTOM_SLOPE = 0.074
const MOBILE_MENU_RIGHT_LEAN = 0.0097

type Point = { x: number; y: number }

// Point on the segment from `v` toward `toward`, at distance `d` (clamped
// to half the segment so adjacent corners never overlap).
function cornerInset(v: Point, toward: Point, d: number): Point {
  const dx = toward.x - v.x
  const dy = toward.y - v.y
  const len = Math.hypot(dx, dy)
  const t = Math.min(d, len / 2) / len
  return { x: v.x + dx * t, y: v.y + dy * t }
}

// Draws the dropdown outline from its measured pixel size (not a fixed
// viewBox) so the corner rounding stays identical regardless of the
// box's aspect ratio, while the edge angles scale with the box.
function MobileMenuShape() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [size, setSize] = useState({ width: 0, height: 0 })

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
  const r = MOBILE_MENU_CORNER_RADIUS
  const inset = MOBILE_MENU_STROKE_WIDTH / 2
  const left = inset
  const top = inset
  const right = w - inset
  const bottom = h - inset

  let path = ""
  if (w > 0 && h > 0) {
    const topDrop = MOBILE_MENU_TOP_SLOPE * (right - left)
    const bottomRise = MOBILE_MENU_BOTTOM_SLOPE * (right - left)
    const rightLean = MOBILE_MENU_RIGHT_LEAN * (bottom - top)
    // Clockwise from top-left; quadratic curves round each corner.
    const verts: Point[] = [
      { x: left, y: top + topDrop },
      { x: right, y: top },
      { x: right - rightLean, y: bottom },
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
    <div ref={containerRef} className="pointer-events-none absolute inset-0 h-full w-full">
      {path && (
        <svg style={{ width: w, height: h }} fill="none" aria-hidden="true">
          <path
            d={path}
            fill="var(--color-bg-elev-dark)"
            stroke={`url(#${MOBILE_MENU_GRADIENT_ID})`}
            strokeWidth={MOBILE_MENU_STROKE_WIDTH}
          />
          <defs>
            <linearGradient
              id={MOBILE_MENU_GRADIENT_ID}
              x1={w}
              y1={h}
              x2="0"
              y2="0"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="var(--color-brand-mint)" />
              <stop offset="0.466597" stopColor="var(--color-brand-blue)" />
              <stop offset="0.932457" stopColor="var(--color-brand-violet)" />
            </linearGradient>
          </defs>
        </svg>
      )}
    </div>
  )
}

// Hamburger icon (from public/menu-header.svg) with the inner three lines
// inlined so they can morph into an X. Border + gradients + sizes unchanged;
// only the lines animate on `open`.
function MenuToggleIcon({ open }: { open: boolean }) {
  const lineProps = {
    stroke: "url(#menu-toggle-lines)",
    strokeWidth: 3,
    strokeLinecap: "round" as const,
  }
  const transition = { duration: 0.2 }
  // X centered at (25, 23) with equal-length arms (matching the lines' length).
  return (
    <svg width="49" height="45" viewBox="0 0 50 46" fill="none" aria-hidden="true">
      <path
        d="M9.1379 43.4983C5.2522 43.9243 1.872 40.8487 1.93008 36.9402L2.35171 8.62887C2.40476 5.07739 5.29897 2.22586 8.85085 2.2257L41.76 2.22569C45.3498 2.22569 48.2608 5.13605 48.2609 8.72585L48.2609 33.3821C48.2609 36.6978 45.7647 39.4819 42.4687 39.8432L9.1379 43.4983Z"
        fill={open ? "var(--color-bg-elev-dark)" : "none"}
        stroke="url(#menu-toggle-border)"
        strokeWidth={2}
      />
      <motion.line
        {...lineProps}
        initial={false}
        animate={
          open
            ? { x1: 16.5, y1: 14.5, x2: 33.5, y2: 31.5 }
            : { x1: 13, y1: 15.25, x2: 37, y2: 15.25 }
        }
        transition={transition}
      />
      <motion.line
        {...lineProps}
        initial={false}
        animate={{ x1: 13, y1: 23, x2: 37, y2: 23, opacity: open ? 0 : 1 }}
        transition={transition}
      />
      <motion.line
        {...lineProps}
        initial={false}
        animate={
          open
            ? { x1: 16.5, y1: 31.5, x2: 33.5, y2: 14.5 }
            : { x1: 13, y1: 30.75, x2: 37, y2: 30.75 }
        }
        transition={transition}
      />
      <defs>
        <linearGradient
          id="menu-toggle-lines"
          x1="13"
          y1="15.25"
          x2="27.8203"
          y2="35.4685"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="var(--color-brand-mint)" />
          <stop offset="0.466597" stopColor="var(--color-brand-blue)" />
          <stop offset="0.932457" stopColor="var(--color-brand-violet)" />
        </linearGradient>
        <linearGradient
          id="menu-toggle-border"
          x1="49.7578"
          y1="46"
          x2="4.41787"
          y2="2.31495"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="var(--color-brand-mint)" />
          <stop offset="0.466597" stopColor="var(--color-brand-blue)" />
          <stop offset="0.932457" stopColor="var(--color-brand-violet)" />
        </linearGradient>
      </defs>
    </svg>
  )
}

export default function Header({ alwaysSolid = false }: { alwaysSolid?: boolean } = {}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const toolbarRef = useRef<HTMLDivElement>(null)
  const [toolbarHeight, setToolbarHeight] = useState(0)
  const isSolid = alwaysSolid || scrolled
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useLayoutEffect(() => {
    const el = toolbarRef.current
    if (!el) return
    const observer = new ResizeObserver(([entry]) => {
      setToolbarHeight(entry.contentRect.height)
    })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [mobileMenuOpen])

  const scrollToSection = (sectionId: string) => {
    const id = sectionId.replace("#", "")
    setMobileMenuOpen(false)
    if (!id) return
    if (pathname !== "/") {
      router.push(`/#${id}`)
      return
    }
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <motion.header
      className="fixed top-0 inset-x-0 z-50 w-full"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Permanent horizontal gutter so the bar never touches the viewport edge —
          kept separate from the toolbar's own mx-auto/max-w-6xl (which only
          centers/caps it once there's enough room), and separate from the
          mobile overlay below (which needs the true full-bleed viewport). */}
      <div className="px-4">
        <div
          ref={toolbarRef}
          className={`relative z-20 mx-auto my-2 flex items-center justify-between gap-4 rounded-2xl border border-transparent ${isSolid ? "px-3" : "px-0"}  py-3 transition-all duration-300 md:px-4 lg:max-w-6xl ${isSolid && !mobileMenuOpen ? "backdrop-blur-xl" : ""
            }`}
          style={
            isSolid && !mobileMenuOpen
              ? {
                background:
                  "linear-gradient(var(--color-bg-elev-dark), var(--color-bg-elev-dark)) padding-box, " +
                  "linear-gradient(90deg, rgba(79,230,195,0.4) 0%, rgba(46,155,255,0.4) 50%, rgba(200,127,229,0.4) 100%) border-box",
              }
              : undefined
          }
        >
          {/* Logo / Brand */}
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/downloads/logo-serrano.svg"
              alt="Nodo Serrano"
              width={97}
              height={45}
              className="h-[45px] w-auto"
            />
          </Link>

          {/* Desktop Nav + CTA */}
          <div className="hidden lg:flex items-center gap-8 xl:gap-[92px]">
            <nav className="flex items-center gap-6 xl:gap-12">
              {DESKTOP_NAV_ITEMS.map(({ label, href }) =>
                href.startsWith("/blog") ? (
                  <Link
                    key={label}
                    href={href}
                    className="text-body font-bold text-(--color-text-primary-dark) hover:opacity-70 transition-opacity"
                  >
                    {label}
                  </Link>
                ) : (
                  <button
                    key={label}
                    onClick={() => scrollToSection(href)}
                    className="text-body font-bold text-(--color-text-primary-dark) hover:opacity-70 transition-opacity cursor-pointer"
                  >
                    {label}
                  </button>
                )
              )}
            </nav>

            <button
              onClick={() => scrollToSection("#signup")}
              className="rounded-tl-[10px] rounded-br-[10px] bg-gradient-brand px-6 py-3 text-body text-(--color-text-primary-dark) hover:opacity-90 transition-opacity cursor-pointer"
            >
              SUSCRIBITE
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden cursor-pointer"
            aria-label={mobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
          >
            <MenuToggleIcon open={mobileMenuOpen} />
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            key="mobile-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
            className="lg:hidden absolute inset-0 z-0 bg-gradient-to-t from-black/85 via-black/55 to-black/15 backdrop-blur-sm"
          />
        )}
        {mobileMenuOpen && (
          <motion.div
            key="mobile-panel"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            onClick={() => setMobileMenuOpen(false)}
            className={`${isSolid ? "mx-3" : "mx-0"} lg:hidden relative z-10 cursor-pointer px-4 pt-2 pb-4`}
            style={{ height: `calc(100dvh - ${toolbarHeight}px)` }}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative cursor-default px-6 py-24"
            >
              <MobileMenuShape />
              <motion.nav
                className="relative flex flex-col items-center gap-4"
                initial="closed"
                animate="open"
                variants={{
                  open: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
                  closed: {},
                }}
              >
                <motion.div
                  className="w-full"
                  variants={{ open: { opacity: 1, y: 0 }, closed: { opacity: 0, y: -10 } }}
                >
                  <Link
                    href="#"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block w-full cursor-pointer rounded-[8px] bg-gradient-brand p-[1.5px]"
                  >
                    <span className="block rounded-[7px] bg-(--color-bg-elev-dark) px-4 py-1.5 text-center text-[18px] font-bold">
                      <span className="bg-gradient-brand bg-clip-text text-transparent">
                        Nodo LABS
                      </span>
                    </span>
                  </Link>
                </motion.div>
                {NAV_ITEMS.map(({ label, href }) =>
                  href.startsWith("/blog") ? (
                    <motion.div
                      key={label}
                      variants={{ open: { opacity: 1, y: 0 }, closed: { opacity: 0, y: -10 } }}
                    >
                      <Link
                        href={href}
                        className="font-display text-[18px] leading-[33.3px] font-normal text-(--color-text-primary-dark) hover:opacity-70 text-center cursor-pointer"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {label}
                      </Link>
                    </motion.div>
                  ) : (
                    <motion.div
                      key={label}
                      variants={{ open: { opacity: 1, y: 0 }, closed: { opacity: 0, y: -10 } }}
                    >
                      <button
                        onClick={() => scrollToSection(href)}
                        className="font-display text-[18px] leading-[33.3px] font-normal text-(--color-text-primary-dark) hover:opacity-70 text-center cursor-pointer"
                      >
                        {label}
                      </button>
                    </motion.div>
                  )
                )}
              </motion.nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
