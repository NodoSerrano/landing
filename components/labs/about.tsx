import { Container } from "@/components/ui/container"
import { FadeIn } from "@/components/motion/fade-in"
import { aboutParagraphs, fastFacts } from "@/lib/labs-data"
import { SectionHeading } from "./section-heading"
import { SkewedPanel } from "./skewed-panel"

export function About() {
  return (
    <section id="nosotros" className="py-20 md:py-28">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1fr_360px] lg:gap-16">
          {/* Texto */}
          <FadeIn className="flex flex-col">
            <SectionHeading label="Sobre nosotros" title="Quiénes somos" />
            <div className="mt-8 flex max-w-[62ch] flex-col gap-5 font-inter text-body-lg leading-relaxed text-(--color-text-primary-light)">
              {aboutParagraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </FadeIn>

          {/* Datos rápidos — panel con silueta de trapecio inclinado */}
          <FadeIn className="lg:sticky lg:top-28 lg:self-start">
            <SkewedPanel
              fill="var(--color-violet-100)"
              contentClassName="px-7 py-8"
            >
              <h3 className="font-display text-h3 font-bold text-(--color-text-primary-light)">
                Datos rápidos
              </h3>
              <div className="mt-3 h-[3px] w-[90px] rounded-full bg-gradient-brand" />

              <dl className="mt-6 flex flex-col gap-5">
                {fastFacts.map((fact) => (
                  <div key={fact.label}>
                    <dt className="font-display text-caption font-medium uppercase italic tracking-[0.06em] text-(--color-violet-700)">
                      {fact.label}
                    </dt>
                    <dd className="mt-1 font-inter text-body-sm leading-relaxed text-(--color-text-primary-light)">
                      {fact.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </SkewedPanel>
          </FadeIn>
        </div>
      </Container>
    </section>
  )
}
