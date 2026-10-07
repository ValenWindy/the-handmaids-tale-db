export default function errorHandler(err, req, res, next) {
  const status = err.status ?? 500

  if (status === 500) console.error(err)   // los errores inesperados quedan en la consola

  res.status(status).json({
    error: {
      message: status === 500 ? 'Error interno del servidor' : err.message,
    },
  })
}
