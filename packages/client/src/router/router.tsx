import NotFoundPage from '@/pages/404/NotFoundPage'
import { Login } from '@/pages/auth/Login'
import { Registration } from '@/pages/auth/Registration'
import HomePage from '@/pages/game/HomePage'
import { createBrowserRouter } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
    errorElement: <NotFoundPage />,
  },
  {
    path: '/sign-up',
    element: <Registration />,
  },
  {
    path: '/sign-in',
    element: <Login />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
])

export default router
