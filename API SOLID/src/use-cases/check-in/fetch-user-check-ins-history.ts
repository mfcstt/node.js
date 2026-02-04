import { CheckInRepository } from '@/repositories/check-in-repository'
import type { CheckIn } from 'prisma/generated'

interface FetchUserCheckInsHistoryUseCaseRequest {
  userId: string,
  page: number,
}

interface FetchUserCheckInsHistoryUseCaseResponse {
  check_ins: CheckIn[]
}

export class FetchUserCheckInsHistoryUseCase {
  constructor(private checkInsRepository: CheckInRepository ) {}

  async fetch({userId, page}: FetchUserCheckInsHistoryUseCaseRequest): Promise<FetchUserCheckInsHistoryUseCaseResponse> {
    const check_ins = await this.checkInsRepository.findManyByUserId(userId, page)

    return {
      check_ins,
    }
  }
  
}