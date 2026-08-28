import { cn } from "@/lib/utils"

// Encabezado de sección compartido de la página Labs: label chico en
// mayúsculas + título Space Grotesk + regla de 3px. El color sigue el tono:
// gradiente warm en secciones claras, gradiente brand (frío) en las oscuras.
export function SectionHeading({
  label,
  title,
  tone = "light",
  align = "left",
  className,
}: {
  label: string
  title: string
  tone?: "light" | "dark"
  align?: "left" | "center"
  className?: string
}) {
  return (
    <div
      className={cn(
        "flex flex-col",
        align === "center" && "items-center text-center",
        className
      )}
    >
      <span
        className={cn(
          "font-inter text-caption font-medium uppercase tracking-[0.12em]",
          tone === "dark"
            ? "text-(--color-brand-mint)"
            : "text-(--color-warm-violet)"
        )}
      >
        {label}
      </span>

      <h2
        className={cn(
          "mt-3 font-display text-h2 font-bold md:text-h1",
          tone === "dark"
            ? "text-(--color-text-primary-dark)"
            : "text-(--color-text-primary-light)"
        )}
      >
        {title}
      </h2>

      <div
        className={cn(
          "mt-4 h-[3px] w-[120px] rounded-full",
          tone === "dark" ? "bg-gradient-brand" : "bg-gradient-warm"
        )}
      />
    </div>
  )
}
