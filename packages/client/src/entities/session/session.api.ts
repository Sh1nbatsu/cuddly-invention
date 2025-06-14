import { api } from '@/shared/libs/axios'
import { User } from '@/shared/types/User'
import { LoginFormData, RegisterFormData } from './session.types'

type LoginData = (data: LoginFormData) => Promise<User>
type RegisterData = (data: RegisterFormData) => Promise<User>
type GetMe = () => Promise<User>

export const loginUserApi: LoginData = data =>
  api.post('/auth/signin', data).then(res => res.data)

export const registerUserApi: RegisterData = data =>
  api.post('/auth/signup', data).then(res => res.data)

export const getMeApi: GetMe = () => api.get('/auth/user')

export const logoutUserApi = () => {
  localStorage.removeItem('ya_token')
  return api.post('/auth/logout')
}
