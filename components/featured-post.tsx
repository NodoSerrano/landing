import React from "react"
import { Calendar, Clock, User, ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import SafeImage from "./safe-image"
import type { BlogPostWithSlug } from "@/lib/blog/schema"

interface FeaturedPostProps {
  post: BlogPostWithSlug
  onOpen?: (post: BlogPostWithSlug) => void
}

export default function FeaturedPost({ post, onOpen }: FeaturedPostProps) {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    if (onOpen) {
      onOpen(post)
    }
  }
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="group relative"
    >
      <div onClick={handleClick} className="block cursor-pointer">
        <div className="relative overflow-hidden rounded-xl border border-slate-800 bg-slate-900/60 p-8 backdrop-blur-sm transition-all duration-300 hover:border-slate-700 hover:bg-slate-900/80 hover:shadow-2xl hover:shadow-slate-900/50 hover:-translate-y-1">
          <div className="absolute right-4 top-4 rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 px-4 py-2 text-sm font-medium text-white shadow-lg">
            ⭐ Destacado
          </div>
          
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Thumbnail - Always present, using placeholder if no image */}
            <div className="w-48 h-48 flex-shrink-0 rounded-lg overflow-hidden">
              <SafeImage
                src={post.thumbnailUrl || '/blog/thumbnails/default-placeholder-square.svg'}
                fallbackSrc="/blog/thumbnails/default-placeholder-square.svg"
                alt={post.title}
                width={192}
                height={192}
                className="w-full h-full object-cover transition-transform group-hover:scale-105"
              />
            </div>
            
            {/* Content */}
            <div className="flex-1">
              <h2 className="mb-4 text-2xl font-bold text-white transition-colors group-hover:text-cyan-400 md:text-3xl leading-tight">
                {post.title}
              </h2>
              
              <p className="mb-4 text-lg text-slate-300 leading-relaxed">
                {post.description}
              </p>
              
              {post.excerpt && (
                <p className="mb-6 text-slate-400 leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>
              )}
            </div>
          </div>
          
          <div className="mb-6 flex flex-wrap items-center gap-6 text-sm text-slate-400">
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
            <div className="mb-8 flex flex-wrap gap-2">
              {post.tags.slice(0, 4).map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-slate-800/60 border border-slate-700 px-4 py-2 text-sm text-slate-300 transition-colors group-hover:text-slate-200"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          <div className="flex items-center gap-3 rounded-lg bg-slate-800/40 px-4 py-3 text-cyan-400 transition-all group-hover:bg-slate-800/60 group-hover:text-cyan-300">
            <span className="font-medium">Leer artículo completo</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </div>
        </div>
      </div>
    </motion.article>
  )
}