"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { Container } from "@/components/ui/container"
import SomosDesktop from "./somos-desktop"
import { blobShadowAttr, blobShadowFilterMarkup } from "./blob-shadow-filter"
import { fadeInUp, TaglineMark, CardUnderline } from "./somos-shared"

// Card data (Figma frame 225:65 — Frame 32). Order top→bottom as in the design.
const CARDS = [
  {
    title: "Hub",
    desc: "Un espacio físico para compartir y crear el nuevo mundo digital abierto.",
  },
  {
    title: "Hackerspace",
    desc: "Un espacio equipado con recursos de hardware, herramientas de hacking y tecnología.",
  },
  {
    title: "Educación",
    desc: "Desde talleres prácticos de Ethereum y seguridad operacional hasta charlas espontáneas.",
  },
  {
    title: "Eventos",
    desc: "Actividades e instituciones privadas serán parte de nuestros encuentros.",
  },
  {
    title: "Comunidad",
    desc: "Juntos podemos construir más. Queremos conectar la comunidad local con el mundo.",
  },
  {
    title: "Arte",
    desc: "Un espacio creativo transversal donde la tecnología y el arte convergen.",
  },
]

// Decorative background — blobs crema orgánicos + wires de colores (mint, rojo→
// violeta, azul). SVG exportado de Figma (nodo 225:65, 9 vectores).
// Se posiciona por porcentajes de la columna de contenido:
// el contenido (Frame 71) ocupa el sub-rect SVG x[448,801] y[0,1090] del viewBox
// 1200×1890 → mapeado a [0,W]×[0,H] con preserveAspectRatio="none".
// La capa de decoración desktop vive en somos-desktop.tsx.
//
// Sombras: filtro SVG (url(#…)), no CSS filter — Safari ignora la propiedad
// filter en hijos de un <svg>, así que el patrón anterior (style="filter:var(
// --drop-shadow-neumorphic-soft)" por <g>) no dibujaba nada ahí. Es el mismo
// filtro que usa el deco desktop; ver blob-shadow-filter.tsx.
const DECO_SHADOW_ID = "somos-m-blob-shadow"
const DECO_SHADOW = blobShadowAttr(DECO_SHADOW_ID)
// (escala Y / escala X) del svg deco: con preserveAspectRatio="none" y
// w-[440%]/h-[173%] queda anisotrópico, y sin corregir la sombra sale estirada.
// Medido a 390px de ancho: 1575×2020 sobre viewBox 1200×1890 → (2020/1890)/(1575/1200).
// Aproximación: el alto de la columna es content-driven, así que varía un poco
// con el viewport, pero el desvío es chico y la sombra es difusa.
const DECO_Y_SCALE = 0.814
const DECO_SVG = `<g id="Vector 92" ${DECO_SHADOW}><path d="M863.997 1409.56C907.363 1466.6 841.065 1567.01 777.696 1613.02C647.272 1750.04 231.542 1651.52 217.113 1618.47C202.685 1585.42 179.216 1542.94 82.4904 1455.21C-14.2349 1367.48 164.024 1316.09 271.446 1213.73C378.868 1111.37 550.858 1194.91 638.229 1206.89C725.599 1218.87 775.015 1261.66 805.985 1300.42C836.955 1339.18 820.631 1352.52 863.997 1409.56Z" fill="#2E9BFF"/></g><g id="Vector 93" ${DECO_SHADOW}><path d="M856.838 1439.61C892.715 1501.64 814.358 1592.96 745.724 1630.66C599.158 1750.26 199.05 1600.42 188.876 1565.82C178.703 1531.23 160.74 1486.15 75.7701 1386.99C-9.20019 1287.83 174.093 1259.17 293.495 1171.08C412.896 1082.99 573.063 1187.42 658.243 1210.26C743.424 1233.09 787.089 1281.73 812.958 1324.07C838.828 1366.4 820.961 1377.59 856.838 1439.61Z" fill="#F8F4ED"/></g><g id="Vector 119" ${DECO_SHADOW}><path d="M901.566 679.607C972.595 689.06 997.081 806.867 985.041 884.243C990.292 1073.35 818.964 1108.14 758.016 1189.37C665.973 1312.05 513.454 1259.34 383.044 1266.1C252.635 1272.86 341.839 1110.19 344.964 961.847C348.088 813.5 528.583 750.401 598.671 696.876C668.758 643.352 733.936 638.46 783.261 643.818C832.586 649.176 830.537 670.155 901.566 679.607Z" fill="url(#paint0_linear_225_65)"/></g><g id="Vector 120" ${DECO_SHADOW}><path d="M896.038 672.531C967.067 681.983 991.553 799.791 979.513 877.167C984.764 1066.27 813.436 1101.06 752.488 1182.3C660.445 1304.98 507.926 1252.26 377.517 1259.02C247.107 1265.78 336.312 1103.12 339.436 954.771C342.56 806.424 523.055 743.325 593.143 689.8C663.23 636.276 728.408 631.384 777.733 636.742C827.058 642.1 825.009 663.079 896.038 672.531Z" fill="#F8F4ED"/></g><g id="Vector 117" ${DECO_SHADOW}><path d="M935.057 379.1C1007.08 388.133 1036.76 509.061 1027.89 588.76C1041.19 783.201 757.727 981.983 650.313 1005.45C613.558 1013.47 568.245 979.113 437.034 987.331C305.822 995.548 388.886 827.382 385.757 674.776C382.629 522.17 561.958 455.524 630.365 399.795C698.772 344.066 764.287 338.404 814.25 343.436C864.213 348.469 863.036 370.066 935.057 379.1Z" fill="#4FE6C3"/></g><g id="Vector 118" ${DECO_SHADOW}><path d="M906.331 345.864C977.986 345.905 1017.73 459.476 1015.96 537.763C1046 724.537 720.634 978.592 684.937 989.397C586.563 1019.17 597.722 971.545 469.33 995.376C340.938 1019.21 408.006 846.234 391.619 698.762C375.233 551.289 545.877 465.031 608.327 402.765C670.778 340.499 734.749 327.089 784.35 325.923C833.951 324.756 834.676 345.822 906.331 345.864Z" fill="#F8F4ED"/></g><g id="Vector 107" ${DECO_SHADOW}><path d="M342.028 1628.85C291.873 1577.67 345.101 1469.76 402.224 1416.2C514.5 1263.95 670.932 1342 768.971 1315.5C917.03 1275.49 1004.77 1410.92 1111.7 1485.88C1218.63 1560.83 1048.2 1634.1 954.408 1749.09C860.621 1864.07 679.538 1802.68 591.355 1801.71C503.172 1800.74 448.798 1764.47 413.226 1729.88C377.654 1695.3 392.184 1680.02 342.028 1628.85Z" fill="url(#paint1_linear_225_65)"/></g><g id="Vector 109" ${DECO_SHADOW}><path d="M342.028 1637.83C291.873 1586.65 345.101 1478.74 402.224 1425.18C514.5 1272.92 670.932 1350.98 768.971 1324.48C917.03 1284.47 1004.77 1419.9 1111.7 1494.86C1218.63 1569.81 1048.2 1643.08 954.408 1758.06C860.621 1873.05 679.538 1811.66 591.355 1810.69C503.172 1809.72 448.798 1773.45 413.226 1738.86C377.654 1704.28 392.184 1689 342.028 1637.83Z" fill="#F8F4ED"/></g><g id="Vector 108" ${DECO_SHADOW}><path d="M338.027 1645.89C287.871 1594.71 341.099 1486.8 398.222 1433.24C510.498 1280.99 677.934 1409.53 775.974 1383.03C924.033 1343.02 1000.77 1427.96 1107.7 1502.92C1214.63 1577.87 1044.19 1651.14 950.406 1766.13C856.619 1881.11 675.537 1819.72 587.354 1818.75C499.171 1817.78 444.796 1781.51 409.224 1746.92C373.653 1712.34 388.182 1697.07 338.027 1645.89Z" fill="#F8F4ED"/></g><defs>${blobShadowFilterMarkup(DECO_SHADOW_ID, { yScale: DECO_Y_SCALE })}<linearGradient id="paint0_linear_225_65" x1="538.25" y1="730.408" x2="828.599" y2="1154.2" gradientUnits="userSpaceOnUse"><stop stop-color="#FF9728"/><stop offset="0.5" stop-color="#FF3121"/><stop offset="1" stop-color="#9E1FD0"/></linearGradient><linearGradient id="paint1_linear_225_65" x1="659.611" y1="1812.48" x2="691.695" y2="1299.77" gradientUnits="userSpaceOnUse"><stop stop-color="#FF9728"/><stop offset="0.5" stop-color="#FF3121"/><stop offset="1" stop-color="#9E1FD0"/></linearGradient></defs>`

