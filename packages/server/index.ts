import express, { Router } from 'express'
import path from 'path'
import { connectDB } from './api/db/db'
import sessionRouter from './api/routes/session.route'
import { setupSSR } from './ssr/render'

const CLIENT_PATH = path.resolve('../client')
const PORT = process.env.SERVER_PORT

async function startServer() {
  const app = express()
  const router = Router()

  await connectDB()
  await setupSSR(app, CLIENT_PATH)
  app.use(express.json())

  router.use('/auth', sessionRouter)

  app.use(router)
  app.listen(PORT, () => {
    console.log(
      `  ➜ 🎸 Server is listening on port: ${process.env.SERVER_PORT}`
    )
  })
}

startServer()
