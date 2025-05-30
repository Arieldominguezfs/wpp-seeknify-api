import jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';

const JWT_SECRET = 'fallback_secret';
const JWT_EXPIRES_IN = '1h';

export class AuthService {
  async generarToken(usuarioId: number): Promise<string> {
    return jwt.sign({ usuarioId }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
  }

  async verificarToken(token: string): Promise<any> {
    try {
      return jwt.verify(token, JWT_SECRET);
    } catch (error) {
      return null; // Token inválido
    }
  }

  async encriptarContraseña(contraseña: string): Promise<string> {
    return bcrypt.hash(contraseña, 10);
  }

  async verificarContraseña(contraseña: string, hash: string): Promise<boolean> {
    return bcrypt.compare(contraseña, hash);
  }
}
