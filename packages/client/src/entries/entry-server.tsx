import { routerConfig } from '@/providers/router/router.config'
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
import { ServerStyleSheet } from 'styled-components'
import { createFetchRequest } from './entry-server.utils'

export async function render(req: ExpressRequest) {
  const { query, dataRoutes } = createStaticHandler(routerConfig.routes)

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
        <HelmetProvider context={helmetContext}>
          <React.StrictMode>
            <StaticRouterProvider router={router} context={context} />
          </React.StrictMode>
        </HelmetProvider>
      )
    )

    const styleTags = sheet.getStyleTags()
    const { helmet } = helmetContext as { helmet: HelmetData }
    return { appHtml, styleTags, helmet }
  } finally {
    console.log('Render to string is finally')
  }
}
