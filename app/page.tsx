"use client";

import type React from "react";

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

// Animation variant: fade in with slight Y movement
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export default function Home() {
  return (
    <div id="top" className="min-h-screen bg-slate-900 flex flex-col">
      <Header />

      <main className="flex flex-col">
        {/* Hero Section */}
        <section className="relative w-full min-h-[30vh] md:min-h-[35vh] flex flex-col overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-slate-900" />
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
            <div className="max-w-4xl mx-auto space-y-4">
              <div className="flex flex-col items-center space-y-2">
                <Image
                  src="/imagotipo-color.svg"
                  alt="Nodo Serrano Imagotipo"
                  width={200}
                  height={320}
                  className="w-16 md:w-20 lg:w-24 h-auto drop-shadow-2xl"
                  priority
                />
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
          className="py-12 md:py-16 bg-slate-800 flex flex-col items-center justify-center w-full"
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

            <div className="rounded-lg overflow-hidden w-full max-w-4xl bg-[#212325]">
              <iframe
                src="https://luma.com/embed/calendar/cal-7uziZDmq9SFGggQ/events"
                height="500"
                width="100%"
                aria-hidden="false"
                tabIndex={0}
                className="overflow-hidden"
                style={{ overflow: "hidden" }}
              />
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
        <section id="features" className="py-12 md:py-16 bg-slate-800">
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
                    icon={feature.icon}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </section>

        {/* About Section */}
        <section id="about" className="py-12 md:py-16 bg-slate-800">
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
        <section className="py-12 md:py-16 bg-slate-800">
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
        <section id="signup" className="py-12 md:py-16 bg-slate-800">
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
  icon,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="bg-slate-800/60 backdrop-blur-sm p-6 rounded-lg border border-violet-400/30 hover:border-violet-400/50 transition-colors shadow-sm">
      <div className="w-16 h-16 bg-violet-400 rounded-full flex items-center justify-center mb-4 mx-auto">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-center mb-2">{title}</h3>
      <p className="text-center">{description}</p>
    </div>
  );
}
