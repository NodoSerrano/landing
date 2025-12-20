import type React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import MobileMenu from "@/components/mobile-menu";

// Component for navigation links
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
      className="text-base font-bold text-violet-500 hover:text-violet-600 transition-colors"
    >
      {children}
    </Link>
  );
}

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-violet-400/20 bg-slate-900/95 backdrop-blur supports-[backdrop-filter]:bg-slate-900/80">
      <div className="max-w-content mx-auto px-4 py-3 flex justify-between items-center">
        <Image
          src="/imagotipo-color.svg"
          alt="Nodo Serrano Imagotipo"
          width={200}
          height={320}
          className="h-10 w-auto"
          priority
        />
        <div className="hidden md:flex space-x-8 items-center justify-center flex-1">
          <NavLink href="#top">Home</NavLink>
          <NavLink href="/blog">Blog</NavLink>
          <NavLink href="#events">Eventos</NavLink>
          <NavLink href="#about">Nosotros</NavLink>
          <NavLink href="#features">Características</NavLink>
          <NavLink href="#signup">Registro</NavLink>
        </div>
        <div className="flex items-center gap-4">
          <Button href="#signup">Suscribirse</Button>
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
