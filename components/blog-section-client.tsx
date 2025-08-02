"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import BlogCard from "./blog-card"
import FeaturedPost from "./featured-post"
import BlogModal from "./blog-modal"
import { motion } from "framer-motion"
import type { BlogPostWithSlug } from "@/lib/blog/schema"

// Skeleton component for loading state
function BlogSectionSkeleton() {
  return (
    <div className="space-y-12">
      {/* Featured post skeleton */}
      <div className="bg-slate-800/60 backdrop-blur-sm border border-slate-700 rounded-lg overflow-hidden p-6 lg:p-8">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* Thumbnail skeleton */}
          <div className="w-full lg:w-80 h-48 lg:h-64 bg-slate-700 animate-pulse rounded-lg" />
          
          {/* Content skeleton */}
          <div className="flex-1 space-y-4">
            <div className="h-3 bg-slate-700 animate-pulse rounded w-20" />
            <div className="h-8 bg-slate-700 animate-pulse rounded w-3/4" />
            <div className="space-y-2">
              <div className="h-4 bg-slate-700 animate-pulse rounded w-full" />
              <div className="h-4 bg-slate-700 animate-pulse rounded w-5/6" />
            </div>
            <div className="flex gap-4 pt-4">
              <div className="h-4 bg-slate-700 animate-pulse rounded w-24" />
              <div className="h-4 bg-slate-700 animate-pulse rounded w-20" />
              <div className="h-4 bg-slate-700 animate-pulse rounded w-16" />
            </div>
            <div className="flex gap-2 pt-2">
              <div className="h-6 bg-slate-700 animate-pulse rounded-full w-16" />
              <div className="h-6 bg-slate-700 animate-pulse rounded-full w-20" />
            </div>
          </div>
        </div>
      </div>

      {/* Latest posts skeleton */}
      <div className="grid gap-6 md:grid-cols-2">
        {[1, 2].map((i) => (
          <div key={i} className="bg-slate-800/60 backdrop-blur-sm border border-slate-700 rounded-lg overflow-hidden p-4">
            <div className="flex gap-4">
              <div className="w-20 h-20 bg-slate-700 animate-pulse rounded-lg flex-shrink-0" />
              <div className="flex-1 space-y-2">
                <div className="h-5 bg-slate-700 animate-pulse rounded w-full" />
                <div className="h-3 bg-slate-700 animate-pulse rounded w-4/5" />
                <div className="flex gap-2 pt-2">
                  <div className="h-3 bg-slate-700 animate-pulse rounded w-16" />
                  <div className="h-3 bg-slate-700 animate-pulse rounded w-12" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Button skeleton */}
      <div className="text-center">
        <div className="inline-block h-12 bg-slate-700 animate-pulse rounded-lg w-48" />
      </div>
    </div>
  )
}

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
  const [allPosts, setAllPosts] = useState<BlogPostWithSlug[]>([])
  const [modalPost, setModalPost] = useState<BlogPostWithSlug | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    async function fetchPosts() {
      try {
        const [postsResponse, allPostsResponse] = await Promise.all([
          fetch("/api/blog/posts"),
          fetch("/api/blog/all")
        ])
        
        if (postsResponse.ok) {
          const data = await postsResponse.json()
          setFeaturedPost(data.featured)
          setPosts(data.latest)
        }
        
        if (allPostsResponse.ok) {
          const allData = await allPostsResponse.json()
          setAllPosts(allData)
        }
      } catch (error) {
        console.error("Error fetching blog posts:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])

  const openModal = (post: BlogPostWithSlug) => {
    // Pre-load content to make modal faster
    setModalPost(post)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setModalPost(null)
  }

  const navigateModal = (direction: 'prev' | 'next') => {
    if (!modalPost || allPosts.length === 0) return
    
    const currentIndex = allPosts.findIndex(post => post.slug === modalPost.slug)
    let newIndex: number
    
    if (direction === 'prev') {
      newIndex = currentIndex > 0 ? currentIndex - 1 : allPosts.length - 1
    } else {
      newIndex = currentIndex < allPosts.length - 1 ? currentIndex + 1 : 0
    }
    
    setModalPost(allPosts[newIndex])
  }

  const getNavigationState = () => {
    if (!modalPost || allPosts.length === 0) {
      return { prev: false, next: false }
    }
    
    const currentIndex = allPosts.findIndex(post => post.slug === modalPost.slug)
    return {
      prev: allPosts.length > 1,
      next: allPosts.length > 1
    }
  }

  if (loading) {
    return (
      <section className="py-12 md:py-16 bg-gradient-to-b from-slate-800 to-slate-700">
        <div className="container mx-auto px-4">
          <BlogSectionSkeleton />
        </div>
      </section>
    )
  }

  if (!featuredPost && posts.length === 0) {
    return null
  }

  return (
    <section className="py-12 md:py-16 bg-gradient-to-b from-slate-800 to-slate-700">
      <div className="container mx-auto px-4">

        {featuredPost && (
          <div className="mb-12">
            <FeaturedPost post={featuredPost} onOpen={openModal} />
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
              <BlogCard key={post.slug} post={post} index={index} onOpen={openModal} />
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

        <BlogModal
          isOpen={isModalOpen}
          onClose={closeModal}
          post={modalPost}
          onNavigate={navigateModal}
          canNavigate={getNavigationState()}
        />
      </div>
    </section>
  )
}