import type { FastifyInstance } from "fastify";
import { registerUser } from "./controllers/users.js";

export async function appRoutes(app: FastifyInstance){
  app.post('/users', registerUser);
}