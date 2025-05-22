import React from 'react'
import ReactDOM from 'react-dom/client'
import { ConfigProvider } from 'antd'
import { ThemeProvider } from 'styled-components'
import { RouterProvider } from 'react-router-dom'

import 'antd/dist/reset.css'
import { defaultTheme } from './themes/defaultTheme'
import { router } from './router/router'
import { AuthProvider } from '@/context/AuthContext'
import '../global.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <ConfigProvider theme={defaultTheme}>
    <ThemeProvider theme={defaultTheme}>
      <React.StrictMode>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </React.StrictMode>
    </ThemeProvider>
  </ConfigProvider>
)
