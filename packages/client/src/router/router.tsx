import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import HomePage from '@/pages/game/HomePage'
import ErrorPage from '@/pages/ErrorPage/ErrorPage'
import { PAGE_ERROR, NOT_FOUND_ERROR } from '@/config/errorConfig'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
    errorElement: <ErrorPage config={PAGE_ERROR} />,
  },
  {
    path: '*',
    element: <ErrorPage config={NOT_FOUND_ERROR} />,
  },
])

export default router
