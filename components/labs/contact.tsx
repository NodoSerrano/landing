import { FadeIn } from "@/components/motion/fade-in"
import { CONTACT_EMAIL } from "@/lib/labs-data"
import { SkewedCta } from "./skewed-cta"

export function Contact() {
  return (
    <section
      id="contacto"
      className="relative bg-(--color-bg-elev-dark) px-4 py-20 md:py-28"
    >
      <FadeIn className="mx-auto flex w-full max-w-[720px] flex-col items-center gap-8 text-center">
        <div className="flex flex-col items-center gap-2">
          <h2 className="font-display text-h1 font-bold text-(--color-text-primary-dark)">
            ¿Tenés un proyecto?
          </h2>
          <p className="font-display text-h3 font-medium text-(--color-brand-blue)">
            Trabajemos juntos
          </p>
        </div>

        <div
          className="flex w-full flex-col items-center gap-6 rounded-[24px] rounded-tr-none border border-white/15 bg-white/[0.03] px-6 py-10 md:px-12"
          style={{ boxShadow: "var(--shadow-neumorphic-dark)" }}
        >
          <p className="max-w-md font-inter text-body leading-relaxed text-(--color-text-primary-dark)/90">
            Cada proyecto arranca con una evaluación técnica focalizada. Contanos
            en qué estás trabajando y coordinamos una conversación.
          </p>
          <SkewedCta href={`mailto:${CONTACT_EMAIL}`} label="Escribinos" />
        </div>
      </FadeIn>
    </section>
  )
}
