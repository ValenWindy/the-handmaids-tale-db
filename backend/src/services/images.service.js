import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

// backend/images/characters/  ← acá se guardan las fotos
export const CHARACTERS_DIR = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  '../../images/characters'
)

// Formatos aceptados, de mayor a menor prioridad (si hay dos archivos del mismo personaje)
const EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp']

export const IMAGE_FILE = new RegExp(`\\.(${EXTENSIONS.map((e) => e.slice(1)).join('|')})$`, 'i')

// Lee la carpeta y devuelve un Map: slug → { file, rank }.
// La foto de un personaje es el archivo cuyo nombre (sin extensión) es su slug:
// june-osborne.jpg → personaje "june-osborne". No importan las mayúsculas del nombre.
export function listCharacterPhotos() {
  let files
  try {
    files = fs.readdirSync(CHARACTERS_DIR)
  } catch {
    return new Map()   // la carpeta no existe: ningún personaje tiene foto
  }

  const photos = new Map()
  for (const file of files) {
    const { name, ext } = path.parse(file)
    const rank = EXTENSIONS.indexOf(ext.toLowerCase())
    if (rank === -1) continue   // ignora .gitkeep, LEEME.txt, etc.

    const slug = name.toLowerCase()
    const current = photos.get(slug)
    if (!current || rank < current.rank) photos.set(slug, { file, rank })
  }
  return photos
}

// URL pública de la foto, o null si el personaje no tiene
export function photoUrl(photos, slug) {
  const photo = photos.get(slug)
  return photo ? `/images/characters/${encodeURIComponent(photo.file)}` : null
}
