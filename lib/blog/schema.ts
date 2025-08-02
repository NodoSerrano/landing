import { z } from "zod"

export const blogPostSchema = z.object({
  title: z.string().min(1, "Title is required").max(200, "Title is too long"),
  description: z.string().min(1, "Description is required").max(500, "Description is too long"),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format"),
  author: z.string().min(1, "Author is required").max(100, "Author name is too long"),
  tags: z.array(z.string()).default([]),
  featured: z.boolean().default(false),
  published: z.boolean().default(true),
  image: z.string().url().optional(),
})

export type BlogPost = z.infer<typeof blogPostSchema>

export interface BlogPostWithSlug extends BlogPost {
  slug: string
  content: string
  readingTime: {
    text: string
    minutes: number
    time: number
    words: number
  }
}