import Image from "next/image"
import { Reveal } from "@/components/motion/fade-in"
import { TaglineMark, CardUnderline } from "./somos-shared"

// ---------------------------------------------------------------------------
// Composición desktop de la sección Somos (Figma frame 20:427, grupo 225:63).
// Todo se posiciona en % sobre un "canvas" que replica la zona de contenido del
// frame: 1280×952 (Figma y[2066..3018] del frame desktop). Coordenadas:
// left% = (x_figma + 1124) / 1280 · top% = (y_figma − 2066) / 952
// ---------------------------------------------------------------------------

// Cards (Figma Frames 33–38). Posición del frame de cada card; w=370/1280.
const CARDS = [
  {
    title: "Comunidad",
    desc: "Juntos podemos construir más. Queremos conectar la comunidad local con el mundo.",
    left: "22.422%",
    top: "8.929%",
  },
  {
    title: "Hub",
    desc: "Un espacio físico para compartir y crear el nuevo mundo digital abierto.",
    left: "60.313%",
    top: "17.962%",
  },
  {
    title: "Educación",
    desc: "Espacios abiertos para toda la comunidad que quiera aprender de nuevas y viejas tecnologias integradas.",
    left: "2.344%",
    top: "44.748%",
  },
  {
    title: "Hackerspace",
    desc: "Un espacio equipado con recursos de hardware, herramientas de hacking y múltiples tecnologías.",
    left: "65.313%",
    top: "42.227%",
  },
  {
    title: "Arte",
    desc: "Un espacio creativo transversal, donde la tecnología y la expresión se potencian. Pintar Tandil de Software.",
    left: "10.703%",
    top: "67.647%",
  },
  {
    title: "Eventos",
    desc: "Actividades, charlas, juegos. Nuestra comunidad vibra cuando nos encontramos.",
    left: "57.734%",
    top: "64.811%",
  },
]

// ---------------------------------------------------------------------------
// Fotos con máscara blob (Figma Groups 40/41/42). Cada grupo tiene la foto
// enmascarada por un blob y un segundo blob idéntico desfasado dibujado solo
// como contorno con gradiente de marca (efecto "outline corrido").
// Los % internos (mask/stroke) son relativos al wrapper del grupo.
// ---------------------------------------------------------------------------

type PhotoSpec = {
  src: string
  alt: string
  left: string
  top: string
  width: string
  aspect: string
  viewBox: string
  d: string
  grad: { x1: number; y1: number; x2: number; y2: number }
  mask: { left: string; top: string; width: string; height: string }
  stroke: { left: string; top: string; width: string; height: string }
}

const PHOTOS: PhotoSpec[] = [
  // Top-right (Figma Group 40, mask Vector 126 / 76:15)
  {
    src: "/somos/hackerspace.webp",
    alt: "Hackerspace Nodo Serrano",
    left: "67.5%",
    top: "0%",
    width: "18.203%",
    aspect: "233 / 220",
    viewBox: "0 0 226 215",
    d: "M37.2839 165.562C61.7849 180.763 80.0579 174.579 97.8131 191.076C115.568 207.573 143.043 192.787 166.705 182.829C190.366 172.871 196.675 126.475 202.704 96.6833C208.734 66.8917 205.933 41.9162 171.671 28.1325C157.698 22.5115 72.2862 29.5933 46.0246 28.2331C19.763 26.8728 13.2658 55.6895 12.2268 68.9133C11.1254 82.9308 12.7829 150.362 37.2839 165.562Z",
    grad: { x1: 33.4343, y1: 215, x2: 153.27, y2: -3.11672 },
    mask: { left: "0%", top: "2.239%", width: "96.832%", height: "97.755%" },
    stroke: { left: "3.167%", top: "0%", width: "96.832%", height: "97.755%" },
  },
  // Left (Figma Group 41, mask Vector 133 / 76:34)
  {
    src: "/somos/hub.webp",
    alt: "Hub Nodo Serrano",
    left: "3.594%",
    top: "11.975%",
    width: "17.114%",
    aspect: "219 / 200",
    viewBox: "0 0 210 200",
    d: "M34.6745 153.975C57.4608 168.112 74.4549 162.361 90.9675 177.703C107.48 193.046 133.032 179.295 155.037 170.034C177.043 160.773 182.91 117.623 188.518 89.9167C194.125 62.2102 191.52 38.9826 159.656 26.1636C146.661 20.936 67.2271 27.5222 42.8035 26.2571C18.3799 24.9921 12.3374 51.792 11.3711 64.0903C10.3467 77.1267 11.8882 139.838 34.6745 153.975Z",
    grad: { x1: 31.0943, y1: 199.953, x2: 142.543, y2: -2.89859 },
    mask: { left: "0%", top: "0%", width: "95.818%", height: "100%" },
    stroke: { left: "4.182%", top: "0%", width: "95.818%", height: "100%" },
  },
  // Bottom-center (Figma Group 42, mask Vector 133 / 76:38)
  {
    src: "/somos/comunidad.webp",
    alt: "Comunidad Nodo Serrano",
    left: "49.766%",
    top: "79.096%",
    width: "16.185%",
    aspect: "207 / 199",
    viewBox: "0 0 202 192",
    d: "M33.2954 147.851C55.1754 161.426 71.4936 155.903 87.3494 170.635C103.205 185.368 127.741 172.163 148.871 163.271C170.001 154.378 175.635 112.945 181.02 86.3405C186.404 59.7359 183.903 37.4321 153.306 25.123C140.828 20.1033 64.5533 26.4275 41.1011 25.2128C17.6488 23.998 11.8467 49.732 10.9188 61.5412C9.9352 74.0591 11.4154 134.276 33.2954 147.851Z",
    grad: { x1: 29.8576, y1: 192, x2: 136.873, y2: -2.78331 },
    mask: { left: "2.829%", top: "0%", width: "97.166%", height: "96.322%" },
    stroke: { left: "0%", top: "3.678%", width: "97.166%", height: "96.322%" },
  },
]

