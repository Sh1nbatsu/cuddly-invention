import { initAuth } from '@/shared/hooks/init-auth'
import { routerConfig } from '@/providers/router/router.config'
import { store } from '@/providers/store/store'
import { antdTheme, styledTheme } from '@/shared/themes/defaultTheme'
import { ConfigProvider } from 'antd'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider as ReduxProvider } from 'react-redux'
import { RouterProvider } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'

import 'antd/dist/reset.css'

import { registerServiceWorker } from '@/sw/register'
import '../shared/assets/global.css'

async function bootstrap() {
  if (import.meta.env.PROD) {
    registerServiceWorker()
  }

  await initAuth()

  ReactDOM.hydrateRoot(
    document.getElementById('root')!,
    <React.StrictMode>
      <ReduxProvider store={store}>
        <ConfigProvider theme={antdTheme}>
          <ThemeProvider theme={styledTheme}>
            <RouterProvider router={routerConfig} />
          </ThemeProvider>
        </ConfigProvider>
      </ReduxProvider>
    </React.StrictMode>
  )
}

void bootstrap()
