import 'dotenv/config'

import { randomUUID } from 'node:crypto'
import { execSync } from 'node:child_process'
import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'
import type { Environment } from 'vitest/environments'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

function generateDatabaseURL(schema: string) {
  if (!process.env.DATABASE_URL) {
    throw new Error('Please provide a DATABASE_URL environment variable.')
  }

  const url = new URL(process.env.DATABASE_URL)
  url.searchParams.set('schema', schema)
  return url.toString()
}

export default <Environment>{
  name: 'prisma',
  viteEnvironment: 'ssr', // usa o ambiente SSR do Vite (evita "environment was not defined")
  async setup() {
    const schema = randomUUID()
    const databaseURL = generateDatabaseURL(schema)

    process.env.DATABASE_URL = databaseURL

    execSync('npx prisma db push')

    // Carrega Prisma via Node (CJS) dentro do setup para evitar "exports is not defined".
    // Prisma 7 exige adapter; usamos o mesmo padrão do app (PrismaPg + Pool).
    const require = createRequire(import.meta.url)
    const { PrismaClient } = require(resolve(__dirname, '..', 'generated'))
    const { PrismaPg } = require('@prisma/adapter-pg')
    const { Pool } = require('pg')
    const pool = new Pool({ connectionString: databaseURL })
    const adapter = new PrismaPg(pool)
    const prisma = new PrismaClient({ adapter })

    return {
      async teardown() {
        await prisma.$executeRawUnsafe(
          `DROP SCHEMA IF EXISTS "${schema}" CASCADE`,
        )
        await prisma.$disconnect()
      },
    }
  },
}