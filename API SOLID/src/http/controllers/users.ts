import z from "zod";
import type { FastifyRequest, FastifyReply } from "fastify";
import { prisma } from "../../lib/prisma.js";

export async function registerUser(request: FastifyRequest, reply: FastifyReply) {

  const registerBodySchema = z.object({
    name: z.string(),
    email: z.email(),
    password: z.string().min(6),
  })

  const {name, email, password} = registerBodySchema.parse(request.body)

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password_hash: password,
    }
  })

  return reply.status(201).send({ message: "User created successfully", user })
}

