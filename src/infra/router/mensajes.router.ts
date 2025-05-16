import { Router,} from 'express';
import { MensajesController } from '../controller/mensaje.controller';
import { MensajesService } from '../../services/mensajes.service';
const mensajesRouter = Router();
const mensajesService = new MensajesService();
const mensajesController = new MensajesController(mensajesService);

//mensajesRouter.post('/', async (req, res) => mensajesController.crearMensaje(req, res));

mensajesRouter.post('/', async (req, res) => {
  try {
    await mensajesController.crearMensaje(req, res);
  } catch (error) {
    console.error('Error al crear el mensaje:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});
export default mensajesRouter;