import { Options } from 'sequelize'
import * as dotenv from 'dotenv'

dotenv.config()

interface DbConfig extends Options {
  username?: string
  password?: string
  database?: string
  use_env_variable?: string
}

const config: Record<string, DbConfig> = {
  development: {
    username: process.env.DB_USER ?? 'postgres',
    password: process.env.DB_PASSWORD ?? 'secret',
    database: process.env.DB_NAME ?? 'apex_store_dev',
    host: process.env.DB_HOST ?? 'localhost',
    port: parseInt(process.env.DB_PORT ?? '5432'),
    dialect: 'postgres',
    logging: (msg: string) => console.log(msg),
  },
  test: {
    username: process.env.DB_USER ?? 'postgres',
    password: process.env.DB_PASSWORD ?? 'secret',
    database: process.env.DB_NAME ?? 'apex_store_test',
    host: process.env.DB_HOST ?? 'localhost',
    port: parseInt(process.env.DB_PORT ?? '5432'),
    dialect: 'postgres',
    logging: false,
  },
  production: {
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres',
    logging: false,
    dialectOptions: {
      ssl: { require: true, rejectUnauthorized: false },
    },
  },
}

export default config
