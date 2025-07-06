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
    const limite = parseInt(req.query.limite as string) || 20;

    if (!numeroCliente || !nombreAgente) {
      return res.status(400).json({ error: 'Se requiere el número de WhatsApp del cliente.' });
    }

    const { mensajes, totalMensajes, estado } = await this.mensajesService.obtenerConversacionPorPaginado(nombreAgente, numeroCliente, pagina, limite);

    if (estado === 'sin_conversacion') {
      return res.status(404).json({ error: 'No existe una conversación entre el agente y el cliente.' });
    }

    if (estado === 'sin_mensajes') {
      return res.status(200).json({ mensajes: [], totalMensajes, mensaje: 'La conversación existe, pero aún no hay mensajes.' });
    }

    if (estado === 'pagina_fuera_de_rango') {
      return res.status(200).json({ mensajes: [], totalMensajes, mensaje: 'No hay más mensajes disponibles en esta conversación.' });
    }

    return res.status(200).json({ mensajes, pagina, limite, totalMensajes });

  } catch (error) {
    console.error('Error al obtener la conversación:', error);
    return res.status(500).json({ error: 'Error interno del servidor.' });
  }
}


async obtenerConversacionesDeAgente(req: Request, res: Response): Promise<Response> {
    try {
      const { nombreAgente } = req.params;
      const pagina = parseInt(req.query.pagina as string) || 1;
      const limite = parseInt(req.query.limite as string) || 20;

      const { conversaciones, total } = await this.mensajesService.obtenerConversacionesDeAgente(nombreAgente, pagina, limite);

      return res.status(200).json({
        conversaciones,
        pagina,
        limite,
        total,
        totalPaginas: Math.ceil(total / limite)
      });
    } catch (error) {
      console.error('Error al obtener conversaciones del agente:', error);
      return res.status(500).json({ error: 'Error interno del servidor.' });
    }
  }

}
