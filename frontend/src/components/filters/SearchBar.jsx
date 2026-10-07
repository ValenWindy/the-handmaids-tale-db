import { useEffect, useRef, useState } from 'react'
import useLanguage from '../../hooks/useLanguage.js'

export default function SearchBar({ value, onChange }) {
  const { t } = useLanguage()
  const [text, setText] = useState(value)
  const [prevValue, setPrevValue] = useState(value)
  const timer = useRef(null)

  // Si la URL cambia desde afuera (ej. "Limpiar filtros"), sincronizamos el input
  if (value !== prevValue) {
    setPrevValue(value)
    setText(value)
  }

  useEffect(() => () => clearTimeout(timer.current), [])

  const handleChange = (e) => {
    const next = e.target.value
    setText(next)
    clearTimeout(timer.current)
    timer.current = setTimeout(() => onChange(next), 300)
  }

  return (
    <label className="block">
      <span className="sr-only">{t('characters.searchLabel')}</span>
      <input
        type="search"
        value={text}
        onChange={handleChange}
        placeholder={t('characters.searchPlaceholder')}
        className="w-full border border-line bg-panel px-4 py-3 text-bone placeholder:text-muted focus:border-gilead focus:outline-none"
      />
    </label>
  )
}
