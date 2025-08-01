import 'dotenv/config'
import { Sequelize } from 'sequelize-typescript'
import Comment from './models/Comment.model'
import Topic from './models/Topic.model'
import User from './models/User.model'

const {
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DB,
  POSTGRES_CONTAINER_PORT,
} = process.env

export const sequelize = new Sequelize({
  database: POSTGRES_DB,
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  host: 'postgres',
  port: Number(POSTGRES_CONTAINER_PORT),
  dialect: 'postgres',
  models: [Comment, Topic, User],
  logging: false,
})

export const connectDB = async () => {
  try {
    await sequelize.authenticate()
    await sequelize.sync()
    console.log('  ➜ 🎸 Connected to the database')
    return sequelize
  } catch (error) {
    console.error('Database connection error:', error)
    throw error
  }
}
