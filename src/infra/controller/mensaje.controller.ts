import { Request, Response } from 'express';
import { MensajesService } from '../../services/mensajes.service';
import { Mensaje } from '../../domain/interfaces/mensajes.interface';

export class MensajesController {
  private mensajesService: MensajesService;

  constructor(mensajesService: MensajesService) {
    this.mensajesService = mensajesService;
  }

  async crearMensaje(req: Request, res: Response) {
    const { mensaje, emisor, nombreAgente, nombreCliente, numeroCliente, fecha } = req.body as Mensaje;

    if (!mensaje || !emisor || !nombreAgente || !numeroCliente || !fecha || !nombreCliente) {
      return res.status(400).json({ error: 'Faltan campos obligatorios.' });
    }

    const resultado = await this.mensajesService.guardarMensaje({ mensaje, emisor, nombreAgente,nombreCliente, numeroCliente, fecha });

    if (!resultado) {
      return res.status(500).json({ error: 'Error al guardar el mensaje.' });
    }else{
        return res.status(201).json({ message: 'Mensaje guardado correctamente.' });
    }

  }
}