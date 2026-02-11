import type { FastifyInstance } from "fastify";
import { verifyJwt } from "@/http/controllers/users/middlewares/verify-jwt";
import { createCheckInController } from "./create";
import { getHistoryController } from "./history";
import { metricsCheckInController } from "./metrics";
import { validateCheckInController } from "./validate";


export async function checkInsRoutes(app: FastifyInstance){

app.addHook('onRequest', verifyJwt)
app.post('/gyms/:gymId/check-in', createCheckInController)

app.get('/check-ins/history', getHistoryController)
app.get('/check-ins/metrics', metricsCheckInController)

app.patch(
    '/check-ins/:checkInId/validate', validateCheckInController)

}


