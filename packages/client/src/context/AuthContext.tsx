import {
  createContext,
  useEffect,
  useState,
  ReactNode,
  useCallback,
  useMemo,
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
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    let isMounted = true

    const init = async () => {
      try {
        const currentUser = await getMe()
        if (isMounted) setUser(currentUser)
      } finally {
        if (isMounted) setLoading(false)
      }
    }

    init()

    return () => {
      isMounted = false
    }
  }, [])

  const login = useCallback(async (data: LoginFormData) => {
    setLoading(true)
    try {
      const u = await apiLogin(data)
      setUser(u)
    } finally {
      setLoading(false)
    }
  }, [])

  const register = useCallback(async (data: RegisterFormData) => {
    setLoading(true)
    try {
      const u = await apiRegister(data)
      setUser(u)
    } finally {
      setLoading(false)
    }
  }, [])

  const logout = useCallback(async () => {
    setLoading(true)
    try {
      await apiLogout()
      setUser(null)
    } finally {
      setLoading(false)
    }
  }, [])

  const value = useMemo(
    () => ({ user, loading, login, register, logout }),
    [user, loading, login, register, logout]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
