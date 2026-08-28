import Link from "next/link"
import Image from "next/image"
import type { GhostPost } from "@/lib/ghost"

export function PostCard({ post }: { post: GhostPost }) {
  const formattedDate = new Date(post.published_at).toLocaleDateString("es-AR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="flex h-full flex-col overflow-hidden rounded-[24px] rounded-tr-none border border-(--color-warm-yellow) transition-opacity hover:opacity-90"
      style={{ boxShadow: "var(--shadow-neumorphic-dark)" }}
    >
      <div className="relative h-48 w-full shrink-0 overflow-hidden">
        <Image
          src={post.feature_image || "/images/cowork.webp"}
          alt={post.title}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-warm mix-blend-overlay" />
      </div>

      <div className="flex flex-1 flex-col gap-3 bg-(--color-bg-elev-dark) p-5">
        <h3 className="font-display text-h4 font-bold leading-tight text-(--color-text-primary-dark) line-clamp-2">
          {post.title}
        </h3>
        <p className="line-clamp-2 font-inter text-body-sm text-(--color-text-primary-dark)">
          {post.excerpt}
        </p>
        <time dateTime={post.published_at} className="mt-auto font-inter text-caption uppercase tracking-wide text-(--color-text-secondary-dark)">
          {formattedDate} · {post.reading_time} min de lectura
        </time>
      </div>
    </Link>
  )
}
