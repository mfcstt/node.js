import type { GymsRepository } from "@/repositories/gyms-repository"
import type { Gym } from "prisma/generated"

interface FetchNearbyGymsUseCaseRequest {
  userLatitude: number
  userLongitude: number
}

interface FetchNearbyGymsUseCaseResponse {
  gyms: Gym[]
}

export class FetchNearbyGymsUseCase {
  constructor(
    private gymsRepository: GymsRepository,
  ) {}

  async fetch({
    userLatitude,
    userLongitude,
  }: FetchNearbyGymsUseCaseRequest): Promise<FetchNearbyGymsUseCaseResponse> {
    const gyms = await this.gymsRepository.findManyNearby({
      userLatitude,
      userLongitude,
    })
    return {
      gyms,
    }
  }
}

