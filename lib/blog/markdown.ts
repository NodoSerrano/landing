import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { remark } from "remark"
import remarkRehype from "remark-rehype"
import rehypeHighlight from "rehype-highlight"
import rehypeStringify from "rehype-stringify"
import gfm from "remark-gfm"
import readingTime from "reading-time"
import DOMPurify from "isomorphic-dompurify"
import { blogPostSchema, type BlogPostWithSlug } from "./schema"

// Helper function to extract excerpt from markdown content
function extractExcerpt(content: string): string {
  // Remove frontmatter if any
  const withoutFrontmatter = content.replace(/^---[\s\S]*?---\s*/, '')
  
  // Split by paragraphs and get the first substantial one
  const paragraphs = withoutFrontmatter
    .split('\n\n')
    .map(p => p.trim())
    .filter(p => p.length > 0 && !p.startsWith('#') && !p.startsWith('```'))
  
  // Get first paragraph, strip markdown formatting
  const firstParagraph = paragraphs[0] || ''
  const cleanText = firstParagraph
    .replace(/\*\*(.*?)\*\*/g, '$1') // Remove bold
    .replace(/\*(.*?)\*/g, '$1') // Remove italic
    .replace(/`(.*?)`/g, '$1') // Remove inline code
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Remove links
    .replace(/#+\s*/g, '') // Remove heading markers
    .trim()
  
  // Limit to reasonable length
  if (cleanText.length > 200) {
    return cleanText.substring(0, 200).trim() + '...'
  }
  
  return cleanText
}

// Helper function to resolve image URLs
function resolveImageUrls(post: any): { thumbnailUrl?: string; coverUrl?: string } {
  const result: { thumbnailUrl?: string; coverUrl?: string } = {}
  
  if (post.thumbnail) {
    result.thumbnailUrl = `/blog/thumbnails/${post.thumbnail}`
  }
  
  if (post.cover) {
    result.coverUrl = `/blog/covers/${post.cover}`
  }
  
  return result
}

// Ensure proper path resolution in both dev and production
const postsDirectory = path.join(process.cwd(), "content", "blog")

export async function getPostBySlug(slug: string): Promise<BlogPostWithSlug | null> {
  try {
    const realSlug = slug.replace(/\.md$/, "")
    const fullPath = path.join(postsDirectory, `${realSlug}.md`)
    
    if (!fs.existsSync(fullPath)) {
      return null
    }

    const fileContents = fs.readFileSync(fullPath, "utf8")
    const { data, content } = matter(fileContents)

    // Validate frontmatter with Zod
    const validatedData = blogPostSchema.parse(data)
    
    // Only process published posts
    if (!validatedData.published) {
      return null
    }

    // Process markdown content with syntax highlighting
    const processedContent = await remark()
      .use(gfm) // GitHub Flavored Markdown
      .use(remarkRehype) // Convert markdown to rehype AST
      .use(rehypeHighlight) // Add syntax highlighting
      .use(rehypeStringify) // Convert back to HTML string
      .process(content)

    // Sanitize HTML to prevent XSS attacks while preserving syntax highlighting classes
    const contentHtml = DOMPurify.sanitize(processedContent.toString(), {
      ALLOWED_TAGS: ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'ul', 'ol', 'li', 'strong', 'em', 'code', 'pre', 'a', 'blockquote', 'img', 'hr', 'br', 'div', 'span'],
      ALLOWED_ATTR: ['href', 'title', 'target', 'rel', 'class', 'id', 'src', 'alt', 'data-language', 'data-highlighted']
    })
    const stats = readingTime(content)
    const excerpt = extractExcerpt(content)
    const imageUrls = resolveImageUrls(validatedData)

    return {
      ...validatedData,
      slug: realSlug,
      content: contentHtml,
      excerpt,
      ...imageUrls,
      readingTime: stats,
    }
  } catch (error) {
    // Enhanced error logging with more context
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    const errorStack = error instanceof Error ? error.stack : undefined
    
    console.error(`[Blog Error] Failed to parse post "${slug}":`, {
      message: errorMessage,
      stack: errorStack,
      timestamp: new Date().toISOString(),
    })
    
    // Return null for graceful degradation
    return null
  }
}

export async function getAllPosts(): Promise<BlogPostWithSlug[]> {
  try {
    // Debug logging for production troubleshooting
    console.log("[Blog Debug] Posts directory:", postsDirectory)
    console.log("[Blog Debug] Directory exists:", fs.existsSync(postsDirectory))
    
    // Create directory if it doesn't exist
    if (!fs.existsSync(postsDirectory)) {
      fs.mkdirSync(postsDirectory, { recursive: true })
      console.log("[Blog Debug] Created missing directory")
      return []
    }

    const fileNames = fs.readdirSync(postsDirectory)
    const allPostsData = await Promise.all(
      fileNames
        .filter((fileName) => fileName.endsWith(".md") && fileName !== "README.md")
        .map(async (fileName) => {
          const slug = fileName.replace(/\.md$/, "")
          return await getPostBySlug(slug)
        })
    )

    // Filter out null values and sort by date
    return allPostsData
      .filter((post): post is BlogPostWithSlug => post !== null)
      .sort((a, b) => (a.date > b.date ? -1 : 1))
  } catch (error) {
    // Enhanced error logging for getAllPosts
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    
    console.error("[Blog Error] Failed to get all posts:", {
      message: errorMessage,
      directory: postsDirectory,
      timestamp: new Date().toISOString(),
    })
    
    // Return empty array for graceful degradation
    return []
  }
}

export async function getLatestPosts(count: number = 3): Promise<BlogPostWithSlug[]> {
  const allPosts = await getAllPosts()
  return allPosts.slice(0, count)
}

export async function getFeaturedPost(): Promise<BlogPostWithSlug | null> {
  const allPosts = await getAllPosts()
  const featuredPost = allPosts.find((post) => post.featured)
  return featuredPost || allPosts[0] || null
}