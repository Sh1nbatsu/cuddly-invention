import { ConfigProvider } from 'antd'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'

import 'antd/dist/reset.css'

import '../shared/assets/global.css'

if (import.meta.env.PROD) {
  registerServiceWorker()
}

import { routerConfig } from '@/providers/router/router.config'
import { store } from '@/providers/store/store'
import { defaultTheme } from '@/shared/themes/defaultTheme'
import { registerServiceWorker } from '@/sw/register'
import { Provider as ReduxProvider } from 'react-redux'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <ReduxProvider store={store}>
    <ConfigProvider theme={defaultTheme}>
      <ThemeProvider theme={defaultTheme}>
        <React.StrictMode>
          <RouterProvider router={routerConfig} />
        </React.StrictMode>
      </ThemeProvider>
    </ConfigProvider>
  </ReduxProvider>
)
