import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { remark } from "remark"
import html from "remark-html"
import gfm from "remark-gfm"
import { rehypeSanitize } from "rehype-sanitize"
import readingTime from "reading-time"
import { blogPostSchema, type BlogPostWithSlug } from "./schema"

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

    // Process markdown content with security
    const processedContent = await remark()
      .use(gfm) // GitHub Flavored Markdown
      .use(html, { sanitize: true }) // Basic HTML sanitization
      .process(content)

    const contentHtml = processedContent.toString()
    const stats = readingTime(content)

    return {
      ...validatedData,
      slug: realSlug,
      content: contentHtml,
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