import { api, apiAuth } from '@/shared/libs/axios'
import { User } from '@/shared/types/User'
import { LoginFormData, RegisterFormData } from './session.types'

type LoginData = (data: LoginFormData) => Promise<User>
type RegisterData = (data: RegisterFormData) => Promise<User>
type GetMe = () => Promise<User>

export const loginUserApi: LoginData = data =>
  apiAuth.post('/sign-in', data).then(res => res.data)

export const registerUserApi: RegisterData = data =>
  apiAuth.post('/sign-up', data).then(res => res.data)

export const logoutUserApi = () => apiAuth.post('/logout')

export const getMeApi: GetMe = () => api.get('/users/me')
