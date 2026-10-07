import { useEffect } from 'react'

const SITE = "The Handmaid's Tale · Character Database"

// useDocumentTitle('June Osborne') → "June Osborne · The Handmaid's Tale · Character Database"
// useDocumentTitle() → solo el nombre del sitio
export default function useDocumentTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} · ${SITE}` : SITE
  }, [title])
}
