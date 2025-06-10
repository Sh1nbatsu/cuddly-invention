import { routerConfig } from '@/providers/router/router.config'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'

ReactDOM.hydrateRoot(
  document.getElementById('root')!,
  <React.StrictMode>
    <RouterProvider router={routerConfig} />
  </React.StrictMode>
)
