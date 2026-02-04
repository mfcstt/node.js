import type { CheckInRepository } from "@/repositories/check-in-repository";
import type { CheckIn } from "prisma/generated";
import { CheckInAlreadyDoneTodayError } from "../erros/check-in-already-done-today-error";
import type { GymsRepository } from "@/repositories/gyms-repository";

interface CheckInUseCaseRequest{
  user_id: string;
  gym_id: string;
  userLatitude: number;
  userLongitude: number;
}

interface CheckInUseCaseResponse{
  check_in: CheckIn;
}

export class CheckInUseCase {
  constructor(
    private checkInRepository: CheckInRepository,
    private gymsRepository: GymsRepository
  ) {}

  async checkIn(request: CheckInUseCaseRequest): Promise<CheckInUseCaseResponse> {
    const { user_id, gym_id } = request

    const checkInOnDay = await this.checkInRepository.findByUserIdOnDate(
      user_id,
      new Date()
    )

    if (checkInOnDay) {
      throw new CheckInAlreadyDoneTodayError()
    }

    const check_in = await this.checkInRepository.create({
      user_id,
      gym_id,
    })

    return { check_in }
  }
}