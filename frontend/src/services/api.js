// Vacío = mismo dominio (desarrollo con proxy, o Express sirviendo el frontend).
// En Netlify/Vercel: https://tu-backend.onrender.com  (sin /api y sin barra final)
const API_URL = (import.meta.env.VITE_API_URL ?? '').replace(/\/$/, '')
const BASE = `${API_URL}/api`

// Si el backend está en otro dominio, las fotos (/images/...) también hay que apuntarlas ahí
function withImage(character) {
  if (character?.imageUrl?.startsWith('/')) {
    return { ...character, imageUrl: `${API_URL}${character.imageUrl}` }
  }
  return character
}

async function request(path, { signal } = {}) {
  let res
  try {
    res = await fetch(`${BASE}${path}`, { signal })
  } catch (err) {
    if (err.name === 'AbortError') throw err
    const error = new Error('Network error')
    error.code = 'network'
    throw error
  }

  const body = await res.json().catch(() => null)

  if (!res.ok) {
    const error = new Error(body?.error?.message ?? 'Request failed')
    error.status = res.status
    // Sin cuerpo JSON la respuesta no vino de nuestra API (ej. el proxy sin backend)
    error.code = body ? 'http' : 'network'
    throw error
  }

  return body
}

// Arma "?a=1&b=2" ignorando los valores vacíos
function toQuery(params = {}) {
  const query = new URLSearchParams()
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== null && value !== '') {
      query.set(key, value)
    }
  }
  const text = query.toString()
  return text ? `?${text}` : ''
}

export const getCharacters = async (params, options) => {
  const res = await request(`/characters${toQuery(params)}`, options)
  return { ...res, data: res.data.map(withImage) }
}

export const getCharacter = async (slug, options) => {
  const res = await request(`/characters/${encodeURIComponent(slug)}`, options)
  return { ...res, data: withImage(res.data) }
}

export const getCategories = (options) => request('/categories', options)
export const getSeasons = (options) => request('/seasons', options)
export const getStats = (options) => request('/stats', options)
