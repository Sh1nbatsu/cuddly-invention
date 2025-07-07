import { StatusCode } from 'api/constants/statusCode'
import User from 'api/db/models/User.model'
import { AppError } from 'api/middleware/error.middleware'
import { NextFunction, Request, Response } from 'express'

export const getCurrentUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // @ts-ignore TODO:
    if (!req.user) {
      throw new AppError(
        'Пользователь не вошел в систему',
        StatusCode.Unauthorized
      )
    }
    // @ts-ignore TODO:
    const userId = req.user.id

    const user = await User.findByPk(userId)

    res.json(user)
  } catch (error) {
    next(error)
  }
}
