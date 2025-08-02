import { getAllPosts, getFeaturedPost, getLatestPosts } from './markdown'
import type { BlogPostWithSlug } from './schema'

// Pre-generate blog data at build time to avoid runtime file system access
export async function generateStaticBlogData() {
  try {
    const [allPosts, featured, latest] = await Promise.all([
      getAllPosts(),
      getFeaturedPost(), 
      getLatestPosts(3)
    ])

    return {
      allPosts,
      featured,
      latest: featured 
        ? latest.filter((post) => post.slug !== featured.slug).slice(0, 2)
        : latest,
      timestamp: new Date().toISOString()
    }
  } catch (error) {
    console.error('[Blog] Failed to generate static data:', error)
    return {
      allPosts: [],
      featured: null,
      latest: [],
      timestamp: new Date().toISOString()
    }
  }
}

// Export type for the generated data
export type StaticBlogData = Awaited<ReturnType<typeof generateStaticBlogData>>