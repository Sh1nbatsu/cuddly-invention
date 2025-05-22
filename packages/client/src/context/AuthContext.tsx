import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react'
import {
  login as apiLogin,
  register as apiRegister,
  getMe,
  logout as apiLogout,
  User,
} from '@/api/auth'
import { LoginFormData, RegisterFormData } from '@/pages/auth/schemas'

interface AuthContextValue {
  user: User | null
  loading: boolean
  login(data: LoginFormData): Promise<void>
  register(data: RegisterFormData): Promise<void>
  logout(): Promise<void>
}

export const AuthContext = createContext<AuthContextValue>(
  {} as AuthContextValue
)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getMe()
      .then(setUser)
      .finally(() => setLoading(false))
  }, [])

  const login = async (data: LoginFormData) => {
    setLoading(true)
    const u = await apiLogin(data)
    setUser(u)
    setLoading(false)
  }

  const register = async (data: RegisterFormData) => {
    setLoading(true)
    const u = await apiRegister(data)
    setUser(u)
    setLoading(false)
  }

  const logout = async () => {
    await apiLogout()
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
