"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import NewsletterForm from "@/components/newsletter-form";
import GhostBlogSection from "@/components/ghost-blog-section";
import Footer from "@/components/footer";
import { features } from "@/lib/features-data";
import SponsorsTicker from "@/components/sponsors-ticker";
import Hero from "@/components/sections/hero";
import Community from "@/components/sections/community";
import Somos from "@/components/sections/somos";
import Events from "@/components/sections/events";
import { Container } from "@/components/ui/container";
import { useScrollHash } from "@/lib/use-scroll-hash";

export default function Home() {
  // Enable scroll hash detection and updating
  useScrollHash();

  return (
    <div id="top" className="min-h-screen flex flex-col">
      <main className="flex flex-col">
        {/* Hero Section (incluye el Header nuevo) */}
        <Hero />

        {/* Community Section */}
        <Community />

        {/* About / Somos Section */}
        <Somos />

        {/* Events Section */}
        <Events />

        {/* Blog Section */}
        <GhostBlogSection />

        {/* Features Section */}
        <section id="features" className="py-12 md:py-16">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <Container className="space-y-12">
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
            </Container>
          </motion.div>
        </section>

        {/* Sponsors Section */}
        <section className="py-12 md:py-16">
          <div className="text-center">
            <Container className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-6">
                Nos apoyan
              </h2>
            </Container>

            {/* Sponsors Ticker — full-bleed, sin Container a propósito */}
            <div id="sponsors" className="scroll-mt-20">
              <SponsorsTicker />
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section id="signup" className="py-12 md:py-16">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <Container className="text-center">
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
            </Container>
          </motion.div>
        </section>
      </main>

      <Footer />
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
      <div className="h-32 bg-linear-to-br from-violet-500/20 to-violet-600/30 relative overflow-hidden">
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
