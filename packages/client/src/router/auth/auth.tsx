import { Login } from '@/pages/auth/Login'
import { Registration } from '@/pages/auth/Registration'

export const authRoutes = {
  path: '/',
  children: [
    {
      path: '/sign-up',
      element: <Registration />,
    },
    {
      path: '/sign-in',
      element: <Login />,
    },
  ],
}
