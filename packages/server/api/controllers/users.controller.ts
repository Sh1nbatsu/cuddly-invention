import { StatusCode } from 'api/constants/statusCode'
import User from 'api/db/models/User.model'
import { AppError } from 'api/middleware/error.middleware'
import { RequestWithValidateData } from 'api/types/request'
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

export const getUsersLeaderboard = async (
  req: RequestWithValidateData<{
    pageSize: number
    cursor: number
  }>,
  res: Response,
  next: NextFunction
) => {
  try {
    const pageSize = Number(req.query.pageSize) || 10
    const cursor = Number(req.query.cursor) || 1

    const { count, rows } = await User.findAndCountAll({
      limit: pageSize,
      offset: (cursor - 1) * pageSize,
      order: [['score', 'DESC']],
    })

    res.json({
      count,
      rows,
    })
  } catch (error) {
    next(error)
  }
}

export const updateCurrentUserLeaderboardScore = async (
  req: RequestWithValidateData<{
    scoreCount: number
  }>,
  res: Response,
  next: NextFunction
) => {
  try {
    // @ts-ignore TODO:
    const { id } = req.user
    const { scoreCount } = req.body
    await User.update(
      {
        score: scoreCount,
      },
      {
        where: {
          id,
        },
      }
    )
    res.status(StatusCode.OK)
  } catch (error) {
    next(error)
  }
}