function photoMaskUrl(p: PhotoSpec) {
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='${p.viewBox}' preserveAspectRatio='none'><path d='${p.d}' fill='black'/></svg>`
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`
}

function BlobPhoto({ photo, index }: { photo: PhotoSpec; index: number }) {
  const gradId = `somos-photo-grad-${index}`
  return (
    <Reveal
      delay={(index + 1) * 80}
      className="absolute"
      style={{
        left: photo.left,
        top: photo.top,
        width: photo.width,
        aspectRatio: photo.aspect,
        filter: "var(--drop-shadow-somos-layer)",
      }}
    >
      {/* Foto enmascarada por el blob */}
      <div
        className="absolute overflow-hidden"
        style={{
          ...photo.mask,
          position: "absolute",
          maskImage: photoMaskUrl(photo),
          WebkitMaskImage: photoMaskUrl(photo),
          maskSize: "100% 100%",
          WebkitMaskSize: "100% 100%",
        }}
      >
        <Image src={photo.src} alt={photo.alt} fill sizes="(min-width: 1024px) 22vw, 50vw" className="object-cover" />
      </div>
      {/* Contorno blob desfasado con gradiente de marca */}
      <svg
        viewBox={photo.viewBox}
        preserveAspectRatio="none"
        fill="none"
        aria-hidden="true"
        className="absolute"
        style={{ ...photo.stroke, position: "absolute" }}
      >
        <path d={photo.d} stroke={`url(#${gradId})`} strokeWidth="2" />
        <defs>
          <linearGradient
            id={gradId}
            x1={photo.grad.x1}
            y1={photo.grad.y1}
            x2={photo.grad.x2}
            y2={photo.grad.y2}
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="var(--color-brand-mint)" />
            <stop offset="0.466597" stopColor="var(--color-brand-blue)" />
            <stop offset="0.932457" stopColor="var(--color-brand-violet)" />
          </linearGradient>
        </defs>
      </svg>
    </Reveal>
  )
}

// ---------------------------------------------------------------------------
// Decoración de fondo — export limpio de Figma (svg_containers/somos-container.svg,
// nodo 489:32): 7 blobs en un viewBox 1573×1256, sin transforms por blob.
//
// Sombra: el export trae un <filter> `_dd` por blob (drop navy #070F22 +18/+18 +
// drop slate #393B5B −18/−18, blur 18, blend overlay). Safari CPU-rasteriza esos
// filtros en cada frame scrolleado, así que se recrean como `drop-shadow()` CSS
// —efecto de capa compuesto en GPU— con un <div><svg> por blob: el `filter` CSS
// va en el <div> (Safari lo ignora sobre hijos de <svg>) y cada capa proyecta
// su sombra sobre la de atrás. `overlay` no existe en drop-shadow, así que el
// alfa está bajado respecto del original.
// ---------------------------------------------------------------------------

const DECO_BLOB_SHADOW =
  "drop-shadow(16px 16px 28px rgba(7,15,34,0.26)) drop-shadow(-14px -14px 22px rgba(57,59,91,0.16))"

