import { AppDataSource } from '../data-source';
import { Mensaje } from '../entities/Mensaje';

export const MensajeRepository = AppDataSource.getRepository(Mensaje);

export async function crearMensaje(data: Partial<Mensaje>): Promise<Mensaje> {
    const mensaje = MensajeRepository.create(data);
    return await MensajeRepository.save(mensaje);
}

export async function obtenerMensajesPorConversacion(conversacionid: number): Promise<Mensaje[]> {
    return await MensajeRepository.createQueryBuilder('mensaje')
        .where('mensaje.conversacionid = :conversacionid', { conversacionid })
        .orderBy('mensaje.fechahora', 'DESC') // Ordena del más nuevo al más viejo
        .getMany();
}