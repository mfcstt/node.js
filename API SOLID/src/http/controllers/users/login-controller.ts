import z from "zod";
import type { FastifyRequest, FastifyReply } from "fastify";
import { InvalidCredentialsError } from "@/use-cases/erros/invalid-credentials-error";
import { makeLoginUseCase } from "@/use-cases/factories/make-login-use-case";

export async function authenticateUser(request: FastifyRequest, reply: FastifyReply) {

  const authenticateBodySchema = z.object({
    email: z.email(),
    password: z.string().min(6),
  })

  const {email, password} = authenticateBodySchema.parse(request.body)

  try {

    const loginUseCase = makeLoginUseCase()

    const {user} = await loginUseCase.authenticate({ email, password })

    const token = await reply.jwtSign(
      {
      role: user.role
      }, 
     {
      sign: {
        sub: user.id
      }
     })

     const refreshToken = await reply.jwtSign(
      {
      role: user.role
     }, 
     {
      sign: {
        sub: user.id,
        expiresIn: '7d'
      }
    })


    return reply
    .setCookie('refreshToken', refreshToken, {
      path: '/',
      secure: true,
      sameSite: true,
      httpOnly: true
    })
    .status(200)
    .send({ token })
  }

  catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return reply.status(401).send({ message: error.message })
    }
    throw error
  }

}

