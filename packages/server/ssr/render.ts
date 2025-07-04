import express, { NextFunction, Request, Response } from 'express'
import fs from 'fs/promises'
import path from 'path'
import { HelmetData } from 'react-helmet'
import { createServer, ViteDevServer } from 'vite'

export async function setupSSR(app: express.Express, clientPath: string) {
  const isDev = process.env.NODE_ENV === 'development'
  let vite: ViteDevServer | undefined
  if (isDev) {
    vite = await createServer({
      server: { middlewareMode: true },
      root: clientPath,
      appType: 'custom',
    })

    app.use(vite.middlewares)
  } else {
    const distPath = path.resolve(clientPath, 'dist/client')
    app.use(express.static(distPath))

    app.get('*', async (req: Request, res: Response, next: NextFunction) => {
      const url = req.originalUrl

      try {
        let template: string
        // Типизации для функции packages/client/src/entries/entry-server.tsx
        let render: (req: Request) => Promise<{
          appHtml: string
          styleTags: string
          helmet: HelmetData
        }>
        if (vite) {
          template = await fs.readFile(
            path.resolve(clientPath, 'index.html'),
            'utf-8'
          )

          template = await vite.transformIndexHtml(url, template)

          render = (
            await vite.ssrLoadModule(
              path.join(clientPath, 'src/entry-server.tsx')
            )
          ).render
        } else {
          template = await fs.readFile(
            path.join(clientPath, 'dist/client/index.html'),
            'utf-8'
          )

          const pathToServer = path.resolve(
            clientPath,
            'dist/server/entry-server.cjs'
          )

          render = (await import(pathToServer)).render
        }

        const { appHtml, styleTags, helmet } = await render(req)

        const html = template
          .replace(`<!--ssr-outlet-->`, appHtml)
          .replace('<!--styles-->', styleTags)
          .replace('<!--helmet-title-->', helmet.title.toString())
          .replace('<!--helmet-meta-->', helmet.meta.toString())
          .replace('<!--helmet-link-->', helmet.link.toString())

        res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
      } catch (error) {
        vite?.ssrFixStacktrace(error as Error)
        next(error)
      }
    })
  }
}
