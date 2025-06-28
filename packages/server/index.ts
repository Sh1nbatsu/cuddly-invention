import { connectDB } from '@db/db'
import express from 'express'
import path from 'path'
import { setupSSR } from './ssr/render'

const PORT = 3000
const CLIENT_PATH = path.resolve('../client')

async function startServer() {
  const app = express()
  await connectDB()
  await setupSSR(app, CLIENT_PATH)

  app.listen(PORT, () => {
    console.log(`  ➜ 🎸 Server is listening on port: ${PORT}`)
  })
}

startServer()
