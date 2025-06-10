import { routerConfig } from '@/providers/router/router.config'
import { antdTheme, styledTheme } from '@/shared/themes/defaultTheme'
import { ConfigProvider } from 'antd'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'

ReactDOM.hydrateRoot(
  document.getElementById('root')!,
  <React.StrictMode>
    <ConfigProvider theme={antdTheme}>
      <ThemeProvider theme={styledTheme}>
        <RouterProvider router={routerConfig} />
      </ThemeProvider>
    </ConfigProvider>
  </React.StrictMode>
)
