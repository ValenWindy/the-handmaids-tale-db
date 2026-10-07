import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import StatusBadge from '../ui/StatusBadge.jsx'
import useLanguage from '../../hooks/useLanguage.js'
import { fullName, handmaidLabel } from '../../utils/characters.js'

// Miniatura vertical. Si la imagen falla al cargar, no se dibuja nada.
function CardPhoto({ src }) {
  const [failed, setFailed] = useState(false)
  if (failed) return null

  return (
    <img
      src={src}
      alt=""
      loading="lazy"
      onError={() => setFailed(true)}
      className="h-28 w-[5.25rem] shrink-0 border border-line object-cover"
    />
  )
}

export default function CharacterCard({ character }) {
  const { t, tOr } = useLanguage()
  const location = useLocation()
  const { slug, handmaidNames, category, actor, status, gender, imageUrl } = character

  return (
    <li>
      <Link
        to={`/characters/${slug}`}
        // Guardamos de dónde venimos para que "Volver" conserve los filtros y la página
        state={{ from: `${location.pathname}${location.search}` }}
        className="flex h-full gap-4 border border-line bg-panel p-5 transition-colors hover:border-gilead"
      >
        {imageUrl && <CardPhoto src={imageUrl} />}

        <div className="min-w-0 flex-1">
          <p className="text-xs uppercase tracking-widest text-muted">
            {tOr(`categories.${category}`, category)}
          </p>
          <h2 className="mt-2 font-display text-2xl">{fullName(character)}</h2>
          {handmaidNames.length > 0 && (
            <p className="text-gilead-bright">{handmaidNames.map(handmaidLabel).join(' · ')}</p>
          )}
          <div className="mt-4 flex items-center justify-between gap-3 text-sm text-muted">
            <span>{actor ?? t('common.unknown')}</span>
            <StatusBadge status={status} gender={gender} />
          </div>
        </div>
      </Link>
    </li>
  )
}
