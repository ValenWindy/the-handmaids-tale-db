// "Dr. Emily Malek" (el tratamiento es opcional)
export const fullName = (c) => [c.title, c.firstName, c.lastName].filter(Boolean).join(' ')

// "Emily Malek" → "EM" (sin el tratamiento)
export const initials = (c) =>
  [c.firstName, c.lastName]
    .filter(Boolean)
    .map((part) => part[0].toUpperCase())
    .join('')

// { name: 'Ofjoseph', number: 2 } → "Ofjoseph #2"; sin número → "Ofjoseph"
export const handmaidLabel = ({ name, number }) => (number ? `${name} #${number}` : name)

// Elige la descripción del idioma actual; si no existe, usa la del otro idioma
// y avisa que es un reemplazo para que la interfaz pueda indicarlo.
export function pickDescription(character, lang) {
  const own = lang === 'es' ? character.descriptionEs : character.descriptionEn
  if (own) return { text: own, isFallback: false }

  const other = lang === 'es' ? character.descriptionEn : character.descriptionEs
  if (other) return { text: other, isFallback: true }

  return { text: null, isFallback: false }
}
