import { AppDataSource } from '../data-source';
import { Usuario } from '../entities/Usuario';

export const UsuarioRepository = AppDataSource.getRepository(Usuario);

export async function crearUsuario(data: Partial<Usuario>): Promise<Usuario> {
    const usuario = UsuarioRepository.create(data);
    return await UsuarioRepository.save(usuario);
}

export async function buscarUsuarioPorNombre(username: string): Promise<Usuario | null> {
    return await UsuarioRepository.findOneBy({ username });
}
