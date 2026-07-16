import type React from "react"
import { Spline_Sans, Inter, Space_Grotesk } from "next/font/google"
import "./globals.css"

const splineSans = Spline_Sans({ subsets: ["latin"] })
// Fuentes del rediseño nuevo (hero/header); el resto del sitio sigue en Spline Sans
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space-grotesk" })

export const metadata = {
  title: "Nodo Serrano",
  description: "Comunidad de Ethereum - Investigación y educación en Tandil",
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/nodo-logo.svg', type: 'image/svg+xml', sizes: 'any' }
    ],
    apple: '/nodo-logo.svg',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <body
        className={`${splineSans.className} ${inter.variable} ${spaceGrotesk.variable} text-foreground`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  )
}
