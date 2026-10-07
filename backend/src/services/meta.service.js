import db from '../database/db.js'

const categoriesStmt = db.prepare('SELECT id, name FROM categories ORDER BY id')
const seasonsStmt = db.prepare('SELECT number FROM seasons ORDER BY number')

const totalStmt = db.prepare('SELECT COUNT(*) AS total FROM characters')

// JOIN (no LEFT JOIN): solo aparecen las categorías que tienen al menos un personaje
const countByCategoryStmt = db.prepare(`
  SELECT cat.name, COUNT(c.id) AS count
  FROM categories cat
  JOIN characters c ON c.category_id = cat.id
  GROUP BY cat.id
  ORDER BY cat.id
`)

export const getCategories = () => categoriesStmt.all()
export const getSeasons = () => seasonsStmt.all().map((s) => s.number)

export const getStats = () => ({
  totalCharacters: totalStmt.get().total,
  categories: countByCategoryStmt.all(),
})
