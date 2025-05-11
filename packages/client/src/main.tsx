import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import router from '@/router/router'
import { ConfigProvider } from 'antd'
import 'antd/dist/reset.css'
import { defaultTheme } from './themes/defaultTheme'

import '../global.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <ConfigProvider theme={defaultTheme}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </ConfigProvider>
)
