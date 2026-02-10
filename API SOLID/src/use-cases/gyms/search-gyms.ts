import type { GymsRepository } from "@/repositories/gyms-repository"
import type { Gym } from "prisma/generated"


interface SearchGymsUseCaseRequest {
  query: string
  page: number
}

interface SearchGymsUseCaseResponse {
  gyms: Gym[]
}

export class SearchGymUseCase{
  constructor(private gymsRepository: GymsRepository) {}

  async search({ query, page }: SearchGymsUseCaseRequest): Promise<SearchGymsUseCaseResponse> {
    const gyms = await this.gymsRepository.searchMany(query, page)

    return {
      gyms
    }
  }
}