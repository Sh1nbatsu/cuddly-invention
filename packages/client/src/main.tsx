import { router } from '@/router/router'
import { ConfigProvider } from 'antd'
import 'antd/dist/reset.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { defaultTheme } from './themes/defaultTheme'
import { Provider as ReduxProvider } from 'react-redux'
import { store } from './store/store'

import '../global.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <ReduxProvider store={store}>
    <ConfigProvider theme={defaultTheme}>
      <React.StrictMode>
        <RouterProvider router={router} />
      </React.StrictMode>
    </ConfigProvider>
  </ReduxProvider>
)
