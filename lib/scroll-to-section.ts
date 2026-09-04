// Shared by header.tsx (nav click on "/") and ScrollHashManager (mount-time
// deep link, e.g. arriving at "/#events" from another page) so both scroll
// the same way — previously each had its own scrollIntoView call and only
// one of them knew which sections should be centered.

// These sections are short enough to sit nicely centered; every other
// section keeps the default top-alignment.
const CENTERED_SECTIONS = new Set(["events", "sponsors"])

export function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({
    behavior: "smooth",
    block: CENTERED_SECTIONS.has(id) ? "center" : "start",
  })
}
