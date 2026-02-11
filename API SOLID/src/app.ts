import fastify from 'fastify';
import { appRoutes } from '@/http/controllers/users/routes';
import 'dotenv/config'
import z from 'zod';
import fastifyJwt from '@fastify/jwt';
import { env } from './env/index.js';
import { gymsRoutes } from '@/http/controllers/gyms/routes';
import { checkInsRoutes } from '@/http/controllers/check-ins/routes';

export const app = fastify();

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
})

app.register(appRoutes);
app.register(gymsRoutes);
app.register(checkInsRoutes);

app.setErrorHandler((error, request, reply) => {
  if(error instanceof z.ZodError){
    return reply.status(400).send({ message: "Validation error", issues: error.issues })
  }

  if (process.env.NODE_ENV !== 'production'){
    console.error(error);
  } else {
    // Here you could integrate with a logging service
  }

  return reply.status(500).send({ message: "Internal server error" });
});
