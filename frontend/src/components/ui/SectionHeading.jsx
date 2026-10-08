// Título de sección de la ficha ("Descripción", "Relaciones").
// Se distingue a primera vista: rojo, en mayúsculas, con un trazo corto a la izquierda
// y una línea fina que ocupa el resto del ancho. Las mayúsculas son solo de estilo (CSS),
// el texto del diccionario no cambia.
export default function SectionHeading({ children }) {
  return (
    <h2 className="mb-5 flex items-center gap-4 text-sm font-semibold uppercase tracking-[0.25em] text-gilead-bright">
      <span aria-hidden="true" className="h-0.5 w-8 bg-gilead" />
      {children}
      <span aria-hidden="true" className="h-px flex-1 bg-line" />
    </h2>
  )
}
