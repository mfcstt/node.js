import { randomUUID } from 'node:crypto'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { app } from '@/app'

describe('Sign Up (e2e)', () => {

  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to sign up', async () => {
    const email = `signup-${randomUUID()}@example.com`
    const response = await request(app.server).post('/signup').send({
      name: 'John Doe',
      email,
      password: '123456',
    })

    expect(response.statusCode).toEqual(201)
  })
})