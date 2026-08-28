"use client";

import { useEffect } from "react";
import { useScrollHash } from "@/lib/use-scroll-hash";

// Client-only side effects for the landing page: scroll-spy that keeps the URL
// hash in sync, plus a manual scroll-to-fragment on mount (arriving from
// "/#section" via client-side routing doesn't trigger the browser's native
// fragment scroll). Split out of page.tsx so the page itself stays a server
// component and can fetch data server-side.
export function ScrollHashManager() {
  useScrollHash();

  useEffect(() => {
    const id = window.location.hash.replace("#", "");
    if (!id) return;
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return null;
}
