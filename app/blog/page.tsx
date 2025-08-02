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
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <div className="container mx-auto px-4 py-12">
        <div className="mb-12">
          <Link
            href="/"
            className="mb-8 inline-flex items-center gap-2 text-sm text-slate-400 transition-colors hover:text-cyan-400"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver al inicio
          </Link>
          
          <h1 className="mb-6 bg-gradient-to-r from-white to-slate-200 bg-clip-text text-4xl font-bold text-transparent md:text-5xl">
            Blog
          </h1>
          <p className="text-xl text-slate-300 leading-relaxed">
            Explorando el futuro de Ethereum y blockchain desde Tandil
          </p>
        </div>

        {loading ? (
          <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-12 text-center backdrop-blur-sm">
            <div className="animate-pulse">
              <div className="h-4 bg-slate-700 rounded w-1/3 mx-auto"></div>
            </div>
            <p className="text-slate-400 mt-4">Cargando artículos...</p>
          </div>
        ) : posts.length === 0 ? (
          <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-12 text-center backdrop-blur-sm">
            <p className="text-slate-400 text-lg">
              No hay artículos publicados todavía. ¡Vuelve pronto!
            </p>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, index) => (
              <BlogCard key={post.slug} post={post} index={index} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}