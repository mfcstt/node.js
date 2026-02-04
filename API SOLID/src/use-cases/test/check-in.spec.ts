import { beforeEach, describe, expect, it } from 'vitest'
import { CheckInUseCase } from '@/use-cases/check-in/check-in'
import { InMemoryCheckInRepository } from '@/repositories/in-memory/in-memory-check-in-repository'
import { CheckInAlreadyDoneTodayError } from '../erros/check-in-already-done-today-error'
import { randomUUID } from 'node:crypto'

describe('Check-in Use Case', () => {
  let checkInRepository: InMemoryCheckInRepository
  let checkInUseCase: CheckInUseCase

  beforeEach(() => {
    checkInRepository = new InMemoryCheckInRepository()
    checkInUseCase = new CheckInUseCase(checkInRepository)
  })

  it('should be able to create a check-in', async () => {
    const user_id = randomUUID()
    const gym_id = randomUUID()

    const { check_in } = await checkInUseCase.checkIn({ user_id, gym_id })

    await expect(check_in.id).toEqual(expect.any(String))

  })

  it('should not be able to create 2 check-ins on the same day', async () => {
    const user_id = randomUUID()
    const gym_id = randomUUID()

    await checkInUseCase.checkIn({ user_id, gym_id })

    await expect(async () => {
      await checkInUseCase.checkIn({ user_id, gym_id })
    }).rejects.toBeInstanceOf(CheckInAlreadyDoneTodayError)
  })
})
