import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, Calendar, Clock, User } from "lucide-react"
import Header from "@/components/layout/header"
import Footer from "@/components/footer"
import { FadeIn } from "@/components/motion/fade-in"
import { ArticleBody } from "@/components/blog/article-body"
import { getGhostPostBySlug } from "@/lib/ghost"

interface BlogPostPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getGhostPostBySlug(slug)

  if (!post) {
    return { title: "Artículo no encontrado | Nodo Serrano" }
  }

  return {
    title: `${post.title} | Nodo Serrano`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.published_at,
      authors: post.authors?.map((author) => author.name),
      images: post.feature_image ? [{ url: post.feature_image }] : undefined,
    },
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = await getGhostPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const formattedDate = new Date(post.published_at).toLocaleDateString("es-AR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <div className="flex min-h-screen flex-col bg-(--color-bg-light)">
      <Header alwaysSolid />

      <main className="flex-1 px-4 pt-28 pb-20 md:pt-36">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-10">
          <FadeIn className="flex flex-col gap-6">
            <div className="relative h-64 w-full overflow-hidden rounded-[24px] rounded-tr-none border border-(--color-warm-yellow) md:h-96">
              <Image
                src={post.feature_image || "/images/cowork.jpeg"}
                alt={post.title}
                fill
                sizes="100vw"
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-warm mix-blend-overlay" />
            </div>

            <h1 className="font-display text-h1 font-bold leading-tight text-(--color-text-primary-light)">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 font-inter text-body-sm text-(--color-text-primary-light)">
              {post.authors && post.authors[0] && (
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-(--color-warm-violet)" />
                  <span className="font-medium">{post.authors[0].name}</span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-(--color-warm-violet)" />
                <time dateTime={post.published_at}>{formattedDate}</time>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-(--color-warm-violet)" />
                <span>{post.reading_time} min de lectura</span>
              </div>
            </div>

            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag.slug}
                    className="rounded-full border border-(--color-warm-yellow) px-3 py-1 font-inter text-body-sm text-(--color-text-primary-light)"
                  >
                    #{tag.name}
                  </span>
                ))}
              </div>
            )}
          </FadeIn>

          <FadeIn>
            <ArticleBody html={post.html} />
          </FadeIn>

          <FadeIn className="flex justify-center">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 rounded-br-[10px] rounded-tl-[10px] border-2 border-(--color-warm-yellow) px-[26px] py-[14px] font-inter text-body text-(--color-text-primary-light) transition-opacity hover:opacity-90"
              style={{ boxShadow: "var(--shadow-btn-warm)" }}
            >
              <ArrowLeft className="h-4 w-4" />
              Ver más artículos
            </Link>
          </FadeIn>
        </div>
      </main>

      <Footer />
    </div>
  )
}
