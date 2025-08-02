import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Calendar, Clock, User } from "lucide-react"
import { getPostBySlug, getAllPosts } from "@/lib/blog/markdown"

interface BlogPostPageProps {
  params: { slug: string }
}

export async function generateStaticParams() {
  const posts = await getAllPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const post = await getPostBySlug(params.slug)
  
  if (!post) {
    return {
      title: "Post Not Found | Nodo Serrano",
    }
  }

  return {
    title: `${post.title} | Nodo Serrano`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
    },
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await getPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  return (
    <article className="min-h-screen bg-gradient-to-b from-gray-950 via-cyan-950/20 to-gray-950">
      <div className="container mx-auto max-w-4xl px-4 py-12">
        <Link
          href="/blog"
          className="mb-8 inline-flex items-center gap-2 text-sm text-gray-400 transition-colors hover:text-cyan-400"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver al blog
        </Link>

        <header className="mb-8">
          {post.featured && (
            <div className="mb-4 inline-block rounded bg-gradient-to-r from-cyan-600 to-blue-600 px-3 py-1 text-sm font-medium text-white">
              Artículo destacado
            </div>
          )}
          
          <h1 className="mb-4 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-4xl font-bold text-transparent md:text-5xl">
            {post.title}
          </h1>
          
          <p className="mb-6 text-lg text-gray-400">
            {post.description}
          </p>

          <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span>{post.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <time dateTime={post.date}>
                {new Date(post.date).toLocaleDateString("es-ES", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>{post.readingTime.text}</span>
            </div>
          </div>

          {post.tags.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-cyan-900/30 px-3 py-1 text-sm text-cyan-400"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </header>

        <div className="rounded-lg border border-cyan-900/20 bg-gradient-to-br from-cyan-950/30 to-blue-950/30 p-8 backdrop-blur-sm">
          <div 
            className="prose prose-lg prose-invert prose-headings:text-white prose-p:text-gray-300 prose-a:text-cyan-400 prose-a:no-underline hover:prose-a:text-cyan-300 prose-strong:text-white prose-code:text-cyan-400 prose-pre:bg-gray-900/50 prose-pre:border prose-pre:border-gray-800 max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>

        <footer className="mt-12 border-t border-gray-800 pt-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-cyan-400 transition-colors hover:text-cyan-300"
          >
            <ArrowLeft className="h-4 w-4" />
            Ver más artículos
          </Link>
        </footer>
      </div>
    </article>
  )
}