import { HttpError } from './httpError.js'

const STATUSES = ['alive', 'dead', 'unknown']
const SORT_KEYS = ['name_asc', 'name_desc', 'first_appearance', 'status', 'category']

function readString(query, name, maxLength = 100) {
  const value = query[name]
  if (value === undefined) return null
  if (typeof value !== 'string') {
    throw new HttpError(400, `Parámetro "${name}" inválido`)
  }
  const trimmed = value.trim()
  if (trimmed === '') return null
  if (trimmed.length > maxLength) {
    throw new HttpError(400, `Parámetro "${name}" demasiado largo`)
  }
  return trimmed
}

function readInt(query, name, { min, max, fallback = null }) {
  const raw = readString(query, name, 10)
  if (raw === null) return fallback
  const n = Number(raw)
  if (!Number.isInteger(n) || n < min || (max !== undefined && n > max)) {
    throw new HttpError(400, `Parámetro "${name}" inválido`)
  }
  return n
}

export function parseCharacterQuery(query) {
  const status = readString(query, 'status')
  if (status !== null && !STATUSES.includes(status)) {
    throw new HttpError(400, 'Parámetro "status" inválido')
  }

  const sort = readString(query, 'sort') ?? 'name_asc'
  if (!SORT_KEYS.includes(sort)) {
    throw new HttpError(400, 'Parámetro "sort" inválido')
  }

  return {
    search: readString(query, 'search'),
    status,
    category: readString(query, 'category', 50),
    season: readInt(query, 'season', { min: 1 }),
    sort,
    page: readInt(query, 'page', { min: 1, fallback: 1 }),
    limit: readInt(query, 'limit', { min: 1, max: 50, fallback: 12 }),
  }
}
