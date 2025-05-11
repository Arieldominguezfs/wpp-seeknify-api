import { AgentAdapter } from "../adapter/agent.adapter"
import { AgentProviderPort } from "../domain/ports/agent.provider.port"
import { GetConversationsUseCase } from "../domain/usecases/get_conversations"
import { AgentController } from "./controller/agent.controller"
import getRouter from "./router/agent.router"

const agentAdapter: AgentProviderPort = new AgentAdapter()
const getConversationsUseCase = new GetConversationsUseCase(agentAdapter)
const agentController = new AgentController(getConversationsUseCase)

export const agentRouter = getRouter(agentController)