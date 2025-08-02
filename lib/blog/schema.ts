import { z } from "zod"

// Regex for safe string validation (prevents script injection)
const safeStringRegex = /^[^<>"\';()&]*$/

export const blogPostSchema = z.object({
  title: z.string()
    .min(1, "Title is required")
    .max(200, "Title is too long")
    .regex(safeStringRegex, "Title contains invalid characters"),
  description: z.string()
    .min(1, "Description is required")
    .max(500, "Description is too long")
    .regex(safeStringRegex, "Description contains invalid characters"),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format"),
  author: z.string()
    .min(1, "Author is required")
    .max(100, "Author name is too long")
    .regex(safeStringRegex, "Author name contains invalid characters"),
  tags: z.array(
    z.string()
      .min(1, "Tag cannot be empty")
      .max(50, "Tag is too long")
      .regex(safeStringRegex, "Tag contains invalid characters")
  ).default([]),
  featured: z.boolean().default(false),
  published: z.boolean().default(true),
  image: z.string().url().optional(),
  thumbnail: z.string()
    .regex(/^[a-zA-Z0-9._-]+\.(jpg|jpeg|png|webp|gif)$/i, "Invalid thumbnail filename")
    .optional(),
  cover: z.string()
    .regex(/^[a-zA-Z0-9._-]+\.(jpg|jpeg|png|webp|gif)$/i, "Invalid cover filename")
    .optional(),
})

export type BlogPost = z.infer<typeof blogPostSchema>

export interface BlogPostWithSlug extends BlogPost {
  slug: string
  content: string
  excerpt: string // First paragraph or preview text for featured post
  thumbnailUrl?: string // Resolved thumbnail URL
  coverUrl?: string // Resolved cover URL
  readingTime: {
    text: string
    minutes: number
    time: number
    words: number
  }
}