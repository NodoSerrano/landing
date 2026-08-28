import type { Metadata } from "next"
import Header from "@/components/layout/header"
import Footer from "@/components/footer"
import { LabsHero } from "@/components/labs/hero"
import { About } from "@/components/labs/about"
import { Capabilities } from "@/components/labs/capabilities"
import { Process } from "@/components/labs/process"
import { Values } from "@/components/labs/values"
import { Contact } from "@/components/labs/contact"

export const metadata: Metadata = {
  title: "Nodo LABS — Ingeniería de software y seguridad",
  description:
    "La división de servicios profesionales de Nodo Serrano: ingeniería de software y seguridad para equipos que necesitan evaluación técnica precisa, prácticas seguras y entrega pragmática.",
}

export default function LabsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-(--color-bg-light)">
      <Header />

      <main className="flex-1">
        <LabsHero />
        <About />
        <Capabilities />
        <Process />
        <Values />
        <Contact />
      </main>

      <Footer />
    </div>
  )
}
