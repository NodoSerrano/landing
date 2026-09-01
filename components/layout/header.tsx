"use client"

import { useState, useEffect, useRef, useLayoutEffect, type CSSProperties } from "react"

// The header slides down from above the viewport. Each route renders its own
// <Header/> (hero, /labs, /blog, /blog/[slug]), so without this guard the
// intro replays on every client-side navigation. This module-level flag
// survives client navigations but resets on a full page load, so the slide-in
// plays only the first time the app mounts.
let hasHeaderIntroPlayed = false
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import FloatingLogo from "@/components/FloatingLogo"

// Mobile dropdown items. Same labels/order as desktop, plus a trailing
// SUSCRIBITE that renders as the boxed gradient button (`cta`).
const NAV_ITEMS: { label: string; href: string; cta?: boolean }[] = [
  { label: "Nodo LABS", href: "/labs" },
  { label: "SOMOS", href: "#about" },
  { label: "EVENTOS", href: "#events" },
  { label: "BLOG", href: "/blog" },
  { label: "Nos BANCAN", href: "#sponsors" },
  { label: "SUSCRIBITE", href: "#signup", cta: true },
]

// Desktop nav — same items minus SUSCRIBITE, which lives in its own button
// next to the nav on desktop.
const DESKTOP_NAV_ITEMS: { label: string; href: string }[] = [
  { label: "Nodo LABS", href: "/labs" },
  { label: "SOMOS", href: "#about" },
  { label: "EVENTOS", href: "#events" },
  { label: "BLOG", href: "/blog" },
  { label: "Nos BANCAN", href: "#sponsors" },
]

// Section ids the nav links point at — used for scroll-spy on the home page so
// the matching link shows a "selected" underline. Route links ("Nodo LABS" →
// /labs, "BLOG" → /blog) aren't section ids, so they're filtered out here and
// handled by pathname in isNavItemActive.
const NAV_SECTION_IDS = Array.from(
  new Set(
    [...DESKTOP_NAV_ITEMS, ...NAV_ITEMS]
      .map((i) => i.href)
      .filter((h) => h.startsWith("#") && h.length > 1)
      .map((h) => h.slice(1))
  )
)

const MOBILE_MENU_GRADIENT_ID = "mobile-menu-brand-gradient"
// Border weight + corner radius matched to the hamburger icon
// (Figma menu-header export: stroke-width 3, corner radius ≈6.4).
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

