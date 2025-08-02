import Link from "next/link"
import { Calendar, Clock, User } from "lucide-react"
import { motion } from "framer-motion"
import type { BlogPostWithSlug } from "@/lib/blog/schema"

interface BlogCardProps {
  post: BlogPostWithSlug
  index?: number
}

export default function BlogCard({ post, index = 0 }: BlogCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="group relative"
    >
      <Link href={`/blog/${post.slug}`} className="block">
        <div className="relative overflow-hidden rounded-lg border border-cyan-900/20 bg-gradient-to-br from-cyan-950/50 to-blue-950/50 p-6 backdrop-blur-sm transition-all duration-300 hover:border-cyan-800/40 hover:shadow-lg hover:shadow-cyan-900/20">
          {post.featured && (
            <div className="absolute right-2 top-2 rounded bg-gradient-to-r from-cyan-600 to-blue-600 px-2 py-1 text-xs font-medium text-white">
              Featured
            </div>
          )}
          
          <h3 className="mb-2 text-xl font-semibold text-white transition-colors group-hover:text-cyan-400">
            {post.title}
          </h3>
          
          <p className="mb-4 line-clamp-2 text-gray-400">
            {post.description}
          </p>
          
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <User className="h-3 w-3" />
              <span>{post.author}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              <time dateTime={post.date}>
                {new Date(post.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
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
            <div className="mt-4 flex flex-wrap gap-2">
              {post.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-cyan-900/30 px-2 py-1 text-xs text-cyan-400"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </Link>
    </motion.article>
  )
}