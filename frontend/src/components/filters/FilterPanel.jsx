import Select from '../ui/Select.jsx'
import useLanguage from '../../hooks/useLanguage.js'

const STATUS_KEYS = ['alive', 'dead', 'unknown']

export default function FilterPanel({ filters, categories, seasons, onChange }) {
  const { t, tOr } = useLanguage()

  return (
    <>
      <Select label={t('filters.status')} value={filters.status} onChange={(status) => onChange({ status })}>
        <option value="">{t('filters.allMasc')}</option>
        {STATUS_KEYS.map((key) => (
          <option key={key} value={key}>{t(`status.${key}`)}</option>
        ))}
      </Select>

      <Select label={t('filters.category')} value={filters.category} onChange={(category) => onChange({ category })}>
        <option value="">{t('filters.allFem')}</option>
        {categories.map((c) => (
          // El value es el nombre guardado en la base; el texto visible se traduce
          <option key={c.id} value={c.name}>{tOr(`categories.${c.name}`, c.name)}</option>
        ))}
      </Select>

      <Select label={t('filters.season')} value={filters.season} onChange={(season) => onChange({ season })}>
        <option value="">{t('filters.allFem')}</option>
        {seasons.map((n) => (
          <option key={n} value={n}>{n}</option>
        ))}
      </Select>
    </>
  )
}
