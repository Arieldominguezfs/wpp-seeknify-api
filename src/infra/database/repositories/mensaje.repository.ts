import { AppDataSource } from '../data-source';
import { Mensaje } from '../entities/Mensaje';

export const MensajeRepository = AppDataSource.getRepository(Mensaje);

export async function crearMensaje(data: Partial<Mensaje>): Promise<Mensaje> {
    const mensaje = MensajeRepository.create(data);
    return await MensajeRepository.save(mensaje);
}