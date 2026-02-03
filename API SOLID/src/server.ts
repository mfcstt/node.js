import {app} from './app.js';
import { env } from './env/index.js';
import "dotenv/config";

app.listen({
  port: env.PORT,
  host: '0.0.0.0'
}).then(() => {
  console.log(`🚀 Server running on port ${env.PORT}`)
})