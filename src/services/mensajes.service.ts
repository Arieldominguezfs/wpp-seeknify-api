import { buscarAgentePorNombre } from '../infra/database/repositories/agentes.repository';
import { buscarClientePorNumero, crearCliente } from '../infra/database/repositories/cliente.repository';
import { buscarConversacion, crearConversacion } from '../infra/database/repositories/conversacion.repository';
import { crearMensaje } from '../infra/database/repositories/mensaje.repository';

export async function guardarMensajeCompleto({
    mensaje,
    emisor,
    nombreAgente,
    numeroCliente,
    fecha
}: {
    mensaje: string,
    emisor: string,
    nombreAgente: string,
    numeroCliente: string,
    fecha: string
}) {
    // 1. Buscar agente
    const agente = await buscarAgentePorNombre(nombreAgente);
    if (!agente) {
        return { error: true, status: 400, message: `No existe un agente con el nombre "${nombreAgente}"` };
    }

    // 2. Buscar o crear cliente
    let cliente = await buscarClientePorNumero(numeroCliente);
    if (!cliente) {
        cliente = await crearCliente({ numerowhatsapp: numeroCliente });
    }

    // 3. Buscar o crear conversacion
    let conversacion = await buscarConversacion(agente.agenteid, cliente.clienteid);
    if (!conversacion) {
        conversacion = await crearConversacion({
            agenteid: agente.agenteid,
            clienteid: cliente.clienteid
        });
    }

    // 4. Guardar mensaje
    const nuevoMensaje = await crearMensaje({
        conversacionid: conversacion.conversacionid,
        emisor,
        contenido: mensaje,
        fechahora: new Date(fecha)
    });

    return { error: false, mensaje: nuevoMensaje };
}