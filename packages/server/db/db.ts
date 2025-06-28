import { Sequelize } from 'sequelize-typescript'

const { POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB, POSTGRES_PORT } =
  process.env

export const sequelize = new Sequelize({
  database: POSTGRES_DB,
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  host: 'localhost',
  port: Number(POSTGRES_PORT),
  dialect: 'postgres',
  models: [__dirname + '/models/*.model.ts'],
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
