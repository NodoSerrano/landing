import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { getLatestPosts, getFeaturedPost } from "@/lib/blog/markdown"
import BlogCard from "./blog-card"
import FeaturedPost from "./featured-post"
import { motion } from "framer-motion"

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
}

export default async function BlogSection() {
  const [featuredPost, latestPosts] = await Promise.all([
    getFeaturedPost(),
    getLatestPosts(3),
  ])

  // If there's a featured post, exclude it from the latest posts
  const posts = featuredPost
    ? latestPosts.filter((post) => post.slug !== featuredPost.slug).slice(0, 2)
    : latestPosts

  if (!featuredPost && posts.length === 0) {
    return null
  }

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">
            Blog
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-400">
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
            className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 px-6 py-3 font-medium text-white transition-all hover:from-cyan-700 hover:to-blue-700 hover:shadow-lg hover:shadow-cyan-900/30"
          >
            Ver todos los artículos
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}