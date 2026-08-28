import sanitizeHtml from "sanitize-html"

// Ghost returns already-sanitised HTML, but we re-sanitise as defence in depth.
// Using sanitize-html (a pure-JS parser) rather than DOMPurify keeps jsdom out
// of the serverless bundle — jsdom failing to boot in the Lambda is what made
// the article route 500 in production while /blog stayed fine.
const SANITIZE_OPTIONS: sanitizeHtml.IOptions = {
  allowedTags: [
    "p", "h1", "h2", "h3", "h4", "h5", "h6",
    "ul", "ol", "li", "strong", "em", "b", "i", "u", "s",
    "code", "pre", "a", "blockquote", "img", "figure", "figcaption",
    "hr", "br", "div", "span", "table", "thead", "tbody", "tr", "th", "td",
  ],
  allowedAttributes: {
    a: ["href", "title", "target", "rel"],
    img: ["src", "alt", "srcset", "sizes", "width", "height"],
    "*": ["class", "id"],
  },
  // Ghost embeds responsive images via protocol-relative / https URLs only.
  allowedSchemes: ["http", "https", "mailto"],
}

export function ArticleBody({ html }: { html: string }) {
  const sanitizedHtml = sanitizeHtml(html, SANITIZE_OPTIONS)

  return (
    <div className="flex flex-col gap-8">
      <div className="h-px w-full bg-gradient-warm" />
      <div
        className="prose prose-lg max-w-none font-inter text-(--color-text-muted) [&_a]:text-(--color-warm-red)! [&_a]:hover:text-(--color-warm-violet)! [&_code]:text-(--color-warm-red)! [&_code]:bg-black/5! [&_pre]:bg-black/5! [&_pre]:border-black/10! [&_p]:text-(--color-text-muted)! [&_li]:text-(--color-text-muted)! [&_h1]:text-(--color-text-primary-light)! [&_h2]:text-(--color-text-primary-light)! [&_h3]:text-(--color-text-primary-light)! [&_h4]:text-(--color-text-primary-light)! [&_blockquote]:text-(--color-warm-violet)! [&_strong]:text-(--color-text-primary-light)! [&_img]:rounded-lg! [&_img]:mx-auto! [&_figure]:my-8! [&_figcaption]:text-center! [&_figcaption]:text-(--color-text-muted)!"
        dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
      />
    </div>
  )
}
