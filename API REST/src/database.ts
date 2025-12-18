import 'dotenv/config'

import knex from 'knex'
import type { Knex } from 'knex'
import { env } from './env/index.js'

if (!env.DATABASE_URL) {
  throw new Error('DATABASE ENVIRONMENT NOT SET')
}

export const config: Knex.Config = {
  client: 'sqlite3',
  connection: {
    filename: env.DATABASE_URL
  },
  useNullAsDefault: true,
  migrations: {
    extension: 'ts',
    directory: './db/migrations'
  }
}

export const db = knex(config)
export { knex }

