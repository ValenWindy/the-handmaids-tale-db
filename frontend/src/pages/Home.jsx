import { Link } from 'react-router-dom'
import useLanguage from '../hooks/useLanguage.js'
import useStats from '../hooks/useStats.js'
import useDocumentTitle from '../hooks/useDocumentTitle.js'
import LoadingState from '../components/ui/LoadingState.jsx'
import { errorMessage } from '../utils/errors.js'

export default function Home() {
  const { t, tOr } = useLanguage()
  const { stats, loading, error, reload } = useStats()
  useDocumentTitle()

  return (
    <section className="py-16">
      <div className="grid items-center gap-12 md:grid-cols-[1fr_auto]">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-gilead-bright">
            The Handmaid's Tale
          </p>
          <h1 className="mt-3 font-display text-5xl sm:text-6xl">Character Database</h1>
          <p className="mt-6 max-w-xl text-muted">{t('home.description')}</p>
          <Link
            to="/characters"
            className="mt-10 inline-block border border-gilead px-6 py-3 text-sm uppercase tracking-widest transition-colors hover:bg-gilead"
          >
            {t('home.cta')}
          </Link>
        </div>

        {/* Ilustración decorativa: solo desde pantallas medianas, donde sobra espacio.
            El archivo está en frontend/public/icon.jpg. */}
        <img
          src="/icon.jpg"
          alt=""
          width="700"
          height="990"
          className="hidden w-64 border border-line md:block lg:w-72"
        />
      </div>

      <div className="mt-16 border-t border-line pt-8">
        {loading && <LoadingState variant="inline" />}

        {error && (
          <p className="text-sm text-muted">
            {errorMessage(error, t)}{' '}
            <button onClick={reload} className="text-gilead-bright hover:underline">
              {t('errors.retry')}
            </button>
          </p>
        )}

        {stats && (
          <>
            <p className="font-display text-5xl">{stats.totalCharacters}</p>
            <p className="mt-1 text-sm text-muted">
              {t('home.total', { count: stats.totalCharacters })}
            </p>

            <h2 className="mt-10 text-sm uppercase tracking-[0.2em] text-muted">
              {t('home.categories')}
            </h2>
            <ul className="mt-4 flex flex-wrap gap-3">
              {stats.categories.map((category) => (
                <li key={category.name}>
                  <Link
                    to={`/characters?category=${encodeURIComponent(category.name)}`}
                    className="flex items-center gap-3 border border-line px-4 py-2 transition-colors hover:border-gilead"
                  >
                    <span>{tOr(`categories.${category.name}`, category.name)}</span>
                    <span className="text-sm text-muted">{category.count}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </section>
  )
}
