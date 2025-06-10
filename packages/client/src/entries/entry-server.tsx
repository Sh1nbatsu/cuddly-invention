import { routerConfig } from '@/providers/router/router.config'
import { Request as ExpressRequest } from 'express'
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import {
  createStaticHandler,
  createStaticRouter,
  StaticRouterProvider,
} from 'react-router-dom'
import { createFetchRequest } from './entry-server.utils'

export async function render(req: ExpressRequest) {
  const { query, dataRoutes } = createStaticHandler(routerConfig.routes)

  const fetchRequest = createFetchRequest(req)

  const context = await query(fetchRequest)

  if (context instanceof Response) {
    throw context
  }

  const router = createStaticRouter(dataRoutes, context)

  const appHtml = ReactDOMServer.renderToString(
    <React.StrictMode>
      <StaticRouterProvider router={router} context={context} />
    </React.StrictMode>
  )

  return { appHtml }
}
