import { FastifyInstance } from 'fastify'
import request from 'supertest'
import { prisma } from '@/lib/prisma'
import { randomUUID } from 'crypto'

export async function createAndAuthenticateUser(app: FastifyInstance) {
  const email = `johndoe-${randomUUID()}@example.com`
  const password = '123456'

  await request(app.server).post('/signup').send({
    name: 'John Doe',
    email,
    password,
  })

  const authResponse = await request(app.server).post('/login').send({
    email,
    password,
  })

  const { token } = authResponse.body

  const user = await prisma.user.findUniqueOrThrow({
    where: { email },
  })

  return {
    token,
    userId: user.id,
  }
}
