"use client";

import type React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import MobileMenu from "@/components/mobile-menu";
import { useScrollHash } from "@/lib/use-scroll-hash";
import FloatingLogo from "./FloatingLogo";

// Component for regular navigation links (non-sections)
function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="text-base font-bold hover:text-gray-300 transition-colors"
    >
      {children}
    </Link>
  );
}

// Component for section navigation links
function SectionLink({
  sectionId,
  children,
  onClick,
}: {
  sectionId: string;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  const { scrollToSection } = useScrollHash();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    scrollToSection(sectionId);
    onClick?.();
  };

  return (
    <button
      onClick={handleClick}
      className="text-base font-bold hover:text-gray-300 transition-colors"
    >
      {children}
    </button>
  );
}

export default function NavBar() {
  return (
    <nav className="sticky top-0 z-50 w-full layer3 neumorphism-shadow neumorphism-border">
      <div className="max-w-content mx-auto px-4 py-3 flex justify-between items-center">
        <div className="relative w-[30px] h-[40px]">
          <FloatingLogo width={30} top={70} />
        </div>

        <div className="hidden md:flex space-x-8 items-center justify-center flex-1">
          <NavLink href="/blog">Blog</NavLink>
          <SectionLink sectionId="events">Eventos</SectionLink>
          <SectionLink sectionId="features">Características</SectionLink>
          <SectionLink sectionId="about">Nosotros</SectionLink>
          <SectionLink sectionId="signup">Registro</SectionLink>
        </div>
        <div className="flex items-center gap-4">
          <Button onClick={() => document.getElementById('signup')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}>
            Suscribirse
          </Button>
          <MobileMenu />
        </div>
      </div>
    </nav>
  );
}
