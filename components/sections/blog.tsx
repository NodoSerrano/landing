import Image from "next/image"
import Link from "next/link"
import type { GhostPost } from "@/lib/ghost"
import { Reveal } from "@/components/motion/fade-in"
import { DecoLayer } from "./deco-blob-layer"

const VB = "0 130 1676 1436"

// One <div><svg> layer per blob so each casts its own GPU-composited shadow onto
// the blobs behind it (Figma had a per-<g> _dd/_ddii <filter>; Safari CPU-
// rasterises those on scroll). The warm outline (grad-line1) had no Figma
// shadow — shadow={false}.
function CurvedContainer() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute left-1/2 top-1/2 -z-10 w-[140%] max-w-[1720px] max-[1199px]:w-[1680px] aspect-[1676/1436] -translate-x-1/2 -translate-y-1/2"
    >
      <DecoLayer viewBox={VB}>
        <path d="M1296.75 1144.19C1520.83 1261.42 1697.25 548.188 1459.25 353.188C1363.25 210.687 1085.75 412.688 833.749 396.188C581.748 379.688 307.136 177.688 151.749 396.188C-34.2186 657.688 44.5649 1027.32 393.252 1091.19C741.939 1155.05 1005.89 992.018 1296.75 1144.19Z" fill="#F8F4ED" />
      </DecoLayer>
      <DecoLayer viewBox={VB} shadow={false}>
        <defs>
          <linearGradient id="blog-grad-line1" x1="281.799" y1="904.916" x2="1500.23" y2="548.945" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FF9728" />
            <stop offset="0.5" stopColor="#FF3121" />
            <stop offset="1" stopColor="#9E1FD0" />
          </linearGradient>
        </defs>
        <path d="M532.535 342.152C351.316 273.754 253.897 371.593 209.873 416.46C186.936 449.303 163.708 605.117 208.849 603.08C318.49 598.134 321.765 761.425 463.878 775.278C605.992 789.131 539.653 896.128 945.729 1091.03C1351.8 1285.94 1479.04 958.259 1536.74 778.246C1594.45 598.234 1377.21 552.664 1108.05 587.422C838.903 622.18 759.059 427.65 532.535 342.152Z" stroke="url(#blog-grad-line1)" strokeWidth="3" />
      </DecoLayer>
      <DecoLayer viewBox={VB}>
        <defs>
          <linearGradient id="blog-grad-line2" x1="197.483" y1="1014.16" x2="1204.85" y2="638.014" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FF9728" />
            <stop offset="0.5" stopColor="#FF3121" />
            <stop offset="1" stopColor="#9E1FD0" />
          </linearGradient>
        </defs>
        <path d="M361.267 487.772C205.021 444.123 131.756 540.807 98.6996 585.082C82.2314 616.6 75.3221 757.906 112.722 751.754C203.561 736.81 219.301 882.247 338.659 880.965C458.018 879.683 411.345 981.557 764.779 1116.53C1118.21 1251.51 1197.97 946.807 1231.64 780.59C1265.3 614.373 1080.91 594.56 859.712 651.43C638.518 708.3 556.574 542.333 361.267 487.772Z" fill="#F8F4ED" stroke="url(#blog-grad-line2)" strokeWidth="3" />
      </DecoLayer>
      <DecoLayer viewBox={VB}>
        <defs>
          <linearGradient id="blog-grad-fill" x1="894.752" y1="390.183" x2="894.752" y2="1457.18" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FF9728" />
            <stop offset="0.5" stopColor="#FF3121" />
            <stop offset="1" stopColor="#9E1FD0" />
          </linearGradient>
        </defs>
        <path d="M1528.95 788.185C1639.9 885.328 1716.78 1314.9 1361.4 1420.72C1006.02 1526.55 920.681 1359.15 656.064 1448.98C557.62 1482.4 365.417 1346.8 227.907 1181C91.0295 1015.96 216.227 837.268 321.344 592.874C426.462 348.481 514.881 393.909 666.01 462.847C859.412 551.068 997.881 335.332 1304.43 403.867C1418.21 429.304 1417.99 691.041 1528.95 788.185Z" fill="url(#blog-grad-fill)" />
      </DecoLayer>
      <DecoLayer viewBox={VB}>
        <path d="M1513.46 783.108C1619.48 883.064 1582.28 1114.54 1513.46 1233.44C1445.04 1442.61 1202.74 1589.61 910.718 1465.89C758.005 1401.19 401.633 1357.9 270.234 1187.29C139.439 1017.47 259.073 833.612 359.519 582.143C459.965 330.674 608.748 542.789 813.075 453.847C986.854 378.202 1229.6 386.507 1304 453.846C1378.41 521.185 1407.43 683.151 1513.46 783.108Z" fill="#F8F4ED" />
      </DecoLayer>
    </div>
  )
}