function Decorations() {
  return (
    <svg
      viewBox="0 0 1200 1890"
      fill="none"
      aria-hidden="true"
      preserveAspectRatio="none"
      className="pointer-events-none absolute left-[-170%] top-0 -z-10 h-[173%] w-[440%] md:hidden"
      dangerouslySetInnerHTML={{ __html: DECO_SVG }}
    />
  )
}

export default function Somos() {
  return (
    <section
      id="about"
      className="font-inter relative isolate z-20 overflow-hidden bg-(--color-bg-light) py-16 md:py-20 lg:overflow-visible lg:bg-transparent lg:py-0"
    >
      <Container>
        {/* Desktop (lg+): composición freeform del Figma */}
        <SomosDesktop />

        {/* Mobile / tablet */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
          className="relative mx-auto flex w-full  flex-col gap-9 md:max-w-none lg:hidden"
        >
          <Decorations />

          {/* Header — centrado */}
          <motion.div variants={fadeInUp} className="flex flex-col items-center gap-3 text-center">
            <div className="flex items-center justify-center gap-2">
              <TaglineMark />
              <span className="text-body-lg text-(--color-accent-violet)">
                Educación·Comunidad·Arte
              </span>
            </div>
            <h2 className="font-display text-[3.5rem] font-bold leading-none">
              <span className="bg-gradient-brand bg-clip-text text-transparent">
                SOMOS
              </span>
            </h2>
          </motion.div>

          {/* Photo collage */}
          <motion.div variants={fadeInUp} className="grid grid-cols-2 grid-rows-2 gap-2">
            <div className="relative row-span-2 aspect-[180/244] overflow-hidden rounded-[8px]">
              <Image src="/somos/hackerspace.webp" alt="Hackerspace Nodo Serrano" fill sizes="50vw" className="object-cover" />
            </div>
            <div className="relative aspect-[180/120] overflow-hidden rounded-[8px]">
              <Image src="/somos/hub.webp" alt="Hub Nodo Serrano" fill sizes="50vw" className="object-cover" />
            </div>
            <div className="relative aspect-[180/120] overflow-hidden rounded-[8px]">
              <Image src="/somos/comunidad.webp" alt="Comunidad Nodo Serrano" fill sizes="50vw" className="object-cover" />
            </div>
          </motion.div>

          {/* Cards */}
          <div className="flex flex-col gap-6">
            {CARDS.map((card) => (
              <motion.article
                key={card.title}
                variants={fadeInUp}
                className="rounded-[8px] bg-(--color-bg-warm-white) p-3"
                style={{ boxShadow: "var(--shadow-somos-card)" }}
              >
                <div className="w-fit">
                  <h3 className="font-display text-mob-h2 font-medium text-(--color-text-primary-light)">
                    {card.title}
                  </h3>
                  <CardUnderline />
                </div>
                <p className="mt-2 max-w-[301px] text-body text-(--color-text-primary-light)">
                  {card.desc}
                </p>
              </motion.article>
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  )
}
