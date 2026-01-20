"use client";

import type React from "react";
import { motion } from "framer-motion";

// Simple animation variant: fade in with slight Y movement
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

// Section component props
interface SectionProps {
  id?: string;
  className?: string;
  children: React.ReactNode;
  animated?: boolean;
}

// Reusable Section component
export function Section({
  id,
  className = "",
  children,
  animated = false,
}: SectionProps) {
  const baseClasses = "py-12 md:py-16 bg-slate-800";

  const content = <div>{children}</div>;

  if (!animated) {
    return (
      <section id={id} className={`${baseClasses} ${className}`}>
        {content}
      </section>
    );
  }

  return (
    <section id={id} className={`${baseClasses} ${className}`}>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
      >
        {children}
      </motion.div>
    </section>
  );
}

// Section Header component
interface SectionHeaderProps {
  title: string;
  description?: string;
  className?: string;
}

export function SectionHeader({
  title,
  description,
  className = "",
}: SectionHeaderProps) {
  return (
    <div className={`text-center mb-12 ${className}`}>
      <h2 className="text-2xl md:text-3xl font-bold mb-6">{title}</h2>
      {description && (
        <p className="text-lg max-w-2xl mx-auto">{description}</p>
      )}
    </div>
  );
}

// Export animation variant for use in other components
export { fadeInUp };
