import { PrismaCheckInRepository } from "@/repositories/prisma/prisma-check-in-repository";
import { GetUserMetricsUseCase } from "../check-in/get-user-metrics";


export function makeGetUserMetricsUseCase(){
  const checkInRepository = new PrismaCheckInRepository()
  const useCase = new GetUserMetricsUseCase(checkInRepository)
  return useCase
}