import type React from "react"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

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
      <body className={`${inter.className} text-foreground`} suppressHydrationWarning>{children}</body>
    </html>
  )
}
