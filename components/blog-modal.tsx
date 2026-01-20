"use client"

import { useState, useEffect } from "react"
import { X, Calendar, Clock, User, ArrowLeft, ArrowRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import SafeImage from "./safe-image"
import { Button } from "@/components/ui/button"
import type { BlogPostWithSlug } from "@/lib/blog/schema"

interface BlogModalProps {
  isOpen: boolean
  onClose: () => void
  post: BlogPostWithSlug | null
  onNavigate?: (direction: 'prev' | 'next') => void
  canNavigate?: { prev: boolean; next: boolean }
}

export default function BlogModal({ isOpen, onClose, post, onNavigate, canNavigate }: BlogModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
      if (e.key === 'ArrowLeft' && canNavigate?.prev && onNavigate) {
        onNavigate('prev')
      }
      if (e.key === 'ArrowRight' && canNavigate?.next && onNavigate) {
        onNavigate('next')
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
      
      // Focus trap: focus the modal when it opens
      const modalElement = document.querySelector('[role="dialog"]') as HTMLElement
      if (modalElement) {
        modalElement.focus()
      }
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose, onNavigate, canNavigate])

  if (!post) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.1 }}
            className="fixed inset-0 z-50 bg-black/70"
            onClick={onClose}
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className=" max-w-6xl mx-auto fixed top-16 bottom-16 left-4 right-4 z-50 flex flex-col overflow-hidden rounded-xl neumorphism-shadow neumorphism-border layer2"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
            tabIndex={-1}
          >
            {/* Header */}
            <div className="flex-shrink-0 flex items-center justify-between neumorphism-shadow p-3 md:p-4" style={{ borderBottom: '1px solid color-mix(in srgb, var(--bg-color) 70%, white 8%)' }}>
              <div className="flex items-center gap-4">
                {onNavigate && (
                  <div className="flex items-center gap-2">
                    <Button
                      onClick={() => onNavigate('prev')}
                      disabled={!canNavigate?.prev}
                      variant="ghost"
                      size="icon"
                      aria-label="Artículo anterior"
                    >
                      <ArrowLeft className="h-4 w-4" />
                    </Button>
                    <Button
                      onClick={() => onNavigate('next')}
                      disabled={!canNavigate?.next}
                      variant="ghost"
                      size="icon"
                      aria-label="Artículo siguiente"
                    >
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                )}
                
                {post.featured && (
                  <div className="rounded-lg bg-cyan-600 px-2 py-1 text-xs font-medium text-white">
                    ⭐ Destacado
                  </div>
                )}
              </div>
              
              <Button
                onClick={onClose}
                variant="ghost"
                size="icon"
                aria-label="Cerrar modal"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto scroll-smooth p-4 md:p-5" style={{ scrollbarWidth: 'thin', scrollbarColor: 'color-mix(in srgb, var(--bg-color) 70%, white 8%) var(--bg-color)' }}>
              <article className="mx-auto max-w-4xl">
                {/* Article Header */}
                <header className="mb-8">
                  <div className="flex flex-col lg:flex-row gap-6 mb-8">
                    {/* Thumbnail */}
                    <div className="w-full lg:w-48 h-48 flex-shrink-0 rounded-lg overflow-hidden border border-slate-700 shadow-lg">
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
                      <h1
                        id="modal-title"
                        className="mb-4 text-2xl font-bold leading-tight text-white md:text-3xl lg:text-4xl"
                      >
                        {post.title}
                      </h1>

                      <p
                        id="modal-description"
                        className="mb-6 text-lg leading-relaxed text-slate-300"
                      >
                        {post.description}
                      </p>

                      <div className="flex flex-wrap items-center gap-6 text-sm text-slate-400 mb-4">
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
                        <div className="flex flex-wrap gap-3">
                          {post.tags.map((tag) => (
                            <span
                              key={tag}
                              className="rounded-full neumorphism-shadow neumorphism-border px-3 py-1 text-sm text-white layer3"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </header>

                {/* Article Content */}
                <div className="rounded-xl neumorphism-shadow neumorphism-border p-6 md:p-8 layer2 text-white layer3">
                  <div
                    className="prose prose-lg max-w-none text-white [&_a]:!text-cyan-400 hover:[&_a]:!text-cyan-300 [&_code]:!text-cyan-300 [&_code]:!bg-slate-800 [&_pre]:!bg-slate-800 [&_pre]:!border-slate-700 [&_p]:!text-slate-200 [&_li]:!text-slate-200 [&_h1]:!text-white [&_h2]:!text-white [&_h3]:!text-white [&_h4]:!text-white [&_blockquote]:!text-slate-300 [&_strong]:!text-white"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                  />
                </div>
              </article>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}