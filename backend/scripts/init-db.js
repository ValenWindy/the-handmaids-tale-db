import Database from 'better-sqlite3'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const dbDir = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  '../src/database'
)
const dbPath = path.join(dbDir, 'database.db')

// Siempre desde cero: schema.sql + seed.sql son la fuente de verdad
if (fs.existsSync(dbPath)) fs.rmSync(dbPath)

const db = new Database(dbPath)
db.exec(fs.readFileSync(path.join(dbDir, 'schema.sql'), 'utf8'))
db.exec(fs.readFileSync(path.join(dbDir, 'seed.sql'), 'utf8'))
db.close()

console.log('Base de datos creada en', dbPath)
