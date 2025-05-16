import { buscarAgentePorNombre } from '../infra/database/repositories/agentes.repository';
import { buscarClientePorNumero, crearCliente } from '../infra/database/repositories/cliente.repository';
import { buscarConversacion, crearConversacion } from '../infra/database/repositories/conversacion.repository';
import { crearMensaje } from '../infra/database/repositories/mensaje.repository';
import { Mensaje } from '../domain/interfaces/mensajes.interface';


export class MensajesService {
  async guardarMensaje(mensajeData: Mensaje): Promise<boolean> {
    const { mensaje, emisor, nombreAgente,nombreCliente, numeroCliente, fecha } = mensajeData;

    // 1. Buscar agente
    const agente = await buscarAgentePorNombre(nombreAgente);
    if (!agente) {
      // Podrías lanzar un error aquí o registrarlo para un manejo más detallado en el controlador
      console.error(`No existe un agente con el nombre "${nombreAgente}"`);
      return false;
    }

    // 2. Buscar o crear cliente
    let cliente = await buscarClientePorNumero(numeroCliente);
    if (!cliente) {
      cliente = await crearCliente({ numerowhatsapp: numeroCliente,nombre:nombreCliente });
    }

    // 3. Buscar o crear conversacion
    let conversacion = await buscarConversacion(agente.agenteid, cliente.clienteid);
    if (!conversacion) {
      conversacion = await crearConversacion({
        agenteid: agente.agenteid,
        clienteid: cliente.clienteid
      });
    }

    try {
      // 4. Guardar mensaje
      await crearMensaje({
        conversacionid: conversacion.conversacionid,
        emisor,
        contenido: mensaje,
        fechahora: new Date(fecha)
      });
      return true; // Éxito al guardar el mensaje
    } catch (error) {
      // Registra el error para depuración
      console.error('Error al guardar el mensaje:', error);
      return false; // Fallo al guardar el mensaje
    }
  }
}