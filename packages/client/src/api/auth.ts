import { api } from '@/libs/axios';
import { LoginFormData, RegisterFormData } from '../pages/auth/schemas';

type LoginData = (data: LoginFormData) => Promise<void>;
type RegisterData = (data: RegisterFormData) => Promise<any>;

export const login: LoginData = (data) => api.post('/auth/signin', data);
export const register: RegisterData = (data) => api.post('/auth/signup', data);
export const getMe = () => api.get('auth/user');
