import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'

const DEFAULTS = { sort: 'name_asc', page: 1 }

export default function useCharacterFilters() {
  const [searchParams, setSearchParams] = useSearchParams()

  const filters = useMemo(
    () => ({
      search: searchParams.get('search') ?? '',
      status: searchParams.get('status') ?? '',
      category: searchParams.get('category') ?? '',
      season: searchParams.get('season') ?? '',
      sort: searchParams.get('sort') ?? DEFAULTS.sort,
      page: Math.max(1, parseInt(searchParams.get('page'), 10) || 1),
    }),
    [searchParams]
  )

  const update = (changes) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev)

      for (const [key, value] of Object.entries(changes)) {
        const isEmpty = value === '' || value === null || value === undefined
        if (isEmpty || value === DEFAULTS[key]) next.delete(key)
        else next.set(key, value)
      }

      // Cambiar cualquier cosa que no sea la página vuelve a la página 1
      if (!('page' in changes)) next.delete('page')

      return next
    })
  }

  return { filters, update }
}
