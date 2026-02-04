import { beforeEach, describe, expect, it, vi } from 'vitest'
import { CheckInUseCase } from '@/use-cases/check-in/check-in'
import { InMemoryCheckInRepository } from '@/repositories/in-memory/in-memory-check-in-repository'
import { CheckInAlreadyDoneTodayError } from '../erros/check-in-already-done-today-error'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { MaxDistanceError } from '../erros/max-distance-error'


describe('Check-in Use Case', () => {
  let checkInRepository: InMemoryCheckInRepository
  let gymsRepository: InMemoryGymsRepository
  let checkInUseCase: CheckInUseCase

  beforeEach(() => {
    checkInRepository = new InMemoryCheckInRepository()
    gymsRepository = new InMemoryGymsRepository()
    checkInUseCase = new CheckInUseCase(checkInRepository, gymsRepository)

    gymsRepository.items.push({
      id: 'gym-01',
      name: 'Shark Gym',
      description: '',
      phone: '',
      latitude: -22.982744,
      longitude: -46.5328319,
    })
  })

  it('should be able to create a check-in', async () => {
    const {check_in} = await checkInUseCase.checkIn({
      user_id: 'user-01',
      gym_id: 'gym-01',
       userLatitude: -22.982744,
      userLongitude: -46.5328319,
    })
    expect(check_in.id).toEqual(expect.any(String))

  })

  it('should not be able to create 2 check-ins on the same day', async () => {
    
    await checkInUseCase.checkIn({
      user_id: 'user-01',
      gym_id: 'gym-01',
       userLatitude: -22.982744,
      userLongitude: -46.5328319,
    })

    await expect(() =>
      checkInUseCase.checkIn({
      user_id: 'user-01',
      gym_id: 'gym-01',
      userLatitude: -22.982744,
      userLongitude: -46.5328319,
    })
    ).rejects.toBeInstanceOf(CheckInAlreadyDoneTodayError)
  })

  it('should be able to create check-ins on different days', async () => {
      vi.setSystemTime(new Date(2024, 0, 20, 8, 0, 0)) // Jan 20, 2024, 08:00 AM

      await checkInUseCase.checkIn({
        user_id: 'user-01',
        gym_id: 'gym-01',
        userLatitude: -22.982744,
        userLongitude: -46.5328319,
      })

      vi.setSystemTime(new Date(2024, 0, 21, 8, 0, 0)) // Jan 21, 2024, 08:00 AM

      const { check_in } = await checkInUseCase.checkIn({
        user_id: 'user-01',
        gym_id: 'gym-01',
        userLatitude: -22.982744,
        userLongitude: -46.5328319,
      })

      expect(check_in.id).toEqual(expect.any(String))
  })

  it('should not be able to check in on distant gym', async () => {
      gymsRepository.items.push({
      id: 'gym-02',
      name: 'Sky Fit Gym',
      description: '',
      phone: '',
      latitude: -22.9475559,
      longitude: -46.5309677,
    })

  await expect(
    checkInUseCase.checkIn({
      user_id: 'user-01',
      gym_id: 'gym-02',
      userLatitude: -22.982744,
      userLongitude: -46.5328319,
  })
    ).rejects.toBeInstanceOf(MaxDistanceError)
  })
})
