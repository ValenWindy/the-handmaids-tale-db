import { useContext } from 'react'
import { LanguageContext } from '../i18n/LanguageContext.js'

export default function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage tiene que usarse dentro de <LanguageProvider>')
  }
  return context
}
