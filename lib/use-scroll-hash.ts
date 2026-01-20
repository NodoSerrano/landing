"use client";

import { useEffect, useCallback } from "react";

interface SectionInfo {
  id: string;
  element: Element;
}

export function useScrollHash() {
  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, []);

  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    const sectionInfos: SectionInfo[] = Array.from(sections).map((section) => ({
      id: section.id,
      element: section,
    }));

    if (sectionInfos.length === 0) return;

    const observerOptions = {
      root: null,
      rootMargin: "-50% 0px -50% 0px", // Trigger when section is in the center
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      const visibleEntry = entries.find((entry) => entry.isIntersecting);

      if (visibleEntry) {
        const sectionId = visibleEntry.target.id;
        // Update URL hash without triggering scroll
        const newUrl = `${window.location.pathname}${window.location.search}#${sectionId}`;
        window.history.replaceState(null, "", newUrl);
      }
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Observe all sections
    sectionInfos.forEach(({ element }) => {
      observer.observe(element);
    });

    // Cleanup
    return () => {
      observer.disconnect();
    };
  }, []);

  return { scrollToSection };
}