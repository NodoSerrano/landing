import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { remark } from "remark"
import html from "remark-html"
import gfm from "remark-gfm"
import readingTime from "reading-time"
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

const postsDirectory = path.join(process.cwd(), "content/blog")

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

    // Process markdown content
    const processedContent = await remark()
      .use(gfm) // GitHub Flavored Markdown
      .use(html) // Convert to HTML without aggressive sanitization
      .process(content)

    const contentHtml = processedContent.toString()
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
    console.error(`Error parsing post ${slug}:`, error)
    return null
  }
}

export async function getAllPosts(): Promise<BlogPostWithSlug[]> {
  try {
    // Create directory if it doesn't exist
    if (!fs.existsSync(postsDirectory)) {
      fs.mkdirSync(postsDirectory, { recursive: true })
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
    console.error("Error getting all posts:", error)
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