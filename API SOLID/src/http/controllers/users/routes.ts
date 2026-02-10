import type { FastifyInstance } from "fastify";
import { registerUser } from "./sign-up-controller";
import { authenticateUser } from "./login-controller";
import { userProfile } from "./profile-controller";


export async function appRoutes(app: FastifyInstance){
  app.post('/signup', registerUser);
  app.post('/login', authenticateUser);

  /** Authenticate */
  app.get('/profile', userProfile)
}