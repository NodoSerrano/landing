"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import Footer from "@/components/footer";
import { features } from "@/lib/features-data";
import Hero from "@/components/sections/hero";
import Community from "@/components/sections/community";
import Somos from "@/components/sections/somos";
import Events from "@/components/sections/events";
import ConstruirTitle from "@/components/sections/construir-title";
import Blog from "@/components/sections/blog";
import Sponsors from "@/components/sections/sponsors";
import Newsletter from "@/components/sections/newsletter";
import { useScrollHash } from "@/lib/use-scroll-hash";

export default function Home() {
  // Enable scroll hash detection and updating
  useScrollHash();

  // Arriving from another page (e.g. header links on /blog) navigates to
  // "/#section" via client-side routing, which doesn't trigger the browser's
  // native scroll-to-fragment behavior — so do it manually on mount.
  useEffect(() => {
    const id = window.location.hash.replace("#", "");
    if (!id) return;
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }, []);

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

        <ConstruirTitle />

        {/* Blog Section */}
        <Blog />

        {/* Sponsors Section */}
        <Sponsors />

        {/* Newsletter Section */}
        <Newsletter />
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
