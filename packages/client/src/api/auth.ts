import { api } from '@/libs/axios'
import { LoginFormData, RegisterFormData } from '@/pages/auth/schemas'

export type User = { id: number; username: string; email: string }

type LoginData = (data: LoginFormData) => Promise<User>
type RegisterData = (data: RegisterFormData) => Promise<User>

export const login: LoginData = data =>
  api.post('/auth/signin', data).then(res => res.data)

export const register: RegisterData = data =>
  api.post('/auth/signup', data).then(res => res.data)

export const getMe = (): Promise<User> =>
  api.get('/auth/user').then(res => res.data)

export const logout = () => api.post('/auth/logout')
