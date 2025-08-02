import Link from "next/link"
import { Calendar, Clock, User, ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import type { BlogPostWithSlug } from "@/lib/blog/schema"

interface FeaturedPostProps {
  post: BlogPostWithSlug
}

export default function FeaturedPost({ post }: FeaturedPostProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="group relative"
    >
      <Link href={`/blog/${post.slug}`} className="block">
        <div className="relative overflow-hidden rounded-xl border border-cyan-800/40 bg-gradient-to-br from-cyan-950/60 to-blue-950/60 p-8 backdrop-blur-sm transition-all duration-300 hover:border-cyan-700/60 hover:shadow-2xl hover:shadow-cyan-900/30">
          <div className="absolute right-4 top-4 rounded bg-gradient-to-r from-cyan-600 to-blue-600 px-3 py-1 text-sm font-medium text-white">
            Destacado
          </div>
          
          <h2 className="mb-3 text-2xl font-bold text-white transition-colors group-hover:text-cyan-400 md:text-3xl">
            {post.title}
          </h2>
          
          <p className="mb-6 line-clamp-3 text-lg text-gray-400">
            {post.description}
          </p>
          
          <div className="mb-6 flex flex-wrap items-center gap-6 text-sm text-gray-500">
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
            <div className="mb-6 flex flex-wrap gap-2">
              {post.tags.slice(0, 4).map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-cyan-900/40 px-3 py-1 text-sm text-cyan-400"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <div className="flex items-center gap-2 text-cyan-400 transition-colors group-hover:text-cyan-300">
            <span className="font-medium">Leer artículo completo</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </div>
        </div>
      </Link>
    </motion.article>
  )
}