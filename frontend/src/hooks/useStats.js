import { useEffect, useState } from 'react'
import { getStats } from '../services/api.js'

export default function useStats() {
  const [attempt, setAttempt] = useState(0)
  const [result, setResult] = useState({ attempt: -1, data: null, error: null })

  useEffect(() => {
    const controller = new AbortController()

    getStats({ signal: controller.signal })
      .then((body) => setResult({ attempt, data: body.data, error: null }))
      .catch((err) => {
        if (err.name === 'AbortError') return
        setResult({ attempt, data: null, error: err })
      })

    return () => controller.abort()
  }, [attempt])

  const loading = result.attempt !== attempt

  return {
    stats: loading ? null : result.data,
    error: loading ? null : result.error,
    loading,
    reload: () => setAttempt((n) => n + 1),
  }
}
