"use client";

import type React from "react";
import Link from "next/link";
import { Instagram, Twitter, MessageCircle, Mail } from "lucide-react";
import { motion } from "framer-motion";

// Component for social links with animation
function SocialLink({
  href,
  icon,
  label,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <motion.div whileHover={{ y: 0, scale: 1.1 }} whileTap={{ scale: 0.9 }}>
      <Link
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="transition-colors hover:opacity-80"
      >
        {icon}
        <span className="sr-only">{label}</span>
      </Link>
    </motion.div>
  );
}

export default function Footer() {
  return (
    <footer className="bg-slate-900 border-t border-violet-400/30 py-6 md:py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-xl font-bold text-violet-500 mb-6 md:mb-0">
            TANDIL
          </div>
          <div className="flex space-x-6 mb-6 md:mb-0">
            <SocialLink
              href="mailto:hey@nodoserrano.org"
              icon={<Mail className="h-6 w-6" />}
              label="Email"
            />
            <SocialLink
              href="https://twitter.com/NodoSerrano"
              icon={<Twitter className="h-6 w-6" />}
              label="Twitter"
            />
            <SocialLink
              href="https://instagram.com/nodoserrano"
              icon={<Instagram className="h-6 w-6" />}
              label="Instagram"
            />
            <SocialLink
              href="https://whatsapp.com/channel/0029VbAvlX0Gk1FnUUeDII3g"
              icon={<MessageCircle className="h-6 w-6" />}
              label="WhatsApp"
            />
          </div>
          <div className="text-sm">
            © {new Date().getFullYear()} Nodo Serrano. Todos los derechos
            reservados.
          </div>
        </div>
      </div>
    </footer>
  );
}
