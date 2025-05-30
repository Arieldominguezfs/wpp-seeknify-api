import { Router } from 'express';
import { AuthController } from '../controller/auth.controller';

const authRouter = Router();
const authController = new AuthController();

authRouter.post('/login', async (req, res) => {
  try {
    await authController.login(req, res);
  } catch (error) {
    console.error('Error en autenticación:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

export default authRouter;
