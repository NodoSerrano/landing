"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useScrollHash } from "@/lib/use-scroll-hash";

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <div className="md:hidden flex items-center justify-center">
      <Button
        onClick={toggleMenu}
        variant="ghost"
        size="icon"
        aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
        className="hover:bg-[#fff]/10 text-white h-[38px] w-[38px]"
      >
        {isOpen ? <X className="h-7 w-7 text-white" /> : <Menu className="h-6 w-6 text-white" />}
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="absolute top-16 left-0 right-0 neumorphism-shadow neumorphism-border z-10 layer3"
          >
            <motion.nav
              className="flex flex-col p-4 space-y-4"
              initial="closed"
              animate="open"
              variants={{
                open: {
                  transition: { staggerChildren: 0.1, delayChildren: 0.1 },
                },
                closed: {},
              }}
            >
              <MenuItem href="#about" onClick={closeMenu}>
                Nosotros
              </MenuItem>
              <MenuItem href="#features" onClick={closeMenu}>
                Características
              </MenuItem>
              <MenuItem href="#signup" onClick={closeMenu}>
                Registro
              </MenuItem>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function MenuItem({
  href,
  onClick,
  children,
}: {
  href: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  const { scrollToSection } = useScrollHash();

  const handleClick = (e: React.MouseEvent) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const sectionId = href.slice(1); // Remove the # prefix
      scrollToSection(sectionId);
      onClick();
    }
  };

  return (
    <motion.div
      variants={{
        open: { opacity: 1, y: 0 },
        closed: { opacity: 0, y: -10 },
      }}
    >
      {href.startsWith("#") ? (
        <button
          onClick={handleClick}
          className="block py-2 px-4 font-bold transition-colors w-fit text-left hover:text-gray-300"
        >
          {children}
        </button>
      ) : (
        <Link
          href={href}
          className="block py-2 px-4 font-bold transition-colors w-fit"
          onClick={onClick}
        >
          {children}
        </Link>
      )}
    </motion.div>
  );
}
