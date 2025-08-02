# Blog Content Guide

This directory contains all blog posts for Nodo Serrano. Posts are written in Markdown with frontmatter metadata.

## Creating a New Post

1. Create a new `.md` file in this directory
2. Use the format: `YYYY-MM-DD-post-title.md`
3. Add required frontmatter (see below)
4. Write your content in Markdown

## Required Frontmatter

```yaml
---
title: "Your Post Title"
description: "A brief description of your post (max 500 chars)"
date: "YYYY-MM-DD"
author: "Author Name"
tags: ["tag1", "tag2", "tag3"]
featured: false
published: true
---
```

### Frontmatter Fields

- **title**: The post title (required, max 200 chars)
- **description**: Brief summary for previews (required, max 500 chars)
- **date**: Publication date in YYYY-MM-DD format (required)
- **author**: Author name (required, max 100 chars)
- **tags**: Array of tags for categorization (optional)
- **featured**: Boolean to highlight on homepage (default: false)
- **published**: Boolean to show/hide post (default: true)
- **image**: Optional URL for post header image

## Writing Guidelines

### Security
- All HTML in markdown is sanitized for security
- Only safe HTML tags are allowed
- Scripts and potentially harmful content are removed

### Markdown Features
- Standard Markdown syntax
- GitHub Flavored Markdown (GFM) supported
- Code blocks with syntax highlighting
- Tables, lists, and blockquotes

### Best Practices
1. Use descriptive filenames
2. Keep titles concise and engaging
3. Write clear descriptions for SEO
4. Use relevant tags (3-5 recommended)
5. Set `featured: true` for only one post at a time

## Publishing Workflow

1. Write your post in this directory
2. Set `published: false` while drafting
3. Test locally with `pnpm dev`
4. Set `published: true` when ready
5. Commit to `develop` branch
6. Create PR to `main` for publishing

## Example Post

```markdown
---
title: "Getting Started with Ethereum Development"
description: "Learn the basics of smart contract development with Solidity and build your first dApp"
date: "2024-02-01"
author: "Jane Doe"
tags: ["ethereum", "solidity", "tutorial", "development"]
featured: false
published: true
---

## Introduction

Your content here...

### Code Example

\`\`\`solidity
pragma solidity ^0.8.0;

contract HelloWorld {
    string public message = "Hello, Ethereum!";
}
\`\`\`

## Conclusion

More content...
```

## Notes

- Posts are automatically sorted by date (newest first)
- The featured post appears prominently on the homepage
- Only published posts are displayed
- All content is validated with Zod schemas for data integrity