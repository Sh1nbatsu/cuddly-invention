import { routes } from '@/providers/router/router.routes'
import { antdTheme, styledTheme } from '@/shared/themes/defaultTheme'
import { ConfigProvider } from 'antd'
import { Request as ExpressRequest } from 'express'
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { HelmetData } from 'react-helmet'
import { HelmetProvider } from 'react-helmet-async'
import {
  createStaticHandler,
  createStaticRouter,
  StaticRouterProvider,
} from 'react-router-dom'
import { ServerStyleSheet, ThemeProvider } from 'styled-components'
import { createFetchRequest } from './entry-server.utils'

export async function render(req: ExpressRequest) {
  const { query, dataRoutes } = createStaticHandler(routes)

  const fetchRequest = createFetchRequest(req)

  const context = await query(fetchRequest)

  if (context instanceof Response) {
    throw context
  }

  const router = createStaticRouter(dataRoutes, context)
  const sheet = new ServerStyleSheet()
  const helmetContext = {}
  try {
    const appHtml = ReactDOMServer.renderToString(
      sheet.collectStyles(
        <React.StrictMode>
          <HelmetProvider context={helmetContext}>
            <ConfigProvider theme={antdTheme}>
              <ThemeProvider theme={styledTheme}>
                <StaticRouterProvider router={router} context={context} />
              </ThemeProvider>
            </ConfigProvider>
          </HelmetProvider>
        </React.StrictMode>
      )
    )

    const styleTags = sheet.getStyleTags()
    const { helmet } = helmetContext as { helmet: HelmetData }
    return { appHtml, styleTags, helmet }
  } finally {
    console.log('Render to string is finally')
  }
}