const DECO_VIEWBOX = "0 0 1573 1256"

type DecoStroke = { id: string; x1: number; y1: number; x2: number; y2: number; opacity?: number }
type DecoBlobSpec = { d: string; fill?: string; stroke?: DecoStroke; opacity?: number }

// Back-to-front (document order). Brand gradient stops mint→blue→violet, same as
// the export's paint0/1/2 (only the vector coords differ).
const DECO_BLOBS: DecoBlobSpec[] = [
  {
    d: "M1254.47 392.755C1337.4 471.771 1273.34 670.531 1195.4 775.395C1049.14 1063.34 526.345 1084.65 371.706 1019.18C318.792 996.773 290.652 906.394 118.887 797.429C-52.8774 688.465 192.445 526.358 316.419 307.083C440.393 87.8074 721.592 158.152 854.259 142.011C986.926 125.869 1074 178.065 1132.56 231.13C1191.12 284.196 1171.54 313.739 1254.47 392.755Z",
    fill: "var(--color-accent-violet)",
  },
  {
    d: "M235.971 962.849C400.012 1062.42 534.973 1032.37 649.9 1137.16C764.828 1241.94 971.704 1164.1 1147.87 1113.59C1324.03 1063.08 1402.5 789.217 1467.02 614.101C1531.54 438.986 1529.53 289.268 1294.75 194.519C1199.01 155.88 633.762 212.084 406.548 125.346C232.326 58.8375 143.565 299.875 126.62 378.212C108.658 461.25 71.9308 863.281 235.971 962.849Z",
    fill: "var(--color-bg-light)",
  },
  {
    d: "M389.766 885.415C540.649 987.198 533.785 984.393 637.436 1088.32C741.088 1192.24 943.328 1131.2 1114.62 1093.9C1285.91 1056.61 1272.52 776.169 1344.46 616.676C1416.4 457.183 1527.73 347.431 1308.98 246.225C1219.77 204.952 661.228 236.865 484.002 209.949C306.775 183.033 202.86 280.682 182.065 352.689C160.022 429.017 238.882 783.632 389.766 885.415Z",
    stroke: { id: "somos-dd-grad-0", x1: 210.362, y1: 1170.88, x2: 942.762, y2: -26.7173 },
  },
  {
    d: "M529.823 828.163C616.098 879.442 680.862 857.903 743.252 913.767C805.641 969.631 903.151 918.52 987.061 883.975C1070.97 849.429 1114.06 642.82 1136.09 541.023C1158.08 439.429 1108.09 420.309 987.784 374.3L987.061 374.023C937.787 355.178 656.859 363.38 564.026 359.369C471.194 355.358 447.527 453.84 443.536 498.986C439.305 546.842 443.548 776.884 529.823 828.163Z",
    stroke: { id: "somos-dd-grad-1", x1: 515.024, y1: 996.943, x2: 915.391, y2: 234.791, opacity: 0.5 },
  },
  {
    d: "M348.592 905.523C497.128 982.897 611.157 997.783 717.932 1083.15C824.706 1168.51 996.294 1085.16 1143.63 1028.2C1290.96 971.247 1239.99 707.27 1281.83 547.097C1323.68 386.924 1407.53 268.899 1198.63 200.64C1113.44 172.803 620.521 273.543 458.955 270.418C297.389 267.292 218.457 372.917 209.969 443.755C200.972 518.846 200.056 828.149 348.592 905.523Z",
    fill: "var(--color-bg-light)",
  },
  {
    d: "M442.844 923.541C585.133 994.163 578.893 992.55 680.972 1070.86C783.051 1149.17 948.61 1070.8 1090.67 1017.05C1232.73 963.3 1185.53 719.223 1226.86 570.624C1268.2 422.025 1349.64 312.163 1149.25 250.396C1067.53 225.207 592.881 321.88 437.553 320.098C282.225 318.316 205.602 416.661 196.953 482.312C187.786 551.904 300.556 852.92 442.844 923.541Z",
    fill: "var(--color-bg-light)",
    stroke: { id: "somos-dd-grad-2", x1: 325.451, y1: 1195.74, x2: 823.991, y2: 66.6221 },
    opacity: 0.5,
  },
  {
    d: "M477.317 877.275C606.978 948.742 601.314 947.064 694.75 1025.47C788.187 1103.88 936.636 1029.45 1064.22 978.822C1191.8 928.198 1145.46 687.894 1180.58 542.647C1215.71 397.399 1287.65 290.782 1105.62 227.132C1031.38 201.175 603.857 288.925 463.447 284.836C323.038 280.748 255.269 376.133 248.441 440.447C241.203 508.623 347.656 805.807 477.317 877.275Z",
    fill: "var(--color-bg-light)",
  },
]

