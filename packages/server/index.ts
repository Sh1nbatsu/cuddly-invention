import { errorHandler } from './api/middleware/error.middleware'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import express from 'express'
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

  const allowedOrigins = [
    'http://localhost:3000',
    'http://localhost:3001',
    'https://titleisundefined.ya-praktikum.tech',
  ]

  app.use(
    cors({
      origin: function (origin, callback) {
        console.log(origin, 'origin')
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
          callback(null, true)
        } else {
          callback(new Error('Not allowed by CORS'))
        }
      },
      credentials: true,
    })
  )

  app.use(express.json())
  app.use(cookieParser())

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
