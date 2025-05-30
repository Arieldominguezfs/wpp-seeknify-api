import { AppDataSource } from '../data-source';
import { Cliente } from '../entities/Cliente';

export const ClienteRepository = AppDataSource.getRepository(Cliente);

export async function crearCliente(data: Partial<Cliente>): Promise<Cliente> {
    const cliente = ClienteRepository.create(data);
    return await ClienteRepository.save(cliente);
}

export async function buscarClientePorNumero(numeroWhatsApp: string): Promise<Cliente | null> {
    return await ClienteRepository.findOneBy({ numerowhatsapp: numeroWhatsApp });
}