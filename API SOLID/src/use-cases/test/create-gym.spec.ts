import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { beforeEach, describe, expect, it } from "vitest";

describe('Create Gym Use Case', () => {

  let gymsRepository: InMemoryGymsRepository

  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
  })

  it('should be able to create a new gym', async () => {

      const gym = await gymsRepository.create({
        name: 'Gym Test',
        description: 'Description Test',
        phone: '11999999999',
        latitude: -23.5489,
        longitude: -46.6388,
      })
      expect(gym.id).toEqual(expect.any(String))
    })

  })
 