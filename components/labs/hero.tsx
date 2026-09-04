import { Container } from "@/components/ui/container"
import { FadeIn } from "@/components/motion/fade-in"
import LocationFilledIcon from "@/components/svgs/location-filled-icon"
import { heroIntro } from "@/lib/labs-data"
import { SkewedCta } from "./skewed-cta"
import { OrganicEdge } from "./section-edge"

export function LabsHero() {
  return (
    <section className="relative isolate flex min-h-[78vh] flex-col overflow-hidden bg-(--color-bg-elev-dark) px-4 md:px-5">
      {/* Malla de gradiente frío — mismo lenguaje que el hero del home, sin foto */}
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-linear-to-br from-(--color-bg-elev-dark) via-violet-900/40 to-(--color-bg-elev-dark)" />
        <div className="absolute inset-0 bg-linear-to-tr from-cyan-500/12 via-transparent to-blue-500/12" />
        <div className="absolute -top-24 left-1/4 h-[28rem] w-[28rem] rounded-full bg-violet-500/25 blur-[120px]" />
        <div className="absolute top-1/3 -right-16 h-[26rem] w-[26rem] rounded-full bg-cyan-500/20 blur-[120px]" />
        <div className="absolute -bottom-32 left-1/3 h-[30rem] w-[30rem] rounded-full bg-blue-500/20 blur-[150px]" />
      </div>

      <Container className="max-w-6xl! px-0 flex flex-1 flex-col pt-32 pb-32 md:pt-40 md:pb-44">
        <div className="flex flex-1 items-center">
          <FadeIn className="flex max-w-3xl flex-col">
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
        </div>
      </Container>

      {/* Borde orgánico crema hacia la sección "Sobre nosotros" */}
      <OrganicEdge side="bottom" variant={0} />
    </section>
  )
}
