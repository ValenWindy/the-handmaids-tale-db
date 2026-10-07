import { Link } from 'react-router-dom'
import useLanguage from '../hooks/useLanguage.js'
import useDocumentTitle from '../hooks/useDocumentTitle.js'

export default function NotFound() {
  const { t } = useLanguage()
  useDocumentTitle(t('notFound.title'))

  return (
    <section className="py-20 text-center">
      <h1 className="font-display text-4xl">{t('notFound.title')}</h1>
      <p className="mt-4 text-muted">{t('notFound.text')}</p>
      <Link to="/" className="mt-8 inline-block text-gilead-bright hover:underline">
        {t('notFound.home')}
      </Link>
    </section>
  )
}
