import { makeFetchNearbyGymsUseCase } from "@/use-cases/factories/make-fetch-nearby-gyms-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

export async function nearbyGymsController(
    request: FastifyRequest,
    reply: FastifyReply
){

    const nearbyGymsQuerySchema = z.object({
        latitude: z.coerce.number().refine((value) => {
            return value >= -90 && value <= 90
        }, {
            message: "Latitude must be between -90 and 90"
        }),
        longitude: z.coerce.number().refine((value) => {
            return value >= -180 && value <= 180
        }, {
            message: "Longitude must be between -180 and 180"
        }),
    })

    const { latitude, longitude} = nearbyGymsQuerySchema.parse(request.query)

    const nearbyGymsUseCase = makeFetchNearbyGymsUseCase()

    const { gyms } = await nearbyGymsUseCase.fetch({
        userLatitude: latitude,
        userLongitude: longitude
    })



    return reply.status(200).send({ gyms })
}