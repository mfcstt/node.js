import fastify from 'fastify';
import { appRoutes } from './http/routes.js';
import 'dotenv/config'


export const app = fastify();


app.register(appRoutes);
