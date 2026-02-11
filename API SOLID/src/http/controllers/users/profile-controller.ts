import { verifyJwt } from "@/http/controllers/users/middlewares/verify-jwt";
import { makeProfileUseCase } from "@/use-cases/factories/make-profile-use-case";
import type { FastifyReply, FastifyRequest } from "fastify";


export async function userProfile(request: FastifyRequest, reply: FastifyReply) {

  const profile = makeProfileUseCase()

  const {user} = await profile.getUserProfile({
    userId: request.user.sub,
  })
  
  
  return reply.status(200).send({
    user: {
      ...user,
      password_hash: undefined
    }
  })
}