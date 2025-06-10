import express, { NextFunction, Request, Response } from 'express'
import fs from 'fs/promises'
import path from 'path'
import { createServer } from 'vite'

// Типизации для функции packages/client/src/entries/entry-server.tsx
type RenderFn = (req: Request) => Promise<{
  appHtml: string
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

      const { appHtml } = await mod.render(req)

      const html = template.replace(`<!--ssr-outlet-->`, appHtml)

      res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
    } catch (e) {
      vite.ssrFixStacktrace(e as Error)
      next(e)
    }
  })
}
