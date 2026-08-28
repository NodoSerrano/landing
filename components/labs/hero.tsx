import { Container } from "@/components/ui/container"
import { Breadcrumb } from "@/components/blog/breadcrumb"
import { FadeIn } from "@/components/motion/fade-in"
import LocationFilledIcon from "@/components/svgs/location-filled-icon"
import { heroIntro } from "@/lib/labs-data"
import { SkewedCta } from "./skewed-cta"

export function LabsHero() {
  return (
    <section className="relative isolate overflow-hidden bg-(--color-bg-elev-dark)">
      {/* Malla de gradiente frío — mismo lenguaje que el hero del home, sin foto */}
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-linear-to-br from-(--color-bg-elev-dark) via-violet-900/30 to-(--color-bg-elev-dark)" />
        <div className="absolute inset-0 bg-linear-to-tr from-cyan-500/10 via-transparent to-blue-500/10" />
        <div className="absolute -top-24 left-1/4 h-96 w-96 rounded-full bg-violet-500/20 blur-[128px]" />
        <div className="absolute -bottom-24 right-1/4 h-96 w-96 rounded-full bg-cyan-500/20 blur-[128px]" />
        <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/10 blur-[200px]" />
      </div>

      <Container className="flex flex-col pt-32 pb-20 md:pt-40 md:pb-28">
        <Breadcrumb
          tone="dark"
          items={[{ label: "Inicio", href: "/" }, { label: "Nodo LABS" }]}
        />

        <FadeIn className="mt-14 flex max-w-3xl flex-col md:mt-20">
          {/* Lockup Nodo LABS */}
          <div className="flex items-center gap-2 font-display text-[2.5rem] font-bold leading-none md:text-display-lg">
            <span className="text-(--color-text-primary-dark)">Nodo</span>
            <span className="rounded-[6px] bg-gradient-brand px-3 py-1 text-(--color-text-primary-dark)">
              LABS
            </span>
          </div>

          <p className="mt-6 font-inter text-body-lg text-(--color-text-primary-dark)/90">
            Ingeniería de software y seguridad · Servicios B2B del Nodo Serrano
          </p>

          <div className="mt-5 flex items-center gap-2 text-(--color-text-primary-dark)">
            <LocationFilledIcon className="h-5 w-5" />
            <span className="font-inter text-body">
              Tandil, Buenos Aires, Argentina
            </span>
          </div>

          <div className="my-8 h-[3px] w-[280px] max-w-full rounded-full bg-gradient-brand" />

          <p className="max-w-2xl font-inter text-body-lg leading-relaxed text-(--color-text-primary-dark)/90">
            {heroIntro}
          </p>

          <div className="mt-10">
            <SkewedCta href="#contacto" label="Hablemos" />
          </div>
        </FadeIn>
      </Container>
    </section>
  )
}
