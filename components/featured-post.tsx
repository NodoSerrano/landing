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
      className="relative"
    >
      <div onClick={handleClick} className="block cursor-pointer">
        <div className="relative overflow-hidden rounded-xl neumorphism-bg-raised neumorphism-border p-8">
          <div className="absolute right-4 top-4 rounded-full bg-cyan-600 border border-cyan-500 px-4 py-2 text-sm font-medium">
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
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Content */}
            <div className="flex-1">
              <h2 className="mb-4 text-2xl font-bold md:text-3xl leading-tight">
                {post.title}
              </h2>
              
              <p className="mb-4 text-lg leading-relaxed">
                {post.description}
              </p>
              
              {post.excerpt && (
                <p className="mb-6 opacity-80 leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>
              )}
            </div>
          </div>
          
          <div className="mb-6 flex flex-wrap items-center gap-6 text-sm opacity-80">
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
                  className="rounded-full neumorphism-bg-raised neumorphism-border px-4 py-2 text-sm"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          <div className="flex items-center gap-3 rounded-lg neumorphism-bg-raised neumorphism-border px-4 py-3 text-cyan-400">
            <span className="font-medium">Leer artículo completo</span>
            <ArrowRight className="h-4 w-4" />
          </div>
        </div>
      </div>
    </motion.article>
  )
}