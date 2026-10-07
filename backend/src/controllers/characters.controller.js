import * as service from '../services/characters.service.js'
import { HttpError } from '../utils/httpError.js'
import { parseCharacterQuery } from '../utils/validateQuery.js'

export function list(req, res) {
  const filters = parseCharacterQuery(req.query)
  res.json(service.getCharacters(filters))
}

export function getBySlug(req, res) {
  const { slug } = req.params

  if (!/^[a-z0-9-]+$/.test(slug)) {
    throw new HttpError(400, 'Slug inválido')
  }

  const character = service.getCharacterBySlug(slug)
  if (!character) throw new HttpError(404, 'Personaje no encontrado')

  res.json({ data: character })
}
