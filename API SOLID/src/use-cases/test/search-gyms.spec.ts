import  { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { beforeEach, describe, expect, it } from "vitest";
import  { SearchGymUseCase } from "../gyms/search-gyms";

let GymsRepository: InMemoryGymsRepository
let SearchGymsUseCase: SearchGymUseCase

describe('Search Gyms Use Case', () => {
  
  beforeEach(() => {
    GymsRepository = new InMemoryGymsRepository()
    SearchGymsUseCase = new SearchGymUseCase(GymsRepository)
  })


  it('should be able to search for gyms', async () => {
    await GymsRepository.create({
      name: 'Javascript Gym',
      description: null,
      phone: null,
      latitude: -23.682,
      longitude: -46.875
    })
    await GymsRepository.create({
      name: 'Typescript Gym',
      description: null,
      phone: null,
      latitude: -23.682,
      longitude: -46.875
    })

    const { gyms } = await SearchGymsUseCase.search({
      query: 'Javascript',
      page: 1
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([
      expect.objectContaining({
        name: 'Javascript Gym'
      })]
    )
  })

    it('should be able to fetch paginated gyms search', async () => {
    for(let i = 1; i <= 22; i++) {
      await GymsRepository.create({
        name: `Javascript Gym ${i}`,
        description: null,
        phone: null,
        latitude: -23.682,
        longitude: -46.875
      })
    }
    
    const { gyms } = await SearchGymsUseCase.search({
      query: 'Javascript',
      page: 2
    })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({ name: 'Javascript Gym 21' }),
      expect.objectContaining({ name: 'Javascript Gym 22' }),
    ])
  })
  })