// One blob = one <div><svg><path> so its drop-shadow composites on its own GPU
// layer and falls on the blobs behind it (see comment block above).
function DecoBlob({ blob }: { blob: DecoBlobSpec }) {
  const { d, fill, stroke, opacity } = blob
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0"
      style={{ filter: DECO_BLOB_SHADOW, opacity }}
    >
      <svg
        viewBox={DECO_VIEWBOX}
        preserveAspectRatio="xMidYMid slice"
        fill="none"
        className="h-full w-full overflow-visible"
      >
        {stroke && (
          <defs>
            <linearGradient
              id={stroke.id}
              gradientUnits="userSpaceOnUse"
              x1={stroke.x1}
              y1={stroke.y1}
              x2={stroke.x2}
              y2={stroke.y2}
            >
              <stop stopColor="var(--color-brand-mint)" />
              <stop offset="0.466597" stopColor="var(--color-brand-blue)" />
              <stop offset="0.932457" stopColor="var(--color-brand-violet)" />
            </linearGradient>
          </defs>
        )}
        <path
          d={d}
          fill={fill ?? "none"}
          stroke={stroke ? `url(#${stroke.id})` : undefined}
          strokeOpacity={stroke?.opacity}
          strokeWidth={stroke ? 2 : undefined}
        />
      </svg>
    </div>
  )
}

function DecoDesktop() {
  return (
    <>
      {/* Base crema plana full-bleed: garantiza continuidad sin costuras con la
          sección Community en cualquier ancho de viewport. Termina a ~72% del
          canvas; de ahí para abajo el borde lo dan los blobs.
          El borde inferior recto no se nota porque el body es del mismo crema
          (--color-bg-light); lo que sí se notaba era la sombra del blob de
          Community, resuelta en community.tsx. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[-200px] -z-20 h-[calc(72%+200px)] w-screen -translate-x-1/2 bg-(--color-bg-light)"
      />
      {/* Blob stack. left/top/width/height define the on-screen footprint; the
          art inside scales to fill (slice, no distortion). Tune these 4 values
          visually so the cluster sits behind the SOMOS tagline. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -z-10"
        style={{
          left: "-21.016%",
          top: "-29.412%",
          width: "158.532%",
          height: "138.933%",
        }}
      >
        {DECO_BLOBS.map((blob, i) => (
          <DecoBlob key={i} blob={blob} />
        ))}
      </div>
    </>
  )
}

export default function SomosDesktop() {
  return (
    <div
      className="relative mx-auto mb-[120px]  hidden w-full max-w-[1280px] lg:block"
      style={{ aspectRatio: "1280 / 952" }}
    >
      <DecoDesktop />

      {/* Centro — tagline + SOMOS (el blob crema de fondo está en la deco) */}
      <Reveal
        className="absolute flex flex-col items-center gap-1 text-center"
        style={{ left: "34.219%", top: "38.235%", width: "28.75%" }}
      >
        <div className="flex items-center justify-center gap-2">
          <TaglineMark gradId="somos-arrow-grad-d" />
          <span className="text-body-lg text-(--color-accent-violet)">
            Educación·Comunidad·Ethereum
          </span>
        </div>
        <h2 className="font-display text-[4.5rem] font-bold leading-[1.1]">
          <span className="bg-gradient-brand bg-clip-text text-transparent">
            SOMOS
          </span>
        </h2>
      </Reveal>

      {/* Fotos blob */}
      {PHOTOS.map((photo, i) => (
        <BlobPhoto key={photo.src} photo={photo} index={i} />
      ))}

      {/* Cards */}
      {CARDS.map((card, i) => (
        <Reveal
          as="article"
          key={card.title}
          delay={(PHOTOS.length + 1 + i) * 80}
          className="absolute w-[28.906%] rounded-[8px] bg-(--color-bg-warm-white) p-3"
          style={{
            left: card.left,
            top: card.top,
            boxShadow: "var(--shadow-somos-card)",
          }}
        >
          <div className="w-fit">
            <h3 className="font-display text-mob-h2 font-medium text-(--color-text-primary-light)">
              {card.title}
            </h3>
            <CardUnderline gradId={`somos-underline-grad-${card.title}`} />
          </div>
          <p className="mt-2 text-body text-(--color-text-primary-light)">
            {card.desc}
          </p>
        </Reveal>
      ))}
    </div>
  )
}
