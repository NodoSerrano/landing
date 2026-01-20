import React from "react";
import { Calendar, Clock, User } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import SafeImage from "./safe-image";
import type { BlogPostWithSlug } from "@/lib/blog/schema";

interface BlogCardProps {
  post: BlogPostWithSlug;
  index?: number;
  onOpen?: (post: BlogPostWithSlug) => void;
}

export default function BlogCard({ post, index = 0, onOpen }: BlogCardProps) {
  const handleClick = (e: React.MouseEvent) => {
    if (onOpen) {
      e.preventDefault();
      onOpen(post);
    }
    // If no onOpen provided, let the Link handle navigation
  };

  const cardContent = (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="relative h-full"
    >
      <div onClick={handleClick} className="block cursor-pointer h-full">
        <div className="relative h-full layer2 overflow-hidden rounded-xl neumorphism-shadow neumorphism-border p-4">
          {post.featured && (
            <div className="absolute top-2 right-2 z-10 flex h-6 w-6 items-center justify-center rounded-full bg-cyan-600 text-sm">
              ⭐
            </div>
          )}

          <div className="flex gap-4">
            {/* Thumbnail - Always present, using placeholder if no image */}
            <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg neumorphism-border">
              <SafeImage
                src={
                  post.thumbnailUrl ||
                  "/blog/thumbnails/default-placeholder-square.svg"
                }
                fallbackSrc="/blog/thumbnails/default-placeholder-square.svg"
                alt={post.title}
                fill
                className="object-cover"
                sizes="80px"
              />
            </div>

            {/* Content */}
            <div className="min-w-0 flex-1">
              <h3 className="mb-2 text-lg font-bold leading-tight">
                {post.title}
              </h3>

              <p className="mb-3 line-clamp-2 text-sm leading-relaxed">
                {post.description}
              </p>

              <div className="mb-2 flex flex-wrap items-center gap-3 text-xs opacity-80">
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
                      className="rounded-full layer3 neumorphism-shadow neumorphism-border px-2 py-1 text-xs opacity-80"
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
  );

  // If onOpen is provided, use modal behavior; otherwise, use Link navigation
  if (onOpen) {
    return cardContent;
  } else {
    return (
      <Link href={`/blog/${post.slug}`} className="block">
        {cardContent}
      </Link>
    );
  }
}
