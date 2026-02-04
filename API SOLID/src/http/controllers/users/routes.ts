import type { FastifyInstance } from "fastify";
import { registerUser } from "./create-user.controller";


export async function appRoutes(app: FastifyInstance){
  app.post('/users', registerUser);
}