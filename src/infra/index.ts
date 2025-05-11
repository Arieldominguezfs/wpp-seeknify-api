import express from 'express';
import { agentRouter } from './inject';
import * as bodyParser from 'body-parser'
import cors from 'cors'

const app: express.Application = express();
const PORT = 8080;

app.use(cors())
app.use(agentRouter)
app.use(bodyParser.json({ limit: '15mb'}));
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:8080`);
});

export default app