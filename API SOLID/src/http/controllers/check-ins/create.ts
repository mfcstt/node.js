import { ResourceNotFoundError } from "@/use-cases/erros/resource-not-found-error";
import { makeCheckInUseCase } from "@/use-cases/factories/make-check-in-use-case";
import { makeCreateGymUseCase } from "@/use-cases/factories/make-create-gym-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

export async function createCheckInController(request: FastifyRequest, reply: FastifyReply) {
    const createCheckInParamsSchema = z.object({
      gymId: z.string().uuid(),
    })
  
    const createCheckInBodySchema = z.object({
      latitude: z.number().refine((value) => {
        return Math.abs(value) <= 90
      }),
      longitude: z.number().refine((value) => {
        return Math.abs(value) <= 180
      }),
    })
  
    const { gymId } = createCheckInParamsSchema.parse(request.params)
    const { latitude, longitude } = createCheckInBodySchema.parse(request.body)
  
    const checkInUseCase = makeCheckInUseCase()
  
    await checkInUseCase.checkIn({
      gym_id: gymId,
      user_id: request.user.sub,
      userLatitude: latitude,
      userLongitude: longitude,
    })
  
    return reply.status(201).send()
  }