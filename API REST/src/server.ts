import fastify from 'fastify';

const app = fastify();

// Define a routa
// localhost:3000/
app.get('/', () => {
  return 'Hello World';
})

app.listen({ port: 3000 }).then(() => {
  console.log('Server running on http://localhost:3000');
});