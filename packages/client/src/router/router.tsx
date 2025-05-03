import { createBrowserRouter } from 'react-router-dom'
import HomePage from '@/pages/game/HomePage'
import NotFoundPage from '@/pages/404/NotFoundPage' // Создадим этот компонент
import Leaderboard from '@/pages/game/leaderboard/Leaderboard'

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
    errorElement: <NotFoundPage />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
  {
    path: '/game/leaderboard',
    element: <Leaderboard />,
    errorElement: <NotFoundPage />,
  },
])

export default router
