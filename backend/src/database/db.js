import Database from 'better-sqlite3'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const dbPath = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  'database.db'
)

const db = new Database(dbPath)
db.pragma('foreign_keys = ON')   // vale por conexión, no por archivo

export default db
