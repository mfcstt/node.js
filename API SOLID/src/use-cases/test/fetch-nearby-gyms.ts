import  { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { beforeEach, describe, expect, it } from "vitest";
import  { FetchNearbyGymsUseCase } from "../gyms/fetch-nearby-gyms";



let GymsRepository: InMemoryGymsRepository
let FetchNearbyGymUseCase: FetchNearbyGymsUseCase 

describe('Fetch Nearby Gyms Use Case', () => {
  beforeEach(async () => {
    GymsRepository = new InMemoryGymsRepository()
    FetchNearbyGymUseCase = new FetchNearbyGymsUseCase(GymsRepository)
  }
)

  it('should be able to fetch nearby gyms', async () => {
    await GymsRepository.create({
      name: 'JavaScript Gym',
      description: null,
      phone: null,
      latitude: -23.6821608,
      longitude: -46.5954058,
    })
    await GymsRepository.create({
      name: 'TypeScript Gym',
      description: null,
      phone: null,
      latitude: -23.6821608,
      longitude: -46.5954058,
    })
    
    const { gyms } = await FetchNearbyGymUseCase.fetch({
      userLatitude: -23.6821608,
      userLongitude: -46.5954058,
    })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([expect.objectContaining({ name: 'JavaScript Gym' }), expect.objectContaining({ name: 'TypeScript Gym' })])

  
})
})

