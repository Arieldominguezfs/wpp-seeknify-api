import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret';

export function autenticarToken(req: Request, res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    res.status(401).json({ error: 'Token no proporcionado' });
    return;
  }

  const token = authHeader.split(' ')[1]; // Extrae solo el token del formato Bearer <token>

  try {
    const usuario = jwt.verify(token, JWT_SECRET);
    req.body.usuario = usuario; // Guarda el usuario autenticado en la petición
    next(); // 🔥 Aquí se ejecuta si todo es válido
  } catch (error) {
    console.error('Error de validación de token:', error);
    res.status(403).json({ error: 'Token inválido' });
  }
}
