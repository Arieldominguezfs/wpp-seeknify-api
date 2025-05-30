import { AppDataSource } from '../data-source';
import { AgenteIA } from '../entities/AgentesIA';

export const AgentesIARepository = AppDataSource.getRepository(AgenteIA);

export async function obtenerTodosLosAgentes(): Promise<AgenteIA[]> {
    return await AgentesIARepository.find();
}

export async function buscarAgentePorNombre(nombre: string): Promise<AgenteIA | null> {
    return await AgentesIARepository.findOneBy({ nombre });
}