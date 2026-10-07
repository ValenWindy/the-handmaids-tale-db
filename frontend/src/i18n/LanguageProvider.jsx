import { useCallback, useEffect, useMemo, useState } from 'react'
import { LanguageContext } from './LanguageContext.js'
import { translations } from './translations.js'

const STORAGE_KEY = 'lang'
const SUPPORTED = Object.keys(translations)

// 1) lo que el usuario eligió la última vez, 2) el idioma del navegador, 3) español
function getInitialLanguage() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (SUPPORTED.includes(saved)) return saved
  } catch {
    // localStorage puede no estar disponible; seguimos sin recordar la elección
  }
  return navigator.language?.toLowerCase().startsWith('en') ? 'en' : 'es'
}

// Busca "detail.back" dentro del diccionario. Devuelve undefined si no existe.
function resolve(dictionary, key) {
  return key.split('.').reduce(
    (node, part) =>
      node !== null && typeof node === 'object' && Object.hasOwn(node, part)
        ? node[part]
        : undefined,
    dictionary
  )
}

export default function LanguageProvider({ children }) {
  const [lang, setLang] = useState(getInitialLanguage)

  useEffect(() => {
    document.documentElement.lang = lang
    try {
      localStorage.setItem(STORAGE_KEY, lang)
    } catch {
      // ver arriba
    }
  }, [lang])

  // t('detail.back') → texto traducido. Si falta la clave, devuelve la clave (se nota en pantalla).
  const t = useCallback(
    (key, params = {}) => {
      const value = resolve(translations[lang], key)
      if (typeof value === 'function') return value(params)
      if (typeof value === 'string') return value
      return key
    },
    [lang]
  )

  // tOr('categories.Wife', 'Wife') → para datos que vienen de la base y pueden no estar en el diccionario
  const tOr = useCallback(
    (key, fallback) => {
      const value = resolve(translations[lang], key)
      return typeof value === 'string' ? value : fallback
    },
    [lang]
  )

  const value = useMemo(() => ({ lang, setLang, t, tOr }), [lang, t, tOr])

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}
