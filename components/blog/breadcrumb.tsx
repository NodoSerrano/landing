import Link from "next/link"
import { ChevronRight } from "lucide-react"

export interface BreadcrumbItem {
  label: string
  href?: string
}

// Producción auto-deploya a nodoserrano.org (ver CLAUDE.md). Se usa sólo para
// construir las URLs absolutas del JSON-LD de BreadcrumbList.
const SITE_URL = "https://nodoserrano.org"

export function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      ...(item.href ? { item: `${SITE_URL}${item.href}` } : {}),
    })),
  }

  return (
    <nav aria-label="Migas de pan">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ol className="flex flex-wrap items-center gap-1 font-inter text-[0.75rem] font-light">
        {items.map((item, index) => {
          const isLast = index === items.length - 1

          return (
            <li key={`${item.label}-${index}`} className="flex items-center gap-1">
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className="text-(--color-text-soft) transition-colors hover:text-(--color-warm-red)"
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  aria-current={isLast ? "page" : undefined}
                  className={
                    isLast
                      ? "max-w-[60vw] truncate font-normal text-(--color-text-primary-light) sm:max-w-sm"
                      : "text-(--color-text-soft)"
                  }
                >
                  {item.label}
                </span>
              )}

              {!isLast && (
                <ChevronRight
                  className="h-3.5 w-3.5 shrink-0 text-(--color-text-soft)/60"
                  aria-hidden="true"
                />
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
