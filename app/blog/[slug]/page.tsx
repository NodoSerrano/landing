import { notFound } from "next/navigation"
import Link from "next/link"
import SafeImage from "@/components/safe-image"
import { ArrowLeft, Calendar, Clock, User } from "lucide-react"
import { getPostBySlug, getAllPosts } from "@/lib/blog/markdown"

interface BlogPostPageProps {
  params: { slug: string }
}

export async function generateStaticParams() {
  try {
    console.log('[Static Params] Attempting to generate static params for blog posts')
    const posts = await getAllPosts()
    console.log(`[Static Params] Found ${posts.length} posts for static generation`)
    
    const params = posts.map((post) => ({
      slug: post.slug,
    }))
    
    console.log('[Static Params] Generated params:', params.map(p => p.slug))
    return params
  } catch (error) {
    console.error('[Static Params] Failed to generate static params:', error)
    // Return empty array to avoid build failure, pages will be generated on-demand
    return []
  }
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  
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
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  return (
    <article className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <div className="container mx-auto max-w-4xl px-4 py-12">
        <Link
          href="/blog"
          className="mb-8 inline-flex items-center gap-2 text-sm text-slate-400 transition-colors hover:text-cyan-400"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver al blog
        </Link>

        <header className="mb-12">
          {post.featured && (
            <div className="mb-6 inline-block rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 px-4 py-2 text-sm font-medium text-white shadow-lg">
              ⭐ Artículo destacado
            </div>
          )}
          
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Thumbnail */}
            <div className="w-full lg:w-64 h-64 flex-shrink-0 rounded-xl overflow-hidden border border-slate-700 shadow-lg">
              <SafeImage
                src={post.thumbnailUrl || '/blog/thumbnails/default-placeholder-square.svg'}
                fallbackSrc="/blog/thumbnails/default-placeholder-square.svg"
                alt={post.title}
                width={256}
                height={256}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Content */}
            <div className="flex-1">
              <h1 className="mb-6 bg-gradient-to-r from-white to-slate-200 bg-clip-text text-4xl font-bold leading-tight text-transparent md:text-5xl">
                {post.title}
              </h1>
              
              <p className="mb-8 text-xl leading-relaxed text-slate-300">
                {post.description}
              </p>

              <div className="flex flex-wrap items-center gap-6 text-sm text-slate-400 mb-6">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span className="font-medium">{post.author}</span>
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
                <div className="flex flex-wrap gap-3">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-slate-800/60 border border-slate-700 px-4 py-2 text-sm text-slate-300 backdrop-blur-sm transition-colors hover:bg-slate-700/60"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </header>

        <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-8 md:p-12 backdrop-blur-sm shadow-2xl">
          <div 
            className="prose prose-lg max-w-none [&>*]:text-white [&_p]:!text-white [&_h1]:!text-white [&_h2]:!text-white [&_h3]:!text-white [&_h4]:!text-white [&_h5]:!text-white [&_h6]:!text-white [&_li]:!text-white [&_strong]:!text-white [&_em]:!text-slate-100 [&_blockquote]:!text-slate-100 [&_a]:!text-cyan-400 hover:[&_a]:!text-cyan-300 [&_code]:!text-cyan-300 [&_code]:!bg-slate-800 [&_pre]:!bg-slate-800 [&_pre]:!border-slate-700"
            style={{ color: 'white' }}
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>

        <footer className="mt-12 border-t border-slate-800 pt-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 rounded-lg bg-slate-800/60 px-4 py-3 text-slate-300 transition-all hover:bg-slate-700/60 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Ver más artículos
          </Link>
        </footer>
      </div>
    </article>
  )
}