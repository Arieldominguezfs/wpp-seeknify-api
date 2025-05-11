import { AgentProviderPort } from "../domain/ports/agent.provider.port";

export class AgentAdapter implements AgentProviderPort {

    async fetchConversations(): Promise<string[]> {
        return ['get conversations from postgres']
    }

}