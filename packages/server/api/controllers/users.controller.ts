import { StatusCode } from 'api/constants/statusCode'
import User from 'api/db/models/User.model'
import { AppError } from 'api/middleware/error.middleware'
import { RequestWithUser } from 'api/types/request'
import { NextFunction, Response } from 'express'

export const getCurrentUser = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) {
      throw new AppError(
        'Пользователь не вошел в систему',
        StatusCode.Unauthorized
      )
    }

    const userId = req.user.id

    const user = await User.findByPk(userId)

    res.json({ user })
  } catch (error) {
    next(error)
  }
}
