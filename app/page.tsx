"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import NewsletterForm from "@/components/newsletter-form";
import BlogSection from "@/components/blog-section";
import NavBar from "@/components/nav-bar";
import Footer from "@/components/footer";
import SocialSidebar from "@/components/social-sidebar";
import { features } from "@/lib/features-data";
import { ExternalLinkIcon } from "@/components/feature-icons";
import { Button } from "@/components/ui/button";
import SponsorsTicker from "@/components/sponsors-ticker";
import HeroSection from "@/components/hero-section";
import { useScrollHash } from "@/lib/use-scroll-hash";


export default function Home() {
  // Enable scroll hash detection and updating
  useScrollHash();

  return (
    <div id="top" className="min-h-screen layer1 flex flex-col">
      <NavBar />

      <main className="flex flex-col">
        {/* Hero Section */}
        <HeroSection />

        {/* Blog Section */}
        <BlogSection />

        {/* Events Section */}
        <section
          id="events"
          className="py-12 md:py-16 flex flex-col items-center justify-center w-full"
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

            <div className="rounded-lg overflow-hidden w-full max-w-4xl neumorphism-shadow  neumorphism-border">
              <div className="bg-[#212325]">
                {" "}
                {/* TODO: keep to mimic blog background color */}
                <iframe
                  src="https://luma.com/embed/calendar/cal-7uziZDmq9SFGggQ/events"
                  height="500"
                  width="100%"
                  aria-hidden="false"
                  tabIndex={0}
                  className="overflow-hidden"
                  style={{ overflow: "hidden" }}
                />{" "}
              </div>
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
        <section id="features" className="py-12 md:py-16">
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
        <section id="about" className="py-12 md:py-16">
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
              <div className="mx-auto max-w-4xl flex flex-col items-center justify-center neumorphism-border  neumorphism-shadow layer2 rounded-xl px-6 py-8">
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
            </div>
          </motion.div>
        </section>

        {/* Sponsors Section */}
        <section className="py-12 md:py-16">
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
        <section id="signup" className="py-12 md:py-16">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="mx-auto text-center max-w-content px-4">
              <div className="text-center mb-12">
                <h2 className="text-2xl md:text-3xl font-bold mb-10">
                  Únete a nuestra comunidad
                </h2>
                <div className="w-fit gap-8 mx-auto flex flex-col items-center justify-center neumorphism-border  neumorphism-shadow layer2 rounded-xl px-6 py-8">
                  <p className="text-lg max-w-xl mx-auto">
                    Sé parte de la revolución blockchain en Tandil. Regístrate
                    para recibir novedades sobre eventos, talleres y
                    oportunidades.
                  </p>
                  <div className="max-w-lg w-full">
                    <NewsletterForm />
                  </div>
                </div>
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
  const [imageError, setImageError] = useState(false);

  const showFallback = !src || src === "/placeholder.jpg" || imageError;

  return (
    <div className="neumorphism-shadow layer2 rounded-lg neumorphism-border transition-all duration-300 overflow-hidden">
      {/* Banner Image Area */}
      <div className="h-32 bg-gradient-to-br from-violet-500/20 to-violet-600/30 relative overflow-hidden">
        <div className="absolute inset-0 bg-slate-900/20" />
        {showFallback ? (
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
        ) : (
          <Image
            src={src}
            alt={title}
            fill
            className="object-cover"
            onError={() => setImageError(true)}
          />
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
