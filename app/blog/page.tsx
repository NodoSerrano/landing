"use client"

import { useState, useEffect } from "react"
import BlogCard from "@/components/blog-card"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import type { BlogPostWithSlug } from "@/lib/blog/schema"

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPostWithSlug[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await fetch("/api/blog/all")
        if (response.ok) {
          const data = await response.json()
          setPosts(data)
        }
      } catch (error) {
        console.error("Error fetching posts:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-cyan-950/20 to-gray-950">
      <div className="container mx-auto px-4 py-12">
        <div className="mb-12">
          <Link
            href="/"
            className="mb-8 inline-flex items-center gap-2 text-sm text-gray-400 transition-colors hover:text-cyan-400"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver al inicio
          </Link>
          
          <h1 className="mb-4 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-4xl font-bold text-transparent md:text-5xl">
            Blog
          </h1>
          <p className="text-lg text-gray-400">
            Explorando el futuro de Ethereum y blockchain desde Tandil
          </p>
        </div>

        {loading ? (
          <div className="rounded-lg border border-cyan-900/20 bg-gradient-to-br from-cyan-950/30 to-blue-950/30 p-12 text-center backdrop-blur-sm">
            <p className="text-gray-400">Cargando artículos...</p>
          </div>
        ) : posts.length === 0 ? (
          <div className="rounded-lg border border-cyan-900/20 bg-gradient-to-br from-cyan-950/30 to-blue-950/30 p-12 text-center backdrop-blur-sm">
            <p className="text-gray-400">
              No hay artículos publicados todavía. ¡Vuelve pronto!
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, index) => (
              <BlogCard key={post.slug} post={post} index={index} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}