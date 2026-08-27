import type React from "react"
import { Spline_Sans, Inter, Space_Grotesk, Work_Sans } from "next/font/google"
import "./globals.css"

const splineSans = Spline_Sans({ subsets: ["latin"], variable: "--font-spline-sans" })
// Fuentes del rediseño nuevo (hero/header); el resto del sitio sigue en Spline Sans
const inter = Inter({ subsets: ["latin"], variable: "--font-inter-base" })
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space-grotesk" })
// Tipografía de los enlaces del navbar
const workSans = Work_Sans({ subsets: ["latin"], variable: "--font-work-sans-base" })

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
