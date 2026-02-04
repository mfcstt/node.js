import z from "zod";
import type { FastifyRequest, FastifyReply } from "fastify";
import { UserAlreadyExistsError } from "@/use-cases/erros/user-alredy-exists-error";
import { makeSignUpUseCase } from "@/use-cases/factories/make-sign-up-use-case";

export async function registerUser(request: FastifyRequest, reply: FastifyReply) {

  const registerBodySchema = z.object({
    name: z.string(),
    email: z.email(),
    password: z.string().min(6),
  })

  const {name, email, password} = registerBodySchema.parse(request.body)

  try {

    const signUpUseCase = makeSignUpUseCase();
    await signUpUseCase.signup({ name, email, password })
  }
  catch (error) {
    if (error instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ message: error.message })
    }
    throw error
  }

  // retornar todos os dados do usuario criado
  return reply.status(201).send({ message: "User created successfully" })

}

