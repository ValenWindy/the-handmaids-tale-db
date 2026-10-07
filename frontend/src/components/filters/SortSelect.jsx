import Select from '../ui/Select.jsx'
import useLanguage from '../../hooks/useLanguage.js'

// Tienen que coincidir con los valores que acepta la API (?sort=...)
const SORT_KEYS = ['name_asc', 'name_desc', 'first_appearance', 'status', 'category']

export default function SortSelect({ value, onChange }) {
  const { t } = useLanguage()

  return (
    <Select label={t('filters.sort')} value={value} onChange={onChange}>
      {SORT_KEYS.map((key) => (
        <option key={key} value={key}>{t(`sort.${key}`)}</option>
      ))}
    </Select>
  )
}
