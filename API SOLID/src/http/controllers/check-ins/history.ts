import { makeFetchUserCheckInsHistoryUseCase } from "@/use-cases/factories/make-fetch-user-check-ins-history-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

export async function getHistoryController(
    request: FastifyRequest,
    reply: FastifyReply
){

    const historyCheckInQuerySchema = z.object({
       page: z.coerce.number().min(1).default(1),
    })

    const { page } = historyCheckInQuerySchema.parse(request.query)


    const historyCheckInUseCase = makeFetchUserCheckInsHistoryUseCase()

    const { check_ins } = await historyCheckInUseCase.fetch({
        userId: request.user.sub,
        page,
     })
    
    return reply.status(200).send({ check_ins })
}