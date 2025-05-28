import { ConfigProvider } from 'antd'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'

import 'antd/dist/reset.css'
import { AuthProvider } from '@/context/AuthContext'
import '../global.css'
import { router } from './router/router'
import { registerServiceWorker } from './sw/register'
import { defaultTheme } from './themes/defaultTheme'

if (import.meta.env.PROD) {
  registerServiceWorker()
}

import { Provider as ReduxProvider } from 'react-redux'
import { store } from './store/store'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <ReduxProvider store={store}>
    <ConfigProvider theme={defaultTheme}>
      <ThemeProvider theme={defaultTheme}>
        <React.StrictMode>
          <AuthProvider>
            <RouterProvider router={router} />
          </AuthProvider>
        </React.StrictMode>
      </ThemeProvider>
    </ConfigProvider>
  </ReduxProvider>
)
