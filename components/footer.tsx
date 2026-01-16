"use client";

import type React from "react";
import LocationIcon from "./svgs/location-icon";

export default function Footer() {
  return (
    <footer className="layer2 neumorphism-border neumorphism-shadow py-4 md:py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-3">
          <div className="text-xl flex items-center gap-2">
            <a
              href="https://www.google.com/maps/place/San%20Martin%20864%2C%20Tandil%2C%20Buenos%20Aires%2C%20Argentina"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-slate-300 transition-colors flex gap-2 text-base"
              title="View on Google Maps"
            >
              <LocationIcon className="w-6 h-6" />
              <span>Tandil, Buenos Aires, Argentina.</span>
            </a>
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
