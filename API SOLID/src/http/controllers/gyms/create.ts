import { ResourceNotFoundError } from "@/use-cases/erros/resource-not-found-error";
import { makeCreateGymUseCase } from "@/use-cases/factories/make-create-gym-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

export async function createGymController(
    request: FastifyRequest,
    reply: FastifyReply
){

    const createGymBodySchema = z.object({
        name: z.string(),
        description: z.string().nullable(),
        phone: z.string().nullable(),
        latitude: z.number().refine((value) => {
            return value >= -90 && value <= 90
        }, {
            message: "Latitude must be between -90 and 90"
        }),
        longitude: z.number().refine((value) => {
            return value >= -180 && value <= 180
        }, {
            message: "Longitude must be between -180 and 180"
        }),
    })

    const { name, description, phone, latitude, longitude } = createGymBodySchema.parse(request.body)


    const createGymUseCase = makeCreateGymUseCase()

    await createGymUseCase.create({
            name,
            description,
            phone,
            latitude,
            longitude,
        })
    


    return reply.status(201).send({ message: "Gym created successfully" })
}