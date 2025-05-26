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


export async function obtenerMensajesPorConversacionPorPagina(
  conversacionid: number, 
  pagina: number = 1, 
  limite: number = 20
): Promise<Mensaje[]> {
  
  const offset = (pagina - 1) * limite;

  return await MensajeRepository.createQueryBuilder('mensaje')
    .where('mensaje.conversacionid = :conversacionid', { conversacionid })
    .orderBy('mensaje.fechahora', 'DESC') // Ordena del más nuevo al más viejo
    .offset(offset) // 🔥 Salta los mensajes anteriores según la página
    .limit(limite)  // 🔥 Se asegura de traer solo la cantidad correcta
    .getMany();
}

export async function obtenerCantidadMensajes(conversacionid: number): Promise<number> {
  return await MensajeRepository.count({ where: { conversacionid } });
}

