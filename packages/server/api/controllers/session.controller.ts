import User from '@db/models/User.model'
import { AppError } from 'api/middleware/error.middleware'
import { LoginFormData, RegisterFormData } from 'api/schemas/session.schema'
import { RequestWithValidateData } from 'api/types/request'
import bcrypt from 'bcrypt'
import { Response } from 'express'
import jwt from 'jsonwebtoken'
import { Op } from 'sequelize'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'
const JWT_EXPIRES_IN = '7d'

export const signIn = async (
  req: RequestWithValidateData<LoginFormData>,
  res: Response,
  next: Function
): Promise<void> => {
  try {
    const { login, password } = req.body

    const user = await User.findOne({ where: { login } })

    if (!user) {
      throw new AppError('Пользователь не найден', 401)
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      throw new AppError('Неверный пароль', 401)
    }

    const token = jwt.sign(
      {
        id: user.id,
        login: user.login,
        email: user.email,
      },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    )

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 7 * 24 * 60 * 60 * 1000,
      sameSite: 'lax',
    })

    res.json({ message: 'Успешный вход в систему' })
  } catch (error) {
    next(error)
  }
}

export const signUp = async (
  req: RequestWithValidateData<RegisterFormData>,
  res: Response,
  next: Function
): Promise<void> => {
  try {
    const { first_name, login, password, phone, email, second_name } = req.body

    const userAlreadyExist = await User.findOne({
      where: {
        [Op.or]: {
          phone,
          login,
          email,
        },
      },
      raw: true,
    })

    if (userAlreadyExist) {
      throw new AppError('Пользователь с такими данными уже существует', 400)
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    await User.create({
      email,
      password: hashedPassword,
      first_name,
      second_name,
      phone,
      login,
    })

    res.json({ message: 'Пользователь успешно создан!' })
  } catch (error) {
    next(error)
  }
}
