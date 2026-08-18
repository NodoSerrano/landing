export function ArticleBody({ html }: { html: string }) {
  return (
    <div className="flex flex-col gap-8">
      <div className="h-px w-full bg-gradient-warm" />
      <div
        className="prose prose-lg max-w-none font-inter text-(--color-text-muted) [&_a]:text-(--color-warm-red)! [&_a]:hover:text-(--color-warm-violet)! [&_code]:text-(--color-warm-red)! [&_code]:bg-black/5! [&_pre]:bg-black/5! [&_pre]:border-black/10! [&_p]:text-(--color-text-muted)! [&_li]:text-(--color-text-muted)! [&_h1]:text-(--color-text-primary-light)! [&_h2]:text-(--color-text-primary-light)! [&_h3]:text-(--color-text-primary-light)! [&_h4]:text-(--color-text-primary-light)! [&_blockquote]:text-(--color-warm-violet)! [&_strong]:text-(--color-text-primary-light)! [&_img]:rounded-lg! [&_img]:mx-auto! [&_figure]:my-8! [&_figcaption]:text-center! [&_figcaption]:text-(--color-text-muted)!"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  )
}
