import db from '../database/db.js'
import { listCharacterPhotos, photoUrl } from './images.service.js'

// ---------- Detalle de un personaje ----------

const detailStmt = db.prepare(`
  SELECT c.id,
         c.slug,
         c.title,
         c.gender,
         c.first_name     AS firstName,
         c.last_name      AS lastName,
         c.status,
         c.description_es AS descriptionEs,
         c.description_en AS descriptionEn,
         c.image_url      AS imageUrl,
         cat.name         AS category,
         a.name           AS actor,
         s.number         AS firstSeason,
         e.number         AS firstEpisode,
         e.title          AS firstEpisodeTitle
  FROM characters c
  JOIN categories cat ON cat.id = c.category_id
  LEFT JOIN actors a   ON a.id = c.actor_id
  LEFT JOIN episodes e ON e.id = c.first_episode_id
  LEFT JOIN seasons s  ON s.id = e.season_id
  WHERE c.slug = ?
`)

// number = holder_number: "Ofjoseph #2" → { name: 'Ofjoseph', number: 2 }
const handmaidNamesStmt = db.prepare(`
  SELECT name, holder_number AS number
  FROM handmaid_names
  WHERE character_id = ?
  ORDER BY position
`)

const seasonsStmt = db.prepare(`
  SELECT s.number
  FROM character_seasons cs
  JOIN seasons s ON s.id = cs.season_id
  WHERE cs.character_id = ?
  ORDER BY s.number
`)

// Una fila por vínculo; la consultamos en ambas direcciones.
// "direction" indica desde qué lado estamos mirando el vínculo:
//   out → el personaje consultado es character_id (ej. "es superior de")
//   in  → el personaje consultado es related_character_id (ej. "tiene como superior a")
const relationshipsStmt = db.prepare(`
  SELECT c.slug, c.title, c.first_name AS firstName, c.last_name AS lastName,
         r.relationship_type AS type, r.note, 'out' AS direction
  FROM character_relationships r
  JOIN characters c ON c.id = r.related_character_id
  WHERE r.character_id = @id
  UNION ALL
  SELECT c.slug, c.title, c.first_name AS firstName, c.last_name AS lastName,
         r.relationship_type AS type, r.note, 'in' AS direction
  FROM character_relationships r
  JOIN characters c ON c.id = r.character_id
  WHERE r.related_character_id = @id
  ORDER BY type, firstName
`)

export function getCharacterBySlug(slug) {
  const row = detailStmt.get(slug)
  if (!row) return null

  const { id, ...character } = row   // el id interno no sale por la API
  return {
    ...character,
    // image_url de la base si existe; si no, la foto de la carpeta con el nombre del slug
    imageUrl: character.imageUrl ?? photoUrl(listCharacterPhotos(), character.slug),
    handmaidNames: handmaidNamesStmt.all(id),
    seasons: seasonsStmt.all(id).map((s) => s.number),
    relationships: relationshipsStmt.all({ id }),
  }
}

// ---------- Listado con búsqueda, filtros, orden y paginación ----------

// Las claves de este mapa son la única forma de llegar al ORDER BY.
// Nunca se concatena texto que venga del usuario.
const SORT_ORDER = {
  name_asc:
    'c.first_name COLLATE NOCASE ASC, c.last_name COLLATE NOCASE ASC',
  name_desc:
    'c.first_name COLLATE NOCASE DESC, c.last_name COLLATE NOCASE DESC',
  // NULL al final: "fs.number IS NULL" vale 1 para los que no tienen dato
  first_appearance:
    'fs.number IS NULL, fs.number ASC, e.number ASC, c.first_name COLLATE NOCASE ASC',
  status:
    "CASE c.status WHEN 'alive' THEN 1 WHEN 'dead' THEN 2 ELSE 3 END, c.first_name COLLATE NOCASE ASC",
  category:
    'cat.name COLLATE NOCASE ASC, c.first_name COLLATE NOCASE ASC',
}

const FROM_CLAUSE = `
  FROM characters c
  JOIN categories cat   ON cat.id = c.category_id
  LEFT JOIN actors a    ON a.id = c.actor_id
  LEFT JOIN episodes e  ON e.id = c.first_episode_id
  LEFT JOIN seasons fs  ON fs.id = e.season_id
`

function buildWhere({ search, status, category, season }) {
  const conditions = []
  const params = {}

  if (search) {
    // Los nombres de Handmaid están en otra tabla (1:N), así que se buscan con EXISTS
    conditions.push(`(
      c.first_name LIKE @search ESCAPE '\\'
      OR c.last_name LIKE @search ESCAPE '\\'
      OR a.name LIKE @search ESCAPE '\\'
      OR (c.first_name || ' ' || COALESCE(c.last_name, '')) LIKE @search ESCAPE '\\'
      OR EXISTS (
        SELECT 1 FROM handmaid_names hn
        WHERE hn.character_id = c.id AND hn.name LIKE @search ESCAPE '\\'
      )
    )`)
    // Escapamos % y _ para que se busquen como texto literal
    params.search = `%${search.replace(/[\\%_]/g, '\\$&')}%`
  }

  if (status) {
    conditions.push('c.status = @status')
    params.status = status
  }

  if (category) {
    conditions.push('cat.name = @category COLLATE NOCASE')
    params.category = category
  }

  if (season) {
    conditions.push(`EXISTS (
      SELECT 1
      FROM character_seasons cs
      JOIN seasons s ON s.id = cs.season_id
      WHERE cs.character_id = c.id AND s.number = @season
    )`)
    params.season = season
  }

  const where = conditions.length ? `WHERE ${conditions.join(' AND ')}` : ''
  return { where, params }
}

export function getCharacters(filters) {
  const { sort, page, limit } = filters
  const { where, params } = buildWhere(filters)

  const { total } = db
    .prepare(`SELECT COUNT(*) AS total ${FROM_CLAUSE} ${where}`)
    .get(params)

  const rows = db
    .prepare(`
      SELECT c.slug,
             c.title,
             c.gender,
             c.first_name    AS firstName,
             c.last_name     AS lastName,
             c.status,
             cat.name        AS category,
             a.name          AS actor,
             c.image_url     AS imageUrl,
             fs.number       AS firstSeason,
             e.number        AS firstEpisode,
             (SELECT json_group_array(json_object('name', name, 'number', holder_number))
                FROM (SELECT name, holder_number FROM handmaid_names
                      WHERE character_id = c.id ORDER BY position)) AS handmaidNames
      ${FROM_CLAUSE}
      ${where}
      ORDER BY ${SORT_ORDER[sort]}, c.id
      LIMIT @limit OFFSET @offset
    `)
    .all({ ...params, limit, offset: (page - 1) * limit })

  // json_group_array devuelve texto JSON; lo pasamos a array de objetos
  const photos = listCharacterPhotos()   // una lectura de la carpeta por petición
  const data = rows.map((row) => ({
    ...row,
    imageUrl: row.imageUrl ?? photoUrl(photos, row.slug),
    handmaidNames: JSON.parse(row.handmaidNames),
  }))

  return {
    data,
    pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
  }
}
