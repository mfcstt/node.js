import z from "zod";
import type { FastifyRequest, FastifyReply } from "fastify";
import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { LoginUseCase } from "@/use-cases/users/login";
import { InvalidCredentialsError } from "@/use-cases/erros/invalid-credentials-error";

export async function authenticateUser(request: FastifyRequest, reply: FastifyReply) {

  const authenticateBodySchema = z.object({
    email: z.email(),
    password: z.string().min(6),
  })

  const {email, password} = authenticateBodySchema.parse(request.body)

  try {
    const usersRepository = new PrismaUsersRepository()
    const loginUseCase = new LoginUseCase(usersRepository)

    await loginUseCase.authenticate({ email, password })
  }
  catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return reply.status(401).send({ message: error.message })
    }
    throw error
  }

  return reply.status(200).send()
}

