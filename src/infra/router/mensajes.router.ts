import { Router } from 'express';
import { MensajesController } from '../controller/mensaje.controller';
import { MensajesService } from '../../services/mensajes.service';
import { autenticarToken } from '../../middlewares/auth.middleware'; // 🔥 Importar el middleware

const mensajesRouter = Router();
const mensajesService = new MensajesService();
const mensajesController = new MensajesController(mensajesService);

// 🔥 Ruta protegida: solo accesible si el usuario tiene un token válido
mensajesRouter.post('/', autenticarToken, async (req, res) => {
  try {
    await mensajesController.crearMensaje(req, res);
  } catch (error) {
    console.error('Error al crear el mensaje:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

mensajesRouter.get('/:nombreAgente/:numeroCliente', autenticarToken, async (req, res) => {
  try {
    await mensajesController.obtenerConversacionPaginado(req, res);
  } catch (error) {
    console.error('Error al obtener la conversación:', error);
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
});

mensajesRouter.get('/all/conversaciones/:nombreAgente', autenticarToken, async (req, res) => {
  await mensajesController.obtenerConversacionesDeAgente(req, res);
});




export default mensajesRouter;
