import { Request, Response } from 'express';
import { MensajesService } from '../../services/mensajes.service';
import { Mensaje } from '../../domain/interfaces/mensajes.interface';

export class MensajesController {
  private mensajesService: MensajesService;

  constructor(mensajesService: MensajesService) {
    this.mensajesService = mensajesService;
  }

  async crearMensaje(req: Request, res: Response): Promise<Response> {
    try {
      const { mensaje, emisor, nombreAgente, nombreCliente, numeroCliente, fecha } = req.body as Mensaje;

      if (!mensaje || !emisor || !nombreAgente || !numeroCliente || !fecha || !nombreCliente) {
        return res.status(400).json({ error: 'Faltan campos obligatorios.' });
      }

      const resultado = await this.mensajesService.guardarMensaje({
        mensaje, emisor, nombreAgente, nombreCliente, numeroCliente, fecha
      });

      return resultado
        ? res.status(200).json({ message: 'Mensaje guardado correctamente.' })
        : res.status(500).json({ error: 'Error al guardar el mensaje.' });

    } catch (error) {
      console.error('Error en crearMensaje:', error);
      return res.status(500).json({ error: 'Error interno del servidor.' });
    }
  }

  async obtenerConversacionPaginado(req: Request, res: Response): Promise<Response> {
    try {
      const { nombreAgente, numeroCliente } = req.params;
      const pagina = parseInt(req.query.pagina as string) || 1;
      const limite = parseInt(req.query.limite as string) || 20; // Valor por defecto de 20 mensajes

      if (!numeroCliente || !nombreAgente) {
        return res.status(400).json({ error: 'Se requiere el número de WhatsApp del cliente.' });
      }

      const mensajes = await this.mensajesService.obtenerConversacionPorPaginado(nombreAgente, numeroCliente, pagina, limite);

      if (mensajes.length === 0) {
        return res.status(404).json({ error: 'No se encontraron mensajes para este cliente.' });
      }

      return res.status(200).json({ mensajes, pagina, limite });

    } catch (error) {
      console.error('Error al obtener la conversación:', error);
      return res.status(500).json({ error: 'Error interno del servidor.' });
    }
  }
}
