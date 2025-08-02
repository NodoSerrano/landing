"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import BlogCard from "./blog-card"
import FeaturedPost from "./featured-post"
import { motion } from "framer-motion"
import type { BlogPostWithSlug } from "@/lib/blog/schema"

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
}

export default function BlogSectionClient() {
  const [featuredPost, setFeaturedPost] = useState<BlogPostWithSlug | null>(null)
  const [posts, setPosts] = useState<BlogPostWithSlug[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await fetch("/api/blog/posts")
        if (response.ok) {
          const data = await response.json()
          setFeaturedPost(data.featured)
          setPosts(data.latest)
        }
      } catch (error) {
        console.error("Error fetching blog posts:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])

  if (loading) {
    return null
  }

  if (!featuredPost && posts.length === 0) {
    return null
  }

  return (
    <section className="py-16 md:py-20 bg-gradient-to-b from-slate-800 to-slate-700">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h2 className="mb-4 text-2xl md:text-3xl font-bold text-off-white">
            Blog
          </h2>
          <p className="mx-auto max-w-2xl text-base md:text-lg text-off-white">
            Explorando el futuro de Ethereum y blockchain desde Tandil
          </p>
        </motion.div>

        {featuredPost && (
          <div className="mb-12">
            <FeaturedPost post={featuredPost} />
          </div>
        )}

        {posts.length > 0 && (
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-12 grid gap-6 md:grid-cols-2"
          >
            {posts.map((post, index) => (
              <BlogCard key={post.slug} post={post} index={index} />
            ))}
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-violet-500 to-blue-500 hover:from-violet-600 hover:to-blue-600 px-6 py-3 font-medium text-off-white transition-all hover:shadow-lg hover:shadow-violet-900/30"
          >
            Ver todos los artículos
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}