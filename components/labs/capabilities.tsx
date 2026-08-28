import { Container } from "@/components/ui/container"
import { FadeIn } from "@/components/motion/fade-in"
import { CardUnderline } from "@/components/sections/somos-shared"
import { capabilityGroups } from "@/lib/labs-data"
import { SectionHeading } from "./section-heading"

export function Capabilities() {
  return (
    <section
      id="capacidades"
      className="bg-(--color-bg-elev-dark) py-20 md:py-28"
    >
      <Container>
        <FadeIn>
          <SectionHeading label="Capacidades" title="Qué hacemos" tone="dark" />
        </FadeIn>

        <FadeIn className="mt-12 grid gap-6 sm:grid-cols-2">
          {capabilityGroups.map((group, i) => (
            <article
              key={group.title}
              className="flex flex-col rounded-tl-[16px] rounded-br-[16px] border border-white/10 bg-white/[0.04] p-6 md:p-7"
              style={{ boxShadow: "var(--shadow-neumorphic-dark)" }}
            >
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
                    className="flex gap-3 font-inter text-body leading-relaxed text-(--color-text-primary-dark)/85"
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
