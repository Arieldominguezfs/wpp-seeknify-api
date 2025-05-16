import { AppDataSource } from '../data-source';
import { Conversacion } from '../entities/Conversacion';

export const ConversacionRepository = AppDataSource.getRepository(Conversacion);

export async function buscarConversacion(agenteid: number, clienteid: number): Promise<Conversacion | null> {
    return await ConversacionRepository.findOneBy({ agenteid, clienteid });
}

export async function crearConversacion(data: Partial<Conversacion>): Promise<Conversacion> {
    const conversacion = ConversacionRepository.create(data);
    return await ConversacionRepository.save(conversacion);
}