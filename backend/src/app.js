import express from 'express'
import charactersRoutes from './routes/characters.routes.js'
import metaRoutes from './routes/meta.routes.js'
import notFound from './middleware/notFound.js'
import errorHandler from './middleware/errorHandler.js'
import { CHARACTERS_DIR, IMAGE_FILE } from './services/images.service.js'
import { HttpError } from './utils/httpError.js'

const app = express()

app.use(express.json())

// CORS: hace falta porque el frontend (Netlify) está en otro dominio que el backend (Render).
// En Render definí FRONTEND_URL=https://tu-sitio.netlify.app  (sin barra final)
if (process.env.FRONTEND_URL) {
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', process.env.FRONTEND_URL)
    res.header('Vary', 'Origin')
    next()
  })
}

// Fotos de los personajes. Solo se sirven archivos de imagen, nada más de la carpeta.
app.use(
  '/images/characters',
  (req, res, next) =>
    IMAGE_FILE.test(req.path) ? next() : next(new HttpError(404, 'Imagen no encontrada')),
  express.static(CHARACTERS_DIR, { index: false })
)

app.use('/api/characters', charactersRoutes)
app.use('/api', metaRoutes)

app.use(notFound)       // si ninguna ruta respondió
app.use(errorHandler)   // siempre al final

export default app
