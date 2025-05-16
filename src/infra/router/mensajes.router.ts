import { Router, Request, Response } from 'express';
import { guardarMensajeCompleto } from '../../services/mensajes.service';

export const mensajesRouter = Router();

mensajesRouter.post('/', async (req: Request, res: Response) => {
    const { mensaje, emisor, nombreAgente, numeroCliente, fecha } = req.body;

    if (!mensaje || !emisor || !nombreAgente || !numeroCliente || !fecha) {
        return res.status(400).json({ error: 'Faltan campos obligatorios.' });
    }

    const resultado = await guardarMensajeCompleto({ mensaje, emisor, nombreAgente, numeroCliente, fecha });

    if (resultado.error) {
        return res.status(500).json({ error: resultado.message });
    }

    return res.status(201).json(resultado.mensaje);
});