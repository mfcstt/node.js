import z from "zod";
import type { FastifyRequest, FastifyReply } from "fastify";
import { userServiceRegister } from "@/services/users.js";

export async function registerUser(request: FastifyRequest, reply: FastifyReply) {

  const registerBodySchema = z.object({
    name: z.string(),
    email: z.email(),
    password: z.string().min(6),
  })

  const {name, email, password} = registerBodySchema.parse(request.body)

  try {
    await userServiceRegister({ name, email, password })
  }
  catch (error) {
    return reply.status(400).send()
  }

  return reply.status(201).send({ message: "User created successfully" })
}

