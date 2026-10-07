import { HttpError } from '../utils/httpError.js'

export default function notFound(req, res, next) {
  next(new HttpError(404, `Ruta no encontrada: ${req.method} ${req.originalUrl}`))
}
