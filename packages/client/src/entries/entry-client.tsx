import { routes } from '@/providers/router/router.routes'
import { store } from '@/providers/store/store'
import { ThemeProviderCustom } from '@/shared/themes/themeContext'
import { ConfigProvider } from 'antd'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider as ReduxProvider } from 'react-redux'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { registerServiceWorker } from '@/sw/register'

import 'antd/dist/reset.css'

import '../shared/assets/global.css'

// if (import.meta.env.PROD) {
//   registerServiceWorker()
// }

const browserRouter = createBrowserRouter(routes)

const App = () => {
  return (
    <ConfigProvider>
      <RouterProvider router={browserRouter} />
    </ConfigProvider>
  )
}

const rootElement = document.getElementById('root')

if (!rootElement) {
  throw new Error('rootElement не найден.')
}

ReactDOM.hydrateRoot(
  rootElement,
  <React.StrictMode>
    <ReduxProvider store={store}>
      <ThemeProviderCustom>
        <App />
      </ThemeProviderCustom>
    </ReduxProvider>
  </React.StrictMode>
)