// Hamburger icon (from the Figma menu-header export) with the inner three lines
// inlined so they can morph into an X. The three <line>s carry their hamburger
// coordinates; `.menu-line--*` classes (globals.css) transform them into the X
// with a CSS transition — was three framer motion.line.
function MenuToggleIcon({ open }: { open: boolean }) {
  const lineProps = {
    stroke: "url(#menu-toggle-lines)",
    strokeWidth: 3,
    strokeLinecap: "round" as const,
  }
  return (
    <svg width="49" height="45" viewBox="0 0 50 46" fill="none" aria-hidden="true">
      <path
        d="M9.1379 43.4983C5.2522 43.9243 1.872 40.8487 1.93008 36.9402L2.35171 8.62887C2.40476 5.07739 5.29897 2.22586 8.85085 2.2257L41.76 2.22569C45.3498 2.22569 48.2608 5.13605 48.2609 8.72585L48.2609 33.3821C48.2609 36.6978 45.7647 39.4819 42.4687 39.8432L9.1379 43.4983Z"
        fill={open ? "var(--color-bg-elev-dark)" : "none"}
        stroke="url(#menu-toggle-border)"
        strokeWidth={2}
      />
      <line
        {...lineProps}
        x1={13}
        y1={15.25}
        x2={37}
        y2={15.25}
        className={open ? "menu-line menu-line--top" : "menu-line"}
      />
      <line
        {...lineProps}
        x1={13}
        y1={23}
        x2={37}
        y2={23}
        className={open ? "menu-line menu-line--mid" : "menu-line"}
      />
      <line
        {...lineProps}
        x1={13}
        y1={30.75}
        x2={37}
        y2={30.75}
        className={open ? "menu-line menu-line--bottom" : "menu-line"}
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

// Tailwind's default `lg` breakpoint — the mobile toggle/dropdown are
// `lg:hidden`, so the menu's actual on-screen visibility must key off the
// same threshold, not just the `mobileMenuOpen` click state (see below).
const LG_BREAKPOINT_QUERY = "(min-width: 1024px)"

// How long the mobile panel/overlay stay mounted after close, so their exit
// transition can run. Must match the .mobile-* transition durations in
// globals.css (0.2s) plus a little slack.
const MOBILE_MENU_EXIT_MS = 220

// Solid toolbar skin: dark fill (padding-box) + brand-gradient hairline
// (border-box). Lives on an always-mounted layer whose opacity is transitioned,
// so the transparent -> solid change on scroll fades instead of snapping
// (a gradient background can't itself be transitioned).
const SOLID_BAR_BG =
  "linear-gradient(var(--color-bg-elev-dark), var(--color-bg-elev-dark)) padding-box, " +
  "linear-gradient(90deg, rgba(79,230,195,0.4) 0%, rgba(46,155,255,0.4) 50%, rgba(200,127,229,0.4) 100%) border-box"

export default function Header({ alwaysSolid = false }: { alwaysSolid?: boolean } = {}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isDesktop, setIsDesktop] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState<string | null>(null)
  const toolbarRef = useRef<HTMLDivElement>(null)
  const menuToggleRef = useRef<HTMLButtonElement>(null)
  const menuPanelRef = useRef<HTMLDivElement>(null)
  const [toolbarHeight, setToolbarHeight] = useState(0)
  const isSolid = alwaysSolid || scrolled
  const pathname = usePathname()
  const router = useRouter()

  // Play the slide-in intro only on the first mount after a full page load;
  // skip it on client-side route changes (see hasHeaderIntroPlayed above).
  const [playIntro] = useState(() => !hasHeaderIntroPlayed)
  useEffect(() => {
    hasHeaderIntroPlayed = true
  }, [])

  // Derived, not stored: whether the mobile dropdown is actually visible.
  // `mobileMenuOpen` alone isn't enough — if it's opened on mobile and the
  // viewport is then resized past `lg` (e.g. dragging the devtools width),
  // `lg:hidden` hides the panel and its toggle button, but the click state
  // stays true, leaving `body.overflow: hidden` stuck with no visible way
  // to undo it. Gating on the real breakpoint keeps this correct regardless
  // of how the viewport got there.
  const mobileMenuActive = mobileMenuOpen && !isDesktop

  // Mount/visibility split for the panel + overlay enter/exit (replaces
  // AnimatePresence). `menuRender` keeps them in the DOM through the exit;
  // `menuVisible` is flipped one frame after mount so the enter transition runs.
  const [menuRender, setMenuRender] = useState(false)
  const [menuVisible, setMenuVisible] = useState(false)
  useEffect(() => {
    if (mobileMenuActive) {
      setMenuRender(true)
      const raf = requestAnimationFrame(() => setMenuVisible(true))
      return () => cancelAnimationFrame(raf)
    }
    setMenuVisible(false)
    const t = setTimeout(() => setMenuRender(false), MOBILE_MENU_EXIT_MS)
    return () => clearTimeout(t)
  }, [mobileMenuActive])

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const mql = window.matchMedia(LG_BREAKPOINT_QUERY)
    setIsDesktop(mql.matches)
    const handleChange = (e: MediaQueryListEvent) => setIsDesktop(e.matches)
    mql.addEventListener("change", handleChange)
    return () => mql.removeEventListener("change", handleChange)
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
    document.body.style.overflow = mobileMenuActive ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [mobileMenuActive])

  // Close the mobile dropdown on Escape and return focus to the toggle, so
  // keyboard users aren't stranded behind the overlay.
  useEffect(() => {
    if (!mobileMenuActive) return
    menuPanelRef.current?.focus()
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileMenuOpen(false)
        menuToggleRef.current?.focus()
      }
    }
    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [mobileMenuActive, menuRender])

  // Scroll-spy: on the home page, mark whichever section is crossing the
  // vertical centre of the viewport as active and keep the URL hash in sync
  // (replaceState — no scroll, no history entry). Off the home page there is no
  // active section (route links handle their own selected state).
  useEffect(() => {
    if (pathname !== "/") {
      setActiveSection(null)
      return
    }
    const sections = NAV_SECTION_IDS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => el !== null
    )
    if (sections.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
            window.history.replaceState(null, "", `#${entry.target.id}`)
          }
        }
      },
      // Collapse the root to a thin band at the centre so exactly one section
      // is intersecting at a time.
      { rootMargin: "-50% 0px -50% 0px" }
    )
    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [pathname])

  // A route link (e.g. /blog, /labs) is active by pathname; a section link is
  // active only on the home page when its section is in view.
  const isNavItemActive = (href: string) => {
    if (href.startsWith("/")) {
      return pathname === href || pathname.startsWith(`${href}/`)
    }
    const id = href.slice(1)
    if (!id) return false
    return pathname === "/" && activeSection === id
  }

  const scrollToSection = (sectionId: string) => {
    const id = sectionId.replace("#", "")
    setMobileMenuOpen(false)
    if (!id) return
    if (pathname !== "/") {
      router.push(`/#${id}`)
      return
    }
    // These sections are short enough to sit nicely centered; every other
    // section keeps the default top-alignment.
    const centeredSections = new Set(["events", "sponsors"])
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: centeredSections.has(id) ? "center" : "start",
    })
  }

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 w-full${playIntro ? " header-intro" : ""}`}
    >
      {/* Legibility scrim for the transparent state: keeps the white logo/nav
          readable over the hero. Always mounted, opacity-faded in step with the
          solid skin below so the two don't pop against each other on scroll. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-28 bg-gradient-to-b from-black/25 to-transparent transition-opacity duration-300"
        style={{ opacity: !isSolid && !mobileMenuActive ? 1 : 0 }}
      />

      {/* Permanent horizontal gutter so the bar never touches the viewport edge —
          kept separate from the toolbar's own mx-auto/max-w-6xl (which only
          centers/caps it once there's enough room), and separate from the
          mobile overlay below (which needs the true full-bleed viewport). */}
      <div className="px-4">
        <div
          ref={toolbarRef}
          className={`relative z-20 mx-auto my-2 flex items-center justify-between gap-4 rounded-2xl ${isSolid ? "px-3" : "px-0"}  py-3 transition-[padding] duration-300 md:px-4 lg:max-w-6xl`}
        >
          {/* Solid skin — always mounted; opacity fades in on scroll so the
              transparent -> solid change is smooth (see SOLID_BAR_BG). */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10 rounded-2xl border border-transparent transition-opacity duration-300 [backdrop-filter:blur(24px)]"
            style={{ background: SOLID_BAR_BG, opacity: isSolid && !mobileMenuOpen ? 1 : 0 }}
          />

          {/* Logo / Brand — animated two-part gem + wordmark */}
          <Link
            href="/"
            aria-label="Nodo Serrano — inicio"
            className="flex items-center gap-2"
          >
            <div className="relative h-[45px] w-[34px] shrink-0 translate-y-[7px]">
              <FloatingLogo width={34} top={50} />
            </div>
            <span className="font-display text-[22px] font-medium leading-[24.2px] text-(--color-bg-light)">
              Nodo
              <br />
              Serrano
            </span>
          </Link>

          {/* Desktop Nav + CTA */}
          <div className="hidden lg:flex items-center gap-10 xl:gap-16">
            <nav aria-label="Navegación principal" className="flex items-center gap-6 xl:gap-10">
              {DESKTOP_NAV_ITEMS.map(({ label, href }) => {
                const active = isNavItemActive(href)
                // Selected underline — always rendered, scales in/out on .is-active
                // (CSS transition, was AnimatePresence + motion.span).
                const underline = (
                  <span
                    aria-hidden="true"
                    className={`nav-underline pointer-events-none absolute -bottom-1.5 left-0 right-0 h-[2px] rounded-full bg-gradient-brand${active ? " is-active" : ""}`}
                  />
                )
                // Hover preview of the active underline (fainter) — only when the
                // item isn't already active, to avoid double-drawing.
                const hoverUnderline = !active && (
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -bottom-1.5 left-0 right-0 h-[2px] origin-left scale-x-0 rounded-full bg-gradient-brand opacity-0 transition-all duration-300 group-hover:scale-x-100 group-hover:opacity-60"
                  />
                )
                const className =
                  "group relative font-inter text-body font-normal text-(--color-text-primary-dark) transition-opacity hover:opacity-90"
                return href.startsWith("/") ? (
                  // prefetch disabled: the header is always in view, so Next
                  // was eagerly pulling the /labs + /blog route bundles (a
                  // ~130 KB chunk, ~100% unused on the landing page) on load.
                  <Link key={label} href={href} prefetch={false} className={className}>
                    {label}
                    {underline}
                    {hoverUnderline}
                  </Link>
                ) : (
                  <button
                    key={label}
                    onClick={() => scrollToSection(href)}
                    className={`${className} cursor-pointer`}
                  >
                    {label}
                    {underline}
                    {hoverUnderline}
                  </button>
                )
              })}
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
            ref={menuToggleRef}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden cursor-pointer"
            aria-label={mobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
          >
            <MenuToggleIcon open={mobileMenuOpen} />
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown — overlay + panel stay mounted through the exit
          transition (menuRender); menuVisible drives the CSS enter/exit. */}
      {menuRender && (
        <>
          <div
            data-open={menuVisible}
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
            className="mobile-overlay lg:hidden absolute inset-0 z-0 bg-gradient-to-t from-black/85 via-black/55 to-black/15 backdrop-blur-sm"
          />
          <div
            ref={menuPanelRef}
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menú principal"
            tabIndex={-1}
            data-open={menuVisible}
            onClick={() => setMobileMenuOpen(false)}
            className={`mobile-panel ${isSolid ? "mx-3" : "mx-0"} lg:hidden relative z-10 cursor-pointer px-4 pt-2 pb-4 outline-none`}
            style={{ height: `calc(100dvh - ${toolbarHeight}px)` }}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative cursor-default px-6 py-24"
            >
              <MobileMenuShape />
              <nav
                data-open={menuVisible}
                className="mobile-nav relative flex flex-col items-center gap-4"
              >
                {NAV_ITEMS.map(({ label, href, cta }, i) => {
                  const active = isNavItemActive(href)
                  const itemStyle = { "--i": i } as CSSProperties

                  if (cta) {
                    return (
                      <div key={label} className="mobile-nav-item w-full" style={itemStyle}>
                        <button
                          onClick={() => scrollToSection(href)}
                          className="block w-full cursor-pointer rounded-[8px] bg-gradient-brand p-[1.5px]"
                        >
                          <span className="block rounded-[7px] bg-(--color-bg-elev-dark) px-4 py-1.5 text-center text-[18px] font-bold">
                            <span className="bg-gradient-brand bg-clip-text text-transparent">
                              {label}
                            </span>
                          </span>
                        </button>
                      </div>
                    )
                  }

                  const className =
                    "relative font-inter text-[18px] leading-[33.3px] font-normal text-(--color-text-primary-dark) hover:opacity-70 text-center cursor-pointer"
                  const underline = (
                    <span
                      aria-hidden="true"
                      className={`nav-underline absolute -bottom-1 left-0 right-0 h-[2px] rounded-full bg-gradient-brand${active ? " is-active" : ""}`}
                    />
                  )
                  return (
                    <div key={label} className="mobile-nav-item" style={itemStyle}>
                      {href.startsWith("/") ? (
                        <Link
                          href={href}
                          prefetch={false}
                          className={className}
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {label}
                          {underline}
                        </Link>
                      ) : (
                        <button onClick={() => scrollToSection(href)} className={className}>
                          {label}
                          {underline}
                        </button>
                      )}
                    </div>
                  )
                })}
              </nav>
            </div>
          </div>
        </>
      )}
    </header>
  )
}
