"use client";

import type React from "react";

export default function Footer() {
  return (
    <footer className="bg-slate-900 border-t border-violet-400/30 py-6 md:py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-xl mb-6 md:mb-0">
            Tandil, Argentina
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
