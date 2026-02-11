import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { app } from '@/app'
import { createAndAuthenticateUser } from '@/use-cases/utils/test/create-and-authenticate-user'
import { prisma } from '@/lib/prisma'

describe('Check In History (e2e)', () => {

  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to list the history of check-ins', async () => {

    const { token, userId } = await createAndAuthenticateUser(app)

    const gym = await prisma.gym.create({
        data: {
          name: 'JavaScript Gym',
          latitude: -27.2092052,
          longitude: -49.6401091,
        },
      })


    await prisma.checkIn.createMany({
        data: [
          {
            gym_id: gym.id,
            user_id: userId,
          },
          {
            gym_id: gym.id,
            user_id: userId,
          },
        ],
      })

      const response = await request(app.server)
      .get('/check-ins/history')
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.check_ins).toEqual([
      expect.objectContaining({
        gym_id: gym.id,
        user_id: userId,
      }),
      expect.objectContaining({
        gym_id: gym.id,
        user_id: userId,
      }),
    ])
  })
})