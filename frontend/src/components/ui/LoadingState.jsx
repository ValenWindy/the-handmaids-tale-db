import useLanguage from '../../hooks/useLanguage.js'

// Bloques grises que ocupan el lugar del contenido, para que la página no "salte" al cargar
const pulse = 'motion-safe:animate-pulse'

function GridSkeleton() {
  return (
    <ul aria-hidden="true" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }, (_, i) => (
        <li key={i} className={`h-36 border border-line bg-panel ${pulse}`} />
      ))}
    </ul>
  )
}

function DetailSkeleton() {
  return (
    <div aria-hidden="true" className={`mt-8 grid gap-10 md:grid-cols-[16rem_1fr] ${pulse}`}>
      <div className="aspect-[3/4] border border-line bg-panel" />
      <div className="space-y-4">
        <div className="h-12 w-2/3 bg-panel" />
        <div className="h-6 w-1/4 bg-panel" />
        <div className="mt-8 h-44 border-y border-line bg-panel" />
      </div>
    </div>
  )
}

// variant: 'grid' (listado) | 'detail' (ficha) | 'inline' (texto chico) | 'text' (centrado)
export default function LoadingState({ variant = 'text' }) {
  const { t } = useLanguage()

  return (
    <div role="status">
      <span className="sr-only">{t('common.loading')}</span>
      {variant === 'grid' && <GridSkeleton />}
      {variant === 'detail' && <DetailSkeleton />}
      {variant === 'inline' && (
        <p aria-hidden="true" className="text-sm text-muted">{t('common.loading')}</p>
      )}
      {variant === 'text' && (
        <p aria-hidden="true" className="py-20 text-center text-muted">{t('common.loading')}</p>
      )}
    </div>
  )
}
