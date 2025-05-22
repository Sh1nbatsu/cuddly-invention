import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import { ProtectedRoute } from '@/components/ProtectedRoute'
import HomePage from '@/pages/game/HomePage'
import { ErrorPage } from '@/pages/ErrorPage/ErrorPage'
import { Login } from '@/pages/auth/Login'
import { Registration } from '@/pages/auth/Registration'
import Leaderboard from '@/pages/game/leaderboard/LeaderboardPage'

import { authRoutes } from './auth/auth'
import { forumRoutes } from '@/router/forum/forum'
import { PAGE_ERROR, NOT_FOUND_ERROR } from '@/config/errorConfig'

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <HomePage />
      </ProtectedRoute>
    ),
    errorElement: <ErrorPage config={PAGE_ERROR} />,
  },
  authRoutes,
  forumRoutes,
  {
    path: '/sign-up',
    element: <Registration />,
    errorElement: <ErrorPage config={PAGE_ERROR} />,
  },
  {
    path: '/sign-in',
    element: <Login />,
    errorElement: <ErrorPage config={PAGE_ERROR} />,
  },
  {
    path: '*',
    element: <ErrorPage config={NOT_FOUND_ERROR} />,
  },
  {
    path: '/game/leaderboard',
    element: <Leaderboard />,
    errorElement: <ErrorPage config={PAGE_ERROR} />,
  },
])
