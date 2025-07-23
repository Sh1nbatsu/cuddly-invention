import { NextFunction, Request, Response } from 'express'

export class AppError extends Error {
  status: number

  constructor(message: string, status = 500) {
    super(message)
    this.status = status
  }
}

export function errorHandler(
  err: any,
  req: Request,
  res: Response,
  _next: NextFunction
) {
  const isSSRRequest =
    !req.originalUrl.startsWith('/api') && !req.originalUrl.startsWith('/auth')

  console.error('Global error:', err)
  const statusCode = err.status || 500
  const message = err.message || 'Внутренняя ошибка сервера'

  if (isSSRRequest) {
    res.status(statusCode).send(`
      <html>
        <head><title>Ошибка</title></head>
        <body>
          <h1>Ошибка ${statusCode}</h1>
          <p>${message}</p>
        </body>
      </html>
    `)
    return
  }

  res.status(statusCode).json({
    error: true,
    message,
    data: req.url,
  })
}
