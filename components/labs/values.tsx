import { Container } from "@/components/ui/container"
import { FadeIn } from "@/components/motion/fade-in"
import { values } from "@/lib/labs-data"
import { SectionHeading } from "./section-heading"
import { CardKeyline } from "./card-keyline"

export function Values() {
  return (
    <section id="valores" className="py-20 md:py-28">
      <Container>
        <FadeIn>
          <SectionHeading label="Valores" title="Nuestros valores" />
        </FadeIn>

        {/* Banda con keyline de gradiente en la esquina superior derecha (mismo
            efecto que las cards de Capacidades) + divisores verticales. */}
        <FadeIn className="relative mt-12 overflow-hidden rounded-tl-[16px] rounded-br-[16px] border border-(--color-warm-yellow)/30 bg-(--color-bg-warm-white)">
          <CardKeyline gradient="warm" />
          <div className="grid grid-cols-1 divide-y divide-(--color-warm-yellow)/30 sm:grid-cols-2 sm:divide-x lg:grid-cols-4 lg:divide-y-0">
            {values.map((value) => (
              <div key={value.title} className="flex flex-col gap-2 p-6">
                <h3 className="font-display text-h3 font-medium text-(--color-text-primary-light)">
                  {value.title}
                </h3>
                <p className="font-inter text-body leading-relaxed text-(--color-text-muted)">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </FadeIn>
      </Container>
    </section>
  )
}
