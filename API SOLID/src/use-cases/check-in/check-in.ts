import type { CheckInRepository } from "@/repositories/check-in-repository";
import type { CheckIn } from "prisma/generated";
import { CheckInAlreadyDoneTodayError } from "../erros/check-in-already-done-today-error";
import type { GymsRepository } from "@/repositories/gyms-repository";
import { getDistanceBetweenCoordinates } from "../utils/get-distance-between-coordinates";
import { MaxDistanceError } from "../erros/max-distance-error";

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

  async checkIn(
    { user_id, 
      gym_id, 
      userLatitude, 
      userLongitude 
    }: CheckInUseCaseRequest): 
    Promise<CheckInUseCaseResponse> {

    // Verify if gym exists
    const gym =  await this.gymsRepository.findById(gym_id)
    if (!gym) {
      throw new Error('Gym not found.')
    }

    // Calculate distance between user and gym
    const distance = getDistanceBetweenCoordinates(
      { latitude: userLatitude, longitude: userLongitude },
      { latitude: gym.latitude.toNumber(), longitude: gym.longitude.toNumber()},
    )

    const MAX_DISTANCE_IN_KILOMETERS = 0.1 // 100 meters

    if (distance > MAX_DISTANCE_IN_KILOMETERS) {
      throw new MaxDistanceError()
    }

    // Verify if check-in is already done today
    const checkInOnDay = await this.checkInRepository.findByUserIdOnDate(
      user_id,
      new Date()
    )
    if (checkInOnDay) {
      throw new CheckInAlreadyDoneTodayError()
    }
    // Create check-in
    const check_in = await this.checkInRepository.create({
      user_id,
      gym_id,
    })

    return { check_in }
  }
}