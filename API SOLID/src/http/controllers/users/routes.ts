import type { FastifyInstance } from "fastify";
import { registerUser } from "./sign-up-controller";
import { authenticateUser } from "./login-controller";


export async function appRoutes(app: FastifyInstance){
  app.post('/signup', registerUser);
  app.post('/login', authenticateUser);
}