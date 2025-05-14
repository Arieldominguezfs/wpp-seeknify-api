import express from 'express';
import { agentRouter } from './inject';
import * as bodyParser from 'body-parser';
import cors from 'cors';
import { AppDataSource } from './database/data-source'; // <-- Importa tu DataSource
import { obtenerTodosLosAgentes } from './database/repositories/agentes.repository';

const app: express.Application = express();
const PORT = 8080;

AppDataSource.initialize()
  .then(async () => {
    console.log('Conexión a la base de datos establecida');

    // Mostrar listado de todos los agentes IA al iniciar
    const agentes = await obtenerTodosLosAgentes();
    console.log('Listado de AgentesIA:');
    agentes.forEach(a => {
      console.log(`ID: ${a.agenteid} | Nombre: ${a.nombre}`);
    });

    app.use(cors());
    app.use(agentRouter);
    app.use(bodyParser.json({ limit: '15mb' }));

    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:8080`);
    });
  })
  .catch((error) => {
    console.error('Error al conectar a la base de datos', error);
    process.exit(1); // Opcional: termina el proceso si falla la conexión
  });

export default app;