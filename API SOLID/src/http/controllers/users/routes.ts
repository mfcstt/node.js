import type { FastifyInstance } from "fastify";
import { registerUser } from "./sign-up-controller";
import { authenticateUser } from "./login-controller";
import { userProfile } from "./profile-controller";
import { verifyJwt } from "@/http/controllers/users/middlewares/verify-jwt";
import { refreshToken } from "./refresh-token-controller";


export async function appRoutes(app: FastifyInstance){
  app.post('/signup', registerUser);
  app.post('/login', authenticateUser);

  app.patch('/token/refresh', refreshToken)

  /** Authenticate */
  app.get('/profile',{onRequest: [verifyJwt]} ,userProfile)
}