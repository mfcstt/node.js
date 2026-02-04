import { InMemoryCheckInRepository } from "@/repositories/in-memory/in-memory-check-in-repository"
import { beforeEach, describe, expect, it } from "vitest"
import { FetchUserCheckInsHistoryUseCase } from "../check-in/fetch-user-check-ins-history"

describe('Fetch User Check-Ins History Use Case', () => {
  let checkInsRepository: InMemoryCheckInRepository
  let fetchUserCheckInsHistoryUseCase: FetchUserCheckInsHistoryUseCase
  
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInRepository()
    fetchUserCheckInsHistoryUseCase = new FetchUserCheckInsHistoryUseCase(checkInsRepository)
  })

  it('should be able to fetch user check-ins history', async () => {
    await checkInsRepository.create({
      gym_id: 'gym-01',
      user_id: 'user-01',
    })
     await checkInsRepository.create({
      gym_id: 'gym-02',
      user_id: 'user-01',
    })

    const {check_ins} = await fetchUserCheckInsHistoryUseCase.fetch({
      userId: 'user-01',
      page: 1,
    })
    expect(check_ins).toHaveLength(2)
})

  it('should be able to fetch paginated user check-ins history', async () => {
    for (let i = 1; i <= 22; i++) {
      await checkInsRepository.create({
        gym_id: `gym-${i}`,
        user_id: 'user-01',
      })
    }
    const {check_ins} = await fetchUserCheckInsHistoryUseCase.fetch({
      userId: 'user-01',
      page: 2,
    })
    expect(check_ins).toHaveLength(2)
    expect(check_ins).toEqual([
      expect.objectContaining({ gym_id: 'gym-21' }),
      expect.objectContaining({ gym_id: 'gym-22' }),
    ])
  }
)

})

