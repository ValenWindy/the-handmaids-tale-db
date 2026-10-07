import { useEffect, useState } from 'react'
import { getCategories, getSeasons } from '../services/api.js'

export default function useFilterOptions() {
  const [options, setOptions] = useState({ categories: [], seasons: [] })

  useEffect(() => {
    const controller = new AbortController()
    const { signal } = controller

    Promise.all([getCategories({ signal }), getSeasons({ signal })])
      .then(([categories, seasons]) =>
        setOptions({ categories: categories.data, seasons: seasons.data })
      )
      .catch(() => {
        // Si falla, los selects quedan solo con "Todos/Todas".
        // El error real se muestra en el listado.
      })

    return () => controller.abort()
  }, [])

  return options
}
