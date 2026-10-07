import useCharacterFilters from '../hooks/useCharacterFilters.js'
import useFilterOptions from '../hooks/useFilterOptions.js'
import useCharacters from '../hooks/useCharacters.js'
import useLanguage from '../hooks/useLanguage.js'
import useDocumentTitle from '../hooks/useDocumentTitle.js'
import SearchBar from '../components/filters/SearchBar.jsx'
import FilterPanel from '../components/filters/FilterPanel.jsx'
import SortSelect from '../components/filters/SortSelect.jsx'
import CharacterGrid from '../components/characters/CharacterGrid.jsx'
import Pagination from '../components/ui/Pagination.jsx'
import LoadingState from '../components/ui/LoadingState.jsx'
import ErrorState from '../components/ui/ErrorState.jsx'
import EmptyState from '../components/ui/EmptyState.jsx'
import { errorMessage } from '../utils/errors.js'

export default function Characters() {
  const { t } = useLanguage()
  const { filters, update } = useCharacterFilters()
  const { categories, seasons } = useFilterOptions()
  const { data, pagination, loading, error, reload } = useCharacters(filters)
  useDocumentTitle(t('nav.characters'))

  const hasFilters = Boolean(
    filters.search || filters.status || filters.category || filters.season
  )
  const outOfRange = pagination && pagination.total > 0 && data.length === 0

  const clearFilters = () =>
    update({ search: '', status: '', category: '', season: '' })

  const goToPage = (page) => {
    update({ page })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <section>
      <header className="mb-10">
        <p className="text-xs uppercase tracking-[0.3em] text-gilead-bright">
          The Handmaid's Tale
        </p>
        <h1 className="mt-2 font-display text-4xl sm:text-5xl">Character Database</h1>
      </header>

      <div className="mb-6 space-y-4">
        <SearchBar value={filters.search} onChange={(search) => update({ search })} />
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          <FilterPanel
            filters={filters}
            categories={categories}
            seasons={seasons}
            onChange={update}
          />
          <SortSelect value={filters.sort} onChange={(sort) => update({ sort })} />
        </div>
      </div>

      <p className="mb-6 min-h-5 text-sm text-muted" aria-live="polite">
        {pagination && t('characters.count', { count: pagination.total })}
      </p>

      {error && <ErrorState message={errorMessage(error, t)} onRetry={reload} />}

      {!error && loading && data.length === 0 && <LoadingState variant="grid" />}

      {!error && !loading && data.length === 0 && (
        outOfRange ? (
          <EmptyState
            message={t('characters.outOfRange')}
            action={{ label: t('characters.backToFirst'), onClick: () => update({ page: 1 }) }}
          />
        ) : hasFilters ? (
          <EmptyState
            message={t('characters.emptyFiltered')}
            action={{ label: t('characters.clearFilters'), onClick: clearFilters }}
          />
        ) : (
          <EmptyState message={t('characters.emptyNoData')} />
        )
      )}

      {!error && data.length > 0 && (
        <div
          aria-busy={loading}
          className={`transition-opacity ${loading ? 'opacity-50' : ''}`}
        >
          <CharacterGrid characters={data} />
        </div>
      )}

      {!error && pagination && (
        <Pagination
          page={pagination.page}
          totalPages={pagination.totalPages}
          onChange={goToPage}
        />
      )}
    </section>
  )
}
