import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { app } from '@/app'
import { createAndAuthenticateUser } from '@/use-cases/utils/test/create-and-authenticate-user'

describe('Search Gym (e2e)', () => {

  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to search gym', async () => {

    const { token } = await createAndAuthenticateUser(app, true)

   await request(app.server)
    .post('/gym')
    .set('Authorization', `Bearer ${token}`)
    .send({
      name: 'Gym 01',
      description: '',
      phone: '',
      latitude: -27.0610928,
      longitude: -49.5229501,
      
    })

    await request(app.server)
    .post('/gym')
    .set('Authorization', `Bearer ${token}`)
    .send({
      name: 'Gym 02',
      description: '',
      phone: '',
      latitude: -27.2092052,
    longitude:  -49.6401091,
      
    })

    const response = await request(app.server)
    .get('/gym/search')
    .set('Authorization', `Bearer ${token}`)
    .query({
        query: "02"
    })
    .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.gyms).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: 'Gym 02'
        })
      ])
    )

  })
})