import { useEffect, useState } from 'react'
import { getCharacter } from '../services/api.js'

export default function useCharacter(slug) {
  const [attempt, setAttempt] = useState(0)
  const [result, setResult] = useState({
    slug: null,
    attempt: -1,
    data: null,
    error: null,
  })

  useEffect(() => {
    const controller = new AbortController()

    getCharacter(slug, { signal: controller.signal })
      .then((body) => setResult({ slug, attempt, data: body.data, error: null }))
      .catch((err) => {
        if (err.name === 'AbortError') return
        setResult({ slug, attempt, data: null, error: err })
      })

    return () => controller.abort()
  }, [slug, attempt])

  // Mientras el resultado guardado no sea de este slug, estamos cargando
  const loading = result.slug !== slug || result.attempt !== attempt

  return {
    character: loading ? null : result.data,
    error: loading ? null : result.error,
    loading,
    reload: () => setAttempt((n) => n + 1),
  }
}
