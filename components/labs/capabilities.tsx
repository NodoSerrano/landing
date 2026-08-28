import { Container } from "@/components/ui/container"
import { FadeIn } from "@/components/motion/fade-in"
import { CardUnderline } from "@/components/sections/somos-shared"
import { capabilityGroups } from "@/lib/labs-data"
import { SectionHeading } from "./section-heading"
import { OrganicEdge } from "./section-edge"
import { CardKeyline } from "./card-keyline"

export function Capabilities() {
  return (
    <section
      id="capacidades"
      className="relative bg-(--color-bg-elev-dark) py-24 md:py-36"
    >
      {/* Bordes orgánicos crema contra las secciones claras de arriba y abajo */}
      <OrganicEdge side="top" variant={1} />
      <OrganicEdge side="bottom" variant={2} flipX />

      <Container className="relative z-20">
        <FadeIn>
          <SectionHeading label="Capacidades" title="Qué hacemos" tone="dark" />
        </FadeIn>

        <FadeIn className="mt-12 grid gap-6 sm:grid-cols-2">
          {capabilityGroups.map((group, i) => (
            <article
              key={group.title}
              className="relative flex flex-col overflow-hidden rounded-tl-[16px] rounded-br-[16px] border border-white/12 bg-white/[0.06] p-6 md:p-7"
            // style={{ boxShadow: "var(--shadow-neumorphic-dark)" }}
            >
              <CardKeyline />

              <div className="w-fit">
                <h3 className="font-display text-h3 font-medium text-(--color-text-primary-dark)">
                  {group.title}
                </h3>
                <CardUnderline gradId={`labs-cap-underline-${i}`} />
              </div>

              <ul className="mt-4 flex flex-col gap-3">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 font-inter text-body leading-relaxed text-(--color-text-primary-dark)/90"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-[7px] h-[6px] w-[6px] shrink-0 rounded-full bg-gradient-brand"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </FadeIn>
      </Container>
    </section>
  )
}
