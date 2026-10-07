// Convierte un error de la API en un mensaje en el idioma actual.
// Los mensajes del servidor están en español y son para desarrolladores,
// así que la interfaz decide qué mostrar según el tipo de error.
export function errorMessage(error, t) {
  if (error.code === 'network') return t('errors.network')
  if (error.status === 404) return t('errors.notFound')
  if (error.status === 400) return t('errors.badRequest')
  return t('errors.server')
}
