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

export async function buscarConversacionPorAgenteYCliente(nombreAgente: string, numeroCliente: string): Promise<Conversacion | null> {
    return await ConversacionRepository.createQueryBuilder('conversacion')
        .innerJoinAndSelect('conversacion.agente', 'agente')
        .innerJoinAndSelect('conversacion.cliente', 'cliente')
        .where('agente.nombre = :nombreAgente', { nombreAgente })
        .andWhere('cliente.numerowhatsapp = :numeroCliente', { numeroCliente })
        .getOne();
}
