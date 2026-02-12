
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'

import { env } from '@/env/index.js'
import { PrismaClient } from 'prisma/generated/index.js'

// Carregue a URL do DB do processo (geralmente via .env)
const connectionString = env.DATABASE_URL

if (!connectionString) {
  throw new Error('DATABASE_URL is not set')
}

// Crie o pool de conexão do driver e o adaptador
const pool = new Pool({ connectionString })
const adapter = new PrismaPg(pool)

export const prisma = new PrismaClient({
  adapter,
  log: env.NODE_ENV === 'dev' ? ['query'] : [],
})

