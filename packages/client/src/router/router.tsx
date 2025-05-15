import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import { ProtectedRoute } from '@/components/ProtectedRoute'
import HomePage from '@/pages/game/HomePage'
import ErrorPage from '@/pages/ErrorPage/ErrorPage'
import { Login } from '@/pages/auth/Login'
import { Registration } from '@/pages/auth/Registration'
import { authRoutes } from './auth/auth'
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
    element: <ErrorPage config={NOT_FOUND_ERROR} />,
  },
])
