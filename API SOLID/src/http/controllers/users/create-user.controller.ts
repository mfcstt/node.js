import z from "zod";
import type { FastifyRequest, FastifyReply } from "fastify";
import { SignUpUseCase } from "@/use-cases/users/sign-up";
import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { UserAlreadyExistsError } from "@/use-cases/erros/user-alredy-exists-error";

export async function registerUser(request: FastifyRequest, reply: FastifyReply) {

  const registerBodySchema = z.object({
    name: z.string(),
    email: z.email(),
    password: z.string().min(6),
  })

  const {name, email, password} = registerBodySchema.parse(request.body)

  try {
    const usersRepository = new PrismaUsersRepository()
    const signUpUseCase = new SignUpUseCase(usersRepository)

    await signUpUseCase.signup({ name, email, password })
  }
  catch (error) {
    if (error instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ message: error.message })
    }
    throw error
  }

  return reply.status(201).send({ message: "User created successfully" })
}

