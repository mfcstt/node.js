import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { app } from '@/app'
import { createAndAuthenticateUser } from '@/use-cases/utils/test/create-and-authenticate-user'

describe('Create Gym (e2e)', () => {

  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create gym', async () => {

    const { token } = await createAndAuthenticateUser(app, true)

    const response = await request(app.server)
    .post('/gym')
    .set('Authorization', `Bearer ${token}`)
    .send({
      name: 'Gym 01',
      description: '',
      phone: '',
      latitude: -23.5489,
      longitude: -46.6388
      
    })

    expect(response.statusCode).toEqual(201)
  })
})