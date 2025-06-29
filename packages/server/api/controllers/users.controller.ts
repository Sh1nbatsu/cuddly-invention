import { ErrorsCode } from 'api/constants/errorsCode'
import User from 'api/db/models/User.model'
import { AppError } from 'api/middleware/error.middleware'
import { RequestWithUser } from 'api/types/request'
import { Response } from 'express'

export const getCurrentUser = async (req: RequestWithUser, res: Response) => {
  if (!req.user) {
    throw new AppError(
      'Пользователь не вошел в систему',
      ErrorsCode.Unauthorized
    )
  }

  const userId = req.user.id

  const user = await User.findByPk(userId)

  res.json({ user })
}
