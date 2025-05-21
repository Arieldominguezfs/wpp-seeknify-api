import express from 'express';
import { agentRouter } from './inject';
import * as bodyParser from 'body-parser';
import cors from 'cors';
import { AppDataSource } from './database/data-source'; // <-- Importa tu DataSource
import { obtenerTodosLosAgentes } from './database/repositories/agentes.repository';
import mensajesRouter from './router/mensajes.router';
import authRouter from './router/auth.router'; // 🔥 Nuevo router de autenticación
import * as bcrypt from 'bcryptjs';

const app: express.Application = express();
const PORT = 8080; // Puerto definido directamente en el código

AppDataSource.initialize()
  .then(async () => {
    app.use(express.json());
  

    // 🔥 Agrega el router de autenticación
    app.use('/auth', authRouter);
    
    // Agrega el router de mensajes
    app.use('/mensajes', mensajesRouter);
    
    // Agrega el router de agentes IA
    app.use(agentRouter);

    console.log('Conexión a la base de datos establecida');

    // Mostrar listado de todos los agentes IA al iniciar
    const agentes = await obtenerTodosLosAgentes();
    console.log('Listado de AgentesIA:');
    const contraseña = "seekAdmin";
  const salt = await bcrypt.genSalt(10); // Genera una "sal" para mayor seguridad
  const hash = await bcrypt.hash(contraseña, salt); // Encripta la contraseña
  console.log("Hash generado:", hash);
    agentes.forEach(a => {
      console.log(`ID: ${a.agenteid} | Nombre: ${a.nombre}`);
    });
    app.use(cors());
    app.use(bodyParser.json({ limit: '15mb' }));

    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error al conectar a la base de datos:', error.message);
    console.error('Detalles del error:', error);
    process.exit(1); // Opcional: termina el proceso si falla la conexión
  });

export default app;
