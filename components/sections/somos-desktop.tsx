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
// Decoración de fondo — SVG compuesto de los vectores del Figma exportados con
// bounds absolutos y trasladados a un viewBox común cuyo origen es el punto
// rel(−269, −694) del canvas (unión de los bboxes del grupo 225:63).
// El viewBox está recortado arriba en rel y=−280 (y local 414) para que la deco
// asome apenas sobre la sección Community (dentro de su padding inferior) sin
// pisar su contenido.
// El blob crema 38:83 NO va acá: es el mismo fondo de Community, y con sombra
// se leía como una capa suelta a la izquierda en el cambio de sección. El
// relleno lo da el rectángulo crema de DecoDesktop.
// Sombra vía CSS `filter` sobre el <svg> (abajo), no un <filter> SVG sobre el
// <g>: Safari CPU-rasteriza la región del filtro en cada frame scrolleado
// (medido / vs /labs: stalls de 0.6-1s, ~27fps → 56fps al pasarlo a CSS).
// ---------------------------------------------------------------------------

const DECO_SHADOW = "drop-shadow(4px 5px 10px rgba(7,15,34,0.12))"
const DECO_SVG = `<g ><g data-l="76-147" transform="translate(552.75 443.64)"><path d="M1221.33 995.845C1220.95 1102.98 1052.58 1156.67 936.655 1150.06C659.926 1185.55 325.101 782.987 272.655 626.217C254.709 572.575 296.103 502.836 261.377 309.669C226.651 116.503 482.514 225.513 700.98 208.461C919.447 191.409 1046.44 450.9 1138.37 547.417C1230.31 643.933 1249.88 740.255 1251.39 814.474C1252.9 888.694 1221.7 888.713 1221.33 995.845Z" fill="url(#sdd-76-147-fill)"/></g><g data-l="76-148" transform="translate(598.18 450.29)"><path d="M1186.01 994.904C1187.91 1101.5 1025.87 1153.66 913.363 1146.22C645.898 1179.46 272.056 679.865 255.559 626.1C210.092 477.932 278.813 497.453 241.065 304.995C203.318 112.537 453.617 222.913 665.002 207.578C876.387 192.244 1004.96 451.383 1096.11 548.103C1187.27 644.823 1208.28 740.808 1211.31 814.667C1214.35 888.525 1184.11 888.312 1186.01 994.904Z" fill="var(--color-bg-light)"/></g><g data-l="73-6" transform="translate(0.00 318.00)"><path d="M1229.06 1005.19C1476.88 987.377 1623.69 897.016 1586.05 829.261C1501.44 676.96 824.828 763.632 653.25 563.181C522.721 410.687 396.906 258.892 265.127 178.29C154.024 110.335 78.8298 346.917 101.547 520.605C111.608 597.528 104.419 722.892 74.1723 814.563C28.4359 953.18 129.681 1089.98 390.638 999.334C776.127 865.433 1125.59 1012.62 1229.06 1005.19Z" fill="var(--color-bg-light)"/></g><g data-l="38-84" transform="translate(11.00 0.00)"><path d="M1385.69 1043.82C1622.2 967.84 1743.41 845.303 1690.8 788.402C1572.55 660.497 935.839 904.905 721.709 750.823C558.808 633.604 400.652 515.948 253.56 468.859C129.549 429.158 112.528 676.771 175.724 840.106C203.712 912.443 226.413 1035.92 218.74 1132.13C207.137 1277.6 337.876 1386.51 569.896 1236.67C912.639 1015.32 1286.95 1075.54 1385.69 1043.82Z" fill="url(#sdd-38-84-fill)"/></g><g data-l="38-85" transform="translate(156.82 431.00)"><path d="M54.3327 596.906C42.9207 655.606 21.5253 805.832 71.0762 829.67C155.141 870.114 796.787 1058.15 1238.85 843.618C1535.21 699.796 1637.8 676.149 1505.78 190.581C1457.35 12.4728 924.196 434.615 505.087 271.03C435.012 243.678 279.439 132.11 144.586 87.0665C9.73403 42.0233 82.7079 313.098 80.5592 384.168C78.4104 455.237 70.3535 514.5 54.3327 596.906Z" fill="var(--color-bg-light)"/></g><g data-l="38-66" transform="translate(205.75 548.59)"><path d="M166.634 909.318C321.555 1003.35 449.012 974.979 557.55 1073.94C666.088 1172.9 861.463 1099.38 1027.83 1051.68C1194.2 1003.97 1268.31 745.34 1329.25 579.96C1390.18 414.58 1388.27 273.186 1166.55 183.705C1076.13 147.214 542.309 200.293 327.728 118.377C163.192 55.5664 79.3654 283.203 63.3625 357.185C46.399 435.606 11.714 815.286 166.634 909.318Z" fill="var(--color-bg-light)"/></g><g data-l="186-37" transform="translate(275.00 677.32)"><path d="M218.749 721.82C369.684 823.637 362.818 820.832 466.504 924.793C570.191 1028.75 772.5 967.688 943.848 930.38C1115.2 893.071 1101.81 612.537 1173.77 452.989C1245.74 293.442 1357.11 183.652 1138.28 82.4116C1049.04 41.1248 490.304 73.0482 313.017 46.1228C135.729 19.1975 31.7793 116.881 10.9773 188.912C-11.0732 265.266 67.8132 620.002 218.749 721.82Z" stroke="url(#sdd-186-37-paint0)" stroke-width="2"/></g><g data-l="45-127" transform="translate(505.00 770.11)"><path d="M128.805 571.861C215.129 623.169 279.931 601.619 342.356 657.514C404.781 713.41 502.348 662.27 586.306 627.705C670.264 593.139 713.374 386.412 735.422 284.556C757.427 182.904 707.402 163.772 587.029 117.737L586.306 117.46C537.003 98.6046 255.914 106.811 163.028 102.797C70.1423 98.7838 46.4623 197.323 42.4684 242.495C38.2349 290.378 42.4807 520.553 128.805 571.861Z" stroke="url(#sdd-45-127-paint0)" stroke-opacity="0.5" stroke-width="2"/></g><g data-l="73-4" transform="translate(258.08 621.00)"><path d="M194.456 798.159C343.021 875.549 457.073 890.437 563.869 975.82C670.665 1061.2 842.287 977.828 989.652 920.862C1137.02 863.896 1086.03 599.867 1127.88 439.662C1169.73 279.457 1253.6 161.408 1044.67 93.1352C959.461 65.2928 466.439 166.053 304.841 162.927C143.243 159.801 64.2945 265.446 55.805 336.299C46.8059 411.405 45.8898 720.77 194.456 798.159Z" fill="var(--color-bg-light)"/></g><g data-l="84-291" transform="translate(273.98 677.00)"><path d="M272.906 760.391C415.264 831.047 409.021 829.433 511.15 907.781C613.279 986.129 778.92 907.723 921.048 853.946C1063.18 800.169 1015.95 555.973 1057.31 407.301C1098.67 258.629 1180.15 148.713 979.661 86.9161C897.901 61.7147 423.016 158.435 267.612 156.652C112.208 154.869 35.5476 253.263 26.8946 318.946C17.7222 388.571 130.548 689.735 272.906 760.391Z" fill="var(--color-bg-light)"/><path d="M272.906 760.391C415.264 831.047 409.021 829.433 511.15 907.781C613.279 986.129 778.92 907.723 921.048 853.946C1063.18 800.169 1015.95 555.973 1057.31 407.301C1098.67 258.629 1180.15 148.713 979.661 86.9161C897.901 61.7147 423.016 158.435 267.612 156.652C112.208 154.869 35.5476 253.263 26.8946 318.946C17.7222 388.571 130.548 689.735 272.906 760.391Z" stroke="url(#sdd-84-291-paint0)" stroke-width="2"/></g><g data-l="73-5" transform="translate(326.26 656.71)"><path d="M254.979 734.091C384.65 805.564 378.986 803.887 472.429 882.3C565.872 960.714 714.333 886.275 841.922 835.647C969.511 785.019 923.173 544.697 958.298 399.439C993.424 254.181 1065.38 147.556 883.327 83.901C809.086 57.9421 381.528 145.698 241.109 141.609C100.689 137.52 32.9149 232.912 26.0864 297.232C18.8481 365.412 125.309 662.619 254.979 734.091Z" fill="var(--color-bg-light)"/></g><g data-l="45-126" transform="translate(661.83 913.38)"><path d="M70.9546 308.149C121.786 334.209 160.72 321.956 197.236 350.755C233.751 379.554 292.613 351.205 343.143 331.811C393.674 312.417 426.001 199.948 433.07 144.859C445.584 47.3491 336.796 98.2429 296.424 85.3015C267.258 75.952 267.755 48.6182 97.4357 59.2579C41.9785 62.7223 26.6787 110.833 23.7121 134.81C20.5674 160.228 20.1234 282.089 70.9546 308.149Z" fill="#FEFBF6"/></g></g><defs><linearGradient id="sdd-76-147-fill" x1="700" y1="1100" x2="550" y2="150" gradientUnits="userSpaceOnUse"><stop stop-color="var(--color-brand-blue)"/><stop offset="0.5" stop-color="var(--color-brand-violet)"/><stop offset="1" stop-color="var(--color-logo-violet)"/></linearGradient><linearGradient id="sdd-38-84-fill" x1="1400" y1="1100" x2="200" y2="550" gradientUnits="userSpaceOnUse"><stop stop-color="var(--color-logo-sky)"/><stop offset="0.45" stop-color="var(--color-brand-blue)"/><stop offset="1" stop-color="var(--color-logo-blue)"/></linearGradient><linearGradient id="sdd-186-37-paint0" x1="39.2838" y1="1007.38" x2="771.934" y2="-190.624" gradientUnits="userSpaceOnUse"><stop stop-color="var(--color-brand-mint)"/><stop offset="0.466597" stop-color="var(--color-brand-blue)"/><stop offset="0.932457" stop-color="var(--color-brand-violet)"/></linearGradient><linearGradient id="sdd-45-127-paint0" x1="113.998" y1="740.738" x2="514.595" y2="-21.8522" gradientUnits="userSpaceOnUse"><stop stop-color="var(--color-brand-mint)"/><stop offset="0.466597" stop-color="var(--color-brand-blue)"/><stop offset="0.932457" stop-color="var(--color-brand-violet)"/></linearGradient><linearGradient id="sdd-84-291-paint0" x1="155.455" y1="1032.72" x2="654.24" y2="-96.9484" gradientUnits="userSpaceOnUse"><stop stop-color="var(--color-brand-mint)"/><stop offset="0.466597" stop-color="var(--color-brand-blue)"/><stop offset="0.932457" stop-color="var(--color-brand-violet)"/></linearGradient></defs>`

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
      {/* Vectores del Figma: viewBox recortado arriba en y=414 (rel −280).
          filter on the <div>, not the <svg>: <svg> has overflow:hidden by
          default, which clips a drop-shadow cast off a cream-on-cream blob.
          Same params. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -z-10"
        style={{
          left: "-21.016%",
          top: "-29.412%",
          width: "158.532%",
          height: "138.933%",
          filter: DECO_SHADOW,
        }}
      >
        <svg
          viewBox="0 414 2029.21 1322.64"
          preserveAspectRatio="none"
          fill="none"
          className="h-full w-full overflow-visible"
          dangerouslySetInnerHTML={{ __html: DECO_SVG }}
        />
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
