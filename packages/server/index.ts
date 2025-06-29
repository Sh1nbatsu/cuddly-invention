import { errorHandler } from 'api/middleware/error.middleware'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import express from 'express'
import { connectDB } from './api/db/db'
import apiRouter from './api/routes/api.route'
import sessionRouter from './api/routes/session.route'

// const CLIENT_PATH = path.resolve('../client/dist/client')
const PORT = process.env.SERVER_PORT

async function startServer() {
  const app = express()

  await connectDB()
  // await setupSSR(app, CLIENT_PATH)

  app.use(
    cors({
      origin: 'http://localhost:3000',
      credentials: true,
    })
  )

  app.use(express.json())
  app.use(cookieParser())

  app.use('/auth', sessionRouter)

  app.use('/api', apiRouter)

  app.use(errorHandler)

  app.listen(PORT, () => {
    console.log(
      `  ➜ 🎸 Server is listening on port: ${process.env.SERVER_PORT}`
    )
  })
}

startServer()
