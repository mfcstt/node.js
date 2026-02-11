import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { app } from '@/app'

describe('Profile (e2e)', () => {

  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to get user profile', async () => {
    const signUpResponse = await request(app.server).post('/signup').send({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    })

    const loginResponse = await request(app.server).post('/login').send({
      email: 'johndoe@example.com',
      password: '123456',
    })

    const { token } = loginResponse.body

    const profileResponse = await request(app.server) // → removi o ponto extra após request
      .get('/profile')
      .set('Authorization', `Bearer ${token}`) // → corrigido "Authorizarion" para "Authorization"
      .send()

    expect(profileResponse.status).toEqual(200)
    expect(profileResponse.body.user).toEqual(
      expect.objectContaining({
        email: 'johndoe@example.com',
      })
    )
  })
})
