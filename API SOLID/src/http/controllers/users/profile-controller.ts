import type { FastifyReply, FastifyRequest } from "fastify";


export async function userProfile(request: FastifyRequest, reply: FastifyReply) {

  await request.jwtVerify()
 
  return reply.status(200).send()
}