import type React from "react"
import { Spline_Sans, Inter, Space_Grotesk, Work_Sans } from "next/font/google"
import "./globals.css"

// Only Inter + Space Grotesk render above the fold (hero copy + headings), so
// those are the only two we let next/font preload. Spline Sans (legacy body
// default) and Work Sans (desktop nav, hidden behind the hamburger on mobile)
// load without a preload hint to keep the LCP image from queuing behind them.
const splineSans = Spline_Sans({ subsets: ["latin"], variable: "--font-spline-sans", display: "swap", preload: false })
const inter = Inter({ subsets: ["latin"], variable: "--font-inter-base", display: "swap" })
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space-grotesk", display: "swap" })
const workSans = Work_Sans({ subsets: ["latin"], variable: "--font-work-sans-base", display: "swap", preload: false })

export const metadata = {
  title: "Nodo Serrano",
  description: "Comunidad de Ethereum - Investigación y educación en Tandil",
  icons: {
    // favicon.svg is now self-contained (vector cube only). It previously
    // <use>d nodo-logo.svg, which embedded a ~110 KB base64 PNG and was fetched
    // at high priority on every page load.
    icon: { url: '/favicon.svg', type: 'image/svg+xml' },
    apple: '/favicon.svg',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="es"
      className={`scroll-smooth ${splineSans.variable} ${inter.variable} ${spaceGrotesk.variable} ${workSans.variable}`}
    >
      <body className="overflow-x-hidden bg-bg-light text-foreground" suppressHydrationWarning>
        {children}
      </body>
    </html>
  )
}
