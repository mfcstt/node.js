import fastify from 'fastify';
import { knex } from './database.js';


const app = fastify();

// Define a rota
// localhost:3000/
app.get('/', async () => {
  const database = await knex('sqlite_schema').select('*')
  return database

})

app.listen({ port: 3000 }).then(() => {
  console.log('Server running on http://localhost:3000');
});