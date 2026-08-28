"use client"

import { motion } from "framer-motion"
import { Container } from "@/components/ui/container"
import { processIntro, processSteps } from "@/lib/labs-data"
import { SectionHeading } from "./section-heading"

const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
}

function StepChip({ n }: { n: number }) {
  return (
    <span className="flex h-11 w-11 shrink-0 -skew-x-[10deg] items-center justify-center rounded-tl-[10px] rounded-br-[10px] bg-gradient-warm font-display text-h3 font-bold text-(--color-text-primary-dark)">
      <span className="skew-x-[10deg]">{n}</span>
    </span>
  )
}

export function Process() {
  return (
    <section id="proceso" className="py-20 md:py-28">
      <Container>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <SectionHeading label="Proceso" title="Cómo trabajamos" />
        </motion.div>

        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="mt-8 max-w-[62ch] font-inter text-body-lg leading-relaxed text-(--color-text-primary-light)"
        >
          {processIntro}
        </motion.p>

        {/* Desktop: stepper horizontal con línea que se dibuja al entrar en vista */}
        <div className="relative mt-16 hidden md:block">
          <div className="absolute inset-x-0 top-[21px] h-[3px] rounded-full bg-(--color-warm-yellow)/20" />
          <motion.div
            className="absolute left-0 top-[21px] h-[3px] w-full origin-left rounded-full bg-gradient-warm"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
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
