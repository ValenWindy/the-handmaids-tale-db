import { Link, useLocation, useParams } from 'react-router-dom'
import useCharacter from '../hooks/useCharacter.js'
import useLanguage from '../hooks/useLanguage.js'
import useDocumentTitle from '../hooks/useDocumentTitle.js'
import CharacterInfo from '../components/characters/CharacterInfo.jsx'
import LoadingState from '../components/ui/LoadingState.jsx'
import ErrorState from '../components/ui/ErrorState.jsx'
import EmptyState from '../components/ui/EmptyState.jsx'
import { errorMessage } from '../utils/errors.js'
import { fullName } from '../utils/characters.js'

export default function CharacterDetail() {
  const { slug } = useParams()
  const { t } = useLanguage()
  const location = useLocation()
  const { character, loading, error, reload } = useCharacter(slug)
  useDocumentTitle(character ? fullName(character) : null)

  // Si venimos del listado, volvemos a él con sus filtros y su página
  const backTo = location.state?.from ?? '/characters'

  return (
    <section>
      <Link to={backTo} className="text-sm text-muted hover:text-bone">
        {t('detail.back')}
      </Link>

      {loading && <LoadingState variant="detail" />}

      {error && error.status === 404 && <EmptyState message={t('detail.notFound')} />}

      {error && error.status !== 404 && (
        <ErrorState message={errorMessage(error, t)} onRetry={reload} />
      )}

      {/* key: al pasar de un personaje a otro, React descarta el componente y su estado (ej. imagen rota) */}
      {character && <CharacterInfo key={character.slug} character={character} />}
    </section>
  )
}
