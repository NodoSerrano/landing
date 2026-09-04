import type { Metadata } from "next"
import Header from "@/components/layout/header"
import Footer from "@/components/footer"
import { FadeIn } from "@/components/motion/fade-in"
import { PostCard } from "@/components/blog/post-card"
import { PaginationControls } from "@/components/blog/pagination-controls"
import { Breadcrumb } from "@/components/blog/breadcrumb"
import { getGhostPosts } from "@/lib/ghost"

export const metadata: Metadata = {
  title: "Blog | Nodo Serrano",
  description: "Pensamientos, notas y experimentos de la comunidad de Ethereum en Tandil.",
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>
}) {
  const { page: pageParam } = await searchParams
  const page = Math.max(1, Number(pageParam) || 1)
  const { posts, meta } = await getGhostPosts({ page, limit: 9 })

  return (
    <div className="flex min-h-screen flex-col bg-(--color-bg-light)">
      <Header alwaysSolid />

      <main className="flex-1 px-4 pt-32 pb-20 md:px-5 md:pt-40">
        <div className="mx-auto flex w-full max-w-6xl flex-col">
          <Breadcrumb
            items={[{ label: "Inicio", href: "/" }, { label: "Blog" }]}
          />

          <div className="mt-16 flex flex-col gap-12 md:mt-24">
            <FadeIn className="flex flex-col items-center gap-2 text-center">
              <h1 className="font-display text-h1 font-bold">
                <span className="text-(--color-text-primary-light)">Nuestro</span>{" "}
                <span className="inline-block rounded-[4px] bg-gradient-warm px-3 py-1 text-(--color-text-primary-dark)">
                  BLOG
                </span>
              </h1>
              <p className="font-display text-h3 font-medium text-(--color-warm-violet)">
                Pensamientos, notas y experimentos
              </p>
            </FadeIn>

            {posts.length === 0 ? (
              <FadeIn
                className="flex flex-col items-center justify-center gap-2 rounded-[24px] rounded-tr-none border border-(--color-warm-yellow) bg-(--color-bg-elev-dark) px-6 py-16 text-center"
              >
                <p className="font-display text-h4 font-medium text-(--color-text-primary-dark)">
                  Todavía no hay artículos publicados
                </p>
                <p className="font-inter text-body-sm text-(--color-text-secondary-dark)">
                  Volvé pronto para leer las últimas novedades
                </p>
              </FadeIn>
            ) : (
              <FadeIn className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {posts.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </FadeIn>
            )}

            <FadeIn>
              <PaginationControls page={meta.pagination.page} pages={meta.pagination.pages} />
            </FadeIn>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
