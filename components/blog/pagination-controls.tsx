import Link from "next/link"
import { ArrowLeft, ArrowRight } from "lucide-react"

export function PaginationControls({
  page,
  pages,
  basePath = "/blog",
}: {
  page: number
  pages: number
  basePath?: string
}) {
  if (pages <= 1) return null

  const buttonClass =
    "inline-flex items-center gap-2 rounded-br-[10px] rounded-tl-[10px] border-2 border-(--color-warm-yellow) px-[26px] py-[14px] font-inter text-body text-(--color-text-primary-light) transition-opacity hover:opacity-90"

  return (
    <div className="flex flex-wrap items-center justify-center gap-6">
      {page > 1 ? (
        <Link
          href={page - 1 <= 1 ? basePath : `${basePath}?page=${page - 1}`}
          className={buttonClass}
          style={{ boxShadow: "var(--shadow-btn-warm)" }}
        >
          <ArrowLeft className="h-4 w-4" />
          Anterior
        </Link>
      ) : (
        <span className={`${buttonClass} pointer-events-none opacity-30`}>
          <ArrowLeft className="h-4 w-4" />
          Anterior
        </span>
      )}

      <span className="font-inter text-caption text-(--color-text-primary-light)">
        Página {page} de {pages}
      </span>

      {page < pages ? (
        <Link
          href={`${basePath}?page=${page + 1}`}
          className={buttonClass}
          style={{ boxShadow: "var(--shadow-btn-warm)" }}
        >
          Siguiente
          <ArrowRight className="h-4 w-4" />
        </Link>
      ) : (
        <span className={`${buttonClass} pointer-events-none opacity-30`}>
          Siguiente
          <ArrowRight className="h-4 w-4" />
        </span>
      )}
    </div>
  )
}
