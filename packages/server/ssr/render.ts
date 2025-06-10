import express, { NextFunction, Request, Response } from 'express'
import fs from 'fs/promises'
import path from 'path'
import { HelmetData } from 'react-helmet'
import { createServer } from 'vite'

// Типизации для функции packages/client/src/entries/entry-server.tsx
type RenderFn = (req: Request) => Promise<{
  appHtml: string
  helmet: HelmetData
  styleTags: string
}>

export async function setupSSR(app: express.Express, clientPath: string) {
  const vite = await createServer({
    server: { middlewareMode: true },
    root: clientPath,
    appType: 'custom',
  })

  app.use(vite.middlewares)

  app.get('*', async (req: Request, res: Response, next: NextFunction) => {
    const url = req.originalUrl

    try {
      let template = await fs.readFile(
        path.resolve(clientPath, 'index.html'),
        'utf-8'
      )

      template = await vite.transformIndexHtml(url, template)

      const mod = (await vite.ssrLoadModule(
        path.join(clientPath, 'src/entries/entry-server.tsx')
      )) as { render: RenderFn }

      const { appHtml, styleTags, helmet } = await mod.render(req)

      const html = template
        .replace(`<!--ssr-outlet-->`, appHtml)
        .replace('<!--styles-->', styleTags)
        .replace('<!--helmet-title-->', helmet.title.toString())
        .replace('<!--helmet-meta-->', helmet.meta.toString())
        .replace('<!--helmet-link-->', helmet.link.toString())

      res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
    } catch (e) {
      vite.ssrFixStacktrace(e as Error)
      next(e)
    }
  })
}
