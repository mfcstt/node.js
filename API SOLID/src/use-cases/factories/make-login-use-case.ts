import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository"
import { LoginUseCase } from "../users/login"

export function makeLoginUseCase() {
    const usersRepository = new PrismaUsersRepository()
    const useCase = new LoginUseCase(usersRepository)
    return useCase
}