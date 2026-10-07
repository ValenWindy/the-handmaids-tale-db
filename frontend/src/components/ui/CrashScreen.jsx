import useLanguage from '../../hooks/useLanguage.js'

export default function CrashScreen() {
  const { t } = useLanguage()

  return (
    <main
      role="alert"
      className="mx-auto flex min-h-screen max-w-xl flex-col items-center justify-center px-6 text-center"
    >
      <h1 className="font-display text-4xl">{t('crash.title')}</h1>
      <p className="mt-4 text-muted">{t('crash.text')}</p>
      <button
        onClick={() => window.location.reload()}
        className="mt-8 border border-gilead px-6 py-3 text-sm uppercase tracking-widest transition-colors hover:bg-gilead"
      >
        {t('crash.reload')}
      </button>
    </main>
  )
}
