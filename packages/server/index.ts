import express from 'express'
import path from 'path'
import { setupSSR } from './ssr/render'

const PORT = process.env.SERVER_PORT || 3000
const CLIENT_PATH = path.resolve(process.cwd(), 'packages/client')

async function startServer() {
  const app = express()

  await setupSSR(app, CLIENT_PATH)

  app.listen(PORT, () => {
    console.log(`  ➜ 🎸 Server is listening on port: ${PORT}`)
  })
}

startServer()
