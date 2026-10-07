import useLanguage from '../../hooks/useLanguage.js'

export default function EmptyState({ message, action }) {
  const { t } = useLanguage()

  return (
    <div className="py-20 text-center">
      <p className="text-muted">{message ?? t('common.noResults')}</p>
      {action && (
        <button
          onClick={action.onClick}
          className="mt-6 border border-gilead px-5 py-2 text-sm uppercase tracking-widest transition-colors hover:bg-gilead"
        >
          {action.label}
        </button>
      )}
    </div>
  )
}
