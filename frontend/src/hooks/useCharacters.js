import { useEffect, useState } from 'react'
import { getCharacters } from '../services/api.js'

const PAGE_SIZE = 12

export default function useCharacters(filters) {
  const [attempt, setAttempt] = useState(0)
  const [result, setResult] = useState({
    filters: null,
    attempt: -1,
    data: [],
    pagination: null,
    error: null,
  })

  useEffect(() => {
    const controller = new AbortController()

    getCharacters({ ...filters, limit: PAGE_SIZE }, { signal: controller.signal })
      .then((body) =>
        setResult({ filters, attempt, data: body.data, pagination: body.pagination, error: null })
      )
      .catch((err) => {
        if (err.name === 'AbortError') return
        setResult({ filters, attempt, data: [], pagination: null, error: err })
      })

    return () => controller.abort()
  }, [filters, attempt])

  // Mientras el resultado guardado no corresponda a los filtros actuales, estamos cargando
  const loading = result.filters !== filters || result.attempt !== attempt

  return {
    data: result.data,
    pagination: result.pagination,
    loading,
    error: loading ? null : result.error,
    reload: () => setAttempt((n) => n + 1),
  }
}
