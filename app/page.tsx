"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import NewsletterForm from "@/components/newsletter-form";
import BlogSection from "@/components/blog-section";
import Header from "@/components/header";
import Footer from "@/components/footer";
import SocialSidebar from "@/components/social-sidebar";
import { features } from "@/lib/features-data";
import { ExternalLinkIcon } from "@/components/feature-icons";
import { Button } from "@/components/ui/button";
import SponsorsTicker from "@/components/sponsors-ticker";
import NodoLogoTop from "@/components/svgs/nodo-logo-top";
import NodoLogoBottom from "@/components/svgs/nodo-logo-bottom";

export default function Home() {
  return (
    <div id="top" className="min-h-screen layer0 flex flex-col">
      <Header />

      <main className="flex flex-col">
        {/* Hero Section */}
        <section className="relative w-full min-h-[30vh] md:min-h-[35vh] flex flex-col overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 layer1" />
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-500/20 rounded-full filter blur-[128px] animate-pulse" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-violet-500/20 rounded-full filter blur-[128px] animate-pulse animation-delay-2000" />
          </div>

          {/* Content */}
          <motion.div
            className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-4 py-6 md:py-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="max-w-4xl mx-auto">
              <div className="flex flex-col items-center gap-4">
                <div className="flex flex-col items-center py-8 h-[220px]">
                  <motion.div
                    animate={{
                      y: [0, -6, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 0.5,
                    }}
                    className="z-10"
                  >
                    <NodoLogoTop className="w-28" />
                  </motion.div>
                  <motion.div
                    animate={{
                      y: [0, 6, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <NodoLogoBottom className="w-28 translate-y-[-48px]" />
                  </motion.div>
                </div>
                <h1 className="text-xl md:text-2xl lg:text-2xl font-bold text-center drop-shadow-lg">
                  Nodo Serrano
                </h1>
              </div>
              <p className="text-base md:text-lg lg:text-xl max-w-2xl mx-auto text-center drop-shadow leading-relaxed">
                <span className="block sm:inline">
                  Hackerspace y Semillero.
                </span>{" "}
                <span className="block sm:inline">
                  Investigación y educación con foco en Ethereum Ecosystem
                </span>{" "}
                <span className="block sm:inline">en la ciudad de Tandil.</span>
              </p>
            </div>
          </motion.div>
        </section>

        {/* Blog Section */}
        <BlogSection />

        {/* Events Section */}
        <section
          id="events"
          className="py-12 md:py-16 layer0 flex flex-col items-center justify-center w-full"
        >
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="w-full max-w-content mx-auto px-4 flex flex-col items-center justify-center gap-10"
          >
            <div className="text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-2">
                Próximos eventos
              </h2>
              <p className="text-lg max-w-2xl mx-auto">
                Participa en nuestros eventos y talleres sobre blockchain y
                Ethereum
              </p>
            </div>

            <div className="rounded-lg overflow-hidden w-full max-w-4xl neumorphism-bg-raised  neumorphism-border">
              <div className="bg-[#212325]">


              <iframe
                src="https://luma.com/embed/calendar/cal-7uziZDmq9SFGggQ/events"
                height="500"
                width="100%"
                aria-hidden="false"
                tabIndex={0}
                className="overflow-hidden"
                style={{ overflow: "hidden" }}
              />              </div>
            </div>

            {/* Luma Profile Link */}
            <div className="text-center">
              <Button
                href="https://luma.com/nodoserrano"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                Suscribite a nuestro calendario
                <ExternalLinkIcon className="w-4 h-4" />
              </Button>
            </div>
          </motion.div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-12 md:py-16 layer0">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="space-y-12 max-w-content mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-2xl md:text-3xl font-bold mb-6">
                  Qué se viene
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {features.map((feature) => (
                  <FeatureCard
                    key={feature.title}
                    title={feature.title}
                    description={feature.description}
                    src={feature.src}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </section>

        {/* About Section */}
        <section id="about" className="py-12 md:py-16 layer0">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="mx-auto text-center max-w-content px-4">
              <div className="text-center mb-12">
                <h2 className="text-2xl md:text-3xl font-bold mb-6">
                  Sobre el proyecto
                </h2>
              </div>
              <p className="text-base md:text-lg mb-8">
                Nodo Serrano es una nueva iniciativa que se enfocará en la
                investigación y educación sobre ethereum. Inspirados por las
                tecnologías descentralizadas y la innovación digital moderna,
                estamos creando una experiencia para fomentar esta floreciente
                comunidad en nuestra ciudad: Tandil.
              </p>
              <p className="text-base md:text-lg">
                Mantente atento para más actualizaciones a medida que nos
                acercamos a nuestra fecha de lanzamiento.
              </p>
            </div>
          </motion.div>
        </section>

        {/* Sponsors Section */}
        <section className="py-12 md:py-16 layer0">
          <div className="text-center">
            <div className="text-center mb-12 px-4">
              <h2 className="text-2xl md:text-3xl font-bold mb-6">
                Nos apoyan
              </h2>
            </div>

            {/* Sponsors Ticker */}
            <SponsorsTicker />
          </div>
        </section>

        {/* Newsletter Section */}
        <section id="signup" className="py-12 md:py-16 layer0">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="mx-auto text-center max-w-content px-4">
              <div className="text-center mb-12">
                <h2 className="text-2xl md:text-3xl font-bold mb-6">
                  Únete a nuestra comunidad
                </h2>
                <p className="text-lg max-w-2xl mx-auto">
                  Sé parte de la revolución blockchain en Tandil. Regístrate
                  para recibir novedades sobre eventos, talleres y
                  oportunidades.
                </p>
              </div>
              <div className="max-w-md mx-auto">
                <NewsletterForm />
              </div>
            </div>
          </motion.div>
        </section>
      </main>

      <Footer />
      <SocialSidebar />
    </div>
  );
}

// Component for feature cards
function FeatureCard({
  title,
  description,
  src,
}: {
  title: string;
  description: string;
  src?: string;
}) {
  return (
    <div className="neumorphism-bg-raised rounded-lg neumorphism-border transition-all duration-300 overflow-hidden">
      {/* Banner Image Area */}
      <div className="h-32 bg-gradient-to-br from-violet-500/20 to-violet-600/30 relative overflow-hidden">
        <div className="absolute inset-0 bg-slate-900/20" />
        {src && src !== "/placeholder.jpg" ? (
          <Image src={src} alt={title} fill className="object-cover" />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <svg
              className="w-12 h-12 text-violet-400/60"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="text-xl font-semibold text-white mb-3 leading-tight">
          {title}
        </h3>
        <p className="text-slate-300 leading-relaxed">{description}</p>
      </div>
    </div>
  );
}
