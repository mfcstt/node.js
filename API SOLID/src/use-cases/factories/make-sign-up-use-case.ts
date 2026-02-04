import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository"
import { SignUpUseCase } from "../users/sign-up"

export function makeSignUpUseCase(){
    const usersRepository = new PrismaUsersRepository()
    const signUpUseCase = new SignUpUseCase(usersRepository)
    return signUpUseCase
}