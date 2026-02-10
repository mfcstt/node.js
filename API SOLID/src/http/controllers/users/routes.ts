import type { FastifyInstance } from "fastify";
import { registerUser } from "./sign-up-controller";
import { authenticateUser } from "./login-controller";
import { userProfile } from "./profile-controller";
import { verifyJwt } from "@/http/middlewares/verify-jwt";


export async function appRoutes(app: FastifyInstance){
  app.post('/signup', registerUser);
  app.post('/login', authenticateUser);

  /** Authenticate */
  app.get('/profile',{onRequest: [verifyJwt]} ,userProfile)
}