const fs = require('fs')
const path = require('path')

// Simple script to pre-generate blog data for Vercel
async function generateBlogData() {
  try {
    // Import directly from markdown functions
    const { getAllPosts, getFeaturedPost, getLatestPosts } = await import('../lib/blog/markdown.js')
    
    const [allPosts, featured, latest] = await Promise.all([
      getAllPosts(),
      getFeaturedPost(), 
      getLatestPosts(3)
    ])

    const data = {
      allPosts,
      featured,
      latest: featured 
        ? latest.filter((post) => post.slug !== featured.slug).slice(0, 2)
        : latest,
      timestamp: new Date().toISOString()
    }
    
    const outputPath = path.join(process.cwd(), 'public', 'blog-data.json')
    fs.writeFileSync(outputPath, JSON.stringify(data, null, 2))
    
    console.log('✅ Blog data generated successfully at public/blog-data.json')
    console.log(`   - All posts: ${data.allPosts.length}`)
    console.log(`   - Featured: ${data.featured ? data.featured.title : 'None'}`)
    console.log(`   - Latest: ${data.latest.length}`)
  } catch (error) {
    console.error('❌ Failed to generate blog data:', error)
    process.exit(1)
  }
}

generateBlogData()