# 📝 Blog Writing Guide for Nodo Serrano

## Quick Start: Write Your First Article

### 1. Create a New Blog Post

1. Navigate to the `/content/blog/` directory
2. Create a new file with this format: `YYYY-MM-DD-your-post-title.md`
   
   Example: `2024-02-01-mi-primer-post.md`

### 2. Add Frontmatter (Required)

Every blog post must start with frontmatter between `---` lines:

```markdown
---
title: "Mi Primer Artículo sobre Ethereum"
description: "Una introducción personal al mundo de Ethereum y blockchain desde mi experiencia en Tandil"
date: "2024-02-01"
author: "Tu Nombre"
tags: ["ethereum", "blockchain", "experiencia", "tandil"]
featured: false
published: true
---
```

### 3. Write Your Content

After the frontmatter, write your article in Markdown:

```markdown
## Mi experiencia con blockchain

Cuando escuché por primera vez sobre **Ethereum**, pensé que era solo otra criptomoneda...

### Lo que aprendí

- Ethereum es más que dinero digital
- Los smart contracts cambian todo
- La comunidad es lo más importante

### Código de ejemplo

```solidity
pragma solidity ^0.8.0;

contract HelloWorld {
    string public message = "Hola, Nodo Serrano!";
}
```

## Conclusión

La revolución blockchain ya comenzó, y desde Tandil podemos ser parte de ella.
```

### 4. Publish Your Article

1. Save the file in `/content/blog/`
2. Set `published: true` in the frontmatter
3. Commit to the `develop` branch
4. Create a Pull Request to `main`
5. Once merged, your article will appear on the blog!

---

## 📋 Frontmatter Reference

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `title` | string | ✅ | Post title (max 200 chars) |
| `description` | string | ✅ | Brief summary for previews (max 500 chars) |
| `date` | string | ✅ | Publication date (YYYY-MM-DD format) |
| `author` | string | ✅ | Author name (max 100 chars) |
| `tags` | array | ❌ | Tags for categorization |
| `featured` | boolean | ❌ | Show prominently on homepage (default: false) |
| `published` | boolean | ❌ | Make post visible (default: true) |
| `image` | string | ❌ | Optional header image URL |

---

## ✍️ Writing Best Practices

### Content Guidelines
- **Keep it engaging**: Write conversationally, like talking to a friend
- **Add value**: Share insights, tutorials, or experiences
- **Use examples**: Code snippets, real-world applications
- **Include visuals**: Describe concepts clearly

### SEO Tips
- Write descriptive titles (40-60 characters)
- Create compelling descriptions (150-160 characters)
- Use relevant tags (3-5 recommended)
- Structure content with headings (H2, H3)

### Technical Writing
- Explain concepts simply
- Provide context for technical terms
- Include practical examples
- Link to resources when helpful

---

## 🔗 Notion Integration (Advanced)

If you prefer writing in Notion, here's how to set up automatic publishing:

### Option 1: Manual Export
1. Write your article in Notion
2. Export as Markdown
3. Add required frontmatter
4. Copy to `/content/blog/`

### Option 2: API Integration (Future)
We can set up a GitHub Action that:
1. Monitors a specific Notion database
2. Exports new articles automatically
3. Creates pull requests with the content

**To set this up, you'll need:**
- Notion API token
- Database ID
- GitHub Personal Access Token

*Contact the tech team if you want to implement this workflow.*

---

## 🎯 Content Ideas

### Beginner Content
- "Mi primera wallet de Ethereum"
- "¿Qué es un smart contract?"
- "DeFi explicado simple"
- "Cómo participar en una DAO"

### Technical Content
- "Desplegando mi primer contrato"
- "Auditando smart contracts"
- "Optimización de gas en Ethereum"
- "Layer 2: ¿Por qué importa?"

### Community Content
- "Eventos destacados del mes"
- "Entrevista con [miembro de la comunidad]"
- "Recap de [evento/conferencia]"
- "Proyectos locales en blockchain"

### Educational Series
- "Ethereum desde cero" (serie de 5 posts)
- "Construyendo una dApp" (tutorial paso a paso)
- "Historia de las finanzas descentralizadas"

---

## 🚀 Publishing Workflow

### For Authors
1. **Draft**: Write with `published: false`
2. **Review**: Share with team for feedback
3. **Edit**: Make revisions based on feedback
4. **Publish**: Set `published: true`
5. **Promote**: Share on social media

### For Maintainers
1. **Review PRs**: Check content quality and accuracy
2. **Technical check**: Verify frontmatter and formatting
3. **SEO review**: Optimize titles and descriptions
4. **Merge**: Approve and publish to main branch

---

## 🛠️ Troubleshooting

### Common Issues

**Frontmatter Validation Errors**
- Check all required fields are present
- Verify date format (YYYY-MM-DD)
- Ensure quotes around string values

**File Not Appearing**
- Check file naming format
- Verify `published: true`
- Ensure file is in `/content/blog/`

**Styling Issues**
- Use standard Markdown syntax
- Headers start with H2 (`##`)
- Code blocks use triple backticks

### Getting Help
- Check existing posts for examples
- Ask in the Nodo Serrano Discord
- Review the `/content/blog/README.md`

---

## 📊 Analytics & Performance

### What Gets Tracked
- Page views per article
- Reading time
- Social shares
- Comment engagement (future)

### Optimization Tips
- Write compelling titles
- Use engaging descriptions
- Add relevant tags
- Share on social media
- Engage with comments

---

**Happy writing! 🎉**

*Remember: The best articles come from personal experience and genuine passion for the topic. Share your journey, insights, and what you've learned.*