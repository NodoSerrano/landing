// Sombra de los blobs decorativos crema (Somos mobile/desktop, Community desktop).
//
// Es un <filter> SVG aplicado por el atributo filter="url(#…)", NO la propiedad
// CSS `filter`: Safari ignora los filtros CSS en hijos de un <svg>, así que la
// versión anterior (style="filter:var(--drop-shadow-*)" sobre cada <g>) no
// dibujaba nada ahí. La estructura viene de events-blob-shadow (events.tsx),
// recalibrada para blobs crema sobre fondo crema.
//
// filterUnits queda en su default objectBoundingBox → x/y/width/height son % del
// bbox de CADA shape, así la región se mantiene chica. El filtro que Safari sí
// llegó a dropear (el de Community) usaba userSpaceOnUse sobre el canvas entero.
//
// Se emite como string porque los decos se inyectan con dangerouslySetInnerHTML;
// de ahí el kebab-case en los atributos (flood-color, etc.), que es HTML crudo.

/**
 * @param yScale (escala Y / escala X) del svg contenedor. Los decos usan
 * preserveAspectRatio="none", así que un dy/blur uniforme en user units sale
 * estirado en pantalla; dividir la componente Y por yScale lo devuelve a
 * redondo. 1 = isotrópico.
 */
export function blobShadowFilterMarkup(id: string, { yScale = 1 } = {}) {
  const y = (n: number) => +(n / yScale).toFixed(2)
  // Single feDropShadow. The previous 8-primitive double-shadow recipe was
  // rasterised on the CPU by iOS Safari and, stacked ~9x across the Somos
  // decoration, froze the section for several seconds on scroll. One soft
  // drop-shadow reads close enough and costs a fraction.
  return `<filter id="${id}" x="-12%" y="-12%" width="124%" height="124%" color-interpolation-filters="sRGB">
    <feDropShadow dx="4" dy="${y(5)}" stdDeviation="10 ${y(10)}" flood-color="#070f22" flood-opacity="0.12"/>
  </filter>`
}

export const blobShadowAttr = (id: string) => `filter="url(#${id})"`