function FeaturedPostCard({ post }: { post: GhostPost | null }) {
  if (!post) {
    return (
      <div
        className="flex h-[290px] w-full flex-col items-center justify-center gap-2 rounded-[24px] rounded-tr-none border border-(--color-warm-yellow) bg-(--color-bg-elev-dark) px-6 text-center"
        style={{ boxShadow: "var(--shadow-neumorphic-dark)" }}
      >
        <p className="font-display text-h4 font-medium text-(--color-text-primary-dark)">
          Todavía no hay artículos publicados
        </p>
        <p className="font-inter text-body-sm text-(--color-text-secondary-dark)">
          Volvé pronto para leer las últimas novedades
        </p>
      </div>
    )
  }

  const formattedDate = new Date(post.published_at).toLocaleDateString("es-AR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="flex w-full cursor-pointer flex-col overflow-hidden rounded-[24px] rounded-tr-none border border-(--color-warm-yellow) text-left md:h-[290px] md:flex-row"
      style={{ boxShadow: "var(--shadow-neumorphic-dark)" }}
    >
      <div className="relative h-56 w-full shrink-0 overflow-hidden md:h-full md:w-[57%]">
        <Image
          src={post.feature_image || "/images/cowork.webp"}
          alt={post.title}
          fill
          sizes="(min-width: 768px) 57vw, 100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-warm mix-blend-overlay" />
      </div>

      <div className="flex flex-1 flex-col justify-center gap-3 bg-(--color-bg-elev-dark) p-6">
        <p className="font-inter text-body font-medium text-(--color-accent-orange)">
          Reflexiones desde el nodo
        </p>
        <div className="h-[2px] w-full bg-gradient-warm" />
        <h3 className="font-display text-h4 font-bold leading-tight text-(--color-text-primary-dark)">
          {post.title}
        </h3>
        <p className="line-clamp-2 font-inter text-body-sm text-(--color-text-primary-dark)">
          {post.excerpt}
        </p>
        <time dateTime={post.published_at} className="font-inter text-caption uppercase tracking-wide text-(--color-text-secondary-dark)">
          {formattedDate} · {post.reading_time} min de lectura
        </time>
      </div>
    </Link>
  )
}

export default function Blog({ post }: { post: GhostPost | null }) {
  return (
    // overflow-clip + padding/negative-margin: same technique as events.tsx —
    // required to keep mobile's viewport-meta negotiation from being hijacked
    // by CurvedContainer's fixed width, while growing the box enough to fully
    // contain the curve's bleed (worst case ~270px, at mobile) so the y-clip
    // never actually cuts anything.
    <section id="blog" className="relative isolate z-30 flex flex-col justify-center overflow-clip pt-[360px] md:pt-[488px] pb-[360px] md:pb-[528px] -mt-[200px] -mb-[112px]">
      <div className="relative">
        <CurvedContainer />

        <div className="relative z-10 mx-auto w-full max-w-[720px] px-5 pt-24 md:max-w-[860px] md:pt-32">
          <div className="flex flex-col items-center gap-10 md:gap-12">
            <Reveal className="flex flex-col items-center gap-2 text-center">
              <h2 className="font-display text-h1 font-bold">
                <span className="text-(--color-text-primary-light)">Nuestro</span>{" "}
                <span className="inline-block rounded-[4px] bg-gradient-warm px-3 py-1 text-(--color-text-primary-dark)">
                  BLOG
                </span>
              </h2>
              <p className="font-display text-h3 font-medium text-(--color-warm-violet)">
                Pensamientos, notas y experimentos
              </p>
            </Reveal>

            <Reveal delay={100} className="w-full">
              <FeaturedPostCard post={post} />
            </Reveal>

            <Reveal delay={200}>
              <Link
                href="/blog"
                className="inline-flex items-center justify-center rounded-br-[10px] rounded-tl-[10px] border-2 border-(--color-warm-yellow) px-[26px] py-[14px] font-inter text-body text-(--color-text-primary-light) transition-opacity hover:opacity-90"
                style={{ boxShadow: "var(--shadow-btn-warm)" }}
              >
                Visitar el blog
              </Link>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
