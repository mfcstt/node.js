import type { FastifyInstance } from "fastify";
import { registerUser } from "./controllers/create-user.controller.js";

export async function appRoutes(app: FastifyInstance){
  app.post('/users', registerUser);
}