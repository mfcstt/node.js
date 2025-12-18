import fastify from 'fastify';
import { db } from './database.js';
import { env } from './env/index.js';


const app = fastify();

// Define a rota
// localhost:3000/
app.get('/', async () => {
  const transactions = await db('transactions').select('*');
  return transactions;

})

app.listen({ port: env.PORT }).then(() => {
    console.log(`Server running on http://localhost:${env.PORT}`);
  });