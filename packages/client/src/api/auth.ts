import { LoginFormData, RegisterFormData } from '@/pages/auth/schemas'
import { api } from '@/shared/libs/axios'
import { User } from '@/shared/types/User'

type LoginData = (data: LoginFormData) => Promise<User>
type RegisterData = (data: RegisterFormData) => Promise<User>

export const login: LoginData = data =>
  api.post('/auth/signin', data).then(res => res.data)

export const register: RegisterData = data =>
  api.post('/auth/signup', data).then(res => res.data)

// Исправить any
export const getMe = (): Promise<any> => api.get('/auth/user').then(res => res)

export const logout = () => api.post('/auth/logout')
