import type React from "react"
import { Spline_Sans } from "next/font/google"
import "./globals.css"

const splineSans = Spline_Sans({ subsets: ["latin"] })

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
      <body className={`${splineSans.className} text-foreground`} suppressHydrationWarning>{children}</body>
    </html>
  )
}
