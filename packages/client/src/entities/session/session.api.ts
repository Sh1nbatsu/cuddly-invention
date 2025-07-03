import { api } from '@/shared/libs/axios'
import { User } from '@/shared/types/User'
import { LoginFormData, RegisterFormData } from './session.types'

type LoginData = (data: LoginFormData) => Promise<User>
type RegisterData = (data: RegisterFormData) => Promise<User>
type GetMe = () => Promise<User>

export const loginUserApi: LoginData = data =>
  api.post('/auth/sign-in', data).then(res => res.data)

export const registerUserApi: RegisterData = data =>
  api.post('/auth/sign-up', data).then(res => res.data)

export const getMeApi: GetMe = () => api.get('/api/users/me')

export const logoutUserApi = () => api.post('/auth/logout')
