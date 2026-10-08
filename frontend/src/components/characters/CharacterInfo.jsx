import { useState } from 'react'
import StatusBadge from '../ui/StatusBadge.jsx'
import SectionHeading from '../ui/SectionHeading.jsx'
import CharacterRelationships from './CharacterRelationships.jsx'
import useLanguage from '../../hooks/useLanguage.js'
import { fullName, handmaidLabel, initials, pickDescription } from '../../utils/characters.js'

function Portrait({ character }) {
  const { t } = useLanguage()
  const [failed, setFailed] = useState(false)
  const name = fullName(character)

  if (character.imageUrl && !failed) {
    return (
      <img
        src={character.imageUrl}
        alt={t('detail.portraitAlt', { name })}
        onError={() => setFailed(true)}
        className="aspect-[3/4] w-full border border-line object-cover"
      />
    )
  }

  // Sin imagen (o si falló la carga): iniciales sobre un panel
  return (
    <div
      aria-hidden="true"
      className="flex aspect-[3/4] w-full items-center justify-center border border-line bg-panel font-display text-7xl text-muted"
    >
      {initials(character)}
    </div>
  )
}

function Field({ label, children }) {
  return (
    <div className="border-t border-line py-3 sm:grid sm:grid-cols-[10rem_1fr] sm:gap-4">
      <dt className="text-sm text-muted">{label}</dt>
      <dd>{children}</dd>
    </div>
  )
}

export default function CharacterInfo({ character }) {
  const { lang, t, tOr } = useLanguage()
  const { handmaidNames, category, actor, status, seasons, firstSeason, firstEpisode, firstEpisodeTitle } = character
  const description = pickDescription(character, lang)
  const unknown = t('common.unknown')

  return (
    <article className="mt-8 grid gap-10 md:grid-cols-[16rem_1fr]">
      <Portrait character={character} />

      <div>
        <h1 className="font-display text-4xl sm:text-5xl">{fullName(character)}</h1>
        {handmaidNames.length > 0 && (
          <p className="mt-1 text-xl text-gilead-bright">
            {handmaidNames.map(handmaidLabel).join(' · ')}
          </p>
        )}

        <dl className="mt-8">
          <Field label={t('detail.status')}>
            <StatusBadge status={status} gender={character.gender} />
          </Field>
          <Field label={t('detail.category')}>{tOr(`categories.${category}`, category)}</Field>
          <Field label={t('detail.actor')}>{actor ?? unknown}</Field>
          <Field label={t('detail.firstAppearance')}>
            {firstSeason
              ? t('detail.firstAppearanceValue', {
                  season: firstSeason,
                  episode: firstEpisode,
                  episodeTitle: firstEpisodeTitle,
                })
              : unknown}
          </Field>
          <Field label={t('detail.seasons')}>
            {seasons.length > 0 ? seasons.join(', ') : unknown}
          </Field>
          <div className="border-t border-line" />
        </dl>

        <section className="mt-12">
          <SectionHeading>{t('detail.description')}</SectionHeading>
          {description.text ? (
            <>
              <p className="max-w-prose leading-relaxed">{description.text}</p>
              {description.isFallback && (
                <p className="mt-2 text-xs text-muted">{t('detail.descriptionFallback')}</p>
              )}
            </>
          ) : (
            <p className="text-muted">{t('detail.noDescription')}</p>
          )}
        </section>

        <CharacterRelationships relationships={character.relationships} />
      </div>
    </article>
  )
}
