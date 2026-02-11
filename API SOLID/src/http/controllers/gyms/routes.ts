import type { FastifyInstance } from "fastify";
import { verifyJwt } from "@/http/controllers/users/middlewares/verify-jwt";
import { createGymController } from "./create";
import { searchGymsController } from "./search";
import { nearbyGymsController } from "./nearby";


export async function gymsRoutes(app: FastifyInstance){

app.addHook('onRequest', verifyJwt)
app.post('/gym', createGymController)
app.get('/gym/search', searchGymsController)
app.get('/gym/nearby', nearbyGymsController)
}


