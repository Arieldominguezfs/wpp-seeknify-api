import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { AgenteIA } from './entities/AgentesIA';
import { Cliente } from './entities/Cliente';
import { Conversacion } from './entities/Conversacion';
import { Mensaje } from './entities/Mensaje';
import { Usuario } from './entities/Usuario';

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: '34.31.48.85',
    port: 5432,
    username: 'seek',
    password: 'Seek200394',
    database: 'seeknify',
    synchronize: false, // true solo en desarrollo
    logging: false,
    entities: [AgenteIA, Cliente, Conversacion, Mensaje, Usuario],
    migrations: [],
    subscribers: [],
});