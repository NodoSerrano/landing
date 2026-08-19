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
  // Sombra paper-cut suave: blur largo + alpha bajo para que el apilado de
  // blobs crema no se lea como un telón duro contra el fondo. Calibrado en el
  // pase de suavizado: alphas ~0.05-0.07 y stdDeviation 16-18. Lo consumen los
  // decos de Somos mobile (somos.tsx) y Somos desktop (somos-desktop.tsx).
  return `<filter id="${id}" x="-14%" y="-14%" width="128%" height="128%" color-interpolation-filters="sRGB">
    <feDropShadow dx="4" dy="${y(5)}" stdDeviation="18 ${y(18)}" flood-color="#070f22" flood-opacity="0.07" result="drop1"/>
    <feDropShadow in="drop1" dx="-2" dy="${y(-3)}" stdDeviation="16 ${y(16)}" flood-color="#393b5b" flood-opacity="0.05" result="shape"/>
    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
    <feOffset dx="-1" dy="${y(-1)}"/>
    <feGaussianBlur stdDeviation="2.5 ${y(2.5)}"/>
    <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
    <feColorMatrix type="matrix" values="0 0 0 0 0.027 0 0 0 0 0.058 0 0 0 0 0.134 0 0 0 0.07 0"/>
    <feBlend in2="shape" mode="normal"/>
  </filter>`
}

export const blobShadowAttr = (id: string) => `filter="url(#${id})"`
