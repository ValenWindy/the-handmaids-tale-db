import { getPageItems } from '../../utils/pagination.js'
import useLanguage from '../../hooks/useLanguage.js'

const base = 'min-w-10 border px-3 py-2 text-sm transition-colors'
const idle = 'border-line text-muted hover:text-bone'

export default function Pagination({ page, totalPages, onChange }) {
  const { t } = useLanguage()

  if (totalPages <= 1) return null

  return (
    <nav aria-label={t('pagination.label')} className="mt-12 flex flex-wrap items-center justify-center gap-2">
      <button
        onClick={() => onChange(page - 1)}
        disabled={page <= 1}
        className={`${base} ${idle} disabled:opacity-30 disabled:hover:text-muted`}
      >
        {t('pagination.previous')}
      </button>

      {getPageItems(page, totalPages).map((item, i) =>
        item === '…' ? (
          <span key={`gap-${i}`} className="px-2 text-muted">…</span>
        ) : (
          <button
            key={item}
            onClick={() => onChange(item)}
            aria-current={item === page ? 'page' : undefined}
            className={`${base} ${item === page ? 'border-gilead bg-gilead text-bone' : idle}`}
          >
            {item}
          </button>
        )
      )}

      <button
        onClick={() => onChange(page + 1)}
        disabled={page >= totalPages}
        className={`${base} ${idle} disabled:opacity-30 disabled:hover:text-muted`}
      >
        {t('pagination.next')}
      </button>
    </nav>
  )
}
