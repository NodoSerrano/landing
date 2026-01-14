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
    <motion.div
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <Link
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="transition-colors hover:opacity-80 block"
      >
        {icon}
        <span className="sr-only">{label}</span>
      </Link>
    </motion.div>
  );
}

export default function SocialSidebar() {
  return (
    <div className="fixed right-1 top-1/4 transform -translate-y-1/2 z-40">
      <div className="neumorphism-bg-raised neumorphism-border rounded-lg px-3 py-4">
        <div className="flex flex-col items-center gap-4">
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
      </div>
    </div>
  );
}
