import React from "react"
import { Calendar, Clock, User } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"
import SafeImage from "./safe-image"
import type { BlogPostWithSlug } from "@/lib/blog/schema"

interface BlogCardProps {
  post: BlogPostWithSlug
  index?: number
  onOpen?: (post: BlogPostWithSlug) => void
}

export default function BlogCard({ post, index = 0, onOpen }: BlogCardProps) {
  const handleClick = (e: React.MouseEvent) => {
    if (onOpen) {
      e.preventDefault()
      onOpen(post)
    }
    // If no onOpen provided, let the Link handle navigation
  }

  const cardContent = (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="group relative"
    >
      <div onClick={handleClick} className="block cursor-pointer">
        <div className="relative overflow-hidden rounded-xl border border-slate-800 bg-slate-900/60 p-4 backdrop-blur-sm transition-all duration-300 hover:border-slate-700 hover:bg-slate-900/80 hover:shadow-xl hover:shadow-slate-900/50 hover:-translate-y-1">
          {post.featured && (
            <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-gradient-to-r from-cyan-600 to-blue-600 flex items-center justify-center text-white text-sm z-10">
              ⭐
            </div>
          )}
          
          <div className="flex gap-4">
            {/* Thumbnail - Always present, using placeholder if no image */}
            <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden border border-slate-700">
              <SafeImage
                src={post.thumbnailUrl || '/blog/thumbnails/default-placeholder-square.svg'}
                fallbackSrc="/blog/thumbnails/default-placeholder-square.svg"
                alt={post.title}
                fill
                className="object-cover transition-transform group-hover:scale-105"
                sizes="80px"
              />
            </div>
            
            {/* Content */}
            <div className="flex-1 min-w-0">
              <h3 className="mb-2 text-lg font-bold text-white transition-colors group-hover:text-cyan-400 leading-tight">
                {post.title}
              </h3>
              
              <p className="mb-3 line-clamp-2 text-sm text-slate-300 leading-relaxed">
                {post.description}
              </p>
              
              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 mb-2">
                <div className="flex items-center gap-1">
                  <User className="h-3 w-3" />
                  <span className="font-medium">{post.author}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  <time dateTime={post.date}>
                    {new Date(post.date).toLocaleDateString("es-ES", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </time>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  <span>{post.readingTime.text}</span>
                </div>
              </div>
              
              {post.tags.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-slate-800/60 border border-slate-700 px-2 py-1 text-xs text-slate-400 transition-colors group-hover:text-slate-300"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  )

  // If onOpen is provided, use modal behavior; otherwise, use Link navigation
  if (onOpen) {
    return cardContent
  } else {
    return (
      <Link href={`/blog/${post.slug}`} className="block">
        {cardContent}
      </Link>
    )
  }
}