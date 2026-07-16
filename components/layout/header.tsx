"use client"

import { useState, useEffect, useRef, useLayoutEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"

const NAV_ITEMS: { label: string; href: string }[] = [
  { label: "SOMOS", href: "#about" },
  { label: "Próximos EVENTOS", href: "#events" },
  { label: "BLOG", href: "/blog" },
  { label: "Nos APOYAN", href: "#sponsors" },
  { label: "Contactanos", href: "#signup" },
]

const MOBILE_MENU_GRADIENT_ID = "mobile-menu-brand-gradient"
const MOBILE_MENU_CORNER_RADIUS = 28
const MOBILE_MENU_STROKE_WIDTH = 2
// Skew ratios taken from the Figma export (public/menu-header.svg): the
// bottom edge falls toward the left and the left edge leans slightly
// right at the top, so the shape stays proportional at any menu size.
const MOBILE_MENU_BOTTOM_SLOPE = 0.08
const MOBILE_MENU_LEFT_LEAN = 0.015

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
    const drop = MOBILE_MENU_BOTTOM_SLOPE * (right - left)
    const lean = MOBILE_MENU_LEFT_LEAN * (bottom - top)
    // Clockwise from top-left; quadratic curves round each corner.
    const verts: Point[] = [
      { x: left + lean, y: top },
      { x: right, y: top },
      { x: right, y: bottom - drop },
      { x: left, y: bottom },
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

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const toolbarRef = useRef<HTMLDivElement>(null)
  const [toolbarHeight, setToolbarHeight] = useState(0)

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
    const el = document.getElementById(sectionId.replace("#", ""))
    el?.scrollIntoView({ behavior: "smooth" })
    setMobileMenuOpen(false)
  }

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-slate-900/95 backdrop-blur-xs border-b border-violet-400/20"
          : "bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div ref={toolbarRef} className="container mx-auto py-3 px-4 flex justify-between items-center">
        {/* Logo / Brand */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/downloads/logo-serrano.svg"
            alt="Nodo Serrano"
            width={36}
            height={36}
            className="h-9 w-auto"
          />
          <span className="hidden sm:block text-lg font-bold bg-linear-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
            Nodo Serrano
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_ITEMS.map(({ label, href }) =>
            href.startsWith("/blog") ? (
              <Link
                key={label}
                href={href}
                className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
              >
                {label}
              </Link>
            ) : (
              <button
                key={label}
                onClick={() => scrollToSection(href)}
                className="text-sm font-medium text-slate-300 hover:text-white transition-colors cursor-pointer"
              >
                {label}
              </button>
            )
          )}
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden cursor-pointer"
          aria-label={mobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
        >
          <Image
            src="/downloads/menu-header.svg"
            alt="Menú"
            width={40}
            height={40}
          />
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="md:hidden px-4 pt-2 pb-4"
            style={{ height: `calc(100dvh - ${toolbarHeight}px)` }}
          >
            <div className="relative px-6 py-6">
              <MobileMenuShape />
              <motion.nav
                className="relative flex flex-col items-start gap-4"
                initial="closed"
                animate="open"
                variants={{
                  open: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
                  closed: {},
                }}
              >
                <motion.div
                  variants={{ open: { opacity: 1, y: 0 }, closed: { opacity: 0, y: -10 } }}
                >
                  <Link
                    href="#"
                    onClick={() => setMobileMenuOpen(false)}
                    className="inline-block rounded-full bg-gradient-brand p-[1.5px]"
                  >
                    <span className="block rounded-full bg-(--color-bg-elev-dark) px-4 py-1.5 text-sm font-bold text-(--color-text-primary-dark)">
                      Nodo LABS
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
                        className="text-lg font-bold text-(--color-text-primary-dark) hover:opacity-70"
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
                        className="text-lg font-bold text-(--color-text-primary-dark) hover:opacity-70 text-left"
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
