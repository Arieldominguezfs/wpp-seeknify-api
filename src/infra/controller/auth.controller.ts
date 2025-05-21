import { Request, Response } from 'express';
import { AuthService } from '../../services/auth.service';
import { buscarUsuarioPorNombre } from '../../infra/database/repositories/usuario.repository';

const authService = new AuthService();

export class AuthController {
  async login(req: Request, res: Response) {
    try {
      const { username, password } = req.body;

      if (!username || !password) {
        return res.status(400).json({ error: 'Usuario y contraseña son obligatorios' });
      }

      const usuario = await buscarUsuarioPorNombre(username);
      if (!usuario) {
        return res.status(401).json({ error: 'Usuario no encontrado' });
      }

      const esValida = await authService.verificarContraseña(password, usuario.hash);
      if (!esValida) {
        return res.status(401).json({ error: 'Contraseña incorrecta' });
      }

      const token = await authService.generarToken(usuario.usuarioid);
      return res.status(200).json({ token });

    } catch (error) {
      console.error('Error en el proceso de login:', error);
      return res.status(500).json({ error: 'Error interno del servidor' });
    }
  }
}
