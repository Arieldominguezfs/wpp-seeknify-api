import { AgentProviderPort } from "../ports/agent.provider.port";

export class GetConversationsUseCase {
    constructor(
        private readonly wppAdapter: AgentProviderPort
    ){}

    async getConversations(): Promise<string[]> {
        return this.wppAdapter.fetchConversations()
    }
}