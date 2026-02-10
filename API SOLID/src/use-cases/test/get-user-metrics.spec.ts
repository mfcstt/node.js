import { InMemoryCheckInRepository } from "@/repositories/in-memory/in-memory-check-in-repository";
import { GetUserMetricsUseCase } from "../check-in/get-user-metrics";
import { beforeEach, describe, expect, it } from "vitest";

let checkInRepository: InMemoryCheckInRepository
let getUserMetricsUseCase: GetUserMetricsUseCase

describe('Get User Metrics Use Case', () => {
  beforeEach(async () => {
    checkInRepository = new InMemoryCheckInRepository()
    getUserMetricsUseCase = new GetUserMetricsUseCase(checkInRepository)
  })

  it('should be able to get check-ins count from metrics', async() => {
    await checkInRepository.create({
      gym_id: 'gym-01',
      user_id: 'user-01'
    })

     await checkInRepository.create({
      gym_id: 'gym-02',
      user_id: 'user-01'
    })

    const {checkInsCount} = await getUserMetricsUseCase.execute({
      userId: 'user-01'
    })

    expect(checkInsCount).toEqual(2)

  })

  it 

})