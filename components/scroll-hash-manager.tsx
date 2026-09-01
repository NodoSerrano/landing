"use client";

import { useEffect } from "react";

// Landing-page mount side effect: scroll to the URL fragment on first load.
// Arriving at "/#section" via client-side routing doesn't trigger the browser's
// native fragment scroll, so do it manually. Scroll-spy + hash sync while
// scrolling lives in components/layout/header.tsx.
export function ScrollHashManager() {
  useEffect(() => {
    const id = window.location.hash.replace("#", "");
    if (!id) return;
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return null;
}
