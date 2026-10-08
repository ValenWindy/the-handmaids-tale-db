import { Link, useLocation } from 'react-router-dom'
import SectionHeading from '../ui/SectionHeading.jsx'
import useLanguage from '../../hooks/useLanguage.js'
import { fullName } from '../../utils/characters.js'

// "superior" es el único tipo con dirección. Los demás se leen igual desde los dos lados.
function labelKey({ type, direction }) {
  if (type !== 'superior') return type
  return direction === 'out' ? 'superiorOut' : 'superiorIn'
}

export default function CharacterRelationships({ relationships }) {
  const { t } = useLanguage()
  const location = useLocation()

  return (
    <section className="mt-12">
      <SectionHeading>{t('detail.relationships')}</SectionHeading>

      {relationships.length === 0 ? (
        <p className="text-muted">{t('detail.noRelationships')}</p>
      ) : (
        <ul className="divide-y divide-line border-y border-line">
          {relationships.map((rel) => (
            <li key={`${rel.slug}-${rel.type}-${rel.direction}`}>
              <Link
                to={`/characters/${rel.slug}`}
                state={location.state}
                className="flex items-baseline justify-between gap-4 py-3 transition-colors hover:text-gilead-bright"
              >
                <span className="font-display text-xl">{fullName(rel)}</span>
                <span className="text-sm text-muted">{t(`relationship.${labelKey(rel)}`)}</span>
              </Link>
              {rel.note && <p className="pb-3 text-sm text-muted">{rel.note}</p>}
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
