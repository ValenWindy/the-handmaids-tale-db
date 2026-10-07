import * as service from '../services/meta.service.js'

export const categories = (req, res) => res.json({ data: service.getCategories() })
export const seasons = (req, res) => res.json({ data: service.getSeasons() })
export const stats = (req, res) => res.json({ data: service.getStats() })
