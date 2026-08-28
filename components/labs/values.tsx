import { Container } from "@/components/ui/container"
import { FadeIn } from "@/components/motion/fade-in"
import { values } from "@/lib/labs-data"
import { SectionHeading } from "./section-heading"

export function Values() {
  return (
    <section id="valores" className="py-20 md:py-28">
      <Container>
        <FadeIn>
          <SectionHeading label="Valores" title="Nuestros valores" />
        </FadeIn>

        {/* Banda con borde superior de gradiente y divisores verticales — mismo
            layout que la tira de valores del doc de contenido. */}
        <FadeIn className="mt-12 overflow-hidden rounded-tl-[16px] rounded-br-[16px] border border-violet-200 bg-(--color-bg-warm-white)">
          <div className="h-[3px] w-full bg-gradient-brand" />
          <div className="grid grid-cols-1 divide-y divide-violet-200 sm:grid-cols-2 sm:divide-x lg:grid-cols-4 lg:divide-y-0">
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
