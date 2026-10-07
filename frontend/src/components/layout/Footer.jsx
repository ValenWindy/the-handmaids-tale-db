import useLanguage from '../../hooks/useLanguage.js'

export default function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="border-t border-line">
      <p className="mx-auto max-w-6xl px-4 py-6 text-xs text-muted sm:px-6">
        {t('footer.disclaimer')}
      </p>
    </footer>
  )
}
