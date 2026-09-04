import { Container } from "@/components/ui/container"
import { processIntro, processSteps } from "@/lib/labs-data"
import { Reveal } from "@/components/motion/fade-in"
import { SectionHeading } from "./section-heading"

function StepChip({ n }: { n: number }) {
  return (
    <span className="flex h-11 w-11 shrink-0 -skew-x-[10deg] items-center justify-center rounded-tl-[10px] rounded-br-[10px] bg-gradient-warm font-display text-h3 font-bold text-(--color-text-primary-dark)">
      <span className="skew-x-[10deg]">{n}</span>
    </span>
  )
}

export function Process() {
  return (
    <section id="proceso" className="px-4 py-20 md:px-5 md:py-28">
      <Container className="max-w-6xl! px-0">
        <Reveal>
          <SectionHeading label="Proceso" title="Cómo trabajamos" />
        </Reveal>

        <Reveal
          as="p"
          className="mt-8 max-w-[62ch] font-inter text-body-lg leading-relaxed text-(--color-text-primary-light)"
        >
          {processIntro}
        </Reveal>

        {/* Desktop: stepper horizontal con línea que se dibuja al entrar en vista */}
        <div className="relative mt-16 hidden md:block">
          <div className="absolute inset-x-0 top-[21px] h-[3px] rounded-full bg-(--color-warm-yellow)/20" />
          <Reveal
            variant="scale-x"
            className="absolute left-0 top-[21px] h-[3px] w-full rounded-full bg-gradient-warm"
          />
          <ol className="relative grid grid-cols-3 gap-8">
            {processSteps.map((step, i) => (
              <li key={step.title} className="flex flex-col items-start">
                <StepChip n={i + 1} />
                <h3 className="mt-5 font-display text-h3 font-medium text-(--color-text-primary-light)">
                  {step.title}
                </h3>
                <p className="mt-2 max-w-[34ch] font-inter text-body leading-relaxed text-(--color-text-muted)">
                  {step.description}
                </p>
              </li>
            ))}
          </ol>
        </div>

        {/* Mobile: timeline vertical */}
        <ol className="mt-12 flex flex-col gap-8 md:hidden">
          {processSteps.map((step, i) => (
            <li key={step.title} className="relative flex gap-4">
              {i < processSteps.length - 1 && (
                <span
                  aria-hidden="true"
                  className="absolute bottom-[-2rem] left-[21px] top-12 w-[2px] bg-(--color-warm-yellow)/20"
                />
              )}
              <StepChip n={i + 1} />
              <div className="pt-1">
                <h3 className="font-display text-h3 font-medium text-(--color-text-primary-light)">
                  {step.title}
                </h3>
                <p className="mt-2 font-inter text-body leading-relaxed text-(--color-text-muted)">
                  {step.description}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  )
}
