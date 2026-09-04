import { Container } from "@/components/ui/container"
import { FadeIn } from "@/components/motion/fade-in"
import { aboutParagraphs, fastFacts } from "@/lib/labs-data"
import { SectionHeading } from "./section-heading"
import { SkewedPanel } from "./skewed-panel"

export function About() {
  return (
    <section id="nosotros" className="px-4 py-20 md:px-5 md:py-28">
      <Container className="max-w-6xl! px-0">
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
              fill="color-mix(in srgb, var(--color-warm-yellow) 3%, var(--color-bg-light))"
              gradient="warm"
              shadow="drop-shadow(5px 7px 18px rgba(7,15,34,0.16)) drop-shadow(-3px -4px 14px rgba(57,59,91,0.12))"
              topSlope={0.05}
              bottomSlope={0.04}
              rightLean={0.028}
              maxTopDrop={24}
              maxBottomRise={17}
              maxRightLean={12}
              contentClassName="px-7 py-12"
            >
              <h3 className="font-display text-h3 font-bold text-(--color-text-primary-light)">
                Datos rápidos
              </h3>
              <div className="mt-3 h-[3px] w-[90px] rounded-full bg-gradient-warm" />

              <dl className="mt-6 flex flex-col gap-5">
                {fastFacts.map((fact) => (
                  <div key={fact.label}>
                    <dt className="font-display text-caption font-medium uppercase tracking-[0.08em] text-(--color-warm-violet)">
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
