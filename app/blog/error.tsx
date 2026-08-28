"use client"

import { useEffect } from "react"
import Link from "next/link"
import { RefreshCw } from "lucide-react"

export default function BlogError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error("[blog] render error", error)
  }, [error])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-(--color-bg-light) px-4 text-center">
      <h1 className="font-display text-h2 font-bold text-(--color-text-primary-light)">
        No pudimos cargar el blog
      </h1>
      <p className="max-w-md font-inter text-body text-(--color-text-muted)">
        Hubo un problema al traer los artículos. Probá de nuevo en unos
        segundos.
      </p>

      <div className="flex flex-wrap items-center justify-center gap-4">
        <button
          type="button"
          onClick={reset}
          className="inline-flex items-center gap-2 rounded-br-[10px] rounded-tl-[10px] border-2 border-(--color-warm-yellow) px-[26px] py-[14px] font-inter text-body text-(--color-text-primary-light) transition-opacity hover:opacity-90"
          style={{ boxShadow: "var(--shadow-btn-warm)" }}
        >
          <RefreshCw className="h-4 w-4" />
          Reintentar
        </button>
        <Link
          href="/"
          className="font-inter text-body text-(--color-text-soft) underline-offset-4 transition-colors hover:text-(--color-warm-red) hover:underline"
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  )
}
