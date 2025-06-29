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
  const statusCode = err.status || 500
  const message = err.message || 'Внутренняя ошибка сервера'

  res.status(statusCode).json({
    error: true,
    message,
    data: req.url,
  })
}
