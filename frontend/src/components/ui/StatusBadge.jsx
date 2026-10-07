import useLanguage from '../../hooks/useLanguage.js'

const STYLES = {
  alive: 'text-bone',
  dead: 'text-gilead-bright',
  unknown: 'text-muted',
}

// gender ('female' | 'male' | null) hace que, en español, diga "Viva" / "Vivo"
export default function StatusBadge({ status, gender }) {
  const { t } = useLanguage()

  return (
    <span className={`text-xs uppercase tracking-widest ${STYLES[status] ?? 'text-muted'}`}>
      {t(`status.${status}`, { gender })}
    </span>
  )
}
