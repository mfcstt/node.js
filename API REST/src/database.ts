import 'dotenv/config'

import knex from 'knex'
import type { Knex } from 'knex'
import { env } from './env/index.js'
import { en } from 'zod/locales'

if (!env.DATABASE_URL) {
  throw new Error('DATABASE ENVIRONMENT NOT SET')
}

export const config: Knex.Config = {
  client: env.DATABASE_CLIENT,
  connection: env.DATABASE_URL === 'sqlite'
    ? { filename: env.DATABASE_URL }
    : env.DATABASE_URL,
  useNullAsDefault: true,
  migrations: {
    extension: 'ts',
    directory: './db/migrations'
  }
}

export const db = knex(config)
export { knex }

