# 🔗 Notion Integration Guide

## Overview

This guide explains how to integrate Notion with your Nodo Serrano blog for a seamless writing experience. You can write in Notion's rich interface and automatically publish to your blog.

## 🎯 Integration Options

### Option 1: Manual Export (Quick Start)

**Best for**: Occasional writers, one-off articles

1. **Write in Notion**: Create your article in a Notion page
2. **Export as Markdown**: 
   - Click "..." → Export → Markdown & CSV
   - Download the .md file
3. **Add Frontmatter**: Edit the file to add required metadata
4. **Upload**: Copy to `/content/blog/` directory

### Option 2: Automated Sync (Recommended)

**Best for**: Regular writers, team workflows

Set up automatic synchronization using GitHub Actions and Notion API.

## 🔧 Setting Up Automated Sync

### Prerequisites

- Notion workspace with API access
- GitHub repository access
- Basic understanding of API tokens

### Step 1: Create Notion Database

1. **Create a new database** in Notion with these properties:

| Property | Type | Description |
|----------|------|-------------|
| Title | Title | Article title |
| Status | Select | Draft, Ready, Published |
| Author | Person | Article author |
| Description | Text | Brief summary |
| Tags | Multi-select | Article tags |
| Featured | Checkbox | Featured on homepage |
| Date | Date | Publication date |
| Slug | Text | URL slug |
| Content | Text | Article content |

2. **Set up the template**:
```
# [Article Title]

## Introduction
Your introduction here...

## Main Content
Your main content here...

## Conclusion
Wrap up your thoughts...
```

### Step 2: Get Notion API Token

1. Go to [Notion Developers](https://developers.notion.com/)
2. Click "Create new integration"
3. Fill in integration details:
   - Name: "Nodo Serrano Blog"
   - Workspace: Your workspace
   - Type: Internal
4. Copy the **Internal Integration Token**

### Step 3: Connect Database

1. Go to your Notion database
2. Click "..." → "Add connections" 
3. Select your "Nodo Serrano Blog" integration
4. Copy the **Database ID** from the URL

### Step 4: Set up GitHub Action

Create `.github/workflows/notion-sync.yml`:

```yaml
name: Sync Notion to Blog

on:
  schedule:
    # Run every hour
    - cron: '0 * * * *'
  workflow_dispatch:

jobs:
  sync:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v3
        
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          
      - name: Install dependencies
        run: npm install @notionhq/client
        
      - name: Sync Notion to Blog
        env:
          NOTION_TOKEN: ${{ secrets.NOTION_TOKEN }}
          NOTION_DATABASE_ID: ${{ secrets.NOTION_DATABASE_ID }}
        run: node scripts/notion-sync.js
        
      - name: Commit changes
        run: |
          git config --local user.email "action@github.com"
          git config --local user.name "GitHub Action"
          git add content/blog/
          git diff --staged --quiet || git commit -m "🔄 Sync blog posts from Notion"
          git push
```

### Step 5: Create Sync Script

Create `scripts/notion-sync.js`:

```javascript
const { Client } = require('@notionhq/client');
const fs = require('fs');
const path = require('path');

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

const databaseId = process.env.NOTION_DATABASE_ID;

async function syncNotion() {
  try {
    // Query published posts
    const response = await notion.databases.query({
      database_id: databaseId,
      filter: {
        property: 'Status',
        select: {
          equals: 'Published'
        }
      }
    });

    for (const page of response.results) {
      await processPage(page);
    }
  } catch (error) {
    console.error('Error syncing Notion:', error);
    process.exit(1);
  }
}

async function processPage(page) {
  const properties = page.properties;
  
  // Extract frontmatter data
  const title = properties.Title.title[0]?.plain_text || '';
  const description = properties.Description.rich_text[0]?.plain_text || '';
  const author = properties.Author.people[0]?.name || '';
  const date = properties.Date.date?.start || '';
  const featured = properties.Featured.checkbox || false;
  const tags = properties.Tags.multi_select.map(tag => tag.name);
  const slug = properties.Slug.rich_text[0]?.plain_text || 
               title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');

  // Get page content
  const blocks = await notion.blocks.children.list({
    block_id: page.id,
  });

  const content = await blocksToMarkdown(blocks.results);

  // Create frontmatter
  const frontmatter = `---
title: "${title}"
description: "${description}"
date: "${date}"
author: "${author}"
tags: ${JSON.stringify(tags)}
featured: ${featured}
published: true
---

${content}`;

  // Write to file
  const filename = `${date}-${slug}.md`;
  const filepath = path.join('content', 'blog', filename);
  
  fs.writeFileSync(filepath, frontmatter);
  console.log(`✅ Synced: ${filename}`);
}

async function blocksToMarkdown(blocks) {
  let markdown = '';
  
  for (const block of blocks) {
    switch (block.type) {
      case 'paragraph':
        markdown += `${richTextToMarkdown(block.paragraph.rich_text)}\n\n`;
        break;
      case 'heading_1':
        markdown += `# ${richTextToMarkdown(block.heading_1.rich_text)}\n\n`;
        break;
      case 'heading_2':
        markdown += `## ${richTextToMarkdown(block.heading_2.rich_text)}\n\n`;
        break;
      case 'heading_3':
        markdown += `### ${richTextToMarkdown(block.heading_3.rich_text)}\n\n`;
        break;
      case 'bulleted_list_item':
        markdown += `- ${richTextToMarkdown(block.bulleted_list_item.rich_text)}\n`;
        break;
      case 'numbered_list_item':
        markdown += `1. ${richTextToMarkdown(block.numbered_list_item.rich_text)}\n`;
        break;
      case 'code':
        const language = block.code.language || '';
        const code = richTextToMarkdown(block.code.rich_text);
        markdown += `\`\`\`${language}\n${code}\n\`\`\`\n\n`;
        break;
    }
  }
  
  return markdown;
}

