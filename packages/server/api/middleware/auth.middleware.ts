import { StatusCode } from 'api/constants/statusCode'
import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { AppError } from './error.middleware'

export const authMiddleware = (
  req: Request & { user?: any },
  _res: Response,
  next: NextFunction
) => {
  try {
    const token =
      req.cookies['auth-token'] || req.headers.authorization?.split(' ')[1]
    if (!token) {
      throw new AppError('Необходима авторизация', StatusCode.Unauthorized)
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET as jwt.Secret)
    req.user = decoded

    next()
  } catch (error) {
    console.log(error, 'error')
    next(error)
  }
}
