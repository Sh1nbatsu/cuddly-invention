import { routes } from '@/providers/router/router.routes'
import { store } from '@/providers/store/store'
import { antdTheme, styledTheme } from '@/shared/themes/defaultTheme'
import { ConfigProvider } from 'antd'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider as ReduxProvider } from 'react-redux'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'

import 'antd/dist/reset.css'

import { registerServiceWorker } from '@/sw/register'
import '../shared/assets/global.css'

if (import.meta.env.PROD) {
  registerServiceWorker()
}

const browserRouter = createBrowserRouter(routes)

ReactDOM.hydrateRoot(
  document.getElementById('root')!,
  <React.StrictMode>
    <ReduxProvider store={store}>
      <ConfigProvider theme={antdTheme}>
        <ThemeProvider theme={styledTheme}>
          <RouterProvider router={browserRouter} />
        </ThemeProvider>
      </ConfigProvider>
    </ReduxProvider>
  </React.StrictMode>
)