function richTextToMarkdown(richText) {
  return richText.map(text => {
    let content = text.plain_text;
    
    if (text.annotations.bold) content = `**${content}**`;
    if (text.annotations.italic) content = `*${content}*`;
    if (text.annotations.code) content = `\`${content}\``;
    if (text.href) content = `[${content}](${text.href})`;
    
    return content;
  }).join('');
}

syncNotion();
```

### Step 6: Configure Secrets

In your GitHub repository:

1. Go to Settings → Secrets and variables → Actions
2. Add these secrets:
   - `NOTION_TOKEN`: Your Notion integration token
   - `NOTION_DATABASE_ID`: Your database ID

## 📝 Writing Workflow with Notion

### For Writers

1. **Create new page** in the Notion database
2. **Fill in properties**:
   - Title: Your article title
   - Author: Your name
   - Description: Brief summary
   - Tags: Relevant tags
   - Date: Publication date
   - Slug: URL-friendly version of title
3. **Write content** using Notion's rich editor
4. **Set status to "Published"** when ready
5. **Wait for sync** (runs every hour or manually)

### Content Guidelines

- Use **Heading 1** for main sections
- Use **Heading 2** for subsections  
- **Bold** important terms
- Use `code` for inline code
- Create code blocks for longer snippets
- Add links naturally in text

## 🛠️ Troubleshooting

### Common Issues

**Sync not working**
- Check GitHub Action logs
- Verify Notion token and database ID
- Ensure database is connected to integration

**Formatting issues**
- Use consistent heading levels
- Avoid complex Notion blocks
- Test with simple content first

**Missing posts**
- Check Status property is set to "Published"
- Verify all required properties are filled
- Check GitHub Action hasn't failed

### Advanced Configuration

**Custom sync schedule**
```yaml
on:
  schedule:
    - cron: '0 */4 * * *'  # Every 4 hours
    - cron: '0 9 * * 1'    # Every Monday at 9 AM
```

**Selective syncing**
Add filters to only sync specific authors or tags:

```javascript
filter: {
  and: [
    {
      property: 'Status',
      select: { equals: 'Published' }
    },
    {
      property: 'Author',
      people: { contains: 'specific-user-id' }
    }
  ]
}
```

## 🎯 Best Practices

### Content Organization
- Use consistent naming for database properties
- Create templates for different article types
- Tag articles consistently for better organization

### Team Collaboration
- Assign clear roles (Writer, Editor, Publisher)
- Use Status property to track article progress
- Comment in Notion for feedback and revisions

### Quality Control
- Always preview before setting to "Published"
- Keep a backup of important articles
- Monitor sync logs for errors

## 🚀 Next Steps

1. **Start simple**: Try manual export first
2. **Set up automation**: When ready for regular publishing
3. **Customize**: Adapt the script to your needs
4. **Scale**: Add more features like image processing

---

**Need help setting this up?** Contact the Nodo Serrano tech team or ask in our Discord!