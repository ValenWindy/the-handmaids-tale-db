export const STATUS_LABELS = {
  alive: 'Vivo',
  dead: 'Muerto',
  unknown: 'Desconocido',
}

export const SORT_OPTIONS = [
  ['name_asc', 'Nombre A → Z'],
  ['name_desc', 'Nombre Z → A'],
  ['first_appearance', 'Primera aparición'],
  ['status', 'Estado'],
  ['category', 'Categoría'],
]

export const fullName = (c) => [c.firstName, c.lastName].filter(Boolean).join(' ')

export const orUnknown = (value) => value ?? 'Desconocido'
