import useLanguage from '../../hooks/useLanguage.js'

export default function ErrorState({ message, onRetry }) {
  const { t } = useLanguage()

  return (
    <div role="alert" className="py-20 text-center">
      <p className="text-gilead-bright">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-6 border border-gilead px-5 py-2 text-sm uppercase tracking-widest transition-colors hover:bg-gilead"
        >
          {t('errors.retry')}
        </button>
      )}
    </div>
  )
}
