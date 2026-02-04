import type { FastifyInstance } from "fastify";
import { registerUser } from "./create-user.controller";
import { authenticateUser } from "./authenticate-controller";


export async function appRoutes(app: FastifyInstance){
  app.post('/signup', registerUser);
  app.post('/login', authenticateUser);
}