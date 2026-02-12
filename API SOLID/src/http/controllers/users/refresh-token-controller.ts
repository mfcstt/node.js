import z from "zod";
import type { FastifyRequest, FastifyReply } from "fastify";
import { InvalidCredentialsError } from "@/use-cases/erros/invalid-credentials-error";
import { makeLoginUseCase } from "@/use-cases/factories/make-login-use-case";

export async function refreshToken(request: FastifyRequest, reply: FastifyReply) {

  await request.jwtVerify({
    onlyCookie: true
  })

  const token = await reply.jwtSign({}, {
      sign: {
        sub: request.user.sub,
      }
    })

     const refreshToken = await reply.jwtSign({}, {
      sign: {
        sub: request.user.sub,
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




