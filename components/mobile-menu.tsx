"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <div className="md:hidden">
      <Button
        onClick={toggleMenu}
        variant="ghost"
        size="icon"
        aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
        className="hover:bg-[#fff]/10 text-white"
      >
        {isOpen ? <X className="h-6 w-6 text-white" /> : <Menu className="h-6 w-6 text-white" />}
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="absolute top-16 left-0 right-0 neumorphism-shadow neumorphism-border shadow-lg z-50"
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
  return (
    <motion.div
      variants={{
        open: { opacity: 1, y: 0 },
        closed: { opacity: 0, y: -10 },
      }}
    >
      <Link
        href={href}
        className="block py-2 px-4 font-bold transition-colors"
        onClick={onClick}
      >
        {children}
      </Link>
    </motion.div>
  );
}
