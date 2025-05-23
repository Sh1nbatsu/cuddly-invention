import { ConfigProvider } from 'antd'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'

import 'antd/dist/reset.css'
import '../global.css'
import { router } from './router/router'
import { registerServiceWorker } from './sw/register'
import { defaultTheme } from './themes/defaultTheme'

if (import.meta.env.PROD) {
  registerServiceWorker()
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <ConfigProvider theme={defaultTheme}>
    <ThemeProvider theme={defaultTheme}>
      <React.StrictMode>
        <RouterProvider router={router} />
      </React.StrictMode>
    </ThemeProvider>
  </ConfigProvider>
)
