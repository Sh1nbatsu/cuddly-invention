import React, { Suspense } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import HomePage from '@/pages/game/HomePage'
import { PAGE_ERROR, NOT_FOUND_ERROR } from '@/config/errorConfig'

const ErrorPage = React.lazy(() =>
  import('@/pages/ErrorPage/ErrorPage').then(m => ({ default: m.ErrorPage }))
)

export const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
    errorElement: (
      <Suspense fallback={<div>Загрузка...</div>}>
        <ErrorPage config={PAGE_ERROR} />
      </Suspense>
    ),
  },
  {
    path: '*',
    element: (
      <Suspense fallback={<div>Загрузка...</div>}>
        <ErrorPage config={NOT_FOUND_ERROR} />
      </Suspense>
    ),
  },
])

export default router
