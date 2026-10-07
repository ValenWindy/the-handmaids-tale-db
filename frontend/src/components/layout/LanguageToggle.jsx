import useLanguage from '../../hooks/useLanguage.js'

const LANGUAGES = [
  ['es', 'ES', 'Español'],
  ['en', 'EN', 'English'],
]

export default function LanguageToggle() {
  const { lang, setLang, t } = useLanguage()

  return (
    <div role="group" aria-label={t('language.label')} className="flex border border-line text-xs">
      {LANGUAGES.map(([code, short, name]) => (
        <button
          key={code}
          type="button"
          lang={code}
          title={name}
          aria-pressed={lang === code}
          onClick={() => setLang(code)}
          className={`px-2.5 py-1 tracking-widest transition-colors ${
            lang === code ? 'bg-gilead text-bone' : 'text-muted hover:text-bone'
          }`}
        >
          {short}
        </button>
      ))}
    </div>
  )
}
