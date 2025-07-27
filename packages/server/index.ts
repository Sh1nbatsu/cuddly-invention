import { errorHandler } from './api/middleware/error.middleware'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import path from 'path'
import { setupSSR } from './ssr/render'
import { connectDB } from './api/db/db'
import apiRouter from './api/routes/api.route'
import sessionRouter from './api/routes/session.route'

const PORT = process.env.SERVER_PORT || 3000
const CLIENT_PATH = path.resolve(process.cwd(), 'packages/client')

async function startServer() {
  const app = express()

  await connectDB()

  app.use(
    cors({
      origin: 'http://localhost:3000',
      credentials: true,
    })
  )

  app.use(express.json())
  app.use(cookieParser())

  const isDev = process.env.NODE_ENV === 'development'

  const allowedOrigin = isDev
    ? 'http://localhost:3000'
    : 'https://titleisundefined.ya-praktikum.tech'

  if (!isDev) {
    app.use(
      helmet({
        contentSecurityPolicy: {
          directives: {
            defaultSrc: ["'self'", allowedOrigin],
            scriptSrc: ["'self'", allowedOrigin],
            styleSrc: ["'self'", "'unsafe-inline'", allowedOrigin],
            imgSrc: ["'self'", 'data:', allowedOrigin],
            fontSrc: ["'self'", allowedOrigin],
            connectSrc: ["'self'", allowedOrigin],
            objectSrc: ["'none'"],
            upgradeInsecureRequests: [],
          },
        },
      })
    )
  }

  app.use('/auth', sessionRouter)
  app.use('/api', apiRouter)

  await setupSSR(app, CLIENT_PATH)

  app.use(errorHandler)

  app.listen(PORT, () => {
    console.log(
      `  ➜ 🎸 Server is listening on port: ${process.env.SERVER_PORT}`
    )
  })
}

startServer()